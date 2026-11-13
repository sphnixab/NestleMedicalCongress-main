import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export const LoadingIndicator = ({ color = colors.blue500 }: { color?: string }) => (
  <View style={styles.container} accessibilityRole="progressbar">
    <ActivityIndicator size="large" color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxxl },
});
