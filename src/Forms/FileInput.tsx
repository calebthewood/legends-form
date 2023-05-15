import { useState, ChangeEvent, useEffect } from "react";


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
      accepts: 'audio/*',
      label: 'Upload Audio Clip'
    },
    video: {
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
    <div className="form-item file-input">
      <label htmlFor="file-input">{fileTypes[type].label}</label>
      <input
        type="file"
        name="file-input"
        // value={''}
        className={error ? 'input-error' : success ? 'input-success' : ''}
        accept={fileTypes[type].accepts}
        onChange={handleChange} />
      <button
        onClick={handleSubmit}
        className='submit-btn'
        disabled={success}>{success ? 'Submitted' : 'Submit'}</button>
    </div>
  );
}
