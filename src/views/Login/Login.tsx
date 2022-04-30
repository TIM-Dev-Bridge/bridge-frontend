import React, { HTMLAttributes } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LoginBG from './../../assets/images/login-bg.svg';
import RegisterBG from './../../assets/images/register-bg.svg';
import styled from 'styled-components';

// window.HTMLElement.prototype.scrollIntoView = function() {};


const LoginPage: React.FC = ()=> {
    enum DisplayComponent {
        Login = 1,
        Register,
    }

    const [displayComponent, setDisplayComponent] = React.useState<DisplayComponent>(DisplayComponent.Register)
    const formDisplay = {
        show: { opacity: 1, scale: [0.8, 1.1, 1]},
        hide: { opacity: 0, scale: [1, 1.01]}
    }

    interface Props extends HTMLAttributes<HTMLElement>{
        display: boolean
        children: JSX.Element
        bg: string
    }

    const Container: React.FC<Props> =(props: Props)=> {
        const Body = styled.div<{display: boolean, bg: string}>`
            width: 100%;
            height: 100%;
            min-height: 720px;
            justify-content: center;
            align-items: center;
            display: flex;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-image: ${props=>props.display ? "" : `url(${props.bg})`}
        `
        return (
            <Body id={props.id} display={props.display} bg={props.bg}>
                {props.children}
            </Body>
            /* <div id={props.id} className="lg:w-1/2 h-full flex justify-center items-center" style={{backgroundImage: props.display ? "" : `url(${props.bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                {props.children}
            </div> */
        )
    }
    

    React.useEffect(()=> {
        if (displayComponent == DisplayComponent.Login) {
            setTimeout(()=> {
                var element = document.querySelector("#login-screen");
                element?.scrollIntoView({ behavior: 'smooth', block: 'start'});
            }, 500)
        } 
        else {
            setTimeout(()=> {
                var element = document.querySelector("#register-screen");
                element?.scrollIntoView({ behavior: 'smooth', block: 'start'});
            }, 500)
            
        }
    }, [displayComponent])
    
    return (
        <div className="lg:flex flex-row w-screen h-full overflow-auto">
            <Container id="register-screen" display={displayComponent === DisplayComponent.Register}
                bg={LoginBG}
                >
                <RegisterForm 
                    animate={displayComponent === DisplayComponent.Register ? "show" : "hide"}
                    isDisplay={displayComponent === DisplayComponent.Register}
                    variants={formDisplay}
                    onRegisterComplete={()=> {
                        setDisplayComponent(DisplayComponent.Login)
                    }}
                    onLoginClick={()=> {
                        setDisplayComponent(DisplayComponent.Login)
                    }}
                    />
            </Container>
            <Container id="login-screen" display={displayComponent === DisplayComponent.Login}
                bg={RegisterBG}
                >
                <LoginForm 
                    animate={displayComponent === DisplayComponent.Login ? "show" : "hide"}
                    variants={formDisplay}
                    isDisplay={displayComponent === DisplayComponent.Login}
                    onRegisterClick={()=>{
                        setDisplayComponent(DisplayComponent.Register)
                        }}/>
            </Container>
        </div>
    );
}

export default LoginPage;