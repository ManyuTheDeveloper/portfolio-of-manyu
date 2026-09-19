'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Cpu,
  Gamepad2,
  LayoutDashboard,
  Play,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

/* ---------------------------------- Snake ---------------------------------- */

const GRID = 20
const CELL = 18
const SPEED_MS = 110

type Point = { x: number; y: number }

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const stateRef = useRef({
    snake: [{ x: 8, y: 10 }] as Point[],
    dir: { x: 1, y: 0 } as Point,
    nextDir: { x: 1, y: 0 } as Point,
    food: { x: 14, y: 10 } as Point,
  })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { snake, food } = stateRef.current

    ctx.fillStyle = '#070b16'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL, 0)
      ctx.lineTo(i * CELL, GRID * CELL)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL)
      ctx.lineTo(GRID * CELL, i * CELL)
      ctx.stroke()
    }

    // food
    ctx.fillStyle = '#8b5cf6'
    ctx.shadowColor = '#8b5cf6'
    ctx.shadowBlur = 12
    ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6)
    ctx.shadowBlur = 0

    // snake
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#06b6d4' : 'rgba(6,182,212,0.7)'
      if (i === 0) {
        ctx.shadowColor = '#06b6d4'
        ctx.shadowBlur = 10
      }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
      ctx.shadowBlur = 0
    })
  }, [])

  const reset = useCallback(() => {
    stateRef.current = {
      snake: [{ x: 8, y: 10 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 14, y: 10 },
    }
    setScore(0)
    draw()
  }, [draw])

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    if (status !== 'playing') return

    const id = setInterval(() => {
      const s = stateRef.current
      s.dir = s.nextDir
      const head = {
        x: s.snake[0].x + s.dir.x,
        y: s.snake[0].y + s.dir.y,
      }

      // wall or self collision
      const hitWall =
        head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
      const hitSelf = s.snake.some((seg) => seg.x === head.x && seg.y === head.y)
      if (hitWall || hitSelf) {
        setStatus('over')
        setBest((b) => Math.max(b, s.snake.length - 1))
        return
      }

      s.snake.unshift(head)

      if (head.x === s.food.x && head.y === s.food.y) {
        setScore((sc) => sc + 1)
        // place new food not on the snake
        let next: Point
        do {
          next = {
            x: Math.floor(Math.random() * GRID),
            y: Math.floor(Math.random() * GRID),
          }
        } while (s.snake.some((seg) => seg.x === next.x && seg.y === next.y))
        s.food = next
      } else {
        s.snake.pop()
      }

      draw()
    }, SPEED_MS)

    return () => clearInterval(id)
  }, [status, draw])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      }
      const dir = map[e.key]
      if (!dir) return
      e.preventDefault()
      const cur = stateRef.current.dir
      // prevent 180° reversal
      if (dir.x === -cur.x && dir.y === -cur.y) return
      stateRef.current.nextDir = dir
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function start() {
    if (status === 'over') reset()
    setStatus('playing')
  }

  function nudge(dir: Point) {
    const cur = stateRef.current.dir
    if (dir.x === -cur.x && dir.y === -cur.y) return
    stateRef.current.nextDir = dir
    if (status === 'idle') setStatus('playing')
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 text-cyan">
            <Gamepad2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none">Neon Snake</h3>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              Canvas API · collision · physics
            </p>
          </div>
        </div>
        <div className="text-right font-mono text-xs">
          <p className="text-cyan">
            score <span className="text-foreground">{score}</span>
          </p>
          <p className="text-muted-foreground">best {best}</p>
        </div>
      </div>

      <div className="relative mt-4 flex justify-center">
        <canvas
          ref={canvasRef}
          width={GRID * CELL}
          height={GRID * CELL}
          className="w-full max-w-[360px] rounded-xl border border-white/10"
          aria-label="Snake game board"
        />
        {status !== 'playing' && (
          <div className="absolute inset-0 grid place-items-center rounded-xl bg-navy/70 backdrop-blur-sm">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-purple px-5 py-2.5 text-sm font-semibold text-navy transition-transform hover:scale-105 glow-cyan"
            >
              {status === 'over' ? (
                <>
                  <RotateCcw className="h-4 w-4" /> Play Again
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Start Game
                </>
              )}
            </button>
            {status === 'over' && (
              <p className="absolute bottom-4 font-mono text-xs text-muted-foreground">
                Game over — you scored {score}
              </p>
            )}
          </div>
        )}
      </div>

      {/* touch / click controls */}
      <div className="mx-auto mt-4 grid w-40 grid-cols-3 gap-2 sm:hidden">
        <span />
        <ControlButton label="Up" onClick={() => nudge({ x: 0, y: -1 })}>
          ↑
        </ControlButton>
        <span />
        <ControlButton label="Left" onClick={() => nudge({ x: -1, y: 0 })}>
          ←
        </ControlButton>
        <ControlButton label="Down" onClick={() => nudge({ x: 0, y: 1 })}>
          ↓
        </ControlButton>
        <ControlButton label="Right" onClick={() => nudge({ x: 1, y: 0 })}>
          →
        </ControlButton>
      </div>

      <p className="mt-4 hidden text-center font-mono text-[11px] text-muted-foreground sm:block">
        Use arrow keys or WASD to move
      </p>
    </div>
  )
}

function ControlButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="glass glass-hover grid h-11 place-items-center rounded-lg text-lg text-cyan"
    >
      {children}
    </button>
  )
}

/* --------------------------- Tic-Tac-Toe vs AI ----------------------------- */

type Cell = 'X' | 'O' | null

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function winnerOf(board: Cell[]): { player: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }
  return null
}

// Minimax: AI is 'O', human is 'X'. Returns score for 'O'.
function minimax(board: Cell[], isMax: boolean, depth: number): number {
  const win = winnerOf(board)
  if (win) return win.player === 'O' ? 10 - depth : depth - 10
  if (board.every(Boolean)) return 0

  if (isMax) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O'
        best = Math.max(best, minimax(board, false, depth + 1))
        board[i] = null
      }
    }
    return best
  }
  let best = Infinity
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'X'
      best = Math.min(best, minimax(board, true, depth + 1))
      board[i] = null
    }
  }
  return best
}

function bestMove(board: Cell[]): number {
  let move = -1
  let bestScore = -Infinity
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O'
      const score = minimax(board, false, 0)
      board[i] = null
      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  return move
}

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [busy, setBusy] = useState(false)
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 })

  const win = winnerOf(board)
  const full = board.every(Boolean)
  const over = Boolean(win) || full

  const scoredRef = useRef(false)

  useEffect(() => {
    if (!over || scoredRef.current) return
    scoredRef.current = true
    if (win?.player === 'X') setScore((s) => ({ ...s, wins: s.wins + 1 }))
    else if (win?.player === 'O')
      setScore((s) => ({ ...s, losses: s.losses + 1 }))
    else setScore((s) => ({ ...s, draws: s.draws + 1 }))
  }, [over, win])

  function play(i: number) {
    if (board[i] || over || busy) return
    const next = [...board]
    next[i] = 'X'
    setBoard(next)

    if (winnerOf(next) || next.every(Boolean)) return

    setBusy(true)
    setTimeout(() => {
      const move = bestMove([...next])
      if (move !== -1) next[move] = 'O'
      setBoard([...next])
      setBusy(false)
    }, 320)
  }

  function reset() {
    scoredRef.current = false
    setBoard(Array(9).fill(null))
    setBusy(false)
  }

  const status = win
    ? win.player === 'X'
      ? 'You win!'
      : 'AI wins'
    : full
      ? "It's a draw"
      : busy
        ? 'AI thinking…'
        : 'Your move'

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 text-purple">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none">
              Tic-Tac-Toe AI
            </h3>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              minimax · unbeatable opponent
            </p>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-muted-foreground">
          <p className="text-cyan">
            W <span className="text-foreground">{score.wins}</span> · L{' '}
            <span className="text-foreground">{score.losses}</span> · D{' '}
            <span className="text-foreground">{score.draws}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-5 grid w-full max-w-[300px] grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const isWinCell = win?.line.includes(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              disabled={Boolean(cell) || over || busy}
              aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ', empty'}`}
              className={`grid aspect-square place-items-center rounded-xl border text-2xl font-bold transition-all disabled:cursor-not-allowed ${
                isWinCell
                  ? 'border-cyan/60 bg-cyan/10'
                  : 'border-white/10 bg-navy/40 hover:border-white/20 hover:bg-white/5'
              } ${cell === 'X' ? 'text-cyan' : 'text-purple'}`}
              style={
                isWinCell ? { boxShadow: '0 0 14px rgba(6,182,212,0.4)' } : undefined
              }
            >
              {cell}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <span className="font-mono text-xs text-muted-foreground">{status}</span>
        <button
          type="button"
          onClick={reset}
          className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
        >
          <RotateCcw className="h-4 w-4 text-cyan" /> New Game
        </button>
      </div>
    </div>
  )
}

/* ------------------------------ Web App Demo ------------------------------- */

type Task = { id: number; text: string; done: boolean }

const seedTasks: Task[] = [
  { id: 1, text: 'Design component system', done: true },
  { id: 2, text: 'Build responsive dashboard', done: true },
  { id: 3, text: 'Wire up REST API layer', done: false },
  { id: 4, text: 'Ship to production', done: false },
]

export function WebAppDemo() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks)
  const [input, setInput] = useState('')

  const done = tasks.filter((t) => t.done).length
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  function add() {
    const text = input.trim()
    if (!text) return
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }])
    setInput('')
  }

  function toggle(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function remove(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 text-cyan">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold leading-none">Task Board</h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            React state · reusable UI
          </p>
        </div>
      </div>

      {/* progress */}
      <div className="mt-5 rounded-xl border border-white/10 bg-navy/40 p-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-muted-foreground">progress</span>
          <span className="text-cyan">
            {done}/{tasks.length} · {pct}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* add task */}
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) add()
          }}
          placeholder="Add a task…"
          aria-label="Add a task"
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cyan/50"
        />
        <button
          type="button"
          onClick={add}
          aria-label="Add task"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan to-purple px-3 py-2 text-sm font-semibold text-navy transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* list */}
      <ul className="mt-4 flex max-h-52 flex-col gap-2 overflow-y-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
          >
            <button
              type="button"
              onClick={() => toggle(task.id)}
              aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
              className="shrink-0 text-cyan"
            >
              {task.done ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            <span
              className={`flex-1 text-sm transition-colors ${
                task.done
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground'
              }`}
            >
              {task.text}
            </span>
            <button
              type="button"
              onClick={() => remove(task.id)}
              aria-label="Delete task"
              className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-purple group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="rounded-lg border border-dashed border-white/10 py-6 text-center font-mono text-xs text-muted-foreground">
            No tasks — add one above
          </li>
        )}
      </ul>
    </div>
  )
}
