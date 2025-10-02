import { useState } from "react";
import { FolderIcon } from "lucide-react";
import Button from "../Buttons/Button";
import ImportDelpaaModel from "./ImportDelpaaModel";

function ImportButtonDelpaa() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" icon={FolderIcon} onClick={() => setOpen(true)}>
        Import Delpaa
      </Button>

      {open && <ImportDelpaaModel onClose={() => setOpen(false)} />}
    </>
  );
}

export default ImportButtonDelpaa;
