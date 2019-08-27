import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageserviceService } from 'src/app/services/messageservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  @Input() formData = null;
  isEditContact:boolean = false;
  

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl(''),
    favorite: new FormControl('')
    
  });

  get name() {
    return this.contactForm.get('name')
  }

  get email() {
    return this.contactForm.get('email')
  }

  constructor(private messageService: MessageserviceService) { }

  ngOnInit() {
    this.contactForm.reset();
    this.contactForm.get('favorite').setValue(false);
    if(this.formData != null) {
      this.contactForm.setValue({
        name: this.formData.name, 
        email: this.formData.email,
        phone: this.formData.phone,
        favorite : this.formData.favorite
      });  
      this.isEditContact = true;
    }
  }

  onSubmit() {
    this.valueChange.emit(this.contactForm.value);
    this.contactForm.reset();
  }

}
