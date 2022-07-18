/* global Office */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export type Data = {
  name: string;
  email: string;
  photoUrl: string;
  messages: Record<string, string | undefined>[];
};

type newMessageData = {
  name: string | undefined;
  email: string | undefined;
  subject: string;
  message?: string;
};

type contextType = {
  personData: Data[];
  setPageView: (data: string) => void;
  pageView: string;
  addNew: () => void;
  newMessageSave: newMessageData;
  setNewMessageSave: (data: newMessageData) => void;
  addNewDataToList: (data: newMessageData) => void;
};
export const ContactsContext = createContext<contextType>({
  personData: [],
  setPageView: () => {},
  pageView: "home",
  addNew: () => {},
  newMessageSave: { name: "", email: "", subject: "", message: "" },
  setNewMessageSave: () => {},
  addNewDataToList: () => {},
});

export const Contacts = ({ children }: any) => {
  const [personData, setPersonData] = useState<Data[]>([]);
  const [pageView, setPageView] = useState("home");
  const [newMessageSave, setNewMessageSave] = useState<newMessageData>({
    name: "",
    email: "",
    subject: "",
  });

  useEffect(() => {
    if (!(personData.length > 0)) {
      axios
        .get(`https://dummyapi.io/data/v1/user`, {
          headers: {
            "app-id": "62cef06294f234500b3254c0",
          },
        })
        .then((res: any) => {
          const persons: any = res.data.data!;
          persons?.map((person: any) => {
            axios
              .get(`https://dummyapi.io/data/v1/user/${person?.id}`, {
                headers: {
                  "app-id": "62cef06294f234500b3254c0",
                },
              })
              .then((person: any) => {
                const name = person.data.firstName + " " + person.data.lastName;
                const email = person.data.email;
                const photoUrl = person.data.picutre;
                const messages = [{ test: "This is a test message" }, { test: "Another text email" }];
                const newPerson: Data = { name: name, email, photoUrl, messages };
                setPersonData((personData) => [...personData, newPerson]);
              });
          });
        });
    }
  }, []);

  const getDataFromRead = () => {
    Office.onReady(() => {
      const mailItem = Office.context.mailbox.item;
      const getMessageData = () => {
        const email = mailItem?.from.emailAddress;
        const name = mailItem?.from.displayName;
        const subject = mailItem?.subject || "unknown";
        setNewMessageSave({ name, email, subject });
      };

      getMessageData();
      Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, getMessageData);
    });
  };

  const getDataFromCompose = () => {
    Office.onReady(() => {
      const mailBox = Office.context.mailbox;
      const email = mailBox?.userProfile.emailAddress;
      const name = mailBox?.userProfile.displayName;
      const subject = mailBox.item?.subject || "unknown";
      setNewMessageSave({ name, email, subject });
    });
  };
  const addNew = () => {
    setPageView("saveMessage");
    Office.onReady(() => {
      if (Office.context.mailbox?.item?.displayReplyForm != undefined) {
        getDataFromRead();
      } else {
        // compose mode
        getDataFromCompose();
      }
    });
  };

  const addNewDataToList = (newData: newMessageData) => {
    const newMessage = [{ [newData.subject]: newData.message }];
    const checkIfContactExist = personData.find((contact: Data) => contact.email === newData.email);
    if (!checkIfContactExist) {
      const newPerson: Data = {
        name: newData.name || "",
        email: newData.email || "",
        photoUrl: "",
        messages: newMessage,
      };
      setPersonData((personData) => [...personData, newPerson]);
    } else {
      const updatedPersonData = personData.map((contact) => {
        if (contact.email === newData.email) {
          contact.messages = contact.messages.concat(newMessage);
          return contact;
        }
        return contact;
      });
      setPersonData(updatedPersonData);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        personData,
        pageView,
        setPageView,
        addNew,
        newMessageSave,
        setNewMessageSave,
        addNewDataToList,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
