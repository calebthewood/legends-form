import { useState, ChangeEvent, useEffect } from "react";
import { NavBtns } from "./NavBtns";
import { updateActivity } from '../Common/updateActivity'


interface IFileInputProps {
  field: {
    file_name: string | null;
    type: 'audio' | 'video';
    question: string;
  };
  prevStep: () => void;
  nextStep: () => void;
  step: number;
}

export function FileInput({ field, step, prevStep, nextStep }: IFileInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /** Resets form when 'type' changes. Needed b/c browser cacheing*/
  useEffect(() => {
    setFile(null);
    setError(false);
    setSuccess(false);
  }, [field.type]);

  const fileTypes = {
    audio: {
      prompt: 'Please upload an audio recording describing xyz.',
      accepts: 'audio/*',
      label: 'Upload Audio Clip'
    },
    video: {
      prompt: 'Please upload an video recording describing xyz.',
      accepts: 'video/*',
      label: 'Upload Video Clip'
    }
  };

  function handleSubmit() {
    if (!file) {
      setSuccess(false);
      setError(true);
    } else {
      updateActivity(field.type === 'audio' ? 'question_5' : 'question_4', { ...field, file_name: file.name });
      setSuccess(true);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setError(false);
    console.log(event.target.files);
    const newFile = event.target.files?.[0] || null;
    setFile(newFile);
  }

  return (
    <div className="form-item">
      <div className='form-body'>
        <label className='form-label' htmlFor="file-input">{fileTypes[field.type].label}</label>
        <p>{field.question}</p>
        <input
          type="file"
          name="file-input"
          // value={''}
          className={error ? 'input-error' : success ? 'input-success' : ''}
          accept={fileTypes[field.type].accepts}
          onChange={handleChange} />
      </div>
      <NavBtns handleSubmit={handleSubmit} success={success} step={step} prevStep={prevStep} nextStep={nextStep} />
    </div>
  );
}
