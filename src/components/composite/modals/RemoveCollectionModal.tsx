import React, { useContext } from "react";
import { Modal, NegativeButton, NormalText, PositiveButton } from "../../basic";
import {
  CollectionContext,
  CollectionContextType,
  Collection,
} from "../../../context";

type RemoveCollectionModalProps = {
  showRemoveModal: boolean;
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
  collection: Collection;
};

const AddCollectionModal = ({
  showRemoveModal,
  setShowRemoveModal,
  collection,
}: RemoveCollectionModalProps) => {
  const { removeCollection } = useContext(
    CollectionContext
  ) as CollectionContextType;

  return (
    <Modal
      show={showRemoveModal}
      onClose={() => setShowRemoveModal(false)}
      title="Remove Collection"
      actionButtons={[
        <NegativeButton onClick={() => setShowRemoveModal(false)}>
          No
        </NegativeButton>,
        <PositiveButton
          onClick={() => {
            removeCollection(collection.name);
            setShowRemoveModal(false);
          }}
        >
          Yes
        </PositiveButton>,
      ]}
      Content={
        <NormalText>
          Do you really want remove <b>{collection.name}</b>?
        </NormalText>
      }
      maxWidth="480px"
    />
  );
};

export default AddCollectionModal;
