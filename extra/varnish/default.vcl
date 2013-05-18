# Basic Varnish config which forces caching on a few bits.
# I dislike adding application logic in at this tier, so will try to refactor this to be more dumb.

backend default {
  .host = "127.0.0.1";
  .port = "3000";
}

sub vcl_recv {
  if (req.url ~ "^/stats" || req.url ~ "^/nowplaying") {
    unset req.http.Cookie;
  }
}

sub vcl_fetch {
  if (req.url ~ "^/stats" || req.url ~ "^/nowplaying" ) {
    remove beresp.http.set-Cookie;
    set beresp.ttl = 5s;
    set beresp.http.Cache-Control = "max-age=10";
    return (deliver);
  }

  if (req.url ~ "^/(js|img|css)") {
    remove beresp.http.set-Cookie;
    set beresp.ttl = 3600s;
    set beresp.http.Cache-Control = "max-age=3600"; 
    return (deliver);
  }
}
