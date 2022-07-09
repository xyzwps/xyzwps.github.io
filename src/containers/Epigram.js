import React from "react";
import { useRouteData } from "react-static";
import EpigramLayout from "../components/EpigramLayout";

export default function Anthology() {
  const { epigram, anthology } = useRouteData();

  return <EpigramLayout anthology={anthology} epigram={epigram} />;
}
