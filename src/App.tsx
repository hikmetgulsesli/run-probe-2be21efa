import { useCallback, useMemo } from "react";
import { StatusUtilityRunProbe } from "./screens";
import { RunProbeShellProvider, useRunProbeShell } from "./features/run-probe/run-probe.store";

export default function App() {
  return (
    <RunProbeShellProvider storage={typeof window === "undefined" ? null : window.localStorage}>
      <AppShell />
    </RunProbeShellProvider>
  );
}

function AppShell() {
  const {
    setActiveSurface,
    setActivePanel,
    cycleSelectedRecord,
    markRefreshed,
    state,
  } = useRunProbeShell();
  const activeSurfaceId = state.preferences.activeSurfaceId;
  const activePanel = state.preferences.activePanel;
  const lastError = state.lastError;
  const hasRecords = state.records.length > 0;

  const handleRefreshAction = useCallback(() => {
    markRefreshed();
  }, [markRefreshed]);

  const handleManualRefreshAction = useCallback(() => {
    if (!hasRecords) {
      markRefreshed();
      return;
    }
    cycleSelectedRecord();
  }, [cycleSelectedRecord, markRefreshed, hasRecords]);

  const handleSettingsAction = useCallback(() => {
    setActiveSurface("SURF_SETTINGS");
    setActivePanel("settings");
  }, [setActiveSurface, setActivePanel]);

  const handleDocumentationLink = useCallback(() => {
    setActiveSurface("SURF_DOCUMENTATION");
    setActivePanel("documentation");
  }, [setActiveSurface, setActivePanel]);

  const handlePrivacyLink = useCallback(() => {
    setActiveSurface("SURF_PRIVACY");
    setActivePanel("privacy");
  }, [setActiveSurface, setActivePanel]);

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
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-950"
    >
      <StatusUtilityRunProbe actions={screenActions} />
    </div>
  );
}
