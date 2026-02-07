import { AppStateContext } from "@/contexts";
import type { AppStateType } from "@/types";
import type { ReactNode } from "react";
import { useState } from "react";

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const state: AppStateType = { loading };
  return (
    <AppStateContext.Provider value={{ state, setLoading }}>
      {children}
    </AppStateContext.Provider>
  );
};
