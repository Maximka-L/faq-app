import React from 'react';

const FAQItem = ({ question, categoryId, onVote }) => {
    return (
        <div className="faq-item">
            <p className="faq-question"><strong>{question.question}</strong></p>
            <p className="faq-answer">{question.answer}</p>
            <div className="vote-buttons">
                <button onClick={() => onVote(categoryId, question.id, 1)}>Да</button>
                <button onClick={() => onVote(categoryId, question.id, -1)}>Нет</button>
                <span className="rating">Рейтинг: {question.rating}</span>
            </div>
        </div>
    );
};

export default FAQItem;
