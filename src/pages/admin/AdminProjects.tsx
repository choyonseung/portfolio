import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/types/project";
import { projectStorage } from "@/services/storage/projectStorage";
import { getSkillBadgeStyle } from "@/utils/getSkillBadgeStyle";
import { sortSkillsByPriority } from "@/utils/sortSkills";

import Typography from "@/components/common/Typography/Typography";
import Button from "@/components/common/Button/Button";
import Badge from "@/components/common/Badge/Badge";

import Field from "@/components/common/Form/Field";
import Input from "@/components/common/Form/Input";
import Select from "@/components/common/Form/Select";
import Textarea from "@/components/common/Form/Textarea";

function createProject(): Project {
  return {
    id: crypto.randomUUID(),
    category: "Finance",
    name: "",
    client: "",
    role: "",
    startDate: "",
    endDate: "",
    skillsText: "",
    skills: [],
    note: "",
  };
}

function toSkills(text: string) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = projectStorage.get();
    setProjects(saved);
    setSelectedId(saved[0]?.id ?? null);
  }, []);

  const selected = useMemo(() => {
    return projects.find((p) => p.id === selectedId) ?? null;
  }, [projects, selectedId]);

  const onAdd = () => {
    const p = createProject();
    setProjects((prev) => [p, ...prev]);
    setSelectedId(p.id);
  };

  const onRemove = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelectedId((prev) => {
      if (prev !== id) return prev;
      const remain = projects.filter((p) => p.id !== id);
      return remain[0]?.id ?? null;
    });
  };

  const update = (id: string, patch: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const onSave = () => {
    const normalized = projects.map((p) => ({
      ...p,
      skills: toSkills(p.skillsText),
    }));

    setProjects(normalized);
    projectStorage.set(normalized);
    alert("저장 완료!");
  };

  return (
    <div className="page admin">
      <Typography label="Projects" level="head" size="h2">
        <Button size="md" color="primary" variant="outline" onClick={onAdd}>
          프로젝트 추가
        </Button>
        <Button
          size="md"
          color="danger"
          variant="outline"
          onClick={() => {
            projectStorage.clear();
            alert("저장값 삭제 완료");
          }}
        >
          저장값 삭제
        </Button>
        <Button size="md" color="primary" variant="solid" onClick={onSave}>
          저장
        </Button>
      </Typography>

      <div className="admin-projects">
        <div className="admin-projects-left">
          <div className="admin-projects-list">
            {projects.map((p, idx) => {
              const isActive = p.id === selectedId;

              return (
                <div
                  key={p.id}
                  className={`card ${isActive ? "is-active" : ""}`}
                  style={{
                    borderColor: isActive ? "rgba(90,78,255,0.35)" : undefined,
                    background: isActive ? "rgba(90,78,255,0.08)" : undefined,
                  }}
                  onClick={() => setSelectedId(p.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="toolbar" style={{ justifyContent: "space-between" }}>
                    <b>#{idx + 1}</b>

                    <Button
                      size="sm"
                      color="danger"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(p.id);
                      }}
                    >
                      삭제
                    </Button>
                  </div>

                  <div className="form">
                    <Field label="프로젝트명">
                      <Input
                        value={p.name}
                        onChange={(e) => update(p.id, { name: e.target.value })}
                        placeholder="AAA"
                        fullWidth
                      />
                    </Field>

                    <Field label="카테고리">
                      <Select
                        value={p.category}
                        onChange={(e) =>
                          update(p.id, { category: e.target.value as Project["category"] })
                        }
                        fullWidth
                        options={[
                          { label: "Finance", value: "Finance" },
                          { label: "Insurance", value: "Insurance" },
                          { label: "Brand", value: "Brand" },
                          { label: "Recruit", value: "Recruit" },
                          { label: "Etc", value: "Etc" },
                        ]}
                      />
                    </Field>

                    <div className="grid-2">
                      <Field label="발주처">
                        <Input
                          value={p.client}
                          onChange={(e) => update(p.id, { client: e.target.value })}
                          fullWidth
                        />
                      </Field>

                      <Field label="담당역할">
                        <Input
                          value={p.role}
                          onChange={(e) => update(p.id, { role: e.target.value })}
                          fullWidth
                        />
                      </Field>
                    </div>

                    <div className="grid-2">
                      <Field label="시작일">
                        <Input
                          type="date"
                          value={p.startDate}
                          onChange={(e) => update(p.id, { startDate: e.target.value })}
                          fullWidth
                        />
                      </Field>

                      <Field label="종료일">
                        <Input
                          type="date"
                          value={p.endDate}
                          onChange={(e) => update(p.id, { endDate: e.target.value })}
                          fullWidth
                        />
                      </Field>
                    </div>

                    <Field label="사용스킬 (쉼표로 구분)">
                      <Input
                        value={p.skillsText}
                        onChange={(e) => update(p.id, { skillsText: e.target.value })}
                        placeholder="React, TypeScript, SCSS..."
                        fullWidth
                      />
                    </Field>

                    <Field label="링크">
                      <Input
                        placeholder="https://..."
                        value={p.link ?? ""}
                        onChange={(e) => update(p.id, { link: e.target.value })}
                        fullWidth
                      />
                    </Field>

                    <Field label="비고">
                      <Textarea
                        value={p.note || ""}
                        onChange={(e) => update(p.id, { note: e.target.value })}
                        rows={3}
                        placeholder="간단 설명..."
                        fullWidth
                      />
                    </Field>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-projects-right">
          <div className="panel panel-glass">
            <div className="panel-inner">
              <div className="admin-projects-previewTitle">
                <h2 className="section-title" style={{ margin: 0 }}>
                  Live Preview
                </h2>
              </div>

              {!selected ? (
                <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
                  선택된 프로젝트가 없어요.
                </p>
              ) : (
                <ProjectPreviewCard project={selected} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/** Home 카드와 최대한 동일한 형태로 미리보기 */
function ProjectPreviewCard({ project }: { project: Project }) {
  const skills = toSkills(project.skillsText);

  return (
    <div className="card">
      <div>
        {project.category && <p className="card-sub">{project.category}</p>}
        <h3 className="card-title">{project.name || "프로젝트명"}</h3>        
      </div>

      <p className="card-meta">
        {(project.client || "Client") + " · " + (project.role || "Role")}
      </p>

      <p className="card-period">
        {(project.startDate || "YYYY-MM-DD") + " ~ " + (project.endDate || "YYYY-MM-DD")}
      </p>

      <div className="btn-group" style={{ marginTop: 12 }}>
        {skills.length ? sortSkillsByPriority(skills).map((s) => {
          const ui = getSkillBadgeStyle(s);
          return (
            <Badge
              key={s}
              label={ui.label}
              color={ui.color}
              variant={ui.variant}
            />
          );
        }) : null}
      </div>

      {project.link ? (
        <a
          className="card-link"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          View
        </a>
      ) : null}

      {project.note ? <p style={{ marginTop: 12 }}>{project.note}</p> : null}
    </div>
  );
}