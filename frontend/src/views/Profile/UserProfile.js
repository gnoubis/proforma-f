// material-ui
import { Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'utils/axios';
// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState();
    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [usrtype, setUsrtype] = useState();
    const [phone, setPhone] = useState();
    const response = async () => {
        const serviceToken = window.localStorage.getItem('access_token');
        const Response = await axios.post('http://localhost:8000/api/auth/user-profile', { serviceToken });
        setLastname(Response.data.lastname);
        setFirstname(Response.data.firstname);
        setEmail(Response.data.email);
        setUsrtype(Response.data.usrtype);
        setPhone(Response.data.phonenumber);
    };
    useEffect(() => {
        response();
    }, [userProfile, lastname, firstname, email]);
    console.log('user3@', email);
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" sx={{ height: 80, width: 80 }} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                        La taille maximale de l&apos; image doit etre de 125ko.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth value={firstname} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth value={lastname} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth value={email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth value={usrtype} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth value={phone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Site Information" value="www.ers-sarl.com" />
                </Grid>
            </Grid>
        </>
    );
};

export default UserProfile;
