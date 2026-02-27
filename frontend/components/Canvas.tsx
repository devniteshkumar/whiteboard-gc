"use client"

import { Stage, Layer, Line, Rect, Circle, Arrow } from "react-konva"
import { useToolStore } from "@/store/useToolStore"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { io, Socket } from 'socket.io-client'

export default function Canvas() {
  const tool = useToolStore(s => s.tool)
  const [elements, setElements] = useState<any[]>([])
  const [draft, setDraft] = useState<any>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:5000')
    newSocket.emit('join-room', 'room1')
    newSocket.on('draw', (data: any) => {
      setElements(prev => [...prev, data.element])
    })
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateSize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  if (!size.width) return null // avoid first SSR mismatch

  const handleDown = (e: any) => {
    const pos = e.target.getStage().getPointerPosition()

    if (tool === "pen") {
      setDraft({
        id: nanoid(),
        type: "pen",
        points: [pos.x, pos.y],
      })
    }

    if (tool === "square") {
      setDraft({
        id: nanoid(),
        type: "square",
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
      })
    }

    if (tool === "circle") {
      setDraft({
        id: nanoid(),
        type: "circle",
        x: pos.x,
        y: pos.y,
        radius: 0,
      })
    }

    if (tool === "line" || tool === "arrow") {
      setDraft({
        id: nanoid(),
        type: tool,
        points: [pos.x, pos.y, pos.x, pos.y],
      })
    }

    if (tool === "diamond") {
      setDraft({
        id: nanoid(),
        type: "diamond",
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
      })
    }
  }

  const handleMove = (e: any) => {
    if (!draft) return
    const pos = e.target.getStage().getPointerPosition()

    if (draft.type === "pen") {
      setDraft({
        ...draft,
        points: [...draft.points, pos.x, pos.y],
      })
    }

    if (draft.type === "square" || draft.type === "diamond") {
      setDraft({
        ...draft,
        width: pos.x - draft.x,
        height: pos.y - draft.y,
      })
    }

    if (draft.type === "circle") {
      const dx = pos.x - draft.x
      const dy = pos.y - draft.y
      const radius = Math.sqrt(dx * dx + dy * dy)
      setDraft({
        ...draft,
        radius,
      })
    }

    if (draft.type === "line" || draft.type === "arrow") {
      setDraft({
        ...draft,
        points: [draft.points[0], draft.points[1], pos.x, pos.y],
      })
    }
  }

  const handleUp = () => {
    if (!draft) return
    socket?.emit('draw', { roomId: 'room1', element: draft })
    setElements(prev => [...prev, draft])
    setDraft(null)
  }

  return (
    <Stage
      width={size.width}
      height={size.height}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={size.width}
          height={size.height}
          fill="#ffffff"
        />
        {elements.map(el => {
          if (el.type === "pen") {
            return <Line key={el.id} points={el.points} stroke="black" />
          }
          if (el.type === "square") {
            return <Rect key={el.id} {...el} stroke="black" fill="transparent" />
          }
          if (el.type === "circle") {
            return <Circle key={el.id} x={el.x} y={el.y} radius={el.radius} stroke="black" fill="transparent" />
          }
          if (el.type === "line") {
            return <Line key={el.id} points={el.points} stroke="black" />
          }
          if (el.type === "arrow") {
            return <Arrow key={el.id} points={el.points} stroke="black" fill="black" pointerLength={10} pointerWidth={10} />
          }
          if (el.type === "diamond") {
            const { x, y, width, height } = el
            const points = [
              x + width / 2, y, // top
              x + width, y + height / 2, // right
              x + width / 2, y + height, // bottom
              x, y + height / 2, // left
            ]
            return <Line key={el.id} points={points} stroke="black" closed />
          }
          return null
        })}

        {draft &&
          (() => {
            if (draft.type === "pen") {
              return <Line points={draft.points} stroke="black" />
            }
            if (draft.type === "square") {
              return <Rect {...draft} stroke="black" fill="transparent" />
            }
            if (draft.type === "circle") {
              return <Circle x={draft.x} y={draft.y} radius={draft.radius} stroke="black" fill="transparent" />
            }
            if (draft.type === "line") {
              return <Line points={draft.points} stroke="black" />
            }
            if (draft.type === "arrow") {
              return <Arrow points={draft.points} stroke="black" fill="black" pointerLength={10} pointerWidth={10} />
            }
            if (draft.type === "diamond") {
              const { x, y, width, height } = draft
              const points = [
                x + width / 2, y,
                x + width, y + height / 2,
                x + width / 2, y + height,
                x, y + height / 2,
              ]
              return <Line points={points} stroke="black" closed />
            }
            return null
          })()}
      </Layer>
    </Stage>
  )
}
