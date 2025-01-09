import { useFloating } from "@floating-ui/react";
import { useCVData } from "./store";
import type { EduStage } from "./types";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeading, DialogDescription, DialogClose } from "../../../react/Dialog";
import Input, { TextArea } from "../../../react/Input";
import Button, { buttonStyles } from "../../../react/Button";
import { TbRowInsertBottom, TbRowInsertTop, TbRowRemove, TbEdit, TbSquarePlus } from "react-icons/tb";

const virtualReference = {
  getBoundingClientRect() {
    return {
      top: 10,
      left: 10,
      bottom: 20,
      right: 100,
      width: 90,
      height: 10,
    };
  },
};

type EduStageItemProps = {
  stage: EduStage;
  index: number;
  onAdd?: (index: number) => void;
  onDelete?: (index: number) => void;
  onChange?: (stage: EduStage) => void;
};

const EduStageItem = ({ stage, index, onAdd, onDelete, onChange }: EduStageItemProps) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    open: toolsOpen,
  });

  return (
    <li>
      <div
        ref={refs.setReference}
        className="hover:ring-2 hover:ring-indigo-400 rounded py-1"
        onMouseEnter={(e) => setToolsOpen(true)}
        onMouseLeave={(e) => setToolsOpen(false)}
        onDoubleClick={() => {
          if (!editing) {
            setEditing(true);
          }
        }}
      >
        <span className="font-mono">
          {stage.start} ~ {stage.end}
        </span>
        ：{stage.desc}
        {toolsOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="rounded-b border-2 border-indigo-400 bg-indigo-200 ml-4 flex gap-2 py-1 px-2"
          >
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className="text-xl cursor-pointer" onClick={() => setEditing(true)}>
              <TbEdit />
            </span>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className="text-xl cursor-pointer" onClick={() => onAdd?.(index)}>
              <TbRowInsertTop />
            </span>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className="text-xl cursor-pointer" onClick={() => onAdd?.(index + 1)}>
              <TbRowInsertBottom />
            </span>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className="text-xl cursor-pointer" onClick={() => onDelete?.(index)}>
              <TbRowRemove />
            </span>
          </div>
        )}
        <Dialog open={editing} onOpenChange={setEditing}>
          <DialogContent className="border-2 border-indigo-400 rounded bg-white flex flex-col w-96">
            <DialogHeading className="text-2xl font-bold py-2 px-4 border-b border-indigo-400">
              编辑学习经历
            </DialogHeading>
            <EduStageForm
              stage={stage}
              onChange={(it) => {
                onChange?.(it);
                setEditing(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
};

function EduStageForm({ stage, onChange }: { stage: EduStage; onChange?: (s: EduStage) => void }) {
  const [start, setStart] = useState(stage.start);
  const [end, setEnd] = useState(stage.end);
  const [desc, setDesc] = useState(stage.desc);

  useEffect(() => {
    setStart(stage.start);
    setEnd(stage.end);
    setDesc(stage.desc);
  }, [stage]);

  return (
    <>
      <DialogDescription className="p-4">
        <div className="flex flex-col mb-4">
          <span className="select-none">开始时间：</span>
          <Input value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className="flex flex-col mb-4">
          <span className="select-none">结束时间：</span>
          <Input value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
        <div className="flex flex-col mb-4">
          <span className="select-none">描述：</span>
          <TextArea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} />
        </div>
      </DialogDescription>
      <div className="py-2 px-4 border-t border-indigo-400 flex flex-row-reverse gap-2">
        <Button size="sm" onClick={(e) => onChange?.({ ...stage, start, end, desc })}>
          保存
        </Button>
        <DialogClose className={buttonStyles(null, "sm")}>取消</DialogClose>
      </div>
    </>
  );
}

export default function AppEduExp() {
  const { eduExp, setEduExp } = useCVData();
  const addAt = (index: number) => {
    setEduExp([
      ...eduExp.slice(0, index),
      { start: "开始时间", end: "结束时间", desc: "做了什么", key: `${Date.now()}` },
      ...eduExp.slice(index),
    ]);
  };
  const deleteAt = (index: number) => {
    if (index === 0) {
      setEduExp(eduExp.slice(1));
    } else if (index >= eduExp.length - 1) {
      setEduExp(eduExp.slice(0, index));
    } else {
      setEduExp([...eduExp.slice(0, index), ...eduExp.slice(index + 1)]);
    }
  };
  const changeStage = (stage: EduStage) => {
    setEduExp(eduExp.map((it) => (it.key === stage.key ? stage : it)));
  };
  return eduExp.length === 0 ? (
    <div className="text-2xl">
      <TbSquarePlus onClick={() => addAt(0)} />
    </div>
  ) : (
    <ul className="list-disc ml-4">
      {eduExp.map((it, i) => (
        <EduStageItem
          key={`${i}-${it.start}-${it.end}`}
          stage={it}
          index={i}
          onAdd={(i) => addAt(i)}
          onDelete={(i) => deleteAt(i)}
          onChange={(stage) => changeStage(stage)}
        />
      ))}
    </ul>
  );
}
