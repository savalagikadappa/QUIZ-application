import { useEffect, useState } from 'react';
import { addQuestions, getQuestions } from '../../backend/indexedDB.js';
import QuestionCard from '../components/QuestionCard.jsx';

const sampleQuestions = [
    {
        id: 1,
        type: "mcq",
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        answer: "Mercury"
    },
    {
        id: 2,
        type: "mcq",
        question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue"
    },
    {
        id: 3,
        type: "mcq",
        question: "Which of the following is primarily used for structuring web pages?",
        options: ["Python", "Java", "HTML", "C++"],
        answer: "HTML"
    },
    {
        id: 4,
        type: "mcq",
        question: "Which chemical symbol stands for Gold?",
        options: ["Au", "Gd", "Ag", "Pt"],
        answer: "Au"
    },
    {
        id: 5,
        type: "mcq",
        question: "Which of these processes is not typically involved in refining petroleum?",
        options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
        answer: "Filtration"
    },
    {
        id: 6,
        type: "integer",
        question: "What is the value of 12 + 28?",
        answer: "40"
    },
    {
        id: 7,
        type: "integer",
        question: "How many states are there in the United States?",
        answer: "50"
    },
    {
        id: 8,
        type: "integer",
        question: "In which year was the Declaration of Independence signed?",
        answer: "1776"
    },
    {
        id: 9,
        type: "integer",
        question: "What is the value of pi rounded to the nearest integer?",
        answer: "3"
    },
    {
        id: 10,
        type: "integer",
        question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
        answer: "120"
    }
];

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // Stores user responses
    const [submitted, setSubmitted] = useState(false); // Track submission

    useEffect(() => {
        const loadQuestions = async () => {
            const storedQuestions = await getQuestions();
            if (storedQuestions.length === 0) {
                await addQuestions(sampleQuestions);
                setQuestions(sampleQuestions);
            } else {
                setQuestions(storedQuestions);
            }
        };

        loadQuestions();
    }, []);

    const handleAnswerChange = (id, answer) => {
        if (!submitted) {
            setAnswers((prev) => ({ ...prev, [id]: answer }));
        }
    };

    const handleSubmit = () => {
        setSubmitted(true); // Lock answers after submission
        let score = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.answer) {
                score += 1;
            }
        });
        alert(`Quiz submitted! Your score is ${score}/${questions.length}.`);
    };

    return (
        <div className="quiz-container">
            <h2>Quiz Questions</h2>
            {questions.length > 0 ? (
                <>
                    {questions.map((q) => (
                        <QuestionCard
                            key={q.id}
                            question={q.question}
                            options={q.options}
                            type={q.type}
                            answer={q.answer}
                            selectedAnswer={answers[q.id]}
                            submitted={submitted}
                            onAnswerChange={(answer) => handleAnswerChange(q.id, answer)}
                        />
                    ))}
                    {!submitted && (
                        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                    )}
                </>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default Quiz;
