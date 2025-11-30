import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { date } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const techDescriptionMap: { [key: string]: string } = {
  javascript:
    "JavaScript is a powerful language for building dynamic, interactive, and modern web applications.",
  typescript:
    "TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.",
  react:
    "React is a popular library for building fast and modular user interfaces.",
  nextjs:
    "Next.js is a React framework for server-side rendering and building optimized web applications.",
  nodejs:
    "Node.js enables server-side JavaScript, allowing you to create fast, scalable network applications.",
  python:
    "Python is a versatile language known for readability and a vast ecosystem, often used for data science and automation.",
  java: "Java is an object-oriented language commonly used for enterprise applications and Android development.",
  cplusplus:
    "C++ is a high-performance language suitable for system software, game engines, and complex applications.",
  git: "Git is a version control system that tracks changes in source code during software development.",
  docker:
    "Docker is a container platform that simplifies application deployment and environment management.",
  mongodb:
    "MongoDB is a NoSQL database for handling large volumes of flexible, document-based data.",
  mysql:
    "MySQL is a popular relational database, known for reliability and ease of use.",
  postgresql:
    "PostgreSQL is a robust open-source relational database with advanced features and strong SQL compliance.",
  aws: "AWS is a comprehensive cloud platform offering a wide range of services for deployment, storage, and more.",
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export const devIconClassName = (techName: string) => {
  const normaLizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normaLizedTechName]
    ? `${techMap[normaLizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTimestamb = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = Date.now();
  const then = date.getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) {
    return `${diffSec} second${diffSec !== 1 ? "s" : ""} ago`;
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
  }

  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) {
    return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
};
