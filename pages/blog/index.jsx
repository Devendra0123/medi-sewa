import React,{ useState, useEffect } from 'react'
import { Categories } from '../../components'
import {blogCategories} from '../../utils/categories'
import { client } from '../../lib/client';
import BlogCard from '../../components/BlogCard';
import { useRouter } from 'next/router'

const Blogs = ({ blogs }) => {
  const router = useRouter();

  const [data, setData] = useState([]);
  
  useEffect(() => {     
      const category = router.query.category
      if (category) {
          const items = blogs?.filter(item => item.category === category);
          items ? setData(items) : setData([])
      } else {
          setData(blogs)
      }
  }, [router.query.category])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-[30px]">
      <div className="lg:col-span-8 col-span-1">
      {
        data?.map((item, index) => (
          <div key={index}>
            <BlogCard post={item} />
          </div>
        ))
      }
      </div>

      <div className="lg:col-span-4 col-span-1">
        <div className="lg:sticky relative top-8">
          <Categories categories={blogCategories} path='blog' />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const blogsQuery = '*[_type == "blog"]'

  const blogs = await client.fetch(blogsQuery);
  return {
    props: {
      blogs: blogs
    },
    revalidate: 10,
  }
}

export default Blogs