const sumProducts = (selectedItems) => {
    const itemsCounter = selectedItems.reduce((acc, cur) => (acc + cur.quantity), 0);
    const total = selectedItems.reduce((acc, cur) => (acc + (cur.price * cur.quantity)), 0);

    return {itemsCounter, total}
}

export {sumProducts}