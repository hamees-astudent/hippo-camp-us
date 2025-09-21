import { useEffect, useRef, useState } from "react";
import { ImageBackground } from "react-native-web";

export function Card({ card, index }) {
    const [width, setWidth] = useState(100);
    const ref = useRef(null); // persistent interval reference
    const animationSpeed = 150;

    const reduceWidth = () => {
        setWidth((prev) => {
            if (prev <= 10) {
                clearInterval(ref.current);
                ref.current = setInterval(increaseWidth, animationSpeed);
                return 10;
            }
            return prev - 5;
        });
    };

    const increaseWidth = () => {
        setWidth((prev) => {
            if (prev >= 100) {
                clearInterval(ref.current);
                ref.current = null;
                return 100;
            }
            return prev + 5;
        });
    };

    useEffect(() => {
        ref.current = setInterval(reduceWidth, animationSpeed);
        return () => clearInterval(ref.current); // cleanup on unmount
    }, []);

    return (
        <ImageBackground
            key={index}
            source={card}
            style={{ width: width, height: 145 }}
            resizeMode="stretch"
        />
    );
}
