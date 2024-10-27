#!/usr/bin/env ts-node

import { readdirSync, statSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

// Default directories and files to clean
const targetDirs = ['node_modules', 'dist', '.turbo', '.expo']; // Add other files if needed
const rootFiles = ['pnpm-lock.yaml'];

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

function cleanRootFiles(rootPath: string) {
  // Remove root files if no onlyDirs flag is specified
  if (onlyDirs.length === 0) {
    for (const file of rootFiles) {
      const filePath = join(rootPath, file);
      if (existsSync(filePath)) {
        console.log(`Removing: ${filePath}`);
        rmSync(filePath);
      }
    }
  }
}

function traverseAndClean(rootPath: string, isRoot: boolean = false) {
  // Clean root-level files and node_modules, .turbo
  if (isRoot && onlyDirs.length === 0) {
    cleanDirectory(rootPath); // Clean default root-level directories
    cleanRootFiles(rootPath); // Clean specified root files
  }

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
