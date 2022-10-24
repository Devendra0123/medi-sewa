import React from 'react';
import { client } from '../../lib/client';
import QuestionCard from '../../components/QuestionCard'

const Index = ({questions}) => {
    return (
        <div className="bg-teal-100 rounded p-[20px]  mt-[50px]" >
            <div className="flex flex-wrap justify-center gap-[70px]">
                 
            {
            questions?.map((item,index)=>(
                <QuestionCard key={index} question={item} />
            ))
        }
            </div>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const pastQuestionQuery = `*[_type == "pastYearQuestions"]{
        program,
        year,
        "pdfURL": file.asset->url
      }`;

    const questions = await client.fetch(pastQuestionQuery);
    return {
        props: {
            questions
        },
        revalidate: 10,
    }
}

export default Index