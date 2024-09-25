import React, { useState } from 'react';
import { TextField } from '@mui/material';

const CreditCardInput = ({ onChange, ...props }) => {
    const [value, setValue] = useState('');

    const formatCreditCardNumber = (input) => {
        // Remove non-digit characters
        const cleaned = ('' + input).replace(/\D/g, '');

        // Group digits into sets of four
        const match = cleaned.match(/(\d{1,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
        const formatted = match
            ? [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ')
            : '';

        return formatted;
    };

    const handleChange = (e) => {
        // Ensure e and e.target are defined
        if (e && e.target) {
            const inputValue = e.target.value;
            const formattedValue = formatCreditCardNumber(inputValue);
            setValue(formattedValue);
            onChange({ target: { name: props.name, value: formattedValue } }); // Create a synthetic event
        }
    };

    return (
        <TextField
            label="Credit Card Number"
            value={value}
            onChange={handleChange}
            variant="filled"
            fullWidth
            {...props}
        />
    );
};

export default CreditCardInput;
