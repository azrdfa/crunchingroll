import React, { useContext, useState } from "react";
import {
  DestructiveNormalText,
  NormalBoldText,
  NormalBoldWhiteText,
} from "../components";
import {
  Collection,
  CollectionContext,
  CollectionContextType,
} from "../context";
import styled from "@emotion/styled";

const useCollectionItemInput = (limit: number) => {
  const [value, setValue] = useState<Collection[]>([]);
  const [validity, setValidity] = useState({ valid: false, reason: "" });
  const { collectionArr } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const onValidate = () => {
    if (value.length === 0) {
      setValidity({
        valid: false,
        reason: "Required minimum 1 collection",
      });
      return false;
    } else {
      setValidity({ valid: true, reason: "" });
      return true;
    }
  };

  const onReset = () => {
    setValue([]);
    setValidity({ valid: false, reason: "" });
  };

  const onClick = (collection: Collection) => {
    return (event: React.MouseEvent) => {
      const isExists = Boolean(
        value.find((elem) => elem.name === collection.name)
      );
      if (isExists) {
        setValue(value.filter((elem) => elem.name !== collection.name));
      } else if (limit === value.length) {
        value.pop();
        setValue([...value, collection]);
      } else {
        setValue([...value, collection]);
      }
    };
  };

  const ContainerCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  const Item = styled.div<{ isSelected: boolean }>`
    background-color: "white";
    border-radius: 5px;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    padding: 16px;

    width: ${({ isSelected }) => (isSelected ? "100%" : "70%")};
    background: ${({ isSelected }) =>
      isSelected ? "linear-gradient(90deg, white 70%, #AF4CAB 30%)" : "white"};

    &:hover {
      cursor: pointer;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
    }

    position: relative;
  `;

  const input = (
    <ContainerCol>
      {collectionArr.map((collection) => {
        const isSelected = Boolean(
          value.find((elem) => elem.name === collection.name)
        );

        return (
          <Item isSelected={isSelected} onClick={onClick(collection)}>
            <NormalBoldText>{collection.name}</NormalBoldText>
            {isSelected && (
              <NormalBoldWhiteText
                style={{
                  float: "right",
                  position: "absolute",
                  left: "calc(75%)",
                  bottom: "30%",
                }}
              >
                Selected!
              </NormalBoldWhiteText>
            )}
          </Item>
        );
      })}
      {validity.reason && (
        <ul>
          <li>
            <DestructiveNormalText>{validity.reason}</DestructiveNormalText>
          </li>
        </ul>
      )}
    </ContainerCol>
  );
  return { value, input, onValidate, onReset };
};

export default useCollectionItemInput;
