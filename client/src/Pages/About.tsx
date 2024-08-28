import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          Our mission is to empower individuals with knowledge, inspire creativity, and connect like-minded people through insightful content. We believe in the power of information and aim to make a positive impact in the lives of our readers.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg mb-4">
          Founded in [Year], our blog started as a small project among friends passionate about [Topic/Niche]. Over time, we’ve grown into a platform where writers, experts, and enthusiasts share their knowledge and experiences with a broader audience.
        </p>
        <p className="text-lg mb-4">
          From humble beginnings, we’ve expanded our content to cover a wide range of topics, all aimed at providing value and fostering a community of curious and engaged readers.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-lg mb-4">
          Our team is a diverse group of individuals with a shared passion for [Your Blog's Focus]. Each team member brings unique skills and perspectives, contributing to the rich variety of content we offer.
        </p>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src="[Team Member Image URL]" alt="Team Member Name" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">Team Member Name</h3>
              <p className="text-gray-700 mb-4">Role/Title</p>
              <p className="text-gray-600">Brief bio about the team member and their contributions to the blog.</p>
            </div>
          </div>
          {/* Repeat for other team members */}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <p className="text-lg mb-4">
          Our blog features a wide range of content, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">In-depth articles on [Topic 1]</li>
          <li className="mb-2">How-to guides and tutorials on [Topic 2]</li>
          <li className="mb-2">Opinion pieces and editorials on [Topic 3]</li>
          <li className="mb-2">Interviews with industry experts and influencers</li>
          <li className="mb-2">Community discussions and reader-submitted content</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <p className="text-lg mb-4">
          We adhere to a set of core values that guide our work:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">Integrity: We prioritize honesty and transparency in all our content.</li>
          <li className="mb-2">Quality: We are committed to providing well-researched and well-written articles.</li>
          <li className="mb-2">Community: We value the contributions and engagement of our readers.</li>
          <li className="mb-2">Innovation: We continually seek to improve and expand our content offerings.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
        <p className="text-lg mb-4">
          Interested in contributing to our blog? We’re always looking for passionate writers and experts to join our team. Whether you have a single article idea or want to become a regular contributor, we’d love to hear from you.
        </p>
        <p className="text-lg mb-4">
          Contact us at [Contact Email] to learn more about how you can get involved.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
        <p className="text-lg mb-4">
          Follow us on social media to stay updated on the latest articles, news, and events. Join our community and be part of the conversation!
        </p>
        <div className="flex space-x-4">
          <a href="[Facebook URL]" className="text-blue-600 hover:underline">Facebook</a>
          <a href="[Twitter URL]" className="text-blue-400 hover:underline">Twitter</a>
          <a href="[Instagram URL]" className="text-pink-600 hover:underline">Instagram</a>
          {/* Add other social media links */}
        </div>
      </section>
    </div>
  );
};

export default About;
