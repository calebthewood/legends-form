import { useState } from "react";

interface ITextInputProps {
  field: string;
  updateMain: (p: string) => void;
}

export function TextInput({ field, updateMain }: ITextInputProps) {

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError(false);
    setText(event.target.value);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="text-input">{field}</label>
      <input
        type="text"
        name="text-input"
        id=""
        onChange={handleChange}
        className={error ? 'input-error' : ''}
        value={text}
        placeholder={error ? 'Answer Needed' : 'Write Answer Here...'} />
      <button>Next</button>
    </form>
  );
}
