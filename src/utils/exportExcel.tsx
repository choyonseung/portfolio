import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import * as XLSX from "xlsx";

export function exportPortfolioExcel(profile: Profile, projects: Project[]) {
  const wb = XLSX.utils.book_new();

  /**
   * ✅ 엑셀은 공유/제출 용도라서 컬럼명(헤더)은 한글로 통일
   * - 코드 내부 key는 유지하고, export 시점에만 한글로 변환
   */

  // 1) Profile
  const profileSheet = XLSX.utils.json_to_sheet([
    { 항목: "이름", 값: profile.name },
    { 항목: "활동지", 값: profile.location },
  ]);
  XLSX.utils.book_append_sheet(wb, profileSheet, "프로필");

  // 2) Careers
  const careersSheet = XLSX.utils.json_to_sheet(
    profile.careers.map((c) => ({
      회사명: c.companyName,
      시작일: c.startDate,
      종료일: c.isCurrent ? "재직중" : c.endDate,
      재직여부: c.isCurrent ? "Y" : "N",
    }))
  );
  XLSX.utils.book_append_sheet(wb, careersSheet, "경력");

  // 3) Projects
  const projectsSheet = XLSX.utils.json_to_sheet(
    projects.map((p) => ({
      프로젝트명: p.name,
      발주처: p.client,
      담당역할: p.role,
      시작일: p.startDate,
      종료일: p.endDate,
      사용기술: (p.skills ?? []).join(", "),
      링크: p.link ?? "",
      카테고리: (p as any).category ?? "",
      비고: p.note ?? "",
    }))
  );
  XLSX.utils.book_append_sheet(wb, projectsSheet, "프로젝트");

  XLSX.writeFile(wb, `${profile.name}.xlsx`);
}
