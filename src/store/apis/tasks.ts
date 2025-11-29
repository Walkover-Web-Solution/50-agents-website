'use client';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './interceptor';

export interface Task {
  _id: string;
  threadId: string;
  command: string;
  agentId: string;
  time: string;
  status: 'pending' | 'done' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskRequest {
  threadId: string;
  command: string;
  agentId: string;
  time: string;
  status: 'pending';
}

export interface TasksResponse {
  success: boolean;
  data: Task[];
}

export interface TaskResponse {
  success: boolean;
  data: Task;
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: customFetchBaseQuery(`${process.env.NEXT_PUBLIC_BASE_URL}/tool`),
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query<Task[], string>({
      query: agentId => ({
        url: `/tasks?agentId=${agentId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response.success === false && response.message?.includes('No tasks found')) {
          return [];
        }
        if (response.success === false) {
          throw new Error(response.message || 'Failed to fetch tasks');
        }
        return response.data?.tasks || response.data || [];
      },
      providesTags: result =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Task' as const, id: _id })), { type: 'Task', id: 'LIST' }]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    getTask: builder.query<Task, string>({
      query: taskId => ({
        url: `/task/${taskId}`,
        method: 'GET',
      }),
      transformResponse: (response: TaskResponse) => {
        return response.data;
      },
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: taskData => ({
        url: '/task',
        method: 'POST',
        body: taskData,
      }),
      transformResponse: (response: TaskResponse) => {
        return response.data;
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTask: builder.mutation<Task, { taskId: string; taskData: Partial<Task> }>({
      query: ({ taskId, taskData }) => ({
        url: `/task/${taskId}`,
        method: 'PATCH',
        body: taskData,
      }),
      transformResponse: (response: TaskResponse) => {
        return response.data;
      },
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    deleteTask: builder.mutation<{ success: boolean }, string>({
      query: taskId => ({
        url: `/task/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    getOngoingTasksOfMyAgents: builder.query<
      { agentName: string; agentId: string; agentLogo: string; agentIsTemplate: boolean; tasks: Task[] }[],
      void
    >({
      query: () => ({
        url: '/ongoing-tasks',
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return response.data?.ongoingTasks || [];
      },
      providesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetOngoingTasksOfMyAgentsQuery,
} = tasksApi;
