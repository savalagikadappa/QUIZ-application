import { useEffect, useState } from 'react';
import { addQuestions, getQuestions, saveResult } from '../../backend/indexedDB.js';
import QuestionCard from '../components/QuestionCard.jsx';
import '../styles/QuestionCard.css';

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

const Popup = ({ message, isCorrect, onClose }) => {
    return (
        <div className={`overlay ${isCorrect ? "green-popup" : "red-popup"}`}>
            <div className="popup">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};


const Quiz = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [showScorePopup, setShowScorePopup] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30); // Timer state

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

    // Timer effect
    useEffect(() => {
        if (!quizStarted || currentQuestionIndex >= questions.length) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    handleTimerExpiration();
                    return 30; // Reset timer for the next question
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount or question change
    }, [quizStarted, currentQuestionIndex, questions.length]);

    const handleTimerExpiration = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = answers[currentQuestion.id] || "";

        if (userAnswer === "") {
            // If no answer was selected, mark it as incorrect
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: "" }));
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleAnswerChange = (id, answer) => {
        setAnswers((prev) => ({ ...prev, [id]: answer }));
    };

    const handleNextQuestion = () => {
        setShowPopup(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimer(30); // Reset timer for the next question
        } else {
            handleSubmit();
        }
    };

    const handleCheckAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = answers[currentQuestion.id] || "";
        const correctAnswer = currentQuestion.answer;

        if (userAnswer === correctAnswer) {
            setPopupMessage("✅ Correct Answer!");
            setIsCorrect(true);
        } else {
            if (userAnswer == "") {
                setPopupMessage(`No answer entered  , the Correct Answer: ${correctAnswer} `)
            }
            else {
                setPopupMessage(`❌ Wrong Answer! Correct Answer: ${correctAnswer}`);
            }

            setIsCorrect(false);
        }

        setShowPopup(true);
    };

    const handleSubmit = async () => {
        let newScore = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.answer) newScore += 1;
        });
        setScore(newScore);
        await saveResult(newScore);
        setShowScorePopup(true);
    };

    const handleScorePopupClose = () => {
        setShowScorePopup(false);
        window.location.reload(); // Refresh the page
    };

    if (!quizStarted) {
        return (
            <div className="start-container">
                <button className="start-btn" onClick={() => setQuizStarted(true)}>
                    Start Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            {questions.length > 0 && (
                <>
                    <div className={`timer ${timer <= 10 ? "low-time" : ""}`}>
                        Time Left: {timer} seconds
                    </div>
                    <QuestionCard
                        questionData={questions[currentQuestionIndex]}
                        selectedAnswer={answers[questions[currentQuestionIndex].id]}
                        onAnswerChange={(answer) =>
                            handleAnswerChange(questions[currentQuestionIndex].id, answer)
                        }
                    />
                </>
            )}

            {questions[currentQuestionIndex]?.type === "integer" ? (
                <button className="check-btn" onClick={handleCheckAnswer}>
                    Next
                </button>
            ) : (
                <button className="next-btn" onClick={handleNextQuestion}>
                    Next
                </button>
            )}

            {showPopup && <Popup message={popupMessage} isCorrect={isCorrect} onClose={handleNextQuestion} />}
            {showScorePopup && (
                <Popup
                    message={`Your Score: ${score}/10`}
                    isCorrect={true}
                    onClose={handleScorePopupClose}
                />
            )}
        </div>
    );
};

export default Quiz;
