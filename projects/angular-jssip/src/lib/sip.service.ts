import {EventEmitter, Injectable} from '@angular/core';
import {debug, UA, WebSocketInterface} from "jssip";
import {AnswerOptions, RTCSession} from "jssip/lib/RTCSession";

@Injectable({
  providedIn: 'root'
})
export class SipService {
  sipRtcEvent: EventEmitter<any>
  ua: UA = null;
  rtcSession: RTCSession = null;
  account: any;
  userSessions: RTCSession[] = [];
  currentUser = '';
  userNumber = null;

  eventHandlers = {
    'progress': e => {
      console.log('call is in progress', e);
      let cause = '';
      if (e.cause) {
        cause = e.cause;
      }
      if (e.message && e.message.status_code) {
        cause = `${cause}:${e.message.status_code}`;
      }
      console.log('call is in progress with cause: ', cause);
      this.sipRtcEvent.emit({status: 'progress', info: ''});
    },
    'failed': e => {
      console.log('call failed with e: ', e);
      let cause = '';
      if (e.cause) {
        cause = e.cause;
      }
      if (e.message && e.message.status_code) {
        cause = `${cause}:${e.message.status_code}`;
      }
      console.log('call failed with cause: ', cause);
      this.sipRtcEvent.emit({status: 'failed', info: ''});
    },
    'ended': e => {
      console.log('call ended with cause: ', e);
      this.sipRtcEvent.emit({status: 'ended', info: ''});
    },
    'confirmed': e => {
      console.log('call confirmed, in calling');
      this.sipRtcEvent.emit({status: 'confirmed', info: ''});
    },
  };

  constructor() {
    this.sipRtcEvent = new EventEmitter();
    this.account = {
      id: 5996,
      accountName: 'alice',
      displayAs: 'alice',
      username: '',
      password: '',
      isDefault: false,
      status: 0,
      enabled: 1,
      registered: 1,
      wssUrl: '',
      domain: '',
      vmNumber: '',
      type: 'sip',
    };
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
    if (e.originator === 'remote') {
      this.rtcSession = e.session;
      // push rtcSession to state.userSessions
      this.updateUserSession(this.rtcSession);
      //Add event listener function to rtcSession
      Object.keys(this.eventHandlers).forEach((eventName: any) => {
        this.rtcSession.on(eventName, this.eventHandlers[eventName]);
      });
      //display caller name
      if (e.request.method === 'INVITE') {
        console.log({callInfo: `call from ${e.request.from._display_name}`});
        this.sipRtcEvent.emit({status: 'incoming', info: e.request.from._display_name});
      }
    }
  }

  updateUserSession(rtcSession) {
    let notExist = true;
    let userSessions = this.userSessions.map(userSession => {
      if (userSession.id === rtcSession.id) {
        userSession = rtcSession;
        notExist = false;
      }
      return userSession;
    });
    if (notExist) {
      userSessions = [...this.userSessions, rtcSession];
    }
    this.userSessions = userSessions;
  }

  onVoiceCall() {
    // Register callbacks to desired call events
    if (!this.currentUser) {
      console.log('no user connected');
      return;
    }
    const options = {
      'eventHandlers': this.eventHandlers,
      'mediaConstraints': {
        'audio': true,
        'video': false, // set 'false' if server only support audio
      },
    };
    this.rtcSession = this.ua?.call(this.userNumber, options);
    if (this.rtcSession) {
      this.updateUserSession(this.rtcSession);
      this.rtcSession.connection.addEventListener('addstream', e => {
        this.createAudioAndPlay(e);
      });
    }
  }

  onVoiceAnswer() {
    const callOptions: AnswerOptions = {
      mediaConstraints: {
        audio: true, // only audio calls
        video: false, // set 'false' if server only support audio
      },
      pcConfig: {
        iceServers: [
          {urls: ["stun:stun.l.google.com:19302"]},
        ],
        iceTransportPolicy: "all",
        // @ts-ignore
        rtcpMuxPolicy: "require",
      },
    };
    this.rtcSession.answer(callOptions);
    this.rtcSession.connection.addEventListener('addstream', (event: any) => {
      console.log('onVoiceAnswer addstream:', event);
      this.createAudioAndPlay(event);
    });
  }

  onVoiceHangUp() {
    if (!this.rtcSession) {
      return;
    }
    this.rtcSession.terminate();
    const userSessions = this.userSessions.filter(userSession => {
      return userSession.id !== this.rtcSession.id;
    });
    this.userSessions = userSessions;
    this.rtcSession = userSessions.find(userSession => {
      return userSession.isInProgress;
    });
  }

  mute(type: string) {
    if (this.rtcSession) {
      const types = this.rtcSession.isMuted()
      types[type] ? this.rtcSession.unmute() : this.rtcSession.mute();
    }
  }

  hold() {
    if (this.rtcSession) {
      const types = this.rtcSession.isOnHold()
      types.local ? this.rtcSession.unhold() : this.rtcSession.hold();
    }
  }

  newMessage(e) {
    console.log("sip newMessage with: ", this.account.username, e);
  }

  createAudioAndPlay(e) {
    const audio = document.createElement('audio');
    audio.srcObject = e.stream;
    audio.play();
  }
}
