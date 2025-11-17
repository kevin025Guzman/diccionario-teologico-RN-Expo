import React, { useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  InterstitialAd,
  BannerAd,
  BannerAdSize,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { data } from '../data/data';

const INTERSTITIAL_AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1076481382150127/4909188691';

const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1076481382150127/1938151248';

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
  requestNonPersonalizedAdsOnly: true,
});

export default function WordDetailScreen({ route, navigation }) {
  const { letter, index } = route.params;

  const entryForLetter = data.find((item) => item.char === letter);
  const words = entryForLetter?.words || [];

  const safeIndex = Math.min(
    Math.max(typeof index === 'number' ? index : 0, 0),
    Math.max(words.length - 1, 0)
  );

  const current = words[safeIndex] || {};

  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < words.length - 1;

  const goTo = (newIndex) => {
    navigation.setParams({
      ...route.params,
      index: newIndex,
    });
  };

  useEffect(() => {
    const loadedListener = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial
          .show()
          .catch((error) => console.warn('Error mostrando interstitial:', error));
      }
    );

    const errorListener = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.warn('Error cargando interstitial:', error);
      }
    );

    interstitial.load();

    return () => {
      loadedListener();
      errorListener();
    };
  }, []);

  useEffect(() => {
    if (current?.name) {
      navigation.setOptions({
        title: current.name,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.popToTop()}
            style={{ marginRight: 4 }}
          >
            <Ionicons name="home-outline" size={22} color="#F9FAFB" />
          </TouchableOpacity>
        ),
      });
    }
  }, [current?.name, navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {current?.name ? (
        <>
          <Text style={styles.word}>{current.name}</Text>
          <Text style={styles.definition}>{current.description}</Text>
        </>
      ) : (
        <Text style={styles.definition}>
          No se encontró información para esta palabra.
        </Text>
      )}

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navButton, !hasPrev && styles.navButtonDisabled]}
          disabled={!hasPrev}
          onPress={() => hasPrev && goTo(safeIndex - 1)}
        >
          <Text style={[styles.navText, !hasPrev && styles.navTextDisabled]}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !hasNext && styles.navButtonDisabled]}
          disabled={!hasNext}
          onPress={() => hasNext && goTo(safeIndex + 1)}
        >
          <Text style={[styles.navText, !hasNext && styles.navTextDisabled]}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={BANNER_AD_UNIT_ID}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  word: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F9FAFB',
  },
  definition: {
    fontSize: 18,
    lineHeight: 28,
    color: '#E5E7EB',
    marginBottom: 24,
  },
  bannerContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  navText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  navTextDisabled: {
    color: '#9CA3AF',
  },
});
