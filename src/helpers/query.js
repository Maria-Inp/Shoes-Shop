/* eslint-disable no-unused-vars */
const searchProducts = (products, search) => {
    if (!search) return products;

    const searchedProducts = products.filter((p) => (p.name.includes(search)));

    return searchedProducts;
}

const filterProducts = (products, category) => {
    if (!category) return products;

    const filteredProducts = products.filter((p) => (p.category == category));

    return filteredProducts;
}

const createQueryObject = (currentQuery, newQuery) => {
    if (newQuery.category == "تمامی محصولات") {
        const {category, ...rest} = currentQuery;
        return rest;
    }

    if (newQuery.search == "") {
        const {search, ...rest} = currentQuery;
        return rest;
    }

    return {
        ...currentQuery, ...newQuery
    }
}

const getInitialQuery = (searchParams) => {
    const query = {};
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) query.category = category;
    if (search) query.search = search;
    return query;
}

export {searchProducts, filterProducts, createQueryObject, getInitialQuery}