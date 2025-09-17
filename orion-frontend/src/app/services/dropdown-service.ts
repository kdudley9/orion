import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getIndustries(): Observable<[]> {
    return this.http.get<[]>('/api/dropdown/industries', {
      withCredentials: true
    });
  }

  getStatuses(): Observable<[]> {
    return this.http.get<[]>('/api/dropdown/statuses', {
      withCredentials: true
    });
  }

  getJobTypes(): Observable<[]> {
    return this.http.get<[]>('/api/dropdown/job-types', {
      withCredentials: true
    });
  }

  getInterviewTypes(): Observable<[]> {
    return this.http.get<[]>('/api/dropdown/interview-types', {
      withCredentials: true
    });
  }
}
