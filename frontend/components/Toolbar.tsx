'use client'
import { useToolStore } from "@/store/useToolStore"

const icons = [
    { id: "cursor", label: "Select" },
    { id: "square", label: "Square" },
    { id: "diamond", label: "Diamond" },
    { id: "circle", label: "Circle" },
    { id: "arrow", label: "Arrow" },
    { id: "line", label: "Line" },
    { id: "pen", label: "Pen" },
];

export default function Toolbar() {
  const { tool, setTool } = useToolStore()

  return (
    <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-linear-to-r from-white to-gray-50/80 backdrop-blur-md p-2 shadow-xl ring-1 ring-white/20">
      {icons.map(icon => (
        <button
          key={icon.id}
          onClick={() => setTool(icon.id as any)}
          title={icon.label}
          className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ease-out
            ${
              tool === icon.id
                ? "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110 ring-2 ring-blue-300/50"
                : "hover:bg-white/60 text-gray-600 hover:text-gray-800 hover:shadow-md hover:scale-105 active:scale-95"
            }`}
        >
          <img src={`/icons/${icon.id}.svg`} className={`h-5 w-5 transition-all duration-200 ${tool === icon.id ? 'brightness-0 invert' : 'group-hover:brightness-110'}`} />
          {tool === icon.id && (
            <div className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-blue-400 shadow-sm"></div>
          )}
        </button>
      ))}
    </div>
  )
}
