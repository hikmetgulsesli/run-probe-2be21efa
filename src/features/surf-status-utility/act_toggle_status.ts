import type { RunProbeShellApi } from "../run-probe/run-probe.store";

export type SystemState = "ready" | "paused";

export interface ActToggleStatusOptions {
  shell?: Pick<RunProbeShellApi, "setAutoRefresh">;
  setAutoRefresh?: (enabled: boolean) => void;
}

export interface ActToggleStatusResult {
  previousState: SystemState;
  nextState: SystemState;
  autoRefresh: boolean;
  activeSurfaceId: string;
  status: "toggled";
}

const FALLBACK_SET_AUTO_REFRESH: (enabled: boolean) => void = () => undefined;

export function actToggleStatus(
  currentAutoRefresh: boolean,
  options: ActToggleStatusOptions = {},
): ActToggleStatusResult {
  const shell = options.shell;
  const doSetAutoRefresh =
    options.setAutoRefresh ??
    (shell
      ? (enabled: boolean) => shell.setAutoRefresh?.(enabled)
      : FALLBACK_SET_AUTO_REFRESH);
  const previousState: SystemState = currentAutoRefresh ? "ready" : "paused";
  const nextState: SystemState = currentAutoRefresh ? "paused" : "ready";

  doSetAutoRefresh(nextState === "ready");

  return {
    previousState,
    nextState,
    autoRefresh: nextState === "ready",
    activeSurfaceId: "SURF_STATUS_UTILITY",
    status: "toggled",
  };
}

export default actToggleStatus;