// This file is intended to serve as the single source of truth for all strings/messages which are visible to user (including error messages)
// Prefer keeping strings inside appropriate module objects

export const CLUBHOUSE = {
  errorsMsg: {
    contactNotFound: 'Unable to find the contact',
    emailNotAvailable: 'Email ID is not available',
    locationNotAvailable: 'Location is not available',
    incorrectEmptySpacesFile: 'Unnable to load Empty Spaces File',
    phoneNotAvailable: 'Phone Number not available',
    errorWhileSaving: 'Error while saving contacts',
    errorWhileDeleting: 'Error in deleting',
    errorWhileSelectingFile: 'Data File Not Selected.',
    errorWhileSelectingVCFFile: 'VCF File Not Selected.',
    errorWhileSelectingJSONFile: 'JSON File Not Selected.',
    errorReadingFile: 'Error while reading the source file',
    errorInSelectingAvatar: 'Error while selecting the photo',
    errorInPermissions: 'Error in permission',
    errorInReadingContacts: 'Please allow accessing the contacts.',
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
  emptyMsg: 'Press + to add one',
  title: 'Contacts',
  searchBox: {
    placeholder: 'Search Contact',
    noResults: 'No Results',
  },
  contactDetails: {
    about: 'about',
    deletePrompt: {
      cancel: 'Cancel',
      delete: 'Delete',
      message: 'This contact will be removed.',
      title: 'Delete Contact ?',
    },
    info: 'Contact info',
    labels: 'Labels',
    successMsg: {deleted: 'Contact is deleted successfully'},
  },
  editContact: {
    addPicture: 'Add picture',
    bloodGroup: 'Blood Group',
    bloodGroupSelectionTitle: 'Select Blood Group',
    changePicture: 'Change',
    createContact: 'Create Contact',
    editContact: 'Edit Contact',
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
      added: 'Contact is added successfully',
      updated: 'Contact is updated successfully',
      persisted: 'Updated contacts have been persisted',
    },
  },
};

export const SETTINGS = {
  title: 'Settings',
  comingSoon: 'Settings are coming soon',
  totalContacts: 'Total Contacts',
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
        'We are not keeping your data on server. Please backup your data using Save Contacts option. \n\nData from app will be deleted.',
      title: 'Delete Data from mobile ?',
    },
  },
  importData: {
    title: 'Import \n Contacts',
    successMsg: 'Contacts Imported Successfully',
    cancel: 'Cancel',
    emptyMsg: 'No contact found. Please reset the search.',
    successBtn: 'Import',
    permissionDenialModal: {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please allow accessing your contacts.',
    },
  },
  exportJSON: {
    title: 'Save \n Contacts',
    successMsg: 'Contacts Saved Successfully',
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
