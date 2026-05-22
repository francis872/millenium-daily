import { readFileSync, writeFileSync } from 'fs';

const REF = new Date('2026-05-21T10:00:00.000Z').getTime();

const content = readFileSync('src/data/mockData.ts', 'utf8');

// Replace: new Date(Date.now() - EXPR).toISOString()
// EXPR is always arithmetic like  2 * 60 * 60 * 1000
const fixed = content.replace(
  /new Date\(Date\.now\(\) - ([\d\s*]+)\)\.toISOString\(\)/g,
  (match, expr) => {
    const ms = Function(`return ${expr}`)();
    return `'${new Date(REF - ms).toISOString()}'`;
  }
);

writeFileSync('src/data/mockData.ts', fixed);
console.log('All dynamic timestamps replaced with static ISO strings.');
