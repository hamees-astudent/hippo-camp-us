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

export default function AnimatedSplashScreen({ children, image }) {
    const animation = useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 5000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    const onImageLoaded = useCallback(async () => {
        try {
            await SplashScreen.hideAsync();

            await Promise.all([]);
        } catch (e) {

        } finally {
            setAppReady(true);
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.expoConfig.splash.backgroundColor,
                            opacity: animation,
                        },
                    ]}
                >
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: Constants.expoConfig.splash.resizeMode || "contain",
                            opacity: animation,
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}