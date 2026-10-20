export function CaseHead({
  id,
  eyebrow,
  title,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <p className="t-eyebrow mb-2">{eyebrow}</p> : null}
      <Tag id={id} className={`case-head ${Tag === "h1" ? "t-page" : "t-h2"}`}>
        {title}
      </Tag>
    </div>
  );
}
