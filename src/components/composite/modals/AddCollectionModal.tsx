import React, { useContext } from "react";
import { useCollectionNameInput } from "../../../hooks";
import { Modal, NegativeButton, PositiveButton } from "../../basic";
import {
  CollectionContext,
  CollectionContextType,
  Collection,
} from "../../../context";

type AddCollectionModalProps = {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCollectionModal = ({
  showAddModal,
  setShowAddModal,
}: AddCollectionModalProps) => {
  const { addCollection } = useContext(
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
      show={showAddModal}
      onClose={() => {
        setShowAddModal(false);
        onNameInputReset();
      }}
      title="Add Collection"
      actionButtons={[
        <NegativeButton
          onClick={() => {
            setShowAddModal(false);
            onNameInputReset();
          }}
        >
          Cancel
        </NegativeButton>,
        <PositiveButton
          onClick={() => {
            const isValid = onNameInputValidate();
            if (isValid) {
              const newCollection: Collection = {
                name: nameValue,
                animeList: [],
              };
              addCollection(newCollection);
              setShowAddModal(false);
              onNameInputReset();
            }
          }}
        >
          Save
        </PositiveButton>,
      ]}
      Content={NameInput}
      maxWidth="480px"
    />
  );
};

export default AddCollectionModal;
