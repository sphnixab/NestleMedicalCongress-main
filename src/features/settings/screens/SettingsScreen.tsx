import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { AppButton } from '../../../components/common/AppButton';
import { AppText } from '../../../components/common/AppText';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { colors } from '../../../constants/colors';
import { radius } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { ProfileScreenProps } from '../../../navigation/navigationTypes';

const APP_VERSION = '1.0.0';

export const SettingsScreen = ({ navigation }: ProfileScreenProps<'Settings'>) => {
  const { notificationsEnabled, remindersEnabled, toggleNotifications, toggleReminders, clearSaved } = useAppData();

  const confirmClear = () => {
    Alert.alert(strings.settings.clearSaved, strings.settings.clearSavedBody, [
      { text: 'Cancel', style: 'cancel' },
      { text: strings.settings.clearSaved, style: 'destructive', onPress: clearSaved },
    ]);
  };

  return (
    <ModuleScreen title={strings.settings.title} onBack={navigation.goBack}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <SwitchRow
            title={strings.settings.notifications}
            body={strings.settings.notificationsBody}
            value={notificationsEnabled}
            onChange={toggleNotifications}
          />
          <SwitchRow
            title={strings.settings.reminders}
            body={strings.settings.remindersBody}
            value={remindersEnabled}
            onChange={toggleReminders}
          />
        </View>
        <AppButton title={strings.settings.clearSaved} variant="outline" leftIcon="trash-outline" onPress={confirmClear} />
        <View style={styles.card}>
          <AppText variant="bodyStrong">{strings.settings.about}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            {strings.settings.aboutBody}
          </AppText>
          <AppText variant="caption" color={colors.textMuted}>
            {strings.settings.version} {APP_VERSION}
          </AppText>
        </View>
      </ScrollView>
    </ModuleScreen>
  );
};

const SwitchRow = ({ title, body, value, onChange }: { title: string; body: string; value: boolean; onChange: () => void }) => (
  <View style={styles.switchRow}>
    <View style={styles.flex}>
      <AppText variant="bodyStrong">{title}</AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        {body}
      </AppText>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: colors.border, true: colors.cyan400 }}
      thumbColor={colors.white}
      accessibilityLabel={title}
    />
  </View>
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: screenPadding, gap: spacing.lg },
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
