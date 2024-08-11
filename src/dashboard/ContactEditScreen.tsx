import {
  Avatar,
  Button,
  CheckBox,
  Dialog,
  Icon,
  ListItem,
  useTheme,
} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import APP_CONFIG from '$clubhouse/constants/app.config.constants';
import ScreenHeaderButton from '$clubhouse/components/ScreenHeaderButton';
import {useAppDispatch, useAppSelector} from '$clubhouse/redux/redux.hooks';
import ScreenTitle from '$clubhouse/components/ScreenTitle';
import UserAvatar from '$clubhouse/components/UserAvatar';
import {DASHBOARD} from '$clubhouse/constants/strings.constants';
import LoggerService from '$clubhouse/services/LoggerService';
import {getClonedObject} from '$clubhouse/services/UtilService';
import {
  refineContact,
  sortContacts,
  updateContact,
} from '$dashboard/ContactService';
import {setContacts} from '$dashboard/dashboardSlice';

// TODO: Use specific type instead of any
const ContactEditScreen = ({navigation, route}: any) => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(state => state.dashboard.contacts);

  const {contactObj} = route?.params;
  const isAddContactScreen = !contactObj;

  const [contactName, setContactName] = useState(contactObj?.displayName || '');

  const [primaryContactNumber, setPrimaryContactNumber] = useState(
    contactObj?.contactNumbers?.[0]?.value || '',
  );
  const [secondaryContactNumber, setSecondaryContactNumber] = useState(
    contactObj?.contactNumbers?.[1]?.value || '',
  );

  const [primaryAddress, setPrimaryAddress] = useState(
    contactObj?.addresses?.[0]?.value || '',
  );

  const [secondaryAddress, setSecondaryAddress] = useState(
    contactObj?.addresses?.[1]?.value || '',
  );

  const [bloodGroup, setBloodGroup] = useState(contactObj?.bloodGroup);
  const [isBloodGroupSelectionOpen, setBloodGroupSelectionOpen] =
    useState(false);
  const [bloodGroupIndex, setBloodGroupIndex] = useState(0);

  const openBloodGroupSelection = () => {
    setBloodGroupSelectionOpen(true);
  };

  const closeBloodGroupSelection = () => {
    setBloodGroupSelectionOpen(false);
  };

  const selectBloodGroup = () => {
    setBloodGroup(APP_CONFIG.bloodGroups[bloodGroupIndex]);
    closeBloodGroupSelection();
  };

  const [primaryEmailId, setPrimaryEmailId] = useState(
    contactObj?.emailIds?.[0]?.value || '',
  );

  const [secondaryEmailId, setSecondaryEmailId] = useState(
    contactObj?.emailIds?.[1]?.value || '',
  );

  const [contactImageBase64, setContactImageBase64] = useState(
    contactObj?.imageBase64Path || '',
  );
  const [contactImage, setContactImage] = useState(contactObj?.imagePath || '');

  const [jobTitle, setJobTitle] = useState(contactObj?.jobTitle || '');
  const [note, setNote] = useState(contactObj?.note || '');

  /**
   * Screen Header Options
   */
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ScreenTitle
          title={
            isAddContactScreen
              ? DASHBOARD.editContact.createContact
              : DASHBOARD.editContact.editContact
          }
          variant="h4"
        />
      ),
      headerRight: () => (
        <ScreenHeaderButton
          title={DASHBOARD.editContact.saveBtnText}
          handlePress={saveContact}></ScreenHeaderButton>
      ),
    });
  }, [
    navigation,
    contactName,
    primaryContactNumber,
    secondaryContactNumber,
    primaryAddress,
    secondaryAddress,
    bloodGroup,
    primaryEmailId,
    secondaryEmailId,
    contactImageBase64,
    contactImage,
    jobTitle,
    note,
  ]);

  const selectAvatar = async () => {
    const imagePickerOptions = {
      mediaType: 'photo' as any,
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
    };

    const result = await ImagePicker.openPicker(imagePickerOptions);

    const imagePath = result.path || '';
    const imageBase64Path = '' + result.data;

    setContactImage(imagePath);
    setContactImageBase64(imageBase64Path);
  };

  const saveContact = () => {
    let newContact = refineContact({
      id: 'uv_' + Math.random().toString(16).slice(2),
      primaryContactNumber,
      secondaryContactNumber,
      displayName: contactName,
      primaryAddress,
      secondaryAddress: '', // TODO: Use this to add secondary address
      bloodGroup,
      primaryEmailId,
      secondaryEmailId,
      imageBase64Path: contactImageBase64,
      imagePath: contactImage,
      jobTitle,
      note,
    });

    if (isAddContactScreen) {
      let updatedContacts = getClonedObject(contacts);
      updatedContacts.push(newContact);
      updatedContacts = sortContacts(updatedContacts);
      dispatch(setContacts(updatedContacts));
      navigation.goBack();
    } else {
      dispatch(setContacts(updateContact(contacts, contactObj.id, newContact)));
      navigation.navigate('ContactDetails', {
        contactObj: newContact,
      });
    }
    LoggerService.info(DASHBOARD.editContact.successMsg.updated);
  };

  const handleRemovePicture = () => {
    setContactImage('');
    setContactImageBase64('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {backgroundColor: theme.colors.background7},
        ]}>
        {/* Photo */}
        <View style={styles.profilePhotoContainer}>
          {contactImage ? (
            <UserAvatar
              source={{uri: contactImage}}
              contactAvatarStyles={styles.contactAvatar}
              handleAvatarPress={selectAvatar}
            />
          ) : (
            <>
              <Avatar
                size={150}
                rounded
                icon={{
                  name: 'image-plus',
                  type: 'material-community',
                  color: theme.colors.background6,
                }}
                containerStyle={{backgroundColor: theme.colors.background4}}
                onPress={selectAvatar}
              />
              <Button
                title={DASHBOARD.editContact.addPicture}
                iconContainerStyle={styles.updatePictureIcon}
                titleStyle={[
                  styles.updatePictureTitle,
                  {color: theme.colors.background6},
                ]}
                buttonStyle={styles.updatePictureBtn}
                containerStyle={styles.updatePictureBtnContainer}
                onPress={selectAvatar}
              />
            </>
          )}
        </View>

        {contactImage ? (
          <View style={styles.updatePictureContainer}>
            <Button
              title={DASHBOARD.editContact.changePicture}
              icon={{
                name: 'pencil-outline',
                type: 'material-community',
                size: 20,
                color: theme.colors.background6,
              }}
              iconContainerStyle={styles.updatePictureIcon}
              titleStyle={[
                styles.updatePictureTitle,
                {color: theme.colors.text1},
              ]}
              buttonStyle={styles.updatePictureBtn}
              containerStyle={styles.updatePictureBtnContainer}
              onPress={selectAvatar}
            />
            <Button
              title={DASHBOARD.editContact.removePicture}
              icon={{
                name: 'trash-can-outline',
                type: 'material-community',
                size: 20,
                color: theme.colors.background6,
              }}
              iconContainerStyle={styles.updatePictureIcon}
              titleStyle={[
                styles.updatePictureTitle,
                {color: theme.colors.text1},
              ]}
              buttonStyle={styles.updatePictureBtn}
              containerStyle={styles.updatePictureBtnContainer}
              onPress={handleRemovePicture}
            />
          </View>
        ) : null}

        {/* Contact Name */}
        <ListItem
          style={[styles.row, styles.nameRow]}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon name="person-outline" />
          <ListItem.Input
            style={styles.nameInputContainer}
            placeholder={DASHBOARD.editContact.enterName}
            onChangeText={setContactName}
            value={contactName}></ListItem.Input>
        </ListItem>

        {/* Job Title */}
        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon name="work-outline" />
          <ListItem.Input
            style={styles.nameInputContainer}
            placeholder={DASHBOARD.editContact.enterJobTitle}
            onChangeText={setJobTitle}
            value={jobTitle}></ListItem.Input>
        </ListItem>

        {/*Primary Contact Number */}

        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon name="phone-outline" type="material-community" />
          <ListItem.Input
            style={styles.phoneInputContainer}
            inputStyle={styles.phoneInput}
            placeholder={DASHBOARD.editContact.enterPrimaryNumber}
            inputMode={'tel'}
            onChangeText={setPrimaryContactNumber}
            value={primaryContactNumber}></ListItem.Input>
        </ListItem>

        {/*Secondary Contact Number */}

        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon
            name="phone-outline"
            type="material-community"
            style={styles.disabledIcon}
          />
          <ListItem.Input
            style={styles.phoneInputContainer}
            inputStyle={styles.phoneInput}
            placeholder={DASHBOARD.editContact.enterSecondaryNumber}
            inputMode={'tel'}
            onChangeText={setSecondaryContactNumber}
            value={secondaryContactNumber}></ListItem.Input>
        </ListItem>

        {/*Primary Address */}
        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon name="location-outline" type="ionicon" />
          <ListItem.Input
            style={styles.nameInputContainer}
            placeholder={DASHBOARD.editContact.enterAddress}
            onChangeText={setPrimaryAddress}
            multiline
            value={primaryAddress}></ListItem.Input>
        </ListItem>

        {/*Primary Email Id */}
        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon name="email-outline" type="material-community" />
          <ListItem.Input
            style={styles.nameInputContainer}
            placeholder={DASHBOARD.editContact.enterEmailId}
            inputMode={'email'}
            onChangeText={setPrimaryEmailId}
            value={primaryEmailId}></ListItem.Input>
        </ListItem>

        {/*Blood Group */}
        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon
            name="blood-drop"
            type="fontisto"
            containerStyle={styles.fontistoIconContainer}
          />
          <Pressable style={{width: '85%'}} onPress={openBloodGroupSelection}>
            <ListItem.Input
              editable={false}
              style={styles.inputWithIcon}
              containerStyle={styles.inputWithIconContainer}
              placeholder={DASHBOARD.editContact.bloodGroup}
              rightIcon={{name: 'chevron-down', type: 'material-community'}}
              value={bloodGroup}></ListItem.Input>
          </Pressable>
        </ListItem>
        <Dialog
          isVisible={isBloodGroupSelectionOpen}
          onBackdropPress={closeBloodGroupSelection}>
          <Dialog.Title
            title={DASHBOARD.editContact.bloodGroupSelectionTitle}
          />
          {APP_CONFIG.bloodGroups?.map((l, i) => (
            <CheckBox
              key={i}
              title={l}
              containerStyle={{backgroundColor: 'white', borderWidth: 0}}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={bloodGroupIndex === i}
              onPress={() => setBloodGroupIndex(i)}
            />
          ))}

          <Dialog.Actions>
            <Dialog.Button
              title="CONFIRM"
              onPress={() => {
                selectBloodGroup();
              }}
            />
            <Dialog.Button title="CANCEL" onPress={closeBloodGroupSelection} />
          </Dialog.Actions>
        </Dialog>

        {/* Note */}
        <ListItem
          style={styles.row}
          containerStyle={{backgroundColor: theme.colors.transparent}}>
          <Icon name="note-text-outline" type="material-community" />
          <ListItem.Input
            style={styles.nameInputContainer}
            placeholder={DASHBOARD.editContact.enterNote}
            onChangeText={setNote}
            value={note}
            multiline
            numberOfLines={2}></ListItem.Input>
        </ListItem>
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
  },

  profilePhotoContainer: {
    marginTop: 20,
  },

  row: {
    width: '100%',
    paddingHorizontal: 5,
  },

  disabledIcon: {
    opacity: 0,
  },

  nameRow: {marginVertical: 20},

  nameInputContainer: {
    textAlign: 'left',
    borderWidth: 1,
  },

  contactAvatar: {
    width: 150,
    height: 150,
  },

  addPicture: {
    marginTop: 10,
    textAlign: 'center',
  },

  updatePictureContainer: {
    flexDirection: 'row',
  },
  updatePictureBtnContainer: {marginVertical: 10},
  updatePictureBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  updatePictureIcon: {marginRight: 10},
  updatePictureTitle: {fontWeight: '700'},

  contactNameTitle: {
    paddingVertical: 10,
  },

  phoneInputContainer: {textAlign: 'left', borderWidth: 1},
  phoneInput: {},

  fontistoIconContainer: {paddingHorizontal: 5},
  inputWithIconContainer: {
    borderWidth: 1,
    marginLeft: '2%',
  },
  inputWithIcon: {textAlign: 'left'},
});

export default ContactEditScreen;
