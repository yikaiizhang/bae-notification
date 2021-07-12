import React from "react";

export default function CardLayout({
  children,
  title = "title",
  category = "category",
  width = "3xl:w-4/12 lg:w-6/12 w-full",
}) {
  return (
    <div
      className={`p-4 md:p-12 border-black border-b-2 border-r border-l overflow-hidden ${width}`}
    >
      <div className='mb-6 md:mb-10'>
        <p className='mb-1'>{category}</p>
        <h2 className='text-4xl md:text-6xl'>{title}</h2>
      </div>
      {children}
    </div>
  );
}
