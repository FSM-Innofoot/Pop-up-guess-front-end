/**
 * Data layer — submitPrediction
 *
 * Currently persists to a local JSON file (data/predictions.json) so the
 * project works out of the box without any external service.
 *
 * To swap in a real database or API later:
 *  1. Remove the file-system logic below.
 *  2. Add your DB client / fetch call here.
 *  3. The calling code (Server Action) stays identical.
 */

import fs from 'fs';
import path from 'path';
import { Prediction } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'predictions.json');

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

export async function submitPrediction(prediction: Prediction): Promise<void> {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const existing: Prediction[] = JSON.parse(raw);
  existing.push(prediction);
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}
