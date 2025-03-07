import { GeoLocation } from "../GeoLocation";

export interface Task {
  data: TaskData[];
}

export interface TaskData {
  taskId: string; // it could be number but i use string for future uuid
  title: string;
  completionStatus: boolean;
  text: string;
  geo?: GeoLocation;
}
