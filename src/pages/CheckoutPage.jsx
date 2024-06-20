import { Link } from "react-router-dom";

//components
import BasketCard from "../components/BasketCard";

//context
import { useCard } from "../context/CardContext";

//icon and style
import { SlArrowLeft } from "react-icons/sl";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const [state, dispatch] = useCard();

  const selectedItems = state.selectedItems;

  const clickHandler = (type, payload) => {
    dispatch({ type, payload });
  };

  return (
    <>
      <div className={styles.title}>
        <h3>سبد خرید</h3>
      </div>

      {!state.itemsCounter ? (
        <div className={styles.message}>
          <div>سبد خرید شما در حال حاضر خالی است!</div>
          <Link to="/products" className={styles.link}>
            <span>برگشت به صفحه محصولات</span>
            <SlArrowLeft />
          </Link>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>نام محصول</th>
              <th>سایز کفش</th>
              <th>قیمت</th>
              <th>تعداد</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <BasketCard key={item.uniqueID} item={item} clickHandler={clickHandler} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CheckoutPage;
