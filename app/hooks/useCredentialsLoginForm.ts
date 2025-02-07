import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'

const useCredentialsLoginForm = () => {
    const { data: session } = useSession()
    const [debugInfo, setDebugInfo] = useState<string>('')
    const [credentials, setCredentials] = useState({
      username: '',
      password: ''
    })

    const handleCredentialsLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setDebugInfo('Attempting credentials login...')
      
      try {
          const result = await signIn('credentials', {
              username: credentials.username,
              password: credentials.password,
              redirect: false,
          })
          
          if (result?.error) {
              setDebugInfo(`Login mislukt: ${result.error}`)
          } else {
              setDebugInfo('Login successful!')
          }
      } catch (error) {
          setDebugInfo(`Error during login: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
  }
}

export default useCredentialsLoginForm;