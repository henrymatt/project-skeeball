import { Component, OnInit } from '@angular/core';
import {LineService} from '../line.service';
import { NgForm } from '@angular/forms';
import {LessonService} from '../../lessons/lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Line} from '../line.model';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styles: []
})
export class AddLineComponent implements OnInit {
  lessonId: number;
  possibleLineTypes: string[];
  selectedLineType: string;

  constructor(private lineService: LineService,
              private lessonService: LessonService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.possibleLineTypes = this.lineService.getAllLineTypes();
    this.lessonId = this.activatedRoute.snapshot.params.id;
  }

  onSubmit(form: NgForm) {
    const newLine = new Line(form.form.value.type, form.form.value.content);
    this.lessonService.createLineInLesson(this.lessonId, newLine);
    this.router.navigate(['/lesson-shell', this.lessonId]);
  }

  selectChangeHandler (event: any) {
    console.log(event);
    this.selectedLineType = event.target.value;
  }

}