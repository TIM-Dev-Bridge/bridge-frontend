import React from 'react';
import LoginForm from './components/LoginForm';

const LoginPage: React.FC = ()=> {
    return (
        <div className="flex-row w-screen h-screen">
            <div className="w-1/2 "> 

            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;