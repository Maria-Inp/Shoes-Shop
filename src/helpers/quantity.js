const productQuantity = (id, size, state) => {
    const index = state.selectedItems.findIndex((item) => ((item.id == id) && (item.size == size)));
    if (index == -1) {
        return 0;
    } else {
        return state.selectedItems[index].quantity;
    }
}

export {productQuantity}