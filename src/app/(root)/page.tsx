import { auth, signOut } from "@/auth";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      // { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    tags: [
      // { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;
  let processedQuestions = [...questions]; // Start with a copy of all questions

  // 1. Filter by search query (if provided)
  if (query) {
    processedQuestions = processedQuestions.filter((question) =>
      question.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // 2. Apply the selected filter (if provided)
  if (filter) {
    switch (filter) {
      case "react":
        processedQuestions = processedQuestions.filter((question) =>
          question.tags.some((tag) => tag.name.toLowerCase() === filter)
        );
        break;
      case "javascript":
        // Filter by tag name (case-insensitive)
        processedQuestions = processedQuestions.filter((question) =>
          question.tags.some((tag) => tag.name.toLowerCase() === filter)
        );
        break;
      case "newest":
        processedQuestions.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case "popular":
        // Assuming higher upvotes means more popular. Could also consider views.
        processedQuestions.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "unanswered":
        processedQuestions = processedQuestions.filter(
          (question) => question.answers === 0
        );
        break;
      case "recommended":
        // Placeholder: Implement logic for recommended questions.
        // This might involve more complex algorithms or user-specific data.
        break;
    }
  }
  const filteredQuestions = processedQuestions;

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
      <div className="mt-10 flex flex-col w-full gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
