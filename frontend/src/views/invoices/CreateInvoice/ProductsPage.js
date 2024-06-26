import PropTypes from 'prop-types';

// material-ui
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// ==============================|| PRODUCTS-DATA PAGE ||============================== //

function ProductsPage({ productsData, deleteProductHandler }) {
    return (
        <>
            {productsData.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Description</TableCell>
                                    <TableCell align="right">Unité</TableCell>
                                    <TableCell align="right">Quantité</TableCell>
                                    <TableCell align="right">Prix Unitaire</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ pl: 4 }}>
                                            <Typography align="left" variant="subtitle1">
                                                {row.product}
                                            </Typography>
                                            <Typography align="left" variant="body2">
                                                {row.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">{row.unity}</TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                        <TableCell align="right">{row.amount}FCFA</TableCell>
                                        <TableCell align="right">{row.total}FCFA</TableCell>
                                        <TableCell sx={{ pr: 1 }} align="right">
                                            <IconButton color="error" size="small" onClick={() => deleteProductHandler(row.id)}>
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ) : null}
        </>
    );
}

ProductsPage.propTypes = {
    productsData: PropTypes.array,
    deleteProductHandler: PropTypes.func
};

export default ProductsPage;
