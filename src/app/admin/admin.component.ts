import {Component, OnInit} from '@angular/core';
import {ExhibitApiService} from '../services/exhibit-api.service';
import {Router} from '@angular/router';
import {Comment} from '../models/comment';
import {CommentsService} from '../services/comments.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  comments: Comment[] = [];
  error?: string;

  constructor(private router: Router, private api: ExhibitApiService, private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    if (!this.api.authToken) {
      // redirect to sign-in
      this.router.navigate(['/sign-in']);
    }
    this.getComments();
  }

  getComments(): void {
    this.commentsService.fetchComments(true).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: error => {
        this.error = 'Sorry, comments could not be loaded.';
      }
    });
  }

  toggleHideComment(id?: string, hide: boolean = true): void {
    if (id) {
      this.commentsService.updateComment(id, {hidden: hide}).subscribe({
        next: (comment) => {
          const index = this.comments.findIndex((curr: Comment) => {
            return curr._id === id;
          });
          this.comments[index] = comment;
        },
        complete: () => {
          // TODO: inform user via overlay?
        },
        error: error => {
          this.error = 'Sorry, comments could not be updated.';
        }
      });
    }
  }

  deleteComment(id?: string): void {
    if (id) {
      this.commentsService.deleteComment(id).subscribe({
        next: (comment) => {
          this.comments = this.comments.filter((curr: Comment) => {
            return curr._id !== id;
          });
        },
        error: error => {
          this.error = 'Sorry, comments could not be deleted.';
        }
      });
    }
  }

}
