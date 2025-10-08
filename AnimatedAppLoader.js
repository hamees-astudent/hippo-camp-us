// AnimatedAppLoader.js
import * as Asset from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

export default function AnimatedAppLoader({ children, image }) {
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Preload image & fonts here
                await Asset.Asset.fromModule(image).downloadAsync();
                await Font.loadAsync({
                    // example: 'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                // ✅ Hide splash screen now
                await SplashScreen.hideAsync();
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    if (!isReady) {
        // While loading, render nothing (SplashScreen still visible)
        return null;
    }

    // Once ready, render your app
    return <>{children}</>;
}
