import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { data } from '../data/data';

export default function WordListScreen({ route, navigation }) {
  const { letter } = route.params;

  const entryForLetter = data.find((item) => item.char === letter);
  const words = (entryForLetter?.words || []).filter(
    (w) => w && typeof w.name === 'string'
  );

  const [query, setQuery] = useState('');

  const filteredWords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return words;
    return words.filter(
      (w) => w && w.name && w.name.toLowerCase().includes(normalized)
    );
  }, [query, words]);

  const BANNER_AD_UNIT_ID = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-1076481382150127/7914625988';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('WordDetail', {
          letter,
          index: words.findIndex((w) => w.name === item.name),
        })
      }
    >
      <Text style={styles.word}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {words.length === 0 ? (
        <Text style={styles.emptyText}>No hay palabras para esta letra aún.</Text>
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar palabra..."
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={setQuery}
          />
          <FlatList
            data={filteredWords}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
          />
        </>
      )}

      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={BANNER_AD_UNIT_ID}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#020617',
  },
  bannerContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#374151',
    color: '#F9FAFB',
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#111827',
    marginBottom: 10,
  },
  word: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F9FAFB',
  },
  emptyText: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 16,
    color: '#9CA3AF',
  },
});
