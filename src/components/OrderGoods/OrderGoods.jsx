import {Count} from "../Count/Count";
import style from './OrderGoods.module.css';
import {API_URL} from "../../const.js";

export const OrderGoods = (props) => (
  <li className={style.item}>
    <img className={style.image} src={`${API_URL}/${props.image}`} alt={props.title}/>

    <div className={style.goods}>
      <h3 className={style.title}>{props.title}</h3>

      <p className={style.weight}>{props.weight}&nbsp;г</p>

      <p className={style.price}>{props.price}
        <span className="currency">&nbsp;₽</span>
      </p>
    </div>

    <Count count={props.count} id={props.id}/>
  </li>
);