import React, { useState } from 'react';
import Link from 'next/link';

const Categories = ({ categories, path }) => {
  const [toggle, setToggle] = useState(false)
  const [questionIndex, setQuestionIndex] = useState();

  const inActiveStyle = `hidden flex flex-col font-medium text-md pl-[10px] z-10`;
  const activeStyle = `block flex flex-col font-medium text-md pl-[10px] z-10`;

  return (
    <div className="bg-orange-200 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories?.map((category, index) => (
        <div key={index}
          onClick={() => {
            if(category?.subCategory?.length === 0){
              return;
            }
            if (category?.subCategory?.length !== 0) {
              setToggle(!toggle)
              setQuestionIndex(index);
            }
          }}>
          <Link
            href={{
              pathname: `/${path}`,
              query: { category: `${category.id}` },
            }}>
            <span className={`font-[poppins] text-lg cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3 hover:text-orange-500`}>{category.name}</span>
          </Link>
          <div className={toggle && questionIndex === index ? activeStyle : inActiveStyle}>
            {
              category.subCategory?.map(item => (
                <Link key={item.id}
                  href={{
                    pathname: `/${path}`,
                    query: { category: `${category.id}`, subcategory:`${item?.id}` },
                  }}
                >
                  <p
                    className="p-[5px] hover:bg-orange-300 cursor-pointer">
                    {item.name}
                  </p>
                </Link>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;