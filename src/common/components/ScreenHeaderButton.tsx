import {Icon} from '@rneui/themed';
import {GestureResponderEvent} from 'react-native';

import Button from '$clubhouse/components/Button';

type TScreenHeaderButtonProps = {
  title?: string;
  iconName?: string;
  iconType?: string;
  handlePress?: (event: GestureResponderEvent) => void;
};
const ScreenHeaderButton = ({
  title,
  iconName,
  iconType,
  handlePress,
}: TScreenHeaderButtonProps) => {
  if (iconName) {
    return <Icon name={iconName} type={iconType || 'material-community'} />;
  }

  return <Button title={title || 'OK'} handlePress={handlePress} />;
};

export default ScreenHeaderButton;
