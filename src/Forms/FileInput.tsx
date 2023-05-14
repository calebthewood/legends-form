import { useState, ChangeEvent, FormEvent } from "react";


interface IFileInputProps {
  type: 'audio' | 'video';
  updateMain: (p: string | null) => void;
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
    console.log(file);
    if (!file) {
      setError(true);
      return;
    }
    updateMain(file.name);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setError(false);
    console.log(event.target.files);
    const newFile = event.target.files?.[0];
    if (!newFile) return;
    setFile(file);
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
