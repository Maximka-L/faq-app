import React from 'react';

const FAQItem = ({ question, categoryId, onVote }) => {
    return (
        <div className="faq_item">
            {/*<div className="faq_block">*/}
            {/*    <p className="title_item">Вопрос</p>*/}
            {/*    <p className="faq_question"><strong>{question.question}</strong></p>*/}
            {/*</div>*/}
            {/*<div className="faq_block">*/}
            {/*    <p className="title_item">Ответ</p>*/}
            {/*    <p className="faq_answer">{question.answer}</p>*/}
            {/*</div>*/}
            {/*<div className="vote_buttons">*/}
            {/*    <button onClick={() => onVote(categoryId, question.id, 1)}>Да</button>*/}
            {/*    <button onClick={() => onVote(categoryId, question.id, -1)}>Нет</button>*/}
            {/*    <span className="rating">Рейтинг: {question.rating}</span>*/}
            {/*</div>*/}
            <div className="faq_grid">
                <div className="faq_label">Вопрос</div>
                <div className="faq_content_quest">{question.question}</div>
                <div className="faq_label">Ответ</div>
                <div className="faq_content_answer">{question.answer}</div>
                <div className="feedback_spacer"></div>
                <div className="feedback_content">
                    <p>Информация была полезной?</p>
                    <div className="feedback_buttons">
                        <button className="btn_yes">Да</button>
                        <button className="btn_no">Нет</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FAQItem;


// {category.isOpen && (
//                 <div className="questions">
//                     {sortedQuestions.map(question => (
//                         <FAQItem
//                             key={question.id}
//                             question={question}
//                             categoryId={category.id}
//                             onVote={onVote}
//                         />
//                     ))}
//                 </div>
//             )}