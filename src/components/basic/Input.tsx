import React from "react";
import styled from "@emotion/styled";
import { DestructiveNormalText } from "./Text";

const InputContainer = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid red;
  border-radius: 4px;
`;

type InputProps = {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage: string;
};

const Input = (props: InputProps) => {
  return (
    <div>
      <label htmlFor="fname">{props.label}</label>
      <InputContainer
        value={props.value}
        type={props.type}
        id="fname"
        name="fname"
        onChange={props.onChange}
      />
      {props.errorMessage && (
        <ul>
          <li>
            <DestructiveNormalText>{props.errorMessage}</DestructiveNormalText>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Input;
