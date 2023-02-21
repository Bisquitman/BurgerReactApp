import style from './Container.module.css';
import classNames from "classnames";

export const Container = (props) => (
  <div className={classNames(style.container, props.className)}>
    {props.children}
  </div>
);