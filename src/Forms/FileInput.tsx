import { useState, ChangeEvent, useEffect } from "react";
import { SubmitBtn } from "./SubmitBtn";
import { updateActivity } from "../db";


interface IFileInputProps {
  field: {
    file_name: string | null;
    type: 'audio' | 'video';
    question: string;
  };
  updateMain: (p: string | null) => void;
}

export function FileInput({ field, updateMain }: IFileInputProps) {
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
      updateMain(file.name);
      updateActivity({
        column: field.type === 'audio' ? 'question_4' : 'question_5',
        key: 'response',
        value: file.name
      });
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
      <label htmlFor="file-input">{fileTypes[field.type].label}</label>
      <p>{field.question}</p>
      <input
        type="file"
        name="file-input"
        // value={''}
        className={error ? 'input-error' : success ? 'input-success' : ''}
        accept={fileTypes[field.type].accepts}
        onChange={handleChange} />
      <SubmitBtn handleSubmit={handleSubmit} success={success} />
    </div>
  );
}
