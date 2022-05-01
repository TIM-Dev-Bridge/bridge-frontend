import { motion } from 'framer-motion';
import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { useAuthen } from '../../Authen';
import { PrimaryButton, PrimarySqButton } from '../../components/Button/Button';
import { useForm } from '../../components/Form/FormHooks';
import DateSelector from '../../components/Selector/DateSelector';
import Selector from '../../components/Selector/Selector';
import { TitleText } from '../../components/Text/Text';
import TextField from '../../components/TextField/TextField';
import { socket, useLobby } from '../../Service/SocketService';
import { validator } from '../Login/components/Validate';
import useEditTour from './useEditTour';
import { v4 as uuidv4 } from 'uuid'
import { TourData } from './TourRequest';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/Animate/loading.json'
import failedAnimation from '../../assets/Animate/fail.json'
import successAnimation from '../../assets/Animate/success.json'
import { navigate, useNavigator } from '../../components/Router/Router';


interface DialogProps  {
    isVisible: boolean
    onDismiss: ()=>void
    tourName?: string
    initial?: {}
    animate?: {}
    exit?: {}
    mode: string
}

const CreateTourPopup =(props: DialogProps)=> {
    const navigateContent = useNavigator()
    const [responseValid, updateResponseValid] = React.useState(true)
    const [responseMessage, updateResponseMessage] = React.useState('')
    const { createTour } = useLobby()
    const authen = useAuthen()
    const [key, setKey] = React.useState(uuidv4())
    const [displayFailed, setDisplayFailed] = React.useState(false)
    const [displaySuccess, setDisplaySuccess] = React.useState(false)
    const [successKeyword, setSuccessKeyword] = React.useState<"Update Successfully!" | "Tour Created!">("Update Successfully!")
    const [offlineTname, setOfflineTname] = React.useState("")

    React.useEffect(()=> {
        if (props.isVisible) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
    }, [props.isVisible])

    React.useEffect(()=> {
        if (displayFailed) {
            setTimeout(()=> {
                setDisplayFailed(false)
            }, 1500)
        }
    }, [displayFailed])

    React.useEffect(()=> {
        if (displaySuccess) {
            setTimeout(()=> {
                setDisplaySuccess(false)
                props.onDismiss()
                if (props.mode == 'local')  navigate(navigateContent, '/lobby', {}, offlineTname)
            }, 1500)
        }
    }, [displaySuccess])

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
        board_to_play: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        minute_board: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        board_per_round: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
    }
    const tourForm = useForm(form);
    const {viewModel, tourData, updateTourWith
        } = useEditTour(props.tourName ?? "", props.isVisible, (success, reason)=> {
            if (success) {
                
                props.onDismiss()
            }
            else {
                // setDisplayFailed(true)
                updateResponseValid(false)
            }
        })

    const [scrollHeight, setScrollHeight] = React.useState(0)

    const containerVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.1
            }
        },
        hidden: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.1
            }
        }
    }
    
    React.useEffect(()=> {
        if (!props.isVisible) {
            (document.querySelector(`input[name='title']`) as HTMLInputElement).value = '';
            // (document.querySelector(`input[name='description']`) as HTMLInputElement).value = '';
            // (document.querySelector(`select[name='date]`) as HTMLInputElement).value = '';
            // (document.querySelector(`select[name='time']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='board_to_play']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='minute_board']`) as HTMLInputElement).value = '';
            (document.querySelector(`input[name='board_per_round']`) as HTMLInputElement).value = '';
        }
    },[props.isVisible])

    React.useEffect(()=> {
        console.log("VIEWMODEL", viewModel)
    }, [viewModel])

    return (
        <PopupContainer
            key={key}
            layoutId={'create-tour-popup'}
            // initial={props.initial}
            // animate={props.animate}
            // exit={props.exit}
            id="popup-background-outside"
            isVisible={props.isVisible}
            onClick={(e)=> {
                if ((e.target as HTMLElement).id == "popup-background-outside") {
                    props.onDismiss()
                    setKey(uuidv4())
                }
            }}>
            <Container
                key={viewModel && props.isVisible}
                initial="hidden"
                animate={props.isVisible ? "visible" : "hidden"}
                variants={containerVariants}>
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
                        {/* <TextField 
                            data-testid="popup-description"
                            disabled
                            // defaultValue={tourData?.tour_name ?? ''}
                            key={'description'}
                            name="description" 
                            placeholder="Description"
                            // warningMessage={tourForm.isValid['description'].message} 
                            isValid={true}
                            warningVisible={props.isVisible}
                            /> */}
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
                        {/* <Section title="Spectator">
                            <Selector disabled>
                                
                            </Selector>
                        </Section> */}
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
                            name="board_to_play" 
                            placeholder="Board To Play"
                            warningMessage={tourForm.isValid['board_to_play'].message} 
                            isValid={tourForm.isValid['board_to_play'].isValid}
                            warningVisible={props.isVisible}
                            />
                        <TextField 
                            data-testid="popup-minute_board"
                            type="number"
                            min="6"
                            key='minute_board'
                            defaultValue={viewModel?.minute_board ?? ''}
                            name="minute_board" 
                            placeholder="Minute Per Board"
                            warningMessage={tourForm.isValid['minute_board'].message} 
                            isValid={tourForm.isValid['minute_board'].isValid}
                            warningVisible={props.isVisible}
                            />
                        <TextField 
                            data-testid="popup-board_round"
                            type="number"
                            min="1"
                            key='board_per_round' 
                            defaultValue={viewModel?.board_per_round ?? ''}
                            name="board_per_round" 
                            placeholder="Board Per Round"
                            warningMessage={tourForm.isValid['board_per_round'].message} 
                            isValid={tourForm.isValid['board_per_round'].isValid}
                            warningVisible={props.isVisible}
                            />
                    </Section>
                    <AltSection title="">
                        {/* <Selector disabled>
                                
                        </Selector> */}
                        <BottomDiv>
                            {
                                (props.tourName == "" || props.tourName == undefined) ? 
                                    <PrimaryButton onClick={()=> {
                                        tourForm.handleSubmit((isValid, value)=> {
                                            console.log("VALUE ", value)
                                            if (isValid) {
                                                createTour(authen.authen.username, value, props.mode, (success, reason) => {
                                                    // console.log(success, reason)
                                                    if (success) {
                                                        // console.log(success, reason)
                                                        let data = value as any
                                                        setDisplaySuccess(true)
                                                        setSuccessKeyword("Tour Created!")
                                                        setOfflineTname(data.title)
                                                    }
                                                })
                                            }
                                        })                                        
                                    }}>Create Tour</PrimaryButton> :
                                <PrimaryButton onClick={()=> {
                                    tourForm.handleSubmit((isValid, value)=> {
                                        // console.log((document.querySelector(`input[name='title']`) as HTMLInputElement).value)
                                        if (isValid) {
                                            let data = value as any
                                            const formatDate =
                                            data.date.split("-")[1] +
                                            "/" +
                                            data.date.split("-")[2] +
                                            "/" +
                                            data.date.split("-")[0];
                                            const dayNight = Number(data.time.split(":")[0]) > 12 ? "PM" : "AM";
                                            const updateValue =
                                            Number(data.time.split(":")[0]) > 12
                                                ? String(Number(data.time.split(":")[0]) - 12)
                                                : data.time.split(":")[0];

                                            const formatTime =
                                            " " +
                                            updateValue +
                                            ":" +
                                            data.time.split(":")[1] +
                                            ":" +
                                            (data.time.split(":")[2] == undefined ? "00" : data.time.split(":")[2]) +
                                            " " +
                                            dayNight;
                                            // console.log("date time", formatDate + ',' + formatTime)
                                            const formatDateTime = formatDate + "," + formatTime;
                                            
                                            const tourdata: TourData = {
                                                tour_name: data.title,
                                                max_player: 20,
                                                type: data.movement,
                                                password: "",
                                                players: [],
                                                time_start: formatDateTime,
                                                status: "Pending",
                                                board_to_play: Number(data.board_to_play),
                                                minute_board: Number(data.minute_board),
                                                board_per_round: Number(data.board_per_round),
                                                movement: data.movement,
                                                scoring: data.scoring,
                                                barometer: true,
                                                createBy: authen.authen.username,
                                                mode: props.mode
                                              };
                                            socket.emit("update-tour-data", tourdata, (isFinish: boolean) => {
                                                
                                                if (isFinish) {
                                                    setDisplaySuccess(true)
                                                    setSuccessKeyword("Update Successfully!")
                                                    // props.onDismiss()
                                                }
                                                else {
                                                    setDisplayFailed(true)
                                                }
                                            })
                                            // updateTourWith(value)
                                            //     .then( response => {
                                            //         // console.log(response)
                                            //         props.onDismiss()
                                            //     })
                                            //     .catch( error =>{
                                            //         // console.log(error)
                                            //     })
                                        }
                                    })
                                }}>Update Tour</PrimaryButton>
                            }

                        </BottomDiv>
                    </AltSection>
                </div>
                <Popup display={displayFailed}>
                <PopupContent>
                    <Lottie animationData={failedAnimation} style={{width: "100px", height: "100px", alignSelf: "center"}} loop />
                    <TitleText>Update failed try again later</TitleText>
                </PopupContent>
                </Popup>
                <Popup display={displaySuccess}>
                    <PopupContent>
                        <Lottie animationData={successAnimation} style={{width: "100px", height: "100px", alignSelf: "center"}} loop />
                        <TitleText>{successKeyword}</TitleText>
                    </PopupContent>
                </Popup>
            </Container>
        </PopupContainer>
    )
}

const Popup = styled.div<{display: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    position: absolute;
    background-color: rgba(248,248,248, 0.9);
    opacity: ${props=>props.display ? "1" : "0"};
    visibility: ${props=>props.display ? "visible" : "hidden"};
    transition: all 0.2s ease-in-out;
`

const PopupContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 40%;
`

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

const PopupContainer = styled(motion.div)<{isVisible: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
    /* background-color: rgba(0,0,0,0.25); */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    visibility: ${props => props.isVisible ? "visible" : "hidden"};
    /* visibility: visible; */
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

const Container = styled(motion.div)`
    display: flex;
    gap: 10px;
    /* display: grid; */
    /* grid-template: repeat(auto-fit, minmax(200, 1fr)) /  repeat(auto-fit, minmax(200, 1fr)); */
    background-color: white;
    box-sizing: border-box;
    position: relative;
    padding: 20px;
    border-radius: 16px;
    box-shadow: var(--app-popup-shadow);
`

export default CreateTourPopup;
