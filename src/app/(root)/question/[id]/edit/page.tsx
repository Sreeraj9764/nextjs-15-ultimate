import { auth } from "@/auth";
import QuestionForm from "@/components/form/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { RouteParams } from "../../../../../../types/global";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;

  if (!id) {
    return notFound();
  }
  const session = await auth();
  if (!session?.user) {
    return redirect(ROUTES.SIGN_IN);
  }

  const { data: question, success } = await getQuestion({ questionId: id });

  if (!success || !question) {
    return notFound();
  }

  if (question.author.toString() !== session.user.id) {
    return redirect(ROUTES.QUESTION(id));
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <QuestionForm question={JSON.parse(JSON.stringify(question))} />
      </div>
    </>
  );
};

export default EditQuestion;
