/**
 * 3D Tech Icons Grid — Clean, modern, hover animation
 * Uses PNG icons with CSS 3D-like effects (no external libs)
 */

import React from "react";
import { useTranslation } from "react-i18next";

const techIcons = [
  { name: "HTML", src: "/icons/html.png" },
  { name: "CSS", src: "/icons/css.png" },
  { name: "JavaScript", src: "/icons/javascript.png" },
  { name: "Tailwind CSS", src: "/icons/tailwind.png" },
  { name: "React", src: "/icons/react.png" },
  { name: "Node.js", src: "/icons/nodejs.png" },
  { name: "Express", src: "/icons/express.png" },
  { name: "MongoDB", src: "/icons/mongodb.png" },
  { name: "Mongoose", src: "/icons/mongoos.png" },
  { name: "Git", src: "/icons/git.png" },
  { name: "GitHub", src: "/icons/github.png" },
  { name: "Docker", src: "/icons/docker.png" },
  { name: "Three.js", src: "/icons/three.png" },
];

const TechIconsGrid = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t("skills.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {techIcons.map((icon) => (
            <div
              key={icon.name}
              className="tech-card group relative flex flex-col items-center justify-center"
            >
              <div className="tech-icon-wrapper">
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="tech-icon"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {icon.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechIconsGrid;
