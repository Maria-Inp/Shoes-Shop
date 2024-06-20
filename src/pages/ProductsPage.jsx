/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//components
import ProductItems from "../components/ProductItems";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";

//context
import { useProductsData } from "../context/ProductsContext";
import { useLiked } from "../context/LikeContext";

//helpers
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/query";

//icon and style
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  //context-state
  // all products data
  const productsData = useProductsData();

  //changes in category and search
  const [displayed, setDisplayed] = useState([]);

  const { activePage, nextPage, previousPage, totalPages, items } =
    usePagination(displayed);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(productsData);

    setQuery(getInitialQuery(searchParams));
  }, [productsData]);

  useEffect(() => {
    // console.log(query);
    setSearchParams(query);

    setSearch(query.search || "");

    let finalProducts = searchProducts(productsData, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  const { likedListHandler } = useLiked();

  return (
    <>
      <div className={styles.title}>
        <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
        <h3>محصولات</h3>
      </div>

      <div className={styles.container}>
        <div className={styles.products}>
          {!productsData.length && <p>Loading...</p>}
          {items.map((product) => (
            <ProductItems
              key={product.id}
              product={product}
              likedListHandler={likedListHandler}
            />
          ))}
        </div>

        <Sidebar query={query} setQuery={setQuery} />
      </div>

      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        activePage={activePage}
        totalPages={totalPages}
      />
    </>
  );
}

//hook
const usePagination = (items, page = 1, perPage = 12) => {
  const [activePage, setActivePage] = useState(page);
  const totalPages = Math.ceil(items.length / perPage);
  const offset = perPage * (activePage - 1);
  const paginatedItems = items.slice(offset, perPage * activePage);

  return {
    activePage,
    nextPage: () => setActivePage((p) => (p < totalPages ? p + 1 : p)),
    previousPage: () => setActivePage((p) => (p > 1 ? p - 1 : p)),
    totalPages,
    items: paginatedItems,
  };
};

export default ProductsPage;
