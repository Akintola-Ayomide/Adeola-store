"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "arike-demo-ribbon-dismissed";

export function DemoRibbon() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // Session storage may be unavailable in private modes; keep the notice.
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-clay-soft text-ink">
      <div className="container-editorial flex items-center justify-center gap-3 py-2 pr-10 text-center">
        <span className="hidden border border-clay/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-clay sm:inline-block">
          Demo
        </span>
        <p className="text-[11px] leading-snug tracking-[0.02em] sm:text-[12px]">
          Preview storefront — sample products and contact details. Connect
          Sanity to publish your real catalogue.
        </p>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            try {
              window.sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              // Ignore storage errors.
            }
          }}
          className="absolute right-3 inline-flex size-8 items-center justify-center text-ink/70 transition-colors hover:text-ink"
          aria-label="Dismiss demo notice"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
