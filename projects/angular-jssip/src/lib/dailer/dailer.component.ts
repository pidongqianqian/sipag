import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pd-dailer',
  templateUrl: './dailer.component.html',
  styleUrls: ['./dailer.component.scss']
})
export class DailerComponent implements OnInit {
  callNumberStr = '';
  dtmfNumber = '';
  isCalling = false;
  isDtmf = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCall() {
    this.isCalling = true;
  }

  onHangUp() {
    this.isCalling = false;
  }
}
