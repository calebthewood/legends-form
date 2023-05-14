

interface IStateListFields {
  textFields: string[] | null;
  fileFields: string[] | null;
  multiChoiceFields: string[] | null;
}

export function StateList({textFields, fileFields, multiChoiceFields}: IStateListFields) {

  return <>
    <ol>
      <h2>Answer List:</h2>
      {textFields && textFields.map((field, i) =>
        <li key={`answers-${i * 7}`}>{field}</li>)}
    </ol>

    <ol>
      <h2>File List:</h2>
      {fileFields && fileFields.map((field, i) =>
        <li key={`answers-${i * 7}`}>{field}</li>)}
    </ol>

    <ol>
      <h2>MultiChoice List:</h2>
      {multiChoiceFields && multiChoiceFields.map((field, i) =>
        <li key={`answers-${i * 7}`}>{field}</li>)}
    </ol>
  </>;
}