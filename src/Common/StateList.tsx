
interface IStateListFields {
  textFields: string[] | null;
  fileFields: string[] | null;
  multiChoiceFields: string[] | null;
}

export function StateList({ textFields, fileFields, multiChoiceFields }: IStateListFields) {

  return (
    <div className='form-item state-list'>
      <ol>
        <h3>Text List:</h3>
        {textFields && textFields.map((field, i) =>
          <li key={`answers-${i * 7}`}>{field}</li>)}
      </ol>

      <ol>
        <h3>File List:</h3>
        {fileFields && fileFields.map((field, i) =>
          <li key={`answers-${i * 7}`}>{field}</li>)}
      </ol>

      <ol>
        <h3>MultiChoice List:</h3>
        {multiChoiceFields && multiChoiceFields.map((field, i) =>
          <li key={`answers-${i * 7}`}>{field}</li>)}
      </ol>
    </div>
  );
}
