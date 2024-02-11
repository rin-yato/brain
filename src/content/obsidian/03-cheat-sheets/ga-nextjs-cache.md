
date: 11-Feb-2024
status: #status/processed 
type: #type/doc
area: #area/tech #area/cheatsheet
keyword: #keyword/github-action #keyword/workflow #keyword/nextjs #keyword/cache

---

## Github Action with cache

This is a sample workflow for `NextJS` and `pnpm`, it uses cache to speed up the process.

```yaml title="ci-check.yaml"
name: CI Check

on:
  - push

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.13.1
          run_install: false

      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: pnpm

      - name: Restore cache
        uses: actions/cache@v3
        with:
          path: |
            ${{ github.workspace }}/.next/cache
          # Generate a new cache whenever packages or source files change.
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
          # If source files changed but packages didn't, rebuild from a prior cache.
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-

      - name: Install dependencies
        run: pnpm install

      - name: Run CI Check
        run: pnpm run ci-check

      - name: Log success
        run: echo "✅ Success!"

```