import {Text} from '@rneui/themed';
import {StyleSheet} from 'react-native';

type ScreenTitleProps = {
  title: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | undefined;
};

const ScreenTitle = ({title, variant}: ScreenTitleProps) => {
  switch (variant) {
    case 'h1':
      return (
        <Text h1 style={[styles.text]}>
          {title}
        </Text>
      );
    case 'h2':
      return (
        <Text h2 style={[styles.text]}>
          {title}
        </Text>
      );
    case 'h3':
      return (
        <Text h3 style={[styles.text]}>
          {title}
        </Text>
      );
    case 'h4':
      return (
        <Text h4 style={[styles.text]}>
          {title}
        </Text>
      );
    default:
      return <Text style={[styles.text]}>{title}</Text>;
  }
};

export default ScreenTitle;

const styles = StyleSheet.create({
  text: {},
});
