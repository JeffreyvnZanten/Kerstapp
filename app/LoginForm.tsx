// app/login/page.tsx
'use client'
import { useState, FormEvent } from 'react';
import { LoginCredentials } from '@/app/types/auth';

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginCredentials>({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [debugInfo, setDebugInfo] = useState<string>(''); // Add this for debugging
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setDebugInfo('Attempting login...'); // Debug info
        setLoading(true);
        
        try {
            setDebugInfo('Sending request...'); // Debug info
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            setDebugInfo(`Response status: ${response.status}`); // Debug info
            
            const data = await response.json();
            setDebugInfo(`Response data: ${JSON.stringify(data)}`); // Debug info
            
            if (data.success) {
                setDebugInfo('Login successful!');
                setWelcomeMessage(data.message);  // This will show "Welkom, username"
                
            } else {
                setError(data.message || 'Login failed');
                setDebugInfo(`Login failed: ${data.message}`);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Connection error - please try again');
            setDebugInfo(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className='text-white text-2xl font-bold'>Log in</h1>
            
            <div className="flex flex-col space-y-1">
                <label htmlFor="username" className='text-white'>
                    Gebruikersnaam
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="px-3 py-2 rounded"
                    required
                />
            </div>

            <div className="flex flex-col space-y-1">
                <label htmlFor="password" className='text-white'>
                    Wachtwoord
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="px-3 py-2 rounded"
                    required
                />
            </div>
            {welcomeMessage && (
                <div className="bg-green-500 text-white p-3 rounded-md mt-2" role="alert">
                    {welcomeMessage}
                </div>
            )}
            {error && (
                <div className="bg-red-500 text-white p-3 rounded-md mt-2" role="alert">
                    {error}
                </div>
            )}

            {/* Debug info display */}
            {debugInfo && (
                <div className="bg-gray-800 text-white p-3 rounded-md mt-2 text-sm">
                    {debugInfo}
                </div>
            )}
            
            <button 
                type="submit" 
                className={`w-full ${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white py-2 px-4 rounded hover:bg-blue-600`}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}