import React from 'react'
import PlaceholderImg from '../../../../assets/images/placeholder.png'

interface ModePreviewContainerProps {
    img?: string
    title?: string
    description?: string
}

const ModePreviewContainer: React.FC<ModePreviewContainerProps> =()=> {
    return (
        <div className="rounded-xl shadow-md flex-col justify-center items-center content-center overflow-hidden hover:shadow-2xl transition h-80">
            <div className="overflow-hidden h-32">
                <img src={PlaceholderImg} className="object-contain"/>
            </div>
            <div className="flex-col items-center px-10 py-4">
                <div className="p-4">
                    <h2 className="font-extrabold text-lg">Solitaire</h2>
                    <p className="font-light text-sm">Quick Start with Solitairefacing bots and killing your freetimes</p>
                </div>
                <div className="flex justify-center">
                    <button className="bg-white text-appBlue px-10 py-2 rounded-md border border-appBlue hover:bg-appBlue hover:text-white transition">
                        Play
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModePreviewContainer