import { useContext, useState } from "react";
import { Input } from "../components";
import { CollectionContext, CollectionContextType } from "../context";

const useCollectionNameInput = () => {
  const [value, setValue] = useState("");
  const [validity, setValidity] = useState({ valid: false, reason: "" });
  const { collectionArr } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const onValidate = () => {
    function hasSpecialCharacter(str: string): boolean {
      const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
      return specialCharacterRegex.test(str);
    }

    function findSameName(str: string): boolean {
      return Boolean(collectionArr.find((elem) => elem.name === str));
    }

    const isSpecialCharacterExist = hasSpecialCharacter(value);
    const isNotUnique = findSameName(value);

    if (isSpecialCharacterExist) {
      setValidity({
        valid: false,
        reason: "Name can't have special character",
      });
      return false;
    } else if (isNotUnique) {
      setValidity({ valid: false, reason: "Name has to be unique" });
      return false;
    } else {
      setValidity({ valid: true, reason: "" });
      return true;
    }
  };

  const onReset = () => {
    setValue("");
    setValidity({ valid: false, reason: "" });
  };

  const input = (
    <Input
      value={value}
      label={"Name:"}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      errorMessage={validity.reason}
    />
  );
  return { value, input, onValidate, onReset };
};

export default useCollectionNameInput;
