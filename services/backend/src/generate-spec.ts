import fs from 'node:fs/promises';
import path from 'node:path';
import app from './index';

async function generate() {
  try {
    const res = await app.request('/doc');
    const spec = await res.json();

    const outputPath = path.join(process.cwd(), 'openapi.json');
    await fs.writeFile(outputPath, JSON.stringify(spec, null, 2));
    console.log('✅ Valid OpenAPI JSON successfully written to openapi.json');
  } catch (err) {
    console.error('❌ Failed to generate OpenAPI spec:', err);
    process.exit(1);
  }
}

generate();