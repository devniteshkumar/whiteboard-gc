import { create } from "zustand"

export type Tool =
  | "cursor"
  | "square"
  | "diamond"
  | "circle"
  | "arrow"
  | "line"
  | "pen"
  | "eraser"

export const useToolStore = create<{
  tool: Tool
  setTool: (tool: Tool) => void
}>(set => ({
  tool: "pen",
  setTool: tool => set({ tool }),
}))
