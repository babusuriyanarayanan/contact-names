import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessageserviceService } from 'src/app/services/messageservice.service';
import * as _ from "underscore";

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {

  private modalRef: NgbModalRef;
  formDataValue:any;
  savedContactArr:any = [];
  contactListArr:any = [];
  isFav:boolean = false;

  constructor(private modalService: NgbModal, private messageService: MessageserviceService) { 
    
  }
  
  ngOnInit() {
    this.getLocalStorage();
    this.messageService.currentMessage.subscribe((msg)=> {
      let isCurrEvent = localStorage.getItem("currentEvent");
      if("published" === msg && isCurrEvent!=null && isCurrEvent !== "favorites") {
        this.isFav = false;
      } else if("favorites" == msg && isCurrEvent!=null && isCurrEvent === "favorites") {
          this.isFav = true;
      }
      this.getLocalStorage();
    });
  }

  getLocalStorage() {
    this.contactListArr = JSON.parse(localStorage.getItem("contact-list")) || [];
    if(this.contactListArr.length > 0) {
      if(!this.isFav){
        Object.assign(this.savedContactArr, this.contactListArr);
      } else {
        let onlyFavoriteContactArr = _.filter(this.contactListArr, (cntct) => {
            return cntct["favorite"] == true;
        });
        this.savedContactArr = [];
        Object.assign(this.savedContactArr, onlyFavoriteContactArr);
      }
       
    } 
  }

  openDialog(content) {
    this.formDataValue = null;
    this.modalRef = this.modalService.open(content, { windowClass: 'modal-holder', centered: true });
  }

  editDialog(item, content) {
    this.formDataValue = item;
    this.modalRef = this.modalService.open(content, { windowClass: 'modal-holder', centered: true });
  }

  onChange(event,isModal=false) {
    var cList = JSON.parse(localStorage.getItem("contact-list")) || [];
    let isContactExist = false;
    if(cList.length >0) {
      for (let i=0; i<cList.length;i++) {
        if(cList[i].email === event.email) {
          isContactExist = true;
          Object.assign(cList[i], event);
        }
      }
    } 
    if(!isContactExist) {
      cList.push(event);
    }
    
    localStorage.setItem('contact-list',JSON.stringify(cList));
    this.messageService.changeMessage("published");
    if(!isModal) {
      this.modalRef.close();
    }
    

  }

  onFavToggle(item, toggleValue) {
   
    item.favorite = toggleValue;
    console.log(item);
    this.onChange(item, true);
  }

}
