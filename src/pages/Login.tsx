import React, { useState } from "react";
import { Observer } from "mobx-react-lite";
import styled from "styled-components";
import { LockIcon, UserIcon } from "../icon";
import { useStore } from "../models/Root";
import { Box, Button } from "../uikits";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const { User } = useStore();
  const [user, setUser] = useState<{
    email: string;
    password: string;
    role: string;
  }>({
    email: "",
    password: "",
    role: "1",
  });
  const [mode, setMode] = useState("login");

  const hisory = useHistory();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    return setUser((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async () => {
    if (mode === "login") {
      try {
        await User.login({
          email: user.email,
          password: user.password,
        });
        if (User.authToken) hisory.push("/display");
      } catch (err) {
        alert(err.message);
      }
    }
    if (mode === "register") {
      try {
        await User.register({
          email: user.email,
          password: user.password,
          role: user.role,
        });
        await User.login({ email: user.email, password: user.password });
        if (User.authToken) hisory.push("/display");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  React.useEffect(() => {
    if (User.authToken) {
      hisory.push("/");
    }
  }, [user, User]);

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

                {mode === "register" && (
                  <Box>
                    <Label htmlFor="role">role</Label>
                    <SelectOption name="role" onChange={handleChange}>
                      <option value="1">MANAGER</option>
                      <option value="2">TEAMLEADER</option>
                      <option value="3">FLOORSTAFF</option>
                    </SelectOption>
                  </Box>
                )}
                <Box style={{ marginTop: "1rem" }}>
                  <Button
                    type="button"
                    style={{ fontWeight: 600 }}
                    onClick={() => handleSubmit()}
                  >
                    {mode === "login" ? "login" : "register"}
                  </Button>
                </Box>
                <SwitchMode
                  onClick={() => {
                    mode === "login" ? setMode("register") : setMode("login");
                  }}
                >
                  {mode === "login" ? "register" : "login"}
                </SwitchMode>
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

const SwitchMode = styled.a`
  font-size: 12px;
  color: #444444;
  text-decoration: none;
  cursor: pointer;
  position: absolute;
  bottom: 5%;
  text-transform: uppercase;
  right: 5%;
`;

export const SelectOption = styled.select`
  height: 3rem;
  display: flex;
  font-size: 18px;
  padding: 0 1rem;
  border: 2px solid #000000;
  border-radius: 0.25rem;
`;

const LoginContain = styled(Box)`
  position: relative;
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
