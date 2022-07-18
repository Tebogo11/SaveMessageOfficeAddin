import { Avatar, Badge, Div, Flex, SmallText } from "@ikiru/talentis-fpc";
import React, { useContext, useEffect, useState } from "react";
import { Data, ContactsContext } from "./context";

import { Cards, ContactContainer } from "./styles";

const BirthdayList = () => {
  const { personData, setPageView } = useContext(ContactsContext);
  const [contacts, setContacts] = useState<Data[]>([]);
  useEffect(() => {
    const sortedArray = personData.sort((a, b) => a.name.localeCompare(b.name));

    setContacts(sortedArray);
  }, [personData]);
  return (
    <ContactContainer>
      {contacts.map((person: Data, index: number) => {
        return (
          <Cards key={index} onClick={() => setPageView(person.email)}>
            <Div width="40px" height="40px" mt={-10}>
              <Avatar
                width={20}
                height={20}
                disableHoverOpacity
                photo={{ url: person.photoUrl }}
                {...{ name: person.name }}
              />
            </Div>
            <Flex flexDirection="column" width="60%">
              <SmallText>Name: {person?.name} </SmallText>
              <SmallText>Email : {person?.email}</SmallText>
            </Flex>
            <Badge>{person.messages.length}</Badge>
          </Cards>
        );
      })}
    </ContactContainer>
  );
};

export default BirthdayList;
