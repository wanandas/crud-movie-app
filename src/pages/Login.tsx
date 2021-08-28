import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import { LockIcon, UserIcon } from "../icon";
import { useStore } from "../models/Root";
import { Box, Button } from "../uikits";

export const LoginPage = observer(() => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { User } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    return setUser((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <LoginPageContainer>
      <form onSubmit={() => console.log(user)}>
        <LoginContain>
          <Box>
            <Label htmlFor="username">
              <UserIcon size="lg" />
            </Label>
            <TextInput
              name="username"
              required
              value={user.username}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Label htmlFor="password">
              <LockIcon size="lg" />
            </Label>
            <TextInput
              name="password"
              type="password"
              required
              value={user.password}
              onChange={handleChange}
            />
          </Box>
          <Box style={{ marginTop: "1rem" }}>
            <Button type="button" style={{ fontWeight: 600 }}>
              Login
            </Button>
          </Box>
        </LoginContain>
      </form>
    </LoginPageContainer>
  );
});

export default LoginPage;

const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const LoginContain = styled(Box)`
  background-color: #fff;
  border: 2px solid #000000;
  box-shadow: 3px 6px 12px rgba(0, 0, 0, 0.5);
  gap: 0.5rem;
  flex-direction: column;
  padding: 2rem 1rem;
  border-radius: 0.25rem;
`;

const Label = styled.label`
  margin-right: 1rem;
  text-transform: uppercase;
`;

const TextInput = styled.input`
  height: 2rem;
  font-size: 18px;
  padding: 0 1rem;
  border-radius: 0.25rem;
`;
