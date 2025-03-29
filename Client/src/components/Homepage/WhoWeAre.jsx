import React from "react";

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-[#c2ccd4] text-black py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative Background Element */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#022B50] opacity-10 rounded-full blur-3xl" />

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center text-black">
          We’re CivicConnect
        </h1>

        {/* Overview Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xl md:text-2xl leading-relaxed">
            We’re here to make cities work better. With AI and a passion for community, we turn your reports into action—fast and anonymously.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Smart AI",
              description: "Our tech sorts and sends reports to the right people instantly.",
            },
            {
              title: "Total Privacy",
              description: "Blockchain keeps you anonymous, no questions asked.",
            },
            {
              title: "Community Voice",
              description: "Upvote what matters most to your neighborhood.",
            },
            {
              title: "Rewards That Matter",
              description: "Get props for sparking real change.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-[#022B50] p-6 rounded-xl shadow-md border-l-4 border-[#c2ccd4]`}
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-300">{feature.title}</h2>
              <p className="text-gray-100">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="mt-20 text-center">
          <p className="text-xl md:text-2xl text-black mb-6 max-w-3xl mx-auto">
            We’re building a tool for you—one that listens and delivers.
          </p>
          <button className="px-8 py-4 bg-[#022B50] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#c2ccd4] transition-colors duration-300">
            Start Reporting
          </button>
        </div>

        {/* Decorative Bottom Element */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#022B50] opacity-10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default WhoWeAre;
