import { useState, useEffect } from 'react';
import type { UserProgress, ClassifiedEmail, Email } from '../types/email';

const STORAGE_KEY = 'cybersec-user-progress';
const POINTS_PER_CORRECT = 1;

export const useUserProgress = (emails: Email[]) => {
    const [userProgress, setUserProgress] = useState<UserProgress>({
        points: 0,
        classifiedEmails: [],
        totalClassifiableEmails: 8, // Завжди 8 листів для класифікації (id 2-9)
        completionPercentage: 0,
        averageResponseTime: 0,
    });

    const [emailViewStartTime, setEmailViewStartTime] = useState<number | null>(null);

    // Загальна кількість листів які можна класифікувати (виключаємо перший та останній)
    const totalClassifiableCount = 8; // id 2-9

    useEffect(() => {
        // Завантажуємо прогрес з localStorage
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
            try {
                const parsedProgress = JSON.parse(savedProgress) as UserProgress;
                setUserProgress({
                    ...parsedProgress,
                    totalClassifiableEmails: totalClassifiableCount,
                    completionPercentage: calculateCompletionPercentage(parsedProgress.classifiedEmails, totalClassifiableCount),
                });
            } catch (error) {
                console.error('Error parsing saved progress:', error);
                initializeProgress();
            }
        } else {
            initializeProgress();
        }

        function initializeProgress() {
            const initialProgress: UserProgress = {
                points: 0,
                classifiedEmails: [],
                totalClassifiableEmails: totalClassifiableCount,
                completionPercentage: 0,
                averageResponseTime: 0,
            };
            setUserProgress(initialProgress);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
        }

        // Очищуємо localStorage при закритті/перезавантаженні сторінки
        const clearProgressOnUnload = () => {
            localStorage.removeItem(STORAGE_KEY);
        };

        window.addEventListener('beforeunload', clearProgressOnUnload);
        window.addEventListener('unload', clearProgressOnUnload);

        return () => {
            window.removeEventListener('beforeunload', clearProgressOnUnload);
            window.removeEventListener('unload', clearProgressOnUnload);
        };
    }, []); // Видаляю залежність

    const calculateCompletionPercentage = (classified: ClassifiedEmail[], total: number): number => {
        if (total === 0) return 0;
        return Math.round((classified.length / total) * 100);
    };

    const classifyEmail = (emailId: string, isPhishingGuess: boolean) => {
        // Знаходимо email для перевірки правильності
        const email = emails.find(e => e.id === emailId);
        if (!email) return;

        // Перевіряємо чи вже класифікований цей email
        const existingClassification = userProgress.classifiedEmails.find(
            c => c.emailId === emailId
        );

        if (existingClassification) {
            // Оновлюємо існуючу класифікацію
            const updatedClassifications = userProgress.classifiedEmails.map(c =>
                c.emailId === emailId
                    ? {
                        ...c,
                        isPhishingGuess,
                        isCorrect: isPhishingGuess === email.isPhishing,
                        timestamp: Date.now()
                    }
                    : c
            );

            const newProgress = {
                ...userProgress,
                classifiedEmails: updatedClassifications,
                points: calculatePoints(updatedClassifications),
                completionPercentage: calculateCompletionPercentage(updatedClassifications, totalClassifiableCount),
                averageResponseTime: calculateAverageResponseTime(updatedClassifications),
            };

            setUserProgress(newProgress);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        } else {
            // Додаємо нову класифікацію
            const isCorrect = isPhishingGuess === email.isPhishing;
            const responseTime = emailViewStartTime ? Date.now() - emailViewStartTime : 0;
            const newClassification: ClassifiedEmail = {
                emailId,
                isPhishingGuess,
                isCorrect,
                timestamp: Date.now(),
                responseTime,
                emailViewedAt: emailViewStartTime || Date.now(),
            };

            const updatedClassifications = [...userProgress.classifiedEmails, newClassification];
            const newProgress = {
                ...userProgress,
                classifiedEmails: updatedClassifications,
                points: calculatePoints(updatedClassifications),
                completionPercentage: calculateCompletionPercentage(updatedClassifications, totalClassifiableCount),
                averageResponseTime: calculateAverageResponseTime(updatedClassifications),
            };

            setUserProgress(newProgress);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        }
    };

    const calculatePoints = (classifications: ClassifiedEmail[]): number => {
        return classifications.reduce((total, classification) => {
            return total + (classification.isCorrect ? POINTS_PER_CORRECT : 0);
        }, 0);
    };

    const calculateAverageResponseTime = (classifications: ClassifiedEmail[]): number => {
        if (classifications.length === 0) return 0;
        const totalTime = classifications.reduce((sum, c) => sum + c.responseTime, 0);
        return Math.round(totalTime / classifications.length);
    };

    const getEmailClassification = (emailId: string): ClassifiedEmail | undefined => {
        return userProgress.classifiedEmails.find(c => c.emailId === emailId);
    };

    const isEmailClassifiable = (emailId: string): boolean => {
        return emailId !== "1" && emailId !== "10";
    };

    const startEmailView = (emailId: string) => {
        if (isEmailClassifiable(emailId)) {
            setEmailViewStartTime(Date.now());
        }
    };

    const resetProgress = () => {
        const initialProgress: UserProgress = {
            points: 0,
            classifiedEmails: [],
            totalClassifiableEmails: totalClassifiableCount,
            completionPercentage: 0,
            averageResponseTime: 0,
        };
        setUserProgress(initialProgress);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
    };

    return {
        userProgress,
        classifyEmail,
        getEmailClassification,
        isEmailClassifiable,
        startEmailView,
        resetProgress,
    };
};
