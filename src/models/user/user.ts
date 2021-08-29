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
        const res = yield axios.post(
          `${process.env.REACT_APP_API}/users/login`,
          {
            email,
            password,
          }
        );

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
      } catch (err) {
        console.error(err);
      }
    }),
  }));
