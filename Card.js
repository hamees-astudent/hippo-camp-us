import { useEffect, useRef, useState } from "react";
import { ImageBackground, Pressable } from "react-native";

const CardBack = require('./assets/images/cardback.png');

export function Card({ card, index, revealCard, isRevealed }) {
    const maxCardWidth = 100;
    const animationSpeed = 5;
    const animationPixelRate = 2;

    const [scale, setScale] = useState(1);
    const [show, setShow] = useState(false);
    const intervalRef = useRef(null);

    const scaleStep = animationPixelRate / maxCardWidth;

    const reduceScale = () => {
        setScale((prev) => {
            const next = Math.max(0, prev - scaleStep);
            if (next <= 0) {
                clearInterval(intervalRef.current);
                setShow(isRevealed);
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
        return () => clearInterval(intervalRef.current);
    }, [isRevealed]);

    return (
        <Pressable
            onPress={() => revealCard(card)}
        >
            <ImageBackground
                key={index}
                source={show ? card : CardBack}
                style={{
                    width: maxCardWidth,
                    height: 145,
                    transform: [{ scaleX: scale }],
                    alignItems: "center",
                    justifyContent: "center",
                }}
                resizeMode="stretch"
            />
        </Pressable>
    );
}
