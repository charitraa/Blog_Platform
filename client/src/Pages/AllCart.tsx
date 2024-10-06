import Card from "../components/Card";

const AllCart = () => {
  return (
    <div className="p-10 bg-gray-100">
      <Card
        title="Your portfolio is stopping you from getting that job"
        description="An intense way to learn about the process and practice your design skills..."
        tags={['Portfolio']}
        timeToRead="3 min read"
        image="https://via.placeholder.com/300"
      />
      <Card
        title="Melody mobile app: a UI UX case study"
        description="An intense way to learn about the process and practice your design skills..."
        tags={['UI UX Design']}
        timeToRead="3 min read"
        image="https://via.placeholder.com/300"
      />
      <Card
        title="Wellness app: a UI UX case study"
        description="An intense way to learn about the process and practice your design skills..."
        tags={['UI UX Design']}
        timeToRead="3 min read"
        image="https://via.placeholder.com/300"
      />
    </div>
  );
};

export default AllCart;
