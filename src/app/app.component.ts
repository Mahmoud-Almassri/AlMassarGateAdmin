import { Component, OnInit} from '@angular/core';
import { AuthorizeService } from '../auth/authorize.service';
import { MessagingService } from './firebase-messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthorizeService,
    private messagingService: MessagingService){}
  ngOnInit(): void {
    console.log(this.authService.getLoggedInUsersRole())
  }
  public initFirebase() {
    this.messagingService.requestPermission();
  }

}
