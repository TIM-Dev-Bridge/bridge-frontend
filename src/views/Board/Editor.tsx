import React, { HTMLAttributes } from 'react'
// import styled from 'styled-components'
// import {v4 as uuid} from 'uuid'
// import {ImBold, ImItalic} from 'react-icons/im'
// import {FaHighlighter} from 'react-icons/fa'


// const numberOfTabs =(text: string)=> {
//     var count = 0;
//     var index = 0;
//     while (text.charAt(index++) === "\t") {
//       count++;
//     }
//     return count;
// }

// const Editor =()=> {
//     const handleFocus =(event: any)=> {
//         console.log(event.target.id)
//         currentInput.current = event.target
//         // var range,
//         // selection;
//         console.log("key",elementRef.current[0].key)
//         var range;
//         if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
//         {
//             range = document.createRange();//Create a range (a range is a like the selection but invisible)
//             range.selectNodeContents(event.target);//Select the entire contents of the element with the range: ;
//             range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
//             selection = window.getSelection();//get the selection object (allows you to change selection)
//             selection?.removeAllRanges();//remove any selections already made
//             selection?.addRange(range);//make the range you have just created the visible selection
//         }
        
//     }
    
//     const focusNext =()=> {
        
//     }

//     const handleSelect =()=> {
//         // var selection = window.getSelection();
//         // var range = selection?.getRangeAt(0)
//         // console.log(selection, range)
//     }

//     interface InputNodeProps extends HTMLAttributes<HTMLElement> {
//         defaultValue?: string
//         defaultMargin?: string
//     }

//     const InputNode =(props: InputNodeProps)=> {
//         return (
//             // <div key={props.id}>
//                 <pre
//                     dangerouslySetInnerHTML={{ __html: props.defaultValue ?? "" }}
//                     key={props.id}
//                     id={props.id}
//                     tabIndex={-1}
//                     onFocus={handleFocus}
//                     suppressContentEditableWarning={true}
//                     style={{textAlign:"left", paddingLeft: "8px", marginLeft: props.defaultMargin == undefined ? "0px" : props.defaultMargin, zIndex: 1}}
//                     contentEditable
//                     onCut={()=> {return false}}
//                     onPaste={()=>{return false}}
//                     onKeyDown={handleKeyDown}
//                     // style="user-drag: none;"
//                     onDragEnter={()=>{return false}}
//                     onDragLeave={()=>{return false}}
//                     onDragOver={()=>{return false}}
//                     onDrop={()=>{return false}}
//                     onSelect={handleSelect}
//                     >

//                 </pre>
//             // </div>
//         )
//     }

//     const initUUID = uuid()
//     const [elementList, updateElementList] = React.useState([<div key={initUUID}><InputNode id={initUUID} key={initUUID}/></div>])
//     const elementRef = React.useRef<JSX.Element[]>([])
//     const currentInput = React.useRef<any>(elementList[0].props.children[0])
//     const nextRef = React.useRef<JSX.Element>()
//     var selection = window.getSelection();
//     React.useEffect(()=> {
//         elementRef.current = elementList
//         const next = document.getElementById(String(nextRef.current?.key))
//         next?.focus()
//         currentInput.current = next
//     },[elementList])

//     const handleKeyDown =(event: any)=> {
//         const value = event.currentTarget.textContent

//         if(event.shiftKey && event.keyCode == 9) { 
//             //shift was down when tab was pressed
//             event.preventDefault()

//             console.log("SHIFT TAB")
//             return
//         }

//         if (event.key == "Tab") {
//             event.preventDefault()
            
//             // var range = sel.getRangeAt(0);
//             // var tabNode = document.createElement('span'); 
//             // tabNode.setAttribute('style', 'white-space:pre'); 
//             // tabNode.innerText = "\t"
//             // range.insertNode(tabNode);
//             // range.setStartAfter(tabNode);
//             // range.setEndAfter(tabNode); 

//             // range = document.createRange();//Create a range (a range is a like the selection but invisible)
//             // range.selectNodeContents(event.target);//Select the entire contents of the element with the range: ;
//             // range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
//             // selection = window.getSelection();//get the selection object (allows you to change selection)
//             // selection?.removeAllRanges();//remove any selections already made
//             // selection?.addRange(range);//make the range you have just created the visible selection


//             var index = 1
//             for (var i = 1; i < elementRef.current.length; i++) {
//                 if (elementRef.current[i].key == currentInput.current.id) {
//                     index = i - 1
//                 }
//             }
//             console.log("INDEX", index)
//             if (index >= 0) {
//                 const prevText = document.getElementById(String(elementRef.current[index].key))?.style.marginLeft
//                 const currentText = event.currentTarget.textContent
//                 // const prevTabs = numberOfTabs(prevText!)
//                 const prevTabs = parseInt(event.currentTarget.style.marginLeft) 
//                 var prevBlockTabs = parseInt(prevText!)
                
//                 if (isNaN(prevTabs) || prevTabs == 0) {
//                     event.currentTarget.style.marginLeft = `50px`
//                     return
//                 }
//                 if (prevTabs < prevBlockTabs  + 50 ) {
//                     console.log(prevBlockTabs, prevTabs)
//                     event.currentTarget.style.marginLeft = `${prevTabs + 50}px`
//                     return
//                 }
//                 console.log("Prev Tabs",prevBlockTabs, prevTabs)
//                 const currentTabs = numberOfTabs(currentText)
//                 if (currentTabs < prevTabs + 1) {
//                     // const prevValue = event.currentTarget.style.marginLeft
                    
//                     // console.log(event.currentTarget.style.marginLeft = `${0 + 50}px`)
//                     // const sel = event.currentTarget.ownerDocument.getSelection()
//                     // var range = sel.getRangeAt(0);
//                     // var currentOffset = range.endOffset
//                     // event.currentTarget.textContent = "\t" + value
//                     // console.log(event.currentTarget.textContent)
//                     // var textNode: Node;
//                     // for( var i = 0; i < document.activeElement!.childNodes.length; i++) {
//                     //     if (document.activeElement!.childNodes[i].nodeType == document.activeElement!.TEXT_NODE) {
//                     //         textNode = document.activeElement!.childNodes[i]
//                     //     }
//                     // }
//                     // range.setStart(textNode!, currentOffset + 1);
//                     // range.setEnd(textNode!, currentOffset + 1); 
//                     // sel.removeAllRanges();
//                     // sel.addRange(range);
//                 }
//             }       

//             return
//         }

//         if (event.key == "Enter") {
//             event.preventDefault()
//             const id = uuid()
//             const currentValue = currentInput.current.textContent
//             if (/\t/.test(currentValue)) {
//                 console.log("HAS TAB", numberOfTabs(currentValue))
//             }
//             // const newElementInitValue =(numberOfTabs: number)=> {
//             //     const tab = "\t"
//             //     var value = ""
//             //     console.log("TBAS", numberOfTabs)
//             //     for (var i = 0; i < numberOfTabs; i++) {
//             //         value += tab
//             //     }
//             //     return value
//             // }
            

            
//             const temp = [...elementRef.current]
        
//             var index = 0
//             for (var i = 0; i < elementRef.current.length; i++) {
//                 if (elementRef.current[i].key == currentInput.current.id) {
//                     index = i
//                 }
//             }

//             console.log("INDEX", elementRef.current, currentInput.current.id)
//             const prevText = document.getElementById(String(elementRef.current[index].key))?.style.marginLeft
//             console.log(prevText)
//             const nextNode = <InputNode id={id} key={id} defaultMargin={prevText}/>
//             const next = <div key={id}>{nextNode}</div>

            
//             temp.splice(index + 1 ,0, next)
//             updateElementList(temp)
//             nextRef.current = nextNode
//             return
//         }

//         if (event.key === "Backspace") {
//             console.log(currentInput.current.id)
//             if (value.length == 0) {
//                 const margin = parseInt(event.currentTarget.style.marginLeft)
//                 if (margin > 0) {
//                     event.currentTarget.style.marginLeft = `${margin - 50}px`;
//                     return
//                 }
//                 var index = 0
//                 let prev
//                 const temp = [...elementRef.current]
//                 for (var i = 0; i < elementRef.current.length; i++) {
//                     if (elementRef.current[i].key == currentInput.current.id) {
//                         index = i
//                         console.log("EQUAL",currentInput.current.id, elementRef.current[i-1].key)
//                         if (i > 0) {
//                             prev = elementRef.current[i-1]
//                         }
//                     }
//                 }
                
//                 temp.splice(index, 1)
//                 updateElementList(temp)
//                 nextRef.current = prev
//             }
//             return
//         }
//     }

//     const TextStyleList =(props: TextStyleProps)=> {
    
//         const setBold =()=> {
//             var selection = window.getSelection()?.getRangeAt(0);
//             var selectedText = selection?.extractContents();
//             if (selectedText != undefined && selection != undefined) {
//                 var span = document.createElement("span");
//                 span.style.fontWeight = "700";
//                 span.appendChild(selectedText);
//                 selection.insertNode(span);
//             }
//         }
    
//         const setItalic =()=> {
//             // var selection = window.getSelection()?.getRangeAt(0);
//             // var selectedText = selection?.extractContents();
//             // if (selectedText != undefined && selection != undefined) {
//             //     var span = document.createElement("span");
//             //     span.style.fontStyle = "italic";
//             //     span.appendChild(selectedText);
//             //     selection.insertNode(span);
//             // }

//             var parent = document.getElementById(currentInput.current.id)?.childNodes
//             parent?.forEach((node)=> {
//                 document.designMode 
//             })
//         }
    
//         const setHeading1 =()=> {
//             const parent = document.getElementById(currentInput.current.id)?.parentElement
//             parent!.style.fontSize = "30px"
//             parent!.style.fontWeight = "700"
//             document.getElementById(currentInput.current.id)?.focus()
//         }
    
//         const setHeading2 =()=> {
//             const parent = document.getElementById(currentInput.current.id)?.parentElement
//             parent!.style.fontSize = "26px"
//             parent!.style.fontWeight = "600"
//             document.getElementById(currentInput.current.id)?.focus()
//         }
    
//         const setHeading3 =()=> {
//             const parent = document.getElementById(currentInput.current.id)?.parentElement
//             parent!.style.fontSize = "24px"
//             parent!.style.fontWeight = "500"
//             document.getElementById(currentInput.current.id)?.focus()
//         }
    
//         const setParagraph =()=> {
//             const parent = document.getElementById(currentInput.current.id)?.parentElement
//             parent!.style.fontSize = "14px"
//             parent!.style.fontWeight = "200"
//             document.getElementById(currentInput.current.id)?.focus()
//         }
    
//         return (
//             <TextStyleContainer>
//                 <button onClick={setBold}><ImBold /></button>
//                 <button onClick={setItalic}><ImItalic /></button>
//                 <button onClick={setHeading1}>Heading1</button>
//                 <button onClick={setHeading2}>Heading2</button>
//                 <button onClick={setHeading3}>Heading3</button>
//                 <button onClick={setParagraph}>Paragraph</button>
//                 {/* <button><ImBold /></button> */}
//                 <button><FaHighlighter /></button>
//             </TextStyleContainer>
//         )
//     }
    
//     return (
//         <Container>
//             <TextStyleList selection={selection!}/>
//             <div>
//             {
//                 elementList    
//             }
//             </div>
//         </Container>
//     )
// }

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
// `

// interface TextStyleProps {
//     selection: Selection
// }



// const TextStyleContainer = styled.div`
//     display: flex;

// `

// export default Editor;