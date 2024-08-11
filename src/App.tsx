import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ErrorBoundary from '$clubhouse/components/ErrorBoundary';
import {useAppDispatch, useAppSelector} from '$clubhouse/redux/redux.hooks';
import StorageService from '$clubhouse/services/StorageService';
import {getTheme, getColors} from '$clubhouse/services/ThemeService';
import {DASHBOARD, SETTINGS, TOOLS} from '$constants/strings.constants';
import DashboardNavigator from '$dashboard/DashboardNavigator';
import {setContacts} from '$dashboard/dashboardSlice';
import {getTabBarIconName} from '$navigation/NavigationService';
import SettingsNavigator from '$settings/SettingsNavigator';
import ToolsNavigator from '$tools/ToolsNavigator';
import {setColorThemeIndex} from 'settings/settingsSlice';

/**
 * @description Gives data required for rendering bottom tabs
 * @returns {array} Bottom tabs data
 */
const getBottomTabs = () => [
  {
    name: 'DashboardNavigator',
    component: DashboardNavigator,
    options: {
      title: DASHBOARD.title,
      headerShown: false,
    },
  },
  {
    name: 'SettingsNavigator',
    component: SettingsNavigator,
    options: () => ({
      title: SETTINGS.title,
      headerShown: false,
    }),
  },
  {
    name: 'ToolsNavigator',
    component: ToolsNavigator,
    options: () => ({
      title: TOOLS.title,
      headerShown: false,
    }),
  },
];

const NavigationTab = createBottomTabNavigator();
const tabs = getBottomTabs();
StorageService.init();

// TODO: Integrate this to screens to avoid using `any` type
export type TRootStackParamList = {
  DashboardNavigator: undefined; // undefined because we aren't passing any params to this screen
  Settings: undefined;
  Tools: undefined;
};

function App() {
  const dispatch = useAppDispatch();

  const colorThemeIndex = useAppSelector(
    state => state.settings.colorThemeIndex,
  );

  const appColors = getColors(colorThemeIndex);

  useEffect(() => {
    // When we use await in useEffect that means it's gonna return a promise but useEffect doesn't expect any value to be returned.
    // Added self involking function so that useEffect treats it as void function.
    (async () => {
      const existingContacts = await StorageService.get('contacts');
      if (existingContacts) {
        dispatch(setContacts(existingContacts));
      }
      dispatch(setColorThemeIndex(colorThemeIndex));
    })();
  }, []);

  const appTheme = getTheme(colorThemeIndex);
  if (appTheme) {
    // @ts-ignore
    appTheme.mode = useColorScheme();
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={appTheme}>
        <NavigationContainer>
          <NavigationTab.Navigator
            sceneContainerStyle={{backgroundColor: appColors?.background1}}
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Ionicons
                    name={getTabBarIconName(route, focused)}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: appColors?.background5,
              tabBarStyle: {
                backgroundColor: appColors?.background4,
              },
              tabBarInactiveTintColor: 'gray',
              tabBarLabelStyle: styles.tabBarLabel,
            })}>
            {tabs.map((tabObj, index) => (
              <NavigationTab.Screen
                key={tabObj.name + index}
                name={tabObj.name}
                component={tabObj.component}
                options={tabObj.options}
              />
            ))}
          </NavigationTab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  // As this element is from React Navigation, we can't move this to ThemeService.
  tabBarLabel: {
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'IBMPlexSerif-Bold',
    marginBottom: 3,
  },
});

export default App;
