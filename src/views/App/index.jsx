import React, { useEffect, useState } from "react";

import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";

import styles from "./index.module.scss";

export const generateId = () =>
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

export const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const categories = ["Productivity", "Relax", "Chores"];

    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const filteredTasks = selectedCategory === "All"
        ? tasks
        : tasks.filter(task => task.category === selectedCategory);

    const handleAddTask = (title, category) => {
        setTasks([...tasks, {
            id: generateId(),
            title,
            category,
            completed: false,
        }]);
    };

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <section className={styles.articleSection}>
                    <InputPlus
                        onAdd={handleAddTask}
                        categories={categories}
                    />
                </section>
            </section>
            <section className={styles.articleSection}>
                <label>Filter by category: </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Relax">Relax</option>
                    <option value="Chores">Chores</option>
                </select>
            </section>
            <section className={styles.articleSection}>
                {filteredTasks.length <= 0 && (
                    <p className={styles.articleText}>There are no tasks.</p>
                )}
                {filteredTasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        category={task.category}
                        onDone={(id) => {
                            setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
                        }}
                        onRemove={(id) => {
                            setTasks(tasks.filter((task) => task.id !== id));
                        }}
                        onEdited={(id, newTitle) => {
                            setTasks(
                                tasks.map((task) => {
                                    if (task.id === id) {
                                        return {
                                            ...task,
                                            title: newTitle,
                                        };
                                    }
                                    return task;
                                })
                            );
                        }}
                    />
                ))}
            </section>
        </article>
    );
};
