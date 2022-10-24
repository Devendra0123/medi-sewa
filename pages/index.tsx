import type { GetStaticProps } from 'next'

import {HeroBanner,ProductSection,FAQ,PdfSection,PastQuestionSection} from '../components'
import DeliverySection from '../components/DeliverySection';
import ChatBot from '../components/ChatBot';

import {client} from '../lib/client';
import type {ProductType,BannerType,EbookType,PastYearQuestionType} from '../type'
type Props = {
  item: ProductType,
  scrubProducts: ProductType[],
  dentalProducts: ProductType[],
  bannerData: BannerType[],
  ebooks: EbookType[],
  pastQuestions: PastYearQuestionType[],
}
const Home: React.FC<Props> = ({ scrubProducts, bannerData, dentalProducts, ebooks, pastQuestions }) => {
 
  return (
    <div className=''>
      <HeroBanner bannerData={bannerData} />
      <ProductSection products={scrubProducts} category='scrub' store='Scrub store' bgChange={false} />
      <ProductSection products={dentalProducts} category='dental-products' store='Dental store' bgChange={true} />
      <DeliverySection />
      <PdfSection ebooks={ebooks} />
      <PastQuestionSection questions={pastQuestions} />
      <FAQ />
      <ChatBot />
    </div>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

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

  const scrubProducts = products.filter((item: any)=> item.categories[0] === 'scrub');
  const dentalProducts = products.filter((item: any)=> item.categories[0] === 'dental-products');

  if(scrubProducts.length > 3) scrubProducts.length = 3;
  if(dentalProducts.length > 3) dentalProducts.length = 3;
 
  return {
    props: {
      scrubProducts, bannerData, dentalProducts, ebooks, pastQuestions
    }
  }
}
export default Home
