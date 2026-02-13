import { useEffect, useMemo, useState } from "react";
import type { Career, Profile } from "@/types/profile";
import { profileStorage } from "@/services/storage/profileStorage";
import { calcTotalCareer } from "@/utils/calcCareer";

import Typography from "@/components/common/Typography/Typography";
import Button from "@/components/common/Button/Button";

import Field from "@/components/common/Form/Field";
import Input from "@/components/common/Form/Input";
import Checkbox from "@/components/common/Form/Checkbox";

function createCareer(): Career {
  return {
    id: crypto.randomUUID(),
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  };
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    location: "",
    careers: [createCareer()],
  });

  useEffect(() => {
    const saved = profileStorage.get();
    if (saved) setProfile(saved);
  }, []);

  const total = useMemo(() => calcTotalCareer(profile.careers), [profile.careers]);

  const onSave = () => {
    profileStorage.set(profile);
    alert("저장 완료!");
  };

  const onAddCareer = () => {
    setProfile((prev) => ({
      ...prev,
      careers: [...prev.careers, createCareer()],
    }));
  };

  const onRemoveCareer = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      careers: prev.careers.filter((c) => c.id !== id),
    }));
  };

  const updateCareer = (id: string, patch: Partial<Career>) => {
    setProfile((prev) => ({
      ...prev,
      careers: prev.careers.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  };

  return (
    <div className="page admin">
      <Typography label="Profile" level="head" size="h2">
        <Button size="sm" color="primary" variant="solid" onClick={onSave}>
          저장
        </Button>

        <Button
          size="sm"
          color="danger"
          variant="outline"
          onClick={() => {
            profileStorage.clear();
            alert("저장값 삭제 완료");
          }}
        >
          저장값 삭제
        </Button>
      </Typography>

      {/* 기본 정보 */}
      <div className="section">
        <div className="card">
          <Typography label="기본 정보" level="head" size="h4" />

          <div className="form">
            <Field label="이름">
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                size="md"
                fullWidth
              />
            </Field>

            <Field label="거주지(활동지)">
              <Input
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                size="md"
                fullWidth
              />
            </Field>
          </div>
        </div>
      </div>

      {/* 회사 이력 */}
      <div className="section">
        <div className="card">
          <div className="toolbar" style={{ justifyContent: "space-between" }}>
            <div>
              <Typography label="회사 이력" level="head" size="h4" />
              <p style={{ margin: "6px 0 0" }}>
                총 경력: <b>{total.years}년 {total.months}개월</b>
              </p>
            </div>

            <Button size="sm" color="primary" variant="outline" onClick={onAddCareer}>추가</Button>
          </div>

          <div className="grid" style={{ marginTop: 14 }}>
            {profile.careers.map((c, idx) => (
              <div key={c.id} className="card">
                <div className="toolbar" style={{ justifyContent: "space-between" }}>
                  <b>#{idx + 1}</b>

                  <Button
                    size="sm"
                    color="danger"
                    variant="ghost"
                    onClick={() => onRemoveCareer(c.id)}
                  >
                    삭제
                  </Button>
                </div>

                <div className="form" style={{ marginTop: 12 }}>
                  <Field label="회사명">
                    <Input
                      value={c.companyName}
                      onChange={(e) => updateCareer(c.id, { companyName: e.target.value })}
                      size="md"
                      fullWidth
                    />
                  </Field>

                  <div className="grid-2">
                    <Field label="시작일">
                      <Input
                        type="date"
                        value={c.startDate}
                        onChange={(e) => updateCareer(c.id, { startDate: e.target.value })}
                        size="md"
                        fullWidth
                      />
                    </Field>

                    <Field label="종료일">
                      <Input
                        type="date"
                        value={c.endDate || ""}
                        disabled={c.isCurrent}
                        onChange={(e) => updateCareer(c.id, { endDate: e.target.value })}
                        size="md"
                        fullWidth
                      />
                    </Field>
                  </div>

                  <Field label="재직중">
                    <Checkbox
                      checked={c.isCurrent}
                      onChange={(checked) =>
                        updateCareer(c.id, {
                          isCurrent: checked,
                          endDate: checked ? "" : c.endDate,
                        })
                      }
                      label="현재 재직중"
                      size="md"
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
