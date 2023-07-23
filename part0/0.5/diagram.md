```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser fetch the html document of the SPA page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

Note right of browser: The browser fetch the spa.js file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "","date": "2023-07-23T16:45:32.757Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```