/**
 * Currently this component is being used in Import Contact feature only.
 * TODO: Use this in dashboard component as well. It will keep one code for contact list of dashboard as well as contact list of import contact modal.
 */

import {Icon, ListItem, SearchBar, Text, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import EmptyScreen from '$clubhouse/components/EmptyScreen';
import UserAvatar from '$clubhouse/components/UserAvatar';
import {COLORS} from '$clubhouse/constants/colors.constants';
import {DASHBOARD} from '$clubhouse/constants/strings.constants';
import {useAppDispatch} from '$clubhouse/redux/redux.hooks';
import {getClonedObject} from '$clubhouse/services/UtilService';
import {TContact} from '$dashboard/dashboard.types';
import {filterContacts} from '$dashboard/ContactService';
import {selectContacts} from '$dashboard/dashboardSlice';

type TContactList = {
  contacts: TContact[];
  emptyMsg?: string;
  hasCheckbox?: boolean;
  listStyle?: object;
  submitButtonTitle?: string;
  callQuickly?: Function;
  handleSubmit?: Function;
  openContactDetails?: Function;
};

type TSelectionMap = {
  [key: string]: TContact;
};

const ContactList = ({
  contacts,
  emptyMsg,
  hasCheckbox,
  submitButtonTitle,
  listStyle,
  callQuickly,
  openContactDetails,
  handleSubmit,
}: TContactList) => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();

  const [selectionMap, setSelectionMap] = useState({} as TSelectionMap);
  const [searchValue, setSearchValue] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [noOfSelectedContacts, setNoOfSelectedContacts] = useState(0);

  const updateSelection = (contactObj: TContact, contactId: string) => {
    let tmpSelectionMap = getClonedObject(selectionMap);
    if (!tmpSelectionMap[contactId]) {
      tmpSelectionMap[contactId] = contactObj;
      setNoOfSelectedContacts(noOfSelectedContacts + 1);
    } else {
      tmpSelectionMap[contactId] = null;
      setNoOfSelectedContacts(noOfSelectedContacts - 1);
    }

    setSelectionMap(tmpSelectionMap);
  };

  const submitSelectedData = () => {
    let result: TContact[] = [];

    for (let objKey in selectionMap) {
      if (Object.hasOwn(selectionMap, objKey)) {
        if (selectionMap[objKey]) {
          result.push(selectionMap[objKey]);
        }
      }
    }

    dispatch(selectContacts(result));
    handleSubmit?.();
  };

  const handleItemPress = (contactObj: TContact, contactId: string) => {
    if (hasCheckbox) {
      updateSelection(contactObj, contactId);
    } else {
      openContactDetails?.(contactObj);
    }
  };

  const handleSearchChange = (searchText: any) => {
    setSearchValue(searchText);
    setFilteredContacts(filterContacts(contacts, searchText));
  };

  const renderItem = (contactObj: TContact, contactId: string) => {
    return (
      <Pressable>
        <ListItem
          bottomDivider
          onPress={() => {
            handleItemPress(contactObj, contactId);
          }}
          key={contactObj?.id + contactObj.displayName}
          containerStyle={{
            backgroundColor: selectionMap[contactId]
              ? theme.colors.background2
              : theme.colors.transparent,
          }}>
          <UserAvatar
            source={
              contactObj.imageBase64Path
                ? (contactObj.imageBase64Path as ImageSourcePropType)
                : (contactObj.imagePath as ImageSourcePropType)
            }
            isBase64={
              contactObj.imageBase64Path &&
              contactObj.imageBase64Path.length > 0
                ? true
                : false
            }
            title={contactObj.displayName}
            contactAvatarStyles={styles.contactAvatar}
            size={34} // Used when there is no image
          />

          <ListItem.Content>
            <ListItem.Title>{contactObj?.displayName}</ListItem.Title>
            <ListItem.Subtitle>{contactObj?.jobTitle}</ListItem.Subtitle>
          </ListItem.Content>
          {callQuickly ? (
            <Icon
              name="phone"
              type="material-community"
              color={COLORS.black}
              onPress={() =>
                callQuickly?.(contactObj?.contactNumbers?.[0]?.value)
              }
            />
          ) : null}

          {hasCheckbox ? (
            <ListItem.CheckBox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={theme.colors.success1}
              checked={selectionMap[contactId] ? true : false}
              onPress={() => updateSelection(contactObj, contactId)}
            />
          ) : null}
        </ListItem>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, listStyle]}>
      <SearchBar
        placeholder={DASHBOARD.searchBox.placeholder}
        onChangeText={handleSearchChange}
        round
        searchIcon={{
          name: 'search',
          size: 25,
        }}
        value={searchValue}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={[
          styles.searchBarInputContainer,
          {backgroundColor: theme.colors.background2},
        ]}
        inputStyle={styles.searchBarInput}
        style={styles.searchBar}
      />
      <FlatList
        style={styles.contactList}
        data={filteredContacts}
        renderItem={({item}) => renderItem(item, item.id)}
        keyExtractor={item => item?.id}
      />
      {!filteredContacts || filteredContacts?.length === 0 ? (
        <EmptyScreen message={emptyMsg || DASHBOARD.emptyMsg} />
      ) : null}
      {submitButtonTitle ? (
        <View style={styles.submitButtonContainer}>
          <Pressable
            style={[
              styles.submitButton,
              {
                backgroundColor:
                  noOfSelectedContacts <= 0
                    ? theme.colors.background2
                    : theme.colors.background6,
              },
            ]}
            disabled={noOfSelectedContacts <= 0}
            onPress={submitSelectedData}>
            <Text
              h4
              style={[
                styles.submitButtonTitleText,
                {color: theme.colors.white},
              ]}>
              {submitButtonTitle}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 5,
  },
  searchBarContainer: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.transparent,
  },
  searchBarInputContainer: {flexBasis: 40},
  searchBarInput: {},
  searchBar: {},
  contactList: {
    flex: 8,
  },
  contactAvatar: {
    width: 35,
    height: 35,
  },
  submitButtonContainer: {},
  submitButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  submitButtonTitleText: {
    textAlign: 'center',
  },
});

export default ContactList;
