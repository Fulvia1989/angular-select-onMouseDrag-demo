import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Select multiple items onMouse Drag';
  ngVersion = VERSION;

  constructor() { }

  ngOnInit(): void {
  }

}
