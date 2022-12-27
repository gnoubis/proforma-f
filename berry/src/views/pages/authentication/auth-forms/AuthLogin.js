import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Stack,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }) => {
    const theme = useTheme();

    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = React.useState(true);
    const success = document.getElementById('success');
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Connectez-vous avec votre adresse e-mail</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    usermail: '',
                    secretpwd: '',
                    checked: false,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    usermail: Yup.string().email('Email non conforme').max(255).required('Email obligatoire'),
                    secretpwd: Yup.string().max(255).required('Le mot de passe est obligatoire')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const resp = await axios.post('http://localhost:8000/api/login-member', values);
                        if (resp?.data?.status === 200) {
                            try {
                                await login(values.usermail, values.secretpwd);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                        if (resp?.data?.status === 500) {
                            success.innerHTML = 'Echec de connexion, email ou mot de passe incorrect';
                            success.style.display = 'block';
                            success.style.color = 'red';
                            success.style.fontWeight = 'bold';
                        }
                        if (resp?.data?.status === 401) {
                            success.innerHTML = 'Votre compte est en attente d activation';
                            success.style.display = 'block';
                            success.style.color = 'green';
                            success.style.fontWeight = 'bold';
                        }
                    } catch (err) {
                        if (!err?.resp) {
                            success.innerHTML = 'Aucune reponse du sereur';
                            success.style.display = 'block';
                            success.style.color = 'red';
                            success.style.fontWeight = 'bold';
                        } else if (err.resp?.status === 500) {
                            success.innerHTML = 'Echec de connexion, email ou mot de passe incorrect';
                            success.style.display = 'block';
                            success.style.color = 'red';
                            success.style.fontWeight = 'bold';
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.usermail && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.usermail}
                                name="usermail"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Adresse mail"
                                inputProps={{}}
                            />
                            {touched.usermail && errors.usermail && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.usermail}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.secretpwd && errors.secretpwd)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.secretpwd}
                                name="secretpwd"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mot de passe"
                                inputProps={{}}
                            />
                            {touched.secretpwd && errors.secretpwd && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.secretpwd}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Se souvenir de moi"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/forgot-password"
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Mot de passe oublié?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Grid item xs={12}>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText id="success"> </FormHelperText>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Connexion
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;
