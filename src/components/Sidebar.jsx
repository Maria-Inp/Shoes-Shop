/* eslint-disable react/prop-types */

//constans
import { categories } from "../constants/categories";

//helpers
import { createQueryObject } from "../helpers/query";

//icon and style
import { FaListUl } from "react-icons/fa";
import styles from "./Sidebar.module.css";

function Sidebar({ query, setQuery }) {
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const category = e.target.innerText;

    if (tagName != "LI") return;

    setQuery((query) => createQueryObject(query, { category: category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>دسته بندی ها</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={category.type == query.category ? styles.selected : null}
          >
            {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
