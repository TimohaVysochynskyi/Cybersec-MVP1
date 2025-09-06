import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { Email as EmailType } from '../../types/email';

interface UseEmailFlowProps {
    allEmails: EmailType[];
    onEmailSelect?: (email: EmailType) => void;
}

export const useEmailFlow = ({ allEmails, onEmailSelect }: UseEmailFlowProps) => {
    const [receivedEmails, setReceivedEmails] = useState<EmailType[]>([]);
    const [isTrainingStarted, setIsTrainingStarted] = useState(false);
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
    const [readEmails, setReadEmails] = useState<Set<string>>(new Set());

    // Звуковий ефект для нових листів
    const playNotificationSound = useCallback(() => {
        try {
            // Простий звуковий ефект з Web Audio API
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const audioContext = new AudioContextClass();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Sound not available:', error);
        }
    }, []);

    // Функція для додавання нового листа з toast повідомленням
    const addNewEmail = useCallback((email: EmailType, onEmailSelect?: (email: EmailType) => void) => {
        const updatedEmail = {
            ...email,
            date: new Date().toISOString() // Встановлюємо реальний час
        };

        setReceivedEmails(prev => {
            // Додаємо новий лист на початок (найновіші зверху)
            const newEmails = [updatedEmail, ...prev];
            return newEmails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });

        // Створюємо кастомний toast з прозорою кнопкою
        if (onEmailSelect) {
            toast.custom(
                (t) => {
                    const handleClick = () => {
                        onEmailSelect(updatedEmail);
                        toast.dismiss(t.id);
                    };

                    return React.createElement(
                        'div',
                        {
                            style: {
                                position: 'relative',
                                background: '#ffffff',
                                color: '#2d3748',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                boxShadow: '0 8px 25px rgba(52, 64, 231, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                maxWidth: '300px',
                                transform: t.visible ? 'translateX(0)' : 'translateX(100%)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }
                        },
                        [
                            // Прозора кнопка поверх всього toast-а
                            React.createElement(
                                'button',
                                {
                                    key: 'overlay-button',
                                    onClick: handleClick,
                                    style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        zIndex: 10,
                                    },
                                    'aria-label': `Перейти до листа від ${email.from}`
                                }
                            ),
                            React.createElement('span', { key: 'icon', style: { fontSize: '16px' } }, '📧'),
                            React.createElement('span', { key: 'text' }, `Новий лист від ${email.from}`)
                        ]
                    );
                },
                {
                    duration: 4000,
                    position: 'bottom-right',
                }
            );
        } else {
            toast.success(`Новий лист від ${email.from}`, {
                duration: 4000,
                position: 'bottom-right',
                style: {
                    background: '#ffffff',
                    color: '#2d3748',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 8px 25px rgba(52, 64, 231, 0.15)',
                },
                icon: '📧',
            });
        }

        // Програємо звук
        playNotificationSound();
    }, [playNotificationSound]);    // Початкове додавання першого листа через 3 секунди
    useEffect(() => {
        if (allEmails.length > 0 && receivedEmails.length === 0) {
            const timer = setTimeout(() => {
                addNewEmail(allEmails[0], onEmailSelect);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [allEmails, receivedEmails.length, addNewEmail, onEmailSelect]);

    // Функція для початку тренування (додає другий лист)
    const startTraining = useCallback(() => {
        if (!isTrainingStarted && allEmails.length > 1) {
            setIsTrainingStarted(true);
            setCurrentEmailIndex(1);

            setTimeout(() => {
                addNewEmail(allEmails[1], onEmailSelect);
            }, 2000); // Збільшую затримку для кращого UX
        }
    }, [isTrainingStarted, allEmails, addNewEmail, onEmailSelect]);

    // Функція для додавання наступного листа після класифікації
    const proceedToNextEmail = useCallback(() => {
        const nextIndex = currentEmailIndex + 1;

        if (nextIndex < allEmails.length) {
            setCurrentEmailIndex(nextIndex);

            setTimeout(() => {
                addNewEmail(allEmails[nextIndex], onEmailSelect);
            }, 3000);
        }
    }, [currentEmailIndex, allEmails, addNewEmail, onEmailSelect]);

    // Функція для позначення листа як прочитаного
    const markEmailAsRead = useCallback((emailId: string) => {
        setReadEmails(prev => new Set(prev).add(emailId));
    }, []);

    return {
        receivedEmails,
        startTraining,
        proceedToNextEmail,
        isTrainingStarted,
        readEmails,
        markEmailAsRead,
        updateEmailCategory: (emailId: string, isPhishingGuess: boolean) => {
            setReceivedEmails(prevEmails =>
                prevEmails.map(email =>
                    email.id === emailId
                        ? { ...email, category: isPhishingGuess ? 'spam' : 'inbox' }
                        : email
                )
            );
        }
    };
};
