import { useCallback, useMemo, useRef } from "react";
import { StatusUtilityRunProbe } from "./screens";
import {
  RunProbeShellProvider,
  useRunProbeShell,
  type RunProbeShellState,
} from "./features/run-probe/run-probe.store";

export default function App() {
  return (
    <RunProbeShellProvider storage={typeof window === "undefined" ? null : window.localStorage}>
      <AppShell />
    </RunProbeShellProvider>
  );
}

const INTERVAL_OPTIONS_SECONDS = [30, 60, 120, 300] as const;

function AppShell() {
  const {
    state,
    selectRecord,
    setAutoRefresh,
    setIntervalSeconds,
    setActivePanel,
  } = useRunProbeShell();
  const activeSurfaceId = state.preferences.activeSurfaceId;
  const activePanel = state.preferences.activePanel;
  const lastError = state.lastError;
  const lastRefreshedAt = state.preferences.lastRefreshedAt;
  const refreshTick = state.refreshTick;

  const stateRef = useRef<RunProbeShellState>(state);
  stateRef.current = state;

  const handleRefreshAction = useCallback(() => {
    selectRecord(null);
  }, [selectRecord]);

  const handleManualRefreshAction = useCallback(() => {
    const current = stateRef.current.preferences.selectedRecordId;
    const fallback = stateRef.current.records[0]?.id ?? null;
    selectRecord(current ?? fallback);
  }, [selectRecord]);

  const handleSettingsAction = useCallback(() => {
    setAutoRefresh(!stateRef.current.preferences.autoRefresh);
    setActivePanel("settings");
  }, [setAutoRefresh, setActivePanel]);

  const handleDocumentationLink = useCallback(() => {
    const current = stateRef.current.preferences.intervalSeconds;
    const currentIndex = INTERVAL_OPTIONS_SECONDS.indexOf(
      current as (typeof INTERVAL_OPTIONS_SECONDS)[number],
    );
    const nextValue =
      INTERVAL_OPTIONS_SECONDS[
        currentIndex === -1 ? 0 : (currentIndex + 1) % INTERVAL_OPTIONS_SECONDS.length
      ];
    setIntervalSeconds(nextValue);
    setActivePanel("documentation");
  }, [setIntervalSeconds, setActivePanel]);

  const handlePrivacyLink = useCallback(() => {
    const nextRecord = stateRef.current.records[0]?.id ?? null;
    selectRecord(nextRecord);
    setActivePanel("privacy");
  }, [selectRecord, setActivePanel]);

  const screenActions = useMemo(
    () => ({
      "refresh-1": handleRefreshAction,
      "settings-2": handleSettingsAction,
      "manual-refresh-3": handleManualRefreshAction,
      "documentation-1": handleDocumentationLink,
      "privacy-2": handlePrivacyLink,
    }),
    [
      handleRefreshAction,
      handleSettingsAction,
      handleManualRefreshAction,
      handleDocumentationLink,
      handlePrivacyLink,
    ],
  );

  return (
    <div
      data-setfarm-root="run-probe-shell"
      data-testid="setfarm-app-root"
      data-active-surface={activeSurfaceId}
      data-active-panel={activePanel}
      data-last-error={lastError ?? ""}
      data-last-refreshed-at={lastRefreshedAt ?? ""}
      data-refresh-tick={refreshTick}
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-950"
    >
      <StatusUtilityRunProbe
        actions={screenActions}
        lastRefreshedAt={lastRefreshedAt}
        autoRefresh={state.preferences.autoRefresh}
      />
    </div>
  );
}