import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMemberResponse } from '../member';
import { MemberService } from '../member.service';

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild("editForm") editForm: NgForm;

  pageTitle = 'Member Edit';
  errorMessage: string;


  get isDirty(): boolean {
    return this.editForm.dirty ? true : false;
  }

  private currentMember: IMemberResponse;
  get member(): IMemberResponse {
    return this.currentMember;
  }
  set member(value: IMemberResponse) {
    this.currentMember = value;
  }

   constructor(private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: IMemberResponse = data['resolvedData'];
      this.errorMessage = resolvedData.errorMessage;
      this.onMovieRetrieved(resolvedData);
    });
  }
  onMovieRetrieved(member: IMemberResponse): void {

    this.member = member;
  
    if (!this.member) {
      this.pageTitle = 'No member found';
    } else {
      if (+this.member.member._id === 0) {
        this.pageTitle = 'Add member';
      } else {
        this.pageTitle = `Edit member: ${this.member.member.name}`;
       }
    }
  }


  reset(): void {
    this.editForm.reset();
  }

  saveMember(): void {
    if (this.editForm.form.valid) {
  
      if (+this.member.member._id === 0) {
        this.memberService.createMember(this.member).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.memberService.updateMember(this.member).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    this.reset();
     this.router.navigate(['/members']);
  }
}
