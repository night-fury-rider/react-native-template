import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {FAB, Icon, ListItem, useTheme} from '@rneui/themed';

import EmptyScreen from '$clubhouse/components/EmptyScreen';
import UserAvatar from '$clubhouse/components/UserAvatar';
import {DASHBOARD} from '$clubhouse/constants/strings.constants';
import {useAppSelector} from '$clubhouse/redux/redux.hooks';
import {makeAudioCall} from '$clubhouse/services/PlatformService';
import {TContact} from '$dashboard/dashboard.types';

// TODO: Use specific type instead of any
const DashboardScreen = ({navigation}: any) => {
  const {theme} = useTheme();

  const filteredContacts = useAppSelector(
    state => state.dashboard.filteredContacts,
  );

  const allContacts = useAppSelector(state => state.dashboard.contacts);

  const openContactDetails = (contactObj: TContact) => {
    navigation.navigate('ContactDetails', {
      contactObj,
    });
  };

  const openAddContactScreen = () => {
    navigation.navigate('EditContact', {});
  };

  const callQuickly = (phoneNumber?: string) => {
    makeAudioCall(phoneNumber);
  };

  const renderItem = (contactObj: TContact) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => {
          openContactDetails(contactObj as TContact);
        }}
        key={contactObj?.id + contactObj.displayName}>
        <UserAvatar
          source={
            contactObj.imageBase64Path
              ? (contactObj.imageBase64Path as ImageSourcePropType)
              : (contactObj.imagePath as ImageSourcePropType)
          }
          isBase64={
            contactObj.imageBase64Path && contactObj.imageBase64Path.length > 0
              ? true
              : false
          }
          title={contactObj.displayName}
          contactAvatarStyles={styles.contactAvatar}
          size={34} // Used when there is no image
          handleAvatarPress={() => {
            openContactDetails(contactObj as TContact);
          }}
        />

        <ListItem.Content>
          <ListItem.Title>{contactObj?.displayName}</ListItem.Title>
          <ListItem.Subtitle>{contactObj?.jobTitle}</ListItem.Subtitle>
        </ListItem.Content>

        <TouchableOpacity
          onPress={() => callQuickly?.(contactObj?.contactNumbers?.[0]?.value)}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
          <Icon
            name="phone"
            type="material-community"
            color={theme.colors.background6}
            onPress={() =>
              callQuickly?.(contactObj?.contactNumbers?.[0]?.value)
            }
          />
        </TouchableOpacity>
      </ListItem>
    );
  };

  return (
    <>
      {!filteredContacts || filteredContacts?.length === 0 ? (
        <EmptyScreen
          message={
            allContacts?.length === 0
              ? DASHBOARD.emptyMsg
              : DASHBOARD.searchBox.noResults
          }
          iconName="phone-outline"
        />
      ) : null}
      <View style={{flex: 1}}>
        <FlatList
          data={filteredContacts}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
          style={{backgroundColor: theme.colors.background1}}
        />
      </View>
      <FAB
        visible
        placement={'right'}
        icon={{name: 'add', color: 'black'}}
        color={theme.colors.background3}
        onPress={openAddContactScreen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactAvatar: {
    width: 35,
    height: 35,
  },
});

export default DashboardScreen;
