# Baseline Management

## What Baseline Screenshots Are

Baseline screenshots are approved expected images. Playwright compares new screenshots against them
and creates actual and diff artifacts when a mismatch occurs.

## Creating Initial Baselines

Run `npm run snapshots:update` after dependencies and browsers are installed. This command is
explicit and should be used only when creating or approving baselines.

## Inspecting Differences

When a visual assertion fails, open the Playwright HTML report with `npm run report`. Review:

- Expected screenshot: the committed approved baseline.
- Actual screenshot: the latest captured UI.
- Difference screenshot: highlighted changed pixels.

## Approving Intentional Changes

Confirm the UI change with the owning team, run `npm run snapshots:update` or
`npm run snapshots:update:chromium`, inspect the changed PNG files in Git, and commit them with the
product change.

## Rejecting Unintended Changes

Do not update snapshots. Fix the application or test setup, then rerun `npm run test:visual` until
the screenshots match the approved baselines.

## Updating Baselines Safely

Snapshot updates must be reviewed and approved. Updating snapshots is not a method for hiding
unexpected visual defects.

## Git Review Recommendations

Keep expected snapshot PNG files trackable. Do not commit `test-results`, `playwright-report`,
actual images, diff images, traces, videos, or local environment files.

## Platform-Specific Screenshot Considerations

Fonts, antialiasing, browser builds, and operating systems can change screenshots. Generate official
baselines in the same fixed environment used by CI. This project documents Docker commands for that
workflow.

## CI-Compatible Baseline Generation

Use `npm run docker:update-snapshots` to regenerate baselines inside the Playwright Docker image that
matches the installed Playwright version. Use `npm run docker:test` to verify them.

## Common Causes of Flaky Visual Tests

- Animations or transitions still running.
- Fonts not loaded before capture.
- Current timestamps or user status not masked or frozen.
- Multiple viewport sizes sharing one snapshot name.
- Baselines generated on a different operating system than CI.
- External images, APIs, or random data.
