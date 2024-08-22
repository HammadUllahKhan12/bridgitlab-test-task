import { INTERNAL_SERVER_ERROR } from './constants/response-messages';

export function formatResponseTable(errors: Record<string, string>): string {
  const errorCodes = Object.keys(errors);
  return (
    `
| Response message    | Description          |
| ------------------- | -------------------- |` +
    errorCodes
      .map(
        (errorCode) =>
          `
| \`${errorCode}\`    | ${errors[errorCode]} |`,
      )
      .join('')
  );
}

export function formatInvalidConfiguration(key: string) {
  return `\`${key}\` is not configured`;
}

export function formatDataNotFound(key: string) {
  return `\`${key}\` does not match existing data`;
}

export function formatInvalidProperty(key: string) {
  return `\`${key}\` is missing or invalid`;
}

export function formatInvalidEmailAddress(key: string) {
  return `\`${key}\` is missing or invalid (must be an email address)`;
}

export function formatInvalidNumber(key: string, min?: number, max?: number) {
  if (min && max) {
    return `\`${key}\` is missing or invalid (must be between ${Intl.NumberFormat('en-AU').format(
      min,
    )} - ${Intl.NumberFormat('en-AU').format(max)})`;
  } else if (max) {
    return `\`${key}\` is missing or invalid (must be less than ${Intl.NumberFormat('en-AU').format(max)})`;
  } else if (min) {
    return `\`${key}\` is missing or invalid (must be greater than ${Intl.NumberFormat('en-AU').format(min)})`;
  }
  return `\`${key}\` is missing or invalid`;
}

export const INTERNAL_SERVER_ERROR_DESCRIPTION = `Returns \`${INTERNAL_SERVER_ERROR}\` when a request failed unexpectedly`;
export const SUCCESS_DESCRIPTION = `Returns success when a request is completed successfully`;
