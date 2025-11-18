import { auth, signOut } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getQuestiones } from "@/lib/actions/question.action";
import { ValidationError } from "@/lib/http-errors";
import logger from "@/lib/logger";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestiones({
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 10,
    query,
    filter,
  });

  const { questiones } = data || {};
  logger.debug("Questiones fetched:", { questiones });

  return (
    <>
      <section
        className="flex w-full flex-col-reverse justify-between gap-4
      sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questiones</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3
         !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="icons/search.svg"
          placeholder="Search questions.."
          otherClassName="flex-1"
          route="/"
        />
      </section>
      <HomeFilter />
      {success ? (
        <div className="mt-10 flex flex-col w-full gap-6">
          {questiones && questiones.length > 0 ? (
            questiones.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">
                {" "}
                {error instanceof ValidationError
                  ? error.message
                  : "No questions found."}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mat-20 flex w-full items-center justify-center">
          <p className="text-dark400_light800">
            {error?.message || "Failed to load questions."}
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
