import React from 'react';
import {View, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Card, Text, IconButton, Provider, useTheme} from 'react-native-paper';

import {DARK_COLORS, LIGHT_COLORS} from '$common/constants/colors.constants';
import {SETTINGS} from '$common/constants/strings.constants';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();

  const styles = getStyles(
    theme.colors.background,
    theme.dark ? DARK_COLORS.background9 : LIGHT_COLORS.background9,
  );

  return (
    <Provider>
      <View style={styles.container}>
        {/* App Version Row */}
        <Card style={styles.row}>
          <View style={styles.rowContent}>
            <IconButton
              icon="information"
              onPress={() => {}}
              style={styles.iconButton}
              iconColor={theme.colors.primary}
            />
            <Text style={styles.rowText}>{SETTINGS.appVersion}</Text>
            <Text style={styles.rowText}>{DeviceInfo.getVersion()}</Text>
          </View>
        </Card>
      </View>
    </Provider>
  );
};

const getStyles = (
  containerBackgroundColor: string,
  rowBackgroundColor: string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: containerBackgroundColor,
    },
    row: {
      marginVertical: 10,
      padding: 15,
      borderRadius: 8,
      elevation: 2,
      backgroundColor: rowBackgroundColor,
    },
    rowContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 16,
    },
    iconButton: {
      padding: 0,
    },
  });

export default SettingsScreen;
