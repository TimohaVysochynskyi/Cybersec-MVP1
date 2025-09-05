import { useState, useEffect } from "react";
import css from "./Simulation.module.css";
import Layout from "./components/Layout/Layout";
import Body from "./components/email/Body/Body";
import Email from "./components/email/Email";
import Head from "./components/email/Head/Head";
import EmailsList from "./components/inbox/EmailsList/EmailsList";
import NavigationBar from "./components/inbox/NavigationBar/NavigationBar";
import emailsData from "./data/emails.json";
import { useUserProgress } from "../hooks/useUserProgress";
import type { Email as EmailType, EmailCategory } from "../types/email";

export default function SimulationPage() {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<EmailCategory>("inbox");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { userProgress, classifyEmail, isEmailClassifiable, startEmailView } =
    useUserProgress(emails);

  useEffect(() => {
    setEmails(emailsData as EmailType[]);
    // Автоматично вибираємо перший лист
    if (emailsData.length > 0) {
      setSelectedEmail(emailsData[0] as EmailType);
    }
  }, []);

  const handleEmailSelect = (email: EmailType) => {
    setSelectedEmail(email);
    // Початок відстеження часу перегляду для класифікованих листів
    if (isEmailClassifiable(email.id)) {
      startEmailView(email.id);
    }
  };

  const handleClassifyEmail = (emailId: string, isPhishingGuess: boolean) => {
    classifyEmail(emailId, isPhishingGuess);

    // Оновлюємо категорію email після класифікації
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId
          ? {
              ...email,
              category: isPhishingGuess ? "spam" : ("inbox" as EmailCategory),
            }
          : email
      )
    );
  };

  const handleCategoryChange = (category: EmailCategory) => {
    setCurrentCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Фільтрація email-ів по категоріях та пошуку
  const filteredEmails = emails.filter((email) => {
    // Фільтрація по категорії
    if (currentCategory !== "all" && email.category !== currentCategory) {
      return false;
    }

    // Фільтрація по пошуковому запиту
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        email.fromEmail.toLowerCase().includes(query) ||
        email.from.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <>
      <Layout>
        <div className={css.container}>
          <NavigationBar
            currentCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
            userProgress={userProgress}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <div className={css.content}>
            <EmailsList
              emails={filteredEmails}
              selectedEmailId={selectedEmail?.id || null}
              onEmailSelect={handleEmailSelect}
              currentCategory={currentCategory}
            />
            <Email selectedEmail={selectedEmail}>
              <Head email={selectedEmail} />
              <Body
                email={selectedEmail}
                onClassifyEmail={handleClassifyEmail}
                userProgress={userProgress}
              />
            </Email>
          </div>
        </div>
      </Layout>
    </>
  );
}
