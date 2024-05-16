import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

export const InputTask = ({ id, title, completed, onDone, onRemove, onEdited }) => {
    const [checked, setChecked] = useState(completed);
    const [isEdit, setEditMode] = useState(false);
    const [value, setValue] = useState(title);

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Checkbox
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked);
                    setTimeout(() => onDone(id), 300);
                }}
            />
            {isEdit ? (
                <TextField
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    variant="outlined"
                    fullWidth
                />
            ) : (
                <Box flexGrow={1} component="span">
                    {title}
                </Box>
            )}
            {isEdit ? (
                <IconButton
                    onClick={() => {
                        setEditMode(false);
                        onEdited(id, value);
                    }}
                    aria-label="Save"
                >
                    <SaveIcon />
                </IconButton>
            ) : (
                <IconButton
                    onClick={() => setEditMode(true)}
                    aria-label="Edit"
                >
                    <EditIcon />
                </IconButton>
            )}
            <IconButton
                onClick={() => {
                    if (window.confirm('Are you sure?')) {
                        onRemove(id);
                    }
                }}
                aria-label="Remove"
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};
