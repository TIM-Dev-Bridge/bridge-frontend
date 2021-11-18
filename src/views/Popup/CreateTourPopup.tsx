import React, { HTMLAttributes } from 'react';
import { PrimaryButton, PrimarySqButton, SelectSqButton } from '../../components/Button/Button';
import { useForm } from '../../components/Form/FormHooks';
import DateSelector from '../../components/Selector/DateSelector';
import Selector from '../../components/Selector/Selector';
import { TitleText } from '../../components/Text/Text';
import TextField from '../../components/TextField/TextField';
import { validator } from '../Login/components/Validate';

interface DialogProps {
    isVisible: boolean
    onDismiss: ()=>void
}

const CreateTourPopup =(props: DialogProps)=> {
    const form = {
        title: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        description: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        date: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        time: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        
    }
    const tourForm = useForm(form);

    const [scrollHeight, setScrollHeight] = React.useState(0)
    
    React.useEffect(()=> {

    },[props.isVisible])

    return (
        <div id="app-popup" className={`flex justify-center items-center w-screen h-screen bg-opacity-25 bg-black fixed top-0 left-0 ${props.isVisible ? "visible" : "hidden"}`}
            onClick={props.onDismiss}
        >
            <div className="flex bg-white p-8 rounded-lg shadow-sm gap-5">
                <div className="flex flex-col gap-4">
                    <Section title="Tournament Info">
                        <TextField />
                        <TextField />
                    </Section>
                    <Section title="Directors" >

                    </Section>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Section title="Start Time">
                            <DateSelector type="date"/>
                            <DateSelector type="time"/>
                        </Section>
                        <div className="flex">
                            <Section title="Movement">
                                <Selector >
                                    
                                </Selector>
                            </Section>
                            <Section title="Scoring">
                                <Selector >
                                    
                                </Selector>
                            </Section>
                        </div>
                    </div>
                    <div className="flex">
                        <Section title="Spectator">
                            <Selector >
                                
                            </Selector>
                        </Section>
                        <Section title="Chat">
                            <Selector >
                                
                            </Selector>
                        </Section>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Section title="Board">
                        <TextField />
                        <TextField />
                        <TextField />
                    </Section>
                    <Section title="Deals">
                        <Selector >
                                
                        </Selector>
                        <PrimaryButton>Create Tour</PrimaryButton>
                    </Section>
                </div>
            </div>
        </div>
    )
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
    title?: string
}

const Section =(props: SectionProps)=> {
    return (
        <div className="flex flex-col w-full">
            <TitleText>{props.title ?? "Title"}</TitleText>
            {props.children}
            <div style={{width: "90%", height: "1px", backgroundColor: "lightgrey", margin: "0 auto"}}></div>
        </div>
    )
}

export default CreateTourPopup;