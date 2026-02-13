import { Link } from "react-router-dom";
import { useRef } from "react";
import Button from "@/components/common/Button/Button";
import { profileStorage } from "@/services/storage/profileStorage";
import { projectStorage } from "@/services/storage/projectStorage";
import { downloadJson, readJsonFile } from "@/utils/jsonFile";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";

import Typography from "@/components/common/Typography/Typography";

type BackupData = {
  profile: Profile | null;
  projects: Project[];
  exportedAt: string;
};

export default function AdminHome() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onExport = () => {
    const backup: BackupData = {
      profile: profileStorage.get(),
      projects: projectStorage.get(),
      exportedAt: new Date().toISOString(),
    };

    downloadJson("portfolio-backup.json", backup);
  };

  const onImport = async (file: File | null) => {
    if (!file) return;

    try {
      const backup = await readJsonFile<BackupData>(file);
      if (backup.profile) profileStorage.set(backup.profile);
      projectStorage.set(backup.projects ?? []);
      alert("복구 완료! Home에서 확인해봐 😎");
    } catch {
      alert("JSON 파일 형식이 이상해! (복구 실패)");
    }
  };

  const profile = profileStorage.get();
  const projects = projectStorage.get();

  return (
    <div className="page admin">
      <Typography label="Dashboard" level="head" size="h2" />

      {/* Stats */}
      <div className="section">
        <div className="grid-2">
          <div className="card">
            <h3 className="card-title">Profile</h3>
            <p className="card-meta">
              {profile ? "✅ 입력 완료" : "⚠️ 아직 미입력"}
            </p>
            <div className="toolbar">
              <Link to="/admin/profile">
                <Button size="md" color="primary" variant="solid">
                  Profile 편집
                </Button>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Projects</h3>
            <p className="card-meta">총 {projects.length}개</p>
            <div className="toolbar">
              <Link to="/admin/projects">
                <Button size="md" color="primary" variant="solid">
                  Projects 편집
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="section">
        <div className="grid-2">
          <div className="panel panel-glass">
            <div className="panel-inner">
              <h3 className="styleguide-subtitle">Export</h3>
              <p style={{ margin: "6px 0 0", opacity: 0.72 }}>
                현재 입력된 Profile/Projects 데이터를 JSON으로 저장합니다.
              </p>

              <div className="toolbar">
                <Button
                  size="md"
                  color="primary"
                  variant="solid"
                  onClick={onExport}
                >
                  Export JSON
                </Button>
              </div>
            </div>
          </div>

          <div className="panel panel-glass">
            <div className="panel-inner">
              <h3 className="styleguide-subtitle">Import</h3>
              <p style={{ margin: "6px 0 0", opacity: 0.72 }}>
                저장된 JSON 파일을 불러와 데이터를 복구합니다.
              </p>

              <div className="toolbar">
                <Button
                  size="md"
                  color="primary"
                  variant="solid"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Import JSON
                </Button>

                {/* ✅ 파일 선택창 트리거용 hidden input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    onImport(file);

                    // ✅ 같은 파일 다시 import 가능하게 초기화
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}