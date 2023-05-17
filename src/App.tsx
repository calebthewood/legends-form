import { useState, useEffect } from 'react';
import { useSupabase } from './db';
import { TextInput } from './Forms/TextInput';
import { TextAreaInput } from './Forms/TextAreaInput';
import { FileInput } from './Forms/FileInput';
import { StateList } from './Common/StateList';
import { MultipleChoiceInput } from './Forms/MultipleChoice';
import { Welcome } from './Common/Welcome';
import './App.css';

const STEP_MAX = 6;
const STEP_MIN = 0;
const ANIMATION_DURATION_MS = 200; // based on 'grow' and 'shrink' animations in App.css


function App() {

  /* Form Field State */
  const [textFields, setTextFields] = useState<string[] | null>(null);
  const [fileFields, setFileFields] = useState<string[] | null>(null);
  const [multiChoiceFields, setMultiChoiceFields] = useState<string[] | null>(null);
  const activity = useSupabase({ tableName: 'activities', select: '*' });

  /* Carousel Related State */
  const [transition, setTransition] = useState('animated-entry');
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [step, setStep] = useState(0);



  function renderFormField(step: number) {
    switch (step) {
      case 1:
        return <TextInput field={activity.question_1} updateMain={updateTextFields} />;
      case 2:
        return <TextAreaInput field={activity.question_2} updateMain={updateTextFields} />;
      case 3:
        return <MultipleChoiceInput field={activity.question_3} updateMain={updateMultiChoiceFields} />;
      case 4:
        return <FileInput field={activity.question_4} updateMain={updateFileFields} />;
      case 5:
        return <FileInput field={activity.question_5} updateMain={updateFileFields} />;
      case 6:
        return <StateList textFields={textFields} fileFields={fileFields} multiChoiceFields={multiChoiceFields} />;
      default:
        return <Welcome />;
    }
  }

  /** Passed to text-based input components to update textFields and isSubmitted */
  function updateTextFields(newValue: string | null) {
    if (!newValue) return;
    const newData = textFields ? [...textFields, newValue] : [newValue];
    setTextFields(newData);
    setIsSubmitted(true);
  }

  /** Passed to file-based input components to update fileFields and isSubmitted */
  function updateFileFields(newValue: string | null) {
    if (!newValue) return;
    const newData = fileFields ? [...fileFields, newValue] : [newValue];
    setFileFields(newData);
    setIsSubmitted(true);
  }

  /** Passed to radio field components to update multiChoiceFields and isSubmitted */
  function updateMultiChoiceFields(newValue: string | null) {
    if (!newValue) return;
    const newData = multiChoiceFields ? [...multiChoiceFields, newValue] : [newValue];
    setMultiChoiceFields(newData);
    setIsSubmitted(true);
  }

  /** NextStep
   * Triggers transition animation and advances to the next component
   */
  async function nextStep() {
    setTransition('animated-exit');
    setTimeout(() => {
      setStep(step < STEP_MAX ? step + 1 : step);
      setTransition('animated-entry');
    }, ANIMATION_DURATION_MS);
    setIsSubmitted(false);
  }

  /** PrevStep
   * Triggers transition animation and moves to the previous component
   */
  async function prevStep() {
    setTransition('animated-exit');
    setTimeout(() => {
      setStep(step > STEP_MIN ? step - 1 : step);
      setTransition('animated-entry');
    }, ANIMATION_DURATION_MS);
    setIsSubmitted(true);
  }

  return (
    <>
      <h1>Legends</h1>
      <div className='form-container'>
        <div className='content'>
          <div className={transition}>
            {activity ? renderFormField(step) : <h1>Loading...</h1>}
          </div>
        </div>
        <div className={step === STEP_MIN ? 'nav-start nav-btns' : 'nav-btns'}>
          {step > STEP_MIN && <button onClick={prevStep} disabled={step <= 0}>Back</button>}
          {step < STEP_MAX && <button onClick={nextStep} disabled={!isSubmitted} >Next</button>}
        </div>
      </div>
    </>
  );
}

export default App;
