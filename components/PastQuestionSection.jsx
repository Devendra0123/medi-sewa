import React from 'react';
import QuestionCard from './QuestionCard'

const PastQuestionSection = ({questions}) => {
  return (
    <div className='mt-[30px] bg-slate-200 p-[20px] ' >
        <h2 className='text-center font-bold text-xl'>
            Past Year Questions Collection
        </h2>

        {
            questions?.map((item,index)=>(
                <QuestionCard key={index} question={item} />
            ))
        }
    </div>
  )
}

export default PastQuestionSection