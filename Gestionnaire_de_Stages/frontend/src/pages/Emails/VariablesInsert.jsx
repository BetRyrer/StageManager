import Button from "../../components/Buttons/Button";

export default function VariablesInsert({ variables, setBody }) {
  return (
    <div className="mb-6">
      <p className="font-semibold mb-2">Variables (cliquez pour insérer)</p>
      <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded">
        {variables.map((v) => (
          <Button
            key={v}
            type="button"
            variant="tag"
            className="px-3 py-1"
            onClick={() => setBody((prev) => prev + " " + v)}
          >
            {v}
          </Button>
        ))}
      </div>
    </div>
  );
}
