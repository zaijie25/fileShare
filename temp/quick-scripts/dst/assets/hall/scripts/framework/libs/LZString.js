
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/LZString.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d7127+nc1B9rUbtjSPn4Su', 'LZString');
// hall/scripts/framework/libs/LZString.js

"use strict";

// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = function () {
  // private property
  var f = String.fromCharCode;
  var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var baseReverseDic = {};

  function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
      baseReverseDic[alphabet] = {};

      for (var i = 0; i < alphabet.length; i++) {
        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
    }

    return baseReverseDic[alphabet][character];
  }

  var LZString = {
    compressToBase64: function compressToBase64(input) {
      if (input == null) return "";

      var res = LZString._compress(input, 6, function (a) {
        return keyStrBase64.charAt(a);
      });

      switch (res.length % 4) {
        // To produce valid Base64
        default: // When could this happen ?

        case 0:
          return res;

        case 1:
          return res + "===";

        case 2:
          return res + "==";

        case 3:
          return res + "=";
      }
    },
    decompressFromBase64: function decompressFromBase64(input) {
      if (input == null) return "";
      if (input == "") return null;
      return LZString._decompress(input.length, 32, function (index) {
        return getBaseValue(keyStrBase64, input.charAt(index));
      });
    },
    compressToUTF16: function compressToUTF16(input) {
      if (input == null) return "";
      return LZString._compress(input, 15, function (a) {
        return f(a + 32);
      }) + " ";
    },
    decompressFromUTF16: function decompressFromUTF16(compressed) {
      if (compressed == null) return "";
      if (compressed == "") return null;
      return LZString._decompress(compressed.length, 16384, function (index) {
        return compressed.charCodeAt(index) - 32;
      });
    },
    //compress into uint8array (UCS-2 big endian format)
    compressToUint8Array: function compressToUint8Array(uncompressed) {
      var compressed = LZString.compress(uncompressed);
      var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

      for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
        var current_value = compressed.charCodeAt(i);
        buf[i * 2] = current_value >>> 8;
        buf[i * 2 + 1] = current_value % 256;
      }

      return buf;
    },
    //decompress from uint8array (UCS-2 big endian format)
    decompressFromUint8Array: function decompressFromUint8Array(compressed) {
      if (compressed === null || compressed === undefined) {
        return LZString.decompress(compressed);
      } else {
        var buf = new Array(compressed.length / 2); // 2 bytes per character

        for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
          buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));
      }
    },
    //compress into a string that is already URI encoded
    compressToEncodedURIComponent: function compressToEncodedURIComponent(input) {
      if (input == null) return "";
      return LZString._compress(input, 6, function (a) {
        return keyStrUriSafe.charAt(a);
      });
    },
    //decompress from an output of compressToEncodedURIComponent
    decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(input) {
      if (input == null) return "";
      if (input == "") return null;
      input = input.replace(/ /g, "+");
      return LZString._decompress(input.length, 32, function (index) {
        return getBaseValue(keyStrUriSafe, input.charAt(index));
      });
    },
    compress: function compress(uncompressed) {
      return LZString._compress(uncompressed, 16, function (a) {
        return f(a);
      });
    },
    _compress: function _compress(uncompressed, bitsPerChar, getCharFromInt) {
      if (uncompressed == null) return "";
      var i,
          value,
          context_dictionary = {},
          context_dictionaryToCreate = {},
          context_c = "",
          context_wc = "",
          context_w = "",
          context_enlargeIn = 2,
          // Compensate for the first entry which should not count
      context_dictSize = 3,
          context_numBits = 2,
          context_data = [],
          context_data_val = 0,
          context_data_position = 0,
          ii;

      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);

        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;

        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }

              value = context_w.charCodeAt(0);

              for (i = 0; i < 8; i++) {
                context_data_val = context_data_val << 1 | value & 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = value >> 1;
              }
            } else {
              value = 1;

              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = 0;
              }

              value = context_w.charCodeAt(0);

              for (i = 0; i < 16; i++) {
                context_data_val = context_data_val << 1 | value & 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = value >> 1;
              }
            }

            context_enlargeIn--;

            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }

            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];

            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = value >> 1;
            }
          }

          context_enlargeIn--;

          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          } // Add wc to the dictionary.


          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      } // Output the code for w.


      if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }

            value = context_w.charCodeAt(0);

            for (i = 0; i < 8; i++) {
              context_data_val = context_data_val << 1 | value & 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = value >> 1;
            }
          } else {
            value = 1;

            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = 0;
            }

            value = context_w.charCodeAt(0);

            for (i = 0; i < 16; i++) {
              context_data_val = context_data_val << 1 | value & 1;

              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }

              value = value >> 1;
            }
          }

          context_enlargeIn--;

          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }

          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];

          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;

            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }

            value = value >> 1;
          }
        }

        context_enlargeIn--;

        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
      } // Mark the end of the stream


      value = 2;

      for (i = 0; i < context_numBits; i++) {
        context_data_val = context_data_val << 1 | value & 1;

        if (context_data_position == bitsPerChar - 1) {
          context_data_position = 0;
          context_data.push(getCharFromInt(context_data_val));
          context_data_val = 0;
        } else {
          context_data_position++;
        }

        value = value >> 1;
      } // Flush the last char


      while (true) {
        context_data_val = context_data_val << 1;

        if (context_data_position == bitsPerChar - 1) {
          context_data.push(getCharFromInt(context_data_val));
          break;
        } else context_data_position++;
      }

      return context_data.join('');
    },
    decompress: function decompress(compressed) {
      if (compressed == null) return "";
      if (compressed == "") return null;
      return LZString._decompress(compressed.length, 32768, function (index) {
        return compressed.charCodeAt(index);
      });
    },
    _decompress: function _decompress(length, resetValue, getNextValue) {
      var dictionary = [],
          next,
          enlargeIn = 4,
          dictSize = 4,
          numBits = 3,
          entry = "",
          result = [],
          i,
          w,
          bits,
          resb,
          maxpower,
          power,
          c,
          data = {
        val: getNextValue(0),
        position: resetValue,
        index: 1
      };

      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i;
      }

      bits = 0;
      maxpower = Math.pow(2, 2);
      power = 1;

      while (power != maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;

        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }

        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (next = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;

          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          c = f(bits);
          break;

        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;

          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          c = f(bits);
          break;

        case 2:
          return "";
      }

      dictionary[3] = c;
      w = c;
      result.push(c);

      while (true) {
        if (data.index > length) {
          return "";
        }

        bits = 0;
        maxpower = Math.pow(2, numBits);
        power = 1;

        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;

          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }

          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        switch (c = bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;

            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;

              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }

              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;

          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;

            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;

              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }

              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;

          case 2:
            return result.join('');
        }

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }

        if (dictionary[c]) {
          entry = dictionary[c];
        } else {
          if (c === dictSize) {
            entry = w + w.charAt(0);
          } else {
            return null;
          }
        }

        result.push(entry); // Add w+entry[0] to the dictionary.

        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;
        w = entry;

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }
      }
    }
  };
  return LZString;
}();

if (typeof define === 'function' && define.amd) {
  define(function () {
    return LZString;
  });
} else if (typeof module !== 'undefined' && module != null) {
  module.exports = LZString;
} else if (typeof angular !== 'undefined' && angular != null) {
  angular.module('LZString', []).factory('LZString', function () {
    return LZString;
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxMWlN0cmluZy5qcyJdLCJuYW1lcyI6WyJMWlN0cmluZyIsImYiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJrZXlTdHJCYXNlNjQiLCJrZXlTdHJVcmlTYWZlIiwiYmFzZVJldmVyc2VEaWMiLCJnZXRCYXNlVmFsdWUiLCJhbHBoYWJldCIsImNoYXJhY3RlciIsImkiLCJsZW5ndGgiLCJjaGFyQXQiLCJjb21wcmVzc1RvQmFzZTY0IiwiaW5wdXQiLCJyZXMiLCJfY29tcHJlc3MiLCJhIiwiZGVjb21wcmVzc0Zyb21CYXNlNjQiLCJfZGVjb21wcmVzcyIsImluZGV4IiwiY29tcHJlc3NUb1VURjE2IiwiZGVjb21wcmVzc0Zyb21VVEYxNiIsImNvbXByZXNzZWQiLCJjaGFyQ29kZUF0IiwiY29tcHJlc3NUb1VpbnQ4QXJyYXkiLCJ1bmNvbXByZXNzZWQiLCJjb21wcmVzcyIsImJ1ZiIsIlVpbnQ4QXJyYXkiLCJUb3RhbExlbiIsImN1cnJlbnRfdmFsdWUiLCJkZWNvbXByZXNzRnJvbVVpbnQ4QXJyYXkiLCJ1bmRlZmluZWQiLCJkZWNvbXByZXNzIiwiQXJyYXkiLCJyZXN1bHQiLCJmb3JFYWNoIiwiYyIsInB1c2giLCJqb2luIiwiY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnQiLCJkZWNvbXByZXNzRnJvbUVuY29kZWRVUklDb21wb25lbnQiLCJyZXBsYWNlIiwiYml0c1BlckNoYXIiLCJnZXRDaGFyRnJvbUludCIsInZhbHVlIiwiY29udGV4dF9kaWN0aW9uYXJ5IiwiY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGUiLCJjb250ZXh0X2MiLCJjb250ZXh0X3djIiwiY29udGV4dF93IiwiY29udGV4dF9lbmxhcmdlSW4iLCJjb250ZXh0X2RpY3RTaXplIiwiY29udGV4dF9udW1CaXRzIiwiY29udGV4dF9kYXRhIiwiY29udGV4dF9kYXRhX3ZhbCIsImNvbnRleHRfZGF0YV9wb3NpdGlvbiIsImlpIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiTWF0aCIsInBvdyIsInJlc2V0VmFsdWUiLCJnZXROZXh0VmFsdWUiLCJkaWN0aW9uYXJ5IiwibmV4dCIsImVubGFyZ2VJbiIsImRpY3RTaXplIiwibnVtQml0cyIsImVudHJ5IiwidyIsImJpdHMiLCJyZXNiIiwibWF4cG93ZXIiLCJwb3dlciIsImRhdGEiLCJ2YWwiLCJwb3NpdGlvbiIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJhbmd1bGFyIiwiZmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxRQUFRLEdBQUksWUFBVztBQUV2QjtBQUNBLE1BQUlDLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxZQUFmO0FBQ0EsTUFBSUMsWUFBWSxHQUFHLG1FQUFuQjtBQUNBLE1BQUlDLGFBQWEsR0FBRyxtRUFBcEI7QUFDQSxNQUFJQyxjQUFjLEdBQUcsRUFBckI7O0FBRUEsV0FBU0MsWUFBVCxDQUFzQkMsUUFBdEIsRUFBZ0NDLFNBQWhDLEVBQTJDO0FBQ3pDLFFBQUksQ0FBQ0gsY0FBYyxDQUFDRSxRQUFELENBQW5CLEVBQStCO0FBQzdCRixNQUFBQSxjQUFjLENBQUNFLFFBQUQsQ0FBZCxHQUEyQixFQUEzQjs7QUFDQSxXQUFLLElBQUlFLENBQUMsR0FBQyxDQUFYLEVBQWVBLENBQUMsR0FBQ0YsUUFBUSxDQUFDRyxNQUExQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUN0Q0osUUFBQUEsY0FBYyxDQUFDRSxRQUFELENBQWQsQ0FBeUJBLFFBQVEsQ0FBQ0ksTUFBVCxDQUFnQkYsQ0FBaEIsQ0FBekIsSUFBK0NBLENBQS9DO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPSixjQUFjLENBQUNFLFFBQUQsQ0FBZCxDQUF5QkMsU0FBekIsQ0FBUDtBQUNEOztBQUVELE1BQUlULFFB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LE9BQVosQ0FBWjtBQUNBQSxVQUFBQSxPQUFPO0FBQ1I7QUFFRjtBQUNGO0FBaGRZLEdBQWY7QUFrZEUsU0FBT3ZFLFFBQVA7QUFDRCxDQXJlVSxFQUFmOztBQXVlSSxJQUFJLE9BQU9pRixNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxNQUFNLENBQUNDLEdBQTNDLEVBQWdEO0FBQzlDRCxFQUFBQSxNQUFNLENBQUMsWUFBWTtBQUFFLFdBQU9qRixRQUFQO0FBQWtCLEdBQWpDLENBQU47QUFDRCxDQUZELE1BRU8sSUFBSSxPQUFPbUYsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsTUFBTSxJQUFJLElBQS9DLEVBQXNEO0FBQzNEQSxFQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUJwRixRQUFqQjtBQUNELENBRk0sTUFFQSxJQUFJLE9BQU9xRixPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxPQUFPLElBQUksSUFBakQsRUFBd0Q7QUFDN0RBLEVBQUFBLE9BQU8sQ0FBQ0YsTUFBUixDQUFlLFVBQWYsRUFBMkIsRUFBM0IsRUFDQ0csT0FERCxDQUNTLFVBRFQsRUFDcUIsWUFBWTtBQUMvQixXQUFPdEYsUUFBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDEzIFBpZXJveHkgPHBpZXJveHlAcGllcm94eS5uZXQ+XHJcbi8vIFRoaXMgd29yayBpcyBmcmVlLiBZb3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0XHJcbi8vIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgV1RGUEwsIFZlcnNpb24gMlxyXG4vLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgTElDRU5TRS50eHQgb3IgaHR0cDovL3d3dy53dGZwbC5uZXQvXHJcbi8vXHJcbi8vIEZvciBtb3JlIGluZm9ybWF0aW9uLCB0aGUgaG9tZSBwYWdlOlxyXG4vLyBodHRwOi8vcGllcm94eS5uZXQvYmxvZy9wYWdlcy9sei1zdHJpbmcvdGVzdGluZy5odG1sXHJcbi8vXHJcbi8vIExaLWJhc2VkIGNvbXByZXNzaW9uIGFsZ29yaXRobSwgdmVyc2lvbiAxLjQuNFxyXG52YXIgTFpTdHJpbmcgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBwcm9wZXJ0eVxyXG4gICAgdmFyIGYgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xyXG4gICAgdmFyIGtleVN0ckJhc2U2NCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcclxuICAgIHZhciBrZXlTdHJVcmlTYWZlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSstJFwiO1xyXG4gICAgdmFyIGJhc2VSZXZlcnNlRGljID0ge307XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldEJhc2VWYWx1ZShhbHBoYWJldCwgY2hhcmFjdGVyKSB7XHJcbiAgICAgIGlmICghYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdKSB7XHJcbiAgICAgICAgYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaT0wIDsgaTxhbHBoYWJldC5sZW5ndGggOyBpKyspIHtcclxuICAgICAgICAgIGJhc2VSZXZlcnNlRGljW2FscGhhYmV0XVthbHBoYWJldC5jaGFyQXQoaSldID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGJhc2VSZXZlcnNlRGljW2FscGhhYmV0XVtjaGFyYWN0ZXJdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgTFpTdHJpbmcgPSB7XHJcbiAgICAgIGNvbXByZXNzVG9CYXNlNjQgOiBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgdmFyIHJlcyA9IExaU3RyaW5nLl9jb21wcmVzcyhpbnB1dCwgNiwgZnVuY3Rpb24oYSl7cmV0dXJuIGtleVN0ckJhc2U2NC5jaGFyQXQoYSk7fSk7XHJcbiAgICAgICAgc3dpdGNoIChyZXMubGVuZ3RoICUgNCkgeyAvLyBUbyBwcm9kdWNlIHZhbGlkIEJhc2U2NFxyXG4gICAgICAgIGRlZmF1bHQ6IC8vIFdoZW4gY291bGQgdGhpcyBoYXBwZW4gP1xyXG4gICAgICAgIGNhc2UgMCA6IHJldHVybiByZXM7XHJcbiAgICAgICAgY2FzZSAxIDogcmV0dXJuIHJlcytcIj09PVwiO1xyXG4gICAgICAgIGNhc2UgMiA6IHJldHVybiByZXMrXCI9PVwiO1xyXG4gICAgICAgIGNhc2UgMyA6IHJldHVybiByZXMrXCI9XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICAgIGRlY29tcHJlc3NGcm9tQmFzZTY0IDogZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBcIlwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gTFpTdHJpbmcuX2RlY29tcHJlc3MoaW5wdXQubGVuZ3RoLCAzMiwgZnVuY3Rpb24oaW5kZXgpIHsgcmV0dXJuIGdldEJhc2VWYWx1ZShrZXlTdHJCYXNlNjQsIGlucHV0LmNoYXJBdChpbmRleCkpOyB9KTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgICBjb21wcmVzc1RvVVRGMTYgOiBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLl9jb21wcmVzcyhpbnB1dCwgMTUsIGZ1bmN0aW9uKGEpe3JldHVybiBmKGErMzIpO30pICsgXCIgXCI7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgICAgZGVjb21wcmVzc0Zyb21VVEYxNjogZnVuY3Rpb24gKGNvbXByZXNzZWQpIHtcclxuICAgICAgICBpZiAoY29tcHJlc3NlZCA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgICAgICBpZiAoY29tcHJlc3NlZCA9PSBcIlwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gTFpTdHJpbmcuX2RlY29tcHJlc3MoY29tcHJlc3NlZC5sZW5ndGgsIDE2Mzg0LCBmdW5jdGlvbihpbmRleCkgeyByZXR1cm4gY29tcHJlc3NlZC5jaGFyQ29kZUF0KGluZGV4KSAtIDMyOyB9KTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgICAvL2NvbXByZXNzIGludG8gdWludDhhcnJheSAoVUNTLTIgYmlnIGVuZGlhbiBmb3JtYXQpXHJcbiAgICAgIGNvbXByZXNzVG9VaW50OEFycmF5OiBmdW5jdGlvbiAodW5jb21wcmVzc2VkKSB7XHJcbiAgICAgICAgdmFyIGNvbXByZXNzZWQgPSBMWlN0cmluZy5jb21wcmVzcyh1bmNvbXByZXNzZWQpO1xyXG4gICAgICAgIHZhciBidWY9bmV3IFVpbnQ4QXJyYXkoY29tcHJlc3NlZC5sZW5ndGgqMik7IC8vIDIgYnl0ZXMgcGVyIGNoYXJhY3RlclxyXG4gICAgXHJcbiAgICAgICAgZm9yICh2YXIgaT0wLCBUb3RhbExlbj1jb21wcmVzc2VkLmxlbmd0aDsgaTxUb3RhbExlbjsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgY3VycmVudF92YWx1ZSA9IGNvbXByZXNzZWQuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgIGJ1ZltpKjJdID0gY3VycmVudF92YWx1ZSA+Pj4gODtcclxuICAgICAgICAgIGJ1ZltpKjIrMV0gPSBjdXJyZW50X3ZhbHVlICUgMjU2O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICAgIC8vZGVjb21wcmVzcyBmcm9tIHVpbnQ4YXJyYXkgKFVDUy0yIGJpZyBlbmRpYW4gZm9ybWF0KVxyXG4gICAgICBkZWNvbXByZXNzRnJvbVVpbnQ4QXJyYXk6ZnVuY3Rpb24gKGNvbXByZXNzZWQpIHtcclxuICAgICAgICBpZiAoY29tcHJlc3NlZD09PW51bGwgfHwgY29tcHJlc3NlZD09PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBMWlN0cmluZy5kZWNvbXByZXNzKGNvbXByZXNzZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBidWY9bmV3IEFycmF5KGNvbXByZXNzZWQubGVuZ3RoLzIpOyAvLyAyIGJ5dGVzIHBlciBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBUb3RhbExlbj1idWYubGVuZ3RoOyBpPFRvdGFsTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICBidWZbaV09Y29tcHJlc3NlZFtpKjJdKjI1Nitjb21wcmVzc2VkW2kqMisxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgYnVmLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAgICAgICByZXN1bHQucHVzaChmKGMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBMWlN0cmluZy5kZWNvbXByZXNzKHJlc3VsdC5qb2luKCcnKSk7XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgXHJcbiAgICAgIC8vY29tcHJlc3MgaW50byBhIHN0cmluZyB0aGF0IGlzIGFscmVhZHkgVVJJIGVuY29kZWRcclxuICAgICAgY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCA2LCBmdW5jdGlvbihhKXtyZXR1cm4ga2V5U3RyVXJpU2FmZS5jaGFyQXQoYSk7fSk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgICAgLy9kZWNvbXByZXNzIGZyb20gYW4gb3V0cHV0IG9mIGNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50XHJcbiAgICAgIGRlY29tcHJlc3NGcm9tRW5jb2RlZFVSSUNvbXBvbmVudDpmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYgKGlucHV0ID09IFwiXCIpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvIC9nLCBcIitcIik7XHJcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLl9kZWNvbXByZXNzKGlucHV0Lmxlbmd0aCwgMzIsIGZ1bmN0aW9uKGluZGV4KSB7IHJldHVybiBnZXRCYXNlVmFsdWUoa2V5U3RyVXJpU2FmZSwgaW5wdXQuY2hhckF0KGluZGV4KSk7IH0pO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICAgIGNvbXByZXNzOiBmdW5jdGlvbiAodW5jb21wcmVzc2VkKSB7XHJcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLl9jb21wcmVzcyh1bmNvbXByZXNzZWQsIDE2LCBmdW5jdGlvbihhKXtyZXR1cm4gZihhKTt9KTtcclxuICAgICAgfSxcclxuICAgICAgX2NvbXByZXNzOiBmdW5jdGlvbiAodW5jb21wcmVzc2VkLCBiaXRzUGVyQ2hhciwgZ2V0Q2hhckZyb21JbnQpIHtcclxuICAgICAgICBpZiAodW5jb21wcmVzc2VkID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHZhciBpLCB2YWx1ZSxcclxuICAgICAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5PSB7fSxcclxuICAgICAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGU9IHt9LFxyXG4gICAgICAgICAgICBjb250ZXh0X2M9XCJcIixcclxuICAgICAgICAgICAgY29udGV4dF93Yz1cIlwiLFxyXG4gICAgICAgICAgICBjb250ZXh0X3c9XCJcIixcclxuICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW49IDIsIC8vIENvbXBlbnNhdGUgZm9yIHRoZSBmaXJzdCBlbnRyeSB3aGljaCBzaG91bGQgbm90IGNvdW50XHJcbiAgICAgICAgICAgIGNvbnRleHRfZGljdFNpemU9IDMsXHJcbiAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cz0gMixcclxuICAgICAgICAgICAgY29udGV4dF9kYXRhPVtdLFxyXG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsPTAsXHJcbiAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbj0wLFxyXG4gICAgICAgICAgICBpaTtcclxuICAgIFxyXG4gICAgICAgIGZvciAoaWkgPSAwOyBpaSA8IHVuY29tcHJlc3NlZC5sZW5ndGg7IGlpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnRleHRfYyA9IHVuY29tcHJlc3NlZC5jaGFyQXQoaWkpO1xyXG4gICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGV4dF9kaWN0aW9uYXJ5LGNvbnRleHRfYykpIHtcclxuICAgICAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfY10gPSBjb250ZXh0X2RpY3RTaXplKys7XHJcbiAgICAgICAgICAgIGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlW2NvbnRleHRfY10gPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICBjb250ZXh0X3djID0gY29udGV4dF93ICsgY29udGV4dF9jO1xyXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnksY29udGV4dF93YykpIHtcclxuICAgICAgICAgICAgY29udGV4dF93ID0gY29udGV4dF93YztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGUsY29udGV4dF93KSkge1xyXG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X3cuY2hhckNvZGVBdCgwKTwyNTYpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaT0wIDsgaTxjb250ZXh0X251bUJpdHMgOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaT0wIDsgaTw4IDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8ICh2YWx1ZSYxKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA+PiAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGk9MCA7IGk8Y29udGV4dF9udW1CaXRzIDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09Yml0c1BlckNoYXItMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlID0gY29udGV4dF93LmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGk9MCA7IGk8MTYgOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID4+IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluLS07XHJcbiAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZW5sYXJnZUluID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkZWxldGUgY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGVbY29udGV4dF93XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X3ddO1xyXG4gICAgICAgICAgICAgIGZvciAoaT0wIDsgaTxjb250ZXh0X251bUJpdHMgOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8ICh2YWx1ZSYxKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID4+IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0X2VubGFyZ2VJbi0tO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dF9lbmxhcmdlSW4gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcclxuICAgICAgICAgICAgICBjb250ZXh0X251bUJpdHMrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBZGQgd2MgdG8gdGhlIGRpY3Rpb25hcnkuXHJcbiAgICAgICAgICAgIGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X3djXSA9IGNvbnRleHRfZGljdFNpemUrKztcclxuICAgICAgICAgICAgY29udGV4dF93ID0gU3RyaW5nKGNvbnRleHRfYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy8gT3V0cHV0IHRoZSBjb2RlIGZvciB3LlxyXG4gICAgICAgIGlmIChjb250ZXh0X3cgIT09IFwiXCIpIHtcclxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGUsY29udGV4dF93KSkge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dF93LmNoYXJDb2RlQXQoMCk8MjU2KSB7XHJcbiAgICAgICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgICBmb3IgKGk9MCA7IGk8OCA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFsdWUgPSAxO1xyXG4gICAgICAgICAgICAgIGZvciAoaT0wIDsgaTxjb250ZXh0X251bUJpdHMgOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgICBmb3IgKGk9MCA7IGk8MTYgOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8ICh2YWx1ZSYxKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID4+IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluLS07XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0X2VubGFyZ2VJbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xyXG4gICAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZVtjb250ZXh0X3ddO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X2RpY3Rpb25hcnlbY29udGV4dF93XTtcclxuICAgICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xyXG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8ICh2YWx1ZSYxKTtcclxuICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluLS07XHJcbiAgICAgICAgICBpZiAoY29udGV4dF9lbmxhcmdlSW4gPT0gMCkge1xyXG4gICAgICAgICAgICBjb250ZXh0X2VubGFyZ2VJbiA9IE1hdGgucG93KDIsIGNvbnRleHRfbnVtQml0cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vIE1hcmsgdGhlIGVuZCBvZiB0aGUgc3RyZWFtXHJcbiAgICAgICAgdmFsdWUgPSAyO1xyXG4gICAgICAgIGZvciAoaT0wIDsgaTxjb250ZXh0X251bUJpdHMgOyBpKyspIHtcclxuICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKSB8ICh2YWx1ZSYxKTtcclxuICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xyXG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XHJcbiAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlID4+IDE7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy8gRmx1c2ggdGhlIGxhc3QgY2hhclxyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSk7XHJcbiAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcclxuICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb250ZXh0X2RhdGEuam9pbignJyk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgICAgZGVjb21wcmVzczogZnVuY3Rpb24gKGNvbXByZXNzZWQpIHtcclxuICAgICAgICBpZiAoY29tcHJlc3NlZCA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgICAgICBpZiAoY29tcHJlc3NlZCA9PSBcIlwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gTFpTdHJpbmcuX2RlY29tcHJlc3MoY29tcHJlc3NlZC5sZW5ndGgsIDMyNzY4LCBmdW5jdGlvbihpbmRleCkgeyByZXR1cm4gY29tcHJlc3NlZC5jaGFyQ29kZUF0KGluZGV4KTsgfSk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgICAgX2RlY29tcHJlc3M6IGZ1bmN0aW9uIChsZW5ndGgsIHJlc2V0VmFsdWUsIGdldE5leHRWYWx1ZSkge1xyXG4gICAgICAgIHZhciBkaWN0aW9uYXJ5ID0gW10sXHJcbiAgICAgICAgICAgIG5leHQsXHJcbiAgICAgICAgICAgIGVubGFyZ2VJbiA9IDQsXHJcbiAgICAgICAgICAgIGRpY3RTaXplID0gNCxcclxuICAgICAgICAgICAgbnVtQml0cyA9IDMsXHJcbiAgICAgICAgICAgIGVudHJ5ID0gXCJcIixcclxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIHcsXHJcbiAgICAgICAgICAgIGJpdHMsIHJlc2IsIG1heHBvd2VyLCBwb3dlcixcclxuICAgICAgICAgICAgYyxcclxuICAgICAgICAgICAgZGF0YSA9IHt2YWw6Z2V0TmV4dFZhbHVlKDApLCBwb3NpdGlvbjpyZXNldFZhbHVlLCBpbmRleDoxfTtcclxuICAgIFxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzOyBpICs9IDEpIHtcclxuICAgICAgICAgIGRpY3Rpb25hcnlbaV0gPSBpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGJpdHMgPSAwO1xyXG4gICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiwyKTtcclxuICAgICAgICBwb3dlcj0xO1xyXG4gICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcclxuICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XHJcbiAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xyXG4gICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcclxuICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJpdHMgfD0gKHJlc2I+MCA/IDEgOiAwKSAqIHBvd2VyO1xyXG4gICAgICAgICAgcG93ZXIgPDw9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgc3dpdGNoIChuZXh0ID0gYml0cykge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgIGJpdHMgPSAwO1xyXG4gICAgICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiw4KTtcclxuICAgICAgICAgICAgICBwb3dlcj0xO1xyXG4gICAgICAgICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2I+MCA/IDEgOiAwKSAqIHBvd2VyO1xyXG4gICAgICAgICAgICAgICAgcG93ZXIgPDw9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjID0gZihiaXRzKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgYml0cyA9IDA7XHJcbiAgICAgICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLDE2KTtcclxuICAgICAgICAgICAgICBwb3dlcj0xO1xyXG4gICAgICAgICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2I+MCA/IDEgOiAwKSAqIHBvd2VyO1xyXG4gICAgICAgICAgICAgICAgcG93ZXIgPDw9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjID0gZihiaXRzKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaWN0aW9uYXJ5WzNdID0gYztcclxuICAgICAgICB3ID0gYztcclxuICAgICAgICByZXN1bHQucHVzaChjKTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEuaW5kZXggPiBsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgIGJpdHMgPSAwO1xyXG4gICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLG51bUJpdHMpO1xyXG4gICAgICAgICAgcG93ZXI9MTtcclxuICAgICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcclxuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xyXG4gICAgICAgICAgICAgIGRhdGEudmFsID0gZ2V0TmV4dFZhbHVlKGRhdGEuaW5kZXgrKyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XHJcbiAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICBzd2l0Y2ggKGMgPSBiaXRzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICBiaXRzID0gMDtcclxuICAgICAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsOCk7XHJcbiAgICAgICAgICAgICAgcG93ZXI9MTtcclxuICAgICAgICAgICAgICB3aGlsZSAocG93ZXIhPW1heHBvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXNiID0gZGF0YS52YWwgJiBkYXRhLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBvc2l0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEudmFsID0gZ2V0TmV4dFZhbHVlKGRhdGEuaW5kZXgrKyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiPjAgPyAxIDogMCkgKiBwb3dlcjtcclxuICAgICAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgIGRpY3Rpb25hcnlbZGljdFNpemUrK10gPSBmKGJpdHMpO1xyXG4gICAgICAgICAgICAgIGMgPSBkaWN0U2l6ZS0xO1xyXG4gICAgICAgICAgICAgIGVubGFyZ2VJbi0tO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgYml0cyA9IDA7XHJcbiAgICAgICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLDE2KTtcclxuICAgICAgICAgICAgICBwb3dlcj0xO1xyXG4gICAgICAgICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2I+MCA/IDEgOiAwKSAqIHBvd2VyO1xyXG4gICAgICAgICAgICAgICAgcG93ZXIgPDw9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRpY3Rpb25hcnlbZGljdFNpemUrK10gPSBmKGJpdHMpO1xyXG4gICAgICAgICAgICAgIGMgPSBkaWN0U2l6ZS0xO1xyXG4gICAgICAgICAgICAgIGVubGFyZ2VJbi0tO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcclxuICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgaWYgKGVubGFyZ2VJbiA9PSAwKSB7XHJcbiAgICAgICAgICAgIGVubGFyZ2VJbiA9IE1hdGgucG93KDIsIG51bUJpdHMpO1xyXG4gICAgICAgICAgICBudW1CaXRzKys7XHJcbiAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgIGlmIChkaWN0aW9uYXJ5W2NdKSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gZGljdGlvbmFyeVtjXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjID09PSBkaWN0U2l6ZSkge1xyXG4gICAgICAgICAgICAgIGVudHJ5ID0gdyArIHcuY2hhckF0KDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXN1bHQucHVzaChlbnRyeSk7XHJcbiAgICBcclxuICAgICAgICAgIC8vIEFkZCB3K2VudHJ5WzBdIHRvIHRoZSBkaWN0aW9uYXJ5LlxyXG4gICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IHcgKyBlbnRyeS5jaGFyQXQoMCk7XHJcbiAgICAgICAgICBlbmxhcmdlSW4tLTtcclxuICAgIFxyXG4gICAgICAgICAgdyA9IGVudHJ5O1xyXG4gICAgXHJcbiAgICAgICAgICBpZiAoZW5sYXJnZUluID09IDApIHtcclxuICAgICAgICAgICAgZW5sYXJnZUluID0gTWF0aC5wb3coMiwgbnVtQml0cyk7XHJcbiAgICAgICAgICAgIG51bUJpdHMrKztcclxuICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgICAgcmV0dXJuIExaU3RyaW5nO1xyXG4gICAgfSkoKTtcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICBkZWZpbmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gTFpTdHJpbmc7IH0pO1xyXG4gICAgfSBlbHNlIGlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgIT0gbnVsbCApIHtcclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBMWlN0cmluZ1xyXG4gICAgfSBlbHNlIGlmKCB0eXBlb2YgYW5ndWxhciAhPT0gJ3VuZGVmaW5lZCcgJiYgYW5ndWxhciAhPSBudWxsICkge1xyXG4gICAgICBhbmd1bGFyLm1vZHVsZSgnTFpTdHJpbmcnLCBbXSlcclxuICAgICAgLmZhY3RvcnkoJ0xaU3RyaW5nJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBMWlN0cmluZztcclxuICAgICAgfSk7XHJcbiAgICB9Il19