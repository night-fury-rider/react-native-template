// This file is intended to serve as the single source of truth for all strings/messages which are visible to user (including error messages)
// Prefer keeping strings inside appropriate module objects

export const COMMON = {
  errorsMsg: {
    itemNotFound: 'Unable to find the item',
    emailNotAvailable: 'Email ID is not available',
    locationNotAvailable: 'Location is not available',
    incorrectEmptySpacesFile: 'Unnable to load Empty Spaces File',
    phoneNotAvailable: 'Phone Number not available',
    errorWhileSaving: 'Error while saving items',
    errorWhileDeleting: 'Error in deleting',
    errorWhileSelectingFile: 'Data File Not Selected.',
    errorWhileSelectingVCFFile: 'VCF File Not Selected.',
    errorWhileSelectingJSONFile: 'JSON File Not Selected.',
    errorReadingFile: 'Error while reading the source file',
    errorInSelectingAvatar: 'Error while selecting the photo',
    errorInPermissions: 'Error in permission',
    errorInReadingItems: 'Please allow accessing the items.',
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
  emptyMsg: 'Dashboard is coming Soon',
  comingSoon: 'Dashboard is coming Soon',
  title: 'Items',
  searchBox: {
    placeholder: 'Search Item',
    noResults: 'No Results',
  },
  itemDetails: {
    about: 'about',
    deletePrompt: {
      cancel: 'Cancel',
      delete: 'Delete',
      message: 'This item will be removed.',
      title: 'Delete Item ?',
    },
    info: 'Item info',
    labels: 'Labels',
    successMsg: {deleted: 'Item is deleted successfully'},
  },
  editItem: {
    addPicture: 'Add picture',
    bloodGroup: 'Blood Group',
    bloodGroupSelectionTitle: 'Select Blood Group',
    changePicture: 'Change',
    createItem: 'Create Item',
    editItem: 'Edit Item',
    enterName: 'Name',
    enterJobTitle: 'Job Title',
    enterPrimaryNumber: 'Primary Phone',
    enterSecondaryNumber: 'Secondary Phone',
    enterAddress: 'Address',
    enterEmailId: 'Email Id',
    enterNote: 'Note',
    errorsMsg: {},
    permissionGranted: 'Permission Granted',
    permissionDenied: 'Permission Denied',
    removePicture: 'Remove',
    saveBtnText: 'Save',
    successMsg: {
      added: 'Item is added successfully',
      updated: 'Item is updated successfully',
      persisted: 'Updated items have been persisted',
    },
  },
};

export const SETTINGS = {
  title: 'Settings',
  comingSoon: 'Settings are coming soon',
  totalItems: 'Total Items',
  appVersion: 'App Version',
  chooseColorTheme: 'Choose Color Theme',
  developerOptions: 'Enable Developer Options',
};

export const TOOLS = {
  title: 'Tools',
  comingSoon: 'Tools are coming soon',
  deleteData: {
    title: 'Delete Data',
    successMsg: 'Data deleted Successfully',
    prompt: {
      cancel: 'Cancel',
      delete: 'Delete',
      message:
        'We are not keeping your data on server. Please backup your data using Save Items option. \n\nData from app will be deleted.',
      title: 'Delete Data from mobile ?',
    },
  },
  importData: {
    title: 'Import \n Items',
    successMsg: 'Items Imported Successfully',
    cancel: 'Cancel',
    emptyMsg: 'No item found. Please reset the search.',
    successBtn: 'Import',
    permissionDenialModal: {
      title: 'Items',
      message: 'This app would like to view your items.',
      buttonPositive: 'Please allow accessing your items.',
    },
  },
  exportJSON: {
    title: 'Save \n Items',
    successMsg: 'Items Saved Successfully',
    cancel: 'Cancel',
    successBtn: 'Export',
    permissionDenialModal: {
      title: 'File System',
      message: 'This app would like to access file system.',
      buttonPositive: 'Please allow accessing your file system.',
    },
  },
  importJSON: {
    title: 'Import \n Backup',
    successMsg: 'Backup Imported Successfully',
    cancel: 'Cancel',
    successBtn: 'Import',
    permissionDenialModal: {
      title: 'File System',
      message: 'This app would like to access file system.',
      buttonPositive: 'Please allow accessing your file system.',
    },
  },
};
