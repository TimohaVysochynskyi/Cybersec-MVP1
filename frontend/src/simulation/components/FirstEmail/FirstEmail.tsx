import { useState } from "react";
import css from "./FirstEmail.module.css";

interface FirstEmailProps {
  onStartTraining: () => void;
}

export default function FirstEmail({ onStartTraining }: FirstEmailProps) {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartClick = () => {
    if (!isStarted) {
      setIsStarted(true);
      onStartTraining();
    }
  };

  return (
    <div className={css.emailBody}>
      <div className={css.emailContainer}>
        <div className={css.headerSection}>
          <div className={css.logoContainer}>
            <svg
              className={css.shieldIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10.5V11.5H13.5V10.5C13.5,8.7 12.8,8.2 12,8.2Z" />
            </svg>
            <h1 className={css.mainTitle}>Cybersecurity Training</h1>
          </div>
          <p className={css.subtitle}>Навчися розпізнавати фішингові листи</p>
        </div>

        <div className={css.contentSection}>
          <p className={css.welcomeText}>
            👋 Привіт! Раді бачити тебе в нашій інтерактивній симуляції
            кіберзахисту
          </p>

          <div className={css.stats}>
            <div className={css.statItem}>
              <span className={css.statNumber}>8</span>
              <span className={css.statLabel}>листів для перевірки</span>
            </div>
            <div className={css.statItem}>
              <span className={css.statNumber}>⭐</span>
              <span className={css.statLabel}>бали за правильні відповіді</span>
            </div>
            <div className={css.statItem}>
              <span className={css.statNumber}>🛡️</span>
              <span className={css.statLabel}>практика проти фішингу</span>
            </div>
          </div>

          <div className={css.infoCards}>
            <div className={css.infoCard}>
              <svg className={css.cardIcon} viewBox="0 0 24 24" fill="#3440e7">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
              </svg>
              <div className={css.cardContent}>
                <h3>Що тебе чекає?</h3>
                <p>
                  Ти отримаєш 8 листів від популярних сервісів. Завдання —
                  відрізнити справжні від фішингових.
                </p>
              </div>
            </div>

            <div className={css.infoCard}>
              <svg className={css.cardIcon} viewBox="0 0 24 24" fill="#48bb78">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
              <div className={css.cardContent}>
                <h3>Як відповідати?</h3>
                <p>
                  Натискай <strong>"Фішинг"</strong>, якщо лист підозрілий, або{" "}
                  <strong>"Безпечний"</strong>, якщо він виглядає безпечним.
                </p>
              </div>
            </div>

            <div className={css.infoCard}>
              <svg className={css.cardIcon} viewBox="0 0 24 24" fill="#ed8936">
                <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
              </svg>
              <div className={css.cardContent}>
                <h3>На що звертати увагу?</h3>
                <p>
                  Дивись уважно на адресу відправника, посилання, текст і
                  будь-які підозрілі прохання поділитися особистими даними.
                </p>
              </div>
            </div>
          </div>

          <div className={css.rulesSection}>
            <div className={css.rulesTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#3440e7">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
              </svg>
              <h3>Правила гри:</h3>
            </div>
            <div className={css.rulesList}>
              <div className={css.ruleItem}>
                <svg
                  className={css.checkIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
                <span>Фішингові листи автоматично йдуть у спам</span>
              </div>
              <div className={css.ruleItem}>
                <svg
                  className={css.checkIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
                <span>За правильний вибір ти отримуєш бали</span>
              </div>
              <div className={css.ruleItem}>
                <svg
                  className={css.checkIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
                <span>
                  Залежно від кількості правильних відповідей, ти отримаєш
                  відповідний рівень
                </span>
              </div>
            </div>
          </div>

          <div className={css.actionSection}>
            <button
              className={`${css.startButton} ${
                isStarted ? css.startButtonDisabled : ""
              }`}
              onClick={handleStartClick}
              disabled={isStarted}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
              {isStarted ? "Тренування розпочато" : "Почати тренування"}
            </button>
          </div>
        </div>

        <div className={css.footerSection}>
          <p className={css.footerText}>
            💡 Пам'ятай: у реальному житті завжди перевіряй листи, перш ніж щось
            відкривати чи натискати
          </p>
        </div>
      </div>
    </div>
  );
}
