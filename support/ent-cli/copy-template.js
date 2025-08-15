#!/usr/bin/env node
import fs from 'fs-extra';

fs.copySync('src/scripts/changelog/template', 'dist/scripts/changelog/template', {
  overwrite: true,
});
