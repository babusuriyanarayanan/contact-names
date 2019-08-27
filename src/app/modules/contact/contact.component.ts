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
  @Input() formData;

  

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl('')
    
  });

  get name() {
    return this.contactForm.get('name')
  }

  get email() {
    return this.contactForm.get('email')
  }

  constructor(private messageService: MessageserviceService) { }

  ngOnInit() {
    console.log("check form data value");
    console.log(this.formData);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.contactForm.value);
    this.valueChange.emit(this.contactForm.value);
    this.contactForm.reset();
  }

}
