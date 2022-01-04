import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import instance from "axios/axiosHeader";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  if (action.type === "ADD") {
    return [...state, action.item];
  } else if (action.type === "INITIAL") {
    return [...state, action.item];
  } else if (action.type === "REMOVE") {
    const newArr = [...state];
    newArr.splice(action.index, 1);
    return newArr;
  } else if (action.type === "CLEAR") {
    return [];
  }

  return [...state];
};



export const CartProvider = ({ children }) => {

  const demo = [];
  const [state, dispatch] = useReducer(reducer, demo);
  

    useEffect(() => {
      instance
        .get("api2/cart-icon-course/")
        .then((res) => {
          if (res.status === 200) {
            {
              res.data.map((course, index, arr) =>
                dispatch({ type: "INITIAL", item: course.id })
              );
            }
          }
        })
        .catch((err) => {console.log(err)});

    }, []);
    
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
