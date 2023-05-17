import { useState, ChangeEvent } from "react";
import { NavBtns } from "./NavBtns";
import { updateActivity } from '../Common/updateActivity'

interface IMultipleChoice {
  field: {
    answers: string[];
    question: string,
    response: string | null;
    solution: string;
    type: string;
  };
  prevStep: () => void;
  nextStep: () => void;
  step: number;
}


export function MultipleChoiceInput({ field, step, prevStep, nextStep }: IMultipleChoice) {

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
      setSuccess(true);
      updateActivity('question_3', { ...field, response: selected });
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
      <div className='form-body'>
        <label className='form-label' htmlFor="text-input">{field.type}</label>
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
      </div>
      <NavBtns handleSubmit={handleSubmit} success={success} step={step} prevStep={prevStep} nextStep={nextStep} />
    </div>
  );
}
