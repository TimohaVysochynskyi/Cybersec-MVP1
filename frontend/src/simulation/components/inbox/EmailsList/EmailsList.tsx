import EmailItem from "../EmailItem/EmailItem";
import css from "./EmailsList.module.css";
import type { EmailListProps, EmailCategory } from "../../../../types/email";

const categoryNames: Record<EmailCategory, string> = {
  inbox: "Вхідні",
  spam: "Небажана пошта",
  all: "Уся пошта",
};

export default function EmailsList({
  emails,
  selectedEmailId,
  onEmailSelect,
  currentCategory,
  readEmails,
}: EmailListProps) {
  return (
    <>
      <div className={css.container}>
        <div className={css.head}>
          <span className={css.title}>{categoryNames[currentCategory]}</span>
        </div>
        <ul className={css.list}>
          {emails.map((email) => (
            <li
              key={email.id}
              className={`${css.item} ${
                readEmails?.has(email.id) ? css.read : ""
              }`}
            >
              <EmailItem
                email={email}
                isSelected={email.id === selectedEmailId}
                onClick={onEmailSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
