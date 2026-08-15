# Visual Test Strategy

## Purpose

This framework detects unintended UI changes by comparing current screenshots with approved
baseline images.

## Scope

Coverage includes the local home, product, and dashboard pages. The suite checks full pages,
individual components, responsive layouts, dark mode, masked dynamic content, and interaction
states.

## Objectives

- Catch accidental layout, color, spacing, and content changes.
- Keep visual baselines deterministic and reviewable.
- Fail CI when an unexpected difference is detected.
- Avoid external sites, remote images, random data, and automatic baseline acceptance.

## Visual Test Levels

- Full-page comparisons validate complete page composition.
- Component comparisons isolate important UI sections.
- Responsive comparisons validate desktop, tablet, and mobile rendering.
- Dark-mode comparisons keep theme baselines separate.
- Masked-content comparisons isolate volatile regions.
- Interaction-state comparisons capture user-visible state after actions.

## Pages and Components Covered

The suite covers the home page, product page, dashboard page, header, hero, feature card, product
card, navigation, dashboard statistic card, modal state, cart notification, selected tab, and mobile
navigation.

## Browser Strategy

Chromium is the primary visual quality gate. Mobile visual coverage also runs in Chromium with a
separate project and separate snapshot paths. Smoke tests run on Chromium, Firefox, and WebKit
without screenshot comparison.

## Viewport Strategy

Viewport sizes are defined in `config/viewports.ts`: desktop, laptop, tablet, and mobile. Responsive
tests use these shared values so baselines are named and reviewed consistently.

## Baseline Environment

Official baselines should be generated in the same environment used by CI. The preferred approach is
the Playwright Docker image that matches the installed `@playwright/test` version.

## Stability Controls

The visual fixture waits for document readiness, visible main content, and loaded fonts. It disables
animations, transitions, smooth scrolling, and text caret blinking before screenshot assertions.

## Dynamic-Content Handling

Elements marked with `data-dynamic-content="true"` are frozen for normal visual comparisons. Tests
that specifically demonstrate masking use Playwright `mask` locators for timestamp and status
regions.

## Tolerance Strategy

The default tolerance is strict but practical: `maxDiffPixelRatio` is `0.001` and `threshold` is
`0.2`. These values should not be raised to hide real product defects.

## Entry Criteria

- Application pages are deterministic.
- Baselines exist for the relevant project and viewport.
- Dynamic regions are frozen or narrowly masked.
- The test uses user-facing locators or stable test IDs.

## Exit Criteria

- Visual tests pass without updating snapshots.
- Any differences are reviewed by QA and product/design owners.
- Approved baseline changes are committed with the related UI change.

## Defect Classification

- Critical: broken layout, clipped primary content, unreadable text, or blocked workflow.
- Major: unexpected color, spacing, responsive, or component regression.
- Minor: cosmetic drift with no workflow risk.
- Intentional: approved UI change that requires baseline update.

## Baseline Approval Process

Run the visual suite, inspect expected, actual, and diff artifacts, confirm whether the difference is
intentional, update snapshots only with explicit commands, and review changed PNG files before
commit.

## CI Visual Quality Gate

CI runs formatting, type checking, linting, smoke tests, and Chromium visual tests. CI never updates
snapshots and fails on unexpected visual differences.

## Out-of-Scope Areas

The sample site does not test remote services, third-party images, live dates outside masked regions,
or cross-browser visual baselines.
