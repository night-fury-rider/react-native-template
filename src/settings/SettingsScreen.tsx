import {Badge, ListItem, Switch, useTheme} from '@rneui/themed';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import APP_CONFIG from '$clubhouse/constants/app.config.constants';
import {SETTINGS} from '$clubhouse/constants/strings.constants';
import {useAppDispatch, useAppSelector} from '$clubhouse/redux/redux.hooks';
import StorageService from '$clubhouse/services/StorageService';
import {getTheme} from '$clubhouse/services/ThemeService';
import {
  setColorThemeIndex,
  setDevelopersOptions,
} from '$settings/settingsSlice';
import {Dialog} from '@rneui/themed';

const SettingsScreen = () => {
  const {theme, updateTheme} = useTheme();
  const dispatch = useAppDispatch();
  const [isThemeSelectionVisible, setThemeSelectionVisible] = useState(false);

  const colorThemeIndex = useAppSelector(
    state => state.settings.colorThemeIndex,
  );

  const developersOptionsEnabled = useAppSelector(
    state => state.settings.developersOptionsEnabled,
  );

  const totalContacts = useAppSelector(
    state => state.dashboard.contacts,
  )?.length;

  const [selectedTheme, setSelectedTheme] = useState(
    APP_CONFIG.colorThemes[colorThemeIndex],
  );

  const handleColorThemeChange = (themeIndex: number) => {
    hideColorThemeSelection();
    setSelectedTheme(APP_CONFIG.colorThemes[themeIndex]);
    StorageService.set(`colorThemeIndex`, themeIndex);
    dispatch(setColorThemeIndex(themeIndex));
    updateTheme(getTheme(themeIndex));
  };

  const confirmColorThemeSelection = () => {
    setThemeSelectionVisible(true);
  };

  const hideColorThemeSelection = () => {
    setThemeSelectionVisible(false);
  };

  const handleDeveloperOptionsChange = (isEnabled = false) => {
    dispatch(setDevelopersOptions(isEnabled));
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background7}]}>
      <ListItem
        bottomDivider
        topDivider
        containerStyle={{
          backgroundColor: theme.colors.background7,
        }}>
        <ListItem.Content>
          <ListItem.Title>{SETTINGS.totalContacts}</ListItem.Title>
        </ListItem.Content>
        <Badge
          badgeStyle={styles.badgeRound}
          value={totalContacts}
          status="primary"
        />
      </ListItem>
      <ListItem
        bottomDivider
        topDivider
        containerStyle={{
          backgroundColor: theme.colors.background7,
        }}>
        <ListItem.Content>
          <ListItem.Title>{SETTINGS.appVersion}</ListItem.Title>
        </ListItem.Content>
        <Badge
          badgeStyle={styles.badge}
          value={DeviceInfo.getVersion()}
          status="primary"
        />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: theme.colors.background7,
        }}
        onPress={confirmColorThemeSelection}>
        <ListItem.Content>
          <ListItem.Title>{SETTINGS.chooseColorTheme}</ListItem.Title>
        </ListItem.Content>

        <Badge
          badgeStyle={styles.themeColorBadge}
          textStyle={styles.themeColorBadgeTitle}
          value={selectedTheme}
          status="primary"
        />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: theme.colors.background7,
        }}>
        <ListItem.Content>
          <ListItem.Title>{SETTINGS.developerOptions}</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={developersOptionsEnabled}
          onValueChange={value => handleDeveloperOptionsChange(value)}
        />
      </ListItem>
      <Dialog
        isVisible={isThemeSelectionVisible}
        onBackdropPress={hideColorThemeSelection}
        overlayStyle={{
          backgroundColor: theme.colors.background2,
        }}>
        <Dialog.Title title={SETTINGS.chooseColorTheme} />
        {APP_CONFIG?.colorThemes?.map((colorThemeName, themIndex) => (
          <ListItem
            key={themIndex}
            containerStyle={styles.themeColorSelectionContainer}
            onPress={() => handleColorThemeChange(themIndex)}>
            <ListItem.Content>
              <ListItem.Title style={styles.themeColorSelectionTitle}>
                {colorThemeName}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badge: {
    borderRadius: 50,
    height: 30,
    width: 40,
  },
  badgeRound: {
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  themeColorBadge: {borderRadius: 50, height: 40},
  themeColorBadgeTitle: {marginHorizontal: 10, fontSize: 15},
  themeColorSelectionTitle: {
    fontFamily: 'IBMPlexSerif-Bold',
    fontWeight: '600',
  },
  themeColorSelectionContainer: {borderRadius: 8, marginTop: 5},
});

export default SettingsScreen;
