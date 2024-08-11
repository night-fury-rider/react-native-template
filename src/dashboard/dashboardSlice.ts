import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {TContact, TDashboardState} from '$dashboard/dashboard.types';

const initialState: TDashboardState = {
  contacts: [],
  filteredContacts: [], // Used in dashboard screen only
  selectedContacts: [],
  lastModifiedTime: Date.now(),
};

/**
 * @description Updates the main contacts array & filtered contacts array/
 */
const _setContacts = (
  state: TDashboardState,
  action: PayloadAction<TContact[]>,
) => {
  state.contacts = action.payload;
  state.filteredContacts = action.payload;
  state.lastModifiedTime = Date.now();
};

const _filterContacts = (
  state: TDashboardState,
  action: PayloadAction<TContact[]>,
) => {
  state.filteredContacts = action.payload;
};

const _resetFilters = (state: TDashboardState) => {
  state.filteredContacts = state.contacts;
};

const _selectContacts = (
  state: TDashboardState,
  action: PayloadAction<TContact[]>,
) => {
  state.selectedContacts = action.payload;
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setContacts: _setContacts, // Used in case of update/delete contact
    setFilteredContacts: _filterContacts,
    resetFilters: _resetFilters,
    selectContacts: _selectContacts,
  },
});

export const {setContacts, setFilteredContacts, resetFilters, selectContacts} =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
