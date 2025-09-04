import { useState, useEffect } from "react";
import css from "./Simulation.module.css";
import Layout from "./components/Layout/Layout";
import Body from "./components/email/Body/Body";
import Email from "./components/email/Email";
import Head from "./components/email/Head/Head";
import EmailsList from "./components/inbox/EmailsList/EmailsList";
import NavigationBar from "./components/inbox/NavigationBar/NavigationBar";
import emailsData from "./data/emails.json";
import type { Email as EmailType } from "../types/email";

export default function SimulationPage() {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);

  useEffect(() => {
    setEmails(emailsData as EmailType[]);
    // Автоматично вибираємо перший лист
    if (emailsData.length > 0) {
      setSelectedEmail(emailsData[0] as EmailType);
    }
  }, []);

  const handleEmailSelect = (email: EmailType) => {
    setSelectedEmail(email);
  };

  return (
    <>
      <Layout>
        <div className={css.container}>
          <NavigationBar />
          <div className={css.content}>
            <EmailsList
              emails={emails}
              selectedEmailId={selectedEmail?.id || null}
              onEmailSelect={handleEmailSelect}
            />
            <Email selectedEmail={selectedEmail}>
              <Head email={selectedEmail} />
              <Body email={selectedEmail} />
            </Email>
          </div>
        </div>
      </Layout>
    </>
  );
}
