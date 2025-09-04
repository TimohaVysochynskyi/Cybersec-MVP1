export interface Email {
    id: string;
    from: string;
    fromEmail: string;
    subject: string;
    date: string;
    isPhishing: boolean;
    contentPath: string;
}

export interface EmailListProps {
    emails: Email[];
    selectedEmailId: string | null;
    onEmailSelect: (email: Email) => void;
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
}
