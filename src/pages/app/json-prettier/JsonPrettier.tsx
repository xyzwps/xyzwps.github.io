import { useEffect, useState } from "react";
import * as prettier from "prettier";
import * as estreePlugin from "prettier/plugins/estree.js";
import * as babelPlugin from "prettier/plugins/babel.js";

const KEY = "___xyzwps_app_json_prettier__";

export default function JsonPrettier() {
  const [json, setJson] = useState<string>("");
  const formatJson = () => {
    prettier

      .format(json, {
        parser: "json",
        printWidth: 100,
        objectWrap: "collapse",
        // @ts-ignore
        plugins: [estreePlugin, babelPlugin],
      })
      .then(setJson);
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
      <div className="flex gap-2 justify-between items-center mx-4 my-2">
        <h2 className="font-bold text-lg">JSON 格式化工具</h2>
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={formatJson}
        >
          格式化
        </button>
      </div>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className="textarea textarea-primary font-mono bg-white shadow mx-4 p-4 resize-none w-auto"
        style={{ height: "calc(100vh - 8rem)" }}
        placeholder="[1,2,3]"
      />
    </div>
  );
}
