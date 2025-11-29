'use client';
import { generateRandomId } from '@/lib/utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { Message, ThreadFromBackend } from '../../types/index';
import { customFetchBaseQuery } from './interceptor';
import { threadApi } from './thread';
import { assisstentsApi } from './assisstents';
// Define a service using a base URL and expected endpoints

type backendMessageType = {
  id: string;
  content: string;
  createdAt: Date;
  role: string;
  metadata: object;
};
export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`),
  tagTypes: ['ModifierMessages'],
  endpoints: builder => ({
    getMessages: builder.query<Message[], string>({
      query: threadId => {
        return {
          url: '/message/' + threadId,
        };
      },
      transformResponse: (response: { data: { messages: backendMessageType[] } }) => {
        const chats = response.data.messages;
        return chats.map(message => {
          return {
            id: message.id,
            content: message.content,
            timestamp: message.createdAt,
            isUser: message.role === 'user',
            metadata: message.metadata,
          };
        });
      },
    }),
    sendMessage: builder.mutation<
      {
        success: boolean;
        data: { message: string; tid: string; thread: ThreadFromBackend };
      },
      { message: Message; threadId: string; agent: string }
    >({
      query: body => {
        const url = '/message';
        const params = {} as { tid?: string };
        if (body.threadId != 'default') params.tid = body.threadId;
        return {
          url,
          method: 'POST',
          params,
          body: { message: body.message.content, agent: body.agent },
        };
      },
      // After adding a new message, update the cache for `getMessages`
      async onQueryStarted(newMessage, { dispatch, queryFulfilled }) {
        try {
          const threadId = newMessage?.threadId;
          if (threadId !== 'default') {
            dispatch(
              messageApi.util.updateQueryData('getMessages', threadId, (currentState: Message[]) => {
                currentState.push(newMessage.message);
              })
            );
          }
          const { data } = await queryFulfilled;
          if (!data.success) return;
          const { message } = data.data;
          const newMsg = {
            id: generateRandomId(),
            content: message,
            timestamp: new Date(),
            isUser: false,
          };
          const newThreadId = data?.data?.tid;
          if (threadId !== 'default') {
            dispatch(
              messageApi.util.updateQueryData('getMessages', newThreadId, (currentState: Message[]) => {
                currentState.push(newMsg);
              })
            );
          }
          if (threadId == 'default') {
            dispatch(messageApi.util.upsertQueryData('getMessages', newThreadId, [newMessage.message, newMsg]));
          }

          // // for adding thread to threads list
          if (newThreadId !== newMessage.threadId) {
            const thread = data.data?.thread;
            dispatch(
              threadApi.util.updateQueryData('getThreads', { assistantId: newMessage?.agent }, currentState => {
                currentState.unshift({
                  id: thread._id,
                  name: thread.name,
                  uid: thread?.createdBy,
                  assistantId: thread?.agent,
                  unread: 0,
                });
              })
            );
          }
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    markread: builder.mutation({
      query: threadId => {
        const url = `/message/${threadId}/read`;
        return {
          url,
          method: 'PATCH',
        };
      },
    }),
    sendMessageToModifier: builder.mutation<
      { success: boolean; data: { message: string } },
      { message: string; agent: string }
    >({
      query: body => ({
        url: `/message/modifier/${body.agent}`,
        method: 'POST',
        body: { message: body.message },
      }),
      async onQueryStarted(newMessage, { dispatch, queryFulfilled }) {
        try {
          // Optimistically update the cache
          dispatch(
            messageApi.util.updateQueryData(
              'getModifierMessages',
              { agent: newMessage.agent },
              (currentState: Message[]) => {
                currentState.push({
                  id: generateRandomId(),
                  content: newMessage.message,
                  timestamp: new Date().toISOString(),
                  isUser: true,
                });
              }
            )
          );

          const { data } = await queryFulfilled;
          if (!data.success) return;

          // Add the response to the cache
          const { message, components } = getMessageMeta(data.data.message, newMessage.agent);

          dispatch(
            messageApi.util.updateQueryData(
              'getModifierMessages',
              { agent: newMessage.agent },
              (currentState: Message[]) => {
                currentState.push({
                  id: generateRandomId(),
                  content: message,
                  timestamp: new Date().toISOString(),
                  isUser: false,
                  metadata: { components },
                });
              }
            )
          );

          // Refresh tools if a tool-related component was added
          if (
            Array.isArray(components) &&
            components.some(c => ['table_link', 'email_tool', 'web_search_tool'].includes(c.type))
          ) {
            dispatch(
              assisstentsApi.endpoints.getAllTools.initiate(newMessage.agent, {
                forceRefetch: true,
              })
            );
          }
        } catch (error) {
          console.error('Failed to add modifier message to cache', error);
        }
      },
    }),
    getModifierMessages: builder.query<Message[], { agent: string }>({
      query: ({ agent }) => ({
        url: `/message/modifier/${agent}`,
      }),
      transformResponse: (
        response: { data: { messages: backendMessageType[] } },
        _: undefined,
        { agent }: { agent: string }
      ) => {
        const chats = response.data.messages;
        return chats.map(message => {
          const { message: msg, components } =
            message.role === 'user'
              ? { components: [], message: message.content }
              : getMessageMeta(message.content, agent);
          return {
            id: message.id,
            content: msg,
            timestamp: message.createdAt,
            isUser: message.role === 'user',
            metadata: { components },
          };
        });
      },
      providesTags: ['ModifierMessages'],
    }),
  }),
});

function getMessageMeta(message: string, agent: string): { components: any[]; message: string } {
  let components: any[] = [];
  const data = JSON.parse(message);
  if (data?.operation?.type && Array.isArray(data.operation?.type) && data.operation?.type?.length > 0) {
    // Iterate over each operation type in the array
    data.operation.type.forEach((operationType: string) => {
      switch (operationType) {
        case 'add_app':
          if (data.operation.add_app) {
            components.push({
              type: 'add_app_button',
              args: { ...data.operation.add_app, agent },
            });
          }
          break;
        case 'add_table':
          if (data.operation.add_table) {
            components.push({
              type: 'table_link',
              args: data.operation.add_table,
            });
          }
          break;
        case 'add_email':
          if (data.operation.add_email) {
            components.push({
              type: 'email_tool',
              args: data.operation.add_email,
            });
          }
          break;
        case 'add_web_search':
          if (data.operation.add_web_search) {
            components.push({
              type: 'web_search_tool',
              args: data.operation.add_web_search,
            });
          }
          break;
      }
    });
  }
  return { components, message: data.message };
}

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
  useMarkreadMutation,
  useSendMessageToModifierMutation,
  useGetModifierMessagesQuery,
} = messageApi;
