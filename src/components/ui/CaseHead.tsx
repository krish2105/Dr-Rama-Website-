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
      {eyebrow ? <p className="marginalia mb-2">{eyebrow}</p> : null}
      <Tag id={id} className="case-head text-[1.9rem] text-ink md:text-[2.4rem]">
        {title}
      </Tag>
    </div>
  );
}
