import { useState, useEffect } from "react";
import css from "./ResultsEmail.module.css";

interface UserProgress {
  points: number;
  classifiedEmails: Array<{
    emailId: string;
    isPhishingGuess: boolean;
    isCorrect: boolean;
    timestamp: number;
    responseTime: number;
    emailViewedAt: number;
  }>;
  totalClassifiableEmails: number;
  completionPercentage: number;
  averageResponseTime: number;
}

interface AchievementLevel {
  level: number;
  title: string;
  description: string;
}

export default function ResultsEmail() {
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [averageTime, setAverageTime] = useState<number>(0);
  const [currentAchievement, setCurrentAchievement] =
    useState<AchievementLevel>({
      level: 4,
      title: "📚 Початківець",
      description:
        "Ти робиш перші кроки в темі кібербезпеки. Не зупиняйся і рухайся далі!",
    });

  useEffect(() => {
    const achievementLevels: AchievementLevel[] = [
      {
        level: 1,
        title: "🌟 Цифровий детектив",
        description:
          "Ти відмінно бачиш підозрілі схеми й легко захищаєш себе від обману.",
      },
      {
        level: 2,
        title: "🔍 Аналітик",
        description:
          "Ти вже добре відрізняєш справжнє від підробки. Ще трохи — і тебе не обдуриш!",
      },
      {
        level: 3,
        title: "⚠️ Обережний користувач",
        description:
          "Ти починаєш помічати небезпечні сигнали. Це гарний прогрес!",
      },
      {
        level: 4,
        title: "📚 Початківець",
        description:
          "Ти тільки вчишся, але це вже крок уперед. Продовжуй тренуватись!",
      },
    ];

    const getAchievementByScore = (
      correctAnswers: number,
      totalAnswers: number
    ): AchievementLevel => {
      const percentage = (correctAnswers / totalAnswers) * 100;

      if (percentage >= 87.5) return achievementLevels[0]; // 7-8 з 8
      if (percentage >= 62.5) return achievementLevels[1]; // 5-6 з 8
      if (percentage >= 37.5) return achievementLevels[2]; // 3-4 з 8
      return achievementLevels[3]; // 0-2 з 8
    };

    const loadResults = () => {
      try {
        const storedProgress = localStorage.getItem("cybersec-user-progress");
        if (storedProgress) {
          const progress: UserProgress = JSON.parse(storedProgress);

          const correct = progress.classifiedEmails
            ? progress.classifiedEmails.filter((e) => e.isCorrect === true)
                .length
            : 0;
          const total = progress.totalClassifiableEmails || 8;
          const incorrect = total - correct;
          const avgTimeSeconds = progress.averageResponseTime
            ? Math.round(progress.averageResponseTime / 1000)
            : 0;

          setCorrectAnswers(correct);
          setIncorrectAnswers(incorrect);
          setAverageTime(avgTimeSeconds);

          const achievement = getAchievementByScore(correct, total);
          setCurrentAchievement(achievement);
        } else {
          setCorrectAnswers(0);
          setIncorrectAnswers(0);
          setAverageTime(0);
          setCurrentAchievement(achievementLevels[3]);
        }
      } catch {
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setAverageTime(0);
        setCurrentAchievement(achievementLevels[3]);
      }
    };

    loadResults();
  }, []);

  return (
    <div className={css.emailBody}>
      <div className={css.emailContainer}>
        <div className={css.headerSection}>
          <div className={css.successIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
          </div>
          <h1 className={css.mainTitle}>Гарна робота!</h1>
          <p className={css.subtitle}>
            Ти пройшов тренування з фішинговими листами
          </p>

          <div className={css.achievementBadge}>
            <h3 className={css.achievementTitle}>{currentAchievement.title}</h3>
            <p className={css.achievementText}>
              {currentAchievement.description}
            </p>
          </div>
        </div>

        <div className={css.contentSection}>
          <p className={css.congratulationsText}>
            🎯 Ти розібрав усі листи й прокачав свої навички медіаграмотності
          </p>

          <div className={css.resultsGrid}>
            <div className={`${css.resultCard} ${css.correct}`}>
              <h2 className={`${css.resultNumber} ${css.correct}`}>
                {correctAnswers}
              </h2>
              <p className={css.resultLabel}>Правильних</p>
            </div>
            <div className={`${css.resultCard} ${css.incorrect}`}>
              <h2 className={`${css.resultNumber} ${css.incorrect}`}>
                {incorrectAnswers}
              </h2>
              <p className={css.resultLabel}>Помилок</p>
            </div>
            <div className={`${css.resultCard} ${css.time}`}>
              <div className={css.timeDisplay}>{averageTime}с</div>
              <p className={css.resultLabel}>Середній час</p>
              <p className={css.resultSublabel}>на один лист</p>
            </div>
          </div>

          <div className={css.feedbackSection}>
            <h3 className={css.feedbackTitle}>🤝 Маєш ідеї чи відгук?</h3>
            <p className={css.feedbackText}>
              Розкажи, що думаєш про тренування, і допоможи зробити його кращим.
            </p>
            <a
              href="https://forms.gle/your-feedback-form"
              className={css.ctaButton}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
              </svg>
              Залишити відгук
            </a>
          </div>
        </div>

        <div className={css.footerSection}>
          <p className={css.footerText}>
            🛡️ Пам’ятай: уважність і критичне мислення — твій найкращий захист
            онлайн
          </p>
        </div>
      </div>
    </div>
  );
}
