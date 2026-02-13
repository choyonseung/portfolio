import type { BadgeColor, BadgeVariant } from "@/components/common/Badge/Badge";

type SkillBadgeUI = {
  label: string;
  color: BadgeColor;
  variant: BadgeVariant;
};

export function getSkillBadgeStyle(skill: string): SkillBadgeUI {
  const raw = skill.trim();
  const s = raw.toLowerCase();

  /* Skill Color Policy */
  const colorMap: Record<string, BadgeColor> = {
    /* Platform / Environment */
    "responsive web": "success",
    "web": "success",
    "mobile": "success",
    "tablet": "success",
    "docker": "success",
    "aws": "success",

    /* Core Frontend */
    "html": "primary",
    "react": "primary",
    "next.js": "primary",
    "react native": "primary",

    /* Styling / UI */
    "scss": "pink",
    "sass": "pink",
    "css": "pink",
    "styled-components": "pink",
    "emotion": "pink",
    "tailwind css": "pink",

    /* Language */
    "typescript": "warning",
    "javascript": "warning",
    "jquery": "warning",

    /* Tooling */
    "vite": "info",
    "webpack": "info",
    "eslint": "info",
    "prettier": "info",
    "npm": "info",
    "yarn": "info",
    "pnpm": "info",
    "git": "info",
    "github": "info",

    /* Design / Docs */
    "storybook": "accent",
    "mui": "accent",
    "figma": "accent",
  };

  /* Label Normalization */
  const labelMap: Record<string, string> = {
    "responsive web": "Responsive Web",
    "web": "Web",
    "mobile": "Mobile",
    "tablet": "Tablet",
    "docker": "Docker",
    "aws": "AWS",

    "html": "HTML",
    "react": "React",
    "next.js": "Next.js",
    "react native": "React Native",

    "scss": "SCSS",
    "sass": "SASS",
    "css": "CSS",
    "styled-components": "Styled Components",
    "emotion": "Emotion",
    "tailwind css": "Tailwind",

    "typescript": "TypeScript",
    "javascript": "JavaScript",
    "jquery": "jQuery",

    "vite": "Vite",
    "webpack": "Webpack",
    "eslint": "ESLint",
    "prettier": "Prettier",
    "npm": "npm",
    "yarn": "yarn",
    "pnpm": "pnpm",
    "git": "Git",
    "github": "GitHub",

    "storybook": "Storybook",
    "mui": "MUI",
    "figma": "Figma",
  };

  const label =
    labelMap[s] ?? (raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "");

  const color = colorMap[s] ?? "info";

  return { label, color, variant: "solid" };
}