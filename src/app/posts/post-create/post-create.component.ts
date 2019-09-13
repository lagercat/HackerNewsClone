import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {

    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {validators: [Validators.required]}),
            content: new FormControl(null, {validators: [Validators.required]}),
            contentType: new FormControl(null, {validators: [Validators.required]}),
        });
    }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.form.reset();
    }
}
