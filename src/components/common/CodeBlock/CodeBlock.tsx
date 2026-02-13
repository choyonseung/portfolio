import { useId, useMemo, useState } from "react";
import Button from "@/components/common/Button/Button";

type Props = {
  code: string;
  title?: string;
  language?: string;
  defaultOpen?: boolean;
  showLineNumbers?: boolean;
};

export default function CodeBlock({
  code,
  title = "Code",
  language,
  defaultOpen = true,
  showLineNumbers = true,
}: Props) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const clean = useMemo(() => code.replace(/\r\n/g, "\n").trimEnd(), [code]);
  const lines = useMemo(() => clean.split("\n"), [clean]);

  async function handleCopy() {
    await navigator.clipboard.writeText(clean);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section className="code-block">
      <header className="code-block-header">
        <div className="code-block-title-wrap">
          <div className="code-block-title">{title}</div>
          {language && <div className="code-block-lang">{language}</div>}
        </div>

        <div className="code-block-spacer" />
        <Button
          size="sm"
          variant="outline"
          color="info"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
        >
          {open ? "닫기" : "열기"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          color="success"
          onClick={handleCopy}
        >
          {copied ? "복사됨!" : "복사"}
        </Button>
      </header>

      {open && (
        <div className="code-block-body" id={id}>
          <pre className="code-block-pre">
            <code>
              {showLineNumbers ? (
                <table className="code-block-table">
                  <tbody>
                    {lines.map((line, i) => (
                      <tr key={i}>
                        <td className="code-block-line-no">{i + 1}</td>
                        <td className="code-block-line">{line || " "}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                clean
              )}
            </code>
          </pre>
        </div>
      )}
    </section>
  );
}