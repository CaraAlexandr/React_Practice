import React, { useState, useCallback } from "react";
import styles from "./index.module.scss";

export const InputPlus = ({ onAdd, categories }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const onAddMemoized = useCallback(() => {
        if (!inputValue) {
            alert("Please enter a task name.");
            return;
        }
        onAdd(inputValue, selectedCategory);
        setInputValue("");
        setSelectedCategory(categories[0]); // Reset category to default after adding task
    }, [inputValue, selectedCategory, onAdd, categories]);

    console.log("render InputPlus");
    return (
        <div className={styles.inputPlus}>
            <input
                type="text"
                value={inputValue}
                className={styles.inputPlusValue}
                placeholder="Type here..."
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAddMemoized()}
            />
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.inputPlusSelect} // Assuming you have CSS for this
            >
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <button
                onClick={onAddMemoized}
                aria-label="Add"
                className={styles.inputPlusButton}>
            </button>
        </div>
    );
};

