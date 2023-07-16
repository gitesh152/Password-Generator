import React, { useState } from 'react'
import usePasswordGenerator from '../hooks/use-password-generator.js'
import PasswordStrengthCheckerIndicator from './StrengthChecker.js';
import Button from './Button.js';
import Checkbox from './Checkbox.js';

const App = () => {

  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: true },
    { title: "Include Symbols", state: false },
    { title: "Include Numbers", state: true }
  ]);

  const { password, errorMessgae, generatePassword } = usePasswordGenerator()


  const handleCheckboxData = (i) => {
    const updateCheckboxData = [...checkboxData];
    updateCheckboxData[i].state = !updateCheckboxData[i].state;
    setCheckboxData(updateCheckboxData);
  }


  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
  }

  return (
    <div className="container">
      {password &&
        <div className="header">
          <div className="title">{password}</div>

          <Button onClick={handleCopy} text={copied ? 'Copied' : 'Copy'} customClass='copyBtn' />

        </div>
      }
      <div className='charLength'>
        <span><label>Character Length</label><label>{length}</label></span>
        <input type='range' min='4' max='20' value={length} onChange={(e) => setLength(e.target.value)} />
      </div>

      <div className='checkBoxes'>
        {checkboxData.map((checkbox, index) => {
          return <Checkbox key={index} onChange={() => handleCheckboxData(index)} title={checkbox.title} state={checkbox.state} />
        })}
      </div>

      <PasswordStrengthCheckerIndicator password={password} />

      {errorMessgae && <div className='errorMessage'>{errorMessgae}</div>}

      <Button customClass='generateBtn' onClick={() => generatePassword(checkboxData, length)}
        text='Generate Password'
      />
    </div>
  )
}

export default App
