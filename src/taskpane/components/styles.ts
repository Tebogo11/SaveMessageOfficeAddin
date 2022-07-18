import { Div, H3, ArrowIcon } from "@ikiru/talentis-fpc";
import styled from "styled-components";

export const AppContainer = styled(Div)`
  min-width: 250px;
  overflow: hidden;
  height: 760px;
`;
export const Header = styled(H3)`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-left: 20px;
  text-align: center;
`;

export const ContactContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  height: 500px;
`;
export const Cards = styled.div`
  height: 60px;
  width: 80%;
  background: #f2f2f2;
  border-radius: 7px;
  cursor: pointer;
  box-shadow: 0 0 20px 8px #d0d0d0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
`;

export const MessageCards = styled.div`
  min-height: 60px;
  width: 80%;
  background: #f2f2f2;
  border-radius: 7px;
  cursor: pointer;
  box-shadow: 0 0 20px 8px #d0d0d0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
`;

export const BackArrow = styled(ArrowIcon)`
  width: 30px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: -10px;
  transform: rotate(180deg);
  cursor: pointer;
`;

export const SaveFromContainer = styled(Div)`
  padding-left: 30px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const Spacer = styled(Div)`
  width: 100%;
  margin-top: 15px;
`;
