interface ITeacherData {}
interface IAccountantData {}

export type IStaffData = ITeacherData | IAccountantData;
