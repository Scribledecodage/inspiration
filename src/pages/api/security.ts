import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  try {
    const filePath = join(process.cwd(), 'public', 'security.txt');
    const fileContent = readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(fileContent);
  } catch (error) {
    res.status(404).send('File not found');
  }
}
