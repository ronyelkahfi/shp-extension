(function () {
    const originalFetch = window.fetch;
    const originalXhrOpen = XMLHttpRequest.prototype.open;
  
    // Intercept fetch requests
    window.fetch = async function (...args) {
      console.log("Fetch request:", args[0], args[1]);
      window.postMessage({ type: "FETCH", url: args[0], options: args[1] }, "*");
      return originalFetch.apply(this, args);
    };
  
    // Intercept XMLHttpRequest requests
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      console.log("XHR request:", method, url);
      window.postMessage({ type: "XHR", method, url }, "*");
      return originalXhrOpen.apply(this, [method, url, ...rest]);
    };
  })();
  