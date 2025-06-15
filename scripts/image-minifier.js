#!/usr/bin/env node

import { globSync } from 'glob';
import sharp from 'sharp';
import { mkdirSync, copyFileSync } from 'node:fs';
import { basename } from 'node:path';

const images = globSync('dist/images/*.{png,jpg,jpeg,gif,webp}');

mkdirSync('dist/images-min', { recursive: true });

images.forEach(async (path) => {
  const ext = path.split('.').pop().toLowerCase();
  let pipeline = sharp(path);

  switch (true) {
    case ext === 'jpg' || ext === 'jpeg':
      pipeline = pipeline.jpeg({
          quality: 70
        });
      break;
    case ext === 'png':
      pipeline = pipeline.png({
          compressionLevel: 6,
          quality: 70
        });
      break;
    case ext === 'webp' || ext === 'gif':
      pipeline = pipeline[ext]({
          quality: 70
        });
      break;
    default:
      console.log(`Skipping unsupported format: ${path}`);
      break;
  }

  await pipeline.toFile(`dist/images-min/${basename(path)}`);
  copyFileSync(`dist/images-min/${basename(path)}`, path);
});