import React from 'react'

export const displayPopup =(element: Node)=> {
    if (!document.getElementById('app-popup')) {
        document.body.appendChild(element);
    }
}