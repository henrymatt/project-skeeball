import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { LineExplanationModel } from '../../models/line-explanation.model';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-view-explanation',
  templateUrl: './player-play-line-explanatio.component.html',
  styleUrls: ['./player-play-line-explanation.component.css'],
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
      transition('start => presented', animate('100ms ease-out')),
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
      transition('start => presented', animate('100ms ease-out')),
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
      transition('start => presented', animate('100ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ])
  ]
})

export class PlayerPlayLineExplanationComponent implements OnInit, OnChanges {
  @Input() line: LineExplanationModel;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  textAnimationState: string;
  buttonAnimationState: string;
  autoplay = true;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize();
  }

  initialize() {
    this.initializeAnimation();
    this.initializeAudio();
  }

  initializeAnimation() {
    this.textAnimationState = 'start';
    this.buttonAnimationState = 'start';
    this.animateTextIn();
    setTimeout(() => {
      this.playNarration();
    }, 100);
  }

  initializeAudio() {
    if (!this.line.audioNarration) {
      console.log('Audio for explanation line was not initialized. Initializing now...');
      this.line.audioNarration = this.audioService.initializeAudioFromFilePath(this.line.audioNarrationUrl);
    }
  }

  onDismissLine() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    this.playButtonClickSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 100);
  }

  displayNextButton() {
    this.buttonAnimationState = 'presented';
  }

  animateTextIn() {
    this.textAnimationState = 'presented';
  }

  playButtonClickSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

  playNarration() {
    if (this.line.audioNarration) {
      this.line.audioNarration.pause(); // workaround for iOS bug
      this.line.audioNarration.play();
      this.line.audioNarration.on('end', () => {
        this.autoplay ? this.advanceToNextLine() : this.displayNextButton();
      });
    } else {
      setTimeout(() => {
        this.autoplay ? this.advanceToNextLine() : this.displayNextButton();
      }, 2000);

    }
  }

  advanceToNextLine() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);

  }

}
