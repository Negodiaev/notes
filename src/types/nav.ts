export enum PageUrn {
  Home = '/',
  Notes = '/notes',
  CompletedNotes = '/completed-notes',
}

export interface INavItem {
  name: string;
  urn: string;
}
