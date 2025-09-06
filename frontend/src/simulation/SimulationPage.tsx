import { useState } from "react";
import { Toaster } from "react-hot-toast";
import css from "./Simulation.module.css";
import Layout from "./components/Layout/Layout";
import Body from "./components/email/Body/Body";
import Email from "./components/email/Email";
import Head from "./components/email/Head/Head";
import EmailsList from "./components/inbox/EmailsList/EmailsList";
import NavigationBar from "./components/inbox/NavigationBar/NavigationBar";
import emailsData from "./data/emails.json";
import { useUserProgress } from "../hooks/useUserProgress";
import { useEmailFlow } from "./hooks/useEmailFlow";
import type { Email as EmailType, EmailCategory } from "../types/email";

export default function SimulationPage() {
  const [allEmails] = useState<EmailType[]>(emailsData as EmailType[]);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<EmailCategory>("inbox");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleEmailSelect = (email: EmailType) => {
    setSelectedEmail(email);
    markEmailAsRead(email.id);
    if (isEmailClassifiable(email.id)) {
      startEmailView(email.id);
    }
  };

  const {
    receivedEmails,
    startTraining,
    proceedToNextEmail,
    updateEmailCategory,
    readEmails,
    markEmailAsRead,
  } = useEmailFlow({
    allEmails,
    onEmailSelect: handleEmailSelect,
  });

  const { userProgress, classifyEmail, isEmailClassifiable, startEmailView } =
    useUserProgress(receivedEmails);

  const handleClassifyEmail = (emailId: string, isPhishingGuess: boolean) => {
    classifyEmail(emailId, isPhishingGuess);

    // Оновлюємо категорію email після класифікації
    updateEmailCategory(emailId, isPhishingGuess);

    // Після класифікації додаємо наступний лист
    proceedToNextEmail();
  };

  const handleStartTraining = () => {
    startTraining();
  };

  const handleCategoryChange = (category: EmailCategory) => {
    setCurrentCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Фільтрація email-ів по категоріях та пошуку
  const filteredEmails = receivedEmails.filter((email) => {
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

  // Підрахунок листів по категоріях
  const emailCounts = {
    all: receivedEmails.length,
    inbox: receivedEmails.filter((email) => email.category === "inbox").length,
    spam: receivedEmails.filter((email) => email.category === "spam").length,
  };

  return (
    <>
      <Toaster />
      <Layout>
        <div className={css.container}>
          <NavigationBar
            currentCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
            userProgress={userProgress}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            emailCounts={emailCounts}
          />
          <div className={css.content}>
            <EmailsList
              emails={filteredEmails}
              selectedEmailId={selectedEmail?.id || null}
              onEmailSelect={handleEmailSelect}
              currentCategory={currentCategory}
              readEmails={readEmails}
            />
            <Email selectedEmail={selectedEmail}>
              <Head email={selectedEmail} />
              <Body
                email={selectedEmail}
                onClassifyEmail={handleClassifyEmail}
                userProgress={userProgress}
                onStartTraining={handleStartTraining}
              />
            </Email>
          </div>
        </div>
      </Layout>
    </>
  );
}
