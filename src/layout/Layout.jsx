/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

//context
import { useLiked } from "../context/LikeContext";
import { useCard } from "../context/CardContext";

//helpers
import { toFarsiNumber } from "../helpers/replaceDigits";

//icon and style
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { PiHeartStraightDuotone } from "react-icons/pi";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const [state] = useCard();
  const { likedList } = useLiked();

  return (
    <div>
      <header className={styles.header}>
        <Link to="/products">Customize Shoes</Link>
        <div>
          <div>
            <Link to="/liked">
              {!!likedList.length && (
                <span className={styles.likedCounter}>{toFarsiNumber(likedList.length)}</span>
              )}
             <PiHeartStraightDuotone color="red" />
            </Link>
          </div>

          <div>
            <Link to="/checkout">
              {!!state.itemsCounter && (
                <span className={styles.items}>{toFarsiNumber(state.itemsCounter)}</span>
              )}
              <PiShoppingCartSimpleBold />
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>Developed By M-Inp</p>
      </footer>
    </div>
  );
}

export default Layout;
