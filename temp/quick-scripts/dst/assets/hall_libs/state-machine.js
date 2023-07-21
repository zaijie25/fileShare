
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_libs/state-machine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8b7fuYA1NLyLAfSPmW0xTI', 'state-machine');
// hall_libs/state-machine.js

"use strict";

(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("StateMachine", [], factory);else if (typeof exports === 'object') exports["StateMachine"] = factory();else root["StateMachine"] = factory();
})(void 0, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // identity function for calling harmony imports with the correct context

      /******/

      __webpack_require__.i = function (value) {
        return value;
      };
      /******/

      /******/
      // define getter function for harmony exports

      /******/


      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            /******/
            configurable: false,

            /******/
            enumerable: true,

            /******/
            get: getter
            /******/

          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 5);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      module.exports = function (target, sources) {
        var n, source, key;

        for (n = 1; n < arguments.length; n++) {
          source = arguments[n];

          for (key in source) {
            if (source.hasOwnProperty(key)) target[key] = source[key];
          }
        }

        return target;
      };
      /***/

    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      var mixin = __webpack_require__(0); //-------------------------------------------------------------------------------------------------


      module.exports = {
        build: function build(target, config) {
          var n,
              max,
              plugin,
              plugins = config.plugins;

          for (n = 0, max = plugins.length; n < max; n++) {
            plugin = plugins[n];
            if (plugin.methods) mixin(target, plugin.methods);
            if (plugin.properties) Object.defineProperties(target, plugin.properties);
          }
        },
        hook: function hook(fsm, name, additional) {
          var n,
              max,
              method,
              plugin,
              plugins = fsm.config.plugins,
              args = [fsm.context];
          if (additional) args = args.concat(additional);

          for (n = 0, max = plugins.length; n < max; n++) {
            plugin = plugins[n];
            method = plugins[n][name];
            if (method) method.apply(plugin, args);
          }
        }
      }; //-------------------------------------------------------------------------------------------------

      /***/
    },
    /* 2 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      function camelize(label) {
        if (label.length === 0) return label;
        var n,
            result,
            word,
            words = label.split(/[_-]/); // single word with first character already lowercase, return untouched

        if (words.length === 1 && words[0][0].toLowerCase() === words[0][0]) return label;
        result = words[0].toLowerCase();

        for (n = 1; n < words.length; n++) {
          result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
        }

        return result;
      } //-------------------------------------------------------------------------------------------------


      camelize.prepended = function (prepend, label) {
        label = camelize(label);
        return prepend + label[0].toUpperCase() + label.substring(1);
      }; //-------------------------------------------------------------------------------------------------


      module.exports = camelize;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      var mixin = __webpack_require__(0),
          camelize = __webpack_require__(2); //-------------------------------------------------------------------------------------------------


      function Config(options, StateMachine) {
        options = options || {};
        this.options = options; // preserving original options can be useful (e.g visualize plugin)

        this.defaults = StateMachine.defaults;
        this.states = [];
        this.transitions = [];
        this.map = {};
        this.lifecycle = this.configureLifecycle();
        this.init = this.configureInitTransition(options.init);
        this.data = this.configureData(options.data);
        this.methods = this.configureMethods(options.methods);
        this.map[this.defaults.wildcard] = {};
        this.configureTransitions(options.transitions || []);
        this.plugins = this.configurePlugins(options.plugins, StateMachine.plugin);
      } //-------------------------------------------------------------------------------------------------


      mixin(Config.prototype, {
        addState: function addState(name) {
          if (!this.map[name]) {
            this.states.push(name);
            this.addStateLifecycleNames(name);
            this.map[name] = {};
          }
        },
        addStateLifecycleNames: function addStateLifecycleNames(name) {
          this.lifecycle.onEnter[name] = camelize.prepended('onEnter', name);
          this.lifecycle.onLeave[name] = camelize.prepended('onLeave', name);
          this.lifecycle.on[name] = camelize.prepended('on', name);
        },
        addTransition: function addTransition(name) {
          if (this.transitions.indexOf(name) < 0) {
            this.transitions.push(name);
            this.addTransitionLifecycleNames(name);
          }
        },
        addTransitionLifecycleNames: function addTransitionLifecycleNames(name) {
          this.lifecycle.onBefore[name] = camelize.prepended('onBefore', name);
          this.lifecycle.onAfter[name] = camelize.prepended('onAfter', name);
          this.lifecycle.on[name] = camelize.prepended('on', name);
        },
        mapTransition: function mapTransition(transition) {
          var name = transition.name,
              from = transition.from,
              to = transition.to;
          this.addState(from);
          if (typeof to !== 'function') this.addState(to);
          this.addTransition(name);
          this.map[from][name] = transition;
          return transition;
        },
        configureLifecycle: function configureLifecycle() {
          return {
            onBefore: {
              transition: 'onBeforeTransition'
            },
            onAfter: {
              transition: 'onAfterTransition'
            },
            onEnter: {
              state: 'onEnterState'
            },
            onLeave: {
              state: 'onLeaveState'
            },
            on: {
              transition: 'onTransition'
            }
          };
        },
        configureInitTransition: function configureInitTransition(init) {
          if (typeof init === 'string') {
            return this.mapTransition(mixin({}, this.defaults.init, {
              to: init,
              active: true
            }));
          } else if (typeof init === 'object') {
            return this.mapTransition(mixin({}, this.defaults.init, init, {
              active: true
            }));
          } else {
            this.addState(this.defaults.init.from);
            return this.defaults.init;
          }
        },
        configureData: function configureData(data) {
          if (typeof data === 'function') return data;else if (typeof data === 'object') return function () {
            return data;
          };else return function () {
            return {};
          };
        },
        configureMethods: function configureMethods(methods) {
          return methods || {};
        },
        configurePlugins: function configurePlugins(plugins, builtin) {
          plugins = plugins || [];
          var n, max, plugin;

          for (n = 0, max = plugins.length; n < max; n++) {
            plugin = plugins[n];
            if (typeof plugin === 'function') plugins[n] = plugin = plugin();
            if (plugin.configure) plugin.configure(this);
          }

          return plugins;
        },
        configureTransitions: function configureTransitions(transitions) {
          var i,
              n,
              transition,
              from,
              to,
              wildcard = this.defaults.wildcard;

          for (n = 0; n < transitions.length; n++) {
            transition = transitions[n];
            from = Array.isArray(transition.from) ? transition.from : [transition.from || wildcard];
            to = transition.to || wildcard;

            for (i = 0; i < from.length; i++) {
              this.mapTransition({
                name: transition.name,
                from: from[i],
                to: to
              });
            }
          }
        },
        transitionFor: function transitionFor(state, transition) {
          var wildcard = this.defaults.wildcard;
          return this.map[state][transition] || this.map[wildcard][transition];
        },
        transitionsFor: function transitionsFor(state) {
          var wildcard = this.defaults.wildcard;
          return Object.keys(this.map[state]).concat(Object.keys(this.map[wildcard]));
        },
        allStates: function allStates() {
          return this.states;
        },
        allTransitions: function allTransitions() {
          return this.transitions;
        }
      }); //-------------------------------------------------------------------------------------------------

      module.exports = Config; //-------------------------------------------------------------------------------------------------

      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      var mixin = __webpack_require__(0),
          Exception = __webpack_require__(6),
          plugin = __webpack_require__(1),
          UNOBSERVED = [null, []]; //-------------------------------------------------------------------------------------------------


      function JSM(context, config) {
        this.context = context;
        this.config = config;
        this.state = config.init.from;
        this.observers = [context];
      } //-------------------------------------------------------------------------------------------------


      mixin(JSM.prototype, {
        init: function init(args) {
          mixin(this.context, this.config.data.apply(this.context, args));
          plugin.hook(this, 'init');
          if (this.config.init.active) return this.fire(this.config.init.name, []);
        },
        is: function is(state) {
          return Array.isArray(state) ? state.indexOf(this.state) >= 0 : this.state === state;
        },
        isPending: function isPending() {
          return this.pending;
        },
        can: function can(transition) {
          return !this.isPending() && !!this.seek(transition);
        },
        cannot: function cannot(transition) {
          return !this.can(transition);
        },
        allStates: function allStates() {
          return this.config.allStates();
        },
        allTransitions: function allTransitions() {
          return this.config.allTransitions();
        },
        transitions: function transitions() {
          return this.config.transitionsFor(this.state);
        },
        seek: function seek(transition, args) {
          var wildcard = this.config.defaults.wildcard,
              entry = this.config.transitionFor(this.state, transition),
              to = entry && entry.to;
          if (typeof to === 'function') return to.apply(this.context, args);else if (to === wildcard) return this.state;else return to;
        },
        fire: function fire(transition, args) {
          return this.transit(transition, this.state, this.seek(transition, args), args);
        },
        transit: function transit(transition, from, to, args) {
          var lifecycle = this.config.lifecycle,
              changed = this.config.options.observeUnchangedState || from !== to;
          if (!to) return this.context.onInvalidTransition(transition, from, to);
          if (this.isPending()) return this.context.onPendingTransition(transition, from, to);
          this.config.addState(to); // might need to add this state if it's unknown (e.g. conditional transition or goto)

          this.beginTransit();
          args.unshift({
            // this context will be passed to each lifecycle event observer
            transition: transition,
            from: from,
            to: to,
            fsm: this.context
          });
          return this.observeEvents([this.observersForEvent(lifecycle.onBefore.transition), this.observersForEvent(lifecycle.onBefore[transition]), changed ? this.observersForEvent(lifecycle.onLeave.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onLeave[from]) : UNOBSERVED, this.observersForEvent(lifecycle.on.transition), changed ? ['doTransit', [this]] : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter[to]) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.on[to]) : UNOBSERVED, this.observersForEvent(lifecycle.onAfter.transition), this.observersForEvent(lifecycle.onAfter[transition]), this.observersForEvent(lifecycle.on[transition])], args);
        },
        beginTransit: function beginTransit() {
          this.pending = true;
        },
        endTransit: function endTransit(result) {
          this.pending = false;
          return result;
        },
        failTransit: function failTransit(result) {
          this.pending = false;
          throw result;
        },
        doTransit: function doTransit(lifecycle) {
          this.state = lifecycle.to;
        },
        observe: function observe(args) {
          if (args.length === 2) {
            var observer = {};
            observer[args[0]] = args[1];
            this.observers.push(observer);
          } else {
            this.observers.push(args[0]);
          }
        },
        observersForEvent: function observersForEvent(event) {
          // TODO: this could be cached
          var n = 0,
              max = this.observers.length,
              observer,
              result = [];

          for (; n < max; n++) {
            observer = this.observers[n];
            if (observer[event]) result.push(observer);
          }

          return [event, result, true];
        },
        observeEvents: function observeEvents(events, args, previousEvent, previousResult) {
          if (events.length === 0) {
            return this.endTransit(previousResult === undefined ? true : previousResult);
          }

          var event = events[0][0],
              observers = events[0][1],
              pluggable = events[0][2];
          args[0].event = event;
          if (event && pluggable && event !== previousEvent) plugin.hook(this, 'lifecycle', args);

          if (observers.length === 0) {
            events.shift();
            return this.observeEvents(events, args, event, previousResult);
          } else {
            var observer = observers.shift(),
                result = observer[event].apply(observer, args);

            if (result && typeof result.then === 'function') {
              return result.then(this.observeEvents.bind(this, events, args, event))["catch"](this.failTransit.bind(this));
            } else if (result === false) {
              return this.endTransit(false);
            } else {
              return this.observeEvents(events, args, event, result);
            }
          }
        },
        onInvalidTransition: function onInvalidTransition(transition, from, to) {
          throw new Exception("transition is invalid in current state", transition, from, to, this.state);
        },
        onPendingTransition: function onPendingTransition(transition, from, to) {
          throw new Exception("transition is invalid while previous transition is still in progress", transition, from, to, this.state);
        }
      }); //-------------------------------------------------------------------------------------------------

      module.exports = JSM; //-------------------------------------------------------------------------------------------------

      /***/
    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-----------------------------------------------------------------------------------------------

      var mixin = __webpack_require__(0),
          camelize = __webpack_require__(2),
          plugin = __webpack_require__(1),
          Config = __webpack_require__(3),
          JSM = __webpack_require__(4); //-----------------------------------------------------------------------------------------------


      var PublicMethods = {
        is: function is(state) {
          return this._fsm.is(state);
        },
        can: function can(transition) {
          return this._fsm.can(transition);
        },
        cannot: function cannot(transition) {
          return this._fsm.cannot(transition);
        },
        observe: function observe() {
          return this._fsm.observe(arguments);
        },
        transitions: function transitions() {
          return this._fsm.transitions();
        },
        allTransitions: function allTransitions() {
          return this._fsm.allTransitions();
        },
        allStates: function allStates() {
          return this._fsm.allStates();
        },
        onInvalidTransition: function onInvalidTransition(t, from, to) {
          return this._fsm.onInvalidTransition(t, from, to);
        },
        onPendingTransition: function onPendingTransition(t, from, to) {
          return this._fsm.onPendingTransition(t, from, to);
        }
      };
      var PublicProperties = {
        state: {
          configurable: false,
          enumerable: true,
          get: function get() {
            return this._fsm.state;
          },
          set: function set(state) {
            throw Error('use transitions to change state');
          }
        }
      }; //-----------------------------------------------------------------------------------------------

      function StateMachine(options) {
        return apply(this || {}, options);
      }

      function factory() {
        var cstor, options;

        if (typeof arguments[0] === 'function') {
          cstor = arguments[0];
          options = arguments[1] || {};
        } else {
          cstor = function cstor() {
            this._fsm.apply(this, arguments);
          };

          options = arguments[0] || {};
        }

        var config = new Config(options, StateMachine);
        build(cstor.prototype, config);
        cstor.prototype._fsm.config = config; // convenience access to shared config without needing an instance

        return cstor;
      } //-------------------------------------------------------------------------------------------------


      function apply(instance, options) {
        var config = new Config(options, StateMachine);
        build(instance, config);

        instance._fsm();

        return instance;
      }

      function build(target, config) {
        if (typeof target !== 'object' || Array.isArray(target)) throw Error('StateMachine can only be applied to objects');
        plugin.build(target, config);
        Object.defineProperties(target, PublicProperties);
        mixin(target, PublicMethods);
        mixin(target, config.methods);
        config.allTransitions().forEach(function (transition) {
          target[camelize(transition)] = function () {
            return this._fsm.fire(transition, [].slice.call(arguments));
          };
        });

        target._fsm = function () {
          this._fsm = new JSM(this, config);

          this._fsm.init(arguments);
        };
      } //-----------------------------------------------------------------------------------------------


      StateMachine.version = '3.0.1';
      StateMachine.factory = factory;
      StateMachine.apply = apply;
      StateMachine.defaults = {
        wildcard: '*',
        init: {
          name: 'init',
          from: 'none'
        }
      }; //===============================================================================================

      module.exports = StateMachine;
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      module.exports = function (message, transition, from, to, current) {
        this.message = message;
        this.transition = transition;
        this.from = from;
        this.to = to;
        this.current = current;
      };
      /***/

    }
    /******/
    ])
  );
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9saWJzXFxzdGF0ZS1tYWNoaW5lLmpzIl0sIm5hbWVzIjpbIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpIiwibCIsImNhbGwiLCJtIiwiYyIsInZhbHVlIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibiIsIl9fZXNNb2R1bGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsInRhcmdldCIsInNvdXJjZXMiLCJzb3VyY2UiLCJrZXkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJtaXhpbiIsImJ1aWxkIiwiY29uZmlnIiwibWF4IiwicGx1Z2luIiwicGx1Z2lucyIsIm1ldGhvZHMiLCJwcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydGllcyIsImhvb2siLCJmc20iLCJhZGRpdGlvbmFsIiwibWV0aG9kIiwiYXJncyIsImNvbnRleHQiLCJjb25jYXQiLCJhcHBseSIsImNhbWVsaXplIiwibGFiZWwiLCJyZXN1bHQiLCJ3b3JkIiwid29yZHMiLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJwcmVwZW5kZWQiLCJwcmVwZW5kIiwiQ29uZmlnIiwib3B0aW9ucyIsIlN0YXRlTWFjaGluZSIsImRlZmF1bHRzIiwic3RhdGVzIiwidHJhbnNpdGlvbnMiLCJtYXAiLCJsaWZlY3ljbGUiLCJjb25maWd1cmVMaWZlY3ljbGUiLCJpbml0IiwiY29uZmlndXJlSW5pdFRyYW5zaXRpb24iLCJkYXRhIiwiY29uZmlndXJlRGF0YSIsImNvbmZpZ3VyZU1ldGhvZHMiLCJ3aWxkY2FyZCIsImNvbmZpZ3VyZVRyYW5zaXRpb25zIiwiY29uZmlndXJlUGx1Z2lucyIsImFkZFN0YXRlIiwicHVzaCIsImFkZFN0YXRlTGlmZWN5Y2xlTmFtZXMiLCJvbkVudGVyIiwib25MZWF2ZSIsIm9uIiwiYWRkVHJhbnNpdGlvbiIsImluZGV4T2YiLCJhZGRUcmFuc2l0aW9uTGlmZWN5Y2xlTmFtZXMiLCJvbkJlZm9yZSIsIm9uQWZ0ZXIiLCJtYXBUcmFuc2l0aW9uIiwidHJhbnNpdGlvbiIsImZyb20iLCJ0byIsInN0YXRlIiwiYWN0aXZlIiwiYnVpbHRpbiIsImNvbmZpZ3VyZSIsIkFycmF5IiwiaXNBcnJheSIsInRyYW5zaXRpb25Gb3IiLCJ0cmFuc2l0aW9uc0ZvciIsImtleXMiLCJhbGxTdGF0ZXMiLCJhbGxUcmFuc2l0aW9ucyIsIkV4Y2VwdGlvbiIsIlVOT0JTRVJWRUQiLCJKU00iLCJvYnNlcnZlcnMiLCJmaXJlIiwiaXMiLCJpc1BlbmRpbmciLCJwZW5kaW5nIiwiY2FuIiwic2VlayIsImNhbm5vdCIsImVudHJ5IiwidHJhbnNpdCIsImNoYW5nZWQiLCJvYnNlcnZlVW5jaGFuZ2VkU3RhdGUiLCJvbkludmFsaWRUcmFuc2l0aW9uIiwib25QZW5kaW5nVHJhbnNpdGlvbiIsImJlZ2luVHJhbnNpdCIsInVuc2hpZnQiLCJvYnNlcnZlRXZlbnRzIiwib2JzZXJ2ZXJzRm9yRXZlbnQiLCJlbmRUcmFuc2l0IiwiZmFpbFRyYW5zaXQiLCJkb1RyYW5zaXQiLCJvYnNlcnZlIiwib2JzZXJ2ZXIiLCJldmVudCIsImV2ZW50cyIsInByZXZpb3VzRXZlbnQiLCJwcmV2aW91c1Jlc3VsdCIsInVuZGVmaW5lZCIsInBsdWdnYWJsZSIsInNoaWZ0IiwidGhlbiIsImJpbmQiLCJQdWJsaWNNZXRob2RzIiwiX2ZzbSIsInQiLCJQdWJsaWNQcm9wZXJ0aWVzIiwic2V0IiwiRXJyb3IiLCJj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R0FBaUJzRSxZQUFqQjtBQUdBO0FBQU8sS0E1akJHO0FBNmpCVjs7QUFDQTtBQUFPLGNBQVNyRSxNQUFULEVBQWlCRCxPQUFqQixFQUEwQk0sbUJBQTFCLEVBQStDO0FBRXREOztBQUdBTCxNQUFBQSxNQUFNLENBQUNELE9BQVAsR0FBaUIsVUFBUzZKLE9BQVQsRUFBa0I1RCxVQUFsQixFQUE4QkMsSUFBOUIsRUFBb0NDLEVBQXBDLEVBQXdDMkQsT0FBeEMsRUFBaUQ7QUFDaEUsYUFBS0QsT0FBTCxHQUFrQkEsT0FBbEI7QUFDQSxhQUFLNUQsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxhQUFLQyxJQUFMLEdBQWtCQSxJQUFsQjtBQUNBLGFBQUtDLEVBQUwsR0FBa0JBLEVBQWxCO0FBQ0EsYUFBSzJELE9BQUwsR0FBa0JBLE9BQWxCO0FBQ0QsT0FORDtBQVNBOztBQUFPO0FBQ1A7QUE3a0JVLEtBcEVNO0FBQWhCO0FBa3BCQyxDQTVwQkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XHJcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxyXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XHJcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXHJcblx0XHRkZWZpbmUoXCJTdGF0ZU1hY2hpbmVcIiwgW10sIGZhY3RvcnkpO1xyXG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxyXG5cdFx0ZXhwb3J0c1tcIlN0YXRlTWFjaGluZVwiXSA9IGZhY3RvcnkoKTtcclxuXHRlbHNlXHJcblx0XHRyb290W1wiU3RhdGVNYWNoaW5lXCJdID0gZmFjdG9yeSgpO1xyXG59KSh0aGlzLCBmdW5jdGlvbigpIHtcclxucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcclxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXHJcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxyXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxyXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcclxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxyXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xyXG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcclxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXHJcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XHJcbi8qKioqKiovIFx0XHR9O1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXHJcbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcclxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXHJcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XHJcbi8qKioqKiovIFx0fVxyXG4vKioqKioqL1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXHJcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxyXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxyXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcclxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcclxuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcclxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcclxuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcclxuLyoqKioqKi8gXHRcdFx0fSk7XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0fTtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xyXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XHJcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XHJcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XHJcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XHJcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xyXG4vKioqKioqLyBcdH07XHJcbi8qKioqKiovXHJcbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXHJcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xyXG4vKioqKioqL1xyXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXHJcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcclxuLyoqKioqKi9cclxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcclxuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcclxuLyoqKioqKi8gfSlcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqKioqKi8gKFtcclxuLyogMCAqL1xyXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlcykge1xyXG4gIHZhciBuLCBzb3VyY2UsIGtleTtcclxuICBmb3IobiA9IDEgOyBuIDwgYXJndW1lbnRzLmxlbmd0aCA7IG4rKykge1xyXG4gICAgc291cmNlID0gYXJndW1lbnRzW25dO1xyXG4gICAgZm9yKGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcblxyXG4vKioqLyB9KSxcclxuLyogMSAqL1xyXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbnZhciBtaXhpbiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICBidWlsZDogZnVuY3Rpb24odGFyZ2V0LCBjb25maWcpIHtcclxuICAgIHZhciBuLCBtYXgsIHBsdWdpbiwgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zO1xyXG4gICAgZm9yKG4gPSAwLCBtYXggPSBwbHVnaW5zLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspIHtcclxuICAgICAgcGx1Z2luID0gcGx1Z2luc1tuXTtcclxuICAgICAgaWYgKHBsdWdpbi5tZXRob2RzKVxyXG4gICAgICAgIG1peGluKHRhcmdldCwgcGx1Z2luLm1ldGhvZHMpO1xyXG4gICAgICBpZiAocGx1Z2luLnByb3BlcnRpZXMpXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwbHVnaW4ucHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaG9vazogZnVuY3Rpb24oZnNtLCBuYW1lLCBhZGRpdGlvbmFsKSB7XHJcbiAgICB2YXIgbiwgbWF4LCBtZXRob2QsIHBsdWdpbixcclxuICAgICAgICBwbHVnaW5zID0gZnNtLmNvbmZpZy5wbHVnaW5zLFxyXG4gICAgICAgIGFyZ3MgICAgPSBbZnNtLmNvbnRleHRdO1xyXG5cclxuICAgIGlmIChhZGRpdGlvbmFsKVxyXG4gICAgICBhcmdzID0gYXJncy5jb25jYXQoYWRkaXRpb25hbClcclxuXHJcbiAgICBmb3IobiA9IDAsIG1heCA9IHBsdWdpbnMubGVuZ3RoIDsgbiA8IG1heCA7IG4rKykge1xyXG4gICAgICBwbHVnaW4gPSBwbHVnaW5zW25dXHJcbiAgICAgIG1ldGhvZCA9IHBsdWdpbnNbbl1bbmFtZV1cclxuICAgICAgaWYgKG1ldGhvZClcclxuICAgICAgICBtZXRob2QuYXBwbHkocGx1Z2luLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4vKioqLyB9KSxcclxuLyogMiAqL1xyXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIGNhbWVsaXplKGxhYmVsKSB7XHJcblxyXG4gIGlmIChsYWJlbC5sZW5ndGggPT09IDApXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcblxyXG4gIHZhciBuLCByZXN1bHQsIHdvcmQsIHdvcmRzID0gbGFiZWwuc3BsaXQoL1tfLV0vKTtcclxuXHJcbiAgLy8gc2luZ2xlIHdvcmQgd2l0aCBmaXJzdCBjaGFyYWN0ZXIgYWxyZWFkeSBsb3dlcmNhc2UsIHJldHVybiB1bnRvdWNoZWRcclxuICBpZiAoKHdvcmRzLmxlbmd0aCA9PT0gMSkgJiYgKHdvcmRzWzBdWzBdLnRvTG93ZXJDYXNlKCkgPT09IHdvcmRzWzBdWzBdKSlcclxuICAgIHJldHVybiBsYWJlbDtcclxuXHJcbiAgcmVzdWx0ID0gd29yZHNbMF0udG9Mb3dlckNhc2UoKTtcclxuICBmb3IobiA9IDEgOyBuIDwgd29yZHMubGVuZ3RoIDsgbisrKSB7XHJcbiAgICByZXN1bHQgPSByZXN1bHQgKyB3b3Jkc1tuXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmRzW25dLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5jYW1lbGl6ZS5wcmVwZW5kZWQgPSBmdW5jdGlvbihwcmVwZW5kLCBsYWJlbCkge1xyXG4gIGxhYmVsID0gY2FtZWxpemUobGFiZWwpO1xyXG4gIHJldHVybiBwcmVwZW5kICsgbGFiZWxbMF0udG9VcHBlckNhc2UoKSArIGxhYmVsLnN1YnN0cmluZygxKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsaXplO1xyXG5cclxuXHJcbi8qKiovIH0pLFxyXG4vKiAzICovXHJcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxudmFyIG1peGluICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcclxuICAgIGNhbWVsaXplID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gQ29uZmlnKG9wdGlvbnMsIFN0YXRlTWFjaGluZSkge1xyXG5cclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgdGhpcy5vcHRpb25zICAgICA9IG9wdGlvbnM7IC8vIHByZXNlcnZpbmcgb3JpZ2luYWwgb3B0aW9ucyBjYW4gYmUgdXNlZnVsIChlLmcgdmlzdWFsaXplIHBsdWdpbilcclxuICB0aGlzLmRlZmF1bHRzICAgID0gU3RhdGVNYWNoaW5lLmRlZmF1bHRzO1xyXG4gIHRoaXMuc3RhdGVzICAgICAgPSBbXTtcclxuICB0aGlzLnRyYW5zaXRpb25zID0gW107XHJcbiAgdGhpcy5tYXAgICAgICAgICA9IHt9O1xyXG4gIHRoaXMubGlmZWN5Y2xlICAgPSB0aGlzLmNvbmZpZ3VyZUxpZmVjeWNsZSgpO1xyXG4gIHRoaXMuaW5pdCAgICAgICAgPSB0aGlzLmNvbmZpZ3VyZUluaXRUcmFuc2l0aW9uKG9wdGlvbnMuaW5pdCk7XHJcbiAgdGhpcy5kYXRhICAgICAgICA9IHRoaXMuY29uZmlndXJlRGF0YShvcHRpb25zLmRhdGEpO1xyXG4gIHRoaXMubWV0aG9kcyAgICAgPSB0aGlzLmNvbmZpZ3VyZU1ldGhvZHMob3B0aW9ucy5tZXRob2RzKTtcclxuXHJcbiAgdGhpcy5tYXBbdGhpcy5kZWZhdWx0cy53aWxkY2FyZF0gPSB7fTtcclxuXHJcbiAgdGhpcy5jb25maWd1cmVUcmFuc2l0aW9ucyhvcHRpb25zLnRyYW5zaXRpb25zIHx8IFtdKTtcclxuXHJcbiAgdGhpcy5wbHVnaW5zID0gdGhpcy5jb25maWd1cmVQbHVnaW5zKG9wdGlvbnMucGx1Z2lucywgU3RhdGVNYWNoaW5lLnBsdWdpbik7XHJcblxyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbm1peGluKENvbmZpZy5wcm90b3R5cGUsIHtcclxuXHJcbiAgYWRkU3RhdGU6IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIGlmICghdGhpcy5tYXBbbmFtZV0pIHtcclxuICAgICAgdGhpcy5zdGF0ZXMucHVzaChuYW1lKTtcclxuICAgICAgdGhpcy5hZGRTdGF0ZUxpZmVjeWNsZU5hbWVzKG5hbWUpO1xyXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IHt9O1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFkZFN0YXRlTGlmZWN5Y2xlTmFtZXM6IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHRoaXMubGlmZWN5Y2xlLm9uRW50ZXJbbmFtZV0gPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uRW50ZXInLCBuYW1lKTtcclxuICAgIHRoaXMubGlmZWN5Y2xlLm9uTGVhdmVbbmFtZV0gPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uTGVhdmUnLCBuYW1lKTtcclxuICAgIHRoaXMubGlmZWN5Y2xlLm9uW25hbWVdICAgICAgPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uJywgICAgICBuYW1lKTtcclxuICB9LFxyXG5cclxuICBhZGRUcmFuc2l0aW9uOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICBpZiAodGhpcy50cmFuc2l0aW9ucy5pbmRleE9mKG5hbWUpIDwgMCkge1xyXG4gICAgICB0aGlzLnRyYW5zaXRpb25zLnB1c2gobmFtZSk7XHJcbiAgICAgIHRoaXMuYWRkVHJhbnNpdGlvbkxpZmVjeWNsZU5hbWVzKG5hbWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFkZFRyYW5zaXRpb25MaWZlY3ljbGVOYW1lczogZnVuY3Rpb24obmFtZSkge1xyXG4gICAgdGhpcy5saWZlY3ljbGUub25CZWZvcmVbbmFtZV0gPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uQmVmb3JlJywgbmFtZSk7XHJcbiAgICB0aGlzLmxpZmVjeWNsZS5vbkFmdGVyW25hbWVdICA9IGNhbWVsaXplLnByZXBlbmRlZCgnb25BZnRlcicsICBuYW1lKTtcclxuICAgIHRoaXMubGlmZWN5Y2xlLm9uW25hbWVdICAgICAgID0gY2FtZWxpemUucHJlcGVuZGVkKCdvbicsICAgICAgIG5hbWUpO1xyXG4gIH0sXHJcblxyXG4gIG1hcFRyYW5zaXRpb246IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcclxuICAgIHZhciBuYW1lID0gdHJhbnNpdGlvbi5uYW1lLFxyXG4gICAgICAgIGZyb20gPSB0cmFuc2l0aW9uLmZyb20sXHJcbiAgICAgICAgdG8gICA9IHRyYW5zaXRpb24udG87XHJcbiAgICB0aGlzLmFkZFN0YXRlKGZyb20pO1xyXG4gICAgaWYgKHR5cGVvZiB0byAhPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgdGhpcy5hZGRTdGF0ZSh0byk7XHJcbiAgICB0aGlzLmFkZFRyYW5zaXRpb24obmFtZSk7XHJcbiAgICB0aGlzLm1hcFtmcm9tXVtuYW1lXSA9IHRyYW5zaXRpb247XHJcbiAgICByZXR1cm4gdHJhbnNpdGlvbjtcclxuICB9LFxyXG5cclxuICBjb25maWd1cmVMaWZlY3ljbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb25CZWZvcmU6IHsgdHJhbnNpdGlvbjogJ29uQmVmb3JlVHJhbnNpdGlvbicgfSxcclxuICAgICAgb25BZnRlcjogIHsgdHJhbnNpdGlvbjogJ29uQWZ0ZXJUcmFuc2l0aW9uJyAgfSxcclxuICAgICAgb25FbnRlcjogIHsgc3RhdGU6ICAgICAgJ29uRW50ZXJTdGF0ZScgICAgICAgfSxcclxuICAgICAgb25MZWF2ZTogIHsgc3RhdGU6ICAgICAgJ29uTGVhdmVTdGF0ZScgICAgICAgfSxcclxuICAgICAgb246ICAgICAgIHsgdHJhbnNpdGlvbjogJ29uVHJhbnNpdGlvbicgICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBjb25maWd1cmVJbml0VHJhbnNpdGlvbjogZnVuY3Rpb24oaW5pdCkge1xyXG4gICAgaWYgKHR5cGVvZiBpbml0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tYXBUcmFuc2l0aW9uKG1peGluKHt9LCB0aGlzLmRlZmF1bHRzLmluaXQsIHsgdG86IGluaXQsIGFjdGl2ZTogdHJ1ZSB9KSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgaW5pdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubWFwVHJhbnNpdGlvbihtaXhpbih7fSwgdGhpcy5kZWZhdWx0cy5pbml0LCBpbml0LCB7IGFjdGl2ZTogdHJ1ZSB9KSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hZGRTdGF0ZSh0aGlzLmRlZmF1bHRzLmluaXQuZnJvbSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRzLmluaXQ7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29uZmlndXJlRGF0YTogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JylcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gZGF0YTsgfVxyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiB7fTsgIH1cclxuICB9LFxyXG5cclxuICBjb25maWd1cmVNZXRob2RzOiBmdW5jdGlvbihtZXRob2RzKSB7XHJcbiAgICByZXR1cm4gbWV0aG9kcyB8fCB7fTtcclxuICB9LFxyXG5cclxuICBjb25maWd1cmVQbHVnaW5zOiBmdW5jdGlvbihwbHVnaW5zLCBidWlsdGluKSB7XHJcbiAgICBwbHVnaW5zID0gcGx1Z2lucyB8fCBbXTtcclxuICAgIHZhciBuLCBtYXgsIHBsdWdpbjtcclxuICAgIGZvcihuID0gMCwgbWF4ID0gcGx1Z2lucy5sZW5ndGggOyBuIDwgbWF4IDsgbisrKSB7XHJcbiAgICAgIHBsdWdpbiA9IHBsdWdpbnNbbl07XHJcbiAgICAgIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIHBsdWdpbnNbbl0gPSBwbHVnaW4gPSBwbHVnaW4oKVxyXG4gICAgICBpZiAocGx1Z2luLmNvbmZpZ3VyZSlcclxuICAgICAgICBwbHVnaW4uY29uZmlndXJlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBsdWdpbnNcclxuICB9LFxyXG5cclxuICBjb25maWd1cmVUcmFuc2l0aW9uczogZnVuY3Rpb24odHJhbnNpdGlvbnMpIHtcclxuICAgIHZhciBpLCBuLCB0cmFuc2l0aW9uLCBmcm9tLCB0bywgd2lsZGNhcmQgPSB0aGlzLmRlZmF1bHRzLndpbGRjYXJkO1xyXG4gICAgZm9yKG4gPSAwIDsgbiA8IHRyYW5zaXRpb25zLmxlbmd0aCA7IG4rKykge1xyXG4gICAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbnNbbl07XHJcbiAgICAgIGZyb20gID0gQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uLmZyb20pID8gdHJhbnNpdGlvbi5mcm9tIDogW3RyYW5zaXRpb24uZnJvbSB8fCB3aWxkY2FyZF1cclxuICAgICAgdG8gICAgPSB0cmFuc2l0aW9uLnRvIHx8IHdpbGRjYXJkO1xyXG4gICAgICBmb3IoaSA9IDAgOyBpIDwgZnJvbS5sZW5ndGggOyBpKyspIHtcclxuICAgICAgICB0aGlzLm1hcFRyYW5zaXRpb24oeyBuYW1lOiB0cmFuc2l0aW9uLm5hbWUsIGZyb206IGZyb21baV0sIHRvOiB0byB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHRyYW5zaXRpb25Gb3I6IGZ1bmN0aW9uKHN0YXRlLCB0cmFuc2l0aW9uKSB7XHJcbiAgICB2YXIgd2lsZGNhcmQgPSB0aGlzLmRlZmF1bHRzLndpbGRjYXJkO1xyXG4gICAgcmV0dXJuIHRoaXMubWFwW3N0YXRlXVt0cmFuc2l0aW9uXSB8fFxyXG4gICAgICAgICAgIHRoaXMubWFwW3dpbGRjYXJkXVt0cmFuc2l0aW9uXTtcclxuICB9LFxyXG5cclxuICB0cmFuc2l0aW9uc0ZvcjogZnVuY3Rpb24oc3RhdGUpIHtcclxuICAgIHZhciB3aWxkY2FyZCA9IHRoaXMuZGVmYXVsdHMud2lsZGNhcmQ7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXBbc3RhdGVdKS5jb25jYXQoT2JqZWN0LmtleXModGhpcy5tYXBbd2lsZGNhcmRdKSk7XHJcbiAgfSxcclxuXHJcbiAgYWxsU3RhdGVzOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcztcclxuICB9LFxyXG5cclxuICBhbGxUcmFuc2l0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9ucztcclxuICB9XHJcblxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb25maWc7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4vKioqLyB9KSxcclxuLyogNCAqL1xyXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cclxudmFyIG1peGluICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLFxyXG4gICAgRXhjZXB0aW9uICA9IF9fd2VicGFja19yZXF1aXJlX18oNiksXHJcbiAgICBwbHVnaW4gICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKSxcclxuICAgIFVOT0JTRVJWRUQgPSBbIG51bGwsIFtdIF07XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIEpTTShjb250ZXh0LCBjb25maWcpIHtcclxuICB0aGlzLmNvbnRleHQgICA9IGNvbnRleHQ7XHJcbiAgdGhpcy5jb25maWcgICAgPSBjb25maWc7XHJcbiAgdGhpcy5zdGF0ZSAgICAgPSBjb25maWcuaW5pdC5mcm9tO1xyXG4gIHRoaXMub2JzZXJ2ZXJzID0gW2NvbnRleHRdO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbm1peGluKEpTTS5wcm90b3R5cGUsIHtcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24oYXJncykge1xyXG4gICAgbWl4aW4odGhpcy5jb250ZXh0LCB0aGlzLmNvbmZpZy5kYXRhLmFwcGx5KHRoaXMuY29udGV4dCwgYXJncykpO1xyXG4gICAgcGx1Z2luLmhvb2sodGhpcywgJ2luaXQnKTtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5pbml0LmFjdGl2ZSlcclxuICAgICAgcmV0dXJuIHRoaXMuZmlyZSh0aGlzLmNvbmZpZy5pbml0Lm5hbWUsIFtdKTtcclxuICB9LFxyXG5cclxuICBpczogZnVuY3Rpb24oc3RhdGUpIHtcclxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHN0YXRlKSA/IChzdGF0ZS5pbmRleE9mKHRoaXMuc3RhdGUpID49IDApIDogKHRoaXMuc3RhdGUgPT09IHN0YXRlKTtcclxuICB9LFxyXG5cclxuICBpc1BlbmRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZztcclxuICB9LFxyXG5cclxuICBjYW46IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcclxuICAgIHJldHVybiAhdGhpcy5pc1BlbmRpbmcoKSAmJiAhIXRoaXMuc2Vlayh0cmFuc2l0aW9uKTtcclxuICB9LFxyXG5cclxuICBjYW5ub3Q6IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcclxuICAgIHJldHVybiAhdGhpcy5jYW4odHJhbnNpdGlvbik7XHJcbiAgfSxcclxuXHJcbiAgYWxsU3RhdGVzOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hbGxTdGF0ZXMoKTtcclxuICB9LFxyXG5cclxuICBhbGxUcmFuc2l0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYWxsVHJhbnNpdGlvbnMoKTtcclxuICB9LFxyXG5cclxuICB0cmFuc2l0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNpdGlvbnNGb3IodGhpcy5zdGF0ZSk7XHJcbiAgfSxcclxuXHJcbiAgc2VlazogZnVuY3Rpb24odHJhbnNpdGlvbiwgYXJncykge1xyXG4gICAgdmFyIHdpbGRjYXJkID0gdGhpcy5jb25maWcuZGVmYXVsdHMud2lsZGNhcmQsXHJcbiAgICAgICAgZW50cnkgICAgPSB0aGlzLmNvbmZpZy50cmFuc2l0aW9uRm9yKHRoaXMuc3RhdGUsIHRyYW5zaXRpb24pLFxyXG4gICAgICAgIHRvICAgICAgID0gZW50cnkgJiYgZW50cnkudG87XHJcbiAgICBpZiAodHlwZW9mIHRvID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICByZXR1cm4gdG8uYXBwbHkodGhpcy5jb250ZXh0LCBhcmdzKTtcclxuICAgIGVsc2UgaWYgKHRvID09PSB3aWxkY2FyZClcclxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGVcclxuICAgIGVsc2VcclxuICAgICAgcmV0dXJuIHRvXHJcbiAgfSxcclxuXHJcbiAgZmlyZTogZnVuY3Rpb24odHJhbnNpdGlvbiwgYXJncykge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNpdCh0cmFuc2l0aW9uLCB0aGlzLnN0YXRlLCB0aGlzLnNlZWsodHJhbnNpdGlvbiwgYXJncyksIGFyZ3MpO1xyXG4gIH0sXHJcblxyXG4gIHRyYW5zaXQ6IGZ1bmN0aW9uKHRyYW5zaXRpb24sIGZyb20sIHRvLCBhcmdzKSB7XHJcblxyXG4gICAgdmFyIGxpZmVjeWNsZSA9IHRoaXMuY29uZmlnLmxpZmVjeWNsZSxcclxuICAgICAgICBjaGFuZ2VkICAgPSB0aGlzLmNvbmZpZy5vcHRpb25zLm9ic2VydmVVbmNoYW5nZWRTdGF0ZSB8fCAoZnJvbSAhPT0gdG8pO1xyXG5cclxuICAgIGlmICghdG8pXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQub25JbnZhbGlkVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0byk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNQZW5kaW5nKCkpXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQub25QZW5kaW5nVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0byk7XHJcblxyXG4gICAgdGhpcy5jb25maWcuYWRkU3RhdGUodG8pOyAgLy8gbWlnaHQgbmVlZCB0byBhZGQgdGhpcyBzdGF0ZSBpZiBpdCdzIHVua25vd24gKGUuZy4gY29uZGl0aW9uYWwgdHJhbnNpdGlvbiBvciBnb3RvKVxyXG5cclxuICAgIHRoaXMuYmVnaW5UcmFuc2l0KCk7XHJcblxyXG4gICAgYXJncy51bnNoaWZ0KHsgICAgICAgICAgICAgLy8gdGhpcyBjb250ZXh0IHdpbGwgYmUgcGFzc2VkIHRvIGVhY2ggbGlmZWN5Y2xlIGV2ZW50IG9ic2VydmVyXHJcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24sXHJcbiAgICAgIGZyb206ICAgICAgIGZyb20sXHJcbiAgICAgIHRvOiAgICAgICAgIHRvLFxyXG4gICAgICBmc206ICAgICAgICB0aGlzLmNvbnRleHRcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLm9ic2VydmVFdmVudHMoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25CZWZvcmUudHJhbnNpdGlvbiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkJlZm9yZVt0cmFuc2l0aW9uXSksXHJcbiAgICAgIGNoYW5nZWQgPyB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkxlYXZlLnN0YXRlKSA6IFVOT0JTRVJWRUQsXHJcbiAgICAgIGNoYW5nZWQgPyB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkxlYXZlW2Zyb21dKSA6IFVOT0JTRVJWRUQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbi50cmFuc2l0aW9uKSxcclxuICAgICAgY2hhbmdlZCA/IFsgJ2RvVHJhbnNpdCcsIFsgdGhpcyBdIF0gICAgICAgICAgICAgICAgICAgICAgIDogVU5PQlNFUlZFRCxcclxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uRW50ZXIuc3RhdGUpIDogVU5PQlNFUlZFRCxcclxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uRW50ZXJbdG9dKSAgIDogVU5PQlNFUlZFRCxcclxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uW3RvXSkgICAgICAgIDogVU5PQlNFUlZFRCxcclxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uQWZ0ZXIudHJhbnNpdGlvbiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkFmdGVyW3RyYW5zaXRpb25dKSxcclxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uW3RyYW5zaXRpb25dKVxyXG4gICAgXSwgYXJncyk7XHJcbiAgfSxcclxuXHJcbiAgYmVnaW5UcmFuc2l0OiBmdW5jdGlvbigpICAgICAgICAgIHsgdGhpcy5wZW5kaW5nID0gdHJ1ZTsgICAgICAgICAgICAgICAgIH0sXHJcbiAgZW5kVHJhbnNpdDogICBmdW5jdGlvbihyZXN1bHQpICAgIHsgdGhpcy5wZW5kaW5nID0gZmFsc2U7IHJldHVybiByZXN1bHQ7IH0sXHJcbiAgZmFpbFRyYW5zaXQ6ICBmdW5jdGlvbihyZXN1bHQpICAgIHsgdGhpcy5wZW5kaW5nID0gZmFsc2U7IHRocm93IHJlc3VsdDsgIH0sXHJcbiAgZG9UcmFuc2l0OiAgICBmdW5jdGlvbihsaWZlY3ljbGUpIHsgdGhpcy5zdGF0ZSA9IGxpZmVjeWNsZS50bzsgICAgICAgICAgIH0sXHJcblxyXG4gIG9ic2VydmU6IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICB2YXIgb2JzZXJ2ZXIgPSB7fTtcclxuICAgICAgb2JzZXJ2ZXJbYXJnc1swXV0gPSBhcmdzWzFdO1xyXG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKGFyZ3NbMF0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9ic2VydmVyc0ZvckV2ZW50OiBmdW5jdGlvbihldmVudCkgeyAvLyBUT0RPOiB0aGlzIGNvdWxkIGJlIGNhY2hlZFxyXG4gICAgdmFyIG4gPSAwLCBtYXggPSB0aGlzLm9ic2VydmVycy5sZW5ndGgsIG9ic2VydmVyLCByZXN1bHQgPSBbXTtcclxuICAgIGZvciggOyBuIDwgbWF4IDsgbisrKSB7XHJcbiAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNbbl07XHJcbiAgICAgIGlmIChvYnNlcnZlcltldmVudF0pXHJcbiAgICAgICAgcmVzdWx0LnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFsgZXZlbnQsIHJlc3VsdCwgdHJ1ZSBdXHJcbiAgfSxcclxuXHJcbiAgb2JzZXJ2ZUV2ZW50czogZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBwcmV2aW91c0V2ZW50LCBwcmV2aW91c1Jlc3VsdCkge1xyXG4gICAgaWYgKGV2ZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZW5kVHJhbnNpdChwcmV2aW91c1Jlc3VsdCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHByZXZpb3VzUmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZXZlbnQgICAgID0gZXZlbnRzWzBdWzBdLFxyXG4gICAgICAgIG9ic2VydmVycyA9IGV2ZW50c1swXVsxXSxcclxuICAgICAgICBwbHVnZ2FibGUgPSBldmVudHNbMF1bMl07XHJcblxyXG4gICAgYXJnc1swXS5ldmVudCA9IGV2ZW50O1xyXG4gICAgaWYgKGV2ZW50ICYmIHBsdWdnYWJsZSAmJiBldmVudCAhPT0gcHJldmlvdXNFdmVudClcclxuICAgICAgcGx1Z2luLmhvb2sodGhpcywgJ2xpZmVjeWNsZScsIGFyZ3MpO1xyXG5cclxuICAgIGlmIChvYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGV2ZW50cy5zaGlmdCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5vYnNlcnZlRXZlbnRzKGV2ZW50cywgYXJncywgZXZlbnQsIHByZXZpb3VzUmVzdWx0KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBvYnNlcnZlcnMuc2hpZnQoKSxcclxuICAgICAgICAgIHJlc3VsdCA9IG9ic2VydmVyW2V2ZW50XS5hcHBseShvYnNlcnZlciwgYXJncyk7XHJcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKHRoaXMub2JzZXJ2ZUV2ZW50cy5iaW5kKHRoaXMsIGV2ZW50cywgYXJncywgZXZlbnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5mYWlsVHJhbnNpdC5iaW5kKHRoaXMpKVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmRUcmFuc2l0KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlRXZlbnRzKGV2ZW50cywgYXJncywgZXZlbnQsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBvbkludmFsaWRUcmFuc2l0aW9uOiBmdW5jdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0bykge1xyXG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcInRyYW5zaXRpb24gaXMgaW52YWxpZCBpbiBjdXJyZW50IHN0YXRlXCIsIHRyYW5zaXRpb24sIGZyb20sIHRvLCB0aGlzLnN0YXRlKTtcclxuICB9LFxyXG5cclxuICBvblBlbmRpbmdUcmFuc2l0aW9uOiBmdW5jdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0bykge1xyXG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcInRyYW5zaXRpb24gaXMgaW52YWxpZCB3aGlsZSBwcmV2aW91cyB0cmFuc2l0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzXCIsIHRyYW5zaXRpb24sIGZyb20sIHRvLCB0aGlzLnN0YXRlKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKU007XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4vKioqLyB9KSxcclxuLyogNSAqL1xyXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG52YXIgbWl4aW4gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLFxyXG4gICAgY2FtZWxpemUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLFxyXG4gICAgcGx1Z2luICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxyXG4gICAgQ29uZmlnICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpLFxyXG4gICAgSlNNICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxudmFyIFB1YmxpY01ldGhvZHMgPSB7XHJcbiAgaXM6ICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oc3RhdGUpICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5pcyhzdGF0ZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICBjYW46ICAgICAgICAgICAgICAgICBmdW5jdGlvbih0cmFuc2l0aW9uKSAgeyByZXR1cm4gdGhpcy5fZnNtLmNhbih0cmFuc2l0aW9uKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gIGNhbm5vdDogICAgICAgICAgICAgIGZ1bmN0aW9uKHRyYW5zaXRpb24pICB7IHJldHVybiB0aGlzLl9mc20uY2Fubm90KHRyYW5zaXRpb24pICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgb2JzZXJ2ZTogICAgICAgICAgICAgZnVuY3Rpb24oKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5vYnNlcnZlKGFyZ3VtZW50cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICB0cmFuc2l0aW9uczogICAgICAgICBmdW5jdGlvbigpICAgICAgICAgICAgeyByZXR1cm4gdGhpcy5fZnNtLnRyYW5zaXRpb25zKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gIGFsbFRyYW5zaXRpb25zOiAgICAgIGZ1bmN0aW9uKCkgICAgICAgICAgICB7IHJldHVybiB0aGlzLl9mc20uYWxsVHJhbnNpdGlvbnMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgYWxsU3RhdGVzOiAgICAgICAgICAgZnVuY3Rpb24oKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5hbGxTdGF0ZXMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICBvbkludmFsaWRUcmFuc2l0aW9uOiBmdW5jdGlvbih0LCBmcm9tLCB0bykgeyByZXR1cm4gdGhpcy5fZnNtLm9uSW52YWxpZFRyYW5zaXRpb24odCwgZnJvbSwgdG8pICAgICAgICAgICAgICB9LFxyXG4gIG9uUGVuZGluZ1RyYW5zaXRpb246IGZ1bmN0aW9uKHQsIGZyb20sIHRvKSB7IHJldHVybiB0aGlzLl9mc20ub25QZW5kaW5nVHJhbnNpdGlvbih0LCBmcm9tLCB0bykgICAgICAgICAgICAgIH0sXHJcbn1cclxuXHJcbnZhciBQdWJsaWNQcm9wZXJ0aWVzID0ge1xyXG4gIHN0YXRlOiB7XHJcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgZW51bWVyYWJsZTogICB0cnVlLFxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2ZzbS5zdGF0ZTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCd1c2UgdHJhbnNpdGlvbnMgdG8gY2hhbmdlIHN0YXRlJylcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIFN0YXRlTWFjaGluZShvcHRpb25zKSB7XHJcbiAgcmV0dXJuIGFwcGx5KHRoaXMgfHwge30sIG9wdGlvbnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmYWN0b3J5KCkge1xyXG4gIHZhciBjc3Rvciwgb3B0aW9ucztcclxuICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgY3N0b3IgICA9IGFyZ3VtZW50c1swXTtcclxuICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gfHwge307XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgY3N0b3IgICA9IGZ1bmN0aW9uKCkgeyB0aGlzLl9mc20uYXBwbHkodGhpcywgYXJndW1lbnRzKSB9O1xyXG4gICAgb3B0aW9ucyA9IGFyZ3VtZW50c1swXSB8fCB7fTtcclxuICB9XHJcbiAgdmFyIGNvbmZpZyA9IG5ldyBDb25maWcob3B0aW9ucywgU3RhdGVNYWNoaW5lKTtcclxuICBidWlsZChjc3Rvci5wcm90b3R5cGUsIGNvbmZpZyk7XHJcbiAgY3N0b3IucHJvdG90eXBlLl9mc20uY29uZmlnID0gY29uZmlnOyAvLyBjb252ZW5pZW5jZSBhY2Nlc3MgdG8gc2hhcmVkIGNvbmZpZyB3aXRob3V0IG5lZWRpbmcgYW4gaW5zdGFuY2VcclxuICByZXR1cm4gY3N0b3I7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gYXBwbHkoaW5zdGFuY2UsIG9wdGlvbnMpIHtcclxuICB2YXIgY29uZmlnID0gbmV3IENvbmZpZyhvcHRpb25zLCBTdGF0ZU1hY2hpbmUpO1xyXG4gIGJ1aWxkKGluc3RhbmNlLCBjb25maWcpO1xyXG4gIGluc3RhbmNlLl9mc20oKTtcclxuICByZXR1cm4gaW5zdGFuY2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkKHRhcmdldCwgY29uZmlnKSB7XHJcbiAgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JykgfHwgQXJyYXkuaXNBcnJheSh0YXJnZXQpKVxyXG4gICAgdGhyb3cgRXJyb3IoJ1N0YXRlTWFjaGluZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIG9iamVjdHMnKTtcclxuICBwbHVnaW4uYnVpbGQodGFyZ2V0LCBjb25maWcpO1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgUHVibGljUHJvcGVydGllcyk7XHJcbiAgbWl4aW4odGFyZ2V0LCBQdWJsaWNNZXRob2RzKTtcclxuICBtaXhpbih0YXJnZXQsIGNvbmZpZy5tZXRob2RzKTtcclxuICBjb25maWcuYWxsVHJhbnNpdGlvbnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcclxuICAgIHRhcmdldFtjYW1lbGl6ZSh0cmFuc2l0aW9uKV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2ZzbS5maXJlKHRyYW5zaXRpb24sIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSlcclxuICAgIH1cclxuICB9KTtcclxuICB0YXJnZXQuX2ZzbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fZnNtID0gbmV3IEpTTSh0aGlzLCBjb25maWcpO1xyXG4gICAgdGhpcy5fZnNtLmluaXQoYXJndW1lbnRzKTtcclxuICB9XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblN0YXRlTWFjaGluZS52ZXJzaW9uICA9ICczLjAuMSc7XHJcblN0YXRlTWFjaGluZS5mYWN0b3J5ICA9IGZhY3Rvcnk7XHJcblN0YXRlTWFjaGluZS5hcHBseSAgICA9IGFwcGx5O1xyXG5TdGF0ZU1hY2hpbmUuZGVmYXVsdHMgPSB7XHJcbiAgd2lsZGNhcmQ6ICcqJyxcclxuICBpbml0OiB7XHJcbiAgICBuYW1lOiAnaW5pdCcsXHJcbiAgICBmcm9tOiAnbm9uZSdcclxuICB9XHJcbn1cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNYWNoaW5lO1xyXG5cclxuXHJcbi8qKiovIH0pLFxyXG4vKiA2ICovXHJcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWVzc2FnZSwgdHJhbnNpdGlvbiwgZnJvbSwgdG8sIGN1cnJlbnQpIHtcclxuICB0aGlzLm1lc3NhZ2UgICAgPSBtZXNzYWdlO1xyXG4gIHRoaXMudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XHJcbiAgdGhpcy5mcm9tICAgICAgID0gZnJvbTtcclxuICB0aGlzLnRvICAgICAgICAgPSB0bztcclxuICB0aGlzLmN1cnJlbnQgICAgPSBjdXJyZW50O1xyXG59XHJcblxyXG5cclxuLyoqKi8gfSlcclxuLyoqKioqKi8gXSk7XHJcbn0pOyJdfQ==