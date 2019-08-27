import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessageserviceService } from 'src/app/services/messageservice.service';

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

  constructor(private modalService: NgbModal, private messageService: MessageserviceService) { }
  
  ngOnInit() {
    this.getLocalStorage();
    this.messageService.currentMessage.subscribe((msg)=> {
      if("published" === msg) {
          this.getLocalStorage();
      }
    });
  }

  getLocalStorage() {
    this.contactListArr = JSON.parse(localStorage.getItem("contact-list")) || [];
    if(this.contactListArr.length > 0) {
        Object.assign(this.savedContactArr, this.contactListArr);
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

  onChange(event) {
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
    this.modalRef.close();

  }

}
