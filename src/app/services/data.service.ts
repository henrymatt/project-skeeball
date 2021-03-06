import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Lesson } from '../models/lesson.model';
import { SkeeballErrorModel } from '../models/skeeball-error.model';
import { Vocab } from '../models/vocab.model';
import { UuidService } from './uuid.service';
import { Skill } from '../models/skill.model';
import { User } from '../auth/user.model';
import { AuthData } from '../auth/auth-data.model';

@Injectable()
export class DataService {
  private apiEndpoint = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/';

  constructor(private http: HttpClient, private uuidService: UuidService) {
  }

  // Lessons

  getAllLessons(): Observable<Lesson[]> {
    const url = this.apiEndpoint + 'lessons';
    return this.http.get<Lesson[]>(url);
  }

  getLesson(id: string): Observable<Lesson> {
    const url = this.apiEndpoint + 'lessons/' + id;
    return this.http.get<Lesson>(url);
  }

  createLesson(newLesson: Lesson): Observable<Lesson> {
    const url = this.apiEndpoint + 'lessons';
    newLesson.id = this.uuidService.generateUniqueId();
    return this.http.post<Lesson>(url, newLesson);
  }

  updateLesson(updatedLesson: Lesson): Observable<void> {
    const url = this.apiEndpoint + 'lessons/' + updatedLesson.id;
    return this.http.put<void>(url, updatedLesson);
  }

  deleteLesson(deletedLessonId: string): Observable<void> {
    const url = this.apiEndpoint + 'lessons/' + deletedLessonId;
    return this.http.delete<void>(url);
  }

  // Vocabs

  getAllVocabs(): Observable<Vocab[]> {
    const url = this.apiEndpoint + 'vocabs';
    return this.http.get<Vocab[]>(url);
  }

  createVocab(newVocab: Vocab): Observable<Vocab> {
    const url = this.apiEndpoint + 'vocabs';
    newVocab.id = this.uuidService.generateUniqueId();
    return this.http.post<Vocab>(url, newVocab);
  }

  getVocab(id: string): Observable<Vocab> {
    const url = this.apiEndpoint + 'vocabs/' + id;
    return this.http.get<Vocab>(url);
  }

  updateVocab(updatedVocab: Vocab): Observable<void> {
    const url = this.apiEndpoint + 'vocabs/' + updatedVocab.id;
    return this.http.put<void>(url, updatedVocab);
  }

  deleteVocab(deletedVocab: Vocab): Observable<void> {
    const url = this.apiEndpoint + 'vocabs/' + deletedVocab.id;
    return this.http.delete<void>(url);
  }


  // Skills

  getAllSkills(): Observable<Skill[]> {
    const url = this.apiEndpoint + 'objectives';
    return this.http.get<Skill[]>(url);
  }

  getSkill(id: string): Observable<Skill> {
    const url = this.apiEndpoint + 'objectives/' + id;
    return this.http.get<Skill>(url);
  }

  createSkill(newSkill: Skill): Observable<Skill> {
    const url = this.apiEndpoint + 'objectives';
    newSkill.id = this.uuidService.generateUniqueId();
    return this.http.post<Skill>(url, newSkill);
  }

  updateSkill(updatedSkill: Skill): Observable<void> {
    const url = this.apiEndpoint + 'objectives/' + updatedSkill.id;
    return this.http.put<void>(url, updatedSkill);
  }

  deleteSkill(deletedSkill: Skill): Observable<void> {
    const url = this.apiEndpoint + 'objectives/' + deletedSkill.id;
    return this.http.delete<void>(url);
  }


  // Users

  registerUser(newUser: User) {
    const url = this.apiEndpoint + 'register';
    return this.http.post<User>(url, newUser);
  }

  loginUser(authData: AuthData) {
    const url = this.apiEndpoint + 'authenticate';
    return this.http.post<User>(url, authData);
  }

}
