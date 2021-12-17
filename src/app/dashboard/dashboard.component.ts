import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../model/colaborador';
import { Gruja } from '../model/gruja';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
