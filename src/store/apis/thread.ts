'use client';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './interceptor';
import { ThreadFromBackend } from '@/types';

interface DeleteThreadParams {
  threadId: string;
}
// Define a service using a base URL and expected endpoints
export const threadApi = createApi({
  reducerPath: 'threadApi',
  baseQuery: customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}/thread`),
  tagTypes: ['Thread'],
  endpoints: builder => ({
    deleteThread: builder.mutation<void, DeleteThreadParams>({
      query: ({ threadId }) => ({
        url: `/${threadId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ threadId }, { dispatch, queryFulfilled, getState }) {
        await queryFulfilled;
        const queries = threadApi.util.selectInvalidatedBy(getState(), [{ type: 'Thread' }]);
        queries
          .filter(query => query.endpointName === 'getThreads')
          .map(query => {
            const patchResult = dispatch(
              threadApi.util.updateQueryData('getThreads', query.originalArgs, draft => {
                return draft.filter(thread => thread.id !== threadId);
              })
            );
            return patchResult;
          });
      },
    }),
    getThreads: builder.query({
      providesTags: ['Thread'],
      query: body => {
        return {
          url: `/${body.assistantId}`,
        };
      },
      transformResponse: (response: { data: { threads: ThreadFromBackend[] } }) => {
        // Transform the response to read chats and return the chats array
        let threads = response.data.threads || [];
        threads = threads.filter(thread => thread._id);
        return threads.map(thread => {
          return {
            id: thread._id,
            name: thread.name,
            uid: thread?.createdBy,
            assistantId: thread?.agent,
            unread: thread?.unread,
          };
        });
      },
    }),
    getFallBackThreads: builder.query({
      providesTags: ['Thread'],
      query: body => {
        return {
          url: `/${body.assistantId}/fallback`,
        };
      },
      transformResponse: (response: { data: { threads: ThreadFromBackend[] } }) => {
        // Transform the response to read chats and return the chats array
        let threads = response.data.threads || [];
        threads = threads.filter(thread => thread._id);
        return threads.map(thread => {
          return {
            id: thread._id,
            name: thread.name,
            uid: thread?.createdBy,
            assistantId: thread?.agent,
            unread: thread?.unread,
          };
        });
      },
    }),
  }),
});

export const { useGetThreadsQuery, useDeleteThreadMutation, useLazyGetThreadsQuery, useGetFallBackThreadsQuery } =
  threadApi;
