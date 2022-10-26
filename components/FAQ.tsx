import React,{ useState } from 'react'
import {data} from '../utils/data';
import {FiPlus} from 'react-icons/fi'
import {AiOutlineMinus} from 'react-icons/ai';

const FAQ = () => {

    const [questionIndex, setQuestionIndex] = useState<number>();
    const [toggle, setToggle] = useState(false)
    const handleFaq = (index:number)=>{
        setToggle(!toggle)
        setQuestionIndex(index);
    }

    const toggleStyle = 'h-0 w-0 transition-all ease-in-out delay-150';
    const activeToggleStyle = 'h-fit w-full transition-all ease-in-out delay-150'
  return (
    <div className='flex justify-center mt-[70px] px-[10px]'>
        <div className='flex flex-col w-full md:w-[80%]'>
            <h2 className='text-center font-bold text-4xl'>
                Frequently Asked Questions
            </h2>
            <div>
                {
                  data.map((item,index)=>(
                    <div key={index} className='pt-[30px] shadow-xl '>
                        <div className='flex justify-between items-center cursor-pointer'
                           onClick={()=> handleFaq(index)}
                        >
                          <h3 className='flex-1 font-[poppins] font-medium text-xl p-[5px]'>
                            Q. {item.question}
                          </h3>
                          {
                            toggle ? null :  <FiPlus />
                          }
                         
                        </div>
                        {
                            (questionIndex === index && toggle) && 
                            <div className={toggle ? activeToggleStyle : toggleStyle}>
                                <p className='font-[poppins] pl-[30px] py-[5px]'>
                                    {item.answer}
                                </p>
                            </div>
                        }
                    </div>
                  ))
                }
            </div>
        </div>
    </div>
  )
}

export default FAQ