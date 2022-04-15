import Lottie, { useLottie } from 'lottie-react'
import loadingAnimation from '../../../assets/Animate/loading.json'
import successAnimation from '../../../assets/Animate/success.json'
import failAnimation from '../../../assets/Animate/fail.json'

const loading = {
    animationData: loadingAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

const success = {
    animationData: successAnimation,
    loop: false,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

const fail = {
    animationData: failAnimation,
    loop: false,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}


export const LoadingSpinner =()=> {
    let style = {
        width: 100,
        height: 32
    }
    const { View } = useLottie(loading, style)
    return View
}

const SuccessSpinner =()=> {
    let style = {
        width: 100,
        height: 32
    }
    const { View } = useLottie(success, style)
    return View
}

const FailSpinner =()=> {
    let style = {
        width: 100,
        height: 32
    }
    const { View } = useLottie(fail, style)
    return View
}

export enum LoadingState {
    IDLE,
    LOADING,
    SUCCESS,
    FAIL
}

export const LoadingAnimation = {
    loading: <LoadingSpinner />,
    success: <SuccessSpinner />,
    fail: <FailSpinner />
}