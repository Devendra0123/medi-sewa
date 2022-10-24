import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Categories = ({categories, path}) => {

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories?.map((category, index) => (
        <Link key={index} href={{
          pathname: `/${path}`,
          query: { category: `${category.id}` },
        }}>
          <span className={`font-[poppins] text-lg cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3 hover:text-orange-500`}>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;