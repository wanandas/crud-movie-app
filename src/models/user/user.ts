import { flow, types } from "mobx-state-tree";

// 1: MANAGER, 2: TEAMLEADER, 3: FLOORSTAFF.
const UserInfo = types.model("UserInfo", {
  _id: types.identifier,
  role: types.enumeration(["MANAGER", "TEAMLEADER", "FLOORSTAFF"]),
});

export const User = types
  .model("User", {
    authToken: types.maybe(types.string),
    info: types.maybe(UserInfo),
  })
  .actions(() => ({
    login: flow(function* login({
      user,
      password,
    }: {
      user: string;
      password: string;
    }) {
      try {
      } catch {}
    }),
  }));
