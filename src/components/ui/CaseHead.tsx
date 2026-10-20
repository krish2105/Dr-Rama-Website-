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
      {eyebrow ? <p className="marginalia mb-1 text-[0.95rem]">{eyebrow}</p> : null}
      <Tag id={id} className="case-head text-[1.75rem] font-semibold text-primary md:text-[2.1rem]">
        {title}
      </Tag>
    </div>
  );
}
