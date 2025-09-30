export interface Interview {
  id?: number,
  interviewDate: string,
  location: string,
  meetingLink?: string,
  interviewType: string,
  interviewers?: Interviewers[]
}

interface Interviewers {
  name: string,
  email?: string,
  phoneNumber?: string
}