import { Observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../models/Root";
import { SelectOption } from "../pages/Login";
import { Button } from "../uikits";

interface Props {
  isActive: boolean;
}

interface IMovie {
  title: string;
  rating: string;
  yearReleased: string;
}

export function Modal({ state, id }: { state: string; id?: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>({
    title: "",
    yearReleased: "",
    rating: "G",
  });

  const { MovieStore } = useStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    return setMovie((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async () => {
    if (movie.title && movie.yearReleased && movie.rating) {
      if (id && state === "edit") {
        try {
          await MovieStore.editMovie({
            id: id,
            title: movie.title,
            yearReleased: movie.yearReleased,
            rating: movie.rating,
          });
          return await MovieStore.fetchMovies();
        } catch (err) {
          console.error(err);
        }
      } else if (state !== "edit") {
        try {
          await MovieStore.createMovie({
            title: movie.title,
            yearReleased: movie.yearReleased,
            rating: movie.rating,
          });
          return await MovieStore.fetchMovies();
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      alert("need input data");
    }
  };

  useEffect(() => {
    (async () => {
      if (id && open) {
        const res = await MovieStore.getMovie(id);
        setMovie({
          title: res.title,
          yearReleased: res.yearReleased,
          rating: res.rating,
        });
      }
    })();
  }, [open]);

  return (
    <Observer>
      {() => {
        return (
          <>
            <ContainAdd>
              {state === "create" ? (
                <CreateBtn onClick={() => setOpen(!open)}>+</CreateBtn>
              ) : (
                <ContainEdit onClick={() => setOpen(!open)}>edit</ContainEdit>
              )}
            </ContainAdd>

            <ModalContainer isActive={open}>
              <ModalContent>
                <CloseBtn onClick={() => setOpen(!open)}>&times;</CloseBtn>
                <div
                  style={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  <h1>{state} Movie</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <TextInputContainer>
                    <TextInputLabel>TITLE :</TextInputLabel>
                    <TextInput
                      placeholder=""
                      required
                      name="title"
                      value={movie?.title}
                      onChange={handleChange}
                    />
                  </TextInputContainer>

                  <TextInputContainer>
                    <TextInputLabel>Year Released :</TextInputLabel>
                    <TextInput
                      type="number"
                      required
                      name="yearReleased"
                      placeholder=""
                      value={movie?.yearReleased}
                      onChange={handleChange}
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    <TextInputLabel>Rating: </TextInputLabel>
                    <SelectOption
                      name="rating"
                      onChange={handleChange}
                      value={movie?.rating}
                    >
                      <option value="G">G</option>
                      <option value="PG">PG</option>
                      <option value="M">M</option>
                      <option value="MA">MA</option>
                      <option value="R">R</option>
                    </SelectOption>
                  </TextInputContainer>
                  <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <Button type="submit">SAVE</Button>
                  </div>
                </form>
              </ModalContent>
            </ModalContainer>
          </>
        );
      }}
    </Observer>
  );
}

const CreateBtn = styled.button`
  border: none;
  cursor: pointer;
  font-weight: 800;
  font-size: 3rem;
  background-color: #ffffff;
  &:hover {
    opacity: 0.5;
  }
`;

const ContainAdd = styled.div`
  display: flex;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ContainEdit = styled.span`
  cursor: pointer;
`;

const TextInputContainer = styled.div`
  display: flex;
  align-items: center;
  &:not(:nth-child(1)) {
    margin-top: 1rem;
  }
`;
const TextInputLabel = styled.label`
  font-weight: 700;
  text-align: start;
  padding-left: 10%;
  width: 30%;
`;

const TextInput = styled.input`
  width: 50%;
  font-size: 14px;
  padding: 10px;
  background: #dfdfdf;
  border: none;
  border-radius: 3px;
`;

const ModalContainer = styled.div<Props>`
  display: ${(props) => (props.isActive ? "unset" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 50% auto; /* 15% from the top and centered */
  padding: 20px;
  border-radius: 0.5rem;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */

  @media (min-width: 768px) {
    margin: 20% auto;
    width: 60%;
  }
  @media (min-width: 1280px) {
    margin: 10% auto;
  }
`;

export const CloseBtn = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
