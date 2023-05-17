import { useState } from 'react';
import { NavBtns } from './NavBtns';
import { updateActivity } from '../Common/updateActivity';

interface ITextInputProps {
  field: {
    question: string;
    response: null;
    solution: string;
    type: string;
  };
  prevStep: () => void;
  nextStep: () => void;
  step: number;
}

export function TextInput({ field, step, prevStep, nextStep }: ITextInputProps) {

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
      setSuccess(true);
      updateActivity('question_1', { ...field, response: text });
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
      <div className='form-body'>
        <label className='form-label' htmlFor='text-input'>{field.type}</label>
        <p>{field.question}</p>
        <input
          autoComplete="off"
          type='text'
          name='text-input'
          onChange={handleChange}
          className={error ? 'input-error' : success ? 'input-success' : ''}
          value={text}
          placeholder={error ? 'Answer Needed' : 'Write Answer Here...'} />
      </div>
      <NavBtns handleSubmit={handleSubmit} success={success} step={step} prevStep={prevStep} nextStep={nextStep} />
    </div>
  );
}
