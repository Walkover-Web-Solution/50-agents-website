import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { messageApi } from './apis/message';
import { userApi } from './apis/user';
import { threadApi } from './apis/thread';
import { assisstentsApi } from './apis/assisstents';
import { resourcesApi } from './apis/resources';
import { staticAssistant } from './apis/staticagent';
import { toolsAPIs } from './apis/viaosocketapis';
import { orgsApi } from './apis/orgs';
import { tasksApi } from './apis/tasks';
import { publicAssistant } from './apis/staticagent';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    [assisstentsApi.reducerPath]: assisstentsApi.reducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer,
    [staticAssistant.reducerPath]: staticAssistant.reducer,
    [toolsAPIs.reducerPath]: toolsAPIs.reducer,
    [orgsApi.reducerPath]: orgsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [publicAssistant.reducerPath]: publicAssistant.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(messageApi.middleware)
      .concat(threadApi.middleware)
      .concat(assisstentsApi.middleware)
      .concat(resourcesApi.middleware)
      .concat(staticAssistant.middleware)
      .concat(toolsAPIs.middleware)
      .concat(orgsApi.middleware)
      .concat(tasksApi.middleware)
      .concat(publicAssistant.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
