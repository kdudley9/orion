export interface Application {
  id: number,
  company: string,
  jobTitle: string,
  location: string,
  url: string,
  note?: string,
  dateApplied: string,
  industry: string,
  status: string,
  jobType: string,
  favorite: boolean,
  archived: boolean
}