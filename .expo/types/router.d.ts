/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/logIn`; params?: Router.UnknownInputParams; } | { pathname: `/signUp`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/chatRoom` | `/chatRoom`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/home` | `/home`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/logIn`; params?: Router.UnknownOutputParams; } | { pathname: `/signUp`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/chatRoom` | `/chatRoom`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/home` | `/home`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/logIn${`?${string}` | `#${string}` | ''}` | `/signUp${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/chatRoom${`?${string}` | `#${string}` | ''}` | `/chatRoom${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/home${`?${string}` | `#${string}` | ''}` | `/home${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/logIn`; params?: Router.UnknownInputParams; } | { pathname: `/signUp`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/chatRoom` | `/chatRoom`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/home` | `/home`; params?: Router.UnknownInputParams; };
    }
  }
}
