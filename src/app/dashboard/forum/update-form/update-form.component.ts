import { Component, OnInit, ViewChild } from '@angular/core';
import { ForumService } from '../forum.service';
import { User } from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    des: new FormControl('')
  });

  showFarmer = true;
  showBuyer = true;

  constructor( ) { }

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.updateForm.controls;

  get title() {
    return this.updateForm.get('title');
  }
  get des() {
    return this.updateForm.get('des');
  }
  ngOnInit() {
  }
}
