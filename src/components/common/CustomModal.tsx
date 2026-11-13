import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/dimensions';
import { screenPadding, spacing } from '../../constants/spacing';
import { strings } from '../../constants/strings';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

interface CustomModalProps extends PropsWithChildren {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export const CustomModal = ({ visible, title, onClose, children }: CustomModalProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
    <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close dialog">
      <Pressable style={styles.card} onPress={() => undefined}>
        <AppText variant="h3" style={styles.title}>
          {title}
        </AppText>
        <View style={styles.body}>{children}</View>
        <AppButton title={strings.common.close} onPress={onClose} variant="outline" />
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: screenPadding,
  },
  card: { backgroundColor: colors.white, borderRadius: radius.xl, padding: spacing.xl, maxHeight: '80%' },
  title: { marginBottom: spacing.md },
  body: { marginBottom: spacing.lg },
});
