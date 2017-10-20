import {MockBackend, MockConnection} from '@angular/http/testing';
import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod,
  XHRBackend,
  RequestOptions
} from '@angular/http';


export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  const users: AuthUser[] = JSON.parse(localStorage.getItem('users')) || [];
  // setup users
  this.backEnd.connections.subscribe((connection: MockConnection) => {
    if (connection.request.url.endsWith('/api/auth') && connection.request.method === RequestMethod.Post) {
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

    // get users
    if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
      // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
      if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: users})));
      } else {
        // return 401 not authorised if token is null or invalid
        connection.mockRespond(new Response(new ResponseOptions({status: 401})));
      }
      return;
    }

    if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
      // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
      if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        // find user by id in users array
        let urlParts = connection.request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = users.filter(user => {
          return user.id === id;
        });
        let user = matchedUsers.length ? matchedUsers[0] : null;

        // respond 200 OK with user
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: user})));
      } else {
        // return 401 not authorised if token is null or invalid
        connection.mockRespond(new Response(new ResponseOptions({status: 401})));
      }

      return;
    }

    // pass through any requests not handled above
    let realHttp = new Http(realBackend, options);
    let requestOptions = new RequestOptions({
      method: connection.request.method,
      headers: connection.request.headers,
      body: connection.request.getBody(),
      url: connection.request.url,
      withCredentials: connection.request.withCredentials,
      responseType: connection.request.responseType
    });

    realHttp.request(connection.request.url, requestOptions)
      .subscribe((response: Response) => {
          connection.mockRespond(response);
        },
        (error: any) => {
          connection.mockError(error);
        });
  });
  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface AuthUser extends User {
  password: string;
}
