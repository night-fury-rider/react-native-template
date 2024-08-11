import {Dialog, Text, useTheme} from '@rneui/themed';
import uvNumber from '@uv-tech/util/lib/uv-number';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';

import ScreenHeaderRight from '$clubhouse/components/ScreenHeaderRight';
import Tile from '$clubhouse/components/Tile';
import UserAvatar from '$clubhouse/components/UserAvatar';
import {DASHBOARD} from '$clubhouse/constants/strings.constants';
import {useAppDispatch, useAppSelector} from '$clubhouse/redux/redux.hooks';
import LoggerService from '$clubhouse/services/LoggerService';
import {
  makeAudioCall,
  sendEmail,
  sendTextMessage,
  sendWhatsAppTextMessage,
  showDirections,
} from '$clubhouse/services/PlatformService';
import {
  TContactNumber,
  TEmailId,
  TLabeledItem,
  TAddress,
} from '$dashboard/dashboard.types';
import {deleteContact} from '$dashboard/ContactService';
import {setContacts} from '$dashboard/dashboardSlice';
import {shareContact} from '$tools/ToolsService';

// TODO: Use specific type instead of any
const ContactDetailsScreen = ({navigation, route}: any) => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(state => state.dashboard.contacts);

  const {contactObj} = route?.params;
  const {displayName, jobTitle, contactNumbers, note} = contactObj;
  const [infoItems, setInfoItems] = useState([] as TLabeledItem[]);
  const [isDeletePromptVisible, setDeletePromptVisible] = useState(false);

  /**
   * Screen Header Options
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ScreenHeaderRight
          icons={[
            {name: 'pencil-outline', handlePress: editContact},
            {name: 'delete', handlePress: confirmDelete},
            {
              name: 'share-variant',
              handlePress: initiateContactSharing,
            },
          ]}
        />
      ),
    });
  }, [navigation, contactObj]);

  useEffect(() => {
    let isNonEmptyField;
    let items: TLabeledItem[] = [];

    // Contact Numbers for regular calls
    contactObj?.contactNumbers?.forEach(
      (obj: TContactNumber, objIndex: number) => {
        if (obj.value) {
          isNonEmptyField = true;
        }
        items.push({
          index: objIndex,
          label: obj.label,
          value: obj.value ? uvNumber.formatContactNumber(obj.value) : '',
          leftIcon: 'phone-outline',
          leftIconCallback: (phoneNumber: string) => {
            initiateAudioCall(phoneNumber);
          },
          rightIcon: 'message-text-outline',
          rightIconCallback: (phoneNumber: string) => {
            initiateTextMessage(phoneNumber);
          },
        });
      },
    );

    contactObj?.emailIds?.forEach((obj: TEmailId, objIndex: number) => {
      if (obj.value) {
        isNonEmptyField = true;
      }
      items.push({
        index: objIndex,
        label: obj.label,
        value: obj.value,
        leftIcon: 'email-outline',
        leftIconCallback: (emailId: string) => {
          initiateEmail(emailId);
        },
      });
    });

    contactObj?.addresses?.forEach((obj: TAddress, objIndex: number) => {
      if (obj.value) {
        isNonEmptyField = true;
      }
      items.push({
        index: objIndex,
        label: obj.label,
        value: obj.value,
        leftIcon: 'map-marker-outline',
        rightIcon: 'directions',
        rightIconCallback: (locationStr: string) => {
          initiateDirections(locationStr);
        },
      });
    });

    // Contact Numbers for Whatsapp Messages
    contactObj?.contactNumbers?.forEach((obj: TAddress, objIndex: number) => {
      if (obj.value) {
        isNonEmptyField = true;
      }
      items.push({
        index: objIndex,
        label: obj.label,
        value: obj.value ? uvNumber.formatContactNumber(obj.value) : '',
        leftIconBrand: true,
        leftIcon: 'whatsapp',
        leftIconColor: 'green',
        leftIconCallback: (phoneNumber: string) => {
          initiateWhatsAppTextMessage(phoneNumber);
        },
      });
    });

    if (contactObj.bloodGroup) {
      isNonEmptyField = true;
    }
    items.push({
      index: 0,
      value: contactObj.bloodGroup,
      leftIconBrand: true,
      leftIcon: 'blood-drop',
      leftIconType: 'fontisto',
    });

    if (contactObj.note) {
      isNonEmptyField = true;
    }
    items.push({
      index: 0,
      value: contactObj.note,
      leftIconBrand: true,
      leftIcon: 'note-text-outline',
    });

    if (isNonEmptyField) {
      setInfoItems(items);
    }
  }, [displayName, jobTitle, contactNumbers, note]);

  const initiateAudioCall = (phoneNumber?: string) => {
    makeAudioCall(phoneNumber);
  };
  const initiateTextMessage = (phoneNumber?: string) => {
    sendTextMessage(phoneNumber);
  };

  const initiateEmail = (emailId?: string) => {
    sendEmail(emailId);
  };
  const initiateDirections = (locationStr?: string) => {
    showDirections(locationStr);
  };

  const initiateWhatsAppTextMessage = (phoneNumber?: string) => {
    sendWhatsAppTextMessage(phoneNumber);
  };

  const confirmDelete = () => {
    setDeletePromptVisible(true);
  };

  const initiateContactSharing = () => {
    shareContact(contactObj);
  };

  const initializeDeleteContact = () => {
    dispatch(setContacts(deleteContact(contacts, contactObj.id)));
    handleDeletePromptClosing();
    navigation.goBack();
    LoggerService.info(DASHBOARD.contactDetails.successMsg.deleted);
  };

  const editContact = () => {
    navigation.navigate('EditContact', {contactObj});
  };

  const handleDeletePromptClosing = () => {
    setDeletePromptVisible(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        {
          backgroundColor: theme.colors.background7,
        },
      ]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <UserAvatar
          contactAvatarStyles={styles.contactAvatar}
          isBase64={
            contactObj.imageBase64Path && contactObj.imageBase64Path.length > 0
              ? true
              : false
          }
          isTitleTransparant
          size={156}
          source={
            contactObj.imageBase64Path
              ? contactObj.imageBase64Path
              : contactObj.imagePath
          }
          title={contactObj.displayName}
        />

        <Text h1 style={styles.contactNameTitle}>
          {contactObj.displayName}
        </Text>

        <Text style={styles.jobTitle}>{contactObj.jobTitle}</Text>

        <Tile
          title={DASHBOARD.contactDetails.info}
          styles={styles.contactInfoTile}
          titleStyles={styles.contactInfoTileTitle}
          labeledItems={infoItems}
        />

        <Dialog
          isVisible={isDeletePromptVisible}
          onBackdropPress={handleDeletePromptClosing}>
          <Dialog.Title title={DASHBOARD.contactDetails.deletePrompt.title} />
          <Text>{DASHBOARD.contactDetails.deletePrompt.message}</Text>
          <Dialog.Actions>
            <Dialog.Button
              title={DASHBOARD.contactDetails.deletePrompt.cancel}
              onPress={handleDeletePromptClosing}
            />
            <Dialog.Button
              title={DASHBOARD.contactDetails.deletePrompt.delete}
              titleStyle={{color: theme.colors.danger1}}
              onPress={initializeDeleteContact}
            />
          </Dialog.Actions>
        </Dialog>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },

  contactAvatar: {},

  contactNameTitle: {
    paddingVertical: 10,
  },

  jobTitle: {
    fontSize: 16,
  },

  contactInfoTile: {
    width: '100%',
    borderColor: 'red',
    borderWidth: 2,
  },
  contactInfoTileTitle: {
    textAlign: 'left',
  },
});

export default ContactDetailsScreen;
