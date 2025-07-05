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
                rating: saved[q.id] ?? q.rating,
                isOpen: false,
                voted: false,
            }))
        }));
        setCategories(updated);
    }, []);

    const handleVote = (categoryId, questionId, delta) => {
        setCategories((prev) => {
            const updated = prev.map((cat) =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        questions: cat.questions.map((q) =>
                            q.id === questionId ? {...q, rating: q.rating + delta, voted:true} : q
                        ),
                    }
                    : cat
            );
            const updatedCategory = updated.find((cat) => cat.id === categoryId);
            const totalVotes = updatedCategory.questions.reduce(
                (sum, q) => sum + q.rating,
                0
            );
            console.log(
                `Голосы записаны - Category ID: ${categoryId}, Question ID: ${questionId}, Vote: ${
                    delta > 0 ? "Upvoted" : "Downvoted"
                }, Общее количество голосов: ${totalVotes}`
            );
            return updated;
        });
    };

    const toggleCategory = (id) => {
        setCategories(prev =>
            prev.map(cat => cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat)
        );
    };
    const toggleQuestion = (categoryId, questionId) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        questions: cat.questions.map((q) =>
                            q.id === questionId ? {...q, isOpen: !q.isOpen} : q
                        ),
                    }
                    : cat
            )
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
                        onToggleQuestion={toggleQuestion}
                    />
                ))}

            </div>
        </div>
        </div>
    );
}

export default App;
