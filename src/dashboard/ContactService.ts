import {
  TBloodGroup,
  TContact,
  TLabelCategory,
} from '$dashboard/dashboard.types';
import APP_CONFIG from '$clubhouse/constants/app.config.constants';
import {getClonedObject} from 'clubhouse/services/UtilService';

/**
 * @description Function to know if a property of contact object is meant to be ignored from some calculations
 * @param prop - property to be validated.
 * @returns true if passed property is meant to be ignored else false.
 */
const isExcludedProperty = (prop: string): boolean => {
  if (prop === '') {
    return true;
  }
  const EXCLUDED_PROPERTIES = [
    'id',
    'contactStr',
    'imagePath',
    'imageBase64Path',
  ];
  return EXCLUDED_PROPERTIES.indexOf(prop) > -1;
};

/**
 * @description Creates a string from all contact data which later will be used for searching the contact.
 * @param contactObj
 */
const getContactString = (contactObj: TContact): string => {
  let contactStr = '';
  let contactAttributeValue;
  for (let prop in contactObj) {
    if (contactObj.hasOwnProperty(prop)) {
      contactAttributeValue = contactObj[prop];
      if (!isExcludedProperty(prop)) {
        if (Array.isArray(contactAttributeValue)) {
          for (const listItem of contactAttributeValue) {
            contactStr += listItem?.value
              ? listItem?.value + APP_CONFIG.delimeter
              : '';
          }
        } else {
          contactStr += contactAttributeValue
            ? contactAttributeValue + APP_CONFIG.delimeter
            : '';
        }
      }
    }
  }
  contactStr =
    contactStr.slice(0, -APP_CONFIG.delimeter.length)?.toLowerCase() || '';

  return contactStr;
};

const refineContact = ({
  id,
  displayName,
  primaryContactNumber = '',
  secondaryContactNumber = '',
  primaryAddress = '',
  secondaryAddress = '',
  bloodGroup,
  primaryEmailId = '',
  secondaryEmailId = '',
  imageBase64Path = '',
  imagePath = '',
  jobTitle = '',
  note = '',
}: {
  id: string;
  displayName: string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  primaryAddress: string;
  secondaryAddress: string;
  bloodGroup: TBloodGroup;
  primaryEmailId: string;
  secondaryEmailId: string;
  imageBase64Path: string;
  imagePath: string;
  jobTitle: string;
  note: string;
}): TContact => {
  let contactObj: TContact;

  contactObj = {
    id,
    contactStr: '', // Empty since it would be created only when contact object has all required data.
    contactNumbers: [
      {
        label: 'Primary' as TLabelCategory,
        value: primaryContactNumber?.trim(),
      },
      {
        label: 'Secondary' as TLabelCategory,
        value: secondaryContactNumber?.trim(),
      },
    ],
    displayName,
    addresses: [
      {
        label: 'Primary' as TLabelCategory,
        value: primaryAddress?.trim(),
      },
      {
        label: 'Secondary' as TLabelCategory,
        value: secondaryAddress?.trim(),
      },
    ],
    bloodGroup: bloodGroup || '',
    emailIds: [
      {
        label: 'Primary' as TLabelCategory,
        value: primaryEmailId?.trim(),
      },
      {
        label: 'Secondary' as TLabelCategory,
        value: secondaryEmailId?.trim(),
      },
    ],
    imageBase64Path,
    imagePath,
    jobTitle: jobTitle?.trim(),
    note: note?.trim(),
  };

  contactObj.contactStr = getContactString(contactObj);

  return contactObj;
};

const refineAllContacts = (contacts: any[]) => {
  if (!Array.isArray(contacts) || contacts.length === 0) {
    return [];
  }
  return sortContacts(
    contacts.map(currentObj =>
      refineContact({
        id: currentObj?.recordID || currentObj?.id,
        primaryContactNumber:
          currentObj?.phoneNumbers?.[0]?.number ||
          currentObj?.contactNumbers?.[0]?.value,
        secondaryContactNumber:
          currentObj?.phoneNumbers?.[1]?.number ||
          currentObj?.contactNumbers?.[1]?.value,
        displayName: currentObj?.displayName,
        primaryAddress:
          currentObj?.postalAddresses?.[0]?.formattedAddress ||
          currentObj?.addresses?.[0]?.value,
        secondaryAddress:
          currentObj?.postalAddresses?.[1]?.formattedAddress ||
          currentObj?.addresses?.[1]?.value,
        bloodGroup: currentObj?.bloodGroup,
        primaryEmailId:
          currentObj?.emailAddresses?.[0]?.email ||
          currentObj?.emailIds?.[0]?.value,
        secondaryEmailId:
          currentObj?.emailAddresses?.[1]?.email ||
          currentObj?.emailIds?.[1]?.value,
        imageBase64Path: currentObj?.imageBase64Path,
        imagePath: currentObj?.imagePath || '',

        jobTitle: currentObj?.jobTitle,
        note: currentObj?.note,
      }),
    ),
  );
};

/**
 * @description Function to filter contacts based on search string passed
 * @param contacts {TContact[]} Contacts to be filtered
 * @param searchStr {string} - Search String
 * @returns Filtered contacts.
 */
const filterContacts = (contacts: TContact[], searchStr: string) => {
  let result: TContact[] = [];
  searchStr = searchStr.toLowerCase();

  result = contacts.filter(
    contactObj => contactObj.contactStr.indexOf(searchStr) > -1,
  );

  return result;
};

/**
 * @description Function to delete contact with passed id
 * @param contacts {TContact[]} Contacts to be filtered
 * @param contactId {string} - Contact Id
 * @returns Contacts after deleting the corresponding contact
 */
const deleteContact = (contacts: TContact[], contactId: string) => {
  // When there is no contact id, don't filter at all.
  if (!contactId) {
    return contacts;
  }

  return sortContacts(
    contacts.filter(contactObj => contactObj.id !== contactId),
  );
};

/**
 * @description Function to update contact with passed id
 * @param contacts {TContact[]} Contacts to be filtered
 * @param contactId {string} - Contact Id
 * @param updatedContact {TContact} - Updated Contact
 * @returns Contacts after updating the corresponding contact
 */
const updateContact = (
  contacts: TContact[],
  contactId: string,
  updatedContact: TContact,
) => {
  let result = getClonedObject(contacts);

  // When there is no contact id, don't filter at all.
  if (!contactId) {
    return contacts;
  }

  const totalContacts = contacts.length;

  for (let i = 0; i < totalContacts; i++) {
    if (result[i].id === contactId) {
      result[i] = getClonedObject(updatedContact);
      break;
    }
  }

  return sortContacts(result);
};

/**
 * @description Sort contacts based on sort property passed
 * @param contacts {TContact[]} Contacts to be sorted
 * @param sortProperty {string} - Property using which contacts to be sorted
 * @returns Sorted Contacts
 */
const sortContacts = (
  contacts: TContact[],
  sortProperty: string = 'displayName',
) => {
  if (!contacts || !Array.isArray(contacts)) {
    return [];
  }
  return contacts.sort((a, b) => {
    const aProperty = '' + a[sortProperty];
    const bProperty = '' + b[sortProperty];
    if (aProperty < bProperty) {
      return -1;
    }
    if (aProperty > bProperty) {
      return 1;
    }
    return 0;
  });
};

/**
 * @description add contacts to exising contacts
 * @param existingContacts {TContact[]} Exising contacts
 * @param newContacts {TContact[]} - New contacts
 * @returns Contacts after adding new contacts
 */
const addContacts = (existingContacts: TContact[], newContacts: TContact[]) =>
  sortContacts([...existingContacts, ...newContacts]);

export {
  addContacts,
  deleteContact,
  filterContacts,
  getContactString,
  refineAllContacts,
  refineContact,
  sortContacts,
  updateContact,
};
