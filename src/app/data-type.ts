export interface Authority {
  authority: string;
}

export interface RegisterUser {
  id:string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    authorities?: Authority[];
    enabled: string
}