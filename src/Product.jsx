import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';

const Product = (name) => {
    const { handleSubmit, control } = useForm();
    const romaineCasesOrdered = useWatch({ control, name: name }) || 0;
    const romaineTotal = romaineCasesOrdered * 75;

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">Product: Chopped Romaine</Typography>
                <Typography>Price: $75 per case (12 x 8oz bags per case)</Typography>
            </Grid>

            <Grid item xs={12}>
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: true, min: 0 }} // Require at least 0 cases
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Number of Cases for Chopped Romaine"
                            fullWidth
                            variant="filled"
                            inputProps={{ min: 0 }} // Allow 0 as a valid input
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography>Total Cost for Chopped Romaine: ${romaineTotal}</Typography>
            </Grid></>
    )
}
export default Product