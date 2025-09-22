export interface Faq {
    faq_id: number;
    question: string;
    answer: string;
    status: "active" | "inactive";
}
