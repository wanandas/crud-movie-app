import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  padding: 16.5px 39px;
  border: 2px solid #444444;
  color: #444444;
  background-color: #fff;
  text-transform: uppercase;
  transition: 0.3s color ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #444444;
  }
`;
