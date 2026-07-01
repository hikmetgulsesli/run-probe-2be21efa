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
  const shell = useRunProbeShell();
  const activeSurface = shell.state.preferences.activeSurfaceId;

  const handleRefreshAction = useCallback(() => {
    shell.selectRecord(null);
  }, [shell]);

  const handleManualRefreshAction = useCallback(() => {
    const current = shell.state.preferences.selectedRecordId;
    const next = current ?? shell.state.records[0]?.id ?? null;
    shell.selectRecord(next);
  }, [shell]);

  const handleSettingsAction = useCallback(() => {
    shell.setActivePanel("settings");
  }, [shell]);

  const handleDocumentationLink = useCallback(() => {
    shell.setActivePanel("documentation");
  }, [shell]);

  const handlePrivacyLink = useCallback(() => {
    shell.setActivePanel("privacy");
  }, [shell]);

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
      data-active-surface={activeSurface}
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-950"
    >
      <StatusUtilityRunProbe actions={screenActions} />
    </div>
  );
}
