import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from 'src/app/services/messageservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  liked:boolean = false;
  addrliked:boolean = false;

  constructor(private messageService: MessageserviceService) { }

  ngOnInit() {
  }

  filterContacts(msg) {
      if("favorite"=== msg) {
        this.liked = !this.liked;
        if(this.liked) {
          localStorage.setItem("currentEvent", "favorites");
          this.messageService.changeMessage("favorites");
        } else {
          localStorage.setItem("currentEvent", "all");
          this.messageService.changeMessage("published");
        }
        
       

      } else if("all" === msg) {
        this.addrliked = !this.addrliked;
        this.liked = false;
        localStorage.setItem("currentEvent", "all");
        this.messageService.changeMessage("published");
      } else if("modal"=== msg){
        this.messageService.changeMessage("modal");
      } 

  }

}
