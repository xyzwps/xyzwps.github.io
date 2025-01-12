import { useState } from "react";
import Input from "../../../react/Input";

export default function App() {
  const [n2, setN2] = useState("");
  const [n2Invalid, setN2Invalid] = useState(false);
  const [n10, setN10] = useState("");
  const [n10Invalid, setN10Invalid] = useState(false);
  const [n16, setN16] = useState("");
  const [n16Invalid, setN16Invalid] = useState(false);

  const allValid = () => {
    setN2Invalid(false);
    setN10Invalid(false);
    setN16Invalid(false);
  };

  const handleN10Change = (text: string) => {
    const n10v = +text;
    if (Number.isNaN(n10v)) {
      setN10Invalid(true);
    } else {
      allValid();
      setN2(n10v.toString(2));
      setN16(n10v.toString(16));
    }
  };

  const handleN2Change = (text: string) => {
    const n2v = +`0b${text}`;
    if (Number.isNaN(n2v)) {
      setN2Invalid(true);
    } else {
      allValid();
      setN10(n2v.toString());
      setN16(n2v.toString(16));
    }
  };

  const handleN16Change = (text: string) => {
    const n16v = +`0x${text}`;
    if (Number.isNaN(n16v)) {
      setN16Invalid(true);
    } else {
      allValid();
      setN10(n16v.toString());
      setN2(n16v.toString(2));
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold m-8">进制转换器</h1>
      <div className="flex flex-col gap-4 max-w-xl">
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
    </div>
  );
}
