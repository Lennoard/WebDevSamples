// Powershell
// $env:GOOGLE_APPLICATION_CREDENTIALS="service-account-file.json"

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('./serviceAccountKey.json');

export function initFirebase() {
  initializeApp({
    credential: cert(serviceAccount)
  });
}