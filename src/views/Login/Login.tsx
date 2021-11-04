import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

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

    interface Props {
        display: boolean
        children: JSX.Element
    }

    const Container: React.FC<Props> =(props: Props)=> {
        return (
            <div className="lg:w-1/2 h-full flex justify-center items-center" style={{backgroundColor: props.display ? "white" : "blue"}}>
                {props.children}
            </div>
        )
    }
    
    return (
        <div className="lg:flex flex-row w-screen h-screen">
            <Container display={displayComponent === DisplayComponent.Register}>
                <RegisterForm 
                    animate={displayComponent === DisplayComponent.Register ? "show" : "hide"}
                    variants={formDisplay}
                    onLoginClick={()=>setDisplayComponent(DisplayComponent.Login)}/>
            </Container>
            <Container display={displayComponent === DisplayComponent.Login}>
                <LoginForm 
                    animate={displayComponent === DisplayComponent.Login ? "show" : "hide"}
                    variants={formDisplay}
                    onRegisterClick={()=>setDisplayComponent(DisplayComponent.Register)}/>
            </Container>
        </div>
    );
}

export default LoginPage;