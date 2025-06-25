export interface IUser {
    id?: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export interface IEditUser {
    username?: string;
    firstName?: string,
    lastName?: string,
    profilePicture?: string;
}