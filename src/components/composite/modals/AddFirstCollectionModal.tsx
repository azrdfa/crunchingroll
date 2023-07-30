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
  Anime,
} from "../../../context";

type AddFirstCollectionModalProps = {
  showAddFirstCollectionModal: boolean;
  setShowAddFirstCollectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  animeArr: Anime[];
  successCallback?: () => void;
};

const AddFirstCollectionModal = ({
  showAddFirstCollectionModal,
  setShowAddFirstCollectionModal,
  animeArr,
  successCallback,
}: AddFirstCollectionModalProps) => {
  const { addFirstCollection } = useContext(
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
      show={showAddFirstCollectionModal}
      onClose={() => {
        setShowAddFirstCollectionModal(false);
        onNameInputReset();
      }}
      title="Add First Collection"
      actionButtons={[
        <NegativeButton
          onClick={() => {
            setShowAddFirstCollectionModal(false);
            onNameInputReset();
          }}
        >
          Cancel
        </NegativeButton>,
        <PositiveButton
          onClick={() => {
            const isValid = onNameInputValidate();
            if (isValid) {
              addFirstCollection(nameValue, animeArr);
              setShowAddFirstCollectionModal(false);
              onNameInputReset();
              if (successCallback) {
                successCallback();
              }
            }
          }}
        >
          Save
        </PositiveButton>,
      ]}
      Content={
        <>
          <NormalText>Create your first collection to begin saving</NormalText>
          <SmallSpacerTop>{NameInput}</SmallSpacerTop>
        </>
      }
      maxWidth="480px"
    />
  );
};

export default AddFirstCollectionModal;
