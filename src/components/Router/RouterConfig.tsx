import LandingPage from "../../views/LandingPage/LandingPage"
import { LobbyPage } from "../../views/Lobby/Lobby"
import LoginPage from "../../views/Login/Login"
import { TourRoomPage } from "../../views/TourRoom/TourRoom"

export const RouterConfig: {[key: string]: ()=>JSX.Element} = {
    "/" : ()=> <LoginPage />,
    "/join-bridge" : ()=><LoginPage />,
    "/lobby" : ()=><LobbyPage />,
    "/bridgebase" : ()=> <LandingPage />,
    // "/tour-room" : ()=> <TourRoomPage />
}