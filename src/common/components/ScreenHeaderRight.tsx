import {Button, Icon} from '@rneui/themed';
import {GestureResponderEvent, StyleSheet} from 'react-native';

type TScreenHeaderIcons = {
  name: string;
  type?: string;
  handlePress?: (event: GestureResponderEvent) => void;
};

type TScreenHeaderButtonProps = {
  title?: string;
  icons?: TScreenHeaderIcons[];
  handlePress?: (event: GestureResponderEvent) => void;
};
const ScreenHeaderRight = ({
  title,
  icons,
  handlePress,
}: TScreenHeaderButtonProps) => {
  if (icons && icons?.length > 0) {
    return (
      <>
        {icons.map((iconObj: TScreenHeaderIcons, index) => (
          <Icon
            key={iconObj.name + index}
            name={iconObj.name}
            type={iconObj.type || 'material-community'}
            containerStyle={styles.icon}
            onPress={iconObj.handlePress}
          />
        ))}
      </>
    );
  }
  return <Button onPress={handlePress}>{title || 'OK'}</Button>;
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
});

export default ScreenHeaderRight;
