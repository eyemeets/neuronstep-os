#!/usr/bin/env ts-node

import { readdirSync, statSync, rmSync } from 'fs';
import { join } from 'path';

// Default directories and files to clean
const targetDirs = ['node_modules', 'dist', '.turbo', '.expo']; // Add other files if needed

// Parse command-line arguments
const args = process.argv.slice(2);
const onlyDirsIndex = args.indexOf('-onlyDirs');
const onlyDirs = onlyDirsIndex !== -1 ? args.slice(onlyDirsIndex + 1) : [];

// Filter target directories based on -onlyDirs argument, ignoring node_modules
const filteredDirs = onlyDirs.length > 0 
  ? targetDirs.filter(dir => onlyDirs.includes(dir) && dir !== 'node_modules') 
  : targetDirs;

function cleanDirectory(dir: string) {
  for (const targetDir of filteredDirs) {
    const targetPath = join(dir, targetDir);
    try {
      if (statSync(targetPath).isDirectory()) {
        console.log(`Removing: ${targetPath}`);
        rmSync(targetPath, { recursive: true, force: true });
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error(`Error removing ${targetPath}:`, error);
      }
    }
  }
}

function traverseAndClean(rootPath: string, isRoot: boolean = false) {
  readdirSync(rootPath).forEach((subDir) => {
    const fullPath = join(rootPath, subDir);

    // At the root level, only go into `apps` or `packages`
    if (isRoot && !['apps', 'packages'].includes(subDir)) {
      return;
    }

    // Within `apps` and `packages`, only go one level deeper (e.g., apps/<app name> or packages/<package name>)
    if (isRoot || ['apps', 'packages'].some(rootDir => rootPath.endsWith(rootDir))) {
      if (statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
        cleanDirectory(fullPath);
        traverseAndClean(fullPath); // Recursively clean nested folders within each specified app/package
      }
    }
  });
}

// Start cleaning from the root level
traverseAndClean('.', true);

console.log("Cleanup completed successfully.");
