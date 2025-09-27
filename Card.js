import { useEffect, useRef, useState } from "react";
import { ImageBackground } from "react-native-web";
import CardBack from './assets/images/card-back.svg';

export function Card({ card, index, revealCard, isRevealed }) {
    const maxCardWidth = 100;
    const animationSpeed = 5;
    const animationPixelRate = 2; // how much of the width per tick

    const [scale, setScale] = useState(1); // 1 -> 0 -> 1
    const [show, setShow] = useState(false);
    const intervalRef = useRef(null);

    const scaleStep = animationPixelRate / maxCardWidth; // e.g., 5/100 = 0.05

    const reduceScale = () => {
        setScale((prev) => {
            const next = Math.max(0, prev - scaleStep);
            if (next <= 0) {
                clearInterval(intervalRef.current);
                setShow(isRevealed); // toggle show when scale is 0
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
        intervalRef.current = setInterval(reduceScale, animationSpeed);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRevealed]);

    return (
        <ImageBackground
            key={index}
            source={show ? card : CardBack}
            style={{
                width: maxCardWidth, // fixed width
                height: 145,
                transform: [{ scaleX: scale }], // shrink/expand visible image only
                alignItems: "center",
                justifyContent: "center",
            }}
            resizeMode="stretch"
            onClick={() => {
                revealCard(card);
            }}
        />
    );
}
