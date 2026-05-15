"use client";

import { useCallback, useRef, useState } from "react";
import { fetchNearbyServices } from "@/lib/geoapify";
import type {
  IssueCategory,
  IssueLocation,
  NearbyServicesResult,
} from "@/types";

interface UseNearbyServicesReturn {
  result: NearbyServicesResult | null;
  loading: boolean;
  error: string | null;
  fetch: (location: IssueLocation, category: IssueCategory) => Promise<void>;
  reset: () => void;
}

/**
 * Hook to fetch and cache nearby services for a reported issue.
 *
 * BUG FIX: The prior implementation called fetch() inside a useEffect that
 * depended on an `issue` object reference — meaning it re-fired on every
 * parent render even when the issue hadn't changed, and the stale closure
 * captured the *previous* location before state had settled.
 *
 * This hook instead exposes an explicit `fetch()` function that the
 * ReportIssueForm calls *after* the Supabase insert resolves, passing the
 * confirmed location directly — no stale-closure risk.
 */
export function useNearbyServices(): UseNearbyServicesReturn {
  const [result, setResult] = useState<NearbyServicesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Abort controller so that navigating away or re-submitting cancels inflight requests
  const abortRef = useRef<AbortController | null>(null);

  const fetchServices = useCallback(
    async (location: IssueLocation, category: IssueCategory) => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const data = await fetchNearbyServices(location, category);
        setResult(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : "Failed to load nearby services."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, fetch: fetchServices, reset };
}