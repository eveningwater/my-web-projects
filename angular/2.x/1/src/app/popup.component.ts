import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'my-popup',
  template: `
    <div class="popup-mask"></div>
    <div class="popup-content">
      <button (click)="closed.next()" class="btn close-btn">&#x2716;</button>
      <div class="popup-header">
         this is title
      </div>
      <div class="popup-body">
        <span>Popup: {{message}}</span>
      </div>
      <div class="popup-footer">
        <button (click)="closed.next()" class="btn btn-cancel">取消</button>
        <button (click)="closed.next()" class="btn">确认</button>
      </div>
    </div>
  `,
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateY(0%)'})),
      state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ])
  ],
  styles: [`
    :host {
      
    }
    .popup-mask {
       position:fixed;
       left:0;
       right:0;
       bottom:0;
       top:0;
       background:rgba(0,0,0,.5);
    }
    .popup-header {
       padding:8px;
       color:#535455;
    }
    .popup-body {
       padding:20px;
    }
    .popup-content {
      position: absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      background: #fff;
      color:#2396ef;
      min-width:320px;
      padding:20px;
      border-radius:15px;
    }
    .popup-footer {
      display:flex;
      align-items:center;
      justify-content:center;
      margin-top:15px;
    }
    .btn {
      outline:none;
      border:1px solid #4097ef;
      padding:.6rem 1.2rem;
      color:#fff;
      background:#2396ef;
      cursor:pointer;
      letter-spacing:2px;
      margin:0 .4rem;
      border-radius:8px;
    }
    .btn.btn-cancel {
      background:transparent;
      color:#2396ef;
    }
    .close-btn {
      position:fixed;
      right:5px;
      top:5px;
      border-radius: 50%;
      width:25px;
      height:25px;
      text-align:center;
      border:0;
      background:transparent;
      color:#535455;
    }
    .btn:not(.close-btn):hover {
       background:#038ffd;
       border-color:#7eb5ec;
       color:#fff;
    }
    .btn.close-btn:hover {
       opacity:.8;
    }
  `]
})
export class PopupComponent {
  @HostBinding('@state')
  state: 'opened' | 'closed' = 'closed';

  @Input()
  get message(): string { return this._message; }
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }
  private _message = '';

  @Output()
  closed = new EventEmitter<void>();
}