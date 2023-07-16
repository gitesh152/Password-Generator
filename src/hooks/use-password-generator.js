import { useState } from "react"

const usePasswordGenerator = () => {
    //It is good pratice to create seprate file for fns of hooks etc.
    //Instead of bloating main code file.
    const [password, setPassword] = useState('');
    const [errorMessgae, setErrorMessage] = useState('');
    const generatePassword = (checkboxData, length) => {
        console.log('yaha')
        let charset = ""
        let generatedPassword = ""
        const selectedOption = checkboxData.filter((checkbox => checkbox.state))
        if (selectedOption.length === 0) {
            setErrorMessage('Select at least one option.')
            setPassword('')
            return;
        }					


        selectedOption.forEach(option => {
            switch (option.title) {
                case "Include Uppercase Letters": {
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                }
                case "Include Lowercase Letters": {
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;
                }
                case "Include Symbols": {
                    charset += "!@#$%^&*()";
                    break;
                }
                case "Include Numbers": {
                    charset += "1234567890";
                    break;
                }
                default: break;
            }
        });

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            generatedPassword += charset[randomIndex];
        }
        setPassword(generatedPassword)
        setErrorMessage('')
    }



    return { password, errorMessgae, generatePassword }
}

export default usePasswordGenerator;