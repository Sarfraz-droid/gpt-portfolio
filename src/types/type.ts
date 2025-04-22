export enum UserType {
    ILMA = "ilma",
    SARFRAZ = "sarfraz",
    NONE = "none"
}

export interface UserDetails {
    userType: UserType;
}
