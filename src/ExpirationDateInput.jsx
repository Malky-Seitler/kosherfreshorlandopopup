import React, { useState } from 'react';
import { TextField } from '@mui/material';

const ExpirationDateInput = ({ onChange, ...props }) => {
    const [value, setValue] = useState('');

    const formatExpirationDate = (input) => {
        // Remove non-digit characters
        const cleaned = ('' + input).replace(/\D/g, '');

        // Format as MM/YY
        const match = cleaned.match(/(\d{1,2})(\d{0,2})/);
        const formatted = match
            ? `${match[1]}${match[2] ? '/' + match[2] : ''}`
            : '';

        return formatted;
    };

    const handleChange = (e) => {
        if (e && e.target) {
            const inputValue = e.target.value;
            const formattedValue = formatExpirationDate(inputValue);
            setValue(formattedValue);
            onChange({ target: { name: props.name, value: formattedValue } }); // Create a synthetic event
        }
    };

    return (
        <TextField
            label="Expiration Date (MM/YY)"
            value={value}
            onChange={handleChange}
            variant="filled"
            fullWidth
            {...props}
        />
    );
};

export default ExpirationDateInput;
