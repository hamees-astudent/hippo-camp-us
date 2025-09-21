import { useEffect, useRef, useState } from "react";
import { ImageBackground } from "react-native-web";
import CardBack from './assets/images/card-back.svg';

export function Card({ card, index }) {
    const maxCardWidth = 100;
    const minCardWidth = 1;
    const animationSpeed = 75;
    const animationPixelRate = 5;
    const displaySeconds = 5;

    const [currentCard, setCurrentCard] = useState(card);
    const [width, setWidth] = useState(maxCardWidth);
    const [isReversed, setIsReversed] = useState(false);
    const ref = useRef(null);

    const reduceWidth = () => {
        setWidth((prev) => {
            if (prev <= minCardWidth) {
                clearInterval(ref.current);
                setCurrentCard();
                setIsReversed(true);
                ref.current = setInterval(increaseWidth, animationSpeed);
                return minCardWidth;
            }
            return prev - animationPixelRate;
        });
    };

    const increaseWidth = () => {
        setWidth((prev) => {
            if (prev >= maxCardWidth) {
                clearInterval(ref.current);
                ref.current = null;
                return maxCardWidth;
            }
            return prev + animationPixelRate;
        });
    };

    useEffect(() => {
        setTimeout(() => {
            ref.current = setInterval(reduceWidth, animationSpeed);
        }, displaySeconds * 1000);
        return () => clearInterval(ref.current); // cleanup on unmount
    }, []);

    return (
        <ImageBackground
            key={index}
            source={isReversed ? CardBack : currentCard}
            style={{ width: width, height: 145, padding: (maxCardWidth - width) / 2 }}
            resizeMode="stretch"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
                setIsReversed(!isReversed);
            }}
        />
    );
}
