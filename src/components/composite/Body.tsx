import React from "react";
import { LargeSpacer } from "../basic";

type BodyProps = {
  children: React.ReactNode;
};

const Body = (props: BodyProps) => {
  return (
    <LargeSpacer
      style={{
        flexGrow: 1,
        position: "relative",
        width: '80%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {props.children}
    </LargeSpacer>
  );
};

export default Body;
