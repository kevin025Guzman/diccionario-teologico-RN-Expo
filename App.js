import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  useEffect(() => {
    mobileAds()
      .initialize()
      .catch((error) => {
        console.warn('Error inicializando AdMob:', error);
      });
  }, []);

  return <RootNavigator />;
}
