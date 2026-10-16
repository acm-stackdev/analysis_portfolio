import type { PageObjectResponse } from "@notionhq/client";

type NotionProperty = PageObjectResponse["properties"][string];

/** Reads the plain text of a Title property, e.g. `page.properties.Name`. */
export function getTitleText(prop: NotionProperty | undefined): string {
  if (prop?.type === "title") {
    return prop.title[0]?.plain_text ?? "";
  }
  return "";
}

/** Reads the plain text of a Rich Text property. */
export function getRichText(prop: NotionProperty | undefined): string {
  if (prop?.type === "rich_text") {
    return prop.rich_text[0]?.plain_text ?? "";
  }
  return "";
}

/** Reads the ISO start date of a Date property, or null if unset. */
export function getDateStart(prop: NotionProperty | undefined): string | null {
  if (prop?.type === "date") {
    return prop.date?.start ?? null;
  }
  return null;
}

/** Reads the URL of the first file in a Files property, or null if unset. */
export function getFileUrl(prop: NotionProperty | undefined): string | null {
  if (prop?.type === "files") {
    const file = prop.files[0];
    if (file?.type === "file") return file.file.url;
    if (file?.type === "external") return file.external.url;
  }
  return null;
}

/** Reads the option names of a Multi-select property. */
export function getMultiSelectTags(prop: NotionProperty | undefined): string[] {
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((tag) => tag.name);
  }
  return [];
}

/** Reads a Number property's value, or null if unset. */
export function getNumber(prop: NotionProperty | undefined): number | null {
  if (prop?.type === "number") {
    return prop.number;
  }
  return null;
}

/** Reads the selected option's name of a Select property, or null if unset. */
export function getSelectStatus(prop: NotionProperty | undefined): string | null {
  if (prop?.type === "select") {
    return prop.select?.name ?? null;
  }
  return null;
}
