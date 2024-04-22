import React, {useEffect, useState} from "react";

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

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if (!title) {
                            return;
                        }
                        setTasks([
                            ...tasks,
                            {
                                id: generateId(),
                                title,
                            },
                        ]);
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {tasks.length <= 0 && (
                    <p className={styles.articleText}>There are no tasks.</p>
                )}
                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
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