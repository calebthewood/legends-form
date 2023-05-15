import { useState, ChangeEvent, useEffect } from "react";
import { SubmitBtn } from "./SubmitBtn";


interface IFileInputProps {
  type: 'audio' | 'video';
  updateMain: (p: string | null) => void;
}


export function FileInput({ type, updateMain }: IFileInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /** Resets form when 'type' changes. Needed b/c browser cacheing*/
  useEffect(() => {
    setFile(null);
    setError(false);
    setSuccess(false);
  }, [type]);

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
      <label htmlFor="file-input">{fileTypes[type].label}</label>
      <p>{fileTypes[type].prompt}</p>
      <input
        type="file"
        name="file-input"
        // value={''}
        className={error ? 'input-error' : success ? 'input-success' : ''}
        accept={fileTypes[type].accepts}
        onChange={handleChange} />
      <SubmitBtn handleSubmit={handleSubmit} success={success} />
    </div>
  );
}
