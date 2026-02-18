// This file is intentionally minimal.
// Form submission now goes directly to POST /api/submit.
// Keeping this file avoids import errors if it is referenced elsewhere.
export type FormState = Record<string, never>;
