import style from './Navigation.module.css';
import {Container} from "../Container/Container";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {changeCategory} from "../../store/category/categorySlice.js";

export const Navigation = () => {
  const {category, activeCategory} = useSelector((state) => state.category);
  const dispatch = useDispatch();

  return (
    <nav className={style.navigation}>
      <Container className={style.container}>
        <ul className={style.list}>
          {category.map((categoryItem, index) =>
            <li className={style.item}>
              <button
                className={classNames(
                  style.button,
                  activeCategory === index ? style.button_active : '')}
                style={{backgroundImage: `url(${categoryItem.image})`}}
                onClick={() => {
                  dispatch(changeCategory({indexCategory: index}));
                }}
              >
                {categoryItem.rus}
              </button>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
};