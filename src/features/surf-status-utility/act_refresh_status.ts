import type {
  RunProbeShellApi,
} from "../run-probe/run-probe.store";

export interface ActRefreshStatusOptions {
  shell?: Pick<RunProbeShellApi, "markRefreshed" | "selectRecord">;
  markRefreshed?: () => void;
  selectRecord?: (recordId: string | null) => void;
}

export interface ActRefreshStatusResult {
  refreshTick: number;
  lastRefreshedAt: number;
  selectedRecordId: string | null;
  activeSurfaceId: string;
  status: "refreshed";
}

const FALLBACK_SELECT_RECORD: (recordId: string | null) => void = () => undefined;
const FALLBACK_MARK_REFRESHED: () => void = () => undefined;

export function actRefreshStatus(
  currentSelectedRecordId: string | null,
  fallbackRecordId: string | null = null,
  options: ActRefreshStatusOptions = {},
): ActRefreshStatusResult {
  const doMarkRefreshed =
    options.markRefreshed ??
    (options.shell ? () => options.shell?.markRefreshed() : FALLBACK_MARK_REFRESHED);
  const doSelectRecord =
    options.selectRecord ??
    (options.shell ? (id) => options.shell?.selectRecord(id) : FALLBACK_SELECT_RECORD);

  const nextSelected = currentSelectedRecordId ?? fallbackRecordId;
  if (nextSelected !== currentSelectedRecordId) {
    doSelectRecord(nextSelected);
  }
  doMarkRefreshed();

  const now = Date.now();
  return {
    refreshTick: now,
    lastRefreshedAt: now,
    selectedRecordId: nextSelected,
    activeSurfaceId: "SURF_STATUS_UTILITY",
    status: "refreshed",
  };
}

export default actRefreshStatus;