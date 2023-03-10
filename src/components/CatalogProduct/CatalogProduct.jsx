import style from './CatalogProduct.module.css';
import {API_URL} from "../../const.js";
import {useDispatch} from "react-redux";
import {addProduct} from "../../store/order/orderSlice.js";

export const CatalogProduct = (props) => {
  const dispatch = useDispatch();
  return (
    <article className={style.product}>
      <img src={`${API_URL}/${props.item.image}`} alt={props.item.title} className={style.image}/>

      <p className={style.price}>{props.item.price}<span className="currency">&nbsp;&#8381;</span></p>

      <h3 className={style.title}>
        <button className={style.detail}>{props.item.title}</button>
      </h3>

      <p className={style.weight}>{props.item.weight}&nbsp;г</p>

      <button
        className={style.add}
        type="button"
        onClick={() => {
          dispatch(addProduct({id: props.item.id}))
        }}
      >
        Добавить
      </button>
    </article>
  )
};