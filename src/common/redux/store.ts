import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';

import {DASHBOARD} from '$clubhouse/constants/strings.constants';
import LoggerService from '$clubhouse/services/LoggerService';
import StorageService from '$clubhouse/services/StorageService';
import dashboardSlice, {setContacts} from '$dashboard/dashboardSlice';
import settingsSlice from '$settings/settingsSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setContacts,
  effect: async action => {
    await StorageService.set('contacts', action.payload);
    LoggerService.log(DASHBOARD.editContact.successMsg.persisted);
  },
});

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    settings: settingsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
