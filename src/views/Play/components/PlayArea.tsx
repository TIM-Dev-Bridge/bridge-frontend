import React from "react";
import styled from "styled-components";
import TablePopup from './TablePopup'

interface IPlayAreaProps {
  selectedPopup : string | null,
  setSelectedPopup: Function,
}

const PlayArea: React.FC<IPlayAreaProps> = (props: IPlayAreaProps) => {

  return (
    <Container>
      <TablePopup selectedPopup={props.selectedPopup} setSelectedPopup={props.setSelectedPopup}/>
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #0c6b3f;
`;

export default PlayArea;
