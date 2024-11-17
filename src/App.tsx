import React from 'react';
import {Appbar, BottomNavigation, useTheme} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import ErrorBoundary from '$common/components/ErrorBoundary';
import {LIGHT_COLORS} from '$common/constants/colors.constants';
import {SETTINGS} from '$common/constants/strings.constants';
import StorageService from '$common/services/StorageService';
import DashboardScreen from '$dashboard/DashboardScreen';
import SettingsScreen from '$settings/SettingsScreen';

StorageService.init();

function App() {
  const theme = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'dashboard',
      title: 'Dashboard',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'wrench',
      unfocusedIcon: 'wrench-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardScreen,
    settings: SettingsScreen,
  });

  const renderAppBar = () => {
    // Only show Appbar for Settings Screen
    if (index === routes.length - 1) {
      return (
        <Appbar.Header>
          <Appbar.Content title={SETTINGS.title} />
        </Appbar.Header>
      );
    }
    return null; // Don't render Appbar for other screens
  };

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        {renderAppBar()}
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{
            backgroundColor: theme.dark
              ? theme.colors.inverseOnSurface
              : LIGHT_COLORS.background4,
          }}
          activeIndicatorStyle={{
            backgroundColor: theme.dark
              ? theme.colors.surface
              : LIGHT_COLORS.background3,
          }}
        />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
export default App;
