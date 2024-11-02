// This file is intended to serve as the single source of truth for all strings/messages which are visible to user (including error messages)
// Prefer keeping strings inside appropriate module objects

export const COMMON = {
  errorsMsg: {
    itemNotFound: 'Unable to find the item',
    emailNotAvailable: 'Email ID is not available',
    incorrectEmptySpacesFile: 'Unnable to load Empty Spaces File',
  },
  permissions: {
    status: {
      granted: 'granted',
      denied: 'denied',
      never_ask_again: 'never_ask_again',
    },
  },
  colorScheme: {
    light: 'light',
    dark: 'dark',
  },
};

export const DASHBOARD = {
  comingSoon: 'Dashboard is coming Soon',
  searchBox: {
    placeholder: 'Search Item',
    noResults: 'No Results',
  },
};

export const SETTINGS = {
  title: 'Settings',
  appVersion: 'App Version',
};
