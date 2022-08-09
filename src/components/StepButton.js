const StepButton = ({ name }) => {
  return (
    <div className="mt-3">
      <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-white rounded-full shadow-md text-slate-100 bg-slate-700 group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-slate-700 group-hover:translate-x-0 ease">
          <svg
            className={`${name === "back" && ` rotate-180`} w-6 h-6`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          {name}
        </span>
        <span className="relative invisible">{name}</span>
      </button>
    </div>
  );
};

export default StepButton;
