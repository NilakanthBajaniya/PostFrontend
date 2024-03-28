import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../interfaces/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public readonly defaultTagFilter: string = 'tech'
  private postEndPoint: string = `${environment.postApiUrl}/api/post`;

  constructor(private http: HttpClient) { }

  public getPosts(tags: string[] = [this.defaultTagFilter]) {
    const params = new HttpParams().append('tags', tags.join(','));

    return this.http.get<PostResponse>(this.postEndPoint, { params });
  }
}
