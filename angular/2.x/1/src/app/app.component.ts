import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PopupService } from './popup.service';
import { PopupComponent } from './popup.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <input #input placeholder="Please enter the popup content" value="the default popup content" />
      <div class="btn-group">
        <button (click)="popup.showAsComponent(input.value)">Show as component</button>
        <button (click)="popup.showAsElement(input.value)">Show as element</button>
      </div>
    </div>
  `,
  styleUrls:["./app.component.scss"]
})
export class AppComponent {
  constructor(injector: Injector, public popup: PopupService) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}