import React from "react";

const StepButton = ({ name }) => {
  return (
    <div className="mt-3">
      <button className="btn btn-primary" name={name}>
        <span className="mr-3">{name}</span>
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={`${name === "back" ? `rotate-180` : ``} `}
        >
          <path d="M15 5.829l6.171 6.171-6.171 6.171v-3.171h-13v-6h13v-3.171zm-2-4.829v6h-13v10h13v6l11-11-11-11z" />
        </svg>
      </button>
    </div>
  );
};

export default StepButton;
