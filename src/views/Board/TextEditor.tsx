import React from 'react'
// import styled from 'styled-components'

// const TextEditor =()=> {
//     const createElement =()=> {
//         var finalDraf = ''
//         const display = documentTest.blocks.map( obj => {
//             switch (obj.type) {
//                 case "header":
//                     const level = obj.data.level
//                     if (level == 1) {
//                         finalDraf += `<h1 contentEditable>${obj.data.text}</h1>`
//                     }
//                     if (level == 2) {
//                         finalDraf += `<h2 contentEditable>${obj.data.text}</h2>`
//                     }
//                     if (level == 3) {
//                         finalDraf += `<h3 contentEditable>${obj.data.text}</h3>`
//                     }
//                     break;
//                 case "paragraph":
//                     finalDraf += `<p contentEditable>${obj.data.text}</p>`
//             }
//         })
//         return <div style={{textAlign: "left"}} dangerouslySetInnerHTML={{__html: finalDraf}}></div>

//     }
//     const Container = styled.div`
//         display: flex;
//         flex-direction: column;
//         align-items: left;
//         align-content: flex-start;
//     `

//     const handleClick =()=> {
//         const selection = window.getSelection()
//         const range = selection?.getRangeAt(0)

//         var containerList: Node[] = []
//         console.log(range?.commonAncestorContainer.parentElement)
//         var currentElement = range?.startContainer.parentElement
//         while (currentElement?.nodeName != "P") {
//             if (currentElement?.parentElement) {
//                 currentElement = currentElement.parentElement
//             }
//         }
//         // console.log(range?.startContainer.nextSibling)
//         var startContainer = range?.startContainer
//         var endContainer = range?.endContainer
//         var endOffset = range?.endOffset
//         var startOffset = range?.startOffset
//         traverseChild(range?.commonAncestorContainer!, containerList)
//         console.log(containerList, range)

//         var found = false

//         var selectedNode: Node[] = []
//         var selectedTextNode: Node[] = []
//         if (containerList.length > 0) {
//             containerList.map( (node, i) => {
//                 if (node == range?.startContainer) {
//                     found = true
//                 }
//                 if (found) {
//                     let currentNode = node.parentNode as HTMLElement
//                     if (node == range?.startContainer) {
//                         const firstPart = currentNode.innerHTML.slice(0, range.startOffset)
//                     }
//                     selectedNode.push(currentNode)
//                     selectedTextNode.push(containerList[i])
//                 }
//                 if (node == range?.endContainer) {
//                     found = false
//                 }
//             })
//         }
//         else {
//             selectedNode.push(range?.commonAncestorContainer!)
//             selectedTextNode.push(range?.commonAncestorContainer!)
//         }



//         var hasStyle : boolean[] = []
//         var containerWithStyle: Node[] = []
//         var temp: Node[] = []
//         //find existing style
//         selectedNode.map( node => {
//             var currentNode = node
//             var found = false
//             while (currentNode && currentNode.nodeName != "P" && !found) {
//                 //change style here==========================>
//                 if (currentNode.nodeName == "I") {
//                     hasStyle.push(true)
//                     containerWithStyle.push(currentNode)
//                     found = true
//                     temp.push(currentNode)
//                 }
//                 if (currentNode.parentNode) {
//                     currentNode = currentNode.parentNode
//                 }
//             }
//             if (!found) {
//                 hasStyle.push(false)
//                 temp.push(currentNode)
//             }
//         })

//         // var shouldUndo = true
//         // hasStyle.map( has => {
//         //     if (!has) { shouldUndo = false }
//         // })
//         // console.log("HAS ", hasStyle)

//         // containerWithStyle.map( node => {
//         //     console.log("NODE _>",node.firstChild)
//         //     if (node.nodeName != "I") {
//         //         return
//         //     }
//         //     if (shouldUndo) {

//         //         console.log("NODE ", node)

//         //         // if (startContainer!.childNodes.length > 1) {
//         //             // if (startOffset! > 0) {
//         //                 // range?.setStart(endContainer!, endOffset!)
//         //                 // range?.setEndAfter(endContainer?.parentNode?.lastChild!)
//         //                 // const node = document.createElement('i')
//         //                 // range?.surroundContents(node)
//         //                 // selection?.removeAllRanges()
//         //                 // selection?.addRange(range!)
//         //             // }
//         //         // }
                

//         //         // while (node.firstChild) {
//         //         //     node.parentNode?.insertBefore(node.firstChild!, node)
//         //         // }
//         //         // node.parentNode?.removeChild(node)
//         //         // selection?.removeAllRanges()
//         //         // range?.setStart(startContainer!,startOffset!)
//         //         // range?.setEnd(endContainer!,endOffset!)

                
//         //         // selection?.addRange(range!)
//         //     }
            
//         // })

//         // if (!shouldUndo) {        
//         //     const wrapNode = document.createElement('i')
//         //     const content = range?.extractContents()
//         //     while(content!.childNodes.length > 0) {
//         //         wrapNode.appendChild(content!.childNodes[0])
//         //     }
//         //     range?.insertNode(wrapNode);
//         // }

//         var shouldUndo = true
//         hasStyle.map( has => {
//             if (!has) { shouldUndo = false }
//         })
//         console.log("has ", hasStyle, temp)
//         hasStyle.map((hasStyled, i)=> {
//             if (hasStyled && shouldUndo) {
//                 console.log("pRev ",selectedTextNode[i].previousSibling, selectedTextNode[i].nextSibling, containerWithStyle[i].nodeName)
//                 if (containerWithStyle[i].nodeName != "I") {
//                     return
//                 }
//                 while (containerWithStyle[i].firstChild) {
//                     containerWithStyle[i].parentNode?.insertBefore(containerWithStyle[i].firstChild!, containerWithStyle[i])
//                 }
//                 containerWithStyle[i].parentNode?.removeChild(containerWithStyle[i])
//                 range?.insertNode(document.createElement('b'))
//             }
//             else {
                
//                 if (!hasStyle[i]) {
                    
//                     if (selectedTextNode[i] == startContainer) {
//                         selection?.removeAllRanges()
//                         range?.setStart(selectedTextNode[i], range.startOffset)
//                         if (startContainer != endContainer) {
//                             range?.setEndAfter(selectedTextNode[i])
//                         }
//                         else {
//                             range?.setEnd(selectedTextNode[i], endOffset!)
//                         }
//                         // selection?.removeAllRanges()
//                         const content = range?.extractContents()
//                         //change style here==========================>
//                         const b = document.createElement('i')
//                         if (content!.childNodes.length > 0) {
//                             while(content!.childNodes.length > 0) {
//                                 b.appendChild(content!.childNodes[0])
//                             }
//                         }
//                         range?.insertNode(b)    
//                     }
//                     else {
                        
//                         selection?.removeAllRanges()
//                         range?.setStart(selectedTextNode[i],0)
                        
//                         if (startContainer != endContainer) {
//                             range?.setEndAfter(selectedTextNode[i])
                            
//                         }
//                         else {
//                             range?.setEnd(selectedTextNode[i], endOffset!)
//                         }
//                         const content = range?.extractContents()
//                         //change style here==========================>
//                         const b = document.createElement('i')
//                         if (content?.childNodes) {
//                             while(content?.childNodes.length > 0) {
//                                 b.appendChild(content.childNodes[0])
//                             }
//                         }
//                         range?.insertNode(b)
//                     }
//                 }
//             }
//         })


//         // var startContainer = range?.startContainer
//         // var endContainer = range?.endContainer
//         // var currentContainer = startContainer
//         // containerList.push(startContainer)
//         // while (currentContainer != endContainer) {
//         //     var entryNode = currentContainer
//         //     var currentNode = currentContainer
//         //     while (currentNode?.nodeName != "#text") {
//         //         if (currentNode?.nextSibling) {
//         //             currentNode = currentNode.nextSibling
//         //         }
//         //     }
//         //     if (currentNode.nodeName != "#text" || currentNode.nodeValue?.length == 0) {
//         //         currentNode = currentNode.parentNode!
//         //     }
//         //     currentContainer = entryNode
//         // }
//         // console.log(range?.startContainer.nextSibling)
//         // console.log(range?.commonAncestorContainer.parentNode?.parentNode)
//         // traverseChild(range?.commonAncestorContainer!)
//         // hasStyle('B', range?.startContainer!, node => {
//         //     while (node.firstChild) {
//         //         node.parentNode?.insertBefore(node.firstChild, node)
//         //         // node.parentNode?.insertBefore(b,node)
//         //     }
//         //     node.parentNode?.removeChild(node)
//         // }) 
//     }

//     // function getTextNode(node : Node) {
//     //     var currentNode = node
//     //     while (currentNode.nodeName != "#text") {
//     //         if (currentNode.childNodes) {
//     //             for( var i = 0; i < currentNode.childNodes.length; i++) {
//     //                 currentNode = 
//     //             }
//     //         }
//     //     }
//     // }
    

//     function traverseChild(node: Node, arr: Node[]) {
//         // console.log("FIRT NODE", node)
//         for(var i = 0; i < node.childNodes.length; i++) {
//             if (node.childNodes.item(i).nodeName == "#text") {
//                 // console.log("NODE", node.childNodes.item(i))
//                 if (node.childNodes.item(i).nodeValue!.length > 0) {
//                     arr.push(node.childNodes.item(i))
//                 }
                
//             }
//             traverseChild(node.childNodes.item(i), arr)
//         }
//         return 
//     }

    

//     function test() {

//     }



//     const hasStyle =(style: string, node: Node, callback: (node: Node)=>void)=> {
//         var currentNode = node
//         while(currentNode.nodeName != style && (currentNode.nodeName != "DIV")) {
//             currentNode = currentNode.parentNode!
//         }
//         if (currentNode.nodeName == style) {
//             callback(currentNode)
//             return true
//         }
//         return false
//     }

//     return (
//         <Container>
//             <button onClick={handleClick}>Heading1</button>
//             <div>
//             {createElement()}
//             </div>
//         </Container>
//     )
// }

// const parseDoc =(doc: any)=> {

// }

// const documentTest = {
//     "blocks" : [
//         {
//             id: "b1",
//             type: "header",
//             data: {
//                 text: "HELLO HEDER1",
//                 level: 1
//             }
//         },
//         {
//             id: "p1df",
//             type: "paragraph",
//             data: {
//                 text: "This is a test <i>of <u>a <b>p</u>a</i>ragr</b>aph",
//             }
//         },
//     ]
// }

// const reducer =(state: any, action: any)=> {
//     if (action.id == "UPDATE_STYLE") {
//         return state.map( (doc: any) => {
//             if (doc.id == action.id) {
//                 if (action.type == "list") {
//                     return {...doc, data: {...doc.data, items: action.items}}
//                 }
//                 return {...doc, data: {...doc.data, text: action.text}};
//             }
//         })
//     }
// }

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     ;
// `

// export default TextEditor;