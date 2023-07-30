import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Heading } from "./Text";

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const animatetop = keyframes`
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: ${animatetop};
  animation-duration: 0.4s;
  border-radius: 5px;
`;

const CloseButton = styled.span`
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  cursor: pointer;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: 0.3s;
  &:hover,
  &:focus {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const ModalHeader = styled.div`
  padding: 16px;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px 5px 0px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 16px;
  color: white;
  border-radius: 0px 0px 5px 5px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  actionButtons: React.ReactNode[];
  Content: React.ReactNode;
  maxWidth: string;
};

const Modal = (props: ModalProps) => {
  return (
    <ModalContainer isOpen={props.show}>
      <ModalContent style={{ maxWidth: props.maxWidth }}>
        <ModalHeader>
          <Heading>{props.title}</Heading>
          <CloseButton onClick={props.onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{props.Content}</ModalBody>
        <ModalFooter>{props.actionButtons.map((elem) => elem)}</ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
