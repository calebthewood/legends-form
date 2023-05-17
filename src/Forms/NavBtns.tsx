import ConfettiExplosion from "react-confetti-explosion";


interface INavBtnsProps {
  handleSubmit: () => void;
  success: boolean;
  prevStep: () => void;
  nextStep: () => void;
  step: number;
}

const STEP_MAX = 6;
const STEP_MIN = 0;

export function NavBtns({ handleSubmit, success, step, prevStep, nextStep  }: INavBtnsProps) {

  function handleProgress() {
    if (success) {
      nextStep()
    } else {
      handleSubmit()
    }
  }
  return (
    <div className='nav-btns'>
      {step > STEP_MIN && <button className='back' onClick={prevStep} disabled={step <= 0}>Back</button>}
      <span className="confetti">{success && <ConfettiExplosion />}</span>
      {step < STEP_MAX && <button className='next' onClick={handleProgress} >{success ? 'Next' : 'Submit'}</button>}
    </div>
  );
}
