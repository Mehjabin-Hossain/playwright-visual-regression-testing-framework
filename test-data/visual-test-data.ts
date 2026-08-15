import { viewports, type ViewportName } from '../config/viewports';

export const responsiveScenarios = [
  { name: 'desktop', viewport: viewports.desktop },
  { name: 'tablet', viewport: viewports.tablet },
  { name: 'mobile', viewport: viewports.mobile },
] as const satisfies ReadonlyArray<{
  readonly name: ViewportName;
  readonly viewport: (typeof viewports)[ViewportName];
}>;

export const productInformationTabs = ['Details', 'Shipping', 'Support'] as const;

export type ProductInformationTab = (typeof productInformationTabs)[number];
