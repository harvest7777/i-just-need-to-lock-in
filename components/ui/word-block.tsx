import React from "react";

interface WordBlockProps extends React.ComponentPropsWithRef<"p"> {
  text: string;
}
const WordBlock: React.FC<WordBlockProps> = ({
  text,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <p
      {...props}
      onClick={onClick}
      className={`outline-none px-2 md:text-2xl text-xl bg-app-bg flex flex-row items-center justify-center align-middle gap-x-2 rounded-xl ${className}`}
    >
      {text}
      {children}
    </p>
  );
};

export default WordBlock;
