import { useState, ChangeEvent } from "react";
import { SubmitBtn } from "./SubmitBtn";
import { updateActivity } from "../db";

interface IMultipleChoice {
  field: {
    answers: string[];
    question: string,
    response: string | null;
    solution: string;
    type: string;
  };
  updateMain: (p: string) => void;
}


export function MultipleChoiceInput({ field, updateMain }: IMultipleChoice) {

  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /** Validate Input
   * Compares selected answer against solution.
   */
  function validateInput(value: string) {
    return value?.toLocaleLowerCase() === field.solution;
  }

  function handleSubmit() {
    if (!selected) {
      setError(true);
    } else if (validateInput(selected)) {
      updateMain(selected);
      setSuccess(true)
      const result = updateActivity({ column: 'question_3', key: 'response', value: selected })
      console.log(result)
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
      <label htmlFor="text-input">{field.type}</label>
      <fieldset className={error ? 'input-error' : ''}>
        <legend>{field.question}</legend>

        {field.answers.map((item, i) =>
          <div key={`${item}-${i}`}>
            <input
              checked={selected === item}
              className={error ? 'input-error' : ''}
              type="radio"
              id={item}
              name={item}
              value={item}
              onChange={handleChange} />
            <label htmlFor={item}>{item}</label>
          </div>
        )}

      </fieldset>
      <SubmitBtn handleSubmit={handleSubmit} success={success} />
    </div>
  );
}
