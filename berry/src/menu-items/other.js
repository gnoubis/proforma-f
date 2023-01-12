// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconMail,
    IconDashboard,
    IconFileInvoice,
    IconUser,
    IconUserPlus,
    IconCalendar,
    IconReportMoney,
    IconFolder,
    IconListCheck,
    IconFileInfo
} from '@tabler/icons';
// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconMail,
    IconDashboard,
    IconFileInvoice,
    IconUser,
    IconUserPlus,
    IconCalendar,
    IconReportMoney,
    IconFolder,
    IconListCheck,
    IconFileInfo
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'Tableau de board',
            title: <FormattedMessage id="Tableau de board" />,
            type: 'item',
            url: '/sample-page',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'Créer Facture proforma',
            title: <FormattedMessage id="Créer Facture proforma" />,
            type: 'item',
            url: '/invoices',
            icon: icons.IconFileInvoice,
            external: false,
            target: false
        },
        {
            id: 'Créer Facture simple',
            title: <FormattedMessage id="Créer Facture simple" />,
            type: 'item',
            url: '/invoices-simple',
            icon: icons.IconFileInfo,
            external: false,
            target: false
        },
        {
            id: 'Créer bulletin de paie',
            title: <FormattedMessage id="Créer bulletin de paie" />,
            type: 'item',
            url: '/payslip',
            icon: icons.IconReportMoney,
            external: false,
            target: false
        },
        {
            id: 'Planifier un rendez-vous',
            title: <FormattedMessage id="Planifier un rendez-vous" />,
            type: 'item',
            url: '/agenda',
            icon: icons.IconCalendar,
            external: false,
            target: false
        },
        {
            id: 'Taches a faire',
            title: <FormattedMessage id="Taches a faire" />,
            type: 'item',
            url: '/',
            icon: icons.IconListCheck,
            external: false,
            target: false
        },
        {
            id: 'Envoyer un email',
            title: <FormattedMessage id="Envoyer un email" />,
            type: 'item',
            url: '/send-mail',
            icon: icons.IconMail,
            external: false,
            target: false
        },
        {
            id: 'Enregistrer les factures',
            title: <FormattedMessage id="Enregistrer les factures" />,
            type: 'item',
            url: 'invoices-save',
            icon: icons.IconFolder,
            external: false,
            target: false
        },
        {
            id: 'Créer un utilisateur',
            title: <FormattedMessage id="Créer un utilisateur" />,
            type: 'item',
            url: '/register',
            icon: icons.IconUserPlus,
            external: false,
            target: false
        },
        {
            id: 'Afficher les utilisateurs',
            title: <FormattedMessage id="Afficher les utilisateurs" />,
            type: 'item',
            url: 'user-list',
            icon: icons.IconUser,
            external: false,
            target: false
        }
    ]
};

export default other;
