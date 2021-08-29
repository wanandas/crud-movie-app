import React, { useState } from "react";
import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { LockIcon, UserIcon } from "../icon";
import { useStore } from "../models/Root";
import { Box, Button } from "../uikits";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const { User } = useStore();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const hisory = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    return setUser((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = () => {
    User.login({ email: user.email, password: user.password });
    hisory.push("/display");
  };

  React.useEffect(() => {
    if (User.authToken) {
      hisory.push("/");
    }
  }, []);

  return (
    <LoginPageContainer>
      <Observer>
        {() => {
          return (
            <form onSubmit={handleSubmit}>
              <LoginContain>
                <Box>
                  <Label htmlFor="username">
                    <UserIcon size="lg" />
                  </Label>
                  <TextInput
                    type="email"
                    name="email"
                    value={user.email}
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
                    value={user.password}
                    onChange={handleChange}
                  />
                </Box>
                <Box style={{ marginTop: "1rem" }}>
                  <Button
                    type="button"
                    style={{ fontWeight: 600 }}
                    onClick={() => handleSubmit()}
                  >
                    Login
                  </Button>
                </Box>
              </LoginContain>
            </form>
          );
        }}
      </Observer>
    </LoginPageContainer>
  );
};

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
  gap: 1rem;
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
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;
