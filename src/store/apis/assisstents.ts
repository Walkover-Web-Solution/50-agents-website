'use client';
import { Assistant, Tool } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './interceptor';
import { orgsApi } from './orgs';
import { publicAssistant } from './staticagent';

export const assisstentsApi = createApi({
  reducerPath: 'assisstentsApi',
  baseQuery: customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}/agent`),
  endpoints: builder => ({
    addTool: builder.mutation({
      query: ({ assistantId, toolData }) => {
        const url = `/${assistantId}/tool`;
        const params = {};
        const bodyToSend = {
          url: toolData?.webhookurl,
          payload: toolData?.detailedUsedVariables || {},
          desc: toolData?.description,
          id: toolData?.id,
          status: toolData?.status,
          title: toolData?.title,
          serviceIcons: toolData?.serviceIcons || [],
        };
        return {
          url,
          method: 'POST',
          params,
          body: bodyToSend,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const newTool = data?.data;
          const assistantId = newTool?.agentId;
          dispatch(
            assisstentsApi.util.updateQueryData('getAllTools', assistantId, currentState => {
              const indexOfTool = currentState?.findIndex(tool => tool._id === newTool?._id);
              if (indexOfTool === -1) currentState.push(newTool);
              else currentState[indexOfTool] = newTool;
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    getAllTools: builder.query({
      query: assistantId => {
        const url = `/${assistantId}/tool`;
        return {
          url,
          method: 'GET',
        };
      },
      transformResponse: (response: { data: { tools: Tool[] } }) => {
        return response?.data?.tools;
      },
    }),
    deleteTool: builder.mutation({
      query: ({ assistantId, toolId }) => {
        const url = `/${assistantId}/tool/${toolId}`;
        const params = {};
        return {
          url,
          method: 'DELETE',
          params,
        };
      },
      async onQueryStarted({ assistantId, toolId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update the getAllTools cache to remove the deleted tool
          dispatch(
            assisstentsApi.util.updateQueryData('getAllTools', assistantId, currentState => {
              return currentState?.filter(tool => tool._id !== toolId) || [];
            })
          );
        } catch (error) {
          console.error('Failed to delete tool', error);
        }
      },
    }),
    getAllAssistents: builder.query<Assistant[], void>({
      query: () => {
        return {
          url: '/',
        };
      },
      transformResponse: (response: { data: { agents: Assistant[] } }) => {
        let assistants = response.data.agents || [];
        // Sort the assistants array by name
        assistants.sort((a, b) => a.name.localeCompare(b.name));
        return assistants;
      },
    }),
    getCustomAgent: builder.query<Assistant[], void>({
      query: () => ({
        url: '/customagents',
      }),
      transformResponse: (response: { data: { agents: Assistant[] } }) => {
        let assistants = response.data.agents || [];
        // Sort the assistants array by name
        assistants.sort((a, b) => a.name.localeCompare(b.name));
        return assistants;
      },
    }),
    getAssistantById: builder.query({
      query: body => {
        return {
          url: `/${body?.assistantId}`,
        };
      },
      transformResponse: (response: { data: Assistant }) => {
        return response?.data;
      },
    }),
    createNewAssistant: builder.mutation({
      query: body => {
        const url = '/';
        const params = {};
        return {
          url,
          method: 'POST',
          params,
          body: {
            name: body.name,
            instructions: body.instructions,
            llm: { service: 'openai', model: 'gpt-5' },
            ...(body.is_template === true ? { is_template: true } : {}),
          },
        };
      },

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            assisstentsApi.util.updateQueryData('getAllAssistents', undefined, (currentState: Assistant[]) => {
              currentState.push(data?.data);
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    generateAgentInstruction: builder.mutation({
      query: body => {
        const { id, userBio } = body;
        return {
          url: `/${id}/generateInstructions`,
          method: 'POST',
          body: { userBio },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            assisstentsApi.util.updateQueryData(
              'getAssistantById',
              { assistantId: data.data._id },
              (currentState: Assistant) => {
                Object.assign(currentState, data?.data);
              }
            )
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    updateAssistant: builder.mutation({
      query: (body: {
        assistantId?: string;
        llm?: {
          service: string;
          model: string;
        };
        name?: string;
        instructions?: string;
        slugName?: string;
        is_template?: boolean;
      }) => {
        const url = `/${body?.assistantId}`;
        delete body.assistantId;
        const params = {};
        return {
          url,
          method: 'PATCH',
          params,
          body,
        };
      },
      // After adding a new message, update the cache for `getMessages`
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            assisstentsApi.util.updateQueryData(
              'getAssistantById',
              { assistantId: data.data._id },
              (currentState: Assistant) => {
                Object.assign(currentState, data?.data);
              }
            )
          );

          // Also update the getAllAssistents cache to reflect name changes in sidebar
          dispatch(
            assisstentsApi.util.updateQueryData('getAllAssistents', undefined, (currentState: Assistant[]) => {
              const index = currentState.findIndex(assistant => assistant._id === data.data?._id);
              if (index !== -1) {
                Object.assign(currentState[index], data?.data);
              }
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    addNewEditor: builder.mutation({
      queryFn: async ({ assistantId, emails, proxyUserId }, { dispatch, getState }) => {
        try {
          const state = getState() as any;
          const existingMembers = state.orgsApi?.queries?.['getOrgUsers(undefined)']?.data || [];

          // Create a map for O(1) lookup instead of O(n) find operations
          const memberEmailMap = new Map(existingMembers.map((member: any) => [member?.email?.toLowerCase(), member]));

          let finalProxyUserId = proxyUserId;

          // Process emails efficiently - stop at first email processed for proxyUserId
          for (const email of emails) {
            if (finalProxyUserId) break; // Early exit if we already have proxyUserId

            const lowerEmail = email.toLowerCase();
            const existingMember = memberEmailMap.get(lowerEmail);

            if (existingMember) {
              // Use existing member's id as proxyUserId
              finalProxyUserId = (existingMember as any).id;
            } else {
              // Invite new member and use returned id
              const result = await dispatch(orgsApi.endpoints.inviteMember.initiate({ email })).unwrap();
              finalProxyUserId = result?.data?.id;
            }
          }

          // Now make the actual addEditor API call with the correct proxyUserId
          const baseQuery = customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}/agent`);
          const response = await baseQuery(
            {
              url: `/${assistantId}/editor`,
              method: 'PATCH',
              body: { emails, proxyUserId: finalProxyUserId },
            },
            { dispatch, getState },
            {}
          );

          if (response.error) {
            return { error: response.error };
          }

          return { data: response.data };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: (error as Error).message } };
        }
      },
      async onQueryStarted({ assistantId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (assistantId && (data as any)?.data) {
            dispatch(
              assisstentsApi.util.updateQueryData('getAssistantById', { assistantId }, (currentState: Assistant) =>
                Object.assign(currentState, (data as any).data)
              )
            );
          }
        } catch (error) {
          console.error('Failed to add editor or invite member:', error);
        }
      },
    }),
    updateDiary: builder.mutation({
      query: ({ assistantId, pageId, updateObj }) => {
        const url = `/${assistantId}/diary/page/${pageId}`;
        return {
          url,
          method: 'post',
          body: updateObj,
        };
      },
      // After adding a new message, update the cache for `getMessages`
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            assisstentsApi.util.updateQueryData(
              'getAssistantById',
              { assistantId: data.data._id },
              (currentState: Assistant) => {
                Object.assign(currentState, data?.data);
              }
            )
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    deleteDiaryEntry: builder.mutation({
      query: ({ assistantId, pageId }) => {
        const url = `/${assistantId}/diary/page/${pageId}`;
        return {
          url,
          method: 'delete',
        };
      },
      // After adding a new message, update the cache for `getMessages`
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            assisstentsApi.util.updateQueryData(
              'getAssistantById',
              { assistantId: data.data._id },
              (currentState: Assistant) => {
                Object.assign(currentState, data?.data);
              }
            )
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    removeEditor: builder.mutation({
      query: (body: { assistantId: string; editorId: string }) => {
        const url = `/${body.assistantId}/editor/${body.editorId}`;
        const params = {};
        return {
          url,
          method: 'DELETE',
          params,
        };
      },
      // After adding a new message, update the cache for `getMessages`
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            assisstentsApi.util.updateQueryData(
              'getAssistantById',
              { assistantId: data.data._id },
              (currentState: Assistant) => {
                Object.assign(currentState, data?.data);
              }
            )
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    getMeetingAgents: builder.query({
      query: () => {
        const url = '/meeting-agents';
        return {
          url,
          method: 'GET',
        };
      },
      extraOptions: {
        ignoreToast: true,
      },
      transformResponse: (response: any) => {
        return response.data.agents;
      },
    }),
    setMeetingAgents: builder.mutation({
      query: (agentIds: string[]) => {
        const url = '/meeting-agents';
        return {
          url,
          body: { agentIds },
          method: 'PUT',
        };
      },
      async onQueryStarted(agentIds, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            assisstentsApi.endpoints.getMeetingAgents.initiate(null, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error('Failed to set meeting agents', error);
        }
      },
    }),
    createNewAgentUsingTemplate: builder.mutation({
      query: body => {
        const url = '/template/' + body.templateId;
        return {
          url,
          method: 'POST',
          body: { agentName: body.agentName },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            assisstentsApi.util.updateQueryData('getAllAssistents', undefined, (currentState: Assistant[]) => {
              currentState.push(data?.data);
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
    createTemplate: builder.mutation({
      query: templateData => {
        return {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/template`,
          method: 'POST',
          body: templateData,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const newTemplate = response.data?.data?.template;
          if (newTemplate) {
            dispatch(
              publicAssistant.util.updateQueryData('getIdeas', undefined, draft => {
                draft.push(newTemplate);
              })
            );
          } else {
            console.error('Invalid template data:', newTemplate);
          }
        } catch (error) {
          console.error('Failed to create template:', error);
        }
      },
    }),
    updateTemplate: builder.mutation({
      query: ({ id, ...templateData }) => {
        return {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/template/${id}`,
          method: 'PUT',
          body: templateData,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const updatedTemplate = response.data?.data?.template;
          if (updatedTemplate) {
            dispatch(
              publicAssistant.util.updateQueryData('getIdeas', undefined, draft => {
                const index = draft.findIndex(template => template._id === updatedTemplate._id);
                if (index !== -1) {
                  draft[index] = updatedTemplate;
                }
              })
            );
          } else {
            console.error('Invalid updated template data:', updatedTemplate);
          }
        } catch (error) {
          console.error('Failed to update template:', error);
        }
      },
    }),
  }),
});

export const {
  useGenerateAgentInstructionMutation,
  useAddToolMutation,
  useDeleteDiaryEntryMutation,
  useGetAllAssistentsQuery,
  useUpdateDiaryMutation,
  useLazyGetAllAssistentsQuery,
  useCreateNewAssistantMutation,
  useGetAssistantByIdQuery,
  useUpdateAssistantMutation,
  useAddNewEditorMutation,
  useRemoveEditorMutation,
  useGetCustomAgentQuery,
  useDeleteToolMutation,
  useGetAllToolsQuery,
  useGetMeetingAgentsQuery,
  useSetMeetingAgentsMutation,
  useCreateNewAgentUsingTemplateMutation,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} = assisstentsApi;
