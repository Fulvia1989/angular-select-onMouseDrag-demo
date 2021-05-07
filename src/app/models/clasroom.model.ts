import { Student } from "./student.model";

export class Classroom{
    id:number;
    name: string;
    seatsN: number;
    students: Student[];
}