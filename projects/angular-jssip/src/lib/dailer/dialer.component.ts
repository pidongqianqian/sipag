import { Component, OnInit } from '@angular/core';
import {SipService} from "../sip.service";

@Component({
  selector: 'pd-dialer',
  templateUrl: './dialer.component.html',
  styleUrls: ['./dialer.component.scss']
})
export class DialerComponent implements OnInit {
  comingCallUserName = '';
  callNumberStr = '';
  dtmfNumber = '';
  isCalling = false;
  isDtmf = false;
  duration = 0;
  timer: any;
  callTime = ''; //calling...|00:00:00|wait ...
  incoming = false;

  constructor(private sip: SipService) {
    this.sip.sipRtcEvent.subscribe(event => this.onRtcEvent(event))
  }

  ngOnInit(): void {
  }

  onCall() {
    this.isCalling = true;
    this.callTime = 'calling...';
    this.sip.currentUser = 'test';
    this.sip.userNumber = this.callNumberStr;
    this.sip.onVoiceCall();
  }

  onCalling() {
    this.incoming = false;
    this.isCalling = true;
    this.timing();
  }

  onRtcEvent(event: any) {
    switch (event.status) {
      case 'failed':
        this.afterHangUp();
        break;
      case 'ended':
        this.afterHangUp();
        break;
      case 'confirmed':
        this.onCalling();
        break;
      case 'incoming':
        this.comingCallUserName = event.info;
        this.incoming = true;
        break;
      default:
        break;
    }
  }

  onHangUp() {
    this.sip.onVoiceHangUp();
  }

  afterHangUp() {
    this.incoming = false;
    this.isCalling = false;
    this.isDtmf = false;
    this.comingCallUserName = "";
    this.callTime = "";
    this.stopTiming();
  }

  onAnswer() {
    this.callTime = 'wait ...';
    this.incoming = false;
    this.isCalling = true;
    this.sip.onVoiceAnswer();
  }

  functionChange($event) {
    switch ($event.key) {
      case 'isMute':
        this.sip.mute('audio');
        break;
      case 'isHold':
        this.sip.hold();
        break;
      case 'isKeypadOn':
        this.isDtmf = $event.value;
        break;
      default:
        break;
    }
  }

  showTime() {
    const toDouble = function(num) {
      return num < 10 ? ('0' + num) : ('' + num);
    };
    const duration = this.duration + 1;
    const hour = toDouble(Math.floor(this.duration / 60 / 60));
    const minute = toDouble(Math.floor(this.duration / 60 % 60));
    const second = toDouble(Math.floor(this.duration % 60));
    this.duration = duration;
    this.callTime = `${hour}:${minute}:${second}`;
  }

  timing() {
    setTimeout(()=>{this.showTime();}, 0);
    this.timer = setInterval(() => {this.showTime();}, 1000);
  }

  stopTiming() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer =  null;
      this.duration = 0;
    }
  }

  onTest(num) {
    if (num === 1) {
      this.sip.account = {
        id: 5996,
        accountName: 'bob',
        displayAs: 'bob',
        username: '',
        password: '',
        isDefault: false,
        status: 0,
        enabled: 1,
        registered: 1,
        wssUrl: '',
        domain: '',
        vmNumber: '10087',
        type: 'sip',
      }
    }
    this.sip.initConnect();
  }
}
