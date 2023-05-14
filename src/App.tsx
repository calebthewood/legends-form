import { useState } from 'react';
import { TextInput } from './Forms/TextInput';
import { TextAreaInput } from './Forms/TextAreaInput';
import { FileInput } from './Forms/FileInput';
import './App.css';
import { MultipleChoiceInput } from './Forms/MultipleChoice';

const STEP_MAX = 5;
const STEP_MIN = 0;

function App() {

  const [textFields, setTextFields] = useState<string[] | null>(null);
  const [fileFields, setFileFields] = useState<File[] | null>(null);
  const [multiChoiceFields, setMultiChoiceFields] = useState<string[] | null>(null);

  const [step, setStep] = useState(0);

  function renderFormField(step: number) {
    switch (step) {
      case 1:
        return <TextInput field="Text Input #1:" updateMain={updateTextFields} />;
      case 2:
        return <TextAreaInput field="Text Area #2:" updateMain={updateTextFields} />;
      case 3:
        return <FileInput type={'audio'} updateMain={updateFileFields} />;
      case 4:
        return <FileInput type={'video'} updateMain={updateFileFields} />;
      case 5:
        return <MultipleChoiceInput field={'Multiple Choice'} updateMain={updateTextFields} />;
      default:
        return <div><h1>Welcome</h1><h6>Let's get started!</h6></div>;
    }
  }

  function updateTextFields(newValue: string | null) {
    if (!newValue) return;
    if (textFields) {
      setTextFields([...textFields, newValue]);
    } else {
      setTextFields([newValue]);
    }

  }

  function updateFileFields(newValue: File | null) {
    if (!newValue) return;
    if (fileFields) {
      setFileFields([...fileFields, newValue]);
    } else {
      setFileFields([newValue]);
    }
  }

  function nextStep() {
    setStep(step < STEP_MAX ? step + 1 : step);
  }

  function prevStep() {
    setStep(step >= STEP_MIN ? step - 1 : step);
  }

  return (
    <>
      <h1>Gettin Started</h1>
      <div className='content'>
        <div>
          {renderFormField(step)}
        </div>
      </div>
      <div>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <ol>
        <strong>Answer List:</strong>
        {textFields && textFields.map((field, i) =>
          <li key={`answers-${i * 7}`}>{field}</li>)}
      </ol>
      <ol>
        <strong>File List:</strong>
        {fileFields && fileFields.map((field, i) =>
          <li key={`answers-${i * 7}`}>{field.name}</li>)}
      </ol>
    </>
  );
}

export default App;
