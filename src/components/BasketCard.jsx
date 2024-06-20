/* eslint-disable react/prop-types */
//helpers
import { toFarsiNumber } from "../helpers/replaceDigits";

//icon and style
import { MdDeleteOutline } from "react-icons/md";
import styles from "./BasketCard.module.css";

function BasketCard({ item, clickHandler }) {
  const { image, name, size, price, quantity } = item;

  return (
    <tr>
      <td>
        <img src={image} alt={name} />
      </td>
      <td>{name}</td>
      <td>{toFarsiNumber(size)}</td>
      <td>{toFarsiNumber(price.toLocaleString())}</td>

      <td>
        <div className={styles.button}>
          {quantity == 1 && (
            <button onClick={() => clickHandler("REMOVE", item)}>
              <MdDeleteOutline />
            </button>
          )}

          {quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE", item)}>-</button>
          )}

          <span>{toFarsiNumber(quantity)}</span>

          <button onClick={() => clickHandler("INCREASE", item)}>+</button>
        </div>
      </td>
    </tr>
  );
}

export default BasketCard;
