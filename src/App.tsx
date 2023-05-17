import { useState } from 'react';
import { useSupabase } from './Common/useSupabase'
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
  const activity = useSupabase('activities', '*');

  /* Carousel Related State */
  const [transition, setTransition] = useState('animated-entry');
  const [step, setStep] = useState(0);

  function renderFormField(step: number) {
    switch (step) {
      case 1:
        return <TextInput prevStep={prevStep} nextStep={nextStep} step={step} field={activity.question_1} />;
      case 2:
        return <TextAreaInput prevStep={prevStep} nextStep={nextStep} step={step} field={activity.question_2} />;
      case 3:
        return <MultipleChoiceInput prevStep={prevStep} nextStep={nextStep} step={step} field={activity.question_3} />;
      case 4:
        return <FileInput prevStep={prevStep} nextStep={nextStep} step={step} field={activity.question_4} />;
      case 5:
        return <FileInput prevStep={prevStep} nextStep={nextStep} step={step} field={activity.question_5} />;
      case 6:
        return <StateList />;
      default:
        return <Welcome />;
    }
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
  }

  return (
    <>
      <h1>Form Carousel</h1>
      <div className='form-container'>
        <div className={`form-content ${transition}`}>
            {activity ? renderFormField(step) : <h1>Loading...</h1>}
        </div>
        {step === 0 &&
        <div className='nav-start nav-btns'>
           <button className='next' onClick={nextStep}>Start!</button>
        </div>}
      </div>
    </>
  );
}

export default App;
