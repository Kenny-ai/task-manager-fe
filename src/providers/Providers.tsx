"use client";
import React from "react";
import ProgressBarProvider from "./ProgressBar";
import ClientProvider from "./QueryClientProvider";
import ThemeProviders from "./themes/ThemeProvider";
import HydrationZustand from "./HydrationZustand";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressBarProvider>
      <ClientProvider>
        <ThemeProviders>
          <DndProvider backend={HTML5Backend}>
            <HydrationZustand>{children}</HydrationZustand>
          </DndProvider>
        </ThemeProviders>
      </ClientProvider>
    </ProgressBarProvider>
  );
};

export default Providers;
