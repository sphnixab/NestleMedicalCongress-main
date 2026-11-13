import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { gradients } from '../../constants/colors';

interface ScreenContainerProps extends PropsWithChildren {
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer = ({ children, edges = ['top', 'bottom'], style }: ScreenContainerProps) => (
  <View style={styles.root}>
    <LinearGradient colors={[...gradients.background]} style={StyleSheet.absoluteFill} />
    <SafeAreaView edges={edges} style={[styles.safe, style]}>
      {children}
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
});
