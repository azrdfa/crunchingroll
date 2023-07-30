import React, { useContext } from "react";
import { useCollectionNameInput } from "../../../hooks";
import {
  Modal,
  NegativeButton,
  NormalText,
  PositiveButton,
  SmallSpacerTop,
} from "../../basic";
import {
  CollectionContext,
  CollectionContextType,
  Collection,
} from "../../../context";

type EditCollectionModalProps = {
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  collection: Collection;
};

const EditCollectionModal = ({
  showEditModal,
  setShowEditModal,
  collection,
}: EditCollectionModalProps) => {
  const { editCollection } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const {
    value: nameValue,
    input: NameInput,
    onValidate: onNameInputValidate,
    onReset: onNameInputReset,
  } = useCollectionNameInput();

  return (
    <Modal
      show={showEditModal}
      onClose={() => {
        setShowEditModal(false);
        onNameInputReset();
      }}
      title="Edit Collection"
      actionButtons={[
        <NegativeButton
          onClick={() => {
            setShowEditModal(false);
            onNameInputReset();
          }}
        >
          Cancel
        </NegativeButton>,
        <PositiveButton
          onClick={() => {
            const isValid = onNameInputValidate();
            if (isValid) {
              editCollection(collection.name, nameValue);
              setShowEditModal(false);
              onNameInputReset();
            }
          }}
        >
          Save
        </PositiveButton>,
      ]}
      Content={
        <>
          <NormalText>
            You're editing <b>{collection.name}</b>
          </NormalText>
          <SmallSpacerTop>{NameInput}</SmallSpacerTop>
        </>
      }
      maxWidth="480px"
    />
  );
};

export default EditCollectionModal;
