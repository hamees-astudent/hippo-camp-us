export function generateRandomList(itemsCount, minNumber, maxNumber) {
    const randomList = [];
    while (randomList.length < (itemsCount / 2)) {
        const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        if (!randomList.includes(randomNumber)) {
            randomList.push(randomNumber);
        }
    }
    randomList.push(...randomList);
    randomList.sort(() => Math.random());
    return randomList;
}

export function pickElementsFromArray(array, indices) {
    return indices.map(index => array[index]);
}