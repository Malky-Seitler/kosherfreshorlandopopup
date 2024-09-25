import React from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { useOrderContext } from './OrderContext';
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const { setOrderDetails, setTotalOrderCost } = useOrderContext();

    // Sample products
    const products = [
        { name: 'Chopped Romaine', price: 75, description: '12 8oz bags per case' },
        { name: 'Coleslaw', price: 54, description: '12 8oz bags per case' },
    ];

    const [orderQuantity, setOrderQuantity] = React.useState(
        products.reduce((acc, product) => {
            acc[product.name] = 0; // Initialize quantities to 0
            return acc;
        }, {})
    );

    const handleQuantityChange = (name, value) => {
        setOrderQuantity((prev) => ({
            ...prev,
            [name]: Number(value) || 0, // Convert input to a number, default to 0 if invalid
        }));
    };

    const calculateTotalCost = () => {
        return products.reduce((total, product) => {
            return total + product.price * orderQuantity[product.name];
        }, 0);
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const totalCost = calculateTotalCost();
        setOrderDetails({ orderQuantity });
        setTotalOrderCost(totalCost);
        navigate('/submit')
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 600,
                mx: 'auto',
                mt: 4,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Kosher Fresh Orlando Sukkos Popup 2024
            </Typography>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} key={product.name}>
                        <Typography>{product.name} - ${product.price} per case</Typography>
                        <TextField
                            type="number"
                            value={orderQuantity[product.name]}
                            onChange={(e) => handleQuantityChange(product.name, e.target.value)}
                            min="0"
                            fullWidth
                            variant="filled"
                            label="Quantity"
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Typography variant="h6">Total Cost: ${calculateTotalCost()}</Typography>
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

export default HomePage;
