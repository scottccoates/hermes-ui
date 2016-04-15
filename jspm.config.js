SystemJS.config({
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime"
    ],
    "stage": 0
  },
  packages: {
    "src": {
      "meta": {
        "*.js": {
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    },
    "build": {
      // build is used to import the container.js from the build/ dir.
      // apparently this key needs to exist for babel and systemjs to work properly
    }
  },
  map: {
    "babel": "npm:systemjs-plugin-babel@0.0.8"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "auth0-lock": "github:auth0/lock@7.5.6",
    "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.7.4",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "baconjs": "npm:baconjs@0.7.74",
    "bankers-box": "github:twilio/BankersBox@0.1.0",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "classnames": "github:JedWatson/classnames@2.1.2",
    "clean-css": "npm:clean-css@3.4.6",
    "core-js": "npm:core-js@2.2.1",
    "css": "github:systemjs/plugin-css@0.1.18",
    "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
    "dropzone": "npm:dropzone@4.0.1",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "firebase": "github:firebase/firebase-bower@2.2.7",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "history": "npm:history@1.17.0",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "humps": "github:domchristie/humps@0.6.0",
    "immutable": "npm:immutable@3.7.4",
    "intravenous": "github:willow/intravenous@master",
    "jquery": "github:components/jquery@2.1.3",
    "lodash": "npm:lodash-compat@3.10.1",
    "loglevel": "npm:loglevel@1.3.1",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "moment": "npm:moment@2.10.6",
    "nanoscroller": "github:jamesflorentino/nanoScrollerJS@0.8.4",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "nprogress": "github:rstacruz/nprogress@0.1.6",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.8",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "query-string": "npm:querystring@0.2.0",
    "raygun4js": "github:MindscapeHQ/raygun4js@2.0.3",
    "react": "npm:react@0.14.3",
    "react-bacon": "npm:react-bacon@0.0.4",
    "react-bootstrap": "npm:react-bootstrap@0.28.2",
    "react-datepicker": "npm:react-datepicker@0.19.0",
    "react-dom": "npm:react-dom@0.14.3",
    "react-highlighter": "npm:react-highlighter@0.3.0",
    "react-onclickoutside": "npm:react-onclickoutside@4.5.0",
    "react-redux": "npm:react-redux@4.4.1",
    "react-router": "npm:react-router@1.0.3",
    "react-select": "npm:react-select@0.9.1",
    "react-tagsinput": "github:olahol/react-tagsinput@1.2.0",
    "redux": "npm:redux@3.0.2",
    "redux-form": "npm:redux-form@4.2.2",
    "redux-history-transitions": "npm:redux-history-transitions@1.0.0",
    "redux-thunk": "npm:redux-thunk@1.0.0",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.5.6",
    "tcomb": "npm:tcomb@2.5.1",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "whatwg-fetch": "npm:whatwg-fetch@0.10.0"
  },
  packages: {
    "github:capaj/systemjs-hot-reloader@0.5.6": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "socket.io-client": "github:socketio/socket.io-client@1.4.5",
        "weakee": "npm:weakee@1.0.0"
      }
    },
    "github:jamesflorentino/nanoScrollerJS@0.8.4": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.12",
        "jquery": "github:components/jquery@2.1.3"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.5.1"
      }
    },
    "github:jspm/nodelibs-domain@0.2.0-alpha": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.2.1"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "map": {
        "path-browserify": "npm:path-browserify@0.0.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "github:rstacruz/nprogress@0.1.6": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.12"
      }
    },
    "github:systemjs/plugin-css@0.1.12": {
      "map": {
        "clean-css": "npm:clean-css@3.1.9",
        "fs": "github:jspm/nodelibs-fs@0.1.2",
        "path": "github:jspm/nodelibs-path@0.1.0"
      }
    },
    "github:twbs/bootstrap@3.3.5": {
      "map": {
        "jquery": "github:components/jquery@2.1.3"
      }
    },
    "github:twilio/BankersBox@0.1.0": {
      "main": "bankersbox"
    },
    "github:willow/intravenous@master": {
      "map": {}
    },
    "npm:amdefine@1.0.0": {
      "map": {}
    },
    "npm:asap@2.0.3": {
      "map": {}
    },
    "npm:babel-code-frame@6.7.4": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "chalk": "npm:chalk@1.1.3",
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@1.0.3",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-helper-builder-react-jsx@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-messages@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-jsx@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-react-jsx@6.7.4": {
      "map": {
        "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.6.5",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-runtime@5.8.25": {
      "map": {}
    },
    "npm:babel-runtime@5.8.38": {
      "map": {}
    },
    "npm:babel-traverse@6.7.4": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.7.4",
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "debug": "npm:debug@2.2.0",
        "globals": "npm:globals@8.18.0",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@3.10.1",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-types@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1",
        "to-fast-properties": "npm:to-fast-properties@1.0.2"
      }
    },
    "npm:babylon@6.7.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:baconjs@0.7.74": {
      "map": {}
    },
    "npm:buffer@4.5.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:clean-css@3.1.9": {
      "map": {
        "commander": "npm:commander@2.6.0",
        "source-map": "npm:source-map@0.1.43"
      }
    },
    "npm:clean-css@3.4.6": {
      "map": {
        "commander": "npm:commander@2.8.1",
        "source-map": "npm:source-map@0.4.4"
      }
    },
    "npm:commander@2.6.0": {
      "map": {}
    },
    "npm:commander@2.8.1": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:domain-browser@1.1.7": {
      "map": {}
    },
    "npm:dropzone@4.0.1": {
      "map": {}
    },
    "npm:envify@3.4.0": {
      "map": {
        "jstransform": "npm:jstransform@10.1.0",
        "through": "npm:through@2.3.8"
      }
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "map": {}
    },
    "npm:fbjs@0.3.2": {
      "map": {
        "core-js": "npm:core-js@1.2.6",
        "loose-envify": "npm:loose-envify@1.1.0",
        "promise": "npm:promise@7.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.10",
        "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
      }
    },
    "npm:graceful-readlink@1.0.1": {
      "map": {}
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:history@1.17.0": {
      "map": {
        "deep-equal": "npm:deep-equal@1.0.1",
        "invariant": "npm:invariant@2.2.1",
        "query-string": "npm:query-string@3.0.0",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    },
    "npm:is-finite@1.0.1": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:jstransform@10.1.0": {
      "map": {
        "base62": "npm:base62@0.1.1",
        "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
        "source-map": "npm:source-map@0.1.31"
      }
    },
    "npm:lodash-compat@3.10.1": {
      "map": {}
    },
    "npm:lodash@3.10.1": {
      "map": {}
    },
    "npm:lodash@4.6.1": {
      "map": {}
    },
    "npm:loglevel@1.3.1": {
      "map": {}
    },
    "npm:loose-envify@1.1.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:moment@2.10.6": {
      "map": {}
    },
    "npm:path-browserify@0.0.0": {
      "map": {}
    },
    "npm:process-nextick-args@1.0.6": {
      "map": {}
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.3"
      }
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:query-string@3.0.0": {
      "map": {
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:react-bacon@0.0.4": {
      "map": {
        "baconjs": "npm:baconjs@0.7.74"
      }
    },
    "npm:react-bootstrap@0.28.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "classnames": "npm:classnames@2.2.3",
        "dom-helpers": "npm:dom-helpers@2.4.0",
        "invariant": "npm:invariant@2.2.1",
        "keycode": "npm:keycode@2.1.0",
        "lodash-compat": "npm:lodash-compat@3.10.1",
        "react": "npm:react@0.14.3",
        "react-dom": "npm:react-dom@0.14.3",
        "react-overlays": "npm:react-overlays@0.5.4",
        "react-prop-types": "npm:react-prop-types@0.3.0",
        "uncontrollable": "npm:uncontrollable@3.2.1",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:react-datepicker@0.19.0": {
      "map": {
        "classnames": "npm:classnames@2.2.3",
        "lodash": "npm:lodash@3.10.1",
        "moment": "npm:moment@2.10.6",
        "react": "npm:react@0.14.3",
        "react-onclickoutside": "npm:react-onclickoutside@4.5.0",
        "tether": "npm:tether@1.1.1"
      }
    },
    "npm:react-dom@0.14.3": {
      "map": {
        "react": "npm:react@0.14.3"
      }
    },
    "npm:react-highlighter@0.3.0": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "react": "npm:react@0.14.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:react-input-autosize@0.6.8": {
      "map": {
        "react": "npm:react@0.14.3"
      }
    },
    "npm:react-lazy-cache@3.0.1": {
      "map": {
        "deep-equal": "npm:deep-equal@1.0.1"
      }
    },
    "npm:react-onclickoutside@4.5.0": {
      "map": {}
    },
    "npm:react-overlays@0.5.4": {
      "map": {
        "classnames": "npm:classnames@2.2.3",
        "dom-helpers": "npm:dom-helpers@2.4.0",
        "react": "npm:react@0.14.3",
        "react-dom": "npm:react-dom@0.14.3",
        "react-prop-types": "npm:react-prop-types@0.2.2",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:react-prop-types@0.2.2": {
      "map": {
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:react-prop-types@0.3.0": {
      "map": {
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:react-redux@4.4.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.5",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@4.6.1",
        "loose-envify": "npm:loose-envify@1.1.0",
        "react": "npm:react@0.14.3",
        "redux": "npm:redux@3.0.2"
      }
    },
    "npm:react-router@1.0.3": {
      "map": {
        "history": "npm:history@1.17.0",
        "invariant": "npm:invariant@2.2.1",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:react-select@0.9.1": {
      "map": {
        "classnames": "npm:classnames@2.2.3",
        "react": "npm:react@0.14.3",
        "react-dom": "npm:react-dom@0.14.3",
        "react-input-autosize": "npm:react-input-autosize@0.6.8"
      }
    },
    "npm:react@0.14.3": {
      "map": {
        "envify": "npm:envify@3.4.0",
        "fbjs": "npm:fbjs@0.3.2"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.6",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:redux-form@4.2.2": {
      "map": {
        "deep-equal": "npm:deep-equal@1.0.1",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.5",
        "is-promise": "npm:is-promise@2.1.0",
        "react-lazy-cache": "npm:react-lazy-cache@3.0.1",
        "react-redux": "npm:react-redux@4.4.1",
        "redux": "npm:redux@3.0.2"
      }
    },
    "npm:redux@3.0.2": {
      "map": {}
    },
    "npm:repeating@1.1.3": {
      "map": {
        "is-finite": "npm:is-finite@1.0.1"
      }
    },
    "npm:source-map@0.1.31": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:source-map@0.1.43": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:stream-http@2.2.1": {
      "map": {
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "inherits": "npm:inherits@2.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:tcomb@2.5.1": {
      "map": {}
    },
    "npm:tether@1.1.1": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:through@2.3.8": {
      "map": {}
    },
    "npm:ua-parser-js@0.7.10": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:uncontrollable@3.2.1": {
      "map": {
        "invariant": "npm:invariant@2.2.1",
        "react": "npm:react@0.14.3"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:util-deprecate@1.0.2": {
      "map": {}
    },
    "npm:warning@2.1.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    }
  }
});
