import React from 'react'
import PlaceholderImg from '../../../../assets/images/placeholder.png'
import TextField from '../../../../components/TextField/TextField'
import TextFieldNoWarning from '../../../../components/TextField/TextFieldNoWarning'

interface ModePreviewContainerProps {
    img?: string
    title?: string
    description?: string
    buttonTitle?: string
    onClick?: ()=>void
}

export const ModePreviewContainer: React.FC<ModePreviewContainerProps> =(props: ModePreviewContainerProps)=> {
    return (
        <div className="rounded-xl shadow-md flex-col justify-center items-center content-center overflow-hidden hover:shadow-2xl transition xl:h-80">
            <div className="overflow-hidden h-32">
                <img src={PlaceholderImg} className="object-contain"/>
            </div>
            <div className="flex-col items-center px-10 py-4">
                <div className="p-4">
                    <h2 className="font-extrabold text-lg">{props.title}</h2>
                    <p className="font-light text-sm">Play with other skilled players without any cost learning new techniques and more!</p>
                </div>
                <div className="flex justify-center">
                    <button className="bg-appBlue text-white px-10 py-2 rounded-md border border-appBlue hover:bg-appBlue hover:text-white transition">
                        {props.buttonTitle == undefined ? "Play" : props.buttonTitle}
                    </button>
                </div>
            </div>
        </div>
    )
}

export const LocalModePreviewContainer: React.FC<ModePreviewContainerProps> =(props: ModePreviewContainerProps)=> {
    return (
        <div className="rounded-xl shadow-md flex-col justify-center items-center content-center overflow-hidden hover:shadow-2xl transition xl:h-80">
            <div className="overflow-hidden h-32">
                <img src={PlaceholderImg} className="object-contain"/>
            </div>
            <div className="flex-col items-center px-10 py-4">
                <div className="p-4">
                    <h2 className="font-extrabold text-lg">{props.title}</h2>
                    <p className="font-light text-sm">Join an offline tournament to prove your skills. play face to face on real location for real experience </p>
                </div>
                <div className="flex justify-center">
                    <TextFieldNoWarning placeholder="Room ID"/>
                    <div className="w-4"></div>
                    <button className="h-10 bg-white text-appBlue px-10 py-2 rounded-md border border-appBlue hover:bg-appBlue hover:text-white transition"
                        onClick={props.onClick}
                    >
                    {props.buttonTitle == undefined ? "Play" : props.buttonTitle}
                    </button>
                </div>
            </div>
        </div>
    )
}

