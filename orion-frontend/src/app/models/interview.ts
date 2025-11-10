export interface Interview {
  id: number,
  interviewDate: Date,
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