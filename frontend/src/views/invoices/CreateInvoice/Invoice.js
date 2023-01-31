import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';

// table data
const Invoice = ({ handleItem, productsData, allAmounts, getDate }) => {
    const theme = useTheme();
    const componentRef = useRef(null);
    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                <SubCard darkTitle title="Invoice #125863478945" secondary={<Logo />}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">ERS SARL</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">DOUALA, JAPOMA RONT POINT STADE</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">(+237) 659 36 35 19</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={5}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Entreprise :</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">{handleItem.customerName}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">{handleItem.customerAddress}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">{handleItem.customerEmail}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">(+237) {handleItem.customerPhone}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography component={Link} to="#" variant="body2" color="primary">
                                                        {handleItem.customerEmail}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2">Date :</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant="body2"> {getDate} </Typography>
                                                </Grid>
                                                <Grid item xs={8} sx={{ my: 0.5 }}>
                                                    <Chip label="Pending" variant="outlined" size="small" chipcolor="warning" />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2">Order Id :</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant="body2" component={Link} to="#">
                                                        #146859
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table
                                    sx={{
                                        '& tr:last-of-type td': {
                                            borderBottom: 'none'
                                        },
                                        '& thead tr th': {
                                            borderBottom: 'none'
                                        },
                                        '& th:first-of-type, & td:first-of-type': {
                                            pl: { xs: 2.5, md: 5 }
                                        },
                                        '& th:last-of-type, & td:last-of-type': {
                                            pr: { xs: 6.25, md: 8.75 }
                                        }
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ pl: 3 }}>DESIGNATION</TableCell>
                                            <TableCell align="right">QUANTITE</TableCell>
                                            <TableCell align="right">PU</TableCell>
                                            <TableCell align="right" sx={{ pr: 3 }}>
                                                TOTAL
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {productsData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ pl: 3 }}>
                                                    <Typography align="left" variant="subtitle1">
                                                        {row.product}
                                                    </Typography>
                                                    <Typography align="left" variant="body2">
                                                        {row.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right" sx={{ pr: 3 }}>
                                                    {row.total}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard
                                sx={{
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
                                }}
                            >
                                <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Sub Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            {allAmounts.subTotal}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Taxes (19.25%) :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            {allAmounts.taxesAmount}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Reduction (5%) :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            {allAmounts.discountAmount}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            {allAmounts.totalAmount}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Terms and Condition :</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        lorem ipsum dolor sit connecter adieu siccing eliot, sed do elusion tempore incident ut laborer et
                                        dolors magna aliquot.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={10} lg={8}>
                <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    sx={{
                        maxWidth: 850,
                        mx: 'auto',
                        mt: 0,
                        mb: 2.5,
                        '& > .MuiCardContent-root': {
                            py: { xs: 3.75, md: 5.5 },
                            px: { xs: 2.5, md: 5 }
                        }
                    }}
                >
                    <Grid item>
                        <AnimateButton>
                            <ReactToPrint
                                trigger={() => <Button variant="contained">Imprimé</Button>}
                                content={() => componentRef.current}
                            />
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
Invoice.propTypes = {
    handleItem: PropTypes.array,
    productsData: PropTypes.array,
    allAmounts: PropTypes.object,
    getDate: PropTypes.instanceOf(Date)
};
export default Invoice;
