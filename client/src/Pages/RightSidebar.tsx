const RightSidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-50 p-6 space-y-6">
      <button className="w-full bg-black text-white py-2 rounded-md">Get unlimited access</button>
      <div className="border-b pb-6">
        <h4 className="font-bold mb-3">What We're Reading Today</h4>
        <ul className="space-y-2">
          <li className="text-sm font-medium text-gray-800">Your portfolio is stopping you from getting that job</li>
          <li className="text-sm font-medium text-gray-800">Melody mobile app: a UI UX case study</li>
          <li className="text-sm font-medium text-gray-800">Wellness app: a UI UX case study</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-3">Recommended Topic</h4>
        <div className="flex flex-wrap gap-2">
          {['Technology', 'Money', 'Business', 'Productivity', 'Art', 'Mindfulness'].map((topic, index) => (
            <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded-md">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
