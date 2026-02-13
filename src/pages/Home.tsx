import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { profileStorage } from "@/services/storage/profileStorage";
import { projectStorage } from "@/services/storage/projectStorage";
import { calcTotalCareer } from "@/utils/calcCareer";
import { exportPortfolioExcel } from "@/utils/exportExcel";
import { calcCareerDuration, formatDuration } from "@/utils/calcCareer";
import { getSkillBadgeStyle } from "@/utils/getSkillBadgeStyle";
import { sortSkillsByPriority } from "@/utils/sortSkills";

import Typography from "@/components/common/Typography/Typography";
import Button from "@/components/common/Button/Button";
import Badge from "@/components/common/Badge/Badge";

const Home = () => {
  const profile = profileStorage.get();
  const projects = projectStorage.get();

  const total = useMemo(() => {
    if (!profile) return null;
    return calcTotalCareer(profile.careers);
  }, [profile]);

  if (!profile) {
    return (
      <div className="page home">
        <Typography label="Profile" level="head" size="h2" />

        <div className="section">
          <div className="panel panel-glass">
            <div className="panel-inner">
              <p style={{ margin: 0 }}>
                아직 프로필 데이터가 없어요. <b>/admin/profile</b>에서 입력해주세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page home">
      <Typography label="Profile" level="head" size="h2">
        <Button
          size="sm"
          color="primary"
          variant="solid"
          onClick={() => {
            const profile = profileStorage.get();
            const projects = projectStorage.get();
            if (!profile) return alert("프로필 데이터를 먼저 등록해주세요.");
            exportPortfolioExcel(profile, projects);
          }}
        >
          Excel 다운로드
        </Button>
        <Button size="sm" color="primary" variant="outline" onClick={() => alert("TODO")}>
          공유 링크 생성
        </Button>
      </Typography>

      {/* Profile Summary */}
      <div className="section">
        <div className="panel panel-glass">
          <div className="panel-inner">
            <h2 className="section-title">{profile.name}</h2>
            <p style={{ margin: "6px 0 0" }}>{profile.location}</p>

            <ul className="career-list">
              {profile.careers.map((c) => {
                const dur = calcCareerDuration(c);
                return (
                  <li key={c.id} className="career-list__item">
                    <div className="career-list__line1">
                      <span className="career-list__company">{c.companyName}</span>
                      {dur && <span className="career-list__duration">{formatDuration(dur)}</span>}
                    </div>

                    <div className="career-list__line2">
                      {c.startDate} ~ {c.isCurrent ? "현재" : c.endDate}
                    </div>
                  </li>
                );
              })}
            </ul>

            {total && (
              <p style={{ margin: "10px 0 0" }}>
                총 경력:{" "}
                <b>
                  {total.years}년 {total.months}개월
                </b>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="section">
        <Typography label="Projects" level="head" size="h2" />

        {projects.length === 0 ? (
          <div className="panel panel-glass">
            <div className="panel-inner">
              <p style={{ margin: 0 }}>
                프로젝트 데이터가 없어요. <b>/admin/projects</b>에서 입력해주세요!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid">
            {projects.map((p) => (
              <div key={p.id} className="card">
                <div>
                  {p.category && <p className="card-sub">{p.category}</p>}
                  <h3 className="card-title">{p.name}</h3>
                </div>
                <p className="card-meta">
                  {p.client} · {p.role}
                </p>
                <p className="card-period">
                  {p.startDate} ~ {p.endDate}
                </p>

                <div className="btn-group" style={{ marginTop: 12 }}>
                 {sortSkillsByPriority(p.skills).map((s) => {
                    const ui = getSkillBadgeStyle(s);
                    return <Badge key={s} label={ui.label} color={ui.color} variant={ui.variant} />;
                  })}
                </div>

                {p.link ? (
                  <a
                    className="card-link"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowUpRight />
                  </a>
                ) : null}

                {p.note && <p style={{ marginTop: 12 }}>{p.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;