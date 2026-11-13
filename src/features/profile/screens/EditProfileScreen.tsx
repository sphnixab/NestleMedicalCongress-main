import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { AppButton } from '../../../components/common/AppButton';
import { ControlledInput } from '../../../components/common/ControlledInput';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAuth } from '../../../context/AuthContext';
import { ProfileScreenProps } from '../../../navigation/navigationTypes';
import { EditProfileForm, editProfileSchema } from '../../../utils/validationUtils';

export const EditProfileScreen = ({ navigation }: ProfileScreenProps<'EditProfile'>) => {
  const { user: data, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const { control, handleSubmit } = useForm<EditProfileForm>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      fullName: data?.fullName ?? '',
      designation: data?.designation ?? '',
      phone: data?.phone ?? '',
      location: data?.location ?? '',
    },
  });

  const onSubmit = handleSubmit(async values => {
    setSaving(true);
    await updateProfile(values);
    navigation.goBack();
  });

  return (
    <ModuleScreen title={strings.profile.editTitle} onBack={navigation.goBack}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ControlledInput control={control} name="fullName" icon="person-outline" placeholder={strings.auth.fullName} autoCapitalize="words" />
          <ControlledInput control={control} name="designation" icon="briefcase-outline" placeholder={strings.profile.designation} autoCapitalize="words" />
          <ControlledInput control={control} name="phone" icon="call-outline" placeholder={strings.profile.phone} keyboardType="phone-pad" />
          <ControlledInput control={control} name="location" icon="location-outline" placeholder={strings.profile.location} autoCapitalize="words" />
          <AppButton title={strings.profile.saveChanges} loading={saving} onPress={onSubmit} testID="profile-save" />
        </ScrollView>
      </KeyboardAvoidingView>
    </ModuleScreen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: screenPadding, gap: spacing.md },
});
