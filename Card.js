import { useEffect, useRef, useState } from "react";
import { ImageBackground } from "react-native-web";
import CardBack from './assets/images/card-back.svg';

/**
 * Card
 *
 * A React Native card component that performs a horizontal flip animation using scaleX.
 * The flip is done in two phases: the card shrinks to zero width, swaps the visible image
 * (front/back) based on the `isRevealed` prop, then expands back to full width.
 *
 * Animation details:
 * - Fixed logical width is used to compute scale steps (`scaleStep = animationPixelRate / maxCardWidth`).
 * - Timed with `setInterval` at `animationSpeed` ms per tick.
 * - Intervals are cleared and restarted when `isRevealed` changes, and cleaned up on unmount.
 *
 * Interaction:
 * - Clicking/tapping the card invokes `revealCard(card)`.
 *
 * Rendering:
 * - Renders an ImageBackground using the card face when revealed, or a card back otherwise.
 * - Applies a transform with `scaleX` in the range [0, 1] to simulate the flip.
 *
 * @param {Object} props - Component props.
 * @param {import('react-native').ImageSourcePropType} props.card - Image source for the card face.
 * @param {number} props.index - Index/key used to identify the card instance.
 * @param {(card: import('react-native').ImageSourcePropType) => void} props.revealCard - Callback invoked on click/tap to request revealing the given card.
 * @param {boolean} props.isRevealed - Whether the card should currently display its face.
 * @returns {JSX.Element} The flip-animated card element.
 */
export function Card({ card, index, revealCard, isRevealed }) {
    const maxCardWidth = 100;
    const animationSpeed = 5;
    const animationPixelRate = 2; // how much of the width per tick

    const [scale, setScale] = useState(1); // 1 -> 0 -> 1
    const [show, setShow] = useState(false);
    const intervalRef = useRef(null);

    const scaleStep = animationPixelRate / maxCardWidth; // e.g., 5/100 = 0.05

    /**
     * Animation phases:
     * 1. reduceScale: Decrease scale from 1 to 0. When reaching 0, toggle the visible image (show) and start increaseScale.
     * 2. increaseScale: Increase scale from 0 back to 1. When reaching 1, stop the animation.
     * Both functions use setScale to update the scale state, triggering re-renders.
     */
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

    /**
     * When isRevealed changes, start the flip animation by initiating the reduceScale phase.
     */
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
