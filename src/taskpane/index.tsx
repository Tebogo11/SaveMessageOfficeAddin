import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FPCTheme, theme } from "@ikiru/talentis-fpc";
import { ThemeProvider as StyledProvider } from "styled-components";
import { Contacts } from "./components/context";
/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <FPCTheme>
        <StyledProvider {...{ theme }}>
          <ThemeProvider>
            <Contacts>
              <Component title={title} isOfficeInitialized={isOfficeInitialized} />
            </Contacts>
          </ThemeProvider>
        </StyledProvider>
      </FPCTheme>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
