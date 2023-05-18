import React, { PropsWithChildren, FC, Suspense } from 'react';
import { Button } from '@myproject/ui';
// import { HelmetProvider } from 'react-helmet-async';
// import { Baseline } from '@myproject/shell';
// import { theme } from '@myproject/shared';
// import { Helmet } from 'react-helmet-async';
import { RouteObject, useRoutes } from 'react-router-dom';
// import { Route, Routes, BrowserRouter, Navigate, useRoutes, RouteObject } from 'react-router-dom';
// import Provider from '../provider';

// const CoreApp = React.lazy(() => import('../routes'));
// const LoginApp = React.lazy(() => import('@myproject/login'));
// const PostsApp = React.lazy(() => import('@myproject/posts'));

// function DefaultFallback({ children, fallback }: PropsWithChildren<{ fallback?: React.ReactNode }>) {
//   return (
//     <React.Suspense fallback={fallback}>
//       {children}
//     </React.Suspense>
//   );
// }

// function Apps() {
//   return (
//     <Routes>
//       <Route 
//         path="/*" 
//         element={(
//           <DefaultFallback>
//             <CoreApp />
//           </DefaultFallback>
//         )} 
//       />
//       <Route 
//         path="/login/*" 
//         element={(
//           <DefaultFallback>
//             <LoginApp />
//           </DefaultFallback>
//         )} 
//       />
//       <Route 
//         path="/posts/*" 
//         element={(
//           <DefaultFallback>
//             <PostsApp />
//           </DefaultFallback>
//         )} 
//       />
//       <Route
//         path="/*"
//         element={<Navigate to="/404" replace />}
//       />
//     </Routes>
//   );
// }

// export function App({ routes }: { routes: RouteObject[] }) {
//   const routeElement = useRoutes(routes);
//   console.log('routeElement', routeElement);
//   return (
//     <>
//       <Baseline />
//       {/* <Provider>
//         <Apps />
//         <Routes>
//           <Route 
//             path="/*" 
//             element={<div>Hello</div>} 
//           />
//         </Routes>
//       </Provider> */}
//       {/* <Apps /> */}
//       {routeElement}
//     </>
//   );
// }

type AppProps = {
  readonly routes?: RouteObject[];
}

export const App: FC<AppProps> = ({ routes = [] }) => {
  // const routeElement = useRoutes(routes);
  return (
    <div>
      {/* <Helmet htmlAttributes={{ lang: 'ru-RU' }} /> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
      <h1>hello 10</h1>
      <Button />
    </div>
  );
};

export default App;
