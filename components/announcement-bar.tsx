import type { SiteSettings } from "@/lib/types";

export function AnnouncementBar({ settings }: { settings: SiteSettings }) {
  if (!settings.announcementBar) return null;

  return (
    <div className="bg-ink text-bone">
      <div className="container-editorial">
        <p
          className="truncate py-2.5 text-center text-[9px] font-semibold uppercase leading-none tracking-[0.18em] sm:text-[10px]"
          title={settings.announcementBar}
        >
          {settings.announcementBar}
        </p>
      </div>
    </div>
  );
}
