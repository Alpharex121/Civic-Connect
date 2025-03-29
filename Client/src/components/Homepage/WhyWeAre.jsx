import React from "react";

const WhyWeAre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#022B50] to-[#101117] text-[#c2ccd4] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative Background Element */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#1E3A8A] opacity-10 rounded-full blur-3xl" />

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center text-white">
          Why CivicConnect?
        </h1>

        {/* Core Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[ 
            {
              title: "Faster Fixes",
              description: "No more waiting. AI gets your issue to the right hands, pronto.",
            },
            {
              title: "Your Shield",
              description: "Stay safe and unseen while making a difference.",
            },
            {
              title: "Louder Together",
              description: "Your vote amplifies what needs fixing most.",
            },
            {
              title: "See the Change",
              description: "Watch your city improve, one solved problem at a time.",
            },
          ].map((reason, index) => (
            <div
              key={index}
              className={`bg-[#1E40AF] p-8 rounded-xl shadow-md border-t-4 ${
                index % 2 === 0 ? "border-[#4F46E5]" : "border-[#4338CA]"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#EAEAEA]">{reason.title}</h2>
              <p className="text-[#E0E7FF] text-lg">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="mt-20 text-center">
          <p className="text-xl md:text-2xl text-[#EAEAEA] mb-6 max-w-3xl mx-auto">
            Because your city deserves better—and you deserve a say.
          </p>
          <div className="w-32 h-1 bg-[#4F46E5] mx-auto" />
        </div>

        {/* Decorative Bottom Element */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#1E3A8A] opacity-10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default WhyWeAre;
