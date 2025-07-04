import React, { useState, useEffect } from 'react';
import faqData from './data/faqData.json';
import Category from './components/Category';
import './styles.css';

function App() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('faqVotes')) || {};
        const updated = faqData.categories.map(cat => ({
            ...cat,
            isOpen: false,
            questions: cat.questions.map(q => ({
                ...q,
                rating: saved[q.id] ?? q.rating
            }))
        }));
        setCategories(updated);
    }, []);

    const handleVote = (categoryId, questionId, delta) => {
        setCategories(prev =>
            prev.map(cat => cat.id === categoryId
                ? {
                    ...cat,
                    questions: cat.questions.map(q =>
                        q.id === questionId ? { ...q, rating: q.rating + delta } : q
                    )
                }
                : cat)
        );
    };

    const toggleCategory = (id) => {
        setCategories(prev =>
            prev.map(cat => cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat)
        );
    };

    useEffect(() => {
        const allVotes = {};
        categories.forEach(cat =>
            cat.questions.forEach(q => {
                allVotes[q.id] = q.rating;
            })
        );
        localStorage.setItem('faqVotes', JSON.stringify(allVotes));
    }, [categories]);

    const sortedCategories = [...categories].sort((a, b) => {
        const ratingA = a.questions.reduce((sum, q) => sum + q.rating, 0);
        const ratingB = b.questions.reduce((sum, q) => sum + q.rating, 0);
        return ratingB - ratingA;
    });

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
                    />
                ))}

            </div>
        </div>
        </div>
    );
}

export default App;
