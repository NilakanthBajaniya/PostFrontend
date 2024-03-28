import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/post';
import { PostResponse } from 'src/app/interfaces/post-response';
import { FormsModule } from '@angular/forms';
import { Meta } from 'src/app/interfaces/meta';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  readonly defaultTagFilter: string = this.postService.defaultTagFilter;

  posts: Post[] = [];
  options: Meta | null = null;


  loading: boolean = true;
  displayTagFilterError: boolean = false;

  newTagFilter: string = '';
  tagFilters: string[] = [this.defaultTagFilter];

  sortBy: string | null = null;
  sortDirection: string | null = null;

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  addTagFilter() {
    if (this.newTagFilter && !this.tagFilters.includes(this.newTagFilter)) {
      this.tagFilters.push(this.newTagFilter);
      this.newTagFilter = '';

      this.getPosts();
    } else {
      this.displayTagFilterErrorMessage();
    }
  }

  onSortByChange(event: any) {
    const target = event.target as HTMLInputElement;
    this.sortBy = target.value;

    this.getPosts();
  }

  onSortByDirectionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.sortDirection = target.value;

    this.getPosts();
  }

  displayTagFilterErrorMessage() {
    this.displayTagFilterError = true;
    setTimeout(() => {
      this.displayTagFilterError = false;
    }, 2000);
  }

  removeTagFilter(tagToRemove: string) {
    this.tagFilters = this.tagFilters.filter(tag => tag !== tagToRemove);
    this.getPosts();
  }

  getPosts() {
    this.loading = true;

    this.postService.getPosts(this.tagFilters, this.sortBy, this.sortDirection).subscribe({
      next: (response: PostResponse) => {
        this.posts = response.posts;
        this.options = response.meta;
        this.loading = false;
      },
      error: _ => {
        this.loading = false;
      }
    })
  }
}
