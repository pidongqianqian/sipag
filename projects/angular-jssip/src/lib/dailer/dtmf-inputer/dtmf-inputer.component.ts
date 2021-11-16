import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pd-dtmf-inputer',
  templateUrl: './dtmf-inputer.component.html',
  styleUrls: ['./dtmf-inputer.component.css']
})
export class DtmfInputerComponent implements OnInit {
  isMute = false;
  isKeypadOn = false;
  isHold = false;
  @Output() keyChange = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyChange(flag: string) {
    this[flag] = !this[flag];
    this.keyChange.emit({[flag]: this[flag]});
  }
}
