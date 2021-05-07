import { Component, HostListener, OnInit } from '@angular/core';
import { Classroom } from './models/clasroom.model';
import { Student } from './models/student.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  students:Student[]=[];
  classrooms: Classroom[] = [
    {
      id:1,
      name: "Class 1",
      students:[],
      seatsN: 15
    },
    {
      id:2,
      name: "Class 2",
      students:[],
      seatsN: 10
    },
    {
      id:3,
      name: "Class 3",
      students:[],
      seatsN: 20
    }
  ];
  isSelecting: boolean;
  selected: Student[]=[];

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(ev) {
      this.isSelecting = false;

  }
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(ev) {
      this.isSelecting = true;

  }

  constructor(private data: DataService){}

  ngOnInit(){
    this.data.getData().subscribe(
      resp => {
        this.students = resp;
      }
    )

  }

  onMouseOver(ev, item) {
   
    ev.preventDefault();

    if(ev.type==='mouseenter' && !item.selected && this.isSelecting) {
        this.selectItem(item);
        let index = this.students.indexOf(item);
        if((index+1)%3==0 || (index+1)%2==0){
    
          let selectable = this.students.filter((el,i)=> i<index && !el.selected );
          selectable.forEach( el => el.selected = true);
          this.selected = this.selected.concat(selectable);
        }
    }

  }
  selectItem(student:Student){
    student.selected = !student.selected;
    if(student.selected){
      this.selected.push(student);
    }else{
      this.selected = this.selected.filter(el => el.id !== student.id);
    }

  }
  select(student: Student){
    this.selectItem(student);
 
  }

  resetSelection(){
    this.students.forEach(item => item.selected = false);
    this.selected = [];
  
  }
  assignTo(classroom:Classroom){
    let availableSeats = classroom.seatsN - this.selected.length;
    let allowed = (availableSeats <0) ? this.selected.slice(0,classroom.seatsN-1) : this.selected;
  
    allowed.forEach(el => {
      classroom.students.push(el);
    });
    classroom.seatsN = (availableSeats > 0) ? availableSeats : 0;

    this.students = this.students.filter(s => !allowed.find(el => el.id == s.id));
    this.selected = (availableSeats<0) ? this.selected.slice(classroom.seatsN, this.selected.length) : [];
  }
  getInitials(student:Student): string{
    return `${student.first_name.charAt(0)}${student.last_name.charAt(0)}`
  }
}
