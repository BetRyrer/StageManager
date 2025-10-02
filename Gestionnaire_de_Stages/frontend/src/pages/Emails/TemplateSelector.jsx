import Button from "../../components/Buttons/Button";

export default function TemplateSelector({
  templates,
  selectedTemplate,
  setSelectedTemplate,
}) {
  return (
    <div className="flex space-x-4 mb-6">
      {templates.map((t) => (
        <Button
          key={t.key}
          variant="toggle"
          onClick={() => setSelectedTemplate(t.key)}
          className={selectedTemplate === t.key ? t.color : ""}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}
