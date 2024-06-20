import { Link } from "react-router-dom";
//components
import ProductItems from "../components/ProductItems";

//context
import { useLiked } from "../context/LikeContext";

//icon and style
import { SlArrowLeft } from "react-icons/sl";
import styles from "./LikedPage.module.css";

function LikedPage() {
  const { likedList, likedListHandler } = useLiked();
  // console.log(likedList);
  // console.log(likedListHandler);

  return (
    <>
      <div className={styles.title}>
        <h3>لیست مورد علاقه</h3>
      </div>

      {!likedList.length && (
        <div className={styles.message}>
          <div>محصولی در لیست مورد علاقه شما وجود ندارد!</div>

          <Link to="/products" className={styles.link}>
            <span>برگشت به صفحه محصولات</span>
            <SlArrowLeft />
          </Link>
        </div>
      )}

      <div className={styles.products}>
        {likedList.map((item) => (
          <ProductItems
            key={item.id}
            product={item}
            likedListHandler={likedListHandler}
          />
        ))}
      </div>
    </>
  );
}

export default LikedPage;
