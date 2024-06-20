/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

import { products } from "../constants/productsData";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setProductsData(products);
  }, []);

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  );
}

const useProductsData = () => {
  const productsData = useContext(ProductsContext);
  return productsData;
};

const useProductDetail = (id) => {
  const products = useContext(ProductsContext);
  const product = products.find((p) => p.id == id);
  return product;
}

export default ProductsProvider;
export { useProductsData, useProductDetail };
