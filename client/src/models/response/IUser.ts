
export interface IUser {
  email: string,
  isActivated: boolean,
  id: string,
  name: string,
  cycleLength: { average: number, times: number },
  periodLength: { average: number, times: number },
  periodDates: Date[][]
}
