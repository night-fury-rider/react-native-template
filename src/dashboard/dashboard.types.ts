export type TDashboardState = {
  contacts: TContact[];
  filteredContacts: TContact[];
  selectedContacts: TContact[];
  lastModifiedTime: number;
};

export type TLabelCategory = 'Primary' | 'Secondary';

export type TContactNumber = {
  label: TLabelCategory;
  value: string;
};

export type TEmailId = {
  label: TLabelCategory;
  value: string;
};

export type TAddress = {
  label: string;
  value: string;
};

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'A+'
  | 'O-'
  | 'O+'
  | 'AB-'
  | 'AB+';

export type TContact = {
  // Specifies the possible values of the object of type TContact
  [key: string]:
    | string
    | number
    | TContactNumber[]
    | TEmailId[]
    | TAddress[]
    | undefined;
  id: string; // It would never change
  contactNumbers: TContactNumber[];
  contactStr: string;
  displayName: string;
  addresses?: TAddress[];
  bloodGroup?: TBloodGroup;
  emailIds?: TEmailId[];
  imageBase64Path?: string;
  imagePath?: string;
  jobTitle?: string;
  note?: string;
};

export type TLabeledItem = {
  index: number;
  value: string;
  label?: string;
  leftIcon?: string;
  leftIconColor?: string;
  leftIconType?: string;
  leftIconBrand?: boolean;
  leftIconCallback?: Function;
  rightIcon?: string;
  rightIconColor?: string;
  rightIconType?: string;
  rightIconBrand?: boolean;
  rightIconCallback?: Function;
};
