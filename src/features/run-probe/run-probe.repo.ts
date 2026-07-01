import type { RunProbePreferences, RunProbeStorageStatus } from "./run-probe.store";

export const RUN_PROBE_STORAGE_KEY = "run-probe:preferences:v1";

const STORAGE_UNAVAILABLE: RunProbeStorageStatus = {
  state: "unavailable",
  reason: "Local storage is not available in this environment.",
  recoverable: true,
};

const STORAGE_CORRUPTED: RunProbeStorageStatus = {
  state: "corrupted",
  reason: "Stored run-probe preferences could not be parsed; defaults restored.",
  recoverable: true,
};

const STORAGE_OK: RunProbeStorageStatus = {
  state: "ok",
  reason: "",
  recoverable: true,
};

export interface PersistedLoadResult {
  preferences: RunProbePreferences;
  status: RunProbeStorageStatus;
}

export function loadRunProbePreferences(
  storage: Pick<Storage, "getItem"> | null | undefined,
  defaults: RunProbePreferences,
): PersistedLoadResult {
  if (!storage) {
    return { preferences: defaults, status: STORAGE_UNAVAILABLE };
  }
  let raw: string | null = null;
  try {
    raw = storage.getItem(RUN_PROBE_STORAGE_KEY);
  } catch {
    return { preferences: defaults, status: STORAGE_UNAVAILABLE };
  }
  if (raw === null || raw === "") {
    return { preferences: defaults, status: STORAGE_OK };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<RunProbePreferences>;
    if (!isValidPreferences(parsed)) {
      return { preferences: defaults, status: STORAGE_CORRUPTED };
    }
    return {
      preferences: { ...defaults, ...parsed },
      status: STORAGE_OK,
    };
  } catch {
    return { preferences: defaults, status: STORAGE_CORRUPTED };
  }
}

export interface PersistedSaveResult {
  saved: boolean;
  status: RunProbeStorageStatus;
}

export function saveRunProbePreferences(
  storage: Pick<Storage, "setItem"> | null | undefined,
  preferences: RunProbePreferences,
): PersistedSaveResult {
  if (!storage) {
    return { saved: false, status: STORAGE_UNAVAILABLE };
  }
  try {
    storage.setItem(RUN_PROBE_STORAGE_KEY, JSON.stringify(preferences));
    return { saved: true, status: STORAGE_OK };
  } catch {
    return { saved: false, status: STORAGE_UNAVAILABLE };
  }
}

export function clearRunProbePreferences(
  storage: Pick<Storage, "removeItem"> | null | undefined,
): PersistedSaveResult {
  if (!storage) {
    return { saved: false, status: STORAGE_UNAVAILABLE };
  }
  try {
    storage.removeItem(RUN_PROBE_STORAGE_KEY);
    return { saved: true, status: STORAGE_OK };
  } catch {
    return { saved: false, status: STORAGE_UNAVAILABLE };
  }
}

export function defaultRunProbePreferences(): RunProbePreferences {
  return {
    activeSurfaceId: "SURF_STATUS_UTILITY",
    activePanel: "overview",
    selectedRecordId: null,
    autoRefresh: true,
    intervalSeconds: 60,
    lastRefreshedAt: null,
  };
}

function isValidPreferences(value: unknown): value is Partial<RunProbePreferences> {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if ("activeSurfaceId" in candidate && typeof candidate.activeSurfaceId !== "string") {
    return false;
  }
  if ("activePanel" in candidate && typeof candidate.activePanel !== "string") {
    return false;
  }
  if ("selectedRecordId" in candidate) {
    if (candidate.selectedRecordId !== null && typeof candidate.selectedRecordId !== "string") {
      return false;
    }
  }
  if ("autoRefresh" in candidate && typeof candidate.autoRefresh !== "boolean") {
    return false;
  }
  if ("intervalSeconds" in candidate && typeof candidate.intervalSeconds !== "number") {
    return false;
  }
  if ("lastRefreshedAt" in candidate) {
    if (candidate.lastRefreshedAt !== null && typeof candidate.lastRefreshedAt !== "number") {
      return false;
    }
  }
  return true;
}
