import type { RunProbeShellApi } from "../features/run-probe/run-probe.store";

export interface RunProbeAppBridge {
  activeSurface: string;
  activeRoute: string;
  activePanel: string;
  selectedRecordId: string | null;
  selectedRecord: { id: string; label: string; status: string } | null;
  counts: { total: number; ready: number; paused: number; error: number };
  storageStatus: { state: string; reason: string; recoverable: boolean };
  lastError: string | null;
  initialised: boolean;
  setActiveSurface: (surfaceId: string) => void;
  setActivePanel: (panel: string) => void;
  selectRecord: (recordId: string | null) => void;
  resetPreferences: () => void;
}

export interface WindowWithApp {
  app?: RunProbeAppBridge;
}

export function readRunProbeApp(
  target: Window & WindowWithApp = window as Window & WindowWithApp,
): RunProbeAppBridge | null {
  const api = target.app;
  if (!api) return null;
  return {
    activeSurface: api.activeSurface,
    activeRoute: api.activeRoute,
    activePanel: api.activePanel,
    selectedRecordId: api.selectedRecord?.id ?? null,
    selectedRecord: api.selectedRecord
      ? {
          id: api.selectedRecord.id,
          label: api.selectedRecord.label,
          status: api.selectedRecord.status,
        }
      : null,
    counts: { ...api.counts },
    storageStatus: { ...api.storageStatus },
    lastError: api.lastError,
    initialised: api.initialised,
    setActiveSurface: api.setActiveSurface,
    setActivePanel: api.setActivePanel,
    selectRecord: api.selectRecord,
    resetPreferences: api.resetPreferences,
  };
}

export function expectInitialised(api: RunProbeAppBridge | null): asserts api is RunProbeAppBridge {
  if (!api || !api.initialised) {
    throw new Error("Run Probe app bridge has not finished bootstrapping yet.");
  }
}

export function summariseShell(shell: RunProbeShellApi) {
  return {
    activeSurface: shell.state.preferences.activeSurfaceId,
    activePanel: shell.state.preferences.activePanel,
    selectedRecordId: shell.state.preferences.selectedRecordId,
    counts: shell.counts,
    storageStatus: shell.state.storageStatus,
    lastError: shell.state.lastError,
    initialised: shell.state.initialised,
  };
}
