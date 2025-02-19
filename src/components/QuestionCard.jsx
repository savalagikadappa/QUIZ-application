import { useEffect, useState } from "react";
import "../styles/QuestionCard.css"; // Import styles

const QuestionCard = ({ questionData, selectedAnswer, onAnswerChange, isLocked }) => {
    const { question, options, type, answer } = questionData;
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        setSelectedOption(null);
        setShowFeedback(false);
    }, [questionData]);

    const handleOptionClick = (option) => {
        if (!isLocked && !showFeedback) {
            setSelectedOption(option);
            setShowFeedback(true);
            onAnswerChange(option);
        }
    };

    return (
        <div className="question-card">
            <h3>{question}</h3>
            {type === "mcq" ? (
                <ul className="options">
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            className={
                                `option ${selectedOption === option ? (option === answer ? "correct" : "incorrect") : ""} ` +
                                `${showFeedback && option === answer ? "correct" : ""}`
                            }
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="integer-input-container">
                    <input
                        type="number"
                        className={`input-field ${selectedAnswer == answer ? "correct" : "incorrect"}`}
                        value={selectedAnswer || ""}
                        onChange={(e) => !isLocked && onAnswerChange(e.target.value)}
                        disabled={isLocked}
                    />
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
