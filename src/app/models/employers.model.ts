export interface EmployeeModel {
  id: number;
  name: string;
  surname: string;
  eventId: number;
  eventName: string | null;
  status: string;
  curentJobId: number;
  curentJobStart: string | null;
  fullJobTime: string | null;
  jobs:Array<any>
}
