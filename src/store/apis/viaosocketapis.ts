'use client';

import { ViasocketFlow } from '@/types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const toolsAPIs = createApi({
  reducerPath: 'toolsAPI',
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    getenabledFlows: builder.query({
      query: embedToken => {
        return {
          url: `https://flow-api.viasocket.com/projects/projyKi92deL/integrations`,
          headers: {
            authorization: embedToken,
          },
        };
      },
      transformResponse: (response: { data: { flows: ViasocketFlow[] } }) => {
        return response?.data?.flows;
      },
    }),
  }),
});

export const { useGetenabledFlowsQuery } = toolsAPIs;
