import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useOrderContext } from './OrderContext';
import axios from 'axios';
import CreditCardInput from './CreditCardInput';
import ExpirationDateInput from './ExpirationDateInput';

const SubmitPage = () => {
    const { orderDetails, totalOrderCost } = useOrderContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        creditCardNumber: '',
        expDate: '',
        secCode: '',
        address: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/send-email', {
                to: 'matapdistributors@gmail.com',
                subject: 'New Order Details',
                text: JSON.stringify({
                    ...formData,
                    orderDetails,
                    totalOrderCost,
                }),
            });
            alert('Order details sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your order details. Please try again.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={onSave}
            sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4, p: 2, borderRadius: 2, boxShadow: 3 }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                User Information
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        label="Full Name"
                        fullWidth
                        variant="filled"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="filled"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CreditCardInput
                        name="creditCardNumber"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ExpirationDateInput
                        name="expDate"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="secCode"
                        label="Security Code"
                        type="text"
                        fullWidth
                        variant="filled"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="address"
                        label="Shipping Address"
                        fullWidth
                        variant="filled"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        fullWidth
                        variant="filled"
                        required
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Total Cost: ${totalOrderCost}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                        Submit Order
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SubmitPage;
