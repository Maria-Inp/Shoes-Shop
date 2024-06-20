import { Link, useParams } from "react-router-dom";
import { useState } from "react";

//context
import { useProductDetail } from "../context/ProductsContext";
import { useCard } from "../context/CardContext";
import { useLiked } from "../context/LikeContext";

//helpers
import { productQuantity } from "../helpers/quantity";

//icon and style
import { TbShoppingBagCheck } from "react-icons/tb";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { SlHeart } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import styles from "./ProductDetails.module.css";
import { toFarsiNumber } from "../helpers/replaceDigits";
import { v4 as uuid4 } from "uuid";

function ProductDetails() {
  const { id } = useParams();

  const product = useProductDetail(+id);

  const [state, dispatch] = useCard();

  const [size, setSize] = useState(36);

  const clickHandler = (type, payload) => {
    payload = { ...payload, size: size, uniqueID: uuid4() };

    dispatch({ type, payload });
  };

  const quantity = productQuantity(id, size, state);

  /* ------------------------------------------------------------------------------------------------------ */
  //like handler
  const { likedList, likedListHandler } = useLiked();

  if (!product) return <p>Loading</p>;

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.name} />

      <div className={styles.information}>
        <div>
          <h3>{product.name}</h3>

          <div className={styles.price}>
            <span>قیمت:</span>
            <h4>{toFarsiNumber(product.price.toLocaleString())} تومان</h4>
          </div>

          <div className={styles.size}>
            <span>انتخاب سایز کفش:</span>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
            </select>
          </div>

          <div className={styles.button}>

            <button className={styles.box} onClick={() => likedListHandler(product)}>
              <SlHeart color={likedList.includes(product) ? "red" : "black"} />
              <span>افزودن به علاقه مندی‌ها</span>
            </button>

            <div className={styles.action}>
              {quantity == 1 && (
                <button onClick={() => clickHandler("REMOVE", product)}>
                  <MdDeleteOutline />
                </button>
              )}

              {quantity > 1 && (
                <button onClick={() => clickHandler("DECREASE", product)}>
                  -
                </button>
              )}

              {quantity > 0 && <span>{toFarsiNumber(quantity)}</span>}

              {quantity == 0 ? (
                <button className={styles.box} onClick={() => clickHandler("ADD", product)}>
                  <TbShoppingBagPlus />
                  <span>افزودن به سبد خرید</span>
                </button>
              ) : (
                <button onClick={() => clickHandler("INCREASE", product)}>
                  +
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.links}>
          <Link to="/checkout">
            <TbShoppingBagCheck />
            <span>مشاهده سبد خرید </span>
          </Link>

          <Link to="/products">
            <span>برگشت به صفحه اصلی</span>
            <SlArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
