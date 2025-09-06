export interface Email {
    id: string;
    from: string;
    fromEmail: string;
    subject: string;
    date: string;
    isPhishing: boolean;
    contentPath: string;
    category: 'inbox' | 'spam' | 'all';
    logoPath: string;
}

export type EmailCategory = 'inbox' | 'spam' | 'all';

export interface EmailListProps {
    emails: Email[];
    selectedEmailId: string | null;
    onEmailSelect: (email: Email) => void;
    currentCategory: EmailCategory;
    readEmails?: Set<string>;
}

export interface EmailItemProps {
    email: Email;
    isSelected: boolean;
    onClick: (email: Email) => void;
}

export interface EmailProps {
    selectedEmail: Email | null;
}

export interface HeadProps {
    email: Email | null;
}

export interface BodyProps {
    email: Email | null;
    onClassifyEmail?: (emailId: string, isPhishingGuess: boolean) => void;
    userProgress?: UserProgress;
    onStartTraining?: () => void;
}

export interface UserProgress {
    points: number;
    classifiedEmails: ClassifiedEmail[];
    totalClassifiableEmails: number;
    completionPercentage: number;
    averageResponseTime: number;
}

export interface ClassifiedEmail {
    emailId: string;
    isPhishingGuess: boolean;
    isCorrect: boolean;
    timestamp: number;
    responseTime: number; // час у мілісекундах на прийняття рішення
    emailViewedAt: number; // коли користувач почав дивитися лист
}
