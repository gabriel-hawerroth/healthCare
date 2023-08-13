import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  permissao: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
