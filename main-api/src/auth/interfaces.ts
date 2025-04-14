export interface IToken {
  accessToken: string;
}

export interface IJwtPayload {
  id: string;
  name: string;
  roles: string[];
}
