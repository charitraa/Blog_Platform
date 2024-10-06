import React from "react";

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  timeToRead: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, description, tags, timeToRead, image }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={image} alt="Card Image" />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">{timeToRead}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
