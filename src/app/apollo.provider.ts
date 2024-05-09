// apollo.provider.ts
import { Apollo, APOLLO_FLAGS, APOLLO_OPTIONS } from 'apollo-angular';
import { from, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { inject, Provider } from '@angular/core';
// import { API_URL_TOKEN } from '@ecatalog/ui/core/di/api-url.token';
import { setContext } from '@apollo/client/link/context';
import { HttpHeaders } from '@angular/common/http';

// This will take your Bearer token from the local storage to send on requests' headers
// const authLink = setContext(() => {
//   const token = localStorage.getItem('token');
//   if (token === null) {
//     return {};
//   } else {
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   }
// });

export const provideApollo = (): Provider => [
  {
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      return {
        cache: new InMemoryCache(),
        link: from([
          // authLink, // for the auth
          httpLink.create({ // for your backend endpoint
            uri: "http://localhost:4000/graphql",
            // withCredentials: true,
            // headers: new HttpHeaders({
            //   'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Credentials': 'true',
            // }),
          }),
        ]),
      };
    },
    deps: [HttpLink],
  },
  Apollo,
];
