# Contributing

Thank you for improving this visual regression framework.

## Development Workflow

1. Install dependencies with `npm install`.
2. Install browsers with `npx playwright install`.
3. Run `npm run format`, `npm run typecheck`, `npm run lint`, and `npm run test:smoke`.
4. Run visual tests with `npm run test:visual`.
5. Review every visual difference before updating snapshots.

## Baseline Review Rules

Snapshot updates are allowed only when the visual change is intentional and approved. Do not use
`--update-snapshots` to hide an unexpected difference. Review expected, actual, and diff images in
Git before committing new baselines.

## Pull Request Checklist

- Tests are added or updated for behavior that changed.
- `npm run ci` passes locally or in the CI environment.
- New visual baselines are reviewed when UI changes are intentional.
- No secrets, local `.env` files, reports, traces, or generated failure artifacts are committed.
