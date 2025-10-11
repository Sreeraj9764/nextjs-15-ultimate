import React from "react";
import { RouteParams } from "../../../../../types/global";

const QuestionDetailsPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>QuestionDetailsPage: {id}</div>;
};

export default QuestionDetailsPage;
