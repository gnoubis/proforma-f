import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page/index')));
const InvoicesSave = Loadable(lazy(() => import('views/invoices-save/index')));
const InvoicesSimple = Loadable(lazy(() => import('views/invoices-simple/index')));
const Payslip = Loadable(lazy(() => import('views/payslip/index')));
const AuthRegister2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/Register2')));
const CreateUser = Loadable(lazy(() => import('views/createUser/index')));
const SendMail = Loadable(lazy(() => import('views/send-mail/index')));
const UserList = Loadable(lazy(() => import('views/User-list/index')));
const Invoices = Loadable(lazy(() => import('views/invoices/CreateInvoice/index')));
const Agenda = Loadable(lazy(() => import('views/agenda/calendar/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/invoices',
            element: <Invoices />
        },
        {
            path: '/register',
            element: <AuthRegister2 />
        },
        {
            path: '/user-list',
            element: <UserList />
        },
        {
            path: '/create-user',
            element: <CreateUser />
        },
        {
            path: '/invoices-save',
            element: <InvoicesSave />
        },
        {
            path: '/invoices-simple',
            element: <InvoicesSimple />
        },
        {
            path: '/send-mail',
            element: <SendMail />
        },
        {
            path: '/payslip',
            element: <Payslip />
        },
        {
            path: '/agenda',
            element: <Agenda />
        }
    ]
};

export default MainRoutes;
