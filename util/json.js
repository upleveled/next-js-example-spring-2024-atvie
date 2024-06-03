import { sjson } from 'secure-json-parse';

export function parseJson(stringifiedJson) {
  if (!stringifiedJson) return undefined;
  try {
    return sjson.parse(stringifiedJson);
  } catch {
    return undefined;
  }
}
