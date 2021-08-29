import React from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from "../models/Root";
import { getParent } from "mobx-state-tree";

function Display() {
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
          {MovieStore.movies.map((x) => {
            return (
              <h1 key={x._id}>
                {x.title}
                {x.rating}
                {x.yearReleased}
              </h1>
            );
          })}
        </>
      )}
    </Observer>
  );
}

export default Display;
