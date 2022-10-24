import React from 'react'

const QuestionCard = ({ question }) => {
    return (
        <div>
            <div className='relative w-[13rem] h-[15rem] bg-white shadow-2xl flex flex-col items-center justify-center text-center rounded-lg mt-[20px] mr-[20px]'>
                <p className='font-[poppins] font-medium '>
                    {`${question.program[0].toUpperCase()} ${question.year[0].charAt(0).toUpperCase() + question.year[0].slice(1)}`} <br />questions collection
                </p>

                <a href={`${question.pdfURL}`} target="_blank" rel="noreferrer">
                    <button type='button'
                        className='w-[7rem] px-[10px] py-[7px] border-2 border-orange-500 text-orange-500 font-bold mt-[10px]'>
                        Open PDF
                    </button>
                </a>

                <a href={`${question.pdfURL}?dl=`} download >
                    <button type='button'
                        className='w-[7rem] px-[10px] py-[7px] bg-orange-500 mt-[10px] font-bold text-white'>
                        Download
                    </button>
                </a>

                <div className='absolute left-0 top-0'>
                    <div className='w-[2rem] h-[2rem] rounded-full bg-orange-500 '></div>
                    <div className='w-[0.5rem] h-[0.5rem] rounded-full bg-orange-500 ml-[2rem] '></div>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard