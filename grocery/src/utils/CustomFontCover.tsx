import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

SplashScreen.preventAutoHideAsync();

type CustomFontCoverProps = {
  children: React.ReactNode;
};

export default function CustomFontCover({ children }: CustomFontCoverProps) {
  const [loaded, error] = useFonts({
    'Okra-Bold': require('../../assets/fonts/Okra-ExtraBold.ttf'),
    'Okra-SemiBold': require('../../assets/fonts/Okra-Bold.ttf')
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      } else if (error) {
        console.error('Failed to load fonts:', error);
      }
    };

    hideSplash();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Show nothing while loading
  }

  return <View>{children}</View>;
}
