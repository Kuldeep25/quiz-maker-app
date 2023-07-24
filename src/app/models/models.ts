export interface Categories<Category> {
    trivia_categories: Category;
}

export interface Category {
    id: number;
    name: string;
}

export interface DifficultyLevel {
    id: string;
    name: string;
}

export interface QuizForm {
    category: number, 
    difficultyLevel: string
}

export interface QuestionAnwsersResponse {
    response_code: number;
    results: Results[]
}

export interface Results {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>,
    selectedAnswer: string;
    answerIndex: number;
}
