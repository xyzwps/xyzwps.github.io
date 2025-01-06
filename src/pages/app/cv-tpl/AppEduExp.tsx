import { useFloating } from '@floating-ui/react';
import { useCVData } from "./store"
import type { EduStage } from './types'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeading, DialogDescription, DialogClose } from '../../../react/Dialog';

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
  stage: EduStage,
  index: number,
  onAdd?: (index: number) => void
  onDelete?: (index: number) => void
  onChange?: (stage: EduStage) => void
}

const EduStageItem = ({ stage, index, onAdd, onDelete, onChange }: EduStageItemProps) => {
  const [toolsOpen, setToolsOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    open: toolsOpen
  });

  return (
    <li>
      <div ref={refs.setReference}
        className='hover:ring-2 hover:ring-indigo-400 rounded py-1'
        onMouseEnter={e => setToolsOpen(true)}
        onMouseLeave={e => setToolsOpen(false)}>
        <span className="font-mono"><input value={stage.start} onChange={e => {
          onChange?.({ ...stage, start: e.target.value })
        }} /> ~ {stage.end}</span>：{stage.desc}
        {toolsOpen && <div ref={refs.setFloating} style={floatingStyles} className='rounded-b border-2 border-indigo-400 bg-indigo-200 ml-4 flex gap-2 py-1 px-2'>
          <span className='text-sm cursor-pointer' onClick={() => setEditing(true)}>编辑本行</span>
          <span className='text-sm cursor-pointer' onClick={() => onAdd?.(index)} >上方加一行</span>
          <span className='text-sm cursor-pointer' onClick={() => onAdd?.(index + 1)}>下方加一行</span>
          <span className='text-sm cursor-pointer' onClick={() => onDelete?.(index)}>删除本行</span>
        </div>}
        <Dialog open={editing} onOpenChange={setEditing}>
          <DialogContent className="border-2 border-indigo-400 rounded bg-white flex flex-col w-96">
            <DialogHeading className='text-2xl font-bold py-2 px-4 border-b border-indigo-400'>编辑学习经历</DialogHeading>
            <DialogDescription className='p-4'>
              <div className='flex flex-col mb-4'>
                <label className='select-none'>开始时间：</label>
                <input className='border border-indigo-300 rounded p-2 outline-none focus:ring-2 focus:ring-indigo-400' />
              </div>
              <div className='flex flex-col mb-4'>
                <label className='select-none'>结束时间：</label>
                <input className='border border-indigo-300 rounded p-2 outline-none focus:ring-2 focus:ring-indigo-400' />
              </div>
              <div className='flex flex-col mb-4'>
                <label className='select-none'>描述：</label>
                <textarea className='border border-indigo-300 rounded p-2 outline-none focus:ring-2 focus:ring-indigo-400' rows={3} />
              </div>
            </DialogDescription>
            <div className='py-2 px-4 border-t border-indigo-400 flex flex-row-reverse gap-2'>
              <button className='border border-indigo-300 rounded px-2'>保存</button>
              <DialogClose className='border border-indigo-300 rounded px-2'>取消</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  )
}

export default function AppEduExp() {
  const { eduExp, setEduExp } = useCVData()
  const addAt = (index: number) => {
    setEduExp([
      ...eduExp.slice(0, index),
      { start: '---', end: '---', desc: '---', key: Date.now() + '' },
      ...eduExp.slice(index)
    ])
  }
  const deleteAt = (index: number) => {
    if (eduExp.length <= 1) {
      return;
    }

    if (index === 0) {
      setEduExp(eduExp.slice(1))
    } else if (index >= eduExp.length - 1) {
      setEduExp(eduExp.slice(0, index))
    } else {
      setEduExp([...eduExp.slice(0, index), ...eduExp.slice(index + 1)])
    }
  }
  const changeStage = (stage: EduStage) => {
    setEduExp(eduExp.map(it => it.key === stage.key ? stage : it))
  }
  return <ul className="list-disc ml-4">
    {eduExp.map((it, i) => (<EduStageItem
      key={`${i}-${it.start}-${it.end}`}
      stage={it}
      index={i}
      onAdd={i => addAt(i)}
      onDelete={i => deleteAt(i)}
      onChange={(stage) => changeStage(stage)}
    />))}
  </ul>
}