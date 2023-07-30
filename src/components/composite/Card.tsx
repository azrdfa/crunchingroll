import styled from "@emotion/styled";
import React from "react";
import {
  SmallPadder,
  MediumSpacer,
  NormalBoldWhiteText,
  NormalBoldText,
} from "../basic";

type CardProps = {
  thumbnailURL: string;
  title: string;
  actionButtons?: React.ReactNode[];
  onClick: () => void;
  dominantColor?: string;
  selected?: boolean;
};

const Card = (props: CardProps) => {
  const Container = styled.div`
    flex-basis: 216px;
    align-items: center;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
    border-radius: 5px;

    @media (max-width: 768px) {
      /* Styles inside the media query */
      flex-basis: 100%;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
    }
  `;

  const ImgContainer = styled.img`
    border-radius: 5px 5px 0 0;
    min-width: 216px;
    max-height: 200px;
    object-fit: cover;

    @media (max-width: 768px) {
      /* Styles inside the media query */
      width: 100%;
      height: 200px;
    }
  `;

  const ActionButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 16px;
    gap: 8px;
  `;

  const SelectedFlag = styled(SmallPadder)`
    background-color: #af4cab;
    border-radius: 0px 0px 5px 5px;
  `;

  const constructTitle = (title: string) => {
    if (title.length > 50) {
      return title.substring(0, 51) + "...";
    }
    return title;
  };

  return (
    <Container
      onClick={props.onClick}
      style={
        {
          // backgroundColor: "#D7A3D5",
        }
      }
    >
      <ImgContainer src={props.thumbnailURL} alt="thumbnail" />
      <MediumSpacer>
        <div style={{ height: "50px" }}>
          <NormalBoldText>{constructTitle(props.title)}</NormalBoldText>
        </div>
        {props.actionButtons && (
          <ActionButtonsContainer>
            {props.actionButtons.map((elem) => elem)}
          </ActionButtonsContainer>
        )}
      </MediumSpacer>
      {props.selected && (
        <SelectedFlag>
          <NormalBoldWhiteText>Selected!</NormalBoldWhiteText>
        </SelectedFlag>
      )}
    </Container>
  );
};

export default Card;
