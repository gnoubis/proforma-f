import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper2 from '../AuthWrapper2';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthRegister from '../auth-forms/AuthRegister';
import BackgroundPattern2 from 'ui-component/cards/BackgroundPattern2';
import AuthSlider from 'ui-component/cards/AuthSlider';

// assets
import imgMain from 'assets/images/auth/img-a2-signup.svg';
import logoPicstudio from 'assets/images/auth/logoPicstudio.svg';

// carousel items
const items = [
    {
        title: 'Power of React with Material UI',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Power of React with Material UI',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Power of React with Material UI',
        description: 'Powerful and easy to use multipurpose theme'
    }
];

// ===============================|| AUTH2 - REGISTER ||=============================== //

const Register = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <AuthWrapper2>
            <Grid container justifyContent={matchDownSM ? 'center' : 'space-between'} alignItems="center">
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern2>
                        <Grid item container justifyContent="center">
                            <Grid item xs={12}>
                                <img
                                    alt="Auth method"
                                    src={imgMain}
                                    style={{
                                        maxWidth: '100%',
                                        margin: '0 auto',
                                        display: 'block',
                                        width: 300
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </BackgroundPattern2>
                </Grid>
                <Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
                    <Grid
                        sx={{ minHeight: '100vh' }}
                        container
                        alignItems={matchDownSM ? 'center' : 'flex-start'}
                        justifyContent={matchDownSM ? 'center' : 'space-between'}
                    >
                        <Grid item sx={{ display: { xs: 'none', md: 'block' }, m: 3 }}>
                            <Link to="/register">
                                <img
                                    alt="Auth method"
                                    src={logoPicstudio}
                                    style={{
                                        margin: '0 auto',
                                        display: 'block',
                                        width: 150
                                    }}
                                />
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' } }}
                        >
                            <Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
                                <Box component={Link} to="#" sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <Logo />
                                </Box>
                                <AuthCardWrapper border={matchDownMD}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12}>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography
                                                    color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    Création de compte
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    fontSize="16px"
                                                    textAlign={matchDownSM ? 'center' : 'inherit'}
                                                >
                                                    Afin de vous proposer la meilleure expérience, précisez votre statut actuel
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthRegister />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={Link}
                                                    to="/login"
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Vous possédez déjà un compte?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper2>
    );
};

export default Register;
