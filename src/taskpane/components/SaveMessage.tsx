/* global Office */
import { Button, Flex, Input, Textarea } from "@ikiru/talentis-fpc";
import React, { useContext, useEffect, useState } from "react";
import { ContactsContext } from "./context";
import { SaveFromContainer, Spacer } from "./styles";

const SaveMessage = () => {
  const { newMessageSave, addNewDataToList, setPageView } = useContext(ContactsContext);
  const [name, setName] = useState<any>(newMessageSave.name);
  const [email, setEmail] = useState<undefined | string>(newMessageSave.email);
  const [subject, setSubject] = useState(newMessageSave.subject);
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    addNewDataToList({ name, email, subject, message });
    setPageView("home");
  };

  useEffect(() => {
    Office.onReady(() => {
      const mailBox = Office.context.mailbox;
      const mailItem = Office.context.mailbox.item;
      if (Office.context.mailbox?.item?.displayReplyForm != undefined) {
        mailItem?.body.getAsync("text", (body) => {
          setMessage(body.value);
        });
      } else {
        mailBox.item?.getSelectedDataAsync(Office.CoercionType.Text, function (asyncResult) {
          if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
            var text = asyncResult.value.data;
            if (text === "") {
              mailBox.item?.body.getAsync("text", (body: any) => {
                setMessage(body.value);
              });
            } else {
              setMessage(text);
            }
          }
        });
      }
    });
  }, []);
  return (
    <SaveFromContainer>
      <Input label="Name" type="text" value={name} name="name" onChange={(e: any) => setName(e.target.value)} />
      <Spacer />
      <Input
        label="Email"
        type="email"
        status="default"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Spacer />
      <Input label="Subject" type="subject" value={subject} onChange={(e: any) => setSubject(e.target.value)} />
      <Spacer />
      <Textarea
        label="Message"
        value={message}
        name="message"
        onChange={(e: any) => setMessage(e.target.value)}
        rows={6}
      />
      <Flex mt="10px" alignItems="center" justifyContent="space-between" width="100% ">
        <Button mode="standard-white" onClick={() => setPageView("home")}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Add</Button>
      </Flex>
    </SaveFromContainer>
  );
};

export default SaveMessage;
