import style from './Count.module.css';
import {useState} from "react";

export const Count = (props) => {
  const [count, setCount] = useState(props.count);

  const incCount = () => {
    setCount(count + 1);
    count.addEventListener()
  };
  const decCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className={style.count}>
      <button className={style.minus} onClick={decCount} disabled={count === 1}>-</button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus} onClick={incCount}>+</button>
    </div>
  );
};