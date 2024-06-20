/* eslint-disable no-case-declarations */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helpers/card";

const CardContext = createContext();

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (
        !state.selectedItems.find(
          (item) =>
            item.id == action.payload.id && item.size == action.payload.size
        )
      ) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        selectedItems: [...state.selectedItems],
        ...sumProducts(state.selectedItems),
        checkout: false,
      };

    case "INCREASE":
      const increaseIndex = state.selectedItems.findIndex(
        (item) =>
          item.id == action.payload.id && item.size == action.payload.size
      );
      state.selectedItems[increaseIndex].quantity++;

      return {
        selectedItems: [...state.selectedItems],
        ...sumProducts(state.selectedItems),
        checkout: false,
      };

    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (item) =>
          item.id == action.payload.id && item.size == action.payload.size
      );
      state.selectedItems[decreaseIndex].quantity--;

      return {
        selectedItems: [...state.selectedItems],
        ...sumProducts(state.selectedItems),
        checkout: false,
      };

    case "REMOVE":
      const newSelectedItem = state.selectedItems.filter(
        (item) =>
          (item.id !== action.payload.id) || (item.size !== action.payload.size)
      );

      return {
        selectedItems: [...newSelectedItem],
        ...sumProducts(newSelectedItem),
        checkout: false,
      };

    default:
      throw new Error("Invalid action");
  }
};

function CardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
}

const useCard = () => {
  const { state, dispatch } = useContext(CardContext);
  return [state, dispatch];
};

export default CardProvider;

export { useCard };
