import ConfettiExplosion from "react-confetti-explosion";

interface ISubmitBtnProps {
  handleSubmit: () => void;
  success: boolean;
}

export function SubmitBtn({ handleSubmit, success }: ISubmitBtnProps) {

  return (
    <>
      {success && <span className="confetti"><ConfettiExplosion /></span>}
      <button
        onClick={handleSubmit}
        className='submit-btn'
        disabled={success}>{success ? 'Submitted' : 'Submit'}</button>
    </>
  );
}