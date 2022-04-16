import UserManagementPage from "../../views/Admin/userManagementPage"
import AdminBoardEditor from "../../views/Board/AdminBoardEditor"
import BoardPage from "../../views/Board/Board"
import PostPage from "../../views/Board/PostPage"
import LandingPage from "../../views/LandingPage/LandingPage"
import { LobbyPage } from "../../views/Lobby/Lobby"
import LoginPage from "../../views/Login/Login"
import { TourRoomPage } from "../../views/TourRoom/TourRoom"
import EditUserProfile from "../../views/UserProfile/EdiUserProfile"

export const RouterConfig: {[key: string]: ()=>JSX.Element} = {
    "/" : ()=> <LoginPage />,
    "/join-bridge" : ()=><LoginPage />,
    "/lobby" : ()=><LobbyPage />,
    "/bridgebase" : ()=> <LandingPage />,
    "/board": ()=> <BoardPage />,
    "/post": ()=> <PostPage />,
    "/admin-board": ()=> <AdminBoardEditor />,
    "/edit-information" : ()=> <EditUserProfile />,
    "/user-manage" : ()=> <UserManagementPage />
    // "/tour-room" : ()=> <TourRoomPage tourName={""} />
} 