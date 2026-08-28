import { useRef, useEffect, useCallback } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  pulsePhase: number
  type: 'primary' | 'secondary' | 'tiny'
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const initNodes = useCallback((width: number, height: number) => {
    const isMobile = width < 768
    const count = isMobile ? 28 : 55
    const nodes: Node[] = []

    for (let i = 0; i < count; i++) {
      let type: Node['type'] = 'tiny'
      if (i < count * 0.12) type = 'primary'
      else if (i < count * 0.35) type = 'secondary'

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: type === 'primary' ? 3 + Math.random() * 2 : type === 'secondary' ? 1.5 + Math.random() * 1.5 : 0.8 + Math.random(),
        opacity: 0.15 + Math.random() * 0.55,
        pulsePhase: Math.random() * Math.PI * 2,
        type,
      })
    }

    nodesRef.current = nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      initNodes(width, height)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const draw = () => {
      timeRef.current += 0.006
      const t = timeRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, width, height)

      const nodes = nodesRef.current
      const maxDist = width < 768 ? 120 : 180

      // Update positions
      nodes.forEach((node) => {
        const mdx = node.x - mouse.x
        const mdy = node.y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 150 && mdist > 0) {
          const force = (150 - mdist) / 150
          node.vx += (mdx / mdist) * force * 0.08
          node.vy += (mdy / mdist) * force * 0.08
        }

        node.vx *= 0.995
        node.vy *= 0.995
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      })

      // Dynamic connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist && (nodes[i].type !== 'tiny' || nodes[j].type !== 'tiny')) {
            const alpha = (1 - dist / maxDist) * 0.3
            const isAccent = nodes[i].type === 'primary' || nodes[j].type === 'primary'
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = isAccent
              ? `rgba(232, 255, 139, ${alpha * 0.7})`
              : `rgba(167, 139, 250, ${alpha * 0.45})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.5 + node.pulsePhase)
        const r = node.radius * pulse
        const alpha = node.opacity * (0.8 + 0.2 * Math.sin(t + node.pulsePhase * 0.7))

        if (node.type === 'primary') {
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 8)
          grad.addColorStop(0, `rgba(232, 255, 139, ${alpha * 0.35})`)
          grad.addColorStop(1, 'rgba(232, 255, 139, 0)')
          ctx.beginPath()
          ctx.arc(node.x, node.y, r * 8, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        if (node.type === 'primary') {
          ctx.fillStyle = `rgba(232, 255, 139, ${alpha})`
        } else if (node.type === 'secondary') {
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha * 0.8})`
        } else {
          ctx.fillStyle = `rgba(242, 242, 242, ${alpha * 0.5})`
        }
        ctx.fill()
      })

      // Geometric shapes
      const shapes = [
        { x: width * 0.75, y: height * 0.25, size: 40, rot: t * 0.3, accent: true },
        { x: width * 0.85, y: height * 0.6, size: 25, rot: -t * 0.2, accent: false },
        { x: width * 0.1, y: height * 0.7, size: 18, rot: t * 0.4, accent: false },
      ]

      shapes.forEach((s) => {
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rot)
        ctx.strokeStyle = s.accent ? 'rgba(232, 255, 139, 0.12)' : 'rgba(167, 139, 250, 0.1)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, -s.size)
        ctx.lineTo(s.size, 0)
        ctx.lineTo(0, s.size)
        ctx.lineTo(-s.size, 0)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      })

      // Scanning line
      const scanY = ((t * 80) % (height + 80)) - 40
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      scanGrad.addColorStop(0, 'rgba(232, 255, 139, 0)')
      scanGrad.addColorStop(0.5, 'rgba(232, 255, 139, 0.03)')
      scanGrad.addColorStop(1, 'rgba(232, 255, 139, 0)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 40, width, 80)

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  )
}
