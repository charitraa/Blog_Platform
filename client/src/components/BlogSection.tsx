import React from "react";

interface BlogPost {
  date: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  postImage: string;
}

const blogPosts: BlogPost[] = [
  {
    date: "Mar 16, 2020",
    category: "Marketing",
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Rerum velit odio dolores nulla et.",
    author: "Michael Foster",
    authorTitle: "Co-Founder / CTO",
    authorImage: "https://via.placeholder.com/40",
    postImage: "https://via.placeholder.com/300",
  },
  {
    date: "Mar 16, 2020",
    category: "Marketing",
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Rerum velit odio dolores nulla et.",
    author: "Michael Foster",
    authorTitle: "Co-Founder / CTO",
    authorImage: "https://via.placeholder.com/40",
    postImage: "https://via.placeholder.com/300",
  },
  {
    date: "Feb 12, 2020",
    category: "Business",
    title: "Improve your customer experience",
    description:
      "Dolore commodo in nulla do nulla esse consectetur. Adipisicing voluptate velit sint adipsicing ex duis elit deserunt sint ipsum. Culpa in exercitation magna adipiscing id reprehenderit consectetur culpa eu cillum.",
    author: "Tom Cook",
    authorTitle: "Director of Product",
    authorImage: "https://via.placeholder.com/40",
    postImage: "https://via.placeholder.com/300",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">From the blog</h2>
          <p className="mt-4 text-lg text-gray-500">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mt-12 space-y-12">
          {blogPosts.map((post, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start">
              <img
                src={post.postImage}
                alt={post.title}
                className="w-full sm:w-1/3 h-48 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
              />
              <div>
                <p className="text-sm text-gray-500">
                  <time dateTime={post.date}>{post.date}</time> 
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded">{post.category}</span>
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{post.title}</p>
                <p className="mt-3 text-base text-gray-500">{post.description}</p>
                <div className="mt-6 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post.authorImage}
                    alt={post.author}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.authorTitle}</p>
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
