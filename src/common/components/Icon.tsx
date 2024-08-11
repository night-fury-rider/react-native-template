import {Icon as LibraryIcon} from '@rneui/themed';
import {GestureResponderEvent} from 'react-native';

import {COLORS} from '$clubhouse/constants/colors.constants';

type IconProps = {
  iconName: string;
  iconSize?: number;
  iconType?: string;
  iconColor?: string;
  iconStyles?: object;
  handlePress?: (event: GestureResponderEvent) => void;
};

const Icon = ({
  iconName,
  iconSize,
  iconType,
  iconColor,
  iconStyles,
  handlePress,
}: IconProps) => {
  return (
    <LibraryIcon
      name={iconName || 'plus'}
      type={iconType || 'material-community'}
      style={iconStyles || {}}
      color={iconColor || COLORS.black}
      onPress={handlePress}
      size={iconSize || 32}
    />
  );
};

export default Icon;
