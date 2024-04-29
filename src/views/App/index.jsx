import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';

export const generateId = () =>
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

export const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [themeMode, setThemeMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ?  JSON.parse(savedTasks) : [];
    });

    const categories = ['Productivity', 'Relax', 'Chores'];
    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTheme = () => {
        setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const filteredTasks = selectedCategory === 'All'
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

    const handleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleTaskRemoval = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleTaskEdition = (id, newTitle) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Provides a consistent baseline style */}
            <Container maxWidth="sm">
                <Typography variant="h2" gutterBottom>
                    To Do App
                </Typography>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <InputPlus onAdd={handleAddTask} categories={categories}/>
                <Box mt={2} mb={2}>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        displayEmpty
                        fullWidth
                        variant="outlined"
                    >
                        <MenuItem value="All">All</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </Box>
                {filteredTasks.length === 0 ? (
                    <Typography variant="subtitle1">
                        There are no tasks.
                    </Typography>
                ) : (
                    filteredTasks.map((task) => (
                        <InputTask
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            onDone={handleTaskCompletion}
                            onRemove={handleTaskRemoval}
                            onEdited={handleTaskEdition}
                        />
                    ))
                )}
            </Container>
        </ThemeProvider>
    );
};