import { DEFAULT_EMPTY } from "@/constants/states";
import Image from "next/image";
import Link from "next/link";

interface Props<T> {
  success: boolean;
  error?: { message: string; details?: Record<string, string[]> };
  data?: T[] | null | undefined;
  empty?: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkelitonProps {
  image: {
    dark: string;
    light: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkelitonProps) => (
  <div className="mt-16 w-full flex flex-col items-center justify-center">
    <Image
      src={image.light}
      alt={image.alt}
      width={270}
      height={200}
      className="block object-contain dark:hidden"
    />
    <Image
      src={image.dark}
      alt={image.alt}
      width={270}
      height={200}
      className="hidden object-contain dark:block"
    />
    <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
    <p className="body-regular text-dark500_light700 my-3.5 text-center max-w-md">
      {message}
    </p>
    {button && (
      <Link
        href={button.href}
        className="paragraph-medium mt-5 bg-primary-500 min-h-[46px]
         rounded-lg px-4 py-3 text-light-900 hover:opacity-90"
      >
        {button.text}
      </Link>
    )}
  </div>
);

const DataRenderer = <T, _>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: Props<T>) => {
  if (!success) {
    return (
      <StateSkeleton
        image={{
          dark: "/images/dark-error.png",
          light: "/images/light-error.png",
          alt: "Error state illustration",
        }}
        title={error?.message || DEFAULT_EMPTY.title}
        message={
          error?.details ? JSON.stringify(error.details) : DEFAULT_EMPTY.message
        }
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <StateSkeleton
        image={{
          dark: "/images/dark-illustration.png",
          light: "/images/light-illustration.png",
          alt: "Empty state illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  }
  return <div>{render(data)}</div>;
};

export default DataRenderer;
