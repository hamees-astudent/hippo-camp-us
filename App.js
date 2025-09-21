import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Button,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AnimatedAppLoader from './AnimatedAppLoader';
import MainScreen from './MainScreen';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  return (
    <AnimatedAppLoader image={require('./assets/images/splash-screen.png')}>
      <MainScreen />
    </AnimatedAppLoader>
  );
}
