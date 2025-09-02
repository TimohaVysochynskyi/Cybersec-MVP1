import css from "./EmailItem.module.css";

export default function EmailItem() {
  return (
    <>
      <div className={css.item}>
        <div className={css.image}></div>
        <div className={css.content}>
          <div className={css.row}>
            <span className={css.subject}>
              Оновлення профілів у Google PlayMarket
            </span>
            <span className={css.date}>12:00</span>
          </div>

          <span className={css.text}>
            Оновлення профілів у Google PlayMarket буде розпочато одразу після
            бла бла бла
          </span>
        </div>
      </div>
    </>
  );
}
