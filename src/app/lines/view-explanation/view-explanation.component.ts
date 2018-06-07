import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Line } from '../line.model';
import { LineExplanation } from '../line-explanation';
import { Howl } from 'howler';
import { AudioService } from '../../shared/audio.service';

@Component({
  selector: 'app-view-explanation',
  templateUrl: './view-explanation.component.html',
  styleUrls: ['./view-explanation.component.css'],
  animations: [
    trigger('primaryTextState', [
      state('start', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      state('presented', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('end', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      transition('start => presented', animate('300ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ]),
    trigger('secondaryTextState', [
      state('start', style({
        opacity: 0
      })),
      state('presented', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start => presented', animate('100ms 300ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ]),
    trigger('buttonState', [
      state('start', style({
        opacity: 0
      })),
      state('presented', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start => presented', animate('300ms 200ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ])
  ]
})

export class ViewExplanationComponent implements OnInit, OnChanges {
  @Input('line') genericLine: Line;
  line: LineExplanation = new LineExplanation();
  animationState: string;
  displayButtonState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private audioService: AudioService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.mapGenericLineToLine(changes.genericLine.currentValue);
    this.initializeAnimation();
    this.initializeNarration();
  }

  mapGenericLineToLine(genericLine: Line) {
    this.line.videoScript = genericLine.explanationVideoScript;
    this.line.audioScript = genericLine.explanationAudioScript;
    this.line.audioNarrationUrl = genericLine.explanationAudioMp3;
  }

  ngOnInit() {
    this.mapGenericLineToLine(this.genericLine);
    this.initializeAnimation();
    this.initializeNarration();
  }

  initializeAnimation() {
    this.animationState = 'start';
    this.displayButtonState = 'start';
    setTimeout(() => {
      this.animateIn();
      this.playNarration();
    }, 1000);
  }

  animateIn() {
    this.animationState = 'presented';
  }

  animateOut() {
    this.animationState = 'end';
    this.displayButtonState = 'end';
    this.playNeutralSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);

  }

  playNeutralSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

  displayNextButton() {
    this.displayButtonState = 'presented';
    console.log('Should display next button');
  }

  initializeNarration() {
    const audioFiles = this.audioService.currentLessonAudioFiles;
    for (let i = 0; i < audioFiles.length; i++) {
      if (audioFiles[i].url === this.line.audioNarrationUrl) {
        this.line.audioNarration = audioFiles[i].howl;
        console.log('Line ' + i + ' has been assigned ' + audioFiles[i].url);
      }
    }
  }

  playNarration() {
    this.line.audioNarration.pause();
    this.line.audioNarration.play();
    this.line.audioNarration.on('end', () => {
      this.displayNextButton();
    });
  }

}
