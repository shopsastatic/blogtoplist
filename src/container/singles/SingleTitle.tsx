import React, { FC } from "react";

export interface SingleTitleProps {
  title: string;
  className?: string;
  mainClass?: string;
}

const SingleTitle: FC<SingleTitleProps> = ({
  mainClass = "",
  className = "",
  title,
}) => {
  return (
    <h1
      className={className + "main-post-title " + mainClass}
      title={title}
      dangerouslySetInnerHTML={{ __html: title || "" }}
    ></h1>
  );
};

export default SingleTitle;
