// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Office */

import * as React from "react";
import { Div, Flex, SectionBody, SectionHeader } from "@ikiru/talentis-fpc";
import BirthdayList from "./BirthdayList";
import { AppContainer, BackArrow, Header } from "./styles";
import AddNew from "./AddNew";
import { ContactsContext } from "./context";
import { useContext } from "react";
import MessageView from "./MessageView";
import SaveMessage from "./SaveMessage";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

const App = () => {
  const { pageView, setPageView } = useContext(ContactsContext);
  return (
    <AppContainer>
      <SectionHeader size={"small"} title="Saved Messages" titleProps={{ marginBottom: 0 }} actions={<AddNew />} />
      <SectionBody flexDirection="column" height="820px">
        <Flex flexDirection="column">
          {pageView === "home" && (
            <Div>
              <Header>Contacts</Header>
              <BirthdayList />
            </Div>
          )}
          {pageView !== "home" && pageView !== "saveMessage" && (
            <Div>
              <BackArrow onClick={() => setPageView("home")} />
              <MessageView />
            </Div>
          )}
          {pageView === "saveMessage" && (
            <Div>
              <Header>Save Message</Header>
              <SaveMessage />
            </Div>
          )}
        </Flex>
      </SectionBody>
    </AppContainer>
  );
};

export default App;
