import React from "react";
import styled from "styled-components";


const PlayArea: React.FC = () => {
  return (
    <Container>
      <BlackOverlay />

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
`

const BlackOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
`

export default PlayArea;
