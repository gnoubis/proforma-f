import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NoEncryption } from '@mui/icons-material';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const success = document.getElementById('success');
    const firtName = document.getElementById('outlined-adornment-firstname-register');

    const allstatus = [
        {
            value: 'individual',
            label: 'Particulier'
        },
        {
            value: 'company',
            label: 'Entreprise'
        }
    ];
    const [usrstatus, setUserStatus] = useState('individual');

    // const handleChange1 = (e) => {
    //     setUserStatus(e.target.value);
    // };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [commercialname, setCommercialName] = useState('');

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    return (
        <>
            <Formik
                initialValues={{
                    usertype: usrstatus,
                    firstname: '',
                    lastname: '',
                    useremail: '',
                    password: '',
                    companyname: '',
                    commercialname: '',
                    checked: false,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    lastname: Yup.string()
                        .min(2, '2 charactères minimum')
                        .max(100, '100 charactères maximum')
                        .required('Le champs le Nom est obligatoire'),
                    firstname: Yup.string()
                        .min(2, '2 charactères minimum')
                        .max(100, '100 charactères maximum')
                        .required('Le champs le prénom est obligatoire'),
                    useremail: Yup.string().email('Email fourni non conforme').max(255).required('Le champs Email est obligatoire'),
                    password: Yup.string().max(50, '50 charactères maximum').required('Le mot de passe est obligatoire'),
                    checked: Yup.bool().oneOf([true], "L'acceptation des conditions d'utilisation est obligatoire")
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const resp = await axios.post('http://localhost:8000/api/add-member', values);
                        console.log(values);
                        if (resp.data.status === 200) {
                            console.log(resp.data.message);
                            success.innerHTML = 'Votre compte a été enregistré avec succès, vérifier votre boite mail';
                            success.style.display = 'block';
                            success.style.color = 'green';
                            success.style.fontWeight = 'bold';
                        }
                    } catch (err) {
                        if (!err?.resp) {
                            success.innerHTML = 'Adresse déja prise, veillez utiliser une autre adresse!';
                            success.style.display = 'block';
                            success.style.color = 'red';
                            success.style.fontWeight = 'bold';
                        }
                    }
                }}
            >
                {({ success, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="outlined-select-usertype"
                                    select
                                    fullWidth
                                    label="Votre statut"
                                    value={usrstatus}
                                    name="usertype"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setUserStatus(e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                >
                                    {allstatus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-adornment-firstname-register"
                                    label="Prénom"
                                    margin="normal"
                                    name="firstname"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.firstname && errors.firstname && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.firstname}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-adornment-lastname-register"
                                    label="Nom"
                                    margin="normal"
                                    name="lastname"
                                    type="text"
                                    defaultValue=""
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.lastname && errors.lastname && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.lastname}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.useremail && errors.useremail)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-register">Adresse Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.useremail}
                                defaultValue="bonjour"
                                name="useremail"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.useremail && errors.useremail && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.useremail}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Mot de passe</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
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
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
                        {usrstatus === 'company' && (
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nom Société"
                                        margin="normal"
                                        name="companyname"
                                        type="text"
                                        defaultValue=""
                                        value={values.companyname}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setCompanyName(e.target.value);
                                        }}
                                        sx={{ ...theme.typography.customInput }}
                                    />
                                    {touched.companyname && errors.companyname && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.companyname}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                        {usrstatus === 'individual' && (
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nom Commercial"
                                        margin="normal"
                                        name="commercialname"
                                        type="text"
                                        defaultValue=""
                                        value={values.commercialname}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setCommercialName(e.target.value);
                                        }}
                                        sx={{ ...theme.typography.customInput }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    fullWidth
                                    error={Boolean(touched.checked && errors.checked)}
                                    sx={{ ...theme.typography.customInput }}
                                    control={
                                        <Checkbox
                                            id="outlined-adornment-acceptedterms-register"
                                            checked={checked}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setChecked(e.target.checked);
                                            }}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            J&apos;accepte les &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Conditions générales d&apos;utilisation.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                                {touched.checked && errors.checked && (
                                    <FormHelperText error id="outlined-adornment-acceptedterms-register">
                                        {errors.checked}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
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
                                    Créer un compte
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
