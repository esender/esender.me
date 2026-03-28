export const CONTACT_EMAIL = "marat@esender.me";

export function isVisiblePost({ data }: { data: { published?: boolean } }): boolean {
  return import.meta.env.DEV ? true : !!data.published;
}

type DateEntry = { data: { date: Date } };

export function sortByDateDesc(a: DateEntry, b: DateEntry): number {
  return b.data.date.getTime() - a.data.date.getTime();
}

export function formatDateFull(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

export function formatDateShort(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}
