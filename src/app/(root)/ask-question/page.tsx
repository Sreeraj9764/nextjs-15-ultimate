import QuestionForm from "@/components/form/QuestionForm";
import React from "react";

const AskQuestion = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a public quesiton</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskQuestion;
