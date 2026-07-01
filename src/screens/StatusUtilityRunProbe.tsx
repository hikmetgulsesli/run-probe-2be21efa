// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Status Utility - Run Probe
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { useCallback, useState } from "react";
import { CircleAlert, Cpu, Database, RefreshCw, Router, Settings, Terminal } from "lucide-react";


export type StatusUtilityRunProbeActionId = "refresh-1" | "settings-2" | "manual-refresh-3" | "documentation-1" | "privacy-2";

export interface StatusUtilityRunProbeProps {
  actions?: Partial<Record<StatusUtilityRunProbeActionId, () => void>>;
  lastRefreshedAt?: number | null;
  autoRefresh?: boolean;
}

function formatTimestamp(at: number | null | undefined): string {
  if (typeof at !== "number") return "—";
  const d = new Date(at);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[d.getMonth()] ?? "Jan";
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${month} ${day}, ${hh}:${mm}:${ss}`;
}

export function StatusUtilityRunProbe({ actions, lastRefreshedAt, autoRefresh }: StatusUtilityRunProbeProps) {
  const [systemEnabled, setSystemEnabled] = useState<boolean>(autoRefresh ?? true);
  const [footerClickCount, setFooterClickCount] = useState<number>(0);
  const [footerPulse, setFooterPulse] = useState<number>(0);

  const handleSystemToggle = useCallback(() => {
    setSystemEnabled((prev) => !prev);
  }, []);

  const handleFooterClick = useCallback(() => {
    setFooterClickCount((c) => c + 1);
    setFooterPulse((p) => p + 1);
  }, []);

  const lastCheckedLabel = formatTimestamp(lastRefreshedAt);
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-background border-b border-outline-variant dark:border-outline docked full-width top-0 z-50">
      <div className="flex justify-between items-center h-14 px-gutter w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-sm">
      <Terminal data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} className="text-primary dark:text-primary-fixed" aria-hidden={true} focusable="false" />
      <span className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">Run Probe</span>
      </div>
      <div className="flex items-center gap-sm">
      <button aria-label="refresh" className="p-xs rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors" type="button" data-action-id="refresh-1" onClick={actions?.["refresh-1"]}>
      <RefreshCw className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="settings" className="p-xs rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors" type="button" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <Settings className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      </header>
      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-gutter lg:p-margin-desktop">
      {/* Utility Card Container */}
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col">
      {/* Card Header */}
      <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low rounded-t">
      <div>
      <h1 className="font-headline-md text-headline-md text-on-surface">System Status</h1>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Local diagnostics and readiness.</p>
      </div>
      {/* System State Toggle */}
      <div className="flex items-center gap-sm">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">State</span>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked={systemEnabled} onChange={handleSystemToggle} className="sr-only peer" id="system-state-toggle" type="checkbox" data-action-id="system-state-toggle" data-state={systemEnabled ? "ready" : "paused"} />
      <div className="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      </div>
      {/* Error Banner (Optional/Hidden by default, shown here for demonstration) */}
      <div className="bg-error-container border-b border-error/20 p-sm px-md flex items-start gap-sm" id="error-banner" style={{display: "none"}}>
      <CircleAlert data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} className="text-on-error-container text-[18px] mt-0.5" aria-hidden={true} focusable="false" />
      <div className="flex-1">
      <p className="font-body-sm text-body-sm text-on-error-container font-medium">Local state synchronization failed.</p>
      <p className="font-body-sm text-body-sm text-on-error-container opacity-80 text-[11px] leading-tight mt-0.5">Attempting automatic retry in 30s...</p>
      </div>
      </div>
      {/* Status Metrics Grid */}
      <div className="p-md flex flex-col gap-sm bg-surface-container-lowest">
      {/* Metric 1: Connectivity */}
      <div className="flex items-center justify-between p-sm border border-outline-variant rounded bg-surface">
      <div className="flex items-center gap-md">
      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
      <Router className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <p className="font-label-md text-label-md text-on-surface">Probe Connectivity</p>
      <p className="font-code-md text-code-md text-on-surface-variant text-[11px]">ws://localhost:8080/probe</p>
      </div>
      </div>
      <div className="status-ready px-2 py-1 rounded flex items-center gap-1 border border-green-200/50">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
      <span className="font-label-sm text-label-sm font-semibold tracking-wide">CONNECTED</span>
      </div>
      </div>
      {/* Metric 2: Storage */}
      <div className="flex items-center justify-between p-sm border border-outline-variant rounded bg-surface">
      <div className="flex items-center gap-md">
      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
      <Database className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <p className="font-label-md text-label-md text-on-surface">Local Storage</p>
      <p className="font-code-md text-code-md text-on-surface-variant text-[11px]">LevelDB / Vol: /data</p>
      </div>
      </div>
      <div className="status-ready px-2 py-1 rounded flex items-center gap-1 border border-green-200/50">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
      <span className="font-label-sm text-label-sm font-semibold tracking-wide">SYNCED</span>
      </div>
      </div>
      {/* Metric 3: Agent Readiness */}
      <div className="flex items-center justify-between p-sm border border-outline-variant rounded bg-surface">
      <div className="flex items-center gap-md">
      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
      <Cpu className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <p className="font-label-md text-label-md text-on-surface">Agent Readiness</p>
      <p className="font-code-md text-code-md text-on-surface-variant text-[11px]">Model: qwen-2.5-coder</p>
      </div>
      </div>
      {/* Example of a paused/warning state */}
      <div className="status-paused px-2 py-1 rounded flex items-center gap-1 border border-yellow-200/50" id="agent-status">
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
      <span className="font-label-sm text-label-sm font-semibold tracking-wide">IDLE</span>
      </div>
      </div>
      </div>
      {/* Action Area */}
      <div className="p-md bg-surface-container-low border-t border-outline-variant flex items-center justify-between rounded-b">
      <div className="flex items-center gap-xs text-on-surface-variant">
      <RefreshCw className="text-[14px]" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-[12px]" id="last-checked">Last checked: <span className="font-code-md text-[11px]" data-last-checked={lastCheckedLabel}>{lastCheckedLabel}</span></span>
      </div>
      <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded hover:bg-primary/90 transition-colors flex items-center gap-sm active:scale-95 transform duration-100" id="manual-refresh-btn" type="button" data-action-id="manual-refresh-3" onClick={actions?.["manual-refresh-3"]}>
      <RefreshCw className="text-[16px]" aria-hidden={true} focusable="false" />
                          Manual Refresh
                      </button>
      </div>
      </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline full-width bottom-0 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center py-sm px-gutter w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-sm">
      <button
        type="button"
        id="footer-brand-button"
        data-action-id="footer-brand"
        onClick={handleFooterClick}
        aria-live="polite"
        className="font-headline-md text-headline-md text-primary bg-transparent border-0 p-0 cursor-pointer"
        style={{fontSize: "14px"}}
      >
        Run Probe
      </button>
      <span className="text-on-surface-variant dark:text-on-secondary-container font-body-sm text-body-sm text-[11px]">© 2024 Run Probe Utility</span>
      <span
        id="footer-brand-feedback"
        data-footer-clicks={footerClickCount}
        data-footer-pulse={footerPulse}
        aria-hidden="true"
        className="sr-only"
      />
      </div>
      <div className="flex gap-md mt-2 md:mt-0">
      <a className="text-on-surface-variant dark:text-on-secondary-container font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200" href="#" data-action-id="documentation-1" onClick={(event) => { event.preventDefault(); actions?.["documentation-1"]?.(); }}>Documentation</a>
      <a className="text-on-surface-variant dark:text-on-secondary-container font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200" href="#" data-action-id="privacy-2" onClick={(event) => { event.preventDefault(); actions?.["privacy-2"]?.(); }}>Privacy</a>
      </div>
      </div>
      </footer>
      
    </>
  );
}
