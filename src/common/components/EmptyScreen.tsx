import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from '@rneui/themed';

import Icon from '$clubhouse/components/Icon';

type EmptyScreenProps = {
  message: string;
  iconName?: string;
};

const EmptyScreen = ({message, iconName}: EmptyScreenProps) => {
  const {theme} = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background1}]}>
      {iconName ? (
        <Icon
          iconName={iconName}
          iconColor={theme.colors.background6}
          iconSize={50}
          iconStyles={styles.icon}
        />
      ) : null}

      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginVertical: 20,
  },
  message: {
    fontSize: 20,
  },
});
