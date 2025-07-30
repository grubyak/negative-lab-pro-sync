import { serializer as luadata } from "luadata";

const convertMaps = (data: unknown): unknown => {
  if (data instanceof Map || (data && typeof data === "object" && !Array.isArray(data))) {
    const entries = data instanceof Map ? Array.from(data.entries()) : Object.entries(data);

    return entries.reduce((result, [key, value]) => ({ ...result, [key]: convertMaps(value) }), {});
  }

  return Array.isArray(data) ? data.map(convertMaps) : data;
};

const parse = <Type = unknown>(text: string | null): Type =>
  convertMaps(luadata.unserialize((text ?? "").trim().replace(/^t\s*=\s*/, "")) as unknown) as Type;

const stringify = (obj: unknown) =>
  luadata
    .serialize(obj, { indent: "\n\t" })
    .replace(/(\n\t){2}/g, "\n\t\t")
    .replace(/^/, "t = ")
    .replace(/}$/, "\n}\n")
    .replaceAll("\n\n", "\n");

const lua = { parse, stringify };

export { lua };
