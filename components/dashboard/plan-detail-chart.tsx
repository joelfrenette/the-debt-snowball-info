"use client"

import { useEffect, useRef } from "react"

interface PlanDetailChartProps {
  months: number
  totalDebt: number
}

export function PlanDetailChart({ months, totalDebt }: PlanDetailChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#666"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels (months)
    const xStep = (width - 2 * padding) / months
    for (let i = 0; i <= months; i += Math.max(1, Math.floor(months / 6))) {
      const x = padding + i * xStep
      ctx.fillText(i.toString(), x, height - padding + 20)
    }

    // Y-axis labels (debt amount)
    const yStep = (height - 2 * padding) / 5
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - i * yStep
      const value = ((i * totalDebt) / 5).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
      ctx.fillText(value, padding - 20, y + 5)
    }

    // Draw minimum payment line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    for (let i = 0; i <= months; i++) {
      const x = padding + i * xStep
      const remainingDebt = totalDebt * (1 - i / (months * 1.3)) // Minimum payments take longer
      const y = height - padding - (remainingDebt / totalDebt) * (height - 2 * padding)
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = "#999"
    ctx.stroke()

    // Draw snowball line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    for (let i = 0; i <= months; i++) {
      const x = padding + i * xStep
      // Snowball method pays off faster with an accelerating curve
      const progress = i / months
      const remainingDebt = totalDebt * Math.max(0, 1 - progress * (1 + progress / 2))
      const y = height - padding - (remainingDebt / totalDebt) * (height - 2 * padding)
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 2
    ctx.stroke()

    // Add legend
    ctx.fillStyle = "#999"
    ctx.fillRect(width - padding - 120, padding, 10, 10)
    ctx.fillStyle = "#666"
    ctx.textAlign = "left"
    ctx.fillText("Minimum Payments", width - padding - 100, padding + 10)

    ctx.fillStyle = "#22c55e"
    ctx.fillRect(width - padding - 120, padding + 20, 10, 10)
    ctx.fillStyle = "#666"
    ctx.fillText("Snowball Method", width - padding - 100, padding + 30)
  }, [months, totalDebt])

  return (
    <div className="w-full h-64">
      <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
    </div>
  )
}
