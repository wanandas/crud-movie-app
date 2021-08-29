import { Observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { useStore } from "../models/Root";
import { Modal } from "./Modal";

export const DataTable = () => {
  const { MovieStore, User } = useStore();

  React.useEffect(() => {
    if (User.authToken) {
      MovieStore.fetchMovie();
    }
  }, [User.authToken]);

  return (
    <Observer>
      {() => (
        <>
          <TableContainer>
            <table width="100%">
              <thead>
                <tr style={{ alignContent: "center" }}>
                  <th>
                    <h3>Title</h3>
                  </th>
                  <th>
                    <h3>Year Released</h3>
                  </th>
                  <th>
                    <h3>Rating</h3>
                  </th>
                  <th>
                    <h3>button</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {MovieStore.movies?.map((value, index) => {
                  return (
                    <tr
                      key={`${value.title}${index}`}
                      style={{ alignContent: "center" }}
                    >
                      <td>
                        <p>{value.title}</p>
                      </td>
                      <td>
                        <p>{value.yearReleased}</p>
                      </td>
                      <td>
                        <p>{value.rating}</p>
                      </td>

                      <td>
                        <a>
                          <Modal state="edit" />
                        </a>{" "}
                        /{" "}
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={async () => {
                            try {
                              await MovieStore.deleteMovie({
                                movieId: value._id,
                                role: User.info?.role || "3",
                              });
                              MovieStore.fetchMovie();
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableContainer>
        </>
      )}
    </Observer>
  );
};

const TableContainer = styled.div`
  text-align: center;
  width: 100%;
`;
