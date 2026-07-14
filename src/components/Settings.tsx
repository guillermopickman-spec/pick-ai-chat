import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MODEL_OPTIONS, type ChatSettings } from "@/utils/api";

interface Props {
  settings: ChatSettings;
  onChange: (next: ChatSettings) => void;
}

export function SettingsPanel({ settings, onChange }: Props) {
  const [showKey, setShowKey] = useState(false);
  const isCustomModel = !MODEL_OPTIONS.includes(settings.model);
  const [mode, setMode] = useState<"preset" | "custom">(isCustomModel ? "custom" : "preset");

  return (
    <div className="border-b border-border bg-background/40 p-4 font-mono text-xs">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-muted-foreground">API Endpoint</span>
          <input
            type="url"
            value={settings.endpoint}
            onChange={(e) => onChange({ ...settings, endpoint: e.target.value })}
            className="rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-magenta"
            spellCheck={false}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-muted-foreground">API Key</span>
          <div className="flex items-stretch gap-1">
            <input
              type={showKey ? "text" : "password"}
              value={settings.apiKey}
              onChange={(e) => onChange({ ...settings, apiKey: e.target.value })}
              placeholder="sk-or-v1-..."
              className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-magenta"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="rounded-md border border-border bg-card px-3 text-muted-foreground hover:text-foreground"
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </label>

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
        Settings persist in localStorage. Your API key never leaves your browser.
      </p>
    </div>
  );
}
