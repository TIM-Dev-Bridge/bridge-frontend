import React from 'react'
import styled from 'styled-components'
import { useAuthen } from '../../Authen';
import { PrimaryButton, SecondaryButton } from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField'
import { api } from '../../Service/ApiService';
import { useProfile } from '../UserProfile/ProfileContext';
// import TextEditor from './TextEditor'
import { EDITOR_JS_TOOLS } from "./Constant";
const editorJS = require('react-editor-js')

interface AdminBoardEditorProps {
    editId?: string
    editData?: any
}

const AdminBoardEditor =(props: AdminBoardEditorProps)=> {
    const profile = useProfile()
    const authen = useAuthen()
    const [title, updateTitle] = React.useState('')
    const [creator, updateCreator] = React.useState('')
    const titleRef = React.useRef('')
    const ReactEditorJS = editorJS.createReactEditorJS()
    const [defaultData, updateDefultData] = React.useState<any>()
    const defaultDataRef = React.useRef()
    const [isEdit, setIsEdit] = React.useState(false)
    const [id, setID] = React.useState('')
    const idRef = React.useRef('')

    React.useEffect(()=> {
        titleRef.current = title
    }, [title])

    React.useEffect(()=> {
        idRef.current = id
    }, [id])

    const handleChange =(e: any)=> {
        updateTitle(e.target.value)
    }

    const handleInitialize = React.useCallback((instance) => {
        editorJS.current = instance
      }, [])
      
    const handleSave = React.useCallback(async () => {
        const savedData = await editorJS.current.save();
        const data = {
            creator: authen.authen.username,
            title: titleRef.current,
            data: savedData
        }
        api.addAnnouncement(data)
            .then( response => {
                if (response.status == 200) {
                    window.history.back()
                }
            })
    }, [])

    const handleUpdate = React.useCallback(async () => {
        const savedData = await editorJS.current.save();
        const data = {
            id: idRef.current,
            title: titleRef.current,
            data: savedData
        }
        api.updateAnnouncement(data)
            .then( response => {
                if (response.status == 200) {
                    window.history.back()
                }
            })
    }, [])

    React.useEffect(()=> {
        defaultDataRef.current = defaultData
    }, [defaultData])

    React.useEffect(()=> {
        if (window.history.state == undefined || window.history.state == null) { return }
        if (window.history.state.state.editData) {
            setIsEdit(true)
            const block = window.history.state.state.editData
            const title = window.history.state.state.title
            const creator = window.history.state.state.creator
            const id = window.history.state.state.id
            editorJS.current.isReady
                .then(()=> {
                    console.log(block)
                    editorJS.current.render(block)
                    updateTitle(title)
                    updateCreator(block.creator)
                    setID(id)
                })
        }
    }, [])
      
    return (
        <EditorContainer>
            <div style={{display: "flex", justifyContent: "start", marginBottom: "15px", height: "32px"}}>
                <SecondaryButton style={{width: "150px"}}
                    onClick={()=> { window.history.back() }}
                    >
                    Cancel
                </SecondaryButton>
            </div>
            <TextField placeholder="Title" onChange={handleChange} defaultValue={title}/>
            {/* <TextField placeholder="Description"/> */}
            <div style={{backgroundColor: "rgba(243,244,246,1)", borderRadius: "15px", marginBottom: "15px"}}>
            <ReactEditorJS 
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                // readOnly={profile.profile.access == '' ? false : true}
                style={{width: "100%",  textAlign: "left", minHeight: "90%"}}/>
            {/* <TextEditor /> */}
            </div>
            <div style={{display: "flex", justifyContent: "end"}}>
                
                {
                    isEdit ?
                    <PrimaryButton style={{width: "120px"}}
                        onClick={()=> {
                            handleUpdate()
                        }}
                        >
                        Update
                    </PrimaryButton> :
                    <PrimaryButton style={{width: "100px"}}
                        onClick={()=> {
                            handleSave()
                        }}
                        >
                        Post
                    </PrimaryButton>
                }
                
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
`

const ReactEditorContainer = styled.div`
    display: flex;
    width: 100%;
`

export default AdminBoardEditor;