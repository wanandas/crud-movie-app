import React from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from "../models/Root";
import { getParent } from "mobx-state-tree";
import { DataTable } from "../Component/DataTable";
import { Box } from "../uikits";
import styled from "styled-components";
import { Modal } from "../Component/Modal";
import { useHistory } from "react-router-dom";

function Display() {
  const { MovieStore, User } = useStore();
  const hisory = useHistory();

  React.useEffect(() => {
    if (User.authToken) {
      MovieStore.fetchMovies();
    }
  }, [User.authToken]);

  return (
    <DisplayContainer>
      <h1>Movie Detail</h1>
      <LogoutContain>
        <p
          onClick={() => {
            User.logout();
            hisory.push("/login");
          }}
          style={{ cursor: "pointer" }}
        >
          log out{" "}
        </p>
      </LogoutContain>
      <DataTable />
      <Modal state="create" />
    </DisplayContainer>
  );
}

const DisplayContainer = styled(Box)`
  padding: 0 0 5%;
  position: relative;
  flex-direction: column;
  margin: 10% auto;
  width: 100%;
  background-color: #fff;
  box-shadow: 3px 6px 12px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const LogoutContain = styled.div`
  position: absolute;
  top: 0;
  right: 2%;
  text-transform: uppercase;
  font-size: 8px;
`;

export default Display;
