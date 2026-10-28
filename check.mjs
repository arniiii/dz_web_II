import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.dirname(fileURLToPath(import.meta.url));
const modules = path.join(root, 'node_modules');
const selected = process.argv.find((value) => value.startsWith('--group='))?.slice(8);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'web-ii-check-'));
const environment = {
  ...process.env,
  BROWSER: 'none',
  PLAYWRIGHT_HTML_OPEN: 'never',
  PATH: [path.dirname(process.execPath), path.join(modules, '.bin'), process.env.PATH].join(path.delimiter),
};
const localPython = path.join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
const python = process.env.PYTHON || (fs.existsSync(localPython) ? localPython : 'python');
if (fs.existsSync(localPython)) {
  environment.PATH = [path.dirname(localPython), environment.PATH].join(path.delimiter);
}
let failed = 0;
let checked = 0;
try {
  const groups = fs.readdirSync(root).filter((name) => /^\d{2}_/.test(name) && (!selected || name === selected)).sort();
  for (const group of groups) {
    const projects = fs.readdirSync(path.join(root, group))
      .filter((name) => /^\d/.test(name) && fs.statSync(path.join(root, group, name)).isDirectory())
      .sort((left, right) => parseInt(left, 10) - parseInt(right, 10));
    for (const project of projects) {
      const cwd = path.join(root, group, project);
      const label = `${group}/${project}`;
      const packageFile = path.join(cwd, 'package.json');
      let command;
      let args;
      const env = { ...environment };
      if (fs.existsSync(packageFile)) {
        const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
        const browser = packageData.scripts?.test?.includes('playwright');
        command = process.execPath;
        if (browser) {
          env.PLAYWRIGHT_JSON_OUTPUT_NAME = path.join(temporary, group + '_' + project + '.json');
          args = [path.join(modules, '@playwright/test/cli.js'), 'test', '--workers=1', '--reporter=json'];
        } else {
          args = [path.join(modules, 'jest/bin/jest.js'), '--runInBand', '--silent'];
        }
      } else if (fs.existsSync(path.join(cwd, 'pyproject.toml'))) {
        command = python;
        args = ['-m', 'pytest', '-q'];
        env.PYTHONPATH = [path.join(cwd, 'src'), cwd, process.env.PYTHONPATH].filter(Boolean).join(path.delimiter);
      } else {
        continue;
      }
      const result = spawnSync(command, args, { cwd, env, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
      checked += 1;
      console.log(`${label}: ${result.status === 0 ? 'OK' : 'ошибка'}`);
      if (result.status !== 0) {
        failed += 1;
        console.error(result.error?.message || '', result.stdout, result.stderr);
      }
    }
  }
  console.log(`Проверено упражнений: ${checked}. Ошибок: ${failed}.`);
  process.exitCode = failed > 0 || checked === 0 ? 1 : 0;
} finally {
  const relative = path.relative(os.tmpdir(), temporary);
  if (relative.startsWith('web-ii-check-') && !relative.includes(path.sep)) {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}
