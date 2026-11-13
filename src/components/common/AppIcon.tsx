import { Ionicons } from '@react-native-vector-icons/ionicons';
import React, { ComponentProps } from 'react';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

interface AppIconProps extends Omit<ComponentProps<typeof Ionicons>, 'name'> {
  name: string;
}

/** Single place the icon set is wired in; swap the family here and every screen follows. */
export const AppIcon = ({ name, ...rest }: AppIconProps) => (
  <Ionicons name={name as IoniconName} {...rest} />
);
