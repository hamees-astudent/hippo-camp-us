import { useEffect, useState } from "react";
import { ImageBackground } from "react-native-web";

export function Card({ card, index }) {
    const [width, setWidth] = useState(100);

    const animationSpeed = 500;
    let ref = null;

    const reduceWidth = () => {
        if (width <= 10) {
            clearInterval(ref);
            ref = setInterval(increaseWidth, animationSpeed);
        }

        setWidth(width - 10);
    }

    const increaseWidth = () => {
        if (width >= 100) {
            clearInterval(ref);
            ref = null;
        }

        setWidth(width + 10);
    }

    useEffect(() => {
        ref = setInterval(reduceWidth, animationSpeed);
    }, []);

    return <ImageBackground
        key={index}
        source={card}
        style={{ width: width, height: 145 }}
        resizeMode="contain"
    />
}