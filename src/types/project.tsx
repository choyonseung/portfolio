export type ProjectCategory = "Finance" | "Insurance" | "Brand" | "Recruit" | "Etc";

export type Project = {
  id: string;
  name: string;              // 프로젝트명
  category: ProjectCategory; // 카테고리
  client: string;            // 발주처
  role: string;              // 담당역할
  startDate: string;         // YYYY-MM-DD
  endDate: string;           // YYYY-MM-DD
  skillsText: string;        // 입력용 문자열)
  skills: string[];          // 사용스킬
  link?: string;             // 링크
  note?: string;             // 비고
};