import css from "./Head.module.css";
import type { HeadProps } from "../../../../types/email";

export default function Head({ email }: HeadProps) {
  if (!email) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <>
      <div className={css.head}>
        <h2 className={css.subject}>{email.subject}</h2>
        <span className={css.date}>{formatDate(email.date)}</span>
      </div>
    </>
  );
}
