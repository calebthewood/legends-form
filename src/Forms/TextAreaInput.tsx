import { useState } from "react";
import { NavBtns } from "./NavBtns";
import { updateActivity } from '../Common/updateActivity'

interface ITextAreaInputProps {
  field: {
    question: string;
    response: null;
    solution: string;
    type: string;
  };
  config?: ITextAreaConfig;
  prevStep: () => void;
  nextStep: () => void;
  step: number;
}

interface ITextAreaConfig {
  rows: number;
  cols: number;
}

const defaultConfig = {
  rows: 5,
  cols: 33,
};

export function TextAreaInput({ field, config = defaultConfig, step, prevStep, nextStep }: ITextAreaInputProps) {

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
      updateActivity('question_2', { ...field, response: text });
    } else {
      setSuccess(false);
      setError(true);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (error) setError(false);
    setText(event.target.value);
  }

  return (
    <div className='form-item' >
      <div className='form-body'>
        <label className='form-label' htmlFor='text-area'>{field.type}</label>
        <p>{field.question}</p>
        <textarea
          autoComplete="off"
          name='text-area'
          onChange={handleChange}
          rows={config.rows}
          cols={config.cols}
          className={error ? 'input-error' : success ? 'input-success' : ''}
          value={text}
          placeholder={error ? 'Answer Needed' : 'Write Answer Here...'}>
        </textarea>
      </div>
      <NavBtns handleSubmit={handleSubmit} success={success} step={step} prevStep={prevStep} nextStep={nextStep} />
    </div>
  );
}
