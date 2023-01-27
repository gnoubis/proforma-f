import axios from 'axios';
// material-ui
import {
    Button,
    Grid,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl,
    FormHelperText,
    FormControlLabel
} from '@mui/material';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

// ==============================|| PROFILE 2 - CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [useremail, setUserEmail] = useState();
    const scriptedRef = useScriptRef();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [userProfile, setUserProfile] = useState();
    const userResponse = useRef(userProfile);
    const response = async () => {
        const serviceToken = window.localStorage.getItem('access_token');
        const Response = await axios.post('http://localhost:8000/api/auth/user-profile', { serviceToken });
        setUserEmail(Response.data);
        console.log('user4@', Response);
    };
    useEffect(async () => {
        response();
    }, [useremail]);
    console.log('user4@', useremail);
    return (
        <Formik
            initialValues={{
                new_password: '',
                email: useremail,
                old_password: '',
                password_confirm: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                new_password: Yup.string().max(255).required('renseignez le nouveau mot de passe'),
                old_password: Yup.string().max(255).required('renseignez le mot de passe actuel'),
                password_confirm: Yup.string()
                    .max(255)
                    .required('confirmez le nouveau mot de passe')
                    .oneOf([Yup.ref('new_password'), null], 'les mots de passe ne correspondent pas')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    console.log('reset-password', values);
                    const response = await axios.post('http://localhost:8000/api/auth/reset-password', values);
                } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.old_password && errors.old_password)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-login">Ancien mot de passe</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.old_password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="old_password"
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
                                {touched.old_password && errors.old_password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.old_password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} />
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.new_password && errors.new_password)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-login">Nouveau mot de passe</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.new_password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="new_password"
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
                                {touched.old_password && errors.old_password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.old_password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.password_confirm && errors.password_confirm)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-login">Confirmé nouveau mot de passe</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password_confirm}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="password_confirm"
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
                                {touched.password_confirm && errors.password_confirm && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password_confirm}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="outlined" size="large" type="submit" disabled={isSubmitting}>
                                        Changer le mot de passe
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default ChangePassword;
