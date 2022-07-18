/* global Office */
import { Button, Flex, SmallText, Loader } from "@ikiru/talentis-fpc";
import React, { useContext, useEffect, useState } from "react";
import { ContactsContext } from "./context";
import { ContactContainer, Header, MessageCards } from "./styles";

const MessageView = () => {
  const { personData, pageView } = useContext(ContactsContext);
  const [messages, setMessages] = useState<Record<string, string | undefined>[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const personInfo = personData.find((person) => person.email === pageView);
    setMessages(personInfo?.messages);
  }, []);

  const loadMessage = (message: string) => {
    setIsLoading(true);
    Office.onReady(() => {
      Office.context.mailbox.item?.body.getAsync("text", (body) => {
        const newBody = body.value + " " + message;
        Office.context.mailbox.item?.body.setAsync(newBody, { coercionType: Office.CoercionType.Text }, () =>
          setIsLoading(false)
        );
      });
    });
  };
  return (
    <ContactContainer>
      <Header>Messages</Header>
      {messages?.map((person: Record<string, string | undefined>, index: number) => {
        const subject = Object.keys(person)[0];
        const message = Object.values(person)[0];
        return (
          // eslint-disable-next-line no-undef
          <MessageCards key={index} onClick={() => console.log("asking for message")}>
            <Flex flexDirection="column" width="60%">
              <h4>Subject: {subject} </h4>
              <SmallText>{message}</SmallText>
            </Flex>
            {isLoading ? <Loader /> : <Button onClick={() => loadMessage(message || "")}>Load Message</Button>}
          </MessageCards>
        );
      })}
    </ContactContainer>
  );
};

export default MessageView;
