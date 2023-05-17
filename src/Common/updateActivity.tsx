import { supabase } from "../db";

interface ITextInputSchema {
  type: string;
  question: string;
  response: string | null;
  solution: string;
}

interface IMultiChoiceSchema {
  type: string;
  answers: string[];
  question: string;
  response: string | null;
  solution: string;
}

interface IFileInputSchema {
  type: "video" | "audio",
  question: string;
  file_name: string;
}

/**
 * Still considering whether to limit this to a couple functions or write a class to handle interacting with supabase client.
 */
export async function updateActivity(column: string, newJSON: ITextInputSchema | IMultiChoiceSchema | IFileInputSchema) {
  try {
    console.log(column, newJSON);

    const result = await supabase
      .from('activities')
      .update({ [column]: newJSON })
      .eq('id', 1).select();

    console.log(result)
    return result;
  } catch (e) {
    console.error(e);
  }
}