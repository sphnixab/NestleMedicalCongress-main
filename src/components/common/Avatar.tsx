import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamily } from '../../constants/fonts';
import { getInitials } from '../../utils/formatUtils';
import { AppText } from './AppText';

interface AvatarProps {
  name: string;
  size?: number;
  ringColor?: string;
}

export const Avatar = ({ name, size = 56, ringColor = colors.cyan400 }: AvatarProps) => (
  <View
    style={[
      styles.ring,
      { width: size, height: size, borderRadius: size / 2, borderColor: ringColor },
    ]}>
    <AppText
      color={colors.blue500}
      style={{ fontFamily: fontFamily.extraBold, fontSize: size * 0.34 }}>
      {getInitials(name)}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  ring: {
    backgroundColor: colors.infoSoft,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
