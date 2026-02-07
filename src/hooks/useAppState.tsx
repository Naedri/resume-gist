import { AppStateContext } from "@/contexts";
import { useContext } from "react";

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
};
