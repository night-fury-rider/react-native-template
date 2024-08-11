import {ImageSourcePropType, StyleSheet} from 'react-native';
import {Avatar, useTheme} from '@rneui/themed';

import {COLORS} from '$clubhouse/constants/colors.constants';

type TUserAvatarProps = {
  contactAvatarStyles?: object;
  contactAvatarTitleStyles?: object;
  isBase64?: boolean;
  isTitleTransparant?: boolean;
  size?: number; // Used when there is no image
  source?: ImageSourcePropType;
  title?: string;
  handleAvatarPress?: Function;
};

const UserAvatar = ({
  contactAvatarStyles,
  contactAvatarTitleStyles,
  isBase64,
  isTitleTransparant,
  size,
  source,
  title,
  handleAvatarPress,
}: TUserAvatarProps) => {
  const {theme} = useTheme();
  const avatarTitle = !source && title ? title[0] : '';

  return (
    <Avatar
      rounded
      source={isBase64 ? {uri: `data:image/jpeg;base64,${source}`} : source}
      size={size ? size : 256}
      title={avatarTitle}
      containerStyle={[styles.contactAvatar, contactAvatarStyles]}
      titleStyle={[
        styles.contactAvatarTitle,
        {
          color: theme.colors.text1,
        },
        {
          backgroundColor: isTitleTransparant
            ? theme.colors.transparent
            : theme.colors.background3,
        },
        contactAvatarTitleStyles,
      ]}
      onPress={() => {
        handleAvatarPress?.();
      }}
    />
  );
};

const styles = StyleSheet.create({
  contactAvatar: {
    borderColor: COLORS.grey,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  contactAvatarTitle: {
    textAlignVertical: 'center',
    height: '100%',
    borderRadius: 50,
  },
});

export default UserAvatar;
