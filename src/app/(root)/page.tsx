import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTIONS } from "@/constants/states";
import { getQuestiones } from "@/lib/actions/question.action";
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
      <DataRenderer
        success={success}
        error={error}
        data={questiones}
        empty={EMPTY_QUESTIONS}
        render={(questiones) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questiones.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Home;
