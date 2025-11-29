import { createApi } from '@reduxjs/toolkit/query/react';
import type { proxyUser, User } from '../../types/index';
import { customFetchBaseQuery } from './interceptor';
import { orgsApi } from './orgs';
import { assisstentsApi } from './assisstents';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBaseQuery(process.env.NEXT_PUBLIC_BASE_URL || ''),
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => {
        return {
          url: '/user',
        };
      },
      transformResponse: (response: { data: User }) => {
        return response?.data;
      },
    }),
    switchOrg: builder.mutation({
      queryFn: async ({ id }: { id?: string | number }, _api, _extraOptions, baseQuery) => {
        // If no org id is provided, do not perform any network call
        // Use nullish check so numeric 0 is treated as a valid id
        if (!id) {
          return { data: null } as { data: null };
        }
        const url = '/user/switch-org';
        return await baseQuery({
          url,
          method: 'POST',
          body: {
            orgId: id,
          },
        });
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        if (!params?.id) return;
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('selectedOrgId', String(params.id)); // WHAT TO DO WHEN USER LEAVES AN ORG ?
          const newUsedObj = (data as any)?.data;
          dispatch(
            userApi.util.updateQueryData('getUser', undefined, (currentState: User) => {
              Object.assign(currentState, newUsedObj);
            })
          );

          dispatch(assisstentsApi.util.resetApiState());

          dispatch(
            orgsApi.util.updateQueryData('getProxyUser', undefined, (currentState: proxyUser) => {
              const newCompany = currentState.c_companies.find(compony => String(compony.id) === String(params.id));
              if (newCompany) currentState.currentCompany = newCompany;
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useSwitchOrgMutation } = userApi;
