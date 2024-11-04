import React from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Senior Software Engineer",
    company: "Tech Corp",
    period: "2020 - Present",
    description: [
      "Led development of microservices architecture",
      "Improved system performance by 40%",
      "Mentored junior developers"
    ]
  },
  {
    title: "Software Developer",
    company: "StartUp Inc",
    period: "2018 - 2020",
    description: [
      "Developed full-stack applications using React and Node.js",
      "Implemented CI/CD pipelines",
      "Reduced deployment time by 60%"
    ]
  }
];

export default function Experience() {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-gray-200 pl-4">
            <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
            <p className="text-gray-600">{exp.company} | {exp.period}</p>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}