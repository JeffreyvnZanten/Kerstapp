// app/login/page.tsx
'use client'
import { useState, FormEvent, ChangeEvent } from 'react';
import { LoginCredentials, LoginResponse } from '@/app/types/auth';  // Changed this line

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginCredentials>({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            
            if (data.success) {
                console.log('Login successful');
                // Add your success handling here
            } else {
                // Always show the error message from the server
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Connection error - please try again');
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
                    onChange={handleChange}
                    className="px-3 py-2 rounded"
                    disabled={loading}
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
                    onChange={handleChange}
                    className="px-3 py-2 rounded"
                    disabled={loading}
                    required
                />
            </div>

            {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
        >
            {loading ? 'Logging in...' : 'Login'}
        </button>
    </form>
);
}