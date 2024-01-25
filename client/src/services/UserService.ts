import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../models/response/IUser";

export default class UserService {
  static updateUserPeriodLength(
    userId: string,
    periodLength: { average: number; times: number }
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/users/${userId}/periodLength`, { periodLength });
  }

  static updateUserCycleLength(
    userId: string,
    cycleLength: { average: number; times: number }
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/users/${userId}/cycleLength`, { cycleLength });
  }

  static updateUserPeriodDates(
    userId: string,
    periodDates: Date[]
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/users/${userId}/periodDates`, { periodDates });
  }

  static setNewPeriodDates(
    userId: string,
    periodDates: Date[][]
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>(`/users/${userId}/updateUserPeriodDates`, { periodDates });
  }
}
