"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface Building {
  built: boolean;
  tileX: number;
  tileY: number;
  icon: string;
  label: string;
  color: string;
  desc: string;
  w: number;
  h: number;
  cost: number;
}

interface GameState {
  points: number;
  tokens: number;
  reputation: number;
  buildings: Record<string, Building>;
}

type PhaseName = "startup" | "growing" | "established" | "enterprise";
type PhaseBuildings = string[];

const PHASES: { name: PhaseName; label: string; buildings: PhaseBuildings }[] = [
  { name: "startup",     label: "🚀 Startup",     buildings: ["hq", "ai_hub", "chat_plaza"] },
  { name: "growing",     label: "📈 Growing",     buildings: ["whatsapp", "voice", "mail"] },
  { name: "established", label: "🏆 Established", buildings: ["data", "rd", "web"] },
  { name: "enterprise",  label: "💎 Enterprise",  buildings: ["network"] },
];

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const TILE_W = 64;
const TILE_H = 32;
const STORAGE_KEY = "pickaitycoon_state";

const DEFAULT_BUILDINGS: Record<string, Omit<Building, "built">> = {
  hq:        { tileX: 2, tileY: 2, icon: "🏢", label: "HQ",              color: "#38bdf8", desc: "Your headquarters. The heart of the campus.",            w: 1, h: 1, cost: 0 },
  ai_hub:    { tileX: 4, tileY: 2, icon: "🤖", label: "AI Hub",          color: "#a78bfa", desc: "The AI engine that powers your agents.",                w: 1, h: 1, cost: 100 },
  chat_plaza:{ tileX: 6, tileY: 2, icon: "💬", label: "Chat Plaza",      color: "#34d399", desc: "Modern web chat widget for your website.",              w: 1, h: 1, cost: 150 },
  whatsapp:  { tileX: 1, tileY: 4, icon: "🟢", label: "WhatsApp Wing",   color: "#25d366", desc: "WhatsApp integration. Green-themed, always connected.", w: 1, h: 1, cost: 300 },
  voice:     { tileX: 3, tileY: 4, icon: "🎙️", label: "Voice Tower",    color: "#f472b6", desc: "Tall tower for voice calls. Handles phone conversations.",   w: 1, h: 1, cost: 500 },
  mail:      { tileX: 5, tileY: 4, icon: "📧", label: "Mail Depot",      color: "#fbbf24", desc: "Email automation depot. Processes inquiries, follow-ups.",      w: 1, h: 1, cost: 400 },
  data:      { tileX: 7, tileY: 4, icon: "📊", label: "Data Center",     color: "#fb923c", desc: "Analytics & CRM. Track leads, conversations, growth.",    w: 1, h: 1, cost: 600 },
  rd:        { tileX: 2, tileY: 6, icon: "🧪", label: "R&D Lab",         color: "#e879f9", desc: "Research lab for premium AI models. Faster, smarter.",        w: 1, h: 1, cost: 800 },
  network:   { tileX: 4, tileY: 6, icon: "📡", label: "Network Tower",   color: "#22d3ee", desc: "Multi-channel hub. Connect Discord, Telegram, and more.",    w: 1, h: 1, cost: 1000 },
  web:       { tileX: 6, tileY: 6, icon: "🌐", label: "Web Studio",      color: "#60a5fa", desc: "Build your landing page and manage your domain.",           w: 1, h: 1, cost: 700 },
};

const UNLOCK_ORDER: { id: string; prereq: string }[] = [
  { id: "ai_hub",    prereq: "hq" },
  { id: "chat_plaza",prereq: "hq" },
  { id: "whatsapp",  prereq: "ai_hub" },
  { id: "mail",      prereq: "chat_plaza" },
  { id: "voice",     prereq: "ai_hub" },
  { id: "data",      prereq: "chat_plaza" },
  { id: "rd",        prereq: "data" },
  { id: "web",       prereq: "data" },
  { id: "network",   prereq: "rd" },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function tileToScreen(tx: number, ty: number, z = 0) {
  return { x: (tx - ty) * TILE_W / 2, y: (tx + ty) * TILE_H / 2 - z };
}

function darkenColor(hex: string, amount: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

function brightenColor(hex: string, amount: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

/* ═══════════════════════════════════════════════════════════════
   CANVAS DRAWING
   ═══════════════════════════════════════════════════════════════ */

function drawEmptyPlot(ctx: CanvasRenderingContext2D, tx: number, ty: number) {
  const { x: bx, y: by } = tileToScreen(tx, ty, 0);
  const sw = TILE_W / 2;
  const sh = TILE_H / 2;
  ctx.fillStyle = "rgba(56,189,248,0.03)";
  ctx.beginPath();
  ctx.moveTo(bx, by - sh); ctx.lineTo(bx + sw, by); ctx.lineTo(bx, by + sh); ctx.lineTo(bx - sw, by);
  ctx.closePath(); ctx.fill();
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "rgba(56,189,248,0.25)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(bx, by - sh); ctx.lineTo(bx + sw, by); ctx.lineTo(bx, by + sh); ctx.lineTo(bx - sw, by);
  ctx.closePath(); ctx.stroke();
  ctx.setLineDash([]);
}

function drawIsoBuilding(ctx: CanvasRenderingContext2D, tx: number, ty: number, height: number, color: string, accent: string, icon: string, label: string, isSelected = false) {
  const { x: bx, y: by } = tileToScreen(tx, ty, 0);
  const sw = TILE_W / 2;
  const sh = TILE_H / 2;

  // Roof
  const ry = by - height;
  ctx.beginPath();
  ctx.moveTo(bx, ry - sh); ctx.lineTo(bx + sw, ry); ctx.lineTo(bx, ry + sh); ctx.lineTo(bx - sw, ry);
  ctx.closePath();

  // Glow only when selected
  if (isSelected) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 24;
  }

  ctx.fillStyle = color; ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.shadowBlur = 0;

  // Right face
  ctx.beginPath();
  ctx.moveTo(bx + sw, ry); ctx.lineTo(bx + sw, by); ctx.lineTo(bx, by + sh); ctx.lineTo(bx, ry + sh);
  ctx.closePath();
  ctx.fillStyle = darkenColor(color, 15); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.stroke();

  // Left face
  ctx.beginPath();
  ctx.moveTo(bx - sw, ry); ctx.lineTo(bx - sw, by); ctx.lineTo(bx, by + sh); ctx.lineTo(bx, ry + sh);
  ctx.closePath();
  ctx.fillStyle = darkenColor(color, 30); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.stroke();

  // Icon
  ctx.font = "20px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(icon, bx, ry - sh + 2);

  // Label
  ctx.font = "bold 10px Inter, sans-serif"; ctx.fillStyle = "#e2e8f0"; ctx.textBaseline = "top";
  ctx.fillText(label, bx, by + sh + 4);
}

function drawTree(ctx: CanvasRenderingContext2D, tx: number, ty: number) {
  const { x, y } = tileToScreen(tx, ty, 0);
  ctx.fillStyle = "#5c3a1e";
  ctx.fillRect(x - 2, y - 22, 4, 14);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = `rgba(52,211,153,${0.35 - i * 0.07})`;
    ctx.beginPath(); ctx.arc(x, y - 26 - i * 3, 14 - i * 2, 0, Math.PI * 2); ctx.fill();
  }
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function TycoonGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>({ points: 50, tokens: 0, reputation: 0, buildings: {} });
  const camRef = useRef({ x: 0, y: 0, zoom: 1 });
  const panningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const [, forceRender] = useState(0);
  const [selectedBld, setSelectedBld] = useState<{ id: string; icon: string; label: string; desc: string; x: number; y: number } | null>(null);
  const selectedBldRef = useRef(selectedBld);
  selectedBldRef.current = selectedBld;

  // ── Load / init state ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        stateRef.current = parsed;
      } else {
        const blds: Record<string, Building> = {};
        for (const [id, cfg] of Object.entries(DEFAULT_BUILDINGS)) {
          blds[id] = { ...cfg, built: id === "hq" };
        }
        stateRef.current = { points: 50, tokens: 0, reputation: 0, buildings: blds };
      }
    } catch {
      const blds: Record<string, Building> = {};
      for (const [id, cfg] of Object.entries(DEFAULT_BUILDINGS)) {
        blds[id] = { ...cfg, built: id === "hq" };
      }
      stateRef.current = { points: 50, tokens: 0, reputation: 0, buildings: blds };
    }
    forceRender(n => n + 1);
  }, []);

  // ── Save helper ──
  const save = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stateRef.current)); } catch {}
  }, []);

  // ── Drawing ──
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cam = camRef.current;
    const state = stateRef.current;

    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(cam.x, cam.y);
    ctx.scale(cam.zoom, cam.zoom);

    const cw = W / cam.zoom;
    const ch = H / cam.zoom;
    const ox = -cam.x / cam.zoom;
    const oy = -cam.y / cam.zoom;

    // Background
    const bg = ctx.createRadialGradient(0, -100, 50, 0, 0, 600);
    bg.addColorStop(0, "#0b1124"); bg.addColorStop(0.5, "#0f1a2e"); bg.addColorStop(1, "#080e1a");
    ctx.fillStyle = bg; ctx.fillRect(-800, -600, 1600, 1200);

    // Ground
    ctx.fillStyle = "#0d1f1a"; ctx.fillRect(ox, oy, cw, ch);

    // Grid
    ctx.strokeStyle = "rgba(56,189,248,0.04)"; ctx.lineWidth = 1;
    for (let i = -4; i <= 10; i++) {
      const a = tileToScreen(i, -2, 0); const b = tileToScreen(i, 10, 0);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      const c = tileToScreen(-2, i, 0); const d = tileToScreen(10, i, 0);
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.stroke();
    }

    // Trees
    const treePos = [[0.5,1],[3,0.5],[5.5,0.5],[8,1],[0.5,3],[8.5,3],[0.5,5],[8.5,5],[0.5,7],[3,7.5],[5.5,7.5],[8,7]];
    treePos.forEach(([tx, ty]) => drawTree(ctx, tx, ty));

    // Buildings
    const sorted = Object.entries(state.buildings).sort((a, b) => (a[1].tileY + a[1].tileX) - (b[1].tileY + b[1].tileX));
    sorted.forEach(([id, b]) => {
      if (b.built) {
        const height = Math.max(30, (b.cost || 0) / 10 + 30);
        drawIsoBuilding(ctx, b.tileX, b.tileY, height, b.color, brightenColor(b.color, 20), b.icon, b.label, id === selectedBldRef.current?.id);
      } else {
        drawEmptyPlot(ctx, b.tileX, b.tileY);
      }
    });

    ctx.restore();
  }, []);

  // ── Resize + draw ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onResize = () => {
      const cam = camRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 60;
      const center = tileToScreen(4, 4, 0);
      cam.x = canvas.width / 2 - center.x * cam.zoom;
      cam.y = canvas.height / 2 - center.y * cam.zoom + 60;
      draw();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  // ── Auto-income ──
  useEffect(() => {
    const interval = setInterval(() => {
      const state = stateRef.current;
      let earned = 0;
      Object.values(state.buildings).forEach(b => {
        if (b.built) earned += Math.floor((b.cost || 50) / 50) + 1;
      });
      if (earned > 0) {
        state.points += earned;
        save();
        forceRender(n => n + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [save]);

  // ── Re-draw on state change ──
  useEffect(() => { draw(); }, [draw]);

  // ── Canvas event handlers ──
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    panningRef.current = true;
    panStartRef.current = { x: e.clientX - camRef.current.x, y: e.clientY - camRef.current.y };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!panningRef.current) return;
    camRef.current.x = e.clientX - panStartRef.current.x;
    camRef.current.y = e.clientY - panStartRef.current.y;
    draw();
  }, [draw]);

  useEffect(() => {
    const up = () => { panningRef.current = false; };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  // Wheel zoom — use native listener with { passive: false } to prevent page scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const dz = e.deltaY > 0 ? 0.9 : 1.1;
      camRef.current.zoom = Math.min(2.5, Math.max(0.4, camRef.current.zoom * dz));
      draw();
    };
    canvas.addEventListener("wheel", onWheelNative, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheelNative);
  }, [draw]);

  const onClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cam = camRef.current;
    const mx = (e.clientX - rect.left - cam.x) / cam.zoom;
    const my = (e.clientY - rect.top - cam.y) / cam.zoom;
    const state = stateRef.current;

    for (const [id, b] of Object.entries(state.buildings)) {
      if (!b.built) continue;
      const { x: bx, y: by } = tileToScreen(b.tileX, b.tileY, 0);
      const sw = TILE_W / 2;
      const sh = TILE_H / 2;
      const height = Math.max(30, (b.cost || 0) / 10 + 30);
      if (mx > bx - sw && mx < bx + sw && my > by - height - sh && my < by + sh) {
        // Toggle: if clicking the same building, close it
        if (selectedBld?.id === id) {
          setSelectedBld(null);
        } else {
          setSelectedBld({
            id,
            icon: b.icon,
            label: b.label,
            desc: b.desc,
            x: Math.min(e.clientX + 14, window.innerWidth - 280),
            y: Math.min(e.clientY + 14, window.innerHeight - 180),
          });
        }
        return;
      }
    }
    // Clicked empty space — deselect
    setSelectedBld(null);
  }, [selectedBld]);

  // ── Build action ──
  const canBuild = useCallback((id: string) => {
    const entry = UNLOCK_ORDER.find(u => u.id === id);
    if (!entry) return true;
    return stateRef.current.buildings[entry.prereq]?.built === true;
  }, []);

  const construct = useCallback((id: string) => {
    const state = stateRef.current;
    const b = state.buildings[id];
    if (!b || b.built || !b.cost) return;
    if (state.points < b.cost) return;
    if (!canBuild(id)) return;
    state.points -= b.cost;
    state.buildings[id] = { ...b, built: true };
    state.reputation += 10;
    save();
    forceRender(n => n + 1);
  }, [canBuild, save]);

  // ── Render ──
  const state = stateRef.current;
  const sortedBuildings = Object.entries(state.buildings || {}).sort((a, b) => {
    if (a[1].built !== b[1].built) return a[1].built ? -1 : 1;
    return (a[1].cost || 0) - (b[1].cost || 0);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", background: "#0a0f1a", fontFamily: "Inter, sans-serif", color: "#e2e8f0", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", background: "rgba(15,23,42,0.92)", borderBottom: "1px solid rgba(56,189,248,0.15)", flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 800, background: "linear-gradient(135deg, #38bdf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          PickAITycoon
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
            <span>💡</span><span style={{ color: "#38bdf8" }}>{Math.floor(state.points)}</span>
          </span>
          <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
            <span>🔧</span><span>{Math.floor(state.tokens)}</span>
          </span>
          <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
            <span>⭐</span><span style={{ color: "#fbbf24" }}>{Math.floor(state.reputation)}</span>
          </span>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: "block", flex: 1, cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onClick={onClick}
      />

      {/* Building tooltip — stays open until closed */}
      {selectedBld && (
        <div style={{
          position: "fixed", left: selectedBld.x, top: selectedBld.y, zIndex: 100,
          background: "rgba(15,23,42,0.96)", border: "1px solid rgba(56,189,248,0.25)",
          borderRadius: 12, padding: "14px 18px", maxWidth: 260,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <h3 style={{ fontSize: 14, color: "#f1f5f9", margin: 0 }}>
              {selectedBld.icon} {selectedBld.label}
            </h3>
            <button
              onClick={() => setSelectedBld(null)}
              style={{
                background: "none", border: "none", color: "#64748b", cursor: "pointer",
                fontSize: 16, padding: 0, lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
            {selectedBld.desc}
          </p>
        </div>
      )}

      {/* Phase indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "4px 24px", background: "rgba(15,23,42,0.7)", borderTop: "1px solid rgba(56,189,248,0.08)", flexShrink: 0 }}>
        {PHASES.map((phase) => {
          const allBuilt = phase.buildings.every(id => state.buildings[id]?.built);
          const anyBuilt = phase.buildings.some(id => state.buildings[id]?.built);
          return (
            <span key={phase.name} style={{
              fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
              background: allBuilt ? "rgba(52,211,153,0.15)" : anyBuilt ? "rgba(56,189,248,0.08)" : "rgba(148,163,184,0.05)",
              color: allBuilt ? "#34d399" : anyBuilt ? "#38bdf8" : "#64748b",
              border: `1px solid ${allBuilt ? "rgba(52,211,153,0.3)" : anyBuilt ? "rgba(56,189,248,0.15)" : "rgba(148,163,184,0.1)"}`,
            }}>
              {phase.label}
            </span>
          );
        })}
      </div>

      {/* Building Panel */}
      <div style={{ display: "flex", gap: 12, padding: "10px 24px", background: "rgba(15,23,42,0.94)", borderTop: "1px solid rgba(56,189,248,0.12)", overflowX: "auto", flexShrink: 0 }}>
        {sortedBuildings.map(([id, b]) => {
          const locked = !b.built && !canBuild(id);
          return (
            <div key={id} style={{
              flexShrink: 0, width: 150, background: "rgba(30,41,59,0.8)", borderRadius: 10,
              border: `1px solid ${b.built ? "rgba(52,211,153,0.3)" : "rgba(56,189,248,0.1)"}`,
              padding: 10, opacity: locked ? 0.5 : 1, cursor: locked ? "not-allowed" : "default",
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{b.built ? "✅" : b.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9" }}>{b.label}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                {b.built ? "🟢 Active" : locked ? "🔒 Locked" : "Available"}
              </div>
              {!b.built && b.cost ? <div style={{ fontSize: 10, color: "#38bdf8", marginTop: 4, fontWeight: 600 }}>💡 {b.cost} pts</div> : null}
              {!b.built && !locked ? (
                <button
                  onClick={() => construct(id)}
                  disabled={state.points < (b.cost || 0)}
                  style={{
                    marginTop: 6, padding: "3px 12px", borderRadius: 6, border: "none",
                    fontSize: 11, fontWeight: 600, cursor: state.points >= (b.cost || 0) ? "pointer" : "not-allowed",
                    background: state.points >= (b.cost || 0) ? "#38bdf8" : "#334155",
                    color: state.points >= (b.cost || 0) ? "#0f172a" : "#64748b",
                    width: "100%",
                  }}
                >
                  Build
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TycoonGame;