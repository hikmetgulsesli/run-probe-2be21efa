import { useCallback, useMemo, useRef } from "react";
import { StatusUtilityRunProbe } from "./screens";
import {
  RunProbeShellProvider,
  useRunProbeShell,
  type RunProbeShellApi,
  type RunProbeShellState,
} from "./features/run-probe/run-probe.store";
import { actRefreshStatus } from "./features/surf-status-utility/act_refresh_status";
import { actToggleStatus } from "./features/surf-status-utility/act_toggle_status";

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
    markRefreshed,
  } = useRunProbeShell();
  const activeSurfaceId = state.preferences.activeSurfaceId;
  const activePanel = state.preferences.activePanel;
  const lastError = state.lastError;
  const lastRefreshedAt = state.preferences.lastRefreshedAt;
  const refreshTick = state.refreshTick;
  const autoRefresh = state.preferences.autoRefresh;

  const stateRef = useRef<RunProbeShellState>(state);
  stateRef.current = state;
  const shellRef = useRef<Pick<RunProbeShellApi, "markRefreshed" | "selectRecord" | "setAutoRefresh">>({
    markRefreshed,
    selectRecord,
    setAutoRefresh,
  });
  shellRef.current = { markRefreshed, selectRecord, setAutoRefresh };

  const handleRefreshAction = useCallback(() => {
    const current = stateRef.current.preferences.selectedRecordId;
    const fallback = stateRef.current.records[0]?.id ?? null;
    actRefreshStatus(current, fallback, {
      shell: shellRef.current,
      currentRefreshTick: stateRef.current.refreshTick,
    });
  }, []);

  const handleManualRefreshAction = useCallback(() => {
    const current = stateRef.current.preferences.selectedRecordId;
    const fallback = stateRef.current.records[0]?.id ?? null;
    actRefreshStatus(current, fallback, {
      shell: shellRef.current,
      currentRefreshTick: stateRef.current.refreshTick,
    });
  }, []);

  const handleSettingsAction = useCallback(() => {
    actToggleStatus(stateRef.current.preferences.autoRefresh, {
      setAutoRefresh: (enabled) => setAutoRefresh(enabled),
    });
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
        autoRefresh={autoRefresh}
      />
    </div>
  );
}