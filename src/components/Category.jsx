import React from 'react';
import FAQItem from './FAQItem';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Category = ({ category, onVote, onToggle }) => {
    const sortedQuestions = [...category.questions].sort((a, b) => b.rating - a.rating);
    const totalRating = category.questions.reduce((sum, q) => sum + q.rating, 0);

    return (
        <div className="category">
            <div className="category-header" onClick={onToggle}>
                <div className="title-with-icon">
                    <h2 className="category-title">{category.name}</h2>
                    <div className="arrow">
                        {category.isOpen ? (
                            <ChevronDown size={24} strokeWidth={2} />
                        ) : (
                            <ChevronRight size={24} strokeWidth={2} />
                        )}
                    </div>
                </div>
                <span className="rating">
                    {totalRating >= 0 ? `+${totalRating}` : totalRating}
                </span>
            </div>

            {category.isOpen && (
                <div className="questions">
                    {sortedQuestions.map(question => (
                        <FAQItem
                            key={question.id}
                            question={question}
                            categoryId={category.id}
                            onVote={onVote}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
