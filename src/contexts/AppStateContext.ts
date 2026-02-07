import { createContext } from "react";
import type { AppStateType } from "@/types";

interface AppStateContextType {
  state: AppStateType;
  setLoading: (loading: boolean) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);
