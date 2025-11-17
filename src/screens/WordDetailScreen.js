import React, { useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { data } from '../data/data';

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
