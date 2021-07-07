import React from "react";

export default function CardLayout({
  children,
  title = "title",
  category = "category",
  width = "3xl:w-4/12 lg:w-6/12 md:w-full",
}) {
  return (
    <div className={`p-8 border-black border-b-2 border-r border-l ${width}`}>
      <div className='mb-10'>
        <p className='mb-1'>{category}</p>
        <h2 className='text-6xl'>{title}</h2>
      </div>
      {children}
    </div>
  );
}
