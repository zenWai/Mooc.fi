import theme from '../../theme';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeTitle: {
    fontSize: theme.fontSizes.title,
  },
  fontSizeCaption: {
    fontSize: theme.fontSizes.caption,
  },
  fontSizeButton: {
    fontSize: theme.fontSizes.button,
  },
  fontSizeSmall: {
    fontSize: theme.fontSizes.small,
  },
  colorError: {
    color: theme.colors.error,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});