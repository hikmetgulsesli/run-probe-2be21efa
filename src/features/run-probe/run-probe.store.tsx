import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from "react";
import { runProbeFixture } from "../../__fixtures__/run-probe.fixture";
import {
  clearRunProbePreferences,
  defaultRunProbePreferences,
  loadRunProbePreferences,
  saveRunProbePreferences,
  type PersistedLoadResult,
  type PersistedSaveResult,
} from "./run-probe.repo";

export type RunProbeStatus = "ready" | "paused" | "error";

export interface RunProbeRecord {
  id: string;
  label: string;
  status: RunProbeStatus;
  target: string;
  intervalSeconds: number;
  autoRefresh: boolean;
}

export type RunProbeStorageState = "idle" | "ok" | "corrupted" | "unavailable";

export interface RunProbeStorageStatus {
  state: RunProbeStorageState;
  reason: string;
  recoverable: boolean;
}

export interface RunProbePreferences {
  activeSurfaceId: string;
  activePanel: string;
  selectedRecordId: string | null;
  autoRefresh: boolean;
  intervalSeconds: number;
}

export interface RunProbeShellState {
  preferences: RunProbePreferences;
  records: RunProbeRecord[];
  storageStatus: RunProbeStorageStatus;
  lastError: string | null;
  initialised: boolean;
}

export type RunProbeShellAction =
  | { type: "BOOTSTRAP"; payload: PersistedLoadResult }
  | { type: "SET_ACTIVE_SURFACE"; surfaceId: string }
  | { type: "SET_ACTIVE_PANEL"; panel: string }
  | { type: "SELECT_RECORD"; recordId: string | null }
  | { type: "SET_AUTO_REFRESH"; enabled: boolean }
  | { type: "SET_INTERVAL_SECONDS"; seconds: number }
  | { type: "RECORD_STORAGE_STATUS"; status: RunProbeStorageStatus; saved: boolean }
  | { type: "SET_LAST_ERROR"; message: string | null }
  | { type: "RESET_PREFERENCES"; payload: PersistedSaveResult };

const buildInitialState = (loadResult: PersistedLoadResult): RunProbeShellState => ({
  preferences: loadResult.preferences,
  records: runProbeFixture,
  storageStatus: loadResult.status,
  lastError: loadResult.status.state === "corrupted" ? loadResult.status.reason : null,
  initialised: true,
});

function reducer(state: RunProbeShellState, action: RunProbeShellAction): RunProbeShellState {
  switch (action.type) {
    case "BOOTSTRAP":
      return buildInitialState(action.payload);
    case "SET_ACTIVE_SURFACE":
      return {
        ...state,
        preferences: { ...state.preferences, activeSurfaceId: action.surfaceId },
      };
    case "SET_ACTIVE_PANEL":
      return {
        ...state,
        preferences: { ...state.preferences, activePanel: action.panel },
      };
    case "SELECT_RECORD":
      return {
        ...state,
        preferences: { ...state.preferences, selectedRecordId: action.recordId },
      };
    case "SET_AUTO_REFRESH":
      return {
        ...state,
        preferences: { ...state.preferences, autoRefresh: action.enabled },
      };
    case "SET_INTERVAL_SECONDS":
      return {
        ...state,
        preferences: { ...state.preferences, intervalSeconds: action.seconds },
      };
    case "RECORD_STORAGE_STATUS":
      return {
        ...state,
        storageStatus: action.status,
        lastError: action.saved
          ? state.lastError
          : action.status.state === "unavailable"
            ? action.status.reason
            : state.lastError,
      };
    case "SET_LAST_ERROR":
      return { ...state, lastError: action.message };
    case "RESET_PREFERENCES":
      return {
        ...state,
        preferences: defaultRunProbePreferences(),
        storageStatus: action.payload.status,
        lastError: action.payload.saved
          ? state.lastError
          : action.payload.status.reason,
      };
    default:
      return state;
  }
}

const EMPTY_LOAD: PersistedLoadResult = {
  preferences: defaultRunProbePreferences(),
  status: {
    state: "idle",
    reason: "",
    recoverable: true,
  },
};

export interface RunProbeShellApi {
  state: RunProbeShellState;
  setActiveSurface: (surfaceId: string) => void;
  setActivePanel: (panel: string) => void;
  selectRecord: (recordId: string | null) => void;
  setAutoRefresh: (enabled: boolean) => void;
  setIntervalSeconds: (seconds: number) => void;
  resetPreferences: () => void;
  recordById: (recordId: string | null) => RunProbeRecord | null;
  counts: { total: number; ready: number; paused: number; error: number };
  lastErrorMessage: () => string | null;
}

const RunProbeShellContext = createContext<RunProbeShellApi | null>(null);

export interface RunProbeShellProviderProps {
  children?: ReactNode;
  storage?: Pick<Storage, "getItem" | "setItem" | "removeItem"> | null;
}

export function RunProbeShellProvider({
  children,
  storage,
}: RunProbeShellProviderProps) {
  const [state, dispatch] = useReducer(reducer, EMPTY_LOAD, () =>
    buildInitialState(loadRunProbePreferences(storage, defaultRunProbePreferences())),
  );
  const stateRef = useRef(state);
  stateRef.current = state;

  const persist = useCallback(
    (next: RunProbePreferences) => {
      const result = saveRunProbePreferences(storage, next);
      dispatch({
        type: "RECORD_STORAGE_STATUS",
        status: result.status,
        saved: result.saved,
      });
      if (!result.saved) {
        dispatch({ type: "SET_LAST_ERROR", message: result.status.reason });
      }
    },
    [storage],
  );

  const setActiveSurface = useCallback(
    (surfaceId: string) => {
      dispatch({ type: "SET_ACTIVE_SURFACE", surfaceId });
      persist({ ...stateRef.current.preferences, activeSurfaceId: surfaceId });
    },
    [persist],
  );

  const setActivePanel = useCallback(
    (panel: string) => {
      dispatch({ type: "SET_ACTIVE_PANEL", panel });
      persist({ ...stateRef.current.preferences, activePanel: panel });
    },
    [persist],
  );

  const selectRecord = useCallback(
    (recordId: string | null) => {
      dispatch({ type: "SELECT_RECORD", recordId });
      persist({ ...stateRef.current.preferences, selectedRecordId: recordId });
    },
    [persist],
  );

  const setAutoRefresh = useCallback(
    (enabled: boolean) => {
      dispatch({ type: "SET_AUTO_REFRESH", enabled });
      persist({ ...stateRef.current.preferences, autoRefresh: enabled });
    },
    [persist],
  );

  const setIntervalSeconds = useCallback(
    (seconds: number) => {
      dispatch({ type: "SET_INTERVAL_SECONDS", seconds });
      persist({ ...stateRef.current.preferences, intervalSeconds: seconds });
    },
    [persist],
  );

  const resetPreferences = useCallback(() => {
    const result = saveRunProbePreferences(storage, defaultRunProbePreferences());
    dispatch({
      type: "RECORD_STORAGE_STATUS",
      status: result.status,
      saved: result.saved,
    });
    dispatch({ type: "RESET_PREFERENCES", payload: result });
    if (!result.saved) {
      dispatch({ type: "SET_LAST_ERROR", message: result.status.reason });
    }
  }, [storage]);

  const recordById = useCallback(
    (recordId: string | null) =>
      recordId ? findRecord(stateRef.current.records, recordId) : null,
    [],
  );

  const counts = useMemo(
    () => ({
      total: state.records.length,
      ready: state.records.filter((r) => r.status === "ready").length,
      paused: state.records.filter((r) => r.status === "paused").length,
      error: state.records.filter((r) => r.status === "error").length,
    }),
    [state.records],
  );

  const lastErrorMessage = useCallback(() => stateRef.current.lastError, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as Record<string, unknown>;
    if (!w.app) w.app = {};
    const app = w.app as Record<string, unknown>;
    Object.defineProperty(app, "activeSurface", {
      configurable: true,
      get: () => stateRef.current.preferences.activeSurfaceId,
    });
    Object.defineProperty(app, "activePanel", {
      configurable: true,
      get: () => stateRef.current.preferences.activePanel,
    });
    Object.defineProperty(app, "selectedRecord", {
      configurable: true,
      get: () =>
        stateRef.current.preferences.selectedRecordId
          ? findRecord(stateRef.current.records, stateRef.current.preferences.selectedRecordId)
          : null,
    });
    Object.defineProperty(app, "counts", {
      configurable: true,
      get: () => ({
        total: stateRef.current.records.length,
        ready: stateRef.current.records.filter((r) => r.status === "ready").length,
        paused: stateRef.current.records.filter((r) => r.status === "paused").length,
        error: stateRef.current.records.filter((r) => r.status === "error").length,
      }),
    });
    Object.defineProperty(app, "storageStatus", {
      configurable: true,
      get: () => stateRef.current.storageStatus,
    });
    Object.defineProperty(app, "lastError", {
      configurable: true,
      get: () => stateRef.current.lastError,
    });
    Object.defineProperty(app, "initialised", {
      configurable: true,
      get: () => stateRef.current.initialised,
    });
    (window as unknown as Record<string, unknown>).app = app;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { app?: Record<string, unknown> };
    const app = (w.app ?? {}) as Record<string, unknown>;
    app.setActiveSurface = (id: string) => setActiveSurface(id);
    app.setActivePanel = (panel: string) => setActivePanel(panel);
    app.selectRecord = (recordId: string | null) => selectRecord(recordId);
    app.resetPreferences = () => resetPreferences();
    w.app = app;
  }, [setActiveSurface, setActivePanel, selectRecord, resetPreferences]);

  const value = useMemo<RunProbeShellApi>(
    () => ({
      state,
      setActiveSurface,
      setActivePanel,
      selectRecord,
      setAutoRefresh,
      setIntervalSeconds,
      resetPreferences,
      recordById,
      counts,
      lastErrorMessage,
    }),
    [
      state,
      setActiveSurface,
      setActivePanel,
      selectRecord,
      setAutoRefresh,
      setIntervalSeconds,
      resetPreferences,
      recordById,
      counts,
      lastErrorMessage,
    ],
  );

  return (
    <RunProbeShellContext.Provider value={value}>
      {children}
    </RunProbeShellContext.Provider>
  );
}

export function useRunProbeShell(): RunProbeShellApi {
  const ctx = useContext(RunProbeShellContext);
  if (!ctx) {
    throw new Error("useRunProbeShell must be used inside RunProbeShellProvider");
  }
  return ctx;
}

function findRecord(records: RunProbeRecord[], id: string): RunProbeRecord | null {
  return records.find((record) => record.id === id) ?? null;
}

export type RunProbeShellDispatch = Dispatch<RunProbeShellAction>;

export function _clearRunProbePrefsForTests(
  storage: Pick<Storage, "removeItem"> | null | undefined,
): void {
  const result = clearRunProbePreferences(storage);
  if (!result.saved) {
    if (typeof console !== "undefined") {
      console.warn("[run-probe] preference persistence failed:", result.status.reason);
    }
  }
}
