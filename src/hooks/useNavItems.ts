import { INavItem, PageUrn } from '../types/nav.ts';

export function useNavItems(): INavItem[] {
  return [
    { name: 'Home', urn: PageUrn.Home },
    { name: 'Actual notes', urn: PageUrn.Notes },
    { name: 'Completed notes', urn: PageUrn.CompletedNotes },
  ];
}
