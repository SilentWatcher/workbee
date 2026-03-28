import React, { useRef, useEffect, useState, useCallback } from 'react'
import { 
  Plus, 
  Trash2, 
  Calendar, 
  MousePointer2, 
  Hand, 
  PenLine, 
  Eraser, 
  Square, 
  Heart 
} from 'lucide-react'
import './StickyView.scss'

const StickyView = ({ tasks, onAddTask, onDeleteTask, onUpdateTask }) => {
  const canvasRef = useRef(null)
  
  // Refs for high-frequency data to avoid React re-renders
  const stateRef = useRef({
    stickyNotes: [],
    drawings: [],
    currentPath: null,
    zoom: 1,
    pan: { x: 0, y: 0 },
    draggingNote: null,
    resizingNote: null,
    clickedNote: null,
    isPanning: false,
    offset: { x: 0, y: 0 },
    needsRedraw: true,
    opacity: 1
  })

  // React state for UI and filtering
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filterMode, setFilterMode] = useState('today')
  const [activeTool, setActiveTool] = useState('select')

  // Helper to wrap text and calculate height
  const getWrappedTextInfo = (ctx, text, maxWidth, lineHeight) => {
    if (!text) return { lines: 0, height: 0 };
    const words = text.split(' ')
    let line = ''
    let lineCount = 0
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        line = words[n] + ' '
        lineCount++
      } else {
        line = testLine
      }
    }
    lineCount++
    return { lines: lineCount, height: lineCount * lineHeight };
  }

  // Load and sync tasks
  useEffect(() => {
    const savedNotes = localStorage.getItem('sticky_notes_positions')
    const positions = savedNotes ? JSON.parse(savedNotes) : {}
    const savedDrawings = localStorage.getItem('sticky_view_drawings')
    if (savedDrawings) stateRef.current.drawings = JSON.parse(savedDrawings)
    
    stateRef.current.stickyNotes = tasks.map((task, index) => {
      const savedPos = positions[task.id] || {
        x: (index % 5) * 250 + 50,
        y: Math.floor(index / 5) * 200 + 50,
        width: 200,
        height: 150, // Initial height, will be auto-calculated
        color: 'yellow',
        rotation: (Math.random() - 0.5) * 5
      }
      return { ...task, ...savedPos }
    })
    stateRef.current.needsRedraw = true
  }, [tasks])

  // Save data periodically or on changes
  const saveToLocal = useCallback(() => {
    const positions = {}
    stateRef.current.stickyNotes.forEach(note => {
      positions[note.id] = { 
        x: note.x, 
        y: note.y, 
        width: note.width, 
        height: note.height,
        color: note.color || 'yellow',
        rotation: note.rotation || 0
      }
    })
    localStorage.setItem('sticky_notes_positions', JSON.stringify(positions))
    localStorage.setItem('sticky_view_drawings', JSON.stringify(stateRef.current.drawings))
  }, [])

  // Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false }) // Performance optimization
    let animationFrameId

    const render = () => {
      if (stateRef.current.needsRedraw) {
        const { pan, zoom, drawings, currentPath, stickyNotes, opacity, draggingNote, resizingNote, clickedNote } = stateRef.current
        
        // Desk-like background
        ctx.fillStyle = '#f5f5f7'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx.save()
        ctx.translate(pan.x, pan.y)
        ctx.scale(zoom, zoom)
        ctx.globalAlpha = opacity
        
        // Draw Drawings
        drawings.forEach(path => drawPath(ctx, path, zoom))
        if (currentPath) drawPath(ctx, currentPath, zoom)
        
        // Filter and draw notes
        const filteredNotes = stickyNotes.filter(note => {
          if (!note.dueDate) return true
          const noteDate = new Date(note.dueDate + ', ' + new Date().getFullYear())
          return noteDate.toDateString() === selectedDate.toDateString()
        })

        filteredNotes.forEach(note => drawRealisticNote(ctx, note, zoom, draggingNote, resizingNote, clickedNote))
        
        ctx.restore()
        stateRef.current.needsRedraw = false
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [selectedDate])

  const drawPath = (ctx, path, zoom) => {
    ctx.beginPath()
    ctx.strokeStyle = path.color || '#334155'
    ctx.lineWidth = (path.width || 2) / zoom
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    if (path.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else {
      ctx.globalCompositeOperation = 'source-over'
    }
    
    if (path.type === 'path') {
      path.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      })
    } else if (path.type === 'shape') {
      if (path.shape === 'square') {
        ctx.strokeRect(path.x, path.y, path.w, path.h)
      }
    } else if (path.type === 'stamp') {
      ctx.font = `${24}px Inter, sans-serif`
      ctx.fillText('❤️', path.x, path.y)
    }
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'
  }

  const drawRealisticNote = (ctx, note, zoom, draggingNote, resizingNote, clickedNote) => {
    ctx.save()
    ctx.translate(note.x + note.width / 2, note.y + note.height / 2)
    ctx.rotate((note.rotation * Math.PI) / 180)
    
    if (clickedNote?.id === note.id) ctx.scale(0.98, 0.98)
    
    ctx.translate(-note.width / 2, -note.height / 2)

    // Calculate auto-height if content changes
    ctx.font = `bold 18px Caveat, cursive`
    const titleInfo = getWrappedTextInfo(ctx, note.title, note.width - 30, 22)
    ctx.font = `13px Inter, sans-serif`
    const descInfo = getWrappedTextInfo(ctx, note.description || '', note.width - 30, 18)
    
    const minHeight = 150
    const padding = 60 // Top/Bottom padding + project footer
    const calculatedHeight = Math.max(minHeight, titleInfo.height + descInfo.height + padding)
    
    // Smoothly update height in ref if it changed
    if (Math.abs(note.height - calculatedHeight) > 1) {
      note.height = calculatedHeight
      stateRef.current.needsRedraw = true
    }

    const isHovered = draggingNote?.id === note.id || resizingNote?.id === note.id

    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
    ctx.shadowBlur = isHovered ? 20 / zoom : 10 / zoom
    ctx.shadowOffsetX = isHovered ? 10 / zoom : 5 / zoom
    ctx.shadowOffsetY = isHovered ? 10 / zoom : 5 / zoom

    const colors = {
      yellow: { bg: '#fff9c4', border: '#f9eda2', light: '#fffde7' },
      pink: { bg: '#fce4ec', border: '#f8bbd0', light: '#fdf2f7' },
      blue: { bg: '#e3f2fd', border: '#bbdefb', light: '#f1f8fe' },
      green: { bg: '#e8f5e9', border: '#c8e6c9', light: '#f3faf4' },
      purple: { bg: '#f3e5f5', border: '#e1bee7', light: '#f8f2f9' }
    }
    const theme = colors[note.color] || colors.yellow
    
    const grad = ctx.createLinearGradient(0, 0, note.width, note.height)
    grad.addColorStop(0, theme.light)
    grad.addColorStop(1, theme.bg)
    ctx.fillStyle = grad

    ctx.beginPath()
    const curl = 12
    ctx.moveTo(0, 0)
    ctx.lineTo(note.width, 0)
    ctx.lineTo(note.width, note.height - curl)
    ctx.quadraticCurveTo(note.width - curl/2, note.height - curl/2, note.width - curl, note.height)
    ctx.lineTo(0, note.height)
    ctx.closePath()
    ctx.fill()

    // Texture
    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = 'rgba(0,0,0,0.02)'
    for (let i = 0; i < 30; i++) ctx.fillRect(Math.random() * note.width, Math.random() * note.height, 1, 1)
    ctx.globalCompositeOperation = 'source-over'

    ctx.shadowBlur = 0
    ctx.strokeStyle = theme.border
    ctx.lineWidth = 0.5 / zoom
    ctx.stroke()

    // Corner shadow
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    ctx.beginPath()
    ctx.moveTo(note.width, note.height - curl)
    ctx.quadraticCurveTo(note.width - curl/2, note.height - curl/2, note.width - curl, note.height)
    ctx.lineTo(note.width, note.height)
    ctx.fill()

    // Content
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.font = `bold 18px Caveat, cursive`
    wrapText(ctx, note.title, 15, 30, note.width - 30, 22)
    
    ctx.font = `13px Inter, sans-serif`
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    wrapText(ctx, note.description || '', 15, 30 + titleInfo.height + 10, note.width - 30, 18)

    ctx.font = `bold 11px Inter, sans-serif`
    ctx.fillStyle = '#3b82f6'
    ctx.fillText((note.project || 'GENERAL').toUpperCase(), 15, note.height - 15)

    if (isHovered) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)'
      ctx.beginPath()
      ctx.arc(note.width - 15, 15, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ef4444'
      ctx.font = 'bold 12px Arial'
      ctx.fillText('×', note.width - 20, 20)
    }

    const colorOptions = ['yellow', 'pink', 'blue', 'green', 'purple']
    colorOptions.forEach((color, i) => {
      ctx.fillStyle = colors[color].bg
      ctx.beginPath()
      ctx.arc(15 + i * 20, note.height - 35, 7, 0, Math.PI * 2)
      ctx.fill()
      if (note.color === color) {
        ctx.strokeStyle = 'rgba(0,0,0,0.4)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    })

    ctx.restore()
  }

  const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    if (!text) return 0
    const words = text.split(' ')
    let line = ''
    let lines = 0
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
        lines++
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, y)
    return lines + 1
  }

  // Input Handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left - stateRef.current.pan.x) / stateRef.current.zoom
    const y = (e.clientY - rect.top - stateRef.current.pan.y) / stateRef.current.zoom

    if (activeTool === 'hand' || e.button === 1 || (e.button === 0 && e.altKey)) {
      stateRef.current.isPanning = true
      stateRef.current.offset = { x: e.clientX, y: e.clientY }
      return
    }

    if (activeTool === 'pen' || activeTool === 'eraser') {
      stateRef.current.currentPath = {
        type: 'path',
        tool: activeTool,
        color: activeTool === 'pen' ? '#334155' : 'transparent',
        width: activeTool === 'pen' ? 3 : 20,
        points: [{ x, y }]
      }
      stateRef.current.needsRedraw = true
      return
    }

    if (activeTool === 'shape') {
      stateRef.current.currentPath = {
        type: 'shape',
        shape: 'square',
        x, y, w: 0, h: 0,
        color: '#334155',
        width: 2
      }
      stateRef.current.needsRedraw = true
      return
    }

    if (activeTool === 'like') {
      stateRef.current.drawings.push({ type: 'stamp', x, y })
      stateRef.current.needsRedraw = true
      saveToLocal()
      return
    }

    const note = getNoteAt(x, y)
    if (note) {
      if (isDeleting(note, x, y)) {
        onDeleteTask(note.id)
        stateRef.current.stickyNotes = stateRef.current.stickyNotes.filter(n => n.id !== note.id)
        stateRef.current.needsRedraw = true
        return
      }
      const newColor = getColorAt(note, x, y)
      if (newColor) {
        note.color = newColor
        stateRef.current.needsRedraw = true
        saveToLocal()
        return
      }
      if (isResizing(note, x, y)) {
        stateRef.current.resizingNote = note
      } else {
        stateRef.current.clickedNote = note
        stateRef.current.draggingNote = note
        stateRef.current.offset = { x: x - note.x, y: y - note.y }
        stateRef.current.stickyNotes = [...stateRef.current.stickyNotes.filter(n => n.id !== note.id), note]
      }
      stateRef.current.needsRedraw = true
    } else {
      stateRef.current.isPanning = true
      stateRef.current.offset = { x: e.clientX, y: e.clientY }
    }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const { pan, zoom, isPanning, draggingNote, resizingNote, currentPath, offset } = stateRef.current
    
    if (isPanning) {
      const dx = e.clientX - offset.x
      const dy = e.clientY - offset.y
      stateRef.current.pan = { x: pan.x + dx, y: pan.y + dy }
      stateRef.current.offset = { x: e.clientX, y: e.clientY }
      stateRef.current.needsRedraw = true
      return
    }

    const x = (e.clientX - rect.left - pan.x) / zoom
    const y = (e.clientY - rect.top - pan.y) / zoom

    if (currentPath) {
      if (currentPath.type === 'path') {
        currentPath.points.push({ x, y })
      } else if (currentPath.type === 'shape') {
        currentPath.w = x - currentPath.x
        currentPath.h = y - currentPath.y
      }
      stateRef.current.needsRedraw = true
      return
    }

    if (draggingNote) {
      draggingNote.x = x - offset.x
      draggingNote.y = y - offset.y
      stateRef.current.needsRedraw = true
    } else if (resizingNote) {
      resizingNote.width = Math.max(150, x - resizingNote.x)
      resizingNote.height = Math.max(100, y - resizingNote.y)
      stateRef.current.needsRedraw = true
    }
  }

  const handleMouseUp = () => {
    if (stateRef.current.currentPath) {
      stateRef.current.drawings.push(stateRef.current.currentPath)
      stateRef.current.currentPath = null
      saveToLocal()
    }
    if (stateRef.current.draggingNote || stateRef.current.resizingNote) {
      saveToLocal()
    }
    stateRef.current.draggingNote = null
    stateRef.current.resizingNote = null
    stateRef.current.clickedNote = null
    stateRef.current.isPanning = false
    stateRef.current.needsRedraw = true
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const { pan, zoom } = stateRef.current
    const scaleFactor = 1.1
    const delta = e.deltaY > 0 ? 1 / scaleFactor : scaleFactor
    const newZoom = Math.min(Math.max(0.1, zoom * delta), 5)
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    stateRef.current.pan = {
      x: mouseX - (mouseX - pan.x) * (newZoom / zoom),
      y: mouseY - (mouseY - pan.y) * (newZoom / zoom)
    }
    stateRef.current.zoom = newZoom
    stateRef.current.needsRedraw = true
  }

  // Helpers
  const getNoteAt = (x, y) => {
    const reversed = [...stateRef.current.stickyNotes].reverse()
    return reversed.find(n => x >= n.x && x <= n.x + n.width && y >= n.y && y <= n.y + n.height)
  }
  const isResizing = (n, x, y) => {
    const size = 20 / stateRef.current.zoom
    return x >= n.x + n.width - size && x <= n.x + n.width && y >= n.y + n.height - size && y <= n.y + n.height
  }
  const isDeleting = (n, x, y) => {
    const d = Math.sqrt(Math.pow(x - (n.x + n.width - 15), 2) + Math.pow(y - (n.y + 15), 2))
    return d <= 12 / stateRef.current.zoom
  }
  const getColorAt = (n, x, y) => {
    const colors = ['yellow', 'pink', 'blue', 'green', 'purple']
    for (let i = 0; i < colors.length; i++) {
      const d = Math.sqrt(Math.pow(x - (n.x + 15 + i * 20), 2) + Math.pow(y - (n.y + n.height - 35), 2))
      if (d <= 10 / stateRef.current.zoom) return colors[i]
    }
    return null
  }

  // Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      switch (e.key.toLowerCase()) {
        case 'v': setActiveTool('select'); break
        case 'h': setActiveTool('hand'); break
        case 'p': setActiveTool('pen'); break
        case 'e': setActiveTool('eraser'); break
        case 's': setActiveTool('shape'); break
        case 'l': setActiveTool('like'); break
        case 'n': onAddTask(); break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onAddTask])

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = Math.max(800, window.innerHeight - 350)
        stateRef.current.needsRedraw = true
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="sticky-view-container">
      <div className="sticky-sidebar">
        <button className={`tool-btn ${activeTool === 'select' ? 'active' : ''}`} onClick={() => setActiveTool('select')} title="Select (V)"><MousePointer2 size={20} /></button>
        <button className={`tool-btn ${activeTool === 'hand' ? 'active' : ''}`} onClick={() => setActiveTool('hand')} title="Hand (H)"><Hand size={20} /></button>
        <div className="tool-divider" />
        <button className={`tool-btn ${activeTool === 'pen' ? 'active' : ''}`} onClick={() => setActiveTool('pen')} title="Pen (P)"><PenLine size={20} /></button>
        <button className={`tool-btn ${activeTool === 'eraser' ? 'active' : ''}`} onClick={() => setActiveTool('eraser')} title="Eraser (E)"><Eraser size={20} /></button>
        <button className={`tool-btn ${activeTool === 'shape' ? 'active' : ''}`} onClick={() => setActiveTool('shape')} title="Shape (S)"><Square size={20} /></button>
        <button className={`tool-btn ${activeTool === 'like' ? 'active' : ''}`} onClick={() => setActiveTool('like')} title="Like (L)"><Heart size={20} /></button>
        <div className="tool-divider" />
        <button className="tool-btn add-btn" onClick={onAddTask} title="New Note (N)"><Plus size={20} /></button>
      </div>

      <div className="sticky-main">
        <div className="sticky-controls">
          <div className="date-filters">
            <button className={`filter-btn ${filterMode === 'yesterday' ? 'active' : ''}`} onClick={() => { setFilterMode('yesterday'); const d = new Date(); d.setDate(d.getDate()-1); setSelectedDate(d); stateRef.current.needsRedraw = true; }}>Yesterday</button>
            <button className={`filter-btn ${filterMode === 'today' ? 'active' : ''}`} onClick={() => { setFilterMode('today'); setSelectedDate(new Date()); stateRef.current.needsRedraw = true; }}>Today</button>
            <button className={`filter-btn ${filterMode === 'tomorrow' ? 'active' : ''}`} onClick={() => { setFilterMode('tomorrow'); const d = new Date(); d.setDate(d.getDate()+1); setSelectedDate(d); stateRef.current.needsRedraw = true; }}>Tomorrow</button>
            <div className="custom-date"><Calendar size={16} /><input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => { setSelectedDate(new Date(e.target.value)); setFilterMode('custom'); stateRef.current.needsRedraw = true; }} /></div>
          </div>
        </div>

        <div className="canvas-wrapper">
          <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} onContextMenu={(e) => e.preventDefault()} />
          <div className="canvas-instructions">
            {activeTool === 'select' ? 'Drag to move • Resize handle in corner • Click colors' : 
             activeTool === 'hand' ? 'Drag to pan around the desk' :
             activeTool === 'pen' ? 'Draw anywhere on the desk' :
             activeTool === 'eraser' ? 'Erase your drawings' :
             activeTool === 'shape' ? 'Drag to draw squares' : 'Click to stamp ❤️'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickyView
