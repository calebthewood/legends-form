import { useState } from 'react';
import { TextInput } from './Forms/TextInput';
import { TextAreaInput } from './Forms/TextAreaInput';
import { FileInput } from './Forms/FileInput';
import { StateList } from './Common/StateList';
import { MultipleChoiceInput } from './Forms/MultipleChoice';
import './App.css';

const STEP_MAX = 6;
const STEP_MIN = 0;

function App() {

  const [textFields, setTextFields] = useState<string[] | null>(null);
  const [fileFields, setFileFields] = useState<string[] | null>(null);
  const [multiChoiceFields, setMultiChoiceFields] = useState<string[] | null>(null);
  const [transition, setTransition] = useState('animated-entry');
  const [isSubmitted, setIsSubmitted] = useState(true);

  const [step, setStep] = useState(0);

  function renderFormField(step: number) {
    switch (step) {
      case 1:
        return <TextInput field="Text Input #1" updateMain={updateTextFields} />;
      case 2:
        return <TextAreaInput field="Text Area #2" updateMain={updateTextFields} />;
      case 3:
        return <FileInput type={'audio'} updateMain={updateFileFields} />;
      case 4:
        return <FileInput type={'video'} updateMain={updateFileFields} />;
      case 5:
        return <MultipleChoiceInput field={'Multiple Choice'} updateMain={updateMultiChoiceFields} />;
      case 6:
        return <StateList textFields={textFields} fileFields={fileFields} multiChoiceFields={multiChoiceFields} />;
      default:
        return <div><h3>Welcome</h3><h6>Let's get started!</h6></div>;
    }
  }

  function updateTextFields(newValue: string | null) {
    if (!newValue) return;
    const newData = textFields ? [...textFields, newValue] : [newValue];
    setTextFields(newData);
    setIsSubmitted(true);
  }

  function updateFileFields(newValue: string | null) {
    if (!newValue) return;
    const newData = fileFields ? [...fileFields, newValue] : [newValue];
    setFileFields(newData);
    setIsSubmitted(true);
  }

  function updateMultiChoiceFields(newValue: string | null) {
    if (!newValue) return;
    const newData = multiChoiceFields ? [...multiChoiceFields, newValue] : [newValue];
    setMultiChoiceFields(newData);
    setIsSubmitted(true);
  }

  async function nextStep() {
    setTransition('animated-exit');
    setTimeout(() => {
      setStep(step < STEP_MAX ? step + 1 : step);
      setTransition('animated-entry');
    }, 200);
    setIsSubmitted(false);
  }

  async function prevStep() {
    setTransition('animated-exit');
    setTimeout(() => {
      setStep(step >= STEP_MIN ? step - 1 : step);
      setTransition('animated-entry');
    }, 200);
  }

  return (
    <>
      <h1>Gettin Started</h1>
      <hr />
      <div className='content'>
        <div className={transition}>
          {renderFormField(step)}
        </div>
      </div>
      <div>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep} disabled={!isSubmitted} >Next</button>
      </div>
      <hr />

    </>
  );
}

export default App;
