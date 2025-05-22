import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const devIconClassName = (techName: string) => {
  const normaLizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normaLizedTechName]
    ? `${techMap[normaLizedTechName]} colored`
    : "devicon-devicon-plain";
};
