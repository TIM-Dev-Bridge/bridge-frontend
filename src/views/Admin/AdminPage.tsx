import React from 'react'
import styled from 'styled-components'
import Switch from '../../components/Switch/Switch'
import TextField from '../../components/TextField/TextField'

const AdminPageContainer =()=> {
    return (
        <div>
            <SearchBar />
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableItem img={'kae'} username={'Charles'} status={'Leshair'} usertype={'user'}/>
                </tbody>
            </table>
        </div>
    )
}

const SearchBar =()=> {
    return (
        <SearchBarContainer>
            <div>Search</div>
            <TextField />
            <Switch onCheck={(isCheck)=> console.log(isCheck)}/>
        </SearchBarContainer>
    )
}

interface TableItemProps {
    img: string
    username: string
    status: string
    usertype: string

}

const TableItem =(props: TableItemProps)=> {
    return (
        <tr>
            <td></td>
            <td>{props.username}</td>
            <td>{props.status}</td>
            <td>{props.usertype}</td>
            <td>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div style={{marginLeft: "16px", marginRight: "16px"}}>Add TD</div>
                    <div style={{marginLeft: "16px", marginRight: "16px"}}>Suspend</div>
                    <div style={{marginLeft: "16px", marginRight: "16px"}}>Ban</div>
                </div>
            </td>
        </tr>
    )
}

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    box-sizing: border-box;
    padding-right: 10px;
    justify-content: center;
    align-content: center;
`

export default AdminPageContainer;