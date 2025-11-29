'use client';

import { Assistant, dbDashAgentIdea } from '@/types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './interceptor';

// Create a separate API service for public endpoints
export const publicAssistant = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    prepareHeaders: (headers: any) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getIdeas: builder.query<Assistant[], void>({
      query: () => ({
        url: '/template',
      }),
      transformResponse: (response: { data: any }) => {
        return response.data.templates;
      },
    }),
  }),
});

export const staticAssistant = createApi({
  reducerPath: 'staticApi',
  baseQuery: customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  endpoints: builder => ({
    getEmbedToken: builder.query({
      query: (assistantId: string) => ({
        url: `/utility/get-embed-token/${assistantId}`,
      }),
      transformResponse: (response: { data: { token: string; ragToken: string; triggerToken: string } }) => {
        const viasockettoken = response?.data?.token;
        localStorage.setItem('viasocket_embed_token', viasockettoken);
        // localStorage.setItem("viasocket_trigger_token", response?.data?.triggerToken);
        // const script = document.createElement('script')
        // script.id = 'viasocket-embed-main-script'
        // script.src = 'https://embed.viasocket.com/prod-embedcomponent.js'
        // script.setAttribute('embedToken', viasockettoken)
        // document.body.appendChild(script)
        return {
          viasockettoken,
          ragToken: response?.data?.ragToken,
          triggerToken: response?.data?.triggerToken,
        };
      },
    }),
    getEmbedTokenForCalendar: builder.query({
      query: (orgId: string) => ({
        url: `/utility/get-embed-token-calendar?orgId=${orgId}`,
      }),
      transformResponse: (response: { data: { token: string; ragToken: string; triggerToken: string } }) => {
        const oldScript = document.getElementById('viasocket-embed-main-script') as HTMLElement;
        if (oldScript) document.body.removeChild(oldScript);
        const oldIframe = document.getElementById('iframe-viasocket-embed-parent-container') as HTMLElement;
        if (oldIframe) document.body.removeChild(oldIframe);

        const script = document.createElement('script');
        script.id = 'viasocket-embed-main-script';
        script.src = 'https://embed.viasocket.com/prod-embedcomponent.js';
        script.setAttribute('embedToken', response?.data?.triggerToken);
        document.body.appendChild(script);
        localStorage.setItem('viasocket_trigger_token', response?.data?.triggerToken);
        return { triggerToken: response?.data?.triggerToken };
      },
    }),
  }),
});

// Export hooks from public API
export const { useGetIdeasQuery } = publicAssistant;

// Export hooks from authenticated API
export const { useGetEmbedTokenQuery, useGetEmbedTokenForCalendarQuery } = staticAssistant;
