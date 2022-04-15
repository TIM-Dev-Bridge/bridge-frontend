import React from 'react';
import { PrimaryButton, PrimarySqButton } from '../../components/Button/Button';

const SelectCreateTourPopup =()=> {
    return (
        <div id="app-popup" className="flex justify-center items-center w-screen h-screen">
            <div>
                {/* <SelectSqButton> Duplicate </SelectSqButton>
                <SelectSqButton> Duplicate </SelectSqButton> */}
            </div>
            <div>
                <PrimaryButton>Confirm</PrimaryButton>
            </div>
        </div>
    )
}