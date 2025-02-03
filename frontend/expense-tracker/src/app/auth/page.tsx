'use client';

import { useState } from 'react';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';

export default function AuthPage() {
    const [isSignup, setIsSignup] = useState(true);

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>
            {isSignup ? <Signup /> : <Login />}
            <button onClick={() => setIsSignup(!isSignup)} className="mt-4 text-blue-500">
                {isSignup ? 'Already have an account? Login' : 'New user? Sign Up'}
            </button>
        </div>
    );
}
