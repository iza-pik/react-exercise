import { Fragment } from "react";
import { Table } from "../components/Table/Table";
import { Container, GlobalStyle } from "./App.styles";

export const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <Table />
      </Container>
    </Fragment>
  );
};
