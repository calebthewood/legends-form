import { useState } from "react";
import { SubmitBtn } from "./SubmitBtn";
import { updateActivity } from "../db";

interface ITextAreaInputProps {
  field: {
    question: string;
    response: null;
    solution: string;
    type: string;
  };
  config?: ITextAreaConfig;
  updateMain: (p: string) => void;
}

interface ITextAreaConfig {
  rows: number;
  cols: number;
}

const defaultConfig = {
  rows: 5,
  cols: 33,
};

export function TextAreaInput({ field, updateMain, config = defaultConfig }: ITextAreaInputProps) {

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
      updateActivity({ column: 'question_2', key: 'response', value: text })
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
      <label htmlFor='text-area'>{field.type}</label>
      <p>{field.question}</p>
      <textarea
        name='text-area'
        onChange={handleChange}
        rows={config.rows}
        cols={config.cols}
        className={error ? 'input-error' : success ? 'input-success' : ''}
        value={text}
        placeholder={error ? 'Answer Needed' : 'Write Answer Here...'}>
      </textarea>
      <SubmitBtn handleSubmit={handleSubmit} success={success} />
    </div>
  );
}
