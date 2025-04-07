"use client";

import { Database, LineChart, Sparkles, Award, Clock } from "lucide-react";

const steps = [
  {
    icon: <Database className="h-8 w-8" />,
    title: "Data Collection",
    description: "Collect all transactions and interaction data from the blockchain."
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Pattern Analysis",
    description: "Analyze user behavior patterns based on collected data."
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "AI Processing",
    description: "AI integrates data to identify user characteristics and tendencies."
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Result Preparation",
    description: "Prepare personalized NFTs based on analyzed data over approximately 2 weeks. It may take longer depending on circumstances."
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "NFT Issuance",
    description: "Once prepared, issue a custom onchain personality NFT to the wallet address you provided."
  }
];

export function ProcessSteps() {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Analysis Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how your onchain data is processed and analyzed. You can receive results in your wallet within about 2 weeks after submission.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-[50%] top-0 h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="md:w-[45%] text-center md:text-left">
                  <div className={`${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="md:w-[10%] flex justify-center">
                  <div className="p-4 rounded-full bg-white border-2 border-blue-500 shadow-lg z-10">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 