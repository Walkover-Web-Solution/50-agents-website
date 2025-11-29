'use client';

import { member, proxyUser } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './user';

export const orgsApi = createApi({
  reducerPath: 'orgsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://routes.msg91.com/api',
    prepareHeaders: headers => {
      const token = localStorage.getItem('proxy_auth_token');
      if (token) {
        headers.set('Proxy_auth_token', token);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getProxyUser: builder.query({
      query: () => 'c/getDetails',
      transformResponse: (response: { data: proxyUser[] }) => {
        return response?.data?.[0];
      },
    }),
    getOrgUsers: builder.query({
      query: () => 'c/getUsers??itemsPerPage=300',
      transformResponse: (response: { data: { data: member[] } }) => {
        return response?.data?.data;
      },
    }),
    createNewOrg: builder.mutation({
      query: ({ name }) => {
        const url = '/c/createCompany';
        return {
          url,
          method: 'POST',
          body: {
            company: { name },
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const newCompany = data.data;
          if (newCompany) {
            dispatch(
              orgsApi.util.updateQueryData('getProxyUser', undefined, (currentState: proxyUser) => {
                currentState.c_companies?.push(newCompany);
                currentState.currentCompany = newCompany;
              })
            );
            await dispatch(userApi.endpoints.switchOrg.initiate({ id: newCompany.id })).unwrap();
          }
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),

    inviteMember: builder.mutation({
      query: ({ email }) => {
        const url = '/c/addUser';
        return {
          url,
          method: 'POST',
          body: {
            user: { email },
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const newMember = data?.data;

          dispatch(
            orgsApi.util.updateQueryData('getOrgUsers', undefined, currentState => {
              currentState.push(newMember);
            })
          );
        } catch (error) {
          console.error('Failed to add message to cache', error);
        }
      },
    }),
  }),
});

export const { useCreateNewOrgMutation, useGetProxyUserQuery, useGetOrgUsersQuery, useInviteMemberMutation } = orgsApi;
