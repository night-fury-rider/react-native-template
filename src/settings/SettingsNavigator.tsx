import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@rneui/themed';

import ScreenTitle from '$clubhouse/components/ScreenTitle';
import {SETTINGS} from '$constants/strings.constants';
import SettingsScreen from '$settings/SettingsScreen';

const NavigationStack = createNativeStackNavigator();

const SettingsNavigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationStack.Navigator>
      <NavigationStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: SETTINGS.title,
          statusBarColor: theme.colors.background1,
          statusBarStyle: 'dark',
          headerStyle: {backgroundColor: theme.colors.background1},
          headerTitle: () => (
            <ScreenTitle title={SETTINGS.title} variant="h3" />
          ),
        }}
      />
    </NavigationStack.Navigator>
  );
};

export default SettingsNavigator;
