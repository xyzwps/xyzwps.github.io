import { useEffect, useState } from "react";
import Button from "../../../react/Button";

const KEY = "___xyzwps_app_json_prettier__";

export default function JsonPrettier() {
  const [json, setJson] = useState<string>("");
  const prettier = () => {
    setJson(JSON.stringify(JSON.parse(json), null, 2));
  };

  useEffect(() => {
    const x = localStorage.getItem(KEY) || "";
    setJson(x);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, json);
  }, [json]);

  return (
    <div className="p-2 gap-2 flex flex-col">
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className="w-full font-mono p-4 resize-none"
        style={{ height: "calc(100vh - 5rem)" }}
        placeholder="[1,2,3]"
      />
      <div className="text-right">
        <Button onClick={prettier}>格式化</Button>
      </div>
    </div>
  );
}
