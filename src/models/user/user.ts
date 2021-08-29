import axios from "axios";
import { applyAction, applySnapshot, flow, types } from "mobx-state-tree";

// 1: MANAGER, 2: TEAMLEADER, 3: FLOORSTAFF.
const role = ["MANAGER", "TEAMLEADER", "FLOORSTAFF"];

const UserInfo = types.model("UserInfo", {
  _id: types.string,
  role: types.enumeration(["MANAGER", "TEAMLEADER", "FLOORSTAFF"]),
});

export const User = types
  .model("User", {
    authToken: types.maybe(types.string),
    info: types.maybe(UserInfo),
  })
  .actions((self) => ({
    login: flow(function* login({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      try {
        const res = yield axios.post(`/users/login`, {
          email,
          password,
        });

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            _id: res.data._id,
            role: role[res.data.role - 1],
            authToken: res.data.token,
          })
        );
        self.authToken = res.data.token;
        self.info = { _id: res.data._id, role: role[res.data.role - 1] };
        return res;
      } catch (err) {
        console.error(err);
        alert("wrong email or password");
      }
    }),
    register: flow(function* register({
      email,
      password,
      role,
    }: {
      email: string;
      password: string;
      role: string;
    }) {
      try {
        yield axios.post(`/users/register`, {
          email,
          password,
          role: role,
        });
      } catch (err) {
        console.error(err);
      }
    }),
    logout: () => {
      localStorage.clear();
      applySnapshot(self, {});
      console.log(self);
    },
  }));
