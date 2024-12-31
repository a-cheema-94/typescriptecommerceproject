import { useNavigate } from "react-router-dom"

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button 
      className="w-28 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white hover:cursor-pointer select-none flex gap-x-2 "
      onClick={() => navigate(-1)}
    >
      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
      </svg>
      Back
    </button>
  )
}

export default BackBtn