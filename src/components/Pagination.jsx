/* eslint-disable react/prop-types */

//icon and style
import styles from "./Pagination.module.css";

function Pagination({ previousPage, nextPage, activePage, totalPages }) {
  return (
    <div className={styles.pagination}>
      <button onClick={previousPage} className={activePage == 1 ? styles.disabled : null}>
        صفحه قبل
      </button>

      <p className={styles.selected}>
        {activePage}
      </p>
      <span>/</span>
      <p>
        {totalPages}
      </p>

      <button onClick={nextPage} className={activePage >= totalPages ? styles.disabled : null}>
        صفحه بعد
      </button>
    </div>
  );
}

export default Pagination;
