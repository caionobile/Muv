import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.scss'],
})
export class LogoffComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  fazerLogoff(): void {
    //limpar session/token

    this.router.navigate(['/']);
  }
}
