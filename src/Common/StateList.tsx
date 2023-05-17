import { useSupabase } from "./useSupabase";


export function StateList() {

  const activity = useSupabase('activities', '*');

  console.log(activity);

  const results = ['question_1', 'question_2', 'question_3', 'question_4', 'question_5'];

  return (
    <div className='form-item state-list'>
      <div className="form-body">
        <h2>Results, fetched from Supabase</h2>
        <ol>
          {activity ?
            results.map((question, i) => <li key={`answers-${i * 7}`}>{activity[question]?.response || activity[question]?.file_name }</li>) :
            <h3>Loading...</h3>}
        </ol>
      </div>
    </div>
  );
}
