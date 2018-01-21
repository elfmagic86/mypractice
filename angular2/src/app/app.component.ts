import { Component } from '@angular/core';

// Turn AppComponent into an application shell that only handles navigation
// The AppComponent is now attached to a router and displaying routed views.
// For this reason and to distinguish it from other kinds of components, we call this type of component a Router Component.


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent {
  title: string = 'tour-heroes';
}
