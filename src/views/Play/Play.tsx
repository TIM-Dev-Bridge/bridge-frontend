import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { ConnectTable, useTable } from "../TourRoom/UseTable";
import PlayingPage from "./components/PlayState";

interface PlayPageProps extends HTMLAttributes<HTMLDivElement> {
  tableId: string
  tableDetail?: ConnectTable | undefined
  ref?:  React.RefObject<HTMLDivElement>
}

const PlayPage = (props: PlayPageProps) => {
  const table = useTable()

  React.useEffect(()=> {
    window.getComputedStyle(document.body)
  }, [])

  React.useEffect(()=> {
      if (props.tableDetail != null || props.tableDetail != undefined) {
        console.log("CONNECT TO",  props.tableId, props.tableDetail)
        table.connect(props.tableId, props.tableDetail)
      }
  }, [props.tableDetail])

  return (
    <Container ref={props.ref}>
      <PlayingPage tableDetail={props.tableDetail}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`

export default PlayPage;
