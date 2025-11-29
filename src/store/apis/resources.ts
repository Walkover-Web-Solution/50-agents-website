'use client';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './interceptor';
import { Resource } from '@/types';

interface GetResourcesByAgentIdParams {
  assistantId: string;
}

interface GetResourceByResourceIdParams {
  resourceId: string;
}

interface AddNewResourceBody {
  assistantId: string;
  title: string;
  url?: string;
  content?: string;
  description?: string;
  docId?: string;
}

export type ResourceUpdatePayload = {
  resourceId: string;
  content?: string;
  title?: string;
  url?: string;
  description: string;
};

export const resourcesApi = createApi({
  reducerPath: 'resourcesApi',
  baseQuery: customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}/resource`),
  endpoints: builder => ({
    getResourcesByAgentId: builder.query<Resource[], GetResourcesByAgentIdParams>({
      query: ({ assistantId }) => {
        return {
          url: `/?agentId=${assistantId}`,
        };
      },
      transformResponse: (response: { data: { resources: Resource[] } }) => {
        return response.data?.resources;
      },
    }),

    getResourceByResourceId: builder.query<Resource, GetResourceByResourceIdParams>({
      query: ({ resourceId }) => {
        return {
          url: `/${resourceId}`,
        };
      },
      transformResponse: (response: { data: Resource }) => {
        return response?.data;
      },
    }),

    addNewResource: builder.mutation<Resource, AddNewResourceBody>({
      query: body => {
        const url = '/';
        return {
          url,
          method: 'POST',
          body: {
            agentId: body.assistantId,
            title: body.title,
            description: body.description,
            docId: body.docId,
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            resourcesApi.util.updateQueryData('getResourcesByAgentId', { assistantId: data.agentId }, currentState => {
              currentState.push(data);
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
      transformResponse: (response: { data: Resource }) => {
        return response?.data;
      },
    }),

    updateResource: builder.mutation<Resource, ResourceUpdatePayload>({
      query: body => {
        const { resourceId, ...updateData } = body;
        const url = `/${resourceId}`;
        return {
          url,
          method: 'PATCH',
          body: updateData,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            resourcesApi.util.updateQueryData('getResourcesByAgentId', { assistantId: data.agentId }, currentState => {
              const index = currentState.findIndex(item => item._id === data._id);
              if (index !== -1) {
                currentState[index] = data; // Directly update the element at the same index
              }
            })
          );
          dispatch(
            resourcesApi.util.updateQueryData('getResourceByResourceId', { resourceId: data._id }, currentState => {
              Object.assign(currentState, data);
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
      transformResponse: (response: { data: Resource }) => {
        return response?.data;
      },
    }),

    deleteResource: builder.mutation<{ agentId: string; _id: string }, GetResourceByResourceIdParams>({
      query: ({ resourceId }) => {
        const url = `/${resourceId}`;
        return {
          url,
          method: 'DELETE',
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            resourcesApi.util.updateQueryData('getResourcesByAgentId', { assistantId: data.agentId }, currentState => {
              const index = currentState.findIndex(item => item._id === data._id);
              if (index !== -1) {
                currentState.splice(index, 1);
              }
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
      transformResponse: (response: { data: { agentId: string; _id: string } }) => {
        return response?.data;
      },
    }),
    refreshResource: builder.mutation<void, GetResourceByResourceIdParams>({
      query: ({ resourceId }) => {
        const url = `/${resourceId}/refresh`;
        return {
          url,
          method: 'PATCH',
        };
      },
    }),
  }),
});

export const {
  useAddNewResourceMutation,
  useGetResourcesByAgentIdQuery,
  useGetResourceByResourceIdQuery,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  useRefreshResourceMutation,
} = resourcesApi;
