// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Office */
import { Button, Div } from "@ikiru/talentis-fpc";
import React, { useContext } from "react";
import { ContactsContext } from "./context";

const AddNew = () => {
  const { addNew } = useContext(ContactsContext);

  return (
    <Div width="150px" ml="-100px" onClick={addNew}>
      <Button onClick={addNew}>Add New</Button>
    </Div>
  );
};

export default AddNew;
