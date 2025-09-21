export function generateRandomList(itemsCount, minNumber, maxNumber) {
    const randomList = [];
    while (randomList.length < itemsCount) {
        const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        if (!randomList.includes(randomNumber)) {
            randomList.push(randomNumber);
        }
    }
    return randomList;
}

export function pickElementsFromArray(array, indices) {
    return indices.map(index => array[index]);
}