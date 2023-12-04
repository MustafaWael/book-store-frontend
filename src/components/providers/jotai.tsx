"use client";

import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

export default function JotaiProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

type HydrateAtomsProps = {
  initialValues: any;
  children: ReactNode;
};

export const HydrateAtoms = ({
  initialValues,
  children,
}: HydrateAtomsProps) => {
  // initialising on state with prop on render here
  useHydrateAtoms(initialValues);
  return children;
};
