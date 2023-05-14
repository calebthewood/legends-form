import { useState } from 'react';
import { TextInput } from './Forms/TextInput';
import { TextAreaInput } from './Forms/TextAreaInput';
import { FileInput } from './Forms/FileInput';
import './App.css';
import { MultipleChoiceInput } from './Forms/MultipleChoice';



function App() {

  const [textFields, setTextFields] = useState<string[] | null>(null);
  const [fileFields, setFileFields] = useState<File[] | null>(null);
  const [multiChoiceFields, setMultiChoiceFields] = useState<string[] | null>(null);

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

  return (
    <>
      <h1>Gettin Started</h1>
      <div><TextInput field="Text Input #1:" updateMain={updateTextFields} /></div>
      <div><TextAreaInput field="Text Area #2:" updateMain={updateTextFields} /></div>
      <div><FileInput type={'audio'} updateMain={updateFileFields} /></div>
      <div><FileInput type={'video'} updateMain={updateFileFields} /></div>
      <div><MultipleChoiceInput field={'Multiple Choice'} updateMain={updateTextFields} /></div>



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
