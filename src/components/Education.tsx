import React from 'react';

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Tech University",
    period: "2016 - 2018",
    details: "Focus on Distributed Systems and Machine Learning"
  },
  {
    degree: "Bachelor of Science in Computer Engineering",
    school: "Engineering College",
    period: "2012 - 2016",
    details: "Graduated with Honors"
  }
];

export default function Education() {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-gray-200 pl-4">
            <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
            <p className="text-gray-600">{edu.school} | {edu.period}</p>
            <p className="text-gray-700 mt-1">{edu.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}