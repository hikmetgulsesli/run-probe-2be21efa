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
  const { setActivePanel, selectRecord, state } = useRunProbeShell();
  const { activeSurfaceId, selectedRecordId } = state.preferences;
  const firstRecordId = state.records[0]?.id ?? null;

  const handleRefreshAction = useCallback(() => {
    selectRecord(null);
  }, [selectRecord]);

  const handleManualRefreshAction = useCallback(() => {
    const next = selectedRecordId ?? firstRecordId;
    selectRecord(next);
  }, [selectRecord, selectedRecordId, firstRecordId]);

  const handleSettingsAction = useCallback(() => {
    setActivePanel("settings");
  }, [setActivePanel]);

  const handleDocumentationLink = useCallback(() => {
    setActivePanel("documentation");
  }, [setActivePanel]);

  const handlePrivacyLink = useCallback(() => {
    setActivePanel("privacy");
  }, [setActivePanel]);

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
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-950"
    >
      <StatusUtilityRunProbe actions={screenActions} />
    </div>
  );
}
