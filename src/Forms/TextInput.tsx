import { useState } from 'react';
import './forms.css';

interface ITextInputProps {
  field: string;
  updateMain: (p: string) => void;
}

export function TextInput({ field, updateMain }: ITextInputProps) {

  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /** Validate Input
   * A token validation function. More could be added here based on requirements.
   * Currently it just ensures input isn't empty
   */
  function validateInput(value: string) {
    return value.length > 0;
  }

  function handleSubmit() {
    if (validateInput(text)) {
      updateMain(text);
      setSuccess(true);
    } else {
      setSuccess(false);
      setError(true);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError(false);
    setText(event.target.value);
  }

  return (
    <div className='form-item'>
      <label htmlFor='text-input'>{field}</label>
      <input
        type='text'
        name='text-input'
        onChange={handleChange}
        className={error ? 'input-error' : success ? 'input-success' : ''}
        value={text}
        placeholder={error ? 'Answer Needed' : 'Write Answer Here...'} />
      <button
        className='submit-btn'
        onClick={handleSubmit}
        disabled={success}>{success ? 'Submitted' : 'Submit'}</button>
    </div>
  );
}
