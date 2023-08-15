import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  permissao: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler($event: any) {
    localStorage.clear();
  }
}
