
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/underscore.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fe6bvK/4dKDYmOBtzjivAw', 'underscore');
// hall/scripts/framework/libs/underscore.js

"use strict";

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
  // Baseline setup
  // --------------
  // @krisirk
  // Establish the root object, `window` in the browser, or `exports` on the server.
  // var root = this;
  var root = exports; // Save the previous value of the `_` variable.

  var previousUnderscore = root._; // Save bytes in the minified (but not gzipped) version:

  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      FuncProto = Function.prototype; // Create quick reference variables for speed access to core prototypes.

  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty; // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.

  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind,
      nativeCreate = Object.create; // Naked function reference for surrogate-prototype-swapping.

  var Ctor = function Ctor() {}; // Create a safe reference to the Underscore object for use below.


  var _ = function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }; // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  // if (typeof exports !== 'undefined') {
  //   if (typeof module !== 'undefined' && module.exports) {
  //     exports = module.exports = _;
  //   }
  //   exports._ = _;
  // } else {
  //   root._ = _;
  // }
  // @krisirk


  module.exports = _; // if(typeof(window) != "undefined") {
  //   window._ = _;
  // }
  // Current version.

  _.VERSION = '1.8.3'; // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.

  var optimizeCb = function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;

    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };

      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };

      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };

      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }

    return function () {
      return func.apply(context, arguments);
    };
  }; // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.


  var cb = function cb(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };

  _.iteratee = function (value, context) {
    return cb(value, context, Infinity);
  }; // An internal function for creating assigner functions.


  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
    return function (obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;

      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;

        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }

      return obj;
    };
  }; // An internal function for creating a new object that inherits from another.


  var baseCreate = function baseCreate(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result;
  };

  var property = function property(key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key];
    };
  }; // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094


  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');

  var isArrayLike = function isArrayLike(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  }; // Collection Functions
  // --------------------
  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.


  _.each = _.forEach = function (obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;

    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);

      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }

    return obj;
  }; // Return the results of applying the iteratee to each element.


  _.map = _.collect = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }

    return results;
  }; // Create a reducing function iterating left or right.


  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }

      return memo;
    }

    return function (obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);

      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1; // Determine the initial value if none is provided.


      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }

      return iterator(obj, iteratee, memo, keys, index, length);
    };
  } // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.


  _.reduce = _.foldl = _.inject = createReduce(1); // The right-associative version of reduce, also known as `foldr`.

  _.reduceRight = _.foldr = createReduce(-1); // Return the first value which passes a truth test. Aliased as `detect`.

  _.find = _.detect = function (obj, predicate, context) {
    var key;

    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }

    if (key !== void 0 && key !== -1) return obj[key];
  }; // Return all the elements that pass a truth test.
  // Aliased as `select`.


  _.filter = _.select = function (obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);

    _.each(obj, function (value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });

    return results;
  }; // Return all the elements for which a truth test fails.


  _.reject = function (obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  }; // Determine whether all of the elements match a truth test.
  // Aliased as `all`.


  _.every = _.all = function (obj, predicate, context) {
    predicate = cb(predicate, context);

    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }

    return true;
  }; // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.


  _.some = _.any = function (obj, predicate, context) {
    predicate = cb(predicate, context);

    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }

    return false;
  }; // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.


  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  }; // Invoke a method (with arguments) on every item in a collection.


  _.invoke = function (obj, method) {
    var args = slice.call(arguments, 2);

    var isFunc = _.isFunction(method);

    return _.map(obj, function (value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  }; // Convenience version of a common use case of `map`: fetching a property.


  _.pluck = function (obj, key) {
    return _.map(obj, _.property(key));
  }; // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.


  _.where = function (obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  }; // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.


  _.findWhere = function (obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  }; // Return the maximum element (or element-based computation).


  _.max = function (obj, iteratee, context) {
    var result = -Infinity,
        lastComputed = -Infinity,
        value,
        computed;

    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);

      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];

        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);

      _.each(obj, function (value, index, list) {
        computed = iteratee(value, index, list);

        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }

    return result;
  }; // Return the minimum element (or element-based computation).


  _.min = function (obj, iteratee, context) {
    var result = Infinity,
        lastComputed = Infinity,
        value,
        computed;

    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);

      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];

        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);

      _.each(obj, function (value, index, list) {
        computed = iteratee(value, index, list);

        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }

    return result;
  }; // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).


  _.shuffle = function (obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);

    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }

    return shuffled;
  }; // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.


  _.sample = function (obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }

    return _.shuffle(obj).slice(0, Math.max(0, n));
  }; // Sort the object's values by a criterion produced by an iteratee.


  _.sortBy = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function (value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function (left, right) {
      var a = left.criteria;
      var b = right.criteria;

      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }

      return left.index - right.index;
    }), 'value');
  }; // An internal function used for aggregate "group by" operations.


  var group = function group(behavior) {
    return function (obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);

      _.each(obj, function (value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });

      return result;
    };
  }; // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.


  _.groupBy = group(function (result, value, key) {
    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
  }); // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.

  _.indexBy = group(function (result, value, key) {
    result[key] = value;
  }); // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.

  _.countBy = group(function (result, value, key) {
    if (_.has(result, key)) result[key]++;else result[key] = 1;
  }); // Safely create a real, live array from anything iterable.

  _.toArray = function (obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  }; // Return the number of elements in an object.


  _.size = function (obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  }; // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.


  _.partition = function (obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [],
        fail = [];

    _.each(obj, function (value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });

    return [pass, fail];
  }; // Array Functions
  // ---------------
  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.


  _.first = _.head = _.take = function (array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  }; // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.


  _.initial = function (array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }; // Get the last element of an array. Passing **n** will return the last N
  // values in the array.


  _.last = function (array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  }; // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.


  _.rest = _.tail = _.drop = function (array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }; // Trim out all falsy values from an array.


  _.compact = function (array) {
    return _.filter(array, _.identity);
  }; // Internal implementation of a recursive `flatten` function.


  var flatten = function flatten(input, shallow, strict, startIndex) {
    var output = [],
        idx = 0;

    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];

      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0,
            len = value.length;
        output.length += len;

        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }

    return output;
  }; // Flatten out an array, either recursively (by default), or just one level.


  _.flatten = function (array, shallow) {
    return flatten(array, shallow, false);
  }; // Return a version of the array that does not contain the specified value(s).


  _.without = function (array) {
    return _.difference(array, slice.call(arguments, 1));
  }; // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.


  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }

    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];

    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;

      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }

    return result;
  }; // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.


  _.union = function () {
    return _.uniq(flatten(arguments, true, true));
  }; // Produce an array that contains every item shared between all the
  // passed-in arrays.


  _.intersection = function (array) {
    var result = [];
    var argsLength = arguments.length;

    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;

      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }

      if (j === argsLength) result.push(item);
    }

    return result;
  }; // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.


  _.difference = function (array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function (value) {
      return !_.contains(rest, value);
    });
  }; // Zip together multiple lists into a single array -- elements that share
  // an index go together.


  _.zip = function () {
    return _.unzip(arguments);
  }; // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices


  _.unzip = function (array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }

    return result;
  }; // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.


  _.object = function (list, values) {
    var result = {};

    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }

    return result;
  }; // Generator function to create the findIndex and findLastIndex functions


  function createPredicateIndexFinder(dir) {
    return function (array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;

      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }

      return -1;
    };
  } // Returns the first index on an array-like that passes a predicate test


  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1); // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.

  _.sortedIndex = function (array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0,
        high = getLength(array);

    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
    }

    return low;
  }; // Generator function to create the indexOf and lastIndexOf functions


  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function (array, item, idx) {
      var i = 0,
          length = getLength(array);

      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }

      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }

      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }

      return -1;
    };
  } // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.


  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex); // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).

  _.range = function (start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }

    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }; // Function (ahem) Functions
  // ------------------
  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments


  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  }; // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.


  _.bind = function (func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);

    var bound = function bound() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };

    return bound;
  }; // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.


  _.partial = function (func) {
    var boundArgs = slice.call(arguments, 1);

    var bound = function bound() {
      var position = 0,
          length = boundArgs.length;
      var args = Array(length);

      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }

      while (position < arguments.length) {
        args.push(arguments[position++]);
      }

      return executeBound(func, bound, this, this, args);
    };

    return bound;
  }; // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.


  _.bindAll = function (obj) {
    var i,
        length = arguments.length,
        key;
    if (length <= 1) throw new Error('bindAll must be passed function names');

    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }

    return obj;
  }; // Memoize an expensive function by storing its results.


  _.memoize = function (func, hasher) {
    var memoize = function memoize(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };

    memoize.cache = {};
    return memoize;
  }; // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.


  _.delay = function (func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait);
  }; // Defers a function, scheduling it to run after the current call stack has
  // cleared.


  _.defer = _.partial(_.delay, _, 1); // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.

  _.throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    return function () {
      var now = _.now();

      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }; // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.


  _.debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function later() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;

        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);

      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  }; // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.


  _.wrap = function (func, wrapper) {
    return _.partial(wrapper, func);
  }; // Returns a negated version of the passed-in predicate.


  _.negate = function (predicate) {
    return function () {
      return !predicate.apply(this, arguments);
    };
  }; // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.


  _.compose = function () {
    var args = arguments;
    var start = args.length - 1;
    return function () {
      var i = start;
      var result = args[start].apply(this, arguments);

      while (i--) {
        result = args[i].call(this, result);
      }

      return result;
    };
  }; // Returns a function that will only be executed on and after the Nth call.


  _.after = function (times, func) {
    return function () {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }; // Returns a function that will only be executed up to (but not including) the Nth call.


  _.before = function (times, func) {
    var memo;
    return function () {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }

      if (times <= 1) func = null;
      return memo;
    };
  }; // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.


  _.once = _.partial(_.before, 2); // Object Functions
  // ----------------
  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.

  var hasEnumBug = !{
    toString: null
  }.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto; // Constructor is a special case.

    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];

      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  } // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`


  _.keys = function (obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];

    for (var key in obj) {
      if (_.has(obj, key)) keys.push(key);
    } // Ahem, IE < 9.


    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }; // Retrieve all the property names of an object.


  _.allKeys = function (obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];

    for (var key in obj) {
      keys.push(key);
    } // Ahem, IE < 9.


    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }; // Retrieve the values of an object's properties.


  _.values = function (obj) {
    var keys = _.keys(obj);

    var length = keys.length;
    var values = Array(length);

    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }

    return values;
  }; // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object


  _.mapObject = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var keys = _.keys(obj),
        length = keys.length,
        results = {},
        currentKey;

    for (var index = 0; index < length; index++) {
      currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }

    return results;
  }; // Convert an object into a list of `[key, value]` pairs.


  _.pairs = function (obj) {
    var keys = _.keys(obj);

    var length = keys.length;
    var pairs = Array(length);

    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }

    return pairs;
  }; // Invert the keys and values of an object. The values must be serializable.


  _.invert = function (obj) {
    var result = {};

    var keys = _.keys(obj);

    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }

    return result;
  }; // Return a sorted list of the function names available on the object.
  // Aliased as `methods`


  _.functions = _.methods = function (obj) {
    var names = [];

    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }

    return names.sort();
  }; // Extend a given object with all the properties in passed-in object(s).


  _.extend = createAssigner(_.allKeys); // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

  _.extendOwn = _.assign = createAssigner(_.keys); // Returns the first key on an object that passes a predicate test

  _.findKey = function (obj, predicate, context) {
    predicate = cb(predicate, context);

    var keys = _.keys(obj),
        key;

    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }; // Return a copy of the object only containing the whitelisted properties.


  _.pick = function (object, oiteratee, context) {
    var result = {},
        obj = object,
        iteratee,
        keys;
    if (obj == null) return result;

    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);

      iteratee = function iteratee(value, key, obj) {
        return key in obj;
      };

      obj = Object(obj);
    }

    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }

    return result;
  }; // Return a copy of the object without the blacklisted properties.


  _.omit = function (obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);

      iteratee = function iteratee(value, key) {
        return !_.contains(keys, key);
      };
    }

    return _.pick(obj, iteratee, context);
  }; // Fill in a given object with default properties.


  _.defaults = createAssigner(_.allKeys, true); // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.

  _.create = function (prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  }; // Create a (shallow-cloned) duplicate of an object.


  _.clone = function (obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  }; // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.


  _.tap = function (obj, interceptor) {
    interceptor(obj);
    return obj;
  }; // Returns whether an object has a given set of `key:value` pairs.


  _.isMatch = function (object, attrs) {
    var keys = _.keys(attrs),
        length = keys.length;

    if (object == null) return !length;
    var obj = Object(object);

    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }

    return true;
  }; // Internal recursive comparison function for `isEqual`.


  var eq = function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b; // A strict comparison is necessary because `null == undefined`.

    if (a == null || b == null) return a === b; // Unwrap any wrapped objects.

    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped; // Compare `[[Class]]` names.

    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;

      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

        return +a === 0 ? 1 / +a === 1 / b : +a === +b;

      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';

    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.

      var aCtor = a.constructor,
          bCtor = b.constructor;

      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
        return false;
      }
    } // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.


    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    } // Add the first object to the stack of traversed objects.


    aStack.push(a);
    bStack.push(b); // Recursively compare objects and arrays.

    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a),
          key;

      length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

      if (_.keys(b).length !== length) return false;

      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    } // Remove the first object from the stack of traversed objects.


    aStack.pop();
    bStack.pop();
    return true;
  }; // Perform a deep comparison to check if two objects are equal.


  _.isEqual = function (a, b) {
    return eq(a, b);
  }; // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.


  _.isEmpty = function (obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  }; // Is a given value a DOM element?


  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  }; // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray


  _.isArray = nativeIsArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  }; // Is a given variable an object?


  _.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }; // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.


  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
    _['is' + name] = function (obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  }); // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.


  if (!_.isArguments(arguments)) {
    _.isArguments = function (obj) {
      return _.has(obj, 'callee');
    };
  } // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).


  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function (obj) {
      return typeof obj == 'function' || false;
    };
  } // Is a given object a finite number?


  _.isFinite = function (obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  }; // Is the given value `NaN`? (NaN is the only number which does not equal itself).


  _.isNaN = function (obj) {
    return _.isNumber(obj) && obj !== +obj;
  }; // Is a given value a boolean?


  _.isBoolean = function (obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }; // Is a given value equal to null?


  _.isNull = function (obj) {
    return obj === null;
  }; // Is a given variable undefined?


  _.isUndefined = function (obj) {
    return obj === void 0;
  }; // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).


  _.has = function (obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }; // Utility Functions
  // -----------------
  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.


  _.noConflict = function () {
    root._ = previousUnderscore;
    return this;
  }; // Keep the identity function around for default iteratees.


  _.identity = function (value) {
    return value;
  }; // Predicate-generating functions. Often useful outside of Underscore.


  _.constant = function (value) {
    return function () {
      return value;
    };
  };

  _.noop = function () {};

  _.property = property; // Generates a function for a given object that returns a given property.

  _.propertyOf = function (obj) {
    return obj == null ? function () {} : function (key) {
      return obj[key];
    };
  }; // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.


  _.matcher = _.matches = function (attrs) {
    attrs = _.extendOwn({}, attrs);
    return function (obj) {
      return _.isMatch(obj, attrs);
    };
  }; // Run a function **n** times.


  _.times = function (n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);

    for (var i = 0; i < n; i++) {
      accum[i] = iteratee(i);
    }

    return accum;
  }; // Return a random integer between min and max (inclusive).


  _.random = function (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
  }; // A (possibly faster) way to get the current timestamp as an integer.


  _.now = Date.now || function () {
    return new Date().getTime();
  }; // List of HTML entities for escaping.


  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  var unescapeMap = _.invert(escapeMap); // Functions for escaping and unescaping strings to/from HTML interpolation.


  var createEscaper = function createEscaper(map) {
    var escaper = function escaper(match) {
      return map[match];
    }; // Regexes for identifying a key that needs to be escaped


    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function (string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap); // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.

  _.result = function (object, property, fallback) {
    var value = object == null ? void 0 : object[property];

    if (value === void 0) {
      value = fallback;
    }

    return _.isFunction(value) ? value.call(object) : value;
  }; // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.


  var idCounter = 0;

  _.uniqueId = function (prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }; // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.


  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  }; // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.

  var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
  // string literal.

  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    "\u2028": 'u2028',
    "\u2029": 'u2029'
  };
  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function escapeChar(match) {
    return '\\' + escapes[match];
  }; // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.


  _.template = function (text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings); // Combine delimiters into one regular expression via alternation.

    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      } // Adobe VMs need the match returned to produce the correct offest.


      return match;
    });
    source += "';\n"; // If a variable is not specified, place data values in local scope.

    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function template(data) {
      return render.call(this, data, _);
    }; // Provide the compiled source as a convenience for precompilation.


    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    return template;
  }; // Add a "chain" function. Start chaining a wrapped Underscore object.


  _.chain = function (obj) {
    var instance = _(obj);

    instance._chain = true;
    return instance;
  }; // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  // Helper function to continue chaining intermediate results.


  var result = function result(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }; // Add your own custom functions to the Underscore object.


  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];

      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  }; // Add all of the Underscore functions to the wrapper object.


  _.mixin(_); // Add all mutator Array functions to the wrapper.


  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
    var method = ArrayProto[name];

    _.prototype[name] = function () {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  }); // Add all accessor Array functions to the wrapper.


  _.each(['concat', 'join', 'slice'], function (name) {
    var method = ArrayProto[name];

    _.prototype[name] = function () {
      return result(this, method.apply(this._wrapped, arguments));
    };
  }); // Extracts the result from a wrapped and chained object.


  _.prototype.value = function () {
    return this._wrapped;
  }; // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.


  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function () {
    return '' + this._wrapped;
  }; // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.


  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function () {
      return _;
    });
  }
}).call(void 0);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFx1bmRlcnNjb3JlLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJleHBvcnRzIiwicHJldmlvdXNVbmRlcnNjb3JlIiwiXyIsIkFycmF5UHJvdG8iLCJBcnJheSIsInByb3RvdHlwZSIsIk9ialByb3RvIiwiT2JqZWN0IiwiRnVuY1Byb3RvIiwiRnVuY3Rpb24iLCJwdXNoIiwic2xpY2UiLCJ0b1N0cmluZyIsImhhc093blByb3BlcnR5IiwibmF0aXZlSXNBcnJheSIsImlzQXJyYXkiLCJuYXRpdmVLZXlzIiwia2V5cyIsIm5hdGl2ZUJpbmQiLCJiaW5kIiwibmF0aXZlQ3JlYXRlIiwiY3JlYXRlIiwiQ3RvciIsIm9iaiIsIl93cmFwcGVkIiwibW9kdWxlIiwiVkVSU0lPTiIsIm9wdGltaXplQ2IiLCJmdW5jIiwiY29udGV4dCIsImFyZ0NvdW50IiwidmFsdWUiLCJjYWxsIiwib3RoZXIiLCJpbmRleCIsImNvbGxlY3Rpb24iLCJhY2N1bXVsYXRvciIsImFwcGx5IiwiYXJndW1lbnRzIiwiY2IiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsIml0ZXJhdGVlIiwiSW5maW5pdHkiLCJjcmVhdGVBc3NpZ25lciIsImtleXNGdW5jIiwidW5kZWZpbmVkT25seSIsImxlbmd0aCIsInNvdXJjZSIsImwiLCJpIiwia2V5IiwiYmFzZUNyZWF0ZSIsInJlc3VsdCIsIk1BWF9BUlJBWV9JTkRFWCIsIk1hdGgiLCJwb3ciLCJnZXRMZW5ndGgiLCJpc0FycmF5TGlrZSIsImVhY2giLCJmb3JFYWNoIiwibWFwIiwiY29sbGVjdCIsInJlc3VsdHMiLCJjdXJyZW50S2V5IiwiY3JlYXRlUmVkdWNlIiwiZGlyIiwiaXRlcmF0b3IiLCJtZW1vIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZmluZCIsImRldGVjdCIsInByZWRpY2F0ZSIsImZpbmRJbmRleCIsImZpbmRLZXkiLCJmaWx0ZXIiLCJzZWxlY3QiLCJsaXN0IiwicmVqZWN0IiwibmVnYXRlIiwiZXZlcnkiLCJhbGwiLCJzb21lIiwiYW55IiwiY29udGFpbnMiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJpdGVtIiwiZnJvbUluZGV4IiwiZ3VhcmQiLCJ2YWx1ZXMiLCJpbmRleE9mIiwiaW52b2tlIiwibWV0aG9kIiwiYXJncyIsImlzRnVuYyIsInBsdWNrIiwid2hlcmUiLCJhdHRycyIsImZpbmRXaGVyZSIsIm1heCIsImxhc3RDb21wdXRlZCIsImNvbXB1dGVkIiwibWluIiwic2h1ZmZsZSIsInNldCIsInNodWZmbGVkIiwicmFuZCIsInJhbmRvbSIsInNhbXBsZSIsIm4iLCJzb3J0QnkiLCJjcml0ZXJpYSIsInNvcnQiLCJsZWZ0IiwicmlnaHQiLCJhIiwiYiIsImdyb3VwIiwiYmVoYXZpb3IiLCJncm91cEJ5IiwiaGFzIiwiaW5kZXhCeSIsImNvdW50QnkiLCJ0b0FycmF5Iiwic2l6ZSIsInBhcnRpdGlvbiIsInBhc3MiLCJmYWlsIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImFycmF5IiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiZmxhdHRlbiIsImlucHV0Iiwic2hhbGxvdyIsInN0cmljdCIsInN0YXJ0SW5kZXgiLCJvdXRwdXQiLCJpZHgiLCJpc0FyZ3VtZW50cyIsImoiLCJsZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc1NvcnRlZCIsImlzQm9vbGVhbiIsInNlZW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsImFyZ3NMZW5ndGgiLCJ6aXAiLCJ1bnppcCIsIm9iamVjdCIsImNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwibG93IiwiaGlnaCIsIm1pZCIsImZsb29yIiwiY3JlYXRlSW5kZXhGaW5kZXIiLCJwcmVkaWNhdGVGaW5kIiwiaXNOYU4iLCJsYXN0SW5kZXhPZiIsInJhbmdlIiwic3RhcnQiLCJzdG9wIiwic3RlcCIsImNlaWwiLCJleGVjdXRlQm91bmQiLCJzb3VyY2VGdW5jIiwiYm91bmRGdW5jIiwiY2FsbGluZ0NvbnRleHQiLCJzZWxmIiwiVHlwZUVycm9yIiwiYm91bmQiLCJjb25jYXQiLCJwYXJ0aWFsIiwiYm91bmRBcmdzIiwicG9zaXRpb24iLCJiaW5kQWxsIiwiRXJyb3IiLCJtZW1vaXplIiwiaGFzaGVyIiwiY2FjaGUiLCJhZGRyZXNzIiwiZGVsYXkiLCJ3YWl0Iiwic2V0VGltZW91dCIsImRlZmVyIiwidGhyb3R0bGUiLCJvcHRpb25zIiwidGltZW91dCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwibm93IiwicmVtYWluaW5nIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJkZWJvdW5jZSIsImltbWVkaWF0ZSIsInRpbWVzdGFtcCIsImNhbGxOb3ciLCJ3cmFwIiwid3JhcHBlciIsImNvbXBvc2UiLCJhZnRlciIsInRpbWVzIiwiYmVmb3JlIiwib25jZSIsImhhc0VudW1CdWciLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIm5vbkVudW1lcmFibGVQcm9wcyIsImNvbGxlY3ROb25FbnVtUHJvcHMiLCJub25FbnVtSWR4IiwiY29uc3RydWN0b3IiLCJwcm90byIsInByb3AiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwibmFtZXMiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJwaWNrIiwib2l0ZXJhdGVlIiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwicHJvcHMiLCJjbG9uZSIsInRhcCIsImludGVyY2VwdG9yIiwiaXNNYXRjaCIsImVxIiwiYVN0YWNrIiwiYlN0YWNrIiwiY2xhc3NOYW1lIiwiYXJlQXJyYXlzIiwiYUN0b3IiLCJiQ3RvciIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiaXNTdHJpbmciLCJpc0VsZW1lbnQiLCJub2RlVHlwZSIsInR5cGUiLCJuYW1lIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJwYXJzZUZsb2F0IiwiaXNOdW1iZXIiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsImFjY3VtIiwiRGF0ZSIsImdldFRpbWUiLCJlc2NhcGVNYXAiLCJ1bmVzY2FwZU1hcCIsImNyZWF0ZUVzY2FwZXIiLCJlc2NhcGVyIiwibWF0Y2giLCJqb2luIiwidGVzdFJlZ2V4cCIsIlJlZ0V4cCIsInJlcGxhY2VSZWdleHAiLCJzdHJpbmciLCJ0ZXN0IiwicmVwbGFjZSIsImVzY2FwZSIsInVuZXNjYXBlIiwiZmFsbGJhY2siLCJpZENvdW50ZXIiLCJ1bmlxdWVJZCIsInByZWZpeCIsImlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJub01hdGNoIiwiZXNjYXBlcyIsImVzY2FwZUNoYXIiLCJ0ZW1wbGF0ZSIsInRleHQiLCJzZXR0aW5ncyIsIm9sZFNldHRpbmdzIiwib2Zmc2V0IiwidmFyaWFibGUiLCJyZW5kZXIiLCJlIiwiZGF0YSIsImFyZ3VtZW50IiwiY2hhaW4iLCJpbnN0YW5jZSIsIl9jaGFpbiIsIm1peGluIiwidmFsdWVPZiIsInRvSlNPTiIsImRlZmluZSIsImFtZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVDLGFBQVc7QUFFVjtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSUEsSUFBSSxHQUFHQyxPQUFYLENBUlUsQ0FVVjs7QUFDQSxNQUFJQyxrQkFBa0IsR0FBR0YsSUFBSSxDQUFDRyxDQUE5QixDQVhVLENBYVY7O0FBQ0EsTUFBSUMsVUFBVSxHQUFHQyxLQUFLLENBQUNDLFNBQXZCO0FBQUEsTUFBa0NDLFFBQVEsR0FBR0MsTUFBTSxDQUFDRixTQUFwRDtBQUFBLE1BQStERyxT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WXdRLElBQVosSUFBb0IsWUFBVztBQUM3QixhQUFPck4sTUFBTSxDQUFDLElBQUQsRUFBTzRDLE1BQU0sQ0FBQy9ELEtBQVAsQ0FBYSxLQUFLYixRQUFsQixFQUE0QmMsU0FBNUIsQ0FBUCxDQUFiO0FBQ0QsS0FGRDtBQUdELEdBTEQsRUFoL0NVLENBdS9DVjs7O0FBQ0FwQyxFQUFBQSxDQUFDLENBQUNHLFNBQUYsQ0FBWTBCLEtBQVosR0FBb0IsWUFBVztBQUM3QixXQUFPLEtBQUtQLFFBQVo7QUFDRCxHQUZELENBeC9DVSxDQTQvQ1Y7QUFDQTs7O0FBQ0F0QixFQUFBQSxDQUFDLENBQUNHLFNBQUYsQ0FBWThULE9BQVosR0FBc0JqVSxDQUFDLENBQUNHLFNBQUYsQ0FBWStULE1BQVosR0FBcUJsVSxDQUFDLENBQUNHLFNBQUYsQ0FBWTBCLEtBQXZEOztBQUVBN0IsRUFBQUEsQ0FBQyxDQUFDRyxTQUFGLENBQVlPLFFBQVosR0FBdUIsWUFBVztBQUNoQyxXQUFPLEtBQUssS0FBS1ksUUFBakI7QUFDRCxHQUZELENBaGdEVSxDQW9nRFY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE1BQUksT0FBTzZTLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE1BQU0sQ0FBQ0MsR0FBM0MsRUFBZ0Q7QUFDOUNELElBQUFBLE1BQU0sQ0FBQyxZQUFELEVBQWUsRUFBZixFQUFtQixZQUFXO0FBQ2xDLGFBQU9uVSxDQUFQO0FBQ0QsS0FGSyxDQUFOO0FBR0Q7QUFDRixDQWhoREEsRUFnaERDOEIsSUFoaERELFFBQUQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOC4zXHJcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xyXG4vLyAgICAgKGMpIDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xyXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgLy8gQmFzZWxpbmUgc2V0dXBcclxuICAvLyAtLS0tLS0tLS0tLS0tLVxyXG4gIFxyXG4gIC8vIEBrcmlzaXJrXHJcbiAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgaW4gdGhlIGJyb3dzZXIsIG9yIGBleHBvcnRzYCBvbiB0aGUgc2VydmVyLlxyXG4gIC8vIHZhciByb290ID0gdGhpcztcclxuICB2YXIgcm9vdCA9IGV4cG9ydHMgO1xyXG5cclxuICAvLyBTYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYF9gIHZhcmlhYmxlLlxyXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XHJcblxyXG4gIC8vIFNhdmUgYnl0ZXMgaW4gdGhlIG1pbmlmaWVkIChidXQgbm90IGd6aXBwZWQpIHZlcnNpb246XHJcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG5cclxuICAvLyBDcmVhdGUgcXVpY2sgcmVmZXJlbmNlIHZhcmlhYmxlcyBmb3Igc3BlZWQgYWNjZXNzIHRvIGNvcmUgcHJvdG90eXBlcy5cclxuICB2YXJcclxuICAgIHB1c2ggICAgICAgICAgICAgPSBBcnJheVByb3RvLnB1c2gsXHJcbiAgICBzbGljZSAgICAgICAgICAgID0gQXJyYXlQcm90by5zbGljZSxcclxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcclxuICAgIGhhc093blByb3BlcnR5ICAgPSBPYmpQcm90by5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXHJcbiAgLy8gYXJlIGRlY2xhcmVkIGhlcmUuXHJcbiAgdmFyXHJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxyXG4gICAgbmF0aXZlS2V5cyAgICAgICAgID0gT2JqZWN0LmtleXMsXHJcbiAgICBuYXRpdmVCaW5kICAgICAgICAgPSBGdW5jUHJvdG8uYmluZCxcclxuICAgIG5hdGl2ZUNyZWF0ZSAgICAgICA9IE9iamVjdC5jcmVhdGU7XHJcblxyXG4gIC8vIE5ha2VkIGZ1bmN0aW9uIHJlZmVyZW5jZSBmb3Igc3Vycm9nYXRlLXByb3RvdHlwZS1zd2FwcGluZy5cclxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcclxuXHJcbiAgLy8gQ3JlYXRlIGEgc2FmZSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciB1c2UgYmVsb3cuXHJcbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBfKSByZXR1cm4gb2JqO1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcclxuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XHJcbiAgfTtcclxuXHJcbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcclxuICAvLyBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3IgdGhlIG9sZCBgcmVxdWlyZSgpYCBBUEkuIElmIHdlJ3JlIGluXHJcbiAgLy8gdGhlIGJyb3dzZXIsIGFkZCBgX2AgYXMgYSBnbG9iYWwgb2JqZWN0LlxyXG4gIC8vIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAvLyAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gIC8vICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgZXhwb3J0cy5fID0gXztcclxuICAvLyB9IGVsc2Uge1xyXG4gIC8vICAgcm9vdC5fID0gXztcclxuICAvLyB9XHJcblxyXG4gIC8vIEBrcmlzaXJrXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBfIDtcclxuICAvLyBpZih0eXBlb2Yod2luZG93KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgLy8gICB3aW5kb3cuXyA9IF87XHJcbiAgLy8gfVxyXG5cclxuXHJcblxyXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cclxuICBfLlZFUlNJT04gPSAnMS44LjMnO1xyXG5cclxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXHJcbiAgLy8gb2YgdGhlIHBhc3NlZC1pbiBjYWxsYmFjaywgdG8gYmUgcmVwZWF0ZWRseSBhcHBsaWVkIGluIG90aGVyIFVuZGVyc2NvcmVcclxuICAvLyBmdW5jdGlvbnMuXHJcbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xyXG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgcmV0dXJuIGZ1bmM7XHJcbiAgICBzd2l0Y2ggKGFyZ0NvdW50ID09IG51bGwgPyAzIDogYXJnQ291bnQpIHtcclxuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlKTtcclxuICAgICAgfTtcclxuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgb3RoZXIpO1xyXG4gICAgICB9O1xyXG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XHJcbiAgICAgIH07XHJcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxyXG4gIC8vIHRvIGVhY2ggZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24sIHJldHVybmluZyB0aGUgZGVzaXJlZCByZXN1bHQg4oCUIGVpdGhlclxyXG4gIC8vIGlkZW50aXR5LCBhbiBhcmJpdHJhcnkgY2FsbGJhY2ssIGEgcHJvcGVydHkgbWF0Y2hlciwgb3IgYSBwcm9wZXJ0eSBhY2Nlc3Nvci5cclxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXy5pZGVudGl0eTtcclxuICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm4gb3B0aW1pemVDYih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpO1xyXG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcclxuICAgIHJldHVybiBfLnByb3BlcnR5KHZhbHVlKTtcclxuICB9O1xyXG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xyXG4gICAgcmV0dXJuIGNiKHZhbHVlLCBjb250ZXh0LCBJbmZpbml0eSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFzc2lnbmVyIGZ1bmN0aW9ucy5cclxuICB2YXIgY3JlYXRlQXNzaWduZXIgPSBmdW5jdGlvbihrZXlzRnVuYywgdW5kZWZpbmVkT25seSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgaWYgKGxlbmd0aCA8IDIgfHwgb2JqID09IG51bGwpIHJldHVybiBvYmo7XHJcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XSxcclxuICAgICAgICAgICAga2V5cyA9IGtleXNGdW5jKHNvdXJjZSksXHJcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gYW5vdGhlci5cclxuICB2YXIgYmFzZUNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSkge1xyXG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcclxuICAgIGlmIChuYXRpdmVDcmVhdGUpIHJldHVybiBuYXRpdmVDcmVhdGUocHJvdG90eXBlKTtcclxuICAgIEN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xyXG4gICAgQ3Rvci5wcm90b3R5cGUgPSBudWxsO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuICB2YXIgcHJvcGVydHkgPSBmdW5jdGlvbihrZXkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gdm9pZCAwIDogb2JqW2tleV07XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIEhlbHBlciBmb3IgY29sbGVjdGlvbiBtZXRob2RzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgY29sbGVjdGlvblxyXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcclxuICAvLyBSZWxhdGVkOiBodHRwOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aFxyXG4gIC8vIEF2b2lkcyBhIHZlcnkgbmFzdHkgaU9TIDggSklUIGJ1ZyBvbiBBUk0tNjQuICMyMDk0XHJcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XHJcbiAgdmFyIGdldExlbmd0aCA9IHByb3BlcnR5KCdsZW5ndGgnKTtcclxuICB2YXIgaXNBcnJheUxpa2UgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgJiYgbGVuZ3RoID49IDAgJiYgbGVuZ3RoIDw9IE1BWF9BUlJBWV9JTkRFWDtcclxuICB9O1xyXG5cclxuICAvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8vIFRoZSBjb3JuZXJzdG9uZSwgYW4gYGVhY2hgIGltcGxlbWVudGF0aW9uLCBha2EgYGZvckVhY2hgLlxyXG4gIC8vIEhhbmRsZXMgcmF3IG9iamVjdHMgaW4gYWRkaXRpb24gdG8gYXJyYXktbGlrZXMuIFRyZWF0cyBhbGxcclxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxyXG4gIF8uZWFjaCA9IF8uZm9yRWFjaCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICB2YXIgaSwgbGVuZ3RoO1xyXG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcclxuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xyXG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaXRlcmF0ZWUob2JqW2tleXNbaV1dLCBrZXlzW2ldLCBvYmopO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybiB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50LlxyXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxyXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxyXG4gICAgICAgIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xyXG4gICAgICByZXN1bHRzW2luZGV4XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH07XHJcblxyXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZShkaXIpIHtcclxuICAgIC8vIE9wdGltaXplZCBpdGVyYXRvciBmdW5jdGlvbiBhcyB1c2luZyBhcmd1bWVudHMubGVuZ3RoXHJcbiAgICAvLyBpbiB0aGUgbWFpbiBmdW5jdGlvbiB3aWxsIGRlb3B0aW1pemUgdGhlLCBzZWUgIzE5OTEuXHJcbiAgICBmdW5jdGlvbiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKSB7XHJcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcclxuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xyXG4gICAgICAgIG1lbW8gPSBpdGVyYXRlZShtZW1vLCBvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1lbW87XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcclxuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCA0KTtcclxuICAgICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcclxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxyXG4gICAgICAgICAgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XHJcbiAgICAgIC8vIERldGVybWluZSB0aGUgaW5pdGlhbCB2YWx1ZSBpZiBub25lIGlzIHByb3ZpZGVkLlxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICBtZW1vID0gb2JqW2tleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4XTtcclxuICAgICAgICBpbmRleCArPSBkaXI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGl0ZXJhdG9yKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGtleXMsIGluZGV4LCBsZW5ndGgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vICoqUmVkdWNlKiogYnVpbGRzIHVwIGEgc2luZ2xlIHJlc3VsdCBmcm9tIGEgbGlzdCBvZiB2YWx1ZXMsIGFrYSBgaW5qZWN0YCxcclxuICAvLyBvciBgZm9sZGxgLlxyXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gY3JlYXRlUmVkdWNlKDEpO1xyXG5cclxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cclxuICBfLnJlZHVjZVJpZ2h0ID0gXy5mb2xkciA9IGNyZWF0ZVJlZHVjZSgtMSk7XHJcblxyXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cclxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICB2YXIga2V5O1xyXG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcclxuICAgICAga2V5ID0gXy5maW5kSW5kZXgob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgIT09IHZvaWQgMCAmJiBrZXkgIT09IC0xKSByZXR1cm4gb2JqW2tleV07XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBwYXNzIGEgdHJ1dGggdGVzdC5cclxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxyXG4gIF8uZmlsdGVyID0gXy5zZWxlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcclxuICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGxpc3QpKSByZXN1bHRzLnB1c2godmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBmb3Igd2hpY2ggYSB0cnV0aCB0ZXN0IGZhaWxzLlxyXG4gIF8ucmVqZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcclxuICB9O1xyXG5cclxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cclxuICAvLyBBbGlhc2VkIGFzIGBhbGxgLlxyXG4gIF8uZXZlcnkgPSBfLmFsbCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xyXG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcclxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcclxuICAgICAgaWYgKCFwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cclxuICAvLyBBbGlhc2VkIGFzIGBhbnlgLlxyXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxyXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xyXG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbnMgYSBnaXZlbiBpdGVtICh1c2luZyBgPT09YCkuXHJcbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXHJcbiAgXy5jb250YWlucyA9IF8uaW5jbHVkZXMgPSBfLmluY2x1ZGUgPSBmdW5jdGlvbihvYmosIGl0ZW0sIGZyb21JbmRleCwgZ3VhcmQpIHtcclxuICAgIGlmICghaXNBcnJheUxpa2Uob2JqKSkgb2JqID0gXy52YWx1ZXMob2JqKTtcclxuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xyXG4gICAgcmV0dXJuIF8uaW5kZXhPZihvYmosIGl0ZW0sIGZyb21JbmRleCkgPj0gMDtcclxuICB9O1xyXG5cclxuICAvLyBJbnZva2UgYSBtZXRob2QgKHdpdGggYXJndW1lbnRzKSBvbiBldmVyeSBpdGVtIGluIGEgY29sbGVjdGlvbi5cclxuICBfLmludm9rZSA9IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XHJcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuICAgIHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcclxuICAgIHJldHVybiBfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXTtcclxuICAgICAgcmV0dXJuIGZ1bmMgPT0gbnVsbCA/IGZ1bmMgOiBmdW5jLmFwcGx5KHZhbHVlLCBhcmdzKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYG1hcGA6IGZldGNoaW5nIGEgcHJvcGVydHkuXHJcbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XHJcbiAgICByZXR1cm4gXy5tYXAob2JqLCBfLnByb3BlcnR5KGtleSkpO1xyXG4gIH07XHJcblxyXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbHRlcmA6IHNlbGVjdGluZyBvbmx5IG9iamVjdHNcclxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxyXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XHJcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcclxuICB9O1xyXG5cclxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaW5kYDogZ2V0dGluZyB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cclxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcclxuICAgIHJldHVybiBfLmZpbmQob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm4gdGhlIG1heGltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXHJcbiAgXy5tYXggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXHJcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xyXG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcclxuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcclxuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xyXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcclxuICAgICAgICBpZiAoY29tcHV0ZWQgPiBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IC1JbmZpbml0eSAmJiByZXN1bHQgPT09IC1JbmZpbml0eSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XHJcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm4gdGhlIG1pbmltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXHJcbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IEluZmluaXR5LFxyXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcclxuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XHJcbiAgICAgIG9iaiA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgcmVzdWx0KSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcclxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XHJcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcclxuICAgICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXHJcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxyXG4gIF8uc2h1ZmZsZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xyXG4gICAgdmFyIGxlbmd0aCA9IHNldC5sZW5ndGg7XHJcbiAgICB2YXIgc2h1ZmZsZWQgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICByYW5kID0gXy5yYW5kb20oMCwgaW5kZXgpO1xyXG4gICAgICBpZiAocmFuZCAhPT0gaW5kZXgpIHNodWZmbGVkW2luZGV4XSA9IHNodWZmbGVkW3JhbmRdO1xyXG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhIGNvbGxlY3Rpb24uXHJcbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cclxuICAvLyBUaGUgaW50ZXJuYWwgYGd1YXJkYCBhcmd1bWVudCBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBtYXBgLlxyXG4gIF8uc2FtcGxlID0gZnVuY3Rpb24ob2JqLCBuLCBndWFyZCkge1xyXG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xyXG4gICAgICBpZiAoIWlzQXJyYXlMaWtlKG9iaikpIG9iaiA9IF8udmFsdWVzKG9iaik7XHJcbiAgICAgIHJldHVybiBvYmpbXy5yYW5kb20ob2JqLmxlbmd0aCAtIDEpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBfLnNodWZmbGUob2JqKS5zbGljZSgwLCBNYXRoLm1heCgwLCBuKSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gU29ydCB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uIHByb2R1Y2VkIGJ5IGFuIGl0ZXJhdGVlLlxyXG4gIF8uc29ydEJ5ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICByZXR1cm4gXy5wbHVjayhfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgY3JpdGVyaWE6IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdClcclxuICAgICAgfTtcclxuICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcclxuICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhO1xyXG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xyXG4gICAgICBpZiAoYSAhPT0gYikge1xyXG4gICAgICAgIGlmIChhID4gYiB8fCBhID09PSB2b2lkIDApIHJldHVybiAxO1xyXG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbGVmdC5pbmRleCAtIHJpZ2h0LmluZGV4O1xyXG4gICAgfSksICd2YWx1ZScpO1xyXG4gIH07XHJcblxyXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cclxuICB2YXIgZ3JvdXAgPSBmdW5jdGlvbihiZWhhdmlvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcclxuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIHZhbHVlLCBrZXkpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxyXG4gIC8vIHRvIGdyb3VwIGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3JpdGVyaW9uLlxyXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSk7IGVsc2UgcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xyXG4gIH0pO1xyXG5cclxuICAvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXHJcbiAgLy8gd2hlbiB5b3Uga25vdyB0aGF0IHlvdXIgaW5kZXggdmFsdWVzIHdpbGwgYmUgdW5pcXVlLlxyXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcclxuICB9KTtcclxuXHJcbiAgLy8gQ291bnRzIGluc3RhbmNlcyBvZiBhbiBvYmplY3QgdGhhdCBncm91cCBieSBhIGNlcnRhaW4gY3JpdGVyaW9uLiBQYXNzXHJcbiAgLy8gZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZSB0byBjb3VudCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXHJcbiAgLy8gY3JpdGVyaW9uLlxyXG4gIF8uY291bnRCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0rKzsgZWxzZSByZXN1bHRba2V5XSA9IDE7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXHJcbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuIFtdO1xyXG4gICAgaWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xyXG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xyXG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxyXG4gIF8uc2l6ZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcclxuICAgIHJldHVybiBpc0FycmF5TGlrZShvYmopID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcclxuICB9O1xyXG5cclxuICAvLyBTcGxpdCBhIGNvbGxlY3Rpb24gaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXHJcbiAgLy8gcHJlZGljYXRlLCBhbmQgb25lIHdob3NlIGVsZW1lbnRzIGFsbCBkbyBub3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLlxyXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICB2YXIgcGFzcyA9IFtdLCBmYWlsID0gW107XHJcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcclxuICAgICAgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmopID8gcGFzcyA6IGZhaWwpLnB1c2godmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xyXG4gIH07XHJcblxyXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cclxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBBbGlhc2VkIGFzIGBoZWFkYCBhbmQgYHRha2VgLiBUaGUgKipndWFyZCoqIGNoZWNrXHJcbiAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxyXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcclxuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xyXG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5WzBdO1xyXG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXHJcbiAgLy8gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gYWxsIHRoZSB2YWx1ZXMgaW5cclxuICAvLyB0aGUgYXJyYXksIGV4Y2x1ZGluZyB0aGUgbGFzdCBOLlxyXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xyXG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIE1hdGgubWF4KDAsIGFycmF5Lmxlbmd0aCAtIChuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbikpKTtcclxuICB9O1xyXG5cclxuICAvLyBHZXQgdGhlIGxhc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgbGFzdCBOXHJcbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS5cclxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcclxuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xyXG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cclxuICAvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxyXG4gIC8vIHRoZSByZXN0IE4gdmFsdWVzIGluIHRoZSBhcnJheS5cclxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcclxuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCBuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbik7XHJcbiAgfTtcclxuXHJcbiAgLy8gVHJpbSBvdXQgYWxsIGZhbHN5IHZhbHVlcyBmcm9tIGFuIGFycmF5LlxyXG4gIF8uY29tcGFjdCA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xyXG4gIH07XHJcblxyXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cclxuICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uKGlucHV0LCBzaGFsbG93LCBzdHJpY3QsIHN0YXJ0SW5kZXgpIHtcclxuICAgIHZhciBvdXRwdXQgPSBbXSwgaWR4ID0gMDtcclxuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgdmFsdWUgPSBpbnB1dFtpXTtcclxuICAgICAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSAmJiAoXy5pc0FycmF5KHZhbHVlKSB8fCBfLmlzQXJndW1lbnRzKHZhbHVlKSkpIHtcclxuICAgICAgICAvL2ZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0XHJcbiAgICAgICAgaWYgKCFzaGFsbG93KSB2YWx1ZSA9IGZsYXR0ZW4odmFsdWUsIHNoYWxsb3csIHN0cmljdCk7XHJcbiAgICAgICAgdmFyIGogPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XHJcbiAgICAgICAgd2hpbGUgKGogPCBsZW4pIHtcclxuICAgICAgICAgIG91dHB1dFtpZHgrK10gPSB2YWx1ZVtqKytdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICghc3RyaWN0KSB7XHJcbiAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH07XHJcblxyXG4gIC8vIEZsYXR0ZW4gb3V0IGFuIGFycmF5LCBlaXRoZXIgcmVjdXJzaXZlbHkgKGJ5IGRlZmF1bHQpLCBvciBqdXN0IG9uZSBsZXZlbC5cclxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xyXG4gICAgcmV0dXJuIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3csIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cclxuICBfLndpdGhvdXQgPSBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICB9O1xyXG5cclxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxyXG4gIC8vIGJlZW4gc29ydGVkLCB5b3UgaGF2ZSB0aGUgb3B0aW9uIG9mIHVzaW5nIGEgZmFzdGVyIGFsZ29yaXRobS5cclxuICAvLyBBbGlhc2VkIGFzIGB1bmlxdWVgLlxyXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgaWYgKCFfLmlzQm9vbGVhbihpc1NvcnRlZCkpIHtcclxuICAgICAgY29udGV4dCA9IGl0ZXJhdGVlO1xyXG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xyXG4gICAgICBpc1NvcnRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIHNlZW4gPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaV0sXHJcbiAgICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGksIGFycmF5KSA6IHZhbHVlO1xyXG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcclxuICAgICAgICBpZiAoIWkgfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuICAgICAgICBzZWVuID0gY29tcHV0ZWQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcclxuICAgICAgICBpZiAoIV8uY29udGFpbnMoc2VlbiwgY29tcHV0ZWQpKSB7XHJcbiAgICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICghXy5jb250YWlucyhyZXN1bHQsIHZhbHVlKSkge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcclxuICAvLyB0aGUgcGFzc2VkLWluIGFycmF5cy5cclxuICBfLnVuaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlKSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxyXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXHJcbiAgXy5pbnRlcnNlY3Rpb24gPSBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xyXG4gICAgICBpZiAoXy5jb250YWlucyhyZXN1bHQsIGl0ZW0pKSBjb250aW51ZTtcclxuICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBhcmdzTGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGogPT09IGFyZ3NMZW5ndGgpIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuICAvLyBUYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gb25lIGFycmF5IGFuZCBhIG51bWJlciBvZiBvdGhlciBhcnJheXMuXHJcbiAgLy8gT25seSB0aGUgZWxlbWVudHMgcHJlc2VudCBpbiBqdXN0IHRoZSBmaXJzdCBhcnJheSB3aWxsIHJlbWFpbi5cclxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgdmFyIHJlc3QgPSBmbGF0dGVuKGFyZ3VtZW50cywgdHJ1ZSwgdHJ1ZSwgMSk7XHJcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFppcCB0b2dldGhlciBtdWx0aXBsZSBsaXN0cyBpbnRvIGEgc2luZ2xlIGFycmF5IC0tIGVsZW1lbnRzIHRoYXQgc2hhcmVcclxuICAvLyBhbiBpbmRleCBnbyB0b2dldGhlci5cclxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIF8udW56aXAoYXJndW1lbnRzKTtcclxuICB9O1xyXG5cclxuICAvLyBDb21wbGVtZW50IG9mIF8uemlwLiBVbnppcCBhY2NlcHRzIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgZ3JvdXBzXHJcbiAgLy8gZWFjaCBhcnJheSdzIGVsZW1lbnRzIG9uIHNoYXJlZCBpbmRpY2VzXHJcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkgJiYgXy5tYXgoYXJyYXksIGdldExlbmd0aCkubGVuZ3RoIHx8IDA7XHJcbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBfLnBsdWNrKGFycmF5LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIC8vIENvbnZlcnRzIGxpc3RzIGludG8gb2JqZWN0cy4gUGFzcyBlaXRoZXIgYSBzaW5nbGUgYXJyYXkgb2YgYFtrZXksIHZhbHVlXWBcclxuICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcclxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgXy5vYmplY3QgPSBmdW5jdGlvbihsaXN0LCB2YWx1ZXMpIHtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1dID0gdmFsdWVzW2ldO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdFtsaXN0W2ldWzBdXSA9IGxpc3RbaV1bMV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gR2VuZXJhdG9yIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgZmluZEluZGV4IGFuZCBmaW5kTGFzdEluZGV4IGZ1bmN0aW9uc1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKGRpcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuICAgICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuICAgICAgdmFyIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XHJcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcclxuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xyXG4gICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGluZGV4IG9uIGFuIGFycmF5LWxpa2UgdGhhdCBwYXNzZXMgYSBwcmVkaWNhdGUgdGVzdFxyXG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XHJcbiAgXy5maW5kTGFzdEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoLTEpO1xyXG5cclxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXHJcbiAgLy8gYW4gb2JqZWN0IHNob3VsZCBiZSBpbnNlcnRlZCBzbyBhcyB0byBtYWludGFpbiBvcmRlci4gVXNlcyBiaW5hcnkgc2VhcmNoLlxyXG4gIF8uc29ydGVkSW5kZXggPSBmdW5jdGlvbihhcnJheSwgb2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XHJcbiAgICB2YXIgdmFsdWUgPSBpdGVyYXRlZShvYmopO1xyXG4gICAgdmFyIGxvdyA9IDAsIGhpZ2ggPSBnZXRMZW5ndGgoYXJyYXkpO1xyXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcclxuICAgICAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XHJcbiAgICAgIGlmIChpdGVyYXRlZShhcnJheVttaWRdKSA8IHZhbHVlKSBsb3cgPSBtaWQgKyAxOyBlbHNlIGhpZ2ggPSBtaWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbG93O1xyXG4gIH07XHJcblxyXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGluZGV4T2YgYW5kIGxhc3RJbmRleE9mIGZ1bmN0aW9uc1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZUluZGV4RmluZGVyKGRpciwgcHJlZGljYXRlRmluZCwgc29ydGVkSW5kZXgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XHJcbiAgICAgIHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcclxuICAgICAgaWYgKHR5cGVvZiBpZHggPT0gJ251bWJlcicpIHtcclxuICAgICAgICBpZiAoZGlyID4gMCkge1xyXG4gICAgICAgICAgICBpID0gaWR4ID49IDAgPyBpZHggOiBNYXRoLm1heChpZHggKyBsZW5ndGgsIGkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHNvcnRlZEluZGV4ICYmIGlkeCAmJiBsZW5ndGgpIHtcclxuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5W2lkeF0gPT09IGl0ZW0gPyBpZHggOiAtMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xyXG4gICAgICAgIGlkeCA9IHByZWRpY2F0ZUZpbmQoc2xpY2UuY2FsbChhcnJheSwgaSwgbGVuZ3RoKSwgXy5pc05hTik7XHJcbiAgICAgICAgcmV0dXJuIGlkeCA+PSAwID8gaWR4ICsgaSA6IC0xO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAoaWR4ID0gZGlyID4gMCA/IGkgOiBsZW5ndGggLSAxOyBpZHggPj0gMCAmJiBpZHggPCBsZW5ndGg7IGlkeCArPSBkaXIpIHtcclxuICAgICAgICBpZiAoYXJyYXlbaWR4XSA9PT0gaXRlbSkgcmV0dXJuIGlkeDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluIGFuIGFycmF5LFxyXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXHJcbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXHJcbiAgLy8gZm9yICoqaXNTb3J0ZWQqKiB0byB1c2UgYmluYXJ5IHNlYXJjaC5cclxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XHJcbiAgXy5sYXN0SW5kZXhPZiA9IGNyZWF0ZUluZGV4RmluZGVyKC0xLCBfLmZpbmRMYXN0SW5kZXgpO1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXHJcbiAgLy8gdGhlIG5hdGl2ZSBQeXRob24gYHJhbmdlKClgIGZ1bmN0aW9uLiBTZWVcclxuICAvLyBbdGhlIFB5dGhvbiBkb2N1bWVudGF0aW9uXShodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjcmFuZ2UpLlxyXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xyXG4gICAgaWYgKHN0b3AgPT0gbnVsbCkge1xyXG4gICAgICBzdG9wID0gc3RhcnQgfHwgMDtcclxuICAgICAgc3RhcnQgPSAwO1xyXG4gICAgfVxyXG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcclxuXHJcbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xyXG4gICAgdmFyIHJhbmdlID0gQXJyYXkobGVuZ3RoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrLCBzdGFydCArPSBzdGVwKSB7XHJcbiAgICAgIHJhbmdlW2lkeF0gPSBzdGFydDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmFuZ2U7XHJcbiAgfTtcclxuXHJcbiAgLy8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvLyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZXhlY3V0ZSBhIGZ1bmN0aW9uIGFzIGEgY29uc3RydWN0b3JcclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcclxuICB2YXIgZXhlY3V0ZUJvdW5kID0gZnVuY3Rpb24oc291cmNlRnVuYywgYm91bmRGdW5jLCBjb250ZXh0LCBjYWxsaW5nQ29udGV4dCwgYXJncykge1xyXG4gICAgaWYgKCEoY2FsbGluZ0NvbnRleHQgaW5zdGFuY2VvZiBib3VuZEZ1bmMpKSByZXR1cm4gc291cmNlRnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XHJcbiAgICB2YXIgcmVzdWx0ID0gc291cmNlRnVuYy5hcHBseShzZWxmLCBhcmdzKTtcclxuICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XHJcbiAgICByZXR1cm4gc2VsZjtcclxuICB9O1xyXG5cclxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcclxuICAvLyBvcHRpb25hbGx5KS4gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYEZ1bmN0aW9uLmJpbmRgIGlmXHJcbiAgLy8gYXZhaWxhYmxlLlxyXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcclxuICAgIGlmIChuYXRpdmVCaW5kICYmIGZ1bmMuYmluZCA9PT0gbmF0aXZlQmluZCkgcmV0dXJuIG5hdGl2ZUJpbmQuYXBwbHkoZnVuYywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb24nKTtcclxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIGNvbnRleHQsIHRoaXMsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBib3VuZDtcclxuICB9O1xyXG5cclxuICAvLyBQYXJ0aWFsbHkgYXBwbHkgYSBmdW5jdGlvbiBieSBjcmVhdGluZyBhIHZlcnNpb24gdGhhdCBoYXMgaGFkIHNvbWUgb2YgaXRzXHJcbiAgLy8gYXJndW1lbnRzIHByZS1maWxsZWQsIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGR5bmFtaWMgYHRoaXNgIGNvbnRleHQuIF8gYWN0c1xyXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cclxuICBfLnBhcnRpYWwgPSBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICB2YXIgYm91bmRBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwb3NpdGlvbiA9IDAsIGxlbmd0aCA9IGJvdW5kQXJncy5sZW5ndGg7XHJcbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFyZ3NbaV0gPSBib3VuZEFyZ3NbaV0gPT09IF8gPyBhcmd1bWVudHNbcG9zaXRpb24rK10gOiBib3VuZEFyZ3NbaV07XHJcbiAgICAgIH1cclxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XHJcbiAgICAgIHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIHRoaXMsIHRoaXMsIGFyZ3MpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBib3VuZDtcclxuICB9O1xyXG5cclxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcclxuICAvLyBhcmUgdGhlIG1ldGhvZCBuYW1lcyB0byBiZSBib3VuZC4gVXNlZnVsIGZvciBlbnN1cmluZyB0aGF0IGFsbCBjYWxsYmFja3NcclxuICAvLyBkZWZpbmVkIG9uIGFuIG9iamVjdCBiZWxvbmcgdG8gaXQuXHJcbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICB2YXIgaSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCwga2V5O1xyXG4gICAgaWYgKGxlbmd0aCA8PSAxKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXMnKTtcclxuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBrZXkgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgIG9ialtrZXldID0gXy5iaW5kKG9ialtrZXldLCBvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9O1xyXG5cclxuICAvLyBNZW1vaXplIGFuIGV4cGVuc2l2ZSBmdW5jdGlvbiBieSBzdG9yaW5nIGl0cyByZXN1bHRzLlxyXG4gIF8ubWVtb2l6ZSA9IGZ1bmN0aW9uKGZ1bmMsIGhhc2hlcikge1xyXG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgdmFyIGNhY2hlID0gbWVtb2l6ZS5jYWNoZTtcclxuICAgICAgdmFyIGFkZHJlc3MgPSAnJyArIChoYXNoZXIgPyBoYXNoZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGtleSk7XHJcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgcmV0dXJuIGNhY2hlW2FkZHJlc3NdO1xyXG4gICAgfTtcclxuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcclxuICAgIHJldHVybiBtZW1vaXplO1xyXG4gIH07XHJcblxyXG4gIC8vIERlbGF5cyBhIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gY2FsbHNcclxuICAvLyBpdCB3aXRoIHRoZSBhcmd1bWVudHMgc3VwcGxpZWQuXHJcbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcclxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICB9LCB3YWl0KTtcclxuICB9O1xyXG5cclxuICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXNcclxuICAvLyBjbGVhcmVkLlxyXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XHJcblxyXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxyXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxyXG4gIC8vIGFzIG11Y2ggYXMgaXQgY2FuLCB3aXRob3V0IGV2ZXIgZ29pbmcgbW9yZSB0aGFuIG9uY2UgcGVyIGB3YWl0YCBkdXJhdGlvbjtcclxuICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xyXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxyXG4gIF8udGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XHJcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xyXG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgdmFyIHByZXZpb3VzID0gMDtcclxuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xyXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBfLm5vdygpO1xyXG4gICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbm93ID0gXy5ub3coKTtcclxuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcclxuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xyXG4gICAgICBjb250ZXh0ID0gdGhpcztcclxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXZpb3VzID0gbm93O1xyXG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcclxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XHJcbiAgLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxyXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxyXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXHJcbiAgXy5kZWJvdW5jZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xyXG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xyXG5cclxuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbGFzdCA9IF8ubm93KCkgLSB0aW1lc3RhbXA7XHJcblxyXG4gICAgICBpZiAobGFzdCA8IHdhaXQgJiYgbGFzdCA+PSAwKSB7XHJcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xyXG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuICAgICAgaWYgKCF0aW1lb3V0KSB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XHJcbiAgICAgIGlmIChjYWxsTm93KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxyXG4gIC8vIGFsbG93aW5nIHlvdSB0byBhZGp1c3QgYXJndW1lbnRzLCBydW4gY29kZSBiZWZvcmUgYW5kIGFmdGVyLCBhbmRcclxuICAvLyBjb25kaXRpb25hbGx5IGV4ZWN1dGUgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcclxuICAgIHJldHVybiBfLnBhcnRpYWwod3JhcHBlciwgZnVuYyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJucyBhIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkLWluIHByZWRpY2F0ZS5cclxuICBfLm5lZ2F0ZSA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBpcyB0aGUgY29tcG9zaXRpb24gb2YgYSBsaXN0IG9mIGZ1bmN0aW9ucywgZWFjaFxyXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXHJcbiAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGkgPSBzdGFydDtcclxuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIHdoaWxlIChpLS0pIHJlc3VsdCA9IGFyZ3NbaV0uY2FsbCh0aGlzLCByZXN1bHQpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cclxuICBfLmFmdGVyID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXHJcbiAgXy5iZWZvcmUgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xyXG4gICAgdmFyIG1lbW87XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICgtLXRpbWVzID4gMCkge1xyXG4gICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRpbWVzIDw9IDEpIGZ1bmMgPSBudWxsO1xyXG4gICAgICByZXR1cm4gbWVtbztcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XHJcbiAgLy8gb2Z0ZW4geW91IGNhbGwgaXQuIFVzZWZ1bCBmb3IgbGF6eSBpbml0aWFsaXphdGlvbi5cclxuICBfLm9uY2UgPSBfLnBhcnRpYWwoXy5iZWZvcmUsIDIpO1xyXG5cclxuICAvLyBPYmplY3QgRnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvLyBLZXlzIGluIElFIDwgOSB0aGF0IHdvbid0IGJlIGl0ZXJhdGVkIGJ5IGBmb3Iga2V5IGluIC4uLmAgYW5kIHRodXMgbWlzc2VkLlxyXG4gIHZhciBoYXNFbnVtQnVnID0gIXt0b1N0cmluZzogbnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XHJcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICdoYXNPd25Qcm9wZXJ0eScsICd0b0xvY2FsZVN0cmluZyddO1xyXG5cclxuICBmdW5jdGlvbiBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cykge1xyXG4gICAgdmFyIG5vbkVudW1JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoO1xyXG4gICAgdmFyIGNvbnN0cnVjdG9yID0gb2JqLmNvbnN0cnVjdG9yO1xyXG4gICAgdmFyIHByb3RvID0gKF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlKSB8fCBPYmpQcm90bztcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3RvciBpcyBhIHNwZWNpYWwgY2FzZS5cclxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcclxuICAgIGlmIChfLmhhcyhvYmosIHByb3ApICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSBrZXlzLnB1c2gocHJvcCk7XHJcblxyXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xyXG4gICAgICBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25vbkVudW1JZHhdO1xyXG4gICAgICBpZiAocHJvcCBpbiBvYmogJiYgb2JqW3Byb3BdICE9PSBwcm90b1twcm9wXSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkge1xyXG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxyXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcclxuICBfLmtleXMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XHJcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcclxuICAgIHZhciBrZXlzID0gW107XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcclxuICAgIC8vIEFoZW0sIElFIDwgOS5cclxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XHJcbiAgICByZXR1cm4ga2V5cztcclxuICB9O1xyXG5cclxuICAvLyBSZXRyaWV2ZSBhbGwgdGhlIHByb3BlcnR5IG5hbWVzIG9mIGFuIG9iamVjdC5cclxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XHJcbiAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XHJcbiAgICAvLyBBaGVtLCBJRSA8IDkuXHJcbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xyXG4gICAgcmV0dXJuIGtleXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxyXG4gIF8udmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xyXG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xyXG4gICAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50IG9mIHRoZSBvYmplY3RcclxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdFxyXG4gIF8ubWFwT2JqZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICB2YXIga2V5cyA9ICBfLmtleXMob2JqKSxcclxuICAgICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoLFxyXG4gICAgICAgICAgcmVzdWx0cyA9IHt9LFxyXG4gICAgICAgICAgY3VycmVudEtleTtcclxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGN1cnJlbnRLZXkgPSBrZXlzW2luZGV4XTtcclxuICAgICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH07XHJcblxyXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxyXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XHJcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XHJcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBwYWlyc1tpXSA9IFtrZXlzW2ldLCBvYmpba2V5c1tpXV1dO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhaXJzO1xyXG4gIH07XHJcblxyXG4gIC8vIEludmVydCB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIGFuIG9iamVjdC4gVGhlIHZhbHVlcyBtdXN0IGJlIHNlcmlhbGl6YWJsZS5cclxuICBfLmludmVydCA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJuIGEgc29ydGVkIGxpc3Qgb2YgdGhlIGZ1bmN0aW9uIG5hbWVzIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0LlxyXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXHJcbiAgXy5mdW5jdGlvbnMgPSBfLm1ldGhvZHMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHZhciBuYW1lcyA9IFtdO1xyXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcclxuICB9O1xyXG5cclxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cclxuICBfLmV4dGVuZCA9IGNyZWF0ZUFzc2lnbmVyKF8uYWxsS2V5cyk7XHJcblxyXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXHJcbiAgLy8gKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24pXHJcbiAgXy5leHRlbmRPd24gPSBfLmFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKF8ua2V5cyk7XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGtleSBvbiBhbiBvYmplY3QgdGhhdCBwYXNzZXMgYSBwcmVkaWNhdGUgdGVzdFxyXG4gIF8uZmluZEtleSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xyXG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKSwga2V5O1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAga2V5ID0ga2V5c1tpXTtcclxuICAgICAgaWYgKHByZWRpY2F0ZShvYmpba2V5XSwga2V5LCBvYmopKSByZXR1cm4ga2V5O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXHJcbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqZWN0LCBvaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuICAgIHZhciByZXN1bHQgPSB7fSwgb2JqID0gb2JqZWN0LCBpdGVyYXRlZSwga2V5cztcclxuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcclxuICAgIGlmIChfLmlzRnVuY3Rpb24ob2l0ZXJhdGVlKSkge1xyXG4gICAgICBrZXlzID0gXy5hbGxLZXlzKG9iaik7XHJcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihvaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAga2V5cyA9IGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpO1xyXG4gICAgICBpdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iaikgeyByZXR1cm4ga2V5IGluIG9iajsgfTtcclxuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcclxuICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XHJcbiAgICAgIGlmIChpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmopKSByZXN1bHRba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGJsYWNrbGlzdGVkIHByb3BlcnRpZXMuXHJcbiAgXy5vbWl0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcclxuICAgICAgaXRlcmF0ZWUgPSBfLm5lZ2F0ZShpdGVyYXRlZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xyXG4gICAgICBpdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gIV8uY29udGFpbnMoa2V5cywga2V5KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBfLnBpY2sob2JqLCBpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cclxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcclxuXHJcbiAgLy8gQ3JlYXRlcyBhbiBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoZSBnaXZlbiBwcm90b3R5cGUgb2JqZWN0LlxyXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXHJcbiAgLy8gY3JlYXRlZCBvYmplY3QuXHJcbiAgXy5jcmVhdGUgPSBmdW5jdGlvbihwcm90b3R5cGUsIHByb3BzKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgaWYgKHByb3BzKSBfLmV4dGVuZE93bihyZXN1bHQsIHByb3BzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxyXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xyXG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcclxuICB9O1xyXG5cclxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXHJcbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXHJcbiAgLy8gb3JkZXIgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGludGVybWVkaWF0ZSByZXN1bHRzIHdpdGhpbiB0aGUgY2hhaW4uXHJcbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XHJcbiAgICBpbnRlcmNlcHRvcihvYmopO1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm5zIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZiBga2V5OnZhbHVlYCBwYWlycy5cclxuICBfLmlzTWF0Y2ggPSBmdW5jdGlvbihvYmplY3QsIGF0dHJzKSB7XHJcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xyXG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gIWxlbmd0aDtcclxuICAgIHZhciBvYmogPSBPYmplY3Qob2JqZWN0KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGtleSA9IGtleXNbaV07XHJcbiAgICAgIGlmIChhdHRyc1trZXldICE9PSBvYmpba2V5XSB8fCAhKGtleSBpbiBvYmopKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cclxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xyXG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxyXG4gICAgLy8gU2VlIHRoZSBbSGFybW9ueSBgZWdhbGAgcHJvcG9zYWxdKGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWhhcm1vbnk6ZWdhbCkuXHJcbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xyXG4gICAgLy8gQSBzdHJpY3QgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgbnVsbCA9PSB1bmRlZmluZWRgLlxyXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBhID09PSBiO1xyXG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXHJcbiAgICBpZiAoYSBpbnN0YW5jZW9mIF8pIGEgPSBhLl93cmFwcGVkO1xyXG4gICAgaWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcclxuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXHJcbiAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcclxuICAgIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpIHJldHVybiBmYWxzZTtcclxuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XHJcbiAgICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxyXG4gICAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxyXG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxyXG4gICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxyXG4gICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXHJcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxyXG4gICAgICAgIHJldHVybiAnJyArIGEgPT09ICcnICsgYjtcclxuICAgICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcclxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxyXG4gICAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOXHJcbiAgICAgICAgaWYgKCthICE9PSArYSkgcmV0dXJuICtiICE9PSArYjtcclxuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxyXG4gICAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XHJcbiAgICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxyXG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcclxuICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXHJcbiAgICAgICAgLy8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xyXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cclxuICAgICAgICByZXR1cm4gK2EgPT09ICtiO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICBpZiAoIWFyZUFycmF5cykge1xyXG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3RgcyBvciBgQXJyYXlgc1xyXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxyXG4gICAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XHJcbiAgICAgIGlmIChhQ3RvciAhPT0gYkN0b3IgJiYgIShfLmlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoJ2NvbnN0cnVjdG9yJyBpbiBhICYmICdjb25zdHJ1Y3RvcicgaW4gYikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcclxuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxyXG5cclxuICAgIC8vIEluaXRpYWxpemluZyBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cclxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cclxuICAgIGFTdGFjayA9IGFTdGFjayB8fCBbXTtcclxuICAgIGJTdGFjayA9IGJTdGFjayB8fCBbXTtcclxuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xyXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxyXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXHJcbiAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSkgcmV0dXJuIGJTdGFja1tsZW5ndGhdID09PSBiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cclxuICAgIGFTdGFjay5wdXNoKGEpO1xyXG4gICAgYlN0YWNrLnB1c2goYik7XHJcblxyXG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXHJcbiAgICBpZiAoYXJlQXJyYXlzKSB7XHJcbiAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxyXG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcclxuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cclxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxyXG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhhKSwga2V5O1xyXG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxyXG4gICAgICBpZiAoXy5rZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxyXG4gICAgICAgIGtleSA9IGtleXNbbGVuZ3RoXTtcclxuICAgICAgICBpZiAoIShfLmhhcyhiLCBrZXkpICYmIGVxKGFba2V5XSwgYltrZXldLCBhU3RhY2ssIGJTdGFjaykpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFJlbW92ZSB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxyXG4gICAgYVN0YWNrLnBvcCgpO1xyXG4gICAgYlN0YWNrLnBvcCgpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLy8gUGVyZm9ybSBhIGRlZXAgY29tcGFyaXNvbiB0byBjaGVjayBpZiB0d28gb2JqZWN0cyBhcmUgZXF1YWwuXHJcbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgcmV0dXJuIGVxKGEsIGIpO1xyXG4gIH07XHJcblxyXG4gIC8vIElzIGEgZ2l2ZW4gYXJyYXksIHN0cmluZywgb3Igb2JqZWN0IGVtcHR5P1xyXG4gIC8vIEFuIFwiZW1wdHlcIiBvYmplY3QgaGFzIG5vIGVudW1lcmFibGUgb3duLXByb3BlcnRpZXMuXHJcbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikgJiYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSB8fCBfLmlzQXJndW1lbnRzKG9iaikpKSByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMDtcclxuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XHJcbiAgfTtcclxuXHJcbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xyXG4gIF8uaXNFbGVtZW50ID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cclxuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxyXG4gIF8uaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XHJcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xyXG4gIH07XHJcblxyXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgYW4gb2JqZWN0P1xyXG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcclxuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xyXG4gIH07XHJcblxyXG4gIC8vIEFkZCBzb21lIGlzVHlwZSBtZXRob2RzOiBpc0FyZ3VtZW50cywgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0RhdGUsIGlzUmVnRXhwLCBpc0Vycm9yLlxyXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIF9bJ2lzJyArIG5hbWVdID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0ICcgKyBuYW1lICsgJ10nO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSA8IDkpLCB3aGVyZVxyXG4gIC8vIHRoZXJlIGlzbid0IGFueSBpbnNwZWN0YWJsZSBcIkFyZ3VtZW50c1wiIHR5cGUuXHJcbiAgaWYgKCFfLmlzQXJndW1lbnRzKGFyZ3VtZW50cykpIHtcclxuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgcmV0dXJuIF8uaGFzKG9iaiwgJ2NhbGxlZScpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIE9wdGltaXplIGBpc0Z1bmN0aW9uYCBpZiBhcHByb3ByaWF0ZS4gV29yayBhcm91bmQgc29tZSB0eXBlb2YgYnVncyBpbiBvbGQgdjgsXHJcbiAgLy8gSUUgMTEgKCMxNjIxKSwgYW5kIGluIFNhZmFyaSA4ICgjMTkyOSkuXHJcbiAgaWYgKHR5cGVvZiAvLi8gIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSW50OEFycmF5ICE9ICdvYmplY3QnKSB7XHJcbiAgICBfLmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XHJcbiAgXy5pc0Zpbml0ZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxyXG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHJldHVybiBfLmlzTnVtYmVyKG9iaikgJiYgb2JqICE9PSArb2JqO1xyXG4gIH07XHJcblxyXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBib29sZWFuP1xyXG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XHJcbiAgfTtcclxuXHJcbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xyXG4gIF8uaXNOdWxsID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xyXG4gIH07XHJcblxyXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xyXG4gIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHJldHVybiBvYmogPT09IHZvaWQgMDtcclxuICB9O1xyXG5cclxuICAvLyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHByb3BlcnR5IGRpcmVjdGx5XHJcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cclxuICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XHJcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvLyBSdW4gVW5kZXJzY29yZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgX2AgdmFyaWFibGUgdG8gaXRzXHJcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxyXG4gIF8ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcm9vdC5fID0gcHJldmlvdXNVbmRlcnNjb3JlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cclxuICBfLmlkZW50aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9O1xyXG5cclxuICAvLyBQcmVkaWNhdGUtZ2VuZXJhdGluZyBmdW5jdGlvbnMuIE9mdGVuIHVzZWZ1bCBvdXRzaWRlIG9mIFVuZGVyc2NvcmUuXHJcbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuICBfLnByb3BlcnR5ID0gcHJvcGVydHk7XHJcblxyXG4gIC8vIEdlbmVyYXRlcyBhIGZ1bmN0aW9uIGZvciBhIGdpdmVuIG9iamVjdCB0aGF0IHJldHVybnMgYSBnaXZlbiBwcm9wZXJ0eS5cclxuICBfLnByb3BlcnR5T2YgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uKCl7fSA6IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICByZXR1cm4gb2JqW2tleV07XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZlxyXG4gIC8vIGBrZXk6dmFsdWVgIHBhaXJzLlxyXG4gIF8ubWF0Y2hlciA9IF8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGF0dHJzKSB7XHJcbiAgICBhdHRycyA9IF8uZXh0ZW5kT3duKHt9LCBhdHRycyk7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgIHJldHVybiBfLmlzTWF0Y2gob2JqLCBhdHRycyk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIFJ1biBhIGZ1bmN0aW9uICoqbioqIHRpbWVzLlxyXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xyXG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xyXG4gICAgcmV0dXJuIGFjY3VtO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXHJcbiAgXy5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgaWYgKG1heCA9PSBudWxsKSB7XHJcbiAgICAgIG1heCA9IG1pbjtcclxuICAgICAgbWluID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xyXG4gIH07XHJcblxyXG4gIC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cclxuICBfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gIH07XHJcblxyXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxyXG4gIHZhciBlc2NhcGVNYXAgPSB7XHJcbiAgICAnJic6ICcmYW1wOycsXHJcbiAgICAnPCc6ICcmbHQ7JyxcclxuICAgICc+JzogJyZndDsnLFxyXG4gICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICBcIidcIjogJyYjeDI3OycsXHJcbiAgICAnYCc6ICcmI3g2MDsnXHJcbiAgfTtcclxuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xyXG5cclxuICAvLyBGdW5jdGlvbnMgZm9yIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nIHN0cmluZ3MgdG8vZnJvbSBIVE1MIGludGVycG9sYXRpb24uXHJcbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcclxuICAgIHZhciBlc2NhcGVyID0gZnVuY3Rpb24obWF0Y2gpIHtcclxuICAgICAgcmV0dXJuIG1hcFttYXRjaF07XHJcbiAgICB9O1xyXG4gICAgLy8gUmVnZXhlcyBmb3IgaWRlbnRpZnlpbmcgYSBrZXkgdGhhdCBuZWVkcyB0byBiZSBlc2NhcGVkXHJcbiAgICB2YXIgc291cmNlID0gJyg/OicgKyBfLmtleXMobWFwKS5qb2luKCd8JykgKyAnKSc7XHJcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xyXG4gICAgdmFyIHJlcGxhY2VSZWdleHAgPSBSZWdFeHAoc291cmNlLCAnZycpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xyXG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XHJcbiAgICAgIHJldHVybiB0ZXN0UmVnZXhwLnRlc3Qoc3RyaW5nKSA/IHN0cmluZy5yZXBsYWNlKHJlcGxhY2VSZWdleHAsIGVzY2FwZXIpIDogc3RyaW5nO1xyXG4gICAgfTtcclxuICB9O1xyXG4gIF8uZXNjYXBlID0gY3JlYXRlRXNjYXBlcihlc2NhcGVNYXApO1xyXG4gIF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcclxuXHJcbiAgLy8gSWYgdGhlIHZhbHVlIG9mIHRoZSBuYW1lZCBgcHJvcGVydHlgIGlzIGEgZnVuY3Rpb24gdGhlbiBpbnZva2UgaXQgd2l0aCB0aGVcclxuICAvLyBgb2JqZWN0YCBhcyBjb250ZXh0OyBvdGhlcndpc2UsIHJldHVybiBpdC5cclxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIGZhbGxiYWNrKSB7XHJcbiAgICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHZvaWQgMCA6IG9iamVjdFtwcm9wZXJ0eV07XHJcbiAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xyXG4gICAgICB2YWx1ZSA9IGZhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF8uaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZS5jYWxsKG9iamVjdCkgOiB2YWx1ZTtcclxuICB9O1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxyXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXHJcbiAgdmFyIGlkQ291bnRlciA9IDA7XHJcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xyXG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcclxuICAgIHJldHVybiBwcmVmaXggPyBwcmVmaXggKyBpZCA6IGlkO1xyXG4gIH07XHJcblxyXG4gIC8vIEJ5IGRlZmF1bHQsIFVuZGVyc2NvcmUgdXNlcyBFUkItc3R5bGUgdGVtcGxhdGUgZGVsaW1pdGVycywgY2hhbmdlIHRoZVxyXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cclxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XHJcbiAgICBldmFsdWF0ZSAgICA6IC88JShbXFxzXFxTXSs/KSU+L2csXHJcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxyXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xyXG4gIH07XHJcblxyXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cclxuICAvLyBpbnRlcnBvbGF0aW9uLCBldmFsdWF0aW9uIG9yIGVzY2FwaW5nIHJlZ2V4LCB3ZSBuZWVkIG9uZSB0aGF0IGlzXHJcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXHJcbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XHJcblxyXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXHJcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXHJcbiAgdmFyIGVzY2FwZXMgPSB7XHJcbiAgICBcIidcIjogICAgICBcIidcIixcclxuICAgICdcXFxcJzogICAgICdcXFxcJyxcclxuICAgICdcXHInOiAgICAgJ3InLFxyXG4gICAgJ1xcbic6ICAgICAnbicsXHJcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXHJcbiAgICAnXFx1MjAyOSc6ICd1MjAyOSdcclxuICB9O1xyXG5cclxuICB2YXIgZXNjYXBlciA9IC9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZztcclxuXHJcbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdO1xyXG4gIH07XHJcblxyXG4gIC8vIEphdmFTY3JpcHQgbWljcm8tdGVtcGxhdGluZywgc2ltaWxhciB0byBKb2huIFJlc2lnJ3MgaW1wbGVtZW50YXRpb24uXHJcbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxyXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxyXG4gIC8vIE5COiBgb2xkU2V0dGluZ3NgIG9ubHkgZXhpc3RzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cclxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MsIG9sZFNldHRpbmdzKSB7XHJcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xyXG4gICAgc2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcclxuXHJcbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cclxuICAgIHZhciBtYXRjaGVyID0gUmVnRXhwKFtcclxuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXHJcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXHJcbiAgICAgIChzZXR0aW5ncy5ldmFsdWF0ZSB8fCBub01hdGNoKS5zb3VyY2VcclxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcclxuXHJcbiAgICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxyXG4gICAgdmFyIGluZGV4ID0gMDtcclxuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xyXG4gICAgdGV4dC5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGUsIGludGVycG9sYXRlLCBldmFsdWF0ZSwgb2Zmc2V0KSB7XHJcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UoZXNjYXBlciwgZXNjYXBlQ2hhcik7XHJcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKGVzY2FwZSkge1xyXG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoaW50ZXJwb2xhdGUpIHtcclxuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcclxuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xyXG4gICAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZSArIFwiXFxuX19wKz0nXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkb2JlIFZNcyBuZWVkIHRoZSBtYXRjaCByZXR1cm5lZCB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IG9mZmVzdC5cclxuICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgfSk7XHJcbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xyXG5cclxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXHJcbiAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlKSBzb3VyY2UgPSAnd2l0aChvYmp8fHt9KXtcXG4nICsgc291cmNlICsgJ31cXG4nO1xyXG5cclxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcclxuICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcclxuICAgICAgc291cmNlICsgJ3JldHVybiBfX3A7XFxuJztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xyXG4gICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXHJcbiAgICB2YXIgYXJndW1lbnQgPSBzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJztcclxuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgYXJndW1lbnQgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICB9O1xyXG5cclxuICAvLyBBZGQgYSBcImNoYWluXCIgZnVuY3Rpb24uIFN0YXJ0IGNoYWluaW5nIGEgd3JhcHBlZCBVbmRlcnNjb3JlIG9iamVjdC5cclxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XHJcbiAgICBpbnN0YW5jZS5fY2hhaW4gPSB0cnVlO1xyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gIH07XHJcblxyXG4gIC8vIE9PUFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIElmIFVuZGVyc2NvcmUgaXMgY2FsbGVkIGFzIGEgZnVuY3Rpb24sIGl0IHJldHVybnMgYSB3cmFwcGVkIG9iamVjdCB0aGF0XHJcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcclxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxyXG5cclxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXHJcbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKGluc3RhbmNlLCBvYmopIHtcclxuICAgIHJldHVybiBpbnN0YW5jZS5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcclxuICB9O1xyXG5cclxuICAvLyBBZGQgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9ucyB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXHJcbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xyXG4gICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xyXG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQWRkIGFsbCBvZiB0aGUgVW5kZXJzY29yZSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIgb2JqZWN0LlxyXG4gIF8ubWl4aW4oXyk7XHJcblxyXG4gIC8vIEFkZCBhbGwgbXV0YXRvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXHJcbiAgXy5lYWNoKFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xyXG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XHJcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XHJcbiAgICAgIGlmICgobmFtZSA9PT0gJ3NoaWZ0JyB8fCBuYW1lID09PSAnc3BsaWNlJykgJiYgb2JqLmxlbmd0aCA9PT0gMCkgZGVsZXRlIG9ialswXTtcclxuICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBvYmopO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXHJcbiAgXy5lYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24obmFtZSkge1xyXG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XHJcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxyXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcclxuICB9O1xyXG5cclxuICAvLyBQcm92aWRlIHVud3JhcHBpbmcgcHJveHkgZm9yIHNvbWUgbWV0aG9kcyB1c2VkIGluIGVuZ2luZSBvcGVyYXRpb25zXHJcbiAgLy8gc3VjaCBhcyBhcml0aG1ldGljIGFuZCBKU09OIHN0cmluZ2lmaWNhdGlvbi5cclxuICBfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XHJcblxyXG4gIF8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gJycgKyB0aGlzLl93cmFwcGVkO1xyXG4gIH07XHJcblxyXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcclxuICAvLyB0aGF0IG1heSBub3QgZW5mb3JjZSBuZXh0LXR1cm4gc2VtYW50aWNzIG9uIG1vZHVsZXMuIEV2ZW4gdGhvdWdoIGdlbmVyYWxcclxuICAvLyBwcmFjdGljZSBmb3IgQU1EIHJlZ2lzdHJhdGlvbiBpcyB0byBiZSBhbm9ueW1vdXMsIHVuZGVyc2NvcmUgcmVnaXN0ZXJzXHJcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcclxuICAvLyBwb3B1bGFyIGVub3VnaCB0byBiZSBidW5kbGVkIGluIGEgdGhpcmQgcGFydHkgbGliLCBidXQgbm90IGJlIHBhcnQgb2ZcclxuICAvLyBhbiBBTUQgbG9hZCByZXF1ZXN0LiBUaG9zZSBjYXNlcyBjb3VsZCBnZW5lcmF0ZSBhbiBlcnJvciB3aGVuIGFuXHJcbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKCd1bmRlcnNjb3JlJywgW10sIGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gXztcclxuICAgIH0pO1xyXG4gIH1cclxufS5jYWxsKHRoaXMpKTtcclxuIl19