import React from 'react'
import styled from 'styled-components'
import { useAuthen } from '../../Authen';
import { PrimaryButton, SecondaryButton } from '../../components/Button/Button';
import { navigate, useNavigator } from '../../components/Router/Router';
import TextField from '../../components/TextField/TextField'
import { api } from '../../Service/ApiService';
import { useProfile } from '../UserProfile/ProfileContext';
import { EDITOR_JS_TOOLS } from "./Constant";
const editorJS = require('react-editor-js')

const PostPage = () => {
    const profile = useProfile()
    const authen = useAuthen()
    const navContext = useNavigator()
    const [defaultData, updateDefultData] = React.useState<any>()
    const [date, setDate] = React.useState('')
    const [creator, setCreator] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [id, setID] = React.useState('')
    const defaultDataRef = React.useRef()
    const ReactEditorJS = editorJS.createReactEditorJS()
    const mountedRef = React.useRef(false)
    var d = new Date(0);

    const handleInitialize = React.useCallback(async (instance) => {
        editorJS.current = instance
    }, [])

    React.useEffect(() => {
        // const blockdata = window.history.state.state.post.data
        // const newData = {
        //     blocks: blockdata.blocks,
        //     time: blockdata.time,
        //     version: blockdata.version
        // }
        // console.log()
        // editorJS.current.save()
        // updateDefultData(newData)   
        // handleLoad()
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id')
        setID(id ?? '')

    }, [])

    React.useEffect(() => {
        defaultDataRef.current = defaultData
        // editorJS.current.isReady
        //     .then(()=> {
        //         console.log(editorJS.current)

        //         api.getAnnouncement(id ?? '')
        //             .then( response => {
        //                 updateDefultData(response.data.data)
        //                 editorJS.current.clear()
        //                 editorJS.current.render(response.data.data)
        //             })
        //             .catch( response => {

        //         })  

        //         // d = new Date(defaultData)
        //         // setDate('date : ' + d.toLocaleDateString()+ ' ' + d.toLocaleTimeString())
        //         // setTitle(window.history.state.state.post.title)
        //         // setCreator('creator : ' + window.history.state.state.post.creator)
        //     })
    }, [defaultData])


    React.useEffect(() => {
        editorJS.current.isReady
            .then(() => {
                // editorJS.current.render(defaultDataRef.current)
                const searchParams = new URLSearchParams(window.location.search);
                const id = searchParams.get('id')
                setID(id ?? '')
                api.getAnnouncement(id ?? '')
                    .then(response => {
                        // console.log(window.history.state.post.data)
                        // if (window.history.state) {
                        //     d = new Date(window.history.state.state.post.data.time)
                        //     setDate('date : ' + d.toLocaleDateString()+ ' ' + d.toLocaleTimeString())
                        //     setTitle(window.history.state.state.post.title)
                        //     setCreator('creator : ' + window.history.state.state.post.creator)
                        //     editorJS.current.clear()
                        //     editorJS.current.render(window.history.state.post.data)
                        //     return
                        // }
                        // console.log("RESPONSE", response)
                        updateDefultData(response.data.data)
                        editorJS.current.clear()
                        editorJS.current.render(response.data.data)
                        d = new Date(response.data.data.time)
                        setDate('date : ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString())
                        setTitle(response.data.title)
                        setCreator(response.data.creator)
                        // console.log(response.data.creator == authen.authen.username)
                    })
                    .catch(response => {

                    })
            })
    }, [])

    return (
        <EditorContainer>
            {
                creator == authen.authen.username ? 
                <p
                    style={{ width: '100%', textAlign: "right" }}
                    onClick={() => {
                        navigate(navContext, '/admin-board', { editData: defaultDataRef.current, title: title, creator: creator, id: id })
                    }}
                    >
                    Edit
                </p> : <></>
            }

            <h1 style={{ fontSize: "30px", margin: "0 auto", width: "650px" }}>{title}</h1>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "end" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 100, margin: "0 auto", width: "650px" }}>'creator : {creator}</h3>
                <h3 style={{ fontSize: "15px", fontWeight: 100, margin: "0 auto", width: "650px" }}>{date}</h3>
            </div>
            <div style={{ borderRadius: "15px", marginBottom: "15px" }}>
                <ReactEditorJS
                    // defaultValue={window.history.state.state.post.data}
                    onInitialize={handleInitialize}
                    tools={EDITOR_JS_TOOLS}
                    readOnly={true}
                    style={{ width: "100%", textAlign: "left", minHeight: "90%" }} />
                {/* <TextEditor /> */}
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
            </div>
        </EditorContainer>
    )
}


const Container = styled.div`
    height: 80%;
    min-width: 720px;
`

const EditorContainer = styled.div`
    /* min-height: 80vh; */
    width: 80%;
    min-width: 560px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
    box-shadow: var(--app-shadow);
    display: flex;
    flex-direction: column;
    background-color: white;
    text-align: left;
    border-radius: 16px;
    margin-top: 10px;
    padding-bottom: 20px;
    margin-bottom: 10px;
`

const ReactEditorContainer = styled.div`
    display: flex;
    width: 100%;
`

export default PostPage;