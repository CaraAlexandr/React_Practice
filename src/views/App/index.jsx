import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Select, MenuItem, Box, Button, Pagination } from '@mui/material';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import api from '../config/api'; // Use the updated axios instance

export const generateId = () =>
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

const App = ({ authToken }) => {
    const [tasks, setTasks] = useState([]);
    const [themeMode, setThemeMode] = useState('light');
    const categories = ['PRODUCTIVITY', 'RELAX', 'CHORES'];
    const theme = themeMode === 'light' ? lightTheme : darkTheme;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            console.log('No authToken, navigating to login');
            navigate('/login');
        }
    }, [authToken, navigate]);

    const fetchTasks = async (page, category) => {
        try {
            const response = await api.get('/api/notes', {
                params: {
                    page: page - 1, // Backend is 0-indexed
                    size: 10,
                    type: category !== 'All' ? category : null,
                },
            });
            setTasks(response.data.content || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchTasks(page, selectedCategory);
    }, [page, selectedCategory]);

    const handleAddTask = async (message, category) => {
        try {
            const newTask = {
                message,
                type: category.toUpperCase(),
                completed: false,
            };
            const response = await api.post('/api/notes', newTask);
            fetchTasks(page, selectedCategory); // Refresh tasks after adding
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleTaskCompletion = async (id) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
            await api.put(`/api/notes/${id}`, updatedTask);
            fetchTasks(page, selectedCategory); // Refresh tasks after updating
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleTaskRemoval = async (id) => {
        try {
            await api.delete(`/api/notes/${id}`);
            fetchTasks(page, selectedCategory); // Refresh tasks after deletion
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleTaskEdition = async (id, newTitle) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            const updatedTask = { ...taskToUpdate, message: newTitle }; // Update message field
            await api.put(`/api/notes/${id}`, updatedTask);
            fetchTasks(page, selectedCategory); // Refresh tasks after updating
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography variant="h2" gutterBottom>
                    To Do App
                </Typography>
                <Button onClick={() => setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light')}>
                    Toggle Theme
                </Button>
                <Button onClick={() => navigate('/login')}>
                    Login
                </Button>
                <InputPlus onAdd={handleAddTask} categories={categories} />
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
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                {tasks.length === 0 ? (
                    <Typography variant="subtitle1">
                        There are no tasks.
                    </Typography>
                ) : (
                    tasks.map((task) => (
                        <InputTask
                            key={task.id}
                            id={task.id}
                            title={task.message} // Use message as title
                            completed={task.completed}
                            onDone={handleTaskCompletion}
                            onRemove={handleTaskRemoval}
                            onEdited={handleTaskEdition}
                        />
                    ))
                )}
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Container>
        </ThemeProvider>
    );
};

export default App;
