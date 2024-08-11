// This file is inteneded to contain all theming (custom fonts, coloring, dark mode, light mode etc.) related stuff in this file.

import {StyleSheet} from 'react-native';
import {Appearance} from 'react-native';
import {createTheme} from '@rneui/themed';

import {
  BLUE_COLOR_THEME,
  DARK_BLUE_COLOR_THEME,
  DARK_ORANGE_COLOR_THEME,
  ORANGE_COLOR_THEME,
} from '$clubhouse/constants/colors.constants';
import {CLUBHOUSE} from '$clubhouse/constants/strings.constants';

let selectedLightColors;
let selectedDarkColors;
let customTextColor1;
let customTextColor2;
let customBackgroundColor;

const getStyles = (
  textColor1?: string,
  textColor2?: string,
  backgroundColor?: string,
) => {
  const customTextColor1 = textColor1 ? textColor1 : 'black';
  const customTextColor2 = textColor2 ? textColor2 : 'black';
  const customBackgroundColor = backgroundColor ? backgroundColor : 'white';

  const styles = StyleSheet.create({
    customText1: {
      color: customTextColor1,
    },
    customText2: {
      color: customTextColor2,
    },
    normalFont: {
      fontFamily: 'IBMPlexSerif',
    },
    boldFont: {
      fontFamily: 'IBMPlexSerif-Bold',
      fontWeight: '600',
    },
    boldItalicFont: {
      fontFamily: 'IBMPlexSerif-BoldItalic',
      fontWeight: '600',
    },
    centerAlign: {
      textAlign: 'center',
    },
    background1: {
      backgroundColor: customBackgroundColor,
    },
  });

  return styles;
};

// Keep all font family info in this function only
const getTheme = (selectedColorThemeIndex: number) => {
  switch (selectedColorThemeIndex) {
    case 1:
      selectedLightColors = ORANGE_COLOR_THEME;
      selectedDarkColors = DARK_ORANGE_COLOR_THEME;
      break;

    case 0:
    default:
      selectedLightColors = BLUE_COLOR_THEME;
      selectedDarkColors = DARK_BLUE_COLOR_THEME;
  }

  customTextColor1 = isDarkModeON()
    ? selectedDarkColors.text1
    : selectedLightColors.text1;

  customTextColor2 = isDarkModeON()
    ? selectedDarkColors.text2
    : selectedLightColors.text2;

  customBackgroundColor = isDarkModeON()
    ? selectedDarkColors.background1
    : selectedLightColors.background1;

  const styles = getStyles(
    customTextColor1,
    customTextColor2,
    customBackgroundColor,
  );

  const theme = createTheme({
    components: {
      Avatar: {
        titleStyle: [styles.normalFont, styles.customText1],
      },
      Badge: {
        textStyle: [styles.normalFont, styles.customText2],
      },
      Button: {
        titleStyle: [styles.boldFont, styles.customText2],
      },
      CardTitle: {
        style: {
          ...styles.boldItalicFont,
          ...styles.customText1,
          fontSize: 20,
        },
      },
      DialogTitle: {
        titleStyle: [styles.boldFont, styles.customText1],
      },
      ListItem: {
        containerStyle: styles.background1,
      },
      ListItemInput: {
        style: [
          styles.normalFont,
          ,
          styles.customText1,
          {borderColor: customTextColor1},
        ],
      },
      ListItemSubtitle: {
        style: [styles.normalFont, styles.customText1],
      },
      ListItemTitle: {
        style: [styles.normalFont, styles.customText1],
      },
      Icon: {
        color: customTextColor1,
      },
      Input: {
        style: [styles.normalFont, styles.customText1],
      },
      SearchBar: {
        inputStyle: [styles.normalFont, styles.customText1],
      },
      Text: {
        style: [styles.normalFont, styles.customText1],
        h1Style: [styles.boldItalicFont, styles.customText1],
        h2Style: [styles.boldItalicFont, styles.customText1],
        h3Style: [
          styles.boldItalicFont,
          styles.customText1,
          styles.centerAlign,
        ],
        h4Style: [styles.boldFont, styles.customText1, {fontSize: 16}],
      },
    },
    lightColors: {...selectedLightColors},
    darkColors: {...selectedDarkColors},
  });

  return theme;
};

const getColors = (selectedColorThemeIndex: number) => {
  const theme = getTheme(selectedColorThemeIndex);

  if (isDarkModeON()) {
    return theme.darkColors;
  }
  return theme.lightColors;
};

const isDarkModeON = () =>
  Appearance.getColorScheme() === CLUBHOUSE.colorScheme.dark;

export {getTheme, getColors, isDarkModeON};
