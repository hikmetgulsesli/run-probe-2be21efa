import type { RunProbeRecord } from "../features/run-probe/run-probe.store";

export const runProbeFixture: RunProbeRecord[] = [
  {
    id: "probe-alpha",
    label: "Probe Alpha",
    status: "ready",
    target: "https://example.com/health",
    intervalSeconds: 30,
    autoRefresh: true,
  },
  {
    id: "probe-beta",
    label: "Probe Beta",
    status: "paused",
    target: "https://example.com/api/v1/status",
    intervalSeconds: 60,
    autoRefresh: false,
  },
  {
    id: "probe-gamma",
    label: "Probe Gamma",
    status: "error",
    target: "https://example.com/metrics",
    intervalSeconds: 120,
    autoRefresh: true,
  },
];
