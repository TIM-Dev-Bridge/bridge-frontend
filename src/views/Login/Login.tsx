import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const LoginPage: React.FC = ()=> {
    enum DisplayComponent {
        Login = 1,
        Register,
    }

    const [displayComponent, setDisplayComponent] = React.useState<DisplayComponent>(DisplayComponent.Login)

    React.useEffect(()=> {
        console.log(displayComponent === DisplayComponent.Login)
    })
    
    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="w-1/2 h-full flex justify-center items-center"> 
                <RegisterForm />
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;