import {Overlay as LibraryModal} from '@rneui/themed';
import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';

import ContactList from '$clubhouse/components/ContactList';
import {TContact} from '$dashboard/dashboard.types';

type ModalProps = {
  animationType?: 'none' | 'slide' | 'fade';
  buttonStyle?: object;
  buttonTitle?: string;
  contacts?: TContact[];
  emptyMsg?: string;
  isVisible?: boolean;
  overlayStyles?: object;
  handleBackdropPress?(): void;
  handleSubmit?: (event: GestureResponderEvent) => void;
};

const Modal = ({
  animationType = 'slide',
  buttonTitle,
  contacts,
  emptyMsg,
  isVisible,
  handleBackdropPress,
  overlayStyles = {},
  handleSubmit,
}: ModalProps) => {
  return (
    <LibraryModal
      animationType={animationType}
      isVisible={isVisible || false}
      onBackdropPress={handleBackdropPress}
      overlayStyle={[styles.modalContainer, overlayStyles]}>
      {contacts ? (
        <ContactList
          hasCheckbox
          submitButtonTitle={buttonTitle}
          contacts={contacts}
          emptyMsg={emptyMsg}
          listStyle={styles.contactList}
          handleSubmit={handleSubmit}></ContactList>
      ) : null}
    </LibraryModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContainer: {
    width: '85%',
    height: '85%',
    borderRadius: 10,
  },
  contactList: {
    flex: 1,
  },

  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Modal;
