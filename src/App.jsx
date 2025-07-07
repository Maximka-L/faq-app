import React, { useState, useEffect, useCallback } from 'react';
import faqData from './data/faqData.json';
import Category from './components/Category';
import './styles.css';

function App() {
    const [categories, setCategories] = useState([]);

    
    useEffect(() => {
        const savedVotes = JSON.parse(localStorage.getItem('faqVotes')) || {};
        const initializedCategories = faqData.categories.map(cat => ({
            ...cat,
            isOpen: false,
            questions: cat.questions.map(q => ({
                ...q,
                rating: savedVotes[q.id] ?? q.rating,
                isOpen: false,
                voted: !!savedVotes[q.id] 
            }))
        }));
        setCategories(initializedCategories);
    }, []);

    
    const handleVote = useCallback((categoryId, questionId, delta) => {
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId ? {
                ...cat,
                questions: cat.questions.map(q =>
                    q.id === questionId ? {
                        ...q,
                        rating: q.rating + delta,
                        voted: true
                    } : q
                )
            } : cat
        ));
    }, []);

    // Переключение категорий с useCallback
    const toggleCategory = useCallback((id) => {
        setCategories(prev => prev.map(cat =>
            cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat
        ));
    }, []);

    // Переключение вопросов с useCallback
    const toggleQuestion = useCallback((categoryId, questionId) => {
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId ? {
                ...cat,
                questions: cat.questions.map(q =>
                    q.id === questionId ? { ...q, isOpen: !q.isOpen } : q
                )
            } : cat
        ));
    }, []);

    
    useEffect(() => {
        if (categories.length > 0) {
            const votesMap = categories.reduce((acc, cat) => {
                cat.questions.forEach(q => {
                    acc[q.id] = q.rating;
                });
                return acc;
            }, {});
            localStorage.setItem('faqVotes', JSON.stringify(votesMap));
        }
    }, [categories]);

    
    const sortedCategories = React.useMemo(() => {
        return [...categories].sort((a, b) => {
            const sumRating = questions => questions.reduce((sum, q) => sum + q.rating, 0);
            return sumRating(b.questions) - sumRating(a.questions);
        });
    }, [categories]);

    return (
        <div className="container">
            <div className="layout">
                <div className="faq_header">
                    <h1>FAQ</h1>
                </div>

                <div className="main_content">
                    {sortedCategories.map(category => (
                        <Category
                            key={category.id}
                            category={category}
                            onVote={handleVote}
                            onToggle={() => toggleCategory(category.id)}
                            onToggleQuestion={toggleQuestion}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
