import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, categoryId, onVote, onToggleQuestion }) => {
    // Проверка наличия обязательных данных
    if (!question || !categoryId) return null;

    const handleToggle = () => {
        if (onToggleQuestion) onToggleQuestion(categoryId, question.id);
    };

    const handleVote = (value, e) => {
        e.stopPropagation();
        if (onVote) onVote(categoryId, question.id, value);
    };

    return (
        <div className="faq_item">
            <div
                className="faq_grid"
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                aria-expanded={question.isOpen}
                aria-label={question.isOpen ? 'Свернуть вопрос' : 'Развернуть вопрос'}
            >
                <div className="faq_question_block">
                    <div className="faq_label">Вопрос</div>
                    <div className="faq_content_quest">
                        {question.question}
                        <div className="arrow">
                            {question.isOpen ? (
                                <ChevronUp size={24} strokeWidth={2} aria-hidden="true" />
                            ) : (
                                <ChevronDown size={24} strokeWidth={2} aria-hidden="true" />
                            )}
                        </div>
                    </div>
                </div>

                {question.isOpen && (
                    <>
                        <div className="faq_question_block">
                            <div className="faq_label">Ответ</div>
                            <div className="faq_content_answer">{question.answer}</div>
                        </div>
                        <div className="faq_feedback_block">
                            <div className="feedback_spacer"></div>
                            <div className="feedback_content">
                                {question.voted ? (
                                    <p className="vote_accepted">Отзыв отправлен, спасибо!</p>
                                ) : (
                                    <>
                                        <p>Информация была полезной?</p>
                                        <div className="feedback_buttons">
                                            <button
                                                className="btn_yes"
                                                onClick={(e) => handleVote(1, e)}
                                                aria-label="Ответить 'Да'"
                                            >
                                                Да
                                            </button>
                                            <button
                                                className="btn_no"
                                                onClick={(e) => handleVote(-1, e)}
                                                aria-label="Ответить 'Нет'"
                                            >
                                                Нет
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FAQItem;