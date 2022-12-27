import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, Grid, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch } from 'store';
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const success = document.getElementById('success');
    const { resetPassword } = useAuth();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                const resp = await axios.post('http://localhost:8000/api/passwordforget', values);
                if (resp.data.status === 200) {
                    console.log(resp.data.message);
                    success.innerHTML = 'Vérifier votre boite mail pour confirmer le mot de passe';
                    success.style.display = 'block';
                    success.style.color = 'green';
                    success.style.fontWeight = 'bold';
                    navigate('/CheckMail', { replace: true });
                }
                if (resp.data.status === 401) {
                    console.log(resp.data.message);
                    success.innerHTML = 'Adresse mail introuvable';
                    success.style.display = 'block';
                    success.style.color = 'red';
                    success.style.fontWeight = 'bold';
                }
                if (resp.data.status === 500) {
                    console.log(resp.data.message);
                    success.innerHTML = 'le mail n a pas été envoyé, veillez réessayé!';
                    success.style.display = 'block';
                    success.style.color = 'red';
                    success.style.fontWeight = 'bold';
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-forgot">Votre adresse mail</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Adresse Email"
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                Envoyer un Mail
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthForgotPassword;
