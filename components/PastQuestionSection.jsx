import React from 'react';
import QuestionCard from './QuestionCard'

const PastQuestionSection = ({ questions }) => {
  return (
    <div className='mt-[30px] bg-slate-200 p-[20px] ' >
      <h2 className='text-center font-bold text-xl'>
        Past Year Questions Collection
      </h2>
      <div className='w-full flex justify-start md:justify-center items-center flex-nowrap overflow-x-scroll md:flex-wrap'>
        {
          questions?.map((item, index) => (
            <QuestionCard key={index} question={item} />
          ))
        }
      </div>
    </div>
  )
}

export default PastQuestionSection