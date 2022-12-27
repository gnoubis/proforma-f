import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

/* login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication2/Login2')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication2/Register2')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication2/ForgotPassword2')));
*/
const AuthLogin2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/Login2')));
const AuthRegister2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/Register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/ForgotPassword2')));
const AuthCheckMail2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/CheckMail2')));
const ConfirmationAccount = Loadable(lazy(() => import('views/pages/authentication/authentication2/ConfirmationAccount')));
const Dashboard = Loadable(lazy(() => import('views/sample-page/index')));
const AuthResetPassword2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/ResetPassword2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/CodeVerification2')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin2 />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/register',
            element: <AuthRegister2 />
        },
        {
            path: '/forgot-password',
            element: <AuthForgotPassword2 />
        },
        {
            path: '/CheckMail',
            element: <AuthCheckMail2 />
        },
        {
            path: '/confirmation-account',
            element: <ConfirmationAccount />
        },
        {
            path: '/reset-password',
            element: <AuthResetPassword2 />
        }
    ]
};

export default LoginRoutes;
