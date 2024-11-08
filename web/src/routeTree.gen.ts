/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const UsersIndexLazyImport = createFileRoute('/users/')()
const ProfileIndexLazyImport = createFileRoute('/profile/')()
const GroupsIndexLazyImport = createFileRoute('/groups/')()
const UsersUserIdLazyImport = createFileRoute('/users/$userId')()
const GroupsGroupIdLazyImport = createFileRoute('/groups/$groupId')()
const signSignupLazyImport = createFileRoute('/(sign)/signup')()
const signSigninLazyImport = createFileRoute('/(sign)/signin')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexLazyRoute = UsersIndexLazyImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/users/index.lazy').then((d) => d.Route))

const ProfileIndexLazyRoute = ProfileIndexLazyImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/index.lazy').then((d) => d.Route))

const GroupsIndexLazyRoute = GroupsIndexLazyImport.update({
  id: '/groups/',
  path: '/groups/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/groups/index.lazy').then((d) => d.Route))

const UsersUserIdLazyRoute = UsersUserIdLazyImport.update({
  id: '/users/$userId',
  path: '/users/$userId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/users/$userId.lazy').then((d) => d.Route))

const GroupsGroupIdLazyRoute = GroupsGroupIdLazyImport.update({
  id: '/groups/$groupId',
  path: '/groups/$groupId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/groups/$groupId.lazy').then((d) => d.Route),
)

const signSignupLazyRoute = signSignupLazyImport
  .update({
    id: '/(sign)/signup',
    path: '/signup',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(sign)/signup.lazy').then((d) => d.Route))

const signSigninLazyRoute = signSigninLazyImport
  .update({
    id: '/(sign)/signin',
    path: '/signin',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(sign)/signin.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(sign)/signin': {
      id: '/(sign)/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof signSigninLazyImport
      parentRoute: typeof rootRoute
    }
    '/(sign)/signup': {
      id: '/(sign)/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof signSignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/groups/$groupId': {
      id: '/groups/$groupId'
      path: '/groups/$groupId'
      fullPath: '/groups/$groupId'
      preLoaderRoute: typeof GroupsGroupIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId': {
      id: '/users/$userId'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof UsersUserIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/groups/': {
      id: '/groups/'
      path: '/groups'
      fullPath: '/groups'
      preLoaderRoute: typeof GroupsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      id: '/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/signin': typeof signSigninLazyRoute
  '/signup': typeof signSignupLazyRoute
  '/groups/$groupId': typeof GroupsGroupIdLazyRoute
  '/users/$userId': typeof UsersUserIdLazyRoute
  '/groups': typeof GroupsIndexLazyRoute
  '/profile': typeof ProfileIndexLazyRoute
  '/users': typeof UsersIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/signin': typeof signSigninLazyRoute
  '/signup': typeof signSignupLazyRoute
  '/groups/$groupId': typeof GroupsGroupIdLazyRoute
  '/users/$userId': typeof UsersUserIdLazyRoute
  '/groups': typeof GroupsIndexLazyRoute
  '/profile': typeof ProfileIndexLazyRoute
  '/users': typeof UsersIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(sign)/signin': typeof signSigninLazyRoute
  '/(sign)/signup': typeof signSignupLazyRoute
  '/groups/$groupId': typeof GroupsGroupIdLazyRoute
  '/users/$userId': typeof UsersUserIdLazyRoute
  '/groups/': typeof GroupsIndexLazyRoute
  '/profile/': typeof ProfileIndexLazyRoute
  '/users/': typeof UsersIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/signin'
    | '/signup'
    | '/groups/$groupId'
    | '/users/$userId'
    | '/groups'
    | '/profile'
    | '/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/signin'
    | '/signup'
    | '/groups/$groupId'
    | '/users/$userId'
    | '/groups'
    | '/profile'
    | '/users'
  id:
    | '__root__'
    | '/'
    | '/(sign)/signin'
    | '/(sign)/signup'
    | '/groups/$groupId'
    | '/users/$userId'
    | '/groups/'
    | '/profile/'
    | '/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  signSigninLazyRoute: typeof signSigninLazyRoute
  signSignupLazyRoute: typeof signSignupLazyRoute
  GroupsGroupIdLazyRoute: typeof GroupsGroupIdLazyRoute
  UsersUserIdLazyRoute: typeof UsersUserIdLazyRoute
  GroupsIndexLazyRoute: typeof GroupsIndexLazyRoute
  ProfileIndexLazyRoute: typeof ProfileIndexLazyRoute
  UsersIndexLazyRoute: typeof UsersIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  signSigninLazyRoute: signSigninLazyRoute,
  signSignupLazyRoute: signSignupLazyRoute,
  GroupsGroupIdLazyRoute: GroupsGroupIdLazyRoute,
  UsersUserIdLazyRoute: UsersUserIdLazyRoute,
  GroupsIndexLazyRoute: GroupsIndexLazyRoute,
  ProfileIndexLazyRoute: ProfileIndexLazyRoute,
  UsersIndexLazyRoute: UsersIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(sign)/signin",
        "/(sign)/signup",
        "/groups/$groupId",
        "/users/$userId",
        "/groups/",
        "/profile/",
        "/users/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(sign)/signin": {
      "filePath": "(sign)/signin.lazy.tsx"
    },
    "/(sign)/signup": {
      "filePath": "(sign)/signup.lazy.tsx"
    },
    "/groups/$groupId": {
      "filePath": "groups/$groupId.lazy.tsx"
    },
    "/users/$userId": {
      "filePath": "users/$userId.lazy.tsx"
    },
    "/groups/": {
      "filePath": "groups/index.lazy.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.lazy.tsx"
    },
    "/users/": {
      "filePath": "users/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
