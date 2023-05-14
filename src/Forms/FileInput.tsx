import { useState, ChangeEvent, FormEvent } from "react";



interface IFileInputProps {
  type: 'audio' | 'video';
  updateMain: (p: File | null) => void;
}

export function FileInput({ type, updateMain }: IFileInputProps) {

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!file) setError(true);
    if (!event)
      updateMain(file);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setError(false);
    const newFile = event.target.files?.[0];
    if (!newFile) return;
    setFile(newFile);
  }

  return (
    <form action="" className="form-item" onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="file-input">{fileTypes[type].label}</label>
      <input
        type="file"
        name="file-input"
        className={error ? 'input-error' : ''}
        accept={fileTypes[type].accepts}
        onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
}
