import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import AnimatedSplashScreen from "./AnimatedSplashScreen";

export default function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            await Asset.fromURI(image.uri).downloadAsync();
            setSplashReady(true);
        }

        prepare();
    }, [image]);

    if (!isSplashReady) {
        return null;
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}