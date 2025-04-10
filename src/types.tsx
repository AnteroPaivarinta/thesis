export interface IData {
    PersonID:string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    gender: string;
    phone: string;
    tshirt: string;
    team: string;
    licenseCard: boolean;
    hopes: string; 
    freeText: string;
    tasks: ITaskObject;
    date?: string;
    days: IDays;
    
}

export interface ISelect {
    value: string;
    label: string;
}

export interface ITaskObject {
    firstTask: boolean,
    secondTask: boolean,
    thirdTask: boolean,
    fourthTask: boolean,
    fifthTask: boolean,
    sixthTask: boolean,
    seventhTask: boolean,
    eightTask: boolean,
    ninthTask: boolean,
    tenthTask: boolean,
    eleventhTask: boolean,
    other: boolean,
}



export interface ITaskOption {
    value: string;
    label: string;
}

export interface IDays{
    first: boolean;
    second: boolean;
    third: boolean
}

export interface IDataIndex {
    index: number;
    data: IData;
    update: boolean;
    deleting: boolean;
}

export interface IAdminObject {
    loginResponse: boolean,
    inputVerify: boolean,
    token: string,
}

export interface IDataBoolean {
    PersonID: boolean;
    firstName: boolean ;
    lastName: boolean;
    age:  boolean;
    email: boolean;
    gender: boolean;
    phone: boolean;
    tshirt: boolean;
    team:  boolean;
    licenseCard:  boolean;
    hopes: boolean; 
    freeText:  boolean;
}

export interface IAdmin {
    user: string;
    password: string;
}