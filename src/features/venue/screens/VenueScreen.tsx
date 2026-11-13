import React, { useCallback } from 'react';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { colors } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { mockVenue as venue } from '../../../data/mockEvent';
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { VenueInfo } from '../../../types/models.types';

const buildMapsUrl = (place: VenueInfo): string => {
  const label = encodeURIComponent(place.name);
  const { latitude, longitude } = place;
  return Platform.select({
    ios: `maps://?q=${label}&ll=${latitude},${longitude}`,
    default: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
  });
};

export const VenueScreen = ({ navigation }: HomeScreenProps<'Venue'>) => {
  const openMaps = useCallback(async () => {
    try {
      await Linking.openURL(buildMapsUrl(venue));
    } catch {
      try {
        await Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${venue.latitude},${venue.longitude}`,
        );
      } catch {
        Alert.alert(strings.venue.title, strings.venue.openMapsFailed);
      }
    }
  }, []);

  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <AppHeader
        title={strings.venue.title}
        onBack={navigation.goBack}
        rightIcon="navigate"
        rightLabel={strings.venue.openMaps}
        onRightPress={openMaps}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Venue name and dates on a glass card */}
        <View style={styles.hero}>
          <AppText variant="h2" color={colors.white}>
            {venue.name}
          </AppText>
          <View style={styles.dateRow}>
            <AppIcon name="calendar" size={sizes.iconSm} color={colors.cyan300} />
            <AppText variant="bodyStrong" color={colors.textOnDarkMuted}>
              {venue.dates}
            </AppText>
          </View>
        </View>

        {/* Address */}
        <View style={styles.card}>
          <View style={styles.pinIcon}>
            <AppIcon name="location" size={sizes.iconMd} color={colors.blue500} />
          </View>
          <View style={styles.flex}>
            <AppText variant="caption" color={colors.textMuted}>
              {strings.venue.address}
            </AppText>
            <AppText variant="bodyStrong" color={colors.navy900}>
              {venue.address}
            </AppText>
          </View>
        </View>

        {/* Map preview (tap to open the maps app) */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={strings.venue.openMaps}
          onPress={openMaps}
          style={styles.map}>
          <View style={[styles.road, styles.roadHorizontal]} />
          <View style={[styles.road, styles.arcLeft]} />
          <View style={[styles.road, styles.arcRight]} />
          <View style={styles.mapTag}>
            <AppText variant="label" color={colors.navy900}>
              {strings.venue.mapPreview}
            </AppText>
          </View>
          <View style={styles.markerGlow}>
            <View style={styles.marker}>
              <AppIcon name="location" size={sizes.iconLg} color={colors.navy900} />
            </View>
          </View>
        </Pressable>

        {/* Facilities, two per row */}
        <View style={styles.facilitiesCard}>
          <AppText variant="h3" color={colors.navy900}>
            {strings.venue.facilities}
          </AppText>
          <View style={styles.facilities}>
            {venue.facilities.map(item => (
              <View key={item.id} style={styles.facility}>
                {item.id === 'parking' ? (
                  // Ionicons has no plain "P" parking sign, so it is drawn as text.
                  <AppText variant="h3" color={colors.blue500} style={styles.parkingSign}>
                    P
                  </AppText>
                ) : (
                  <AppIcon name={item.icon} size={sizes.iconMd} color={colors.blue500} />
                )}
                <AppText variant="bodyStrong" color={colors.navy900} style={styles.flex} numberOfLines={1}>
                  {item.label}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: screenPadding, paddingTop: 0, paddingBottom: spacing.xxxl, gap: spacing.lg },
  hero: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    gap: spacing.md,
  },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
  },
  pinIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: 190,
    borderRadius: radius.xl,
    backgroundColor: '#DCE9F8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  road: { position: 'absolute', backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.9)' },
  roadHorizontal: {
    left: -40,
    right: -40,
    top: '62%',
    height: 260,
    borderTopWidth: 8,
    borderRadius: 400,
  },
  arcLeft: { width: 360, height: 360, borderRadius: 180, borderWidth: 5, left: -250, top: -120 },
  arcRight: { width: 420, height: 420, borderRadius: 210, borderWidth: 5, left: '58%', top: -140 },
  mapTag: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  markerGlow: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(246,199,94,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gold400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilitiesCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    gap: spacing.lg,
  },
  facilities: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  facility: {
    width: '47.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
  },
  parkingSign: { width: sizes.iconMd, textAlign: 'center' },
});