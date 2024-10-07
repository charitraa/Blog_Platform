interface ArticleCardProps {
  title: string;
  description: string;
  tags: string[];
  timeToRead: string;
  image: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, tags, timeToRead, image }) => {
  return (
    <div className="flex space-x-4 border-b py-4">
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex space-x-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-xs">{timeToRead}</span>
        </div>
      </div>
      <img src={image} alt={title} className="w-24 h-24 object-cover rounded-lg" />
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="p-6 space-y-6 flex-grow">
      <ArticleCard
        title="Your portfolio is stopping you from getting that job"
        description="An intense way to learn about the process and practice your design skills..."
        tags={['Portfolio']}
        timeToRead="3 min read"
        image="https://via.placeholder.com/100"
      />
      <ArticleCard
        title="Melody mobile app: a UI UX case study"
        description="An intense way to learn about the process and practice your design skills..."
        tags={['UI UX Design']}
        timeToRead="3 min read"
        image="https://via.placeholder.com/100"
      />
      <ArticleCard
        title="Wellness app: a UI UX case study"
        description="An intense way to learn about the process and practice your design skills..."
        tags={['UI UX Design']}
        timeToRead="3 min read"
        image="https://via.placeholder.com/100"
      />
    </div>
  );
};

export default MainContent;
