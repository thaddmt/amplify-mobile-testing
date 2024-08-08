import React from 'react';
import {
    ThemeProvider,
    Grid,
    Card,
    defaultDarkModeOverride,
    Authenticator,
} from '@aws-amplify/ui-react';
import type { Theme, ColorMode } from '@aws-amplify/ui-react';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import '@aws-amplify/ui-react/styles.css';

import '../style.css';
import NavBar from './NavBar';

export default function Layout({ children }) {
    const colorScheme = useColorScheme();
    const [colorMode, setColorMode] = React.useState<ColorMode>('system');
    const [navOpen, toggleNavOpen] = React.useState(false);

    const theme: Theme = {
        name: 'liveness-theme',
        overrides: [defaultDarkModeOverride],
    };

    return (
        <MantineProvider theme={{ colorScheme: colorMode === 'system' ? colorScheme : colorMode }}>
            <ThemeProvider theme={theme} colorMode={colorMode}>
                <Authenticator hideSignUp={true} variation="modal">
                    {({ signOut }) => (
                        <Grid height="100%" templateRows="auto 1fr">
                            <NavBar
                                navOpen={navOpen}
                                handleNav={() => toggleNavOpen(!navOpen)}
                                colorMode={colorMode}
                                setColorMode={setColorMode}
                                signOut={signOut}
                            ></NavBar>
                            <Card>{children}</Card>
                        </Grid>
                    )}
                </Authenticator>
            </ThemeProvider>
        </MantineProvider>
    );
}
