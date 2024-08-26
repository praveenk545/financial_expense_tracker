import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit() {
    // // If you're using Bootstrap 4
    // (window as any).$('[data-toggle="collapse"]').collapse();

    // // If you're using Bootstrap 5
    // (window as any).bootstrap.Collapse();
  }

 
  
}
