import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AlphabetScreen from '../screens/AlphabetScreen';
import WordListScreen from '../screens/WordListScreen';
import WordDetailScreen from '../screens/WordDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer theme={NavigationDarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#111827' },
          headerTintColor: '#F9FAFB',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#020617' },
        }}
      >
        <Stack.Screen
          name="Alphabet"
          component={AlphabetScreen}
          options={{ title: 'Diccionario Teológico' }}
        />
        <Stack.Screen
          name="WordList"
          component={WordListScreen}
          options={({ route }) => ({ title: `Palabras - ${route.params.letter}` })}
        />
        <Stack.Screen
          name="WordDetail"
          component={WordDetailScreen}
          options={{ title: 'Detalle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
