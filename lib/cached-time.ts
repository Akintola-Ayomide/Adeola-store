import { cacheLife } from "next/cache";

/**
 * Reads the wall clock from inside a Cache Components cache scope.
 *
 * Calling `new Date()` directly during prerendering is a build error when
 * `cacheComponents` is enabled. Callers that need a timestamp for output that
 * is otherwise static (the footer's copyright year, the sitemap's
 * `lastModified`) use this helper instead. The value is refreshed every
 * minute, so it stays accurate across rollovers without making the
 * surrounding UI dynamic.
 */
export async function getCachedNow(): Promise<Date> {
  "use cache";
  cacheLife("minutes");
  return new Date();
}
