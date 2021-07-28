export interface userCredentials {
  email: string;
  password: string;
}

export interface IUsers {
  user: number,
  name: string,
  dob: string
}

export interface IEditUserResponse {
  edited: boolean,
  data: IEditUserData
}

export interface IEditUserData {
  name: string,
  dob: string
}

export interface IAddUserData {
  name: string,
  dob: string
}