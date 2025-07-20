import { serializer as luadata } from "luadata";

const parse = <Type = unknown>(text: string | null): Type =>
  luadata.unserialize((text ?? "").trim().replace(/^t\s*=\s*/, ""));

const stringify = (obj: unknown) =>
  luadata
    .serialize(obj, { indent: "\\n\\t" })
    .replace(/(\\n\\t){2}/g, "\\n\\t\\t")
    .replace(/^/, "t = ")
    .replace(/}$/, "\\n}\\n")
    .replaceAll("\n", "");

const lua = { parse, stringify };

export { lua };
