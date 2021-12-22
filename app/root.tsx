import { Links, LiveReload, Meta, Outlet, Scripts } from "remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <title>Remix: So great, it's funny!</title>
        <Links/>
      </head>
      <body>
        <Outlet />
        {/* <Scripts /> */}
        {process.env.NODE_ENV === "development" ? (
          <LiveReload /> 
        ) : null}
      </body>
    </html>
  );
}