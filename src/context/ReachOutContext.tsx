import { createContext, useContext, useState, useRef, type ReactNode } from "react";

type ReachOutContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** scrolls to the footer and opens the panel — used by the nav's mail icon */
  openFromAnywhere: () => void;
  footerRef: React.RefObject<HTMLElement | null>;
};

const ReachOutContext = createContext<ReachOutContextValue | null>(null);

export function ReachOutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  function openFromAnywhere() {
    footerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setOpen(true);
  }

  return (
    <ReachOutContext.Provider value={{ open, setOpen, openFromAnywhere, footerRef }}>
      {children}
    </ReachOutContext.Provider>
  );
}

export function useReachOut() {
  const ctx = useContext(ReachOutContext);
  if (!ctx) throw new Error("useReachOut must be used within a ReachOutProvider");
  return ctx;
}
