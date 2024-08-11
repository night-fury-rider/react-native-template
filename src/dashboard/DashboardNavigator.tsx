import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@rneui/themed';

import ScreenTitle from '$clubhouse/components/ScreenTitle';
import ScreenHeaderButton from '$clubhouse/components/ScreenHeaderButton';
import ScreenHeaderRight from '$clubhouse/components/ScreenHeaderRight';
import {DASHBOARD} from '$constants/strings.constants';
import DashboardScreen from '$dashboard/DashboardScreen';
import DashboardHeader from '$dashboard/DashboardHeader';
import ContactDetailsScreen from '$dashboard/ContactDetailsScreen';
import ContactEditScreen from '$dashboard/ContactEditScreen';

const NavigationStack = createNativeStackNavigator();

const DashboardNavigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationStack.Navigator>
      <NavigationStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: DASHBOARD.title,
          statusBarColor: theme.colors.background1,
          statusBarStyle: 'dark',
          header: ({}) => {
            return <DashboardHeader />;
          },
        }}
      />
      <NavigationStack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background1,
          },
          headerShadowVisible: false,
          headerTintColor: theme.colors.text1,
          statusBarColor: theme.colors.background1,
          statusBarStyle: 'dark',
          headerTitle: () => <ScreenTitle title="" variant="h4" />,
          headerRight: () => <ScreenHeaderRight />,
        }}
      />
      <NavigationStack.Screen
        name="EditContact"
        component={ContactEditScreen}
        options={() => ({
          headerStyle: {backgroundColor: theme.colors.background1},
          statusBarColor: theme.colors.background1,
          statusBarStyle: 'dark',
          headerTintColor: theme.colors.background6,
          headerRight: () => <ScreenHeaderButton />,
        })}
      />
    </NavigationStack.Navigator>
  );
};

export default DashboardNavigator;
