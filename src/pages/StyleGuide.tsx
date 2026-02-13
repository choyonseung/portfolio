import { useState } from "react";
import { Plus, X, Search } from "lucide-react";
import Typography from "@/components/common/Typography/Typography";
import Button from "@/components/common/Button/Button";
import Badge from "@/components/common/Badge/Badge";
import Field from "@/components/common/Form/Field";
import Input from "@/components/common/Form/Input";
import InputGroup from "@/components/common/Form/InputGroup";
import Textarea from "@/components/common/Form/Textarea";
import Select from "@/components/common/Form/Select";
import Checkbox from "@/components/common/Form/Checkbox";
import CheckboxGroup from "@/components/common/Form/CheckboxGroup";
import Radio from "@/components/common/Form/Radio";
import RadioGroup from "@/components/common/Form/RadioGroup";
import Alert from "@/components/common/Alert/Alert";
import Tabs from "@/components/common/Tab/Tabs";
import Tab from "@/components/common/Tab/Tab";
import TabPanel from "@/components/common/Tab/TabPanel";
import Table from "@/components/common/Table/Table";
import Modal from "@/components/common/Modal/Modal"
import CodeBlock from "@/components/common/CodeBlock/CodeBlock";

export default function StyleGuide() {
  // Select
  const categoryOptions = [
    { label: "Finance", value: "finance" },
    { label: "Insurance", value: "insurance" },
    { label: "Brand", value: "brand" },
    { label: "Recruit", value: "recruit" },
    { label: "Etc", value: "etc" },
  ];

  // Table Header
  const columns1 = [
    { header: "프로젝트명", accessor: "name" },
    { header: "클라이언트", accessor: "client" },
    { header: "기간", accessor: "period" },
    {
      header: "링크",
      accessor: "link",
      render: (v: string) => v ? <a href={v}>바로가기</a> : "-"
    }
  ]

  // Table Data
  const data1 = [
    { id: 1, name: "Next TI", client: "하나금융", period: "2025.01 ~ 2025.12", link: "#" },
    { id: 2, name: "디지털 자산 PoC", client: "사내", period: "2025.03 ~ 2025.05" }
  ]

  // Table Header
  const columns2 = [
    { header: "프로젝트명", accessor: "name" },
    { header: "클라이언트", accessor: "client" },
    { header: "기간", accessor: "period" },
    {
      header: "링크",
      accessor: "link",
      render: (v: string) => v ? <a href={v}>바로가기</a> : "-"
    }
  ]

  // Table Data
  const data2 = [
    { id: 1, name: "Next TI", client: "하나금융", period: "2025.01 ~ 2025.12", link: "#" },
    { id: 2, name: "디지털 자산 PoC", client: "사내", period: "2025.03 ~ 2025.05" }
  ]

  // Table Header
  const columns3 = [
    { header: "타이틀1", accessor: "title1" },
    { header: "타이틀2", accessor: "title2" },
    {
      header: "링크",
      accessor: "link",
      render: (v: string) => v ? <a href={v}>링크</a> : "-"
    }
  ]

  // Table Data
  const data3: any[] = []

  const [open, setOpenAlert] = useState(false);
  const [tab, setTab] = useState("tab1");
  const [selected1, setSelected1] = useState<any[]>([]);
  const [selected2, setSelected2] = useState<any[]>([]);

  const [check, setCheck] = useState(false);
  const [skills, setSkills] = useState(["react", "ts"])

  const [radio, setRadio] = useState(false);
  const [role, setRole] = useState("user");

  const [category, setCategory] = useState("");

  const [openCenter, setOpenCenter] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <>
      <div className="page styleguide">
        <Typography label="Style Guide" level="head" size="h1" />

        {/* Foundation */}
        <section className="section">
          <Typography label="Foundation" level="head" size="h2" />
          <Typography label="Color " level="head" size="h3" />
          <div className="grid-2">
            <div className="card">
              <Typography label="Palette" level="body" size="h3" />
              <div className="styleguide-row">              
                <div className="styleguide-swatches">
                  <div className="swatch swatch-bg">bg</div>
                  <div className="swatch swatch-surface">surface</div>
                  <div className="swatch swatch-primary">primary</div>
                  <div className="swatch swatch-accent">accent</div>
                  <div className="swatch swatch-pink">pink</div>
                </div>
              </div>

              <Typography label="Semantic" level="body" size="h3" />
              <div className="styleguide-row">
                <div className="styleguide-swatches styleguide-swatches-semantic">
                  <div className="swatch swatch-info">info</div>
                  <div className="swatch swatch-success">success</div>
                  <div className="swatch swatch-warning">warning</div>
                  <div className="swatch swatch-danger">danger</div>
                </div>
              </div>
            </div>

            <Typography label="Typography" level="head" size="h3" />

            <CodeBlock
              title="Typography.tsx"
              language="tsx"
              code={`<Typography label="Body H3" level="body" size="h3" />`}
            />

            <div className="card">
              <div className="styleguide-row">
                <Typography label="Head H1" level="head" size="h1" />
                <Typography label="Head H2" level="head" size="h2" />
                <Typography label="Head H3" level="head" size="h3" />
                <Typography label="Head H4" level="head" size="h4" />
                <Typography label="Head H5" level="head" size="h5" />
              </div>
              <div className="styleguide-row"> 
                <Typography label="Body H1" level="body" size="h1" />
                <Typography label="Body H2" level="body" size="h2" />
                <Typography label="Body H3" level="body" size="h3" />
                <Typography label="Body H4" level="body" size="h4" />
                <Typography label="Body H5" level="body" size="h5" />
              </div>
              <div className="styleguide-row">
                <Typography label="Info H1" level="info" size="h1" />
                <Typography label="Info H2" level="info" size="h2" />
                <Typography label="Info H3" level="info" size="h3" />
                <Typography label="Info H4" level="info" size="h4" />
                <Typography label="Info H5" level="info" size="h5" />
              </div>
              <div className="styleguide-row">
                <Typography label="Head H3" level="head" size="h3">
                  <Button size="md" color="primary" variant="solid">Button</Button>
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="section">
          <Typography label="Components" level="head" size="h2" />
          <Typography label="Button" level="head" size="h3" />
          <CodeBlock
            title="Button.tsx"
            language="tsx"
            code={`<Button size="md" color="primary" variant="solid">Primary</Button>`}
          />

          <div className="grid-2">
            <div className="card">
              <div className="styleguide-row">
                <Button size="xs" color="primary" variant="solid">XS</Button>
                <Button size="sm" color="primary" variant="solid">SM</Button>
                <Button size="md" color="primary" variant="solid">MD</Button>
                <Button size="lg" color="primary" variant="solid">LG</Button>
                <Button size="xl" color="primary" variant="solid">XL</Button>
              </div>

              <div className="styleguide-row">
                <Button size="md" color="primary" variant="solid">Primary</Button>
                <Button size="md" color="neutral" variant="solid">neutral</Button>
                <Button size="md" color="accent" variant="solid">accent</Button>
                <Button size="md" color="pink" variant="solid">pink</Button>
                <Button size="md" color="info" variant="solid">info</Button>
                <Button size="md" color="success" variant="solid">success</Button>
                <Button size="md" color="warning" variant="solid">warning</Button>
                <Button size="md" color="danger" variant="solid">danger</Button>
              </div>

              <div className="styleguide-row">
                <Button size="md" color="primary" variant="solid" disabled>Primary</Button>
                <Button size="md" color="neutral" variant="solid" disabled>neutral</Button>
                <Button size="md" color="accent" variant="solid" disabled>accent</Button>
                <Button size="md" color="pink" variant="solid" disabled>pink</Button>
                <Button size="md" color="info" variant="solid" disabled>info</Button>
                <Button size="md" color="success" variant="solid" disabled>success</Button>
                <Button size="md" color="warning" variant="solid" disabled>warning</Button>
                <Button size="md" color="danger" variant="solid" disabled>danger</Button>
              </div>

              <div className="styleguide-row">
                <Button size="md" color="primary" variant="outline">Primary</Button>
                <Button size="md" color="neutral" variant="outline">neutral</Button>
                <Button size="md" color="accent" variant="outline">accent</Button>
                <Button size="md" color="pink" variant="outline">pink</Button>
                <Button size="md" color="info" variant="outline">info</Button>
                <Button size="md" color="success" variant="outline">success</Button>
                <Button size="md" color="warning" variant="outline">warning</Button>
                <Button size="md" color="danger" variant="outline">danger</Button>
              </div>

              <div className="styleguide-row">
                <Button size="md" color="primary" variant="outline" disabled>Primary</Button>
                <Button size="md" color="neutral" variant="outline" disabled>neutral</Button>
                <Button size="md" color="accent" variant="outline" disabled>accent</Button>
                <Button size="md" color="pink" variant="outline" disabled>pink</Button>
                <Button size="md" color="info" variant="outline" disabled>info</Button>
                <Button size="md" color="success" variant="outline" disabled>success</Button>
                <Button size="md" color="warning" variant="outline" disabled>warning</Button>
                <Button size="md" color="danger" variant="outline" disabled>danger</Button>
              </div>

              <div className="styleguide-row">
                <Button size="sm" color="primary" variant="solid" loading>로딩중</Button>
                <Button size="sm" color="primary" variant="solid" iconLeft={<Plus />}>추가</Button>
                <Button size="sm" color="primary" variant="outline" iconRight={<X />}>닫기</Button>
                <Button size="sm" color="neutral" variant="ghost" iconLeft={<X />} ariaLabel="삭제"></Button>
              </div>

              <div className="styleguide-row">
                <Button size="md" color="primary" variant="solid" loading>로딩중</Button>
                <Button size="md" color="primary" variant="solid" iconLeft={<Plus />}>추가</Button>
                <Button size="md" color="primary" variant="outline" iconRight={<X />}>닫기</Button>
                <Button size="md" color="neutral" variant="ghost" iconLeft={<X />} ariaLabel="삭제"></Button>
              </div>

              <div className="styleguide-row">
                <Button size="lg" color="primary" variant="solid" loading>로딩중</Button>
                <Button size="lg" color="primary" variant="solid" iconLeft={<Plus />}>추가</Button>
                <Button size="lg" color="primary" variant="outline" iconRight={<X />}>닫기</Button>
                <Button size="lg" color="neutral" variant="ghost" iconLeft={<X />} ariaLabel="삭제"></Button>
              </div>

              <div className="styleguide-row">
                <div className="btn-group">
                  <Button size="md" color="primary" variant="outline" fullWidth>Button</Button>
                  <Button size="md" color="primary" variant="solid" fullWidth>Button</Button>
                </div>
              </div>
            </div>

            <Typography label="Form" level="head" size="h3" />
            <CodeBlock
              title="Field.tsx"
              language="tsx"
              code={`<div className="form">
  <Field label="Input Basic" required>
    <Input type="text" placeholder="Placeholder.." />
  </Field>
  <Field label="Input Group" required>
    <InputGroup
      size="md"
      suffix={<Button size="sm">Button</Button>}
      >
      <Input type="text" placeholder="Placeholder.." />
    </InputGroup>
  </Field>
  <Field label="Select">
    <Select
      placeholder="Choose.."
    />
  </Field>
</div>
              `}
            />

            <div className="card">
              <div className="styleguide-row">
                <div className="form">
                  <Field label="Large">
                    <Input size="lg" type="text" placeholder="Large" />
                  </Field>
                  <Field label="Large + Button">
                    <InputGroup
                      size="lg"
                      suffix={<Button size="md">Button</Button>}
                      >
                      <Input size="lg" type="text" placeholder="Large" />
                    </InputGroup>
                  </Field>
                  <Field label="Medium">
                    <Input size="md" type="text" placeholder="Medium" />
                  </Field>
                  <Field label="Medium + Button">
                    <InputGroup
                      size="md"
                      suffix={<Button size="sm">Button</Button>}
                      >
                      <Input size="md" type="text" placeholder="Medium" />
                    </InputGroup>
                  </Field>
                  <Field label="Small">
                    <Input size="sm" type="text" placeholder="Small" />
                  </Field>
                  <Field label="Small + Button">
                    <InputGroup
                      size="sm"
                      suffix={<Button size="xs">Button</Button>}
                      >
                      <Input size="sm" type="text" placeholder="Small" />
                    </InputGroup>
                  </Field>
                </div>
              </div>

              <div className="styleguide-row">
                <div className="form">
                  <Field label="검색">
                    <InputGroup
                      size="md"
                      prefix={<Search size={18} />}
                      suffix={<Button size="sm">검색</Button>}
                    >
                      <Input placeholder="검색어 입력" />
                    </InputGroup>
                  </Field>

                  <Field label="프로젝트명" required>
                    <Input type="text" placeholder="프로젝트명" />
                  </Field>

                  <Field label="인증번호" required>
                    <InputGroup
                      size="md"
                      suffix={<Button size="sm">인증하기</Button>}
                      >
                      <Input type="text" placeholder="인증번호 입력" />
                    </InputGroup>
                  </Field>

                  <Field label="카테고리">
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      options={categoryOptions}
                      placeholder="카테고리 선택"
                    />
                  </Field>

                  <Field label="시작일">
                    <Input type="date" placeholder="YYYY-MM-DD" />
                  </Field>

                  <Field 
                    label="비고"
                    description="최대 300자까지 입력 가능합니다" 
                  >
                    <Textarea 
                      placeholder="간단 설명..."
                    />
                  </Field>

                  <Field
                    label="비고"
                    description="최대 300자까지 입력 가능합니다"
                    error="내용을 입력해주세요"
                  >
                    <Textarea
                      placeholder="간단 설명..."
                      error
                    />
                  </Field>
                </div>
              </div>

              <div className="styleguide-row">
                <Checkbox
                  checked={check}
                  onChange={setCheck}
                  size="lg"
                  label="체크박스"
                />
              </div>

              <div className="styleguide-row">
                <CheckboxGroup
                  value={skills}
                  onChange={setSkills}
                  direction="column"
                  size="lg"
                  options={[
                    { label: "React", value: "react" },
                    { label: "TypeScript", value: "ts", disabled: true },
                    { label: "Vue", value: "vue", disabled: true },
                  ]}
                />
              </div>

              <div className="styleguide-row">
                <Radio
                  name="radio"
                  checked={radio}
                  onChange={() => setRadio(true)}
                  size="lg"
                  label="라디오1"
                />
              </div>

              <div className="styleguide-row">
                <RadioGroup
                  name="role"
                  value={role}
                  onChange={setRole}
                  direction="row"
                  size="lg"
                  options={[
                    { label: "사용자", value: "user", disabled: true },
                    { label: "관리자", value: "admin", disabled: true },
                    { label: "게스트1", value: "guest1" },
                    { label: "게스트2", value: "guest2" },
                  ]}
                />
              </div>
            </div>

            <Typography label="Badge" level="head" size="h3" />
            <CodeBlock
              title="Badge.tsx"
              language="tsx"
              code={`<div className="badge-group">
  <Badge color="primary" variant="solid" label="Badge solid" />
  <Badge color="primary" variant="outline" label="Badge outline" />
</div>
              `}
            />

            <div className="card">
              <div className="styleguide-row">
                <div className="badge-group">
                  <Badge color="primary" variant="solid" label="React" />
                  <Badge color="accent" variant="solid" label="TypeScript" />
                  <Badge color="pink" variant="solid" label="SCSS" />
                  <Badge color="info" variant="solid" label="Vite" />
                  <Badge color="success" variant="solid" label="Vite" />
                  <Badge color="warning" variant="solid" label="Vite" />
                </div>
              </div>
              <div className="styleguide-row">
                <div className="badge-group">
                  <Badge color="primary" variant="outline" label="React" />
                  <Badge color="accent" variant="outline" label="TypeScript" />
                  <Badge color="pink" variant="outline" label="SCSS" />
                  <Badge color="info" variant="outline" label="Vite" />
                  <Badge color="success" variant="outline" label="Vite" />
                  <Badge color="warning" variant="outline" label="Vite" />
                </div>
              </div>
            </div>

            <Typography label="Card" level="head" size="h3" />
            <CodeBlock
              title="Card.tsx"
              language="tsx"
              code={`<div className="badge-group">
  <Badge color="primary" variant="solid" label="Badge solid" />
  <Badge color="primary" variant="outline" label="Badge outline" />
</div>
              `}
            />

            <div className="card">              
              <div className="card">
                <h4 className="card-title">Project Card</h4>
                <p className="card-meta">Client · Role</p>
                <p className="card-period">2025-01-01 ~ 2025-12-31</p>
                <div className="badge-group">
                  <Badge variant="solid" color="primary" label="React" />
                  <Badge variant="solid" color="warning" label="JavaScript" />
                </div>
                <p className="card-link">View Link</p>
                <p className="card-note">Note</p>
              </div>
            </div>

            <Typography label="Tab" level="head" size="h3" />
            <CodeBlock
              title="Tab.tsx"
              language="tsx"
              code={`<Tabs value={tab} onChange={setTab}>
  <div className="tab-header">
    <Tab label="Tab1" value="tab1" />
    <Tab label="Tab2" value="tab2" />
    <Tab label="Tab3" value="tab3" />
  </div>
  <div className="tab-body">
    <TabPanel value="tab1">
      Tab1
    </TabPanel>
    <TabPanel value="tab2">
      Tab2
    </TabPanel>
    <TabPanel value="tab3">
      Tab3
    </TabPanel>
  </div>
</Tabs>
`}
            />

            <div className="card">
              <Typography label="Tab" level="head" size="h3" />
              <Tabs value={tab} onChange={setTab}>
                <div className="tab-header">
                  <Tab label="Tab1" value="tab1" />
                  <Tab label="Tab2" value="tab2" />
                  <Tab label="Tab3" value="tab3" />
                </div>
                <div className="tab-body">
                  <TabPanel value="tab1">
                    Tab1
                  </TabPanel>

                  <TabPanel value="tab2">
                    Tab2
                  </TabPanel>

                  <TabPanel value="tab3">
                    Tab3
                  </TabPanel>
                </div>
              </Tabs>
            </div>

            <Typography label="Table" level="head" size="h3" />
            <CodeBlock
              title="Table.tsx"
              language="tsx"
              code={`<Table
  columns={columns1}
  data={data1}
  selectable
  selectedRows={selected1}
  onSelectionChange={setSelected1}
/>
`}
            />

            <div className="card">
              <Typography label="Multiple" level="body" size="h3" />
              <div className="styleguide-row">
                <Table
                  columns={columns1}
                  data={data1}
                  selectable
                  selectedRows={selected1}
                  onSelectionChange={setSelected1}
                />
              </div>

              <Typography label="Single" level="body" size="h3" />
              <div className="styleguide-row">
                <Table
                  columns={columns2}
                  data={data2}
                  selectable
                  selectionMode="single"
                  selectedRows={selected2}
                  onSelectionChange={setSelected2}
                />
              </div>

              <Typography label="Nodata" level="body" size="h3" />
              <div className="styleguide-row">
                <Table
                  columns={columns3}
                  data={data3}
                />
              </div>
            </div>

            <Typography label="Modal" level="head" size="h3" />
            <CodeBlock
              title="Modal.tsx"
              language="tsx"
              code={`<Modal
  open={openCenter}
  onClose={() => setOpenCenter(false)}
  variant="center"
  size="md"
  title="센터모달 타이틀"
  primaryButton={{
    label: "확인",
    onClick: () => setOpenCenter(false)
  }}
  secondaryButton={{
    label: "취소",
    onClick: () => setOpenCenter(false)
  }}
>
  센터모달 입니다.
</Modal>
`}
            />         

            <div className="card">
              <div className="styleguide-row">
                  <Button size="md" color="primary" variant="outline" onClick={() => setOpenCenter(true)}>Center Modal</Button>
                  <Button size="md" color="primary" variant="outline" onClick={() => setOpenBottom(true)}>Bottom Sheet</Button>
                </div>    
            </div>

            <Typography label="Alert" level="head" size="h3" />
            <CodeBlock
              title="Alert.tsx"
              language="tsx"
              code={`<Alert
  open={open}
  title="삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  primaryButton={{
    label: "확인",
    onClick: () => setOpenAlert(false)
  }}
  secondaryButton={{
    label: "취소",
    onClick: () => setOpenAlert(false)
  }}
/>
`}
            />

            <div className="card">
                <div className="styleguide-row">
                  <Button size="md" color="danger" variant="outline" onClick={() => setOpenAlert(true)}>danger</Button>
                </div>
            </div>
          </div>
        </section>
      </div>

      <Modal
        open={openCenter}
        onClose={() => setOpenCenter(false)}
        variant="center"
        size="md"
        title="센터모달 타이틀"
        primaryButton={{
          label: "확인",
          onClick: () => setOpenCenter(false)
        }}
        secondaryButton={{
          label: "취소",
          onClick: () => setOpenCenter(false)
        }}
      >
        센터모달 입니다.
      </Modal>

      <Modal
        open={openBottom}
        onClose={() => setOpenBottom(false)}
        variant="bottom"
        title="바텀시트 타이틀"
        primaryButton={{
          label: "완료",
          onClick: () => setOpenBottom(false)
        }}
      >
        모바일 스타일의 바텀시트 입니다.
      </Modal>

      <Alert
        open={open}
        title="삭제하시겠습니까?"
        description="이 작업은 되돌릴 수 없습니다."
        primaryButton={{
          label: "확인",
          onClick: () => setOpenAlert(false)
        }}
        secondaryButton={{
          label: "취소",
          onClick: () => setOpenAlert(false)
        }}
      />
    </>
  );
}
