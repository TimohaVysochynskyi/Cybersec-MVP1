import css from "./EmailItem.module.css";
import type { EmailItemProps } from "../../../../types/email";

export default function EmailItem({
  email,
  isSelected,
  onClick,
}: EmailItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClick = () => {
    onClick(email);
  };

  return (
    <>
      <div
        className={`${css.item} ${isSelected ? css.selected : ""}`}
        onClick={handleClick}
      >
        <div className={css.image}></div>
        <div className={css.content}>
          <div className={css.row}>
            <span className={css.subject}>{email.subject}</span>
            <span className={css.date}>{formatDate(email.date)}</span>
          </div>

          <span className={css.text}>
            {email.from} • {email.fromEmail}
          </span>
        </div>
      </div>
    </>
  );
}
