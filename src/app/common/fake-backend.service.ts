import {Injectable, OnInit} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions} from '@angular/http';

@Injectable()
export class FakeBackendService implements OnInit{
  constructor(private backEnd: MockBackend) { }
  ngOnInit(): void {
    const users: AuthUser[] = JSON.parse(localStorage.getItem('users')) || [];
    // setup users
    this.backEnd.connections.subscribe((connection: MockConnection) => {
      if(connection.request.url.endsWith('/api/auth') && connection.request.method === RequestMethod.Post) {
        const params = JSON.parse(connection.request.getBody());
        const filteredUsers = users.filter(user => {
          return user.username === params.username && user.password === params.password;
        });
        if (filteredUsers.length) {
          const user: User = filteredUsers[0];
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token'
            }
          })));
        } else {
          // else return 400 bad request
          connection.mockError(new Error('Username or password is incorrect'));
        }
  
      }
    });
  }
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}
export interface AuthUser extends User{
  password: string;
}
