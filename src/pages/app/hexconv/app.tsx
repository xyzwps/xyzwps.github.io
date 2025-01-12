import { useState } from "react";
import Input from "../../../react/Input";
import { create } from "zustand";

type Store = {
  n2: string;
  setN2: (text: string) => void;
  n2Invalid: boolean;
  invalidateN2: () => void;
  n10: string;
  setN10: (text: string) => void;
  n10Invalid: boolean;
  invalidateN10: () => void;
  n16: string;
  setN16: (text: string) => void;
  n16Invalid: boolean;
  invalidateN16: () => void;
  allValid: () => void;
};

const useStore = create<Store>()((set) => ({
  n2: "",
  setN2: (text: string) => set({ n2: text }),
  n2Invalid: false,
  invalidateN2: () => set({ n2Invalid: true }),
  n10: "",
  setN10: (text: string) => set({ n10: text }),
  n10Invalid: false,
  invalidateN10: () => set({ n10Invalid: true }),
  n16: "",
  setN16: (text: string) => set({ n16: text }),
  n16Invalid: false,
  invalidateN16: () => set({ n16Invalid: true }),
  allValid: () => set({ n2Invalid: false, n10Invalid: false, n16Invalid: false }),
}));

export default function App() {
  const {
    n2,
    n10,
    n16,
    n2Invalid,
    n10Invalid,
    n16Invalid,
    setN2,
    setN10,
    setN16,
    allValid,
    invalidateN2,
    invalidateN10,
    invalidateN16,
  } = useStore();

  const handleN10Change = (text: string) => {
    const n10v = +text;
    if (Number.isNaN(n10v)) {
      invalidateN10();
    } else {
      allValid();
      setN2(n10v.toString(2));
      setN16(n10v.toString(16));
    }
  };

  const handleN2Change = (text: string) => {
    const n2v = +`0b${text}`;
    if (Number.isNaN(n2v)) {
      invalidateN2();
    } else {
      allValid();
      setN10(n2v.toString());
      setN16(n2v.toString(16));
    }
  };

  const handleN16Change = (text: string) => {
    const n16v = +`0x${text}`;
    if (Number.isNaN(n16v)) {
      invalidateN16();
    } else {
      allValid();
      setN10(n16v.toString());
      setN2(n16v.toString(2));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold m-12 text-center">进制转换器</h1>
      <div className="grid gap-4 items-baseline max-w-md px-4 mx-auto" style={{ gridTemplateColumns: "5rem 1fr" }}>
        &emsp;二进制：
        <Input
          className="font-mono"
          varient={n2Invalid ? "error" : "default"}
          value={n2}
          onChange={(e) => {
            setN2(e.target.value);
            handleN2Change(e.target.value);
          }}
        />
        &emsp;十进制：
        <Input
          className="font-mono"
          varient={n10Invalid ? "error" : "default"}
          value={n10}
          onChange={(e) => {
            setN10(e.target.value);
            handleN10Change(e.target.value);
          }}
        />
        十六进制：
        <Input
          className="font-mono"
          varient={n16Invalid ? "error" : "default"}
          value={n16}
          onChange={(e) => {
            setN16(e.target.value);
            handleN16Change(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
