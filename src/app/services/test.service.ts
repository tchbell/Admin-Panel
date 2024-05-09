import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private apollo: Apollo) { }

  getHello() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          hello
        }
      `,
    }).valueChanges;
  }
}
