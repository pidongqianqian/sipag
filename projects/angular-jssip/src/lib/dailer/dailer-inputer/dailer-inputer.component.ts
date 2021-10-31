import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pd-dailer-inputer',
  templateUrl: './dailer-inputer.component.html',
  styleUrls: ['./dailer-inputer.component.scss']
})
export class DailerInputerComponent implements OnInit {
  @Input() numberStr = '';
  @Output() numberStrChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onNumberStrChange(numStr: string) {
    this.numberStr = this.numberStr + numStr;
    this.numberStrChange.emit(this.numberStr);
  }
}
