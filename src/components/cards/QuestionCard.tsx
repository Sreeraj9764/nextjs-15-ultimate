import React from "react";

interface Props {
  question: Question;
}

const QuestionCard = ({ question: { ...rest } }: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div
        className="flex flex-col-reverse items-start
         justify-between gap-5 sm:flex-row"
      >
        <div>
          <span>{String(rest.createdAt)}</span>
        </div>
      </div>
      <div>{rest.title}</div>
    </div>
  );
};

export default QuestionCard;
