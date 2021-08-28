import React from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from "../models/Root";

function Display() {
  const { MovieStore } = useStore();

  return (
    <Observer>
      {() => (
        <>
          {MovieStore.movies.map((x) => {
            return <h1 key={x._id}>{x.title}</h1>;
          })}
        </>
      )}
    </Observer>
  );
}

export default Display;
