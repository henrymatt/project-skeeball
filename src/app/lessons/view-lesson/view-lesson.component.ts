import { Component, OnInit } from '@angular/core';
import {Lesson} from '../lesson.model';
import {LessonService} from '../lesson.service';
import {Line} from '../../lines/line.model';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {
  currentLesson: Lesson;
  currentLineIndex: number;
  titleDismissed = false;
  totalLines: number;
  currentLine: Line;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.currentLesson = this.lessonService.selectedLesson;
    this.currentLineIndex = 0;
    this.currentLine = this.lessonService.selectedLesson.lines[this.currentLineIndex];
    this.totalLines = this.currentLesson.lines.length;
  }

  transitionToLine(nextLineIndex: number) {
    if (nextLineIndex >= 0 && nextLineIndex < this.totalLines) {
      this.currentLineIndex = nextLineIndex;
      this.currentLine = this.currentLesson.lines[nextLineIndex];
    }
  }

  onLineDismissed(value: boolean) {
    this.transitionToLine(this.currentLineIndex + 1);
  }

}
