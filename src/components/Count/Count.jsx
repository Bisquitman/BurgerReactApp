import style from './Count.module.css';
import {useDispatch} from "react-redux";
import {addProduct, removeProduct} from "../../store/order/orderSlice.js";

export const Count = ({count, id}) => {
  const dispatch = useDispatch();

  const incCount = () => {
    dispatch(addProduct({id}));
  };

  const decCount = () => {
    dispatch(removeProduct({id}));
  };

  return (
    <div className={style.count}>
      <button className={style.minus} onClick={decCount}>-</button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus} onClick={incCount}>+</button>
    </div>
  );
};