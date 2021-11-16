import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pd-function-pad',
  templateUrl: './function-pad.component.html',
  styleUrls: ['./function-pad.component.scss']
})
export class FunctionPadComponent implements OnInit {
  isMute = false;
  isKeypadOn = false;
  isHold = false;
  @Output() keyChange = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyChange(flag: string) {
    this[flag] = !this[flag];
    this.keyChange.emit({key: flag, value: this[flag]});
  }
}
