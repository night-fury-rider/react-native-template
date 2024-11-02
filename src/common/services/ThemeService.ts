// This file is inteneded to contain all theming (custom fonts, coloring, dark mode, light mode etc.) related stuff in this file.
// Theme contains colors, fonts etc.

import {Appearance} from 'react-native';

import {
  BLUE_COLOR_THEME,
  DARK_BLUE_COLOR_THEME,
  DARK_ORANGE_COLOR_THEME,
  ORANGE_COLOR_THEME,
} from '$common/constants/colors.constants';
import {COMMON} from '$common/constants/strings.constants';
import {DefaultTheme, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';

const getDefaultTheme = (themeName = COMMON.colorScheme.light as ThemeProp) => {
  const lightTheme = {
    ...DefaultTheme,
    ...MD3LightTheme,
    colors: {
      ...DefaultTheme.colors,
      ...MD3LightTheme.colors,
    },
  };

  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
    },
  };

  return themeName === COMMON.colorScheme.light ? lightTheme : darkTheme;
};

const getCustomThemeColors = (
  themeName = COMMON.colorScheme.light as ThemeProp,
  selectedColorThemeIndex = 0,
) => {
  switch (selectedColorThemeIndex) {
    case 1:
      return themeName === COMMON.colorScheme.light
        ? ORANGE_COLOR_THEME
        : DARK_ORANGE_COLOR_THEME;

    case 0:
    default:
      return themeName === COMMON.colorScheme.light
        ? BLUE_COLOR_THEME
        : DARK_BLUE_COLOR_THEME;
  }
};

const isDarkModeON = () =>
  Appearance.getColorScheme() === COMMON.colorScheme.dark;

const getTheme = (
  themeName = COMMON.colorScheme.light as ThemeProp,
  selectedColorThemeIndex = 0,
): ThemeProp => {
  let customTheme = getDefaultTheme(themeName);
  customTheme.colors = {
    ...customTheme.colors,
    ...getCustomThemeColors(themeName, selectedColorThemeIndex),
  };
  return customTheme;
};

export {getTheme, isDarkModeON};
