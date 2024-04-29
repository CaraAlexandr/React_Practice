import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuItem from '@mui/material/MenuItem';

export const InputPlus = ({ onAdd, categories }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');

    const onAddMemoized = useCallback(() => {
        if (!inputValue || !selectedCategory) {
            alert('Please enter a task name and select a category.');
            return;
        }
        onAdd(inputValue, selectedCategory);
        setInputValue('');
        setSelectedCategory(categories[0] || '');
    }, [inputValue, selectedCategory, onAdd, categories]);

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField
                label="Type here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAddMemoized()}
                variant="outlined"
                fullWidth
            />
            <TextField
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                variant="outlined"
                sx={{ minWidth: 120 }}
            >
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
            <IconButton onClick={onAddMemoized} aria-label="Add" color="primary">
                <AddCircleOutlineIcon />
            </IconButton>
        </Box>
    );
};
