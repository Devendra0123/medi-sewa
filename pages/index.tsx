import type { GetStaticProps } from 'next'

import {HeroBanner,ProductSection,FAQ,PdfSection,PastQuestionSection, MedicalBookSection, SecondHandMarket} from '../components'
import DeliverySection from '../components/DeliverySection';
import ChatBot from '../components/ChatBot';

import {client} from '../lib/client';
import type {MedicalBookType,ProductType,BannerType,EbookType,PastYearQuestionType} from '../type'

type Props = {
  item: ProductType,
  scrubProducts: ProductType[],
  dentalProducts: ProductType[],
  bannerData: BannerType[],
  ebooks: EbookType[],
  pastQuestions: PastYearQuestionType[],
  medicalBooks: MedicalBookType[],
  oldBooks: MedicalBookType[],
  oldProducts: ProductType[]
}
const Home: React.FC<Props> = ({ scrubProducts,oldProducts,oldBooks, bannerData, dentalProducts, ebooks, pastQuestions,medicalBooks }) => {

  return (
    <div className=''>
      <HeroBanner bannerData={bannerData} />
      <ProductSection products={scrubProducts} category='scrub' store='Scrub store' bgChange={false} />
      <ProductSection products={dentalProducts} category='dental-products' store='Dental store' bgChange={true} />
      <MedicalBookSection books={medicalBooks} />
      <DeliverySection />
      <PdfSection ebooks={ebooks} />
      <PastQuestionSection questions={pastQuestions} />
      <SecondHandMarket products={oldProducts} books={oldBooks} />
      <FAQ />
      <ChatBot />
    </div>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bookQuery = '*[_type == "medical-books"]';
  const medicalBooks = await client.fetch(bookQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const ebookQuery = '*[_type == "ebook"]';
  const ebooks = await client.fetch(ebookQuery);

  const pastQuestionQuery = `*[_type == "pastYearQuestions"]{
    program,
    year,
    "pdfURL": file.asset->url
  }`;
  const pastQuestions = await client.fetch(pastQuestionQuery);

  const scrubProducts = products.filter((item: any)=> item.categories[0] === 'scrub' && item.newOrOld[0] === 'new');
  
  const dentalProducts = products.filter((item: any)=> item.categories[0] === 'dental-products' && item.newOrOld[0] === 'new');

  const oldProducts = products.filter((item: any)=> item.newOrOld[0] === 'old');
  const oldBooks = medicalBooks.filter((item: any)=> item.newOrOld[0] === 'old');

  if(scrubProducts.length > 3) scrubProducts.length = 3;
  if(dentalProducts.length > 3) dentalProducts.length = 3;
  if(medicalBooks.length > 4) medicalBooks.length = 4;
  if(oldBooks.length > 4) oldBooks.length = 4;
  if(oldProducts.length > 4) oldProducts.length = 4;
 
  return {
    props: {
      medicalBooks,scrubProducts,oldProducts,oldBooks, bannerData, dentalProducts, ebooks, pastQuestions
    }
  }
}
export default Home
