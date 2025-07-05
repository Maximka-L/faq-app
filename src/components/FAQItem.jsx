import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, categoryId, onVote, onToggleQuestion }) => {
    return (
        <div className="faq_item">
            <div className="faq_grid" onClick={() => onToggleQuestion(categoryId, question.id)}>
                <div className="faq_question_block">
                    <div className="faq_label">Вопрос</div>
                    <div className="faq_content_quest">
                        {question.question}
                        <div className="arrow">
                            {question.isOpen ? (
                                <ChevronUp size={24} strokeWidth={2} />
                            ) : (
                                <ChevronDown size={24} strokeWidth={2} />
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onVote(categoryId, question.id, 1);
                                                }}
                                            >
                                                Да
                                            </button>
                                            <button
                                                className="btn_no"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onVote(categoryId, question.id, -1);
                                                }}
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