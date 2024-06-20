/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

//context
import { useLiked } from "../context/LikeContext";

//helpers
import { toFarsiNumber } from "../helpers/replaceDigits";

//icon and style
import { SlHeart } from "react-icons/sl";
import { TbListDetails } from "react-icons/tb";
import styles from "./ProductItems.module.css";

function ProductItems({ product, likedListHandler }) {
  const { id, name, image, price } = product;

  const { likedList } = useLiked();

  // console.log(likedList);

  const likeHandler = () => {
    likedListHandler(product);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>

      <h3>{name}</h3>

      <div className={styles.price}>
        <span>قیمت:</span>
        <span>{toFarsiNumber(price.toLocaleString())} تومان</span>
        {/* <span>{price.toLocaleString('fa-ir')}</span> */}
      </div>

      <div className={styles.actions}>
        <button onClick={likeHandler} title="افزودن به علاقه‌مندی ها">
          <SlHeart color={likedList.includes(product) ? "red" : "black"} />
        </button>
        <button title="نمایش جزئیات">
          <Link to={`/products/${id}`} style={{ color: "black" }}>
            <TbListDetails />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ProductItems;
