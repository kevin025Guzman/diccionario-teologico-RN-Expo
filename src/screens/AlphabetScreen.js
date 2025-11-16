import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { data } from '../data/data';

export default function AlphabetScreen({ navigation }) {
  const letters = data.map((item) => item.char).filter(Boolean);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WordList', { letter: item })}
    >
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={letters}
        keyExtractor={(item) => item}
        numColumns={4}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  cardText: {
    color: '#F9FAFB',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
