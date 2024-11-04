import React from 'react';

const skills = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java"],
  "Frontend": ["React", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "Django", "PostgreSQL"],
  "Tools": ["Git", "Docker", "AWS", "Jenkins"]
};

export default function Skills() {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}