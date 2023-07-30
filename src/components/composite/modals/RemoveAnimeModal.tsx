import React, { useContext } from "react";
import { Modal, NegativeButton, NormalText, PositiveButton } from "../../basic";
import {
  CollectionContext,
  CollectionContextType,
  Collection,
  Anime,
} from "../../../context";

type RemoveAnimeModalProps = {
  showRemoveAnimeModal: boolean;
  setShowRemoveAnimeModal: React.Dispatch<React.SetStateAction<boolean>>;
  collection: Collection;
  anime: Anime;
};

const RemoveAnimeModal = ({
  showRemoveAnimeModal,
  setShowRemoveAnimeModal,
  collection,
  anime,
}: RemoveAnimeModalProps) => {
  const { removeAnime } = useContext(
    CollectionContext
  ) as CollectionContextType;

  return (
    <Modal
      show={showRemoveAnimeModal}
      onClose={() => setShowRemoveAnimeModal(false)}
      title="Remove Anime"
      actionButtons={[
        <NegativeButton onClick={() => setShowRemoveAnimeModal(false)}>
          No
        </NegativeButton>,
        <PositiveButton
          onClick={() => {
            removeAnime(collection.name, anime.id);
            setShowRemoveAnimeModal(false);
          }}
        >
          Yes
        </PositiveButton>,
      ]}
      Content={
        <NormalText>
          Do you really want remove <b>{anime.title}</b> from{" "}
          <b>{collection.name}</b>?
        </NormalText>
      }
      maxWidth="480px"
    />
  );
};

export default RemoveAnimeModal;
