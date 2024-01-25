import { IUser } from "../models/response/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import UserService from "../services/UserService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string, name:string) {
    try {
        const response = await AuthService.registration(email, password, name);
        console.log(response)
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

  async updateUserPeriodLength(periodLength: { average: number, times: number }, userId: string) {
    try {
      const response = await UserService.updateUserPeriodLength(
        userId,
        periodLength
      );
      console.log(response);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async updateUserCycleLength(cycleLength: { average: number, times: number }, userId: string) {
    try {
      const response = await UserService.updateUserCycleLength(
        userId,
        cycleLength
      );
      console.log(response);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async updateUserPeriodDates(periodDates: Date[], userId: string) {
    try {
      const response = await UserService.updateUserPeriodDates(
        userId,
        periodDates
      );
      console.log(response);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async setNewPeriodDates(periodDates: Date[][], userId: string) {
    try {
      const response = await UserService.setNewPeriodDates(
        userId,
        periodDates
      );
      console.log(response);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
