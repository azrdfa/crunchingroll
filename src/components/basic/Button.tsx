import styled from "@emotion/styled";

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  padding: 8px 16px;

  border: none;
  border-radius: 5px;

  text-align: center;
  text-decoration: none;

  transition-duration: 0.4s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  }

  font-family: "Arial", sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: white;

  &:disabled {
    background-color: #cccccc;
    color: #666666;
  }
`;

export const PositiveButton = styled(Button)`
  background-color: #4caf50 /* Green */;
`;

export const IconPositiveButton = styled(PositiveButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px !important;
`;

export const CircularPositiveButton = styled(PositiveButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

export const NegativeButton = styled(Button)`
  background-color: #f44336 /* Red */;
`;

export const IconNegativeButton = styled(NegativeButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px !important;
`;

export const NeutralButton = styled(Button)`
  background-color: #e7e7e7 /* Gray */;
  color: black;
`;

export const IconNeutralButton = styled(NeutralButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px !important;
`;
