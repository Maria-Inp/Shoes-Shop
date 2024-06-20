/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const LikeContext = createContext();

function LikeProvider({ children }) {
  const [likedList, setLikedList] = useState([]);

  const likedListHandler = (product) => {
    if (likedList.includes(product)) {
      //unlike
      const newLikedList = likedList.filter((p) => p.id !== product.id);
      setLikedList(newLikedList);
    } else {
      //like
      setLikedList((likedList) => [...likedList, product]);
    }
  };

  return (
    <LikeContext.Provider value={{ likedList, likedListHandler, status }}>
      {children}
    </LikeContext.Provider>
  );
}

const useLiked = () => {
  const { likedList, likedListHandler } = useContext(LikeContext);
  return { likedList, likedListHandler };
};

export default LikeProvider;
export { useLiked };
