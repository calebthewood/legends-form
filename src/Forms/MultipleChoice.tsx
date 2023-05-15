import { useState, ChangeEvent } from "react";
import { SubmitBtn } from "./SubmitBtn";

interface IMultipleChoice {
  field: string;
  updateMain: (p: string) => void;
}

interface IRadioItem {
  name: string;
  label: string;
  value: string;
}

const options: IRadioItem[] = [
  {
    name: 'multiple-choice',
    label: 'Option 1',
    value: 'option-1'
  },
  {
    name: 'multiple-choice',
    label: 'Option 2',
    value: 'option-2'
  },
  {
    name: 'multiple-choice',
    label: 'Option 3',
    value: 'option-3'
  },
  {
    name: 'multiple-choice',
    label: 'Option 4',
    value: 'option-4'
  },
];

export function MultipleChoiceInput({ field, updateMain }: IMultipleChoice) {

  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /** Validate Input
   * A token validation function. More could be added here based on requirements.
   */
  function validateInput(value: string) {
    return value.length > 0;
  }

  function handleSubmit() {
    if (!selected) {
      setError(true);
    } else if (validateInput(selected)) {
      updateMain(selected);
      setSuccess(true)
    } else {
      setError(true);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (error) setError(false);
    setSelected(event.target.value);
  }

  return (
    <div className="form-item">
      <label htmlFor="text-input">{field}</label>
      <fieldset className={error ? 'input-error' : ''}>
        <legend>Select an Answer:</legend>

        {options.map((item, i) =>
          <div key={`${item.name}-${i}`}>
            <input
              checked={selected === item.value}
              className={error ? 'input-error' : ''}
              type="radio"
              id={item.value}
              name={item.value}
              value={item.value}
              onChange={handleChange} />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        )}

      </fieldset>
      <SubmitBtn handleSubmit={handleSubmit} success={success} />
    </div>
  );
}
