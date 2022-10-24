import React from 'react'

import { useRouter } from 'next/router';
import {blogCategories} from '../../utils/categories'
import { client, urlFor } from '../../lib/client';
import { PostDetails, Categories, Loader } from '../../components';

const BlogDetails = ({ blog, blogs }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
      }

    return (
        <div>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetails post={blog} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <Categories categories={blogCategories} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "book"] {
      slug {
        current
      }
    }
    `;

    const blogs = await client.fetch(query);

    const paths = blogs.map((item) => ({
        params: {
            slug: item.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "blog" && slug.current == '${slug}'][0]`;
    const blogsQuery = '*[_type == "blog"]'

    const blog = await client.fetch(query);
    const blogs = await client.fetch(blogsQuery);

    return {
        props: { blog, blogs }
    }
}

export default BlogDetails