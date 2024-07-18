import sjson from 'secure-json-parse';

type JsonObject = { [key: string]: JsonValue };

type JsonArray = JsonValue[];

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

export function parseJson(stringifiedJson: string | undefined) {
  if (!stringifiedJson) return undefined;
  try {
    return sjson.parse(stringifiedJson) as JsonValue;
  } catch {
    return undefined;
  }
}
