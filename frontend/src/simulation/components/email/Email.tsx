import css from "./Email.module.css";
import type { EmailProps } from "../../../types/email";

export default function Email({
  children,
  selectedEmail,
}: EmailProps & { children: React.ReactNode }) {
  if (!selectedEmail) {
    return (
      <div className={css.container}>
        <div className={css.email}>
          <div className={css.noSelection}>
            <p>Виберіть лист для перегляду</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.email}>{children}</div>
    </div>
  );
}
