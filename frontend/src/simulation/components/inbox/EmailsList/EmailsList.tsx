import EmailItem from "../EmailItem/EmailItem";
import css from "./EmailsList.module.css";

export default function EmailsList() {
  return (
    <>
      <div className={css.container}>
        <div className={css.head}>
          <span className={css.title}>Вхідні</span>
        </div>
        <ul className={css.list}>
          <li className={css.item}>
            <EmailItem />
          </li>
          <li className={css.item}>
            <EmailItem />
          </li>
          <li className={css.item}>
            <EmailItem />
          </li>
          <li className={css.item}>
            <EmailItem />
          </li>
          <li className={css.item}>
            <EmailItem />
          </li>
          <li className={css.item}>
            <EmailItem />
          </li>
          <li className={css.item}>
            <EmailItem />
          </li>
        </ul>
      </div>
    </>
  );
}
