import { useEffect, useRef, useState } from "react";
import { ImageBackground } from "react-native-web";
import CardBack from './assets/images/card-back.svg';

export function Card({ card, index, revealCard, isRevealed, displaySeconds }) {
    const maxCardWidth = 100;
    const animationSpeed = 5;
    const animationPixelRate = 2; // how much of the width per tick

    const [scale, setScale] = useState(1); // 1 -> 0 -> 1
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const scaleStep = animationPixelRate / maxCardWidth; // e.g., 5/100 = 0.05

    const reduceScale = () => {
        setScale((prev) => {
            const next = Math.max(0, prev - scaleStep);
            if (next <= 0) {
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(increaseScale, animationSpeed);
            }
            return next;
        });
    };

    const increaseScale = () => {
        setScale((prev) => {
            const next = Math.min(1, prev + scaleStep);
            if (next >= 1) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return next;
        });
    };

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(reduceScale, animationSpeed);
        }, displaySeconds * 1000);

        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <ImageBackground
            key={index}
            source={isRevealed ? CardBack : card}
            style={{
                width: maxCardWidth, // fixed width
                height: 145,
                transform: [{ scaleX: scale }], // shrink/expand visible image only
                alignItems: "center",
                justifyContent: "center",
            }}
            resizeMode="stretch"
            onClick={() => {
                revealCard(false);
            }}
        />
    );
}
