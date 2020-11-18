import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent implements OnInit {

  @Input() editMode: boolean;

  @Input() type: string = "text";

  @Input() name: string = "name";

  @Input() valueModel: string;

  @Output() valueModelChange = new EventEmitter<string>();
  
  constructor() { 
  }

  ngOnInit(): void {
  }

}
