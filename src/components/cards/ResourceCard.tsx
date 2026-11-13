import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { Resource, ResourceType } from '../../types/models.types';
import { formatFileSize } from '../../utils/formatUtils';
import { AppIcon } from '../common/AppIcon';
import { AppText } from '../common/AppText';

const typeStyle: Record<ResourceType, { icon: string; tint: string; background: string }> = {
  PDF: { icon: 'document-text', tint: colors.danger, background: colors.dangerSoft },
  Slides: { icon: 'easel-outline', tint: colors.gold500, background: colors.gold100 },
  Video: { icon: 'play-circle-outline', tint: colors.blue500, background: colors.infoSoft },
};

interface ResourceCardProps {
  resource: Resource;
  saved: boolean;
  downloaded: boolean;
  onToggleSave: (id: string) => void;
  onDownload: (resource: Resource) => void;
}

export const ResourceCard = memo(({ resource, saved, downloaded, onToggleSave, onDownload }: ResourceCardProps) => {
  const style = typeStyle[resource.type];
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: style.background }]}>
        <AppIcon name={style.icon} size={sizes.iconLg} color={style.tint} />
      </View>
      <View style={styles.copy}>
        <AppText variant="overline" color={style.tint}>
          {resource.type.toUpperCase()}
        </AppText>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {resource.title}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {resource.description}
        </AppText>
        <View style={styles.size}>
          <AppIcon name="server-outline" size={12} color={colors.textMuted} />
          <AppText variant="caption" color={colors.textMuted}>
            {formatFileSize(resource.sizeMb)}
          </AppText>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable
          hitSlop={hitSlop}
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Remove from saved' : 'Save resource'}
          onPress={() => onToggleSave(resource.id)}>
          <AppIcon
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={sizes.iconMd}
            color={saved ? colors.gold500 : colors.textMuted}
          />
        </Pressable>
        <Pressable
          hitSlop={hitSlop}
          accessibilityRole="button"
          accessibilityLabel={`Download ${resource.title}`}
          onPress={() => onDownload(resource)}>
          <AppIcon
            name={downloaded ? 'checkmark-circle' : 'download-outline'}
            size={sizes.iconMd}
            color={downloaded ? colors.success : colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: { width: 52, height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: spacing.xxs },
  size: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  actions: { alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' },
});
