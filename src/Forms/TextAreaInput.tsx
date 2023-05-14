import { useState } from "react";

interface ITextAreaInputProps {
  field: string;
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

export function TextAreaInput({ field, updateMain, config=defaultConfig }: ITextAreaInputProps) {

  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  /** Validate Input
   * A token validation function. More could be added here based on requirements.
   * Currently it just ensures input isn't empty
   */
  function validateInput(value: string) {
    return value.length > 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validateInput(text)) {
      updateMain(text);
    } else {
      setError(true);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (error) setError(false);
    setText(event.target.value);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="text-area">{field}</label>
      <textarea
        name="text-area"
        onChange={handleChange}
        rows={config.rows}
        cols={config.cols}
        className={error ? 'input-error' : ''}
        value={text}
        placeholder={error ? 'Answer Needed' : 'Write Answer Here...'}>
      </textarea>
      <button>Next</button>
    </form>
  );
}