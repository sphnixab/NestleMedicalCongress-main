import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native';
import { AppInput } from './AppInput';

interface ControlledInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  icon?: string;
  secure?: boolean;
  inputRef?: React.Ref<TextInput>;
}

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  inputRef,
  ...rest
}: ControlledInputProps<T>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <AppInput
      ref={inputRef}
      value={String(field.value ?? '')}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
      {...rest}
    />
  );
};
