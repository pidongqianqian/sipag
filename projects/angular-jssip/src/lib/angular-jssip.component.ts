import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UA, WebSocketInterface, debug} from "jssip";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";

@Component({
  selector: 'pd-angular-jssip',
  templateUrl: './angular-jssip.component.html',
  styleUrls: ['./angular-jssip.component.scss']
})
export class AngularJssipComponent implements OnInit {
  @ViewChild(CdkOverlayOrigin, {static: false}) _overlayOrigin: CdkOverlayOrigin;
  @ViewChild('overlay', {static: false}) overlayTemplate: TemplateRef<any>;
  ua: UA = null;
  account: any;
  isOpen = false;

  constructor() {
    // const overlayRef = overlay.create();
    // const userProfilePortal = new ComponentPortal(UserProfile);
    // overlayRef.attach(userProfilePortal);
  }

  ngOnInit(): void {
    this.account = {
      id: 5996,
      accountName: 'alice',
      displayAs: 'alice',
      username: 'alice_74382800541',
      password: 'VJbqq9E4PgBuQsWv',
      isDefault: false,
      status: 0,
      enabled: 1,
      registered: 1,
      wssUrl: 'wss://edge.sip.onsip.com/',
      domain: 'shinetechtest.onsip.com',
      vmNumber: '10087',
      type: 'sip',
    };
    // this.initConnect();
  }

  initConnect() {
    const socket = new WebSocketInterface(this.account.wssUrl);
    const configuration = {
      sockets: [socket],
      uri: `sip:${this.account.username}@${this.account.domain}`,
      authorization_user: `${this.account.username}`,
      password: this.account.password,
      display_name: `${this.account.displayAs}`,
      realm: this.account.domain,
      register: true,
      register_expires: 600,
      contact_uri: `sip:${this.account.username}@${this.account.domain};transport=ws`,
    };
    //https://tryit.jssip.net/?callme=sip:pidong_ylwfcy@tryit.jssip.net
    this.ua = new UA(configuration);
    debug.enable('JsSIP:*');
    this.ua.start();
    this.ua.on('connected',event => this.connected(event));
    this.ua.on('disconnected', event => this.disconnected(event));
    this.ua.on('registered', event => this.registered(event));
    this.ua.on('registrationFailed', event => this.onRegistrationFailed(event));
    this.ua.on('newRTCSession', event => this.newRTCSession(event));
    this.ua.on('newMessage', event => this.newMessage(event));
  }

  connected(e) {
    console.log("sip connected with: ", this.account.username, e);
  }

  disconnected(e) {
    console.log("sip disconnected with: ", this.account.username, e);
  }

  registered(e) {
    console.log("sip registered with: ", this.account.username, e);
  }

  onRegistrationFailed(e) {
    console.log("sip onRegistrationFailed with: ", this.account.username, e);
  }

  newRTCSession(e) {
    console.log("sip newRTCSession with: ", this.account.username, e);
  }

  newMessage(e) {
    console.log("sip newMessage with: ", this.account.username, e);
  }
}
