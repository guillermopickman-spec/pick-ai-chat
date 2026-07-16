import { useState } from "react";
import { MODEL_OPTIONS, type ChatSettings } from "@/utils/api";

interface Props {
  settings: ChatSettings;
  onChange: (next: ChatSettings) => void;
}

export function SettingsPanel({ settings, onChange }: Props) {
  const isCustomModel = !MODEL_OPTIONS.includes(settings.model);
  const [mode, setMode] = useState<"preset" | "custom">(isCustomModel ? "custom" : "preset");

  return (
    <div className="border-b border-border bg-background/40 p-4 font-mono text-xs">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-muted-foreground">Model</span>
          <select
            value={mode === "custom" ? "__custom__" : settings.model}
            onChange={(e) => {
              if (e.target.value === "__custom__") {
                setMode("custom");
              } else {
                setMode("preset");
                onChange({ ...settings, model: e.target.value });
              }
            }}
            className="rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-magenta"
          >
            {MODEL_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
            <option value="__custom__">Custom…</option>
          </select>
        </label>

        {mode === "custom" && (
          <label className="flex flex-col gap-1.5">
            <span className="text-muted-foreground">Custom Model ID</span>
            <input
              type="text"
              value={settings.model}
              onChange={(e) => onChange({ ...settings, model: e.target.value })}
              placeholder="provider/model-name"
              className="rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-magenta"
              spellCheck={false}
            />
          </label>
        )}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Settings persist in localStorage. API key is handled server-side — never leaves the server.
      </p>
    </div>
  );
}