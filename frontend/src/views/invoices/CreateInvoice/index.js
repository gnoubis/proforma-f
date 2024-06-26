import React, { useEffect, useState } from 'react';

// material-ui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tab,
    Box,
    Tabs
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';

// project imports
import AddItemPage from './AddItemPage';
import { gridSpacing } from 'store/constant';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import MainCard from 'ui-component/cards/MainCard';
import Invoice from './Invoice';

// third-party
import * as yup from 'yup';
import ProductsPage from './ProductsPage';
import TotalCard from './TotalCard';
import { useFormik } from 'formik';

// yup validation-schema
const validationSchema = yup.object({
    invoiceNumber: yup.string().required('veuillez entrer le numero de la facture'),
    customerName: yup.string().required('Entrer le nom du client')
});

// ==============================|| CREATE INVOICE ||============================== //

function CreateInvoice() {
    const [open, setOpen] = useState(false);
    const [openInvoice, setOpenInvoice] = useState(false);

    const formik = useFormik({
        initialValues: {
            invoiceNumber: '',
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerAddress: ''
        },
        validationSchema,
        onSubmit: (values) => {
            if (values) {
                setOpen(true);
            }
        }
    });
    // array of products
    const initialProducsData = [
        {
            id: 1,
            product: 'Logo Design',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            unity: 'ml',
            quantity: 6,
            amount: 200.0,
            total: 1200.0
        },
        {
            id: 2,
            product: 'Landing Page',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            unity: 'kg',
            quantity: 7,
            amount: 100.0,
            total: 700.0
        },
        {
            id: 3,
            product: 'Admin Template',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            unity: 'kg',
            quantity: 5,
            amount: 150.0,
            total: 750.0
        }
    ];

    const [allAmounts, setAllAmounts] = useState({
        subTotal: 0,
        appliedTaxValue: 0.1,
        appliedDiscountValue: 0.05,
        taxesAmount: 0,
        discountAmount: 0,
        totalAmount: 0
    });

    const [productsData, setProductsData] = useState(initialProducsData);
    const [valueBasic, setValueBasic] = React.useState(new Date());
    const [addItemClicked, setAddItemClicked] = useState(false);

    // for calculating cost of all orders
    const getTotalAmounts = () => {
        const amounts = {
            subTotal: 0,
            appliedTaxValue: 0.1,
            appliedDiscountValue: 0.05,
            taxesAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        productsData.forEach((item) => {
            amounts.subTotal += item.total;
        });
        amounts.taxesAmount = amounts.subTotal * amounts.appliedTaxValue;
        amounts.discountAmount = (amounts.subTotal + amounts.taxesAmount) * amounts.appliedDiscountValue;
        amounts.totalAmount = amounts.subTotal + amounts.taxesAmount - amounts.discountAmount;
        setAllAmounts(amounts);
    };

    // calculates costs when order-details change
    useEffect(() => {
        getTotalAmounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsData]);

    // to delete row in order details
    const deleteProductHandler = (id) => {
        setProductsData(productsData.filter((item) => item.id !== id));
    };

    // Dialog Handler
    const handleDialogOk = () => {
        setOpen(false);
        formik.resetForm();
    };

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeValue = () => {
        setOpenInvoice(true);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    }
    // add item handler
    const handleAddItem = (addingData) => {
        setProductsData([
            ...productsData,
            {
                id: addingData.id,
                product: addingData.name,
                description: addingData.desc,
                unity: addingData.unity,
                quantity: addingData.selectedQuantity,
                amount: addingData.amount,
                total: addingData.totalAmount
            }
        ]);

        setAddItemClicked(false);
    };

    return (
        <>
            <MainCard title="Créer une facture proforma">
                {openInvoice === false && (
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <InputLabel required>Numéro de la facture</InputLabel>
                                    <TextField
                                        id="invoiceNumber"
                                        name="invoiceNumber"
                                        value={formik.values.invoiceNumber}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                                        helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        placeholder="Invoice #"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <InputLabel required>Nom du client</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="customerName"
                                        name="customerName"
                                        value={formik.values.customerName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                                        helperText={formik.touched.customerName && formik.errors.customerName}
                                        placeholder="Alex Z."
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <InputLabel required>Adresse mail du client</InputLabel>
                                    <TextField
                                        type="email"
                                        fullWidth
                                        id="customerEmail"
                                        name="customerEmail"
                                        value={formik.values.customerEmail}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="alex@ers-sarl.com"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <InputLabel required>Contact du client</InputLabel>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        id="customerPhone"
                                        name="customerPhone"
                                        value={formik.values.customerPhone}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        placeholder="+237 659 19 35 18"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack>
                                    <InputLabel required>Adresse du client</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="customerAddress"
                                        name="customerAddress"
                                        value={formik.values.customerAddress}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        multiline
                                        placeholder="Entrer l'adresse"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack>
                                    <InputLabel required>Date de la facture</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(props) => <TextField fullWidth {...props} />}
                                            value={valueBasic}
                                            onChange={(newValue) => {
                                                setValueBasic(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <ProductsPage productsData={productsData} deleteProductHandler={deleteProductHandler} />

                            {addItemClicked ? (
                                <Grid item xs={12}>
                                    <AddItemPage handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked} />
                                </Grid>
                            ) : (
                                <Grid item>
                                    <Button variant="text" onClick={() => setAddItemClicked(true)}>
                                        + Ajouter un élément
                                    </Button>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <TotalCard productsData={productsData} allAmounts={allAmounts} />

                            <Grid item xs={12}>
                                <Stack>
                                    <InputLabel required>Termes & Conditions :</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="customerAddress"
                                        name="customerAddress"
                                        defaultValue="I acknowledge terms and conditions."
                                        multiline
                                        placeholder="Entrer l'adresse"
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }} xs={12}>
                                <Button variant="contained" onClick={() => setOpenInvoice(true)}>
                                    Prévisualiser
                                </Button>
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
                                <Button variant="contained" type="submit">
                                    Enregistrer la facture
                                </Button>
                            </Grid>
                            <Grid item>
                                <Dialog open={open}>
                                    <DialogContent>
                                        <DialogContentText sx={{ fontWeight: 500, color: `secondary.dark` }}>
                                            Facture créée avec succes
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions sx={{ pr: '20px' }}>
                                        <Button autoFocus variant="contained" onClick={handleDialogOk}>
                                            Ok
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                    </form>
                )}
                {openInvoice === true && (
                    <form>
                        <Invoice handleItem={formik.values} productsData={productsData} allAmounts={allAmounts} getDate={valueBasic} />
                        <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }} xs={12}>
                            <Button variant="contained" onClick={() => setOpenInvoice(false)}>
                                Retour
                            </Button>
                        </Grid>
                    </form>
                )}
            </MainCard>
        </>
    );
}

export default CreateInvoice;
