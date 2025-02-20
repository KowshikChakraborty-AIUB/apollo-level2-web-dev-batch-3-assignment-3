import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    profileImg?: string;
    address: string;
    role: 'user' | 'admin';
    isDeleted: boolean
};

export interface UserModel extends Model<TUser> {
/* eslint-disable no-unused-vars */

    //instance methods for checking if the user exist
    isUserExistsByEmail(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;