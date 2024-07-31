import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member{            //Response form from DataBase
    _id: string;
    memberType:   MemberType;
    memberStatus: MemberStatus;
    memberNick:    string;
    memberPhone:   string;
    memberPassword?:string;
    memberAddress?:string;
    memberDesc?:   string;
    memberImage?:  string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput{        // Input form to DataBase
    memberType?:   MemberType;
    memberStatus?: MemberStatus;
    memberNick:    string;
    memberPhone:   string;
    memberPassword:string;
    memberAddress?:string;
    memberDesc?:   string;
    memberImage?:  string;
    memberPoints?: number;
}

export interface LoginInput {
    memberNick:    string;
    memberPassword:string;
}

export interface MemberUpdateInput{        // Input:type to updateUser
    memberNick?:    string;
    memberPhone?:   string;
    memberPassword?:string;
    memberAddress?:string;
    memberDesc?:   string;
    memberImage?:  string;
   
}
