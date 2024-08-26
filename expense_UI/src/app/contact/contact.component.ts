import { Component } from '@angular/core';
import {
 faHandsHelping,faUserNinja,faBackward
  } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  icons = { faHandsHelping,faUserNinja,faBackward };
}
