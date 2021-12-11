import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { useAuthen } from '../../Authen';
import { PrimaryButton, PrimarySqButton } from '../../components/Button/Button';
import { useForm } from '../../components/Form/FormHooks';
import DateSelector from '../../components/Selector/DateSelector';
import Selector from '../../components/Selector/Selector';
import { TitleText } from '../../components/Text/Text';
import TextField from '../../components/TextField/TextField';
import { useLobby } from '../../Service/SocketService';
import { validator } from '../Login/components/Validate';
import useEditTour from './useEditTour';

interface DialogProps {
    isVisible: boolean
    onDismiss: ()=>void
    tourName?: string
}

const CreateTourPopup =(props: DialogProps)=> {
    const [responseValid, updateResponseValid] = React.useState(true)
    const [responseMessage, updateResponseMessage] = React.useState('')
    const { createTour } = useLobby()
    const authen = useAuthen()
    const form = {
        title: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        // description: (text: string, fieldName: string)=> {
        //     validator(text)
        //         .isEmpty()
        // },
        date: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        time: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        movement: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        scoring: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        boardToPlay: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        minuteBoard: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        boardRound: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
    }
    const tourForm = useForm(form);
    const {viewModel, tourData, updateTourWith
        } = useEditTour(props.tourName ?? "", (success, reason)=> {
            if (success) {
                props.onDismiss()
            }
            else {
                updateResponseValid(false)
            }
        })

    const [scrollHeight, setScrollHeight] = React.useState(0)
    
    React.useEffect(()=> {
        if (!props.isVisible) {
            (document.querySelector(`input[name='title']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='description']`) as HTMLInputElement).value = '';
            // (document.querySelector(`select[name='date]`) as HTMLInputElement).value = '';
            // (document.querySelector(`select[name='time']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='boardToPlay']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='minuteBoard']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='boardRound']`) as HTMLInputElement).value = '';
        }
    },[props.isVisible])

    React.useEffect(()=> {

    }, [viewModel])

    return (
        <PopupContainer
            id="popup-background-outside"
            isVisible={props.isVisible}
            onClick={(e)=> {
                if ((e.target as HTMLElement).id == "popup-background-outside") {
                    props.onDismiss()
                }
            }}>
            <Container>
                <div className="flex flex-col gap-4">
                    <Section title="Tournament Info">
                        <TextField 
                            data-testid="popup-title"
                            name="title" 
                            defaultValue={viewModel?.tour_name}
                            key={'title'}
                            warningMessage={ 
                                responseValid ? 
                                tourForm.isValid['title'].message : responseMessage
                            } 
                            placeholder="Tournament Title"
                            isValid={tourForm.isValid['title'].isValid && responseValid}
                            warningVisible={props.isVisible}
                            />
                        <TextField 
                            data-testid="popup-description"
                            disabled
                            // defaultValue={tourData?.tour_name ?? ''}
                            key={'description'}
                            name="description" 
                            placeholder="Description"
                            // warningMessage={tourForm.isValid['description'].message} 
                            isValid={true}
                            warningVisible={props.isVisible}
                            />
                    </Section>
                    <Section title="Directors" >
                        <h1>{authen.authen.username}</h1>
                    </Section>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Section title="Start Time">
                            <DateSelector key='date' type="Date" name="date" defaultValue={viewModel?.date_start} testid="popup-date"/>
                            <DateSelector key='time' type="Time" name="time" defaultValue={viewModel?.time_start} testid="popup-time"/>
                        </Section>
                        <div className="flex">
                            <Section title="Movement">
                                <Selector key='movement' name="movement" defaultValue="Pairs" testid="popup-movement">
                                    <option value="Pairs">Pairs</option>
                                </Selector>
                            </Section>
                            <Section title="Scoring">
                                <Selector key='scoring' name="scoring" defaultValue={viewModel?.scoring} testid="popup-scoring">
                                    <option value="MP">Match Points</option>
                                    <option value="IMP">International Match Points</option>
                                </Selector>
                            </Section>
                        </div>
                    </div>
                    <div style={{display: "felx", minHeight: "100px"}}>
                        <Section title="Spectator">
                            <Selector disabled>
                                
                            </Selector>
                        </Section>
                        {/* <Section title="Chat">
                            <Selector >
                                
                            </Selector>
                        </Section> */}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Section title="Board">
                        <TextField 
                            data-testid="popup-board_to_play"
                            type="number"
                            min="1"
                            key='board_to_play'
                            defaultValue={viewModel?.board_to_play ?? ''}
                            name="boardToPlay" 
                            placeholder="Board To Play"
                            warningMessage={tourForm.isValid['boardToPlay'].message} 
                            isValid={tourForm.isValid['boardToPlay'].isValid}
                            warningVisible={props.isVisible}
                            />
                        <TextField 
                            data-testid="popup-minute_board"
                            type="number"
                            min="6"
                            key='minute_board'
                            defaultValue={viewModel?.minute_board ?? ''}
                            name="minuteBoard" 
                            placeholder="Minute Per Board"
                            warningMessage={tourForm.isValid['minuteBoard'].message} 
                            isValid={tourForm.isValid['minuteBoard'].isValid}
                            warningVisible={props.isVisible}
                            />
                        <TextField 
                            data-testid="popup-board_round"
                            type="number"
                            min="1"
                            key='board_round' 
                            defaultValue={viewModel?.board_round ?? ''}
                            name="boardRound" 
                            placeholder="Board Per Round"
                            warningMessage={tourForm.isValid['boardRound'].message} 
                            isValid={tourForm.isValid['boardRound'].isValid}
                            warningVisible={props.isVisible}
                            />
                    </Section>
                    <AltSection title="Deals">
                        <Selector disabled >
                                
                        </Selector>
                        <BottomDiv>
                            {
                                (props.tourName == "" || props.tourName == undefined) ? 
                                    <PrimaryButton onClick={()=> {
                                        tourForm.handleSubmit((isValid, value)=> {
                                            if (isValid) {
                                                createTour(authen.authen.username, value, (success, reason) => {
                                                    console.log(success, reason)
                                                    if (success) {
                                                        console.log(success, reason)
                                                        props.onDismiss()
                                                    }
                                                })
                                            }
                                        })                                        
                                    }}>Create Tour</PrimaryButton> :
                                <PrimaryButton onClick={()=> {
                                    tourForm.handleSubmit((isValid, value)=> {
                                        console.log((document.querySelector(`input[name='title']`) as HTMLInputElement).value)
                                        if (isValid) {
                                            updateTourWith(value)
                                                .then( response => {
                                                    console.log(response)
                                                    props.onDismiss()
                                                })
                                                .catch( error =>{
                                                    console.log(error)
                                                })
                                        }
                                    })
                                }}>Update Tour</PrimaryButton>
                            }

                        </BottomDiv>
                    </AltSection>
                </div>
            </Container>
        </PopupContainer>
    )
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
    title?: string
}

const Section =(props: SectionProps)=> {
    return (
        <div className="flex flex-col w-full relative h-full">
            <TitleText>{props.title ?? "Title"}</TitleText>
            {props.children}
            <div style={{width: "90%", height: "1px", backgroundColor: "lightgrey", margin: "0 auto"}}></div>
        </div>
    )
}

const AltSection =(props: SectionProps)=> {
    return (
        <BottomSection>
            <TitleText>{props.title ?? "Title"}</TitleText>
            {props.children}
            <div style={{width: "90%", height: "1px", backgroundColor: "lightgrey", margin: "0 auto",position: "absolute", bottom: "0"}}></div>
        </BottomSection>
    )
}

const PopupContainer = styled.div<{isVisible: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    visibility: ${props => props.isVisible ? "visible" : "hidden"};
`
//flex justify-center items-center w-screen h-screen bg-opacity-25 bg-black fixed top-0 left-0 ${props.isVisible ? "visible" : "hidden"}

const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
`

const BottomDiv = styled.div`
    position: absolute;
    bottom: 10px;
    width: 100%;
`

const Container = styled.div`
    display: flex;
    gap: 10px;
    /* display: grid; */
    /* grid-template: repeat(auto-fit, minmax(200, 1fr)) /  repeat(auto-fit, minmax(200, 1fr)); */
    background-color: white;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 16px;
`

export default CreateTourPopup;