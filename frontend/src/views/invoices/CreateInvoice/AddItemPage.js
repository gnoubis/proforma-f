import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Button, FormControl, Grid, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| ADD ITEM PAGE ||============================== //

function AddItemPage({ handleAddItem, setAddItemClicked }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({
        quantityError: ''
    });

    const itemList = [
        {
            id: 111,
            name: 'Product Name 1',
            amount: 260,
            unity: 'ml',
            desc: 'Product Description 1'
        },
        {
            id: 112,
            name: 'Product Name 2',
            amount: 200,
            desc: 'Product Description 2'
        },
        {
            id: 113,
            name: 'Product Name 3',
            amount: 300,
            desc: 'Product Description 3'
        }
    ];

    useEffect(() => {
        if (selectedItem?.id) {
            setAmount(selectedItem.amount * selectedQuantity);
        }
    }, [selectedQuantity, selectedItem]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.name === 'quantité ') {
            if (Number(value) < 0) {
                setErrors({
                    ...errors,
                    quantityError: ' valeur négative non acceptable'
                });
                setSelectedQuantity(value);
            } else if (Number(value) === 0) {
                setErrors({
                    ...errors,
                    quantityError: 'la quantité ne peut pas etre nul'
                });
                setSelectedQuantity(value);
            } else {
                setSelectedQuantity(value);
                setErrors({
                    ...errors,
                    quantityError: ''
                });
            }
        } else {
            const selectedOption = itemList.find((item) => item.id === value);
            setSelectedItem(selectedOption);
        }
    };

    const handleOk = () => {
        const data = {
            ...selectedItem,
            totalAmount: amount,
            selectedQuantity
        };

        handleAddItem(data);
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">Nom de l&apos;article</Typography>
                        <FormControl>
                            <Select
                                fullWidth
                                displayEmpty
                                value={selectedItem?.id || ''}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography color="textSecondary" sx={{ lineHeight: '1.4375em' }}>
                                                Select Product
                                            </Typography>
                                        );
                                    }

                                    const selectedData = itemList.filter((item) => item.id === selected)[0];

                                    return (
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1" sx={{ lineHeight: '1.4375em' }}>
                                                {selectedData.name}
                                            </Typography>
                                            <Typography>Rate : {selectedData.amount}</Typography>
                                        </Stack>
                                    );
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <Typography color="textSecondary">Select Product</Typography>
                                </MenuItem>
                                {itemList.map((item, i) => (
                                    <MenuItem key={i} value={item.id}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1">{item.name}</Typography>
                                            <Typography>Rate : {item.amount}</Typography>
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" id="itemQuantity">
                            Unité
                        </Typography>
                        <TextField fullWidth type="text" name="unity" />
                        <Typography variant="subtitle1" id="itemUnity">
                            Quantité
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            name="quantity"
                            value={selectedQuantity}
                            onChange={handleChange}
                            error={Boolean(errors.quantityError)}
                            helperText={errors.quantityError}
                            disabled={!selectedItem?.id}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" id="itemAmount">
                            Montant
                        </Typography>
                        <TextField fullWidth name="amount" value={amount} disabled />
                    </Stack>
                </Grid>
                <Grid item container justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="error" onClick={() => setAddItemClicked(false)}>
                            Annuler
                        </Button>
                        <Button
                            disabled={!selectedItem?.id || !selectedQuantity || Boolean(errors.quantityError)}
                            variant="contained"
                            size="small"
                            onClick={handleOk}
                        >
                            Ajouter
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

AddItemPage.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddItemPage;
