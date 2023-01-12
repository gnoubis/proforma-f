// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Berry" width="100" />
         *
         */
        <svg width="92" height="32" viewBox="0 0 46.45 18.65" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg">
            <path d="b4841e6c-73ab-4b3b-a2ba-57375f31ab44" />
            <title>inpro3</title>
            <text
                transform="translate(0 13.83) scale(0.95 1)"
                fontSize="16.28"
                fill="#09488f"
                fontFamily="NexaDemo-Bold, Nexa Demo"
                fontWeight="700"
            >
                in-p
                <tspan x="32.32" y="0" letterSpacing="-0.01em">
                    r
                </tspan>
                <tspan x="39.3" y="0">
                    o
                </tspan>
            </text>
        </svg>
    );
};

export default Logo;
