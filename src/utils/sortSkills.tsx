export function sortSkillsByPriority(skills: string[]) {
  const priority = [
    "responsive web",
    "web",
    "mobile",
    "tablet",
    "docker",
    "aws",

    "html",
    "react",
    "next.js",
    "react native",

    "scss",
    "sass",
    "css",
    "styled-components",
    "emotion",
    "tailwind css",

    "typescript",
    "javascript",
    "jquery",

    "vite",
    "webpack",
    "eslint",
    "prettier",
    "npm",
    "yarn",
    "pnpm",
    "git",
    "github",

    "storybook",
    "mui",
    "figma",
  ];

  const rank = new Map(priority.map((s, i) => [s, i]));

  return [...skills].sort((a, b) => {
    const A = a.trim().toLowerCase();
    const B = b.trim().toLowerCase();

    const ra = rank.has(A) ? rank.get(A)! : 9999;
    const rb = rank.has(B) ? rank.get(B)! : 9999;

    // 우선순위가 없으면 입력 순서 유지 느낌 나게 알파벳 정렬 X
    if (ra === rb) return 0;
    return ra - rb;
  });
}
