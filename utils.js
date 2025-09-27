export function generateRandomList(itemsCount, minNumber, maxNumber) {
    const randomList = [];
    const pairCount = Math.floor(itemsCount / 2);
    const rangeSize = maxNumber - minNumber + 1;
    const target = Math.min(pairCount, Math.max(0, rangeSize));

    while (randomList.length < target) {
        const randomNumber = Math.floor(Math.random() * rangeSize) + minNumber;
        if (!randomList.includes(randomNumber)) {
            randomList.push(randomNumber);
        }
    }

    randomList.push(...randomList);

    // Fisher–Yates shuffle (unbiased)
    for (let i = randomList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomList[i], randomList[j]] = [randomList[j], randomList[i]];
    }

    if (randomList.length > itemsCount) {
        randomList.length = itemsCount;
    }

    return randomList;
}

export function pickElementsFromArray(array, indices) {
    return indices.map(index => array[index]);
}