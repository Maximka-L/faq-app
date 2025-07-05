import React from 'react';
import FAQItem from './FAQItem';
import {ChevronDown, ChevronUp} from 'lucide-react';

const Category = ({ category, onVote, onToggle, onToggleQuestion }) => {
    const sortedQuestions = [...category.questions].sort((a, b) => b.rating - a.rating);
    const totalRating = category.questions.reduce((sum, q) => sum + q.rating, 0);

    return (
        <div className="category">
            <div className="category_header" onClick={onToggle}>
                <div className="title_with_icon">
                    <h2 className="category_title">{category.name}</h2>
                    <div className="arrow">
                        {category.isOpen ? (
                            <ChevronUp size={24} strokeWidth={2} />
                        ) : (
                            <ChevronDown size={24} strokeWidth={2} />
                        )}
                    </div>
                </div>

            </div>

            {category.isOpen && (
                <div className="questions">
                    {sortedQuestions.map(question => (
                        <FAQItem
                            key={question.id}
                            question={question}
                            categoryId={category.id}
                            onVote={onVote}
                            onToggleQuestion={onToggleQuestion}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
