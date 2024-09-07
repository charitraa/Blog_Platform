import React, { useState, useEffect } from "react";
import axiosInstance from "../Axois/Axois";

interface BlogPost {
  id: string;
  published_at: string;
  title: string;
  content: string;
  author: {
    first_name: string;
    last_name: string;
    username: string;
    photo: string;
  };
  photo: string;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get('/post/posts/')
      .then(response => {
        setBlogPosts(response.data);
        setLoading(false);
      })
      .catch(()=> {
        setError('Failed to fetch blog posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">From the blog</h2>
          <p className="mt-4 text-lg text-gray-500">
            Learn about technology, programming, and industry trends.
          </p>
        </div>
        <div className="mt-12 space-y-12 ">
          {blogPosts.map((post, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start cursor-pointer">
              <img
                src={`http://127.0.0.1:8000${post.photo}`}
                alt={post.title}
                className="w-full sm:w-1/3 h-60 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
              />
              <div>
                <p className="text-sm text-gray-500">
                  <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{post.title}</p>
                <p className="mt-3 text-base text-gray-500">{post.content}</p>
                <div className="mt-6 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`http://127.0.0.1:8000${post.author.photo}`}
                    alt={`${post.author.first_name} ${post.author.last_name}`}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {`${post.author.first_name} ${post.author.last_name}`}
                    </p>
                    <p className="text-sm text-gray-500">{post.author.username}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
