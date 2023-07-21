
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/qrcode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '43022E0pYBJX71efNi/ZvuL', 'qrcode');
// hall/scripts/framework/libs/qrcode.js

"use strict";

//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of 
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
//---------------------------------------------------------------------
// QR8bitByte
//---------------------------------------------------------------------
// function QR8bitByte(data) {
// 	this.mode = QRMode.MODE_8BIT_BYTE;
// 	this.data = data;
// }
// QR8bitByte.prototype = {
// 	getLength : function(buffer) {
// 		return this.data.length;
// 	},
// 	write : function(buffer) {
// 		for (var i = 0; i < this.data.length; i++) {
// 			// not JIS ...
// 			buffer.put(this.data.charCodeAt(i), 8);
// 		}
// 	}
// };
function QR8bitByte(data) {
  this.mode = QRMode.MODE_8BIT_BYTE;
  this.data = data;
  this.parsedData = []; // Added to support UTF-8 Characters

  for (var i = 0, l = this.data.length; i < l; i++) {
    var byteArray = [];
    var code = this.data.charCodeAt(i);

    if (code > 0x10000) {
      byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
      byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
      byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[3] = 0x80 | code & 0x3F;
    } else if (code > 0x800) {
      byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
      byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[2] = 0x80 | code & 0x3F;
    } else if (code > 0x80) {
      byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
      byteArray[1] = 0x80 | code & 0x3F;
    } else {
      byteArray[0] = code;
    }

    this.parsedData.push(byteArray);
  }

  this.parsedData = Array.prototype.concat.apply([], this.parsedData);

  if (this.parsedData.length != this.data.length) {
    this.parsedData.unshift(191);
    this.parsedData.unshift(187);
    this.parsedData.unshift(239);
  }
}

QR8bitByte.prototype = {
  getLength: function getLength(buffer) {
    return this.parsedData.length;
  },
  write: function write(buffer) {
    for (var i = 0, l = this.parsedData.length; i < l; i++) {
      buffer.put(this.parsedData[i], 8);
    }
  }
}; //---------------------------------------------------------------------
// QRCode
//---------------------------------------------------------------------

function QRCode(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = new Array();
}

QRCode.prototype = {
  addData: function addData(data) {
    var newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  },
  isDark: function isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }

    return this.modules[row][col];
  },
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  make: function make() {
    // Calculate automatically typeNumber if provided is < 1
    if (this.typeNumber < 1) {
      var typeNumber = 1;

      for (typeNumber = 1; typeNumber < 40; typeNumber++) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
        var buffer = new QRBitBuffer();
        var totalDataCount = 0;

        for (var i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }

        for (var i = 0; i < this.dataList.length; i++) {
          var data = this.dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
          data.write(buffer);
        }

        if (buffer.getLengthInBits() <= totalDataCount * 8) break;
      }

      this.typeNumber = typeNumber;
    }

    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);

      for (var col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null; //(col + row) % 3;
      }
    }

    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }

    if (this.dataCache == null) {
      this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }

    this.mapData(this.dataCache, maskPattern);
  },
  setupPositionProbePattern: function setupPositionProbePattern(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  getBestMaskPattern: function getBestMaskPattern() {
    var minLostPoint = 0;
    var pattern = 0;

    for (var i = 0; i < 8; i++) {
      this.makeImpl(true, i);
      var lostPoint = QRUtil.getLostPoint(this);

      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }

    return pattern;
  },
  createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
    var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
    var cs = 1;
    this.make();

    for (var row = 0; row < this.modules.length; row++) {
      var y = row * cs;

      for (var col = 0; col < this.modules[row].length; col++) {
        var x = col * cs;
        var dark = this.modules[row][col];

        if (dark) {
          qr_mc.beginFill(0, 100);
          qr_mc.moveTo(x, y);
          qr_mc.lineTo(x + cs, y);
          qr_mc.lineTo(x + cs, y + cs);
          qr_mc.lineTo(x, y + cs);
          qr_mc.endFill();
        }
      }
    }

    return qr_mc;
  },
  setupTimingPattern: function setupTimingPattern() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }

      this.modules[r][6] = r % 2 == 0;
    }

    for (var c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }

      this.modules[6][c] = c % 2 == 0;
    }
  },
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    var pos = QRUtil.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  setupTypeNumber: function setupTypeNumber(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }

    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  setupTypeInfo: function setupTypeInfo(test, maskPattern) {
    var data = this.errorCorrectLevel << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data); // vertical		

    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    } // horizontal


    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    } // fixed module


    this.modules[this.moduleCount - 8][8] = !test;
  },
  mapData: function mapData(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }

            var mask = QRUtil.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
};
QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new QRBitBuffer();

  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  } // calc num max data.


  var totalDataCount = 0;

  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }

  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  } // end code


  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  } // padding


  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  } // padding


  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }

    buffer.put(QRCode.PAD0, 8);

    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }

    buffer.put(QRCode.PAD1, 8);
  }

  return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function (buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcdata = new Array(rsBlocks.length);
  var ecdata = new Array(rsBlocks.length);

  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);

    for (var i = 0; i < dcdata[r].length; i++) {
      dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    }

    offset += dcCount;
    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = new Array(rsPoly.getLength() - 1);

    for (var i = 0; i < ecdata[r].length; i++) {
      var modIndex = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
    }
  }

  var totalCodeCount = 0;

  for (var i = 0; i < rsBlocks.length; i++) {
    totalCodeCount += rsBlocks[i].totalCount;
  }

  var data = new Array(totalCodeCount);
  var index = 0;

  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) {
        data[index++] = dcdata[r][i];
      }
    }
  }

  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) {
        data[index++] = ecdata[r][i];
      }
    }
  }

  return data;
}; //---------------------------------------------------------------------
// QRMode
//---------------------------------------------------------------------


var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
}; //---------------------------------------------------------------------
// QRErrorCorrectLevel
//---------------------------------------------------------------------

var QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
}; //---------------------------------------------------------------------
// QRMaskPattern
//---------------------------------------------------------------------

var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}; //---------------------------------------------------------------------
// QRUtil
//---------------------------------------------------------------------

var QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }

    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }

    return data << 12 | d;
  },
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;

    while (data != 0) {
      digit++;
      data >>>= 1;
    }

    return digit;
  },
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;

      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;

      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;

      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;

      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;

      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;

      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;

      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);

    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }

    return a;
  },
  getLengthInBits: function getLengthInBits(mode, type) {
    if (1 <= type && type < 10) {
      // 1 - 9
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;

        case QRMode.MODE_ALPHA_NUM:
          return 9;

        case QRMode.MODE_8BIT_BYTE:
          return 8;

        case QRMode.MODE_KANJI:
          return 8;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      // 10 - 26
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;

        case QRMode.MODE_ALPHA_NUM:
          return 11;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 10;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      // 27 - 40
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;

        case QRMode.MODE_ALPHA_NUM:
          return 13;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 12;

        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function getLostPoint(qrCode) {
    var moduleCount = qrCode.getModuleCount();
    var lostPoint = 0; // LEVEL1

    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var dark = qrCode.isDark(row, col);

        for (var r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }

          for (var c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }

            if (r == 0 && c == 0) {
              continue;
            }

            if (dark == qrCode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    } // LEVEL2


    for (var row = 0; row < moduleCount - 1; row++) {
      for (var col = 0; col < moduleCount - 1; col++) {
        var count = 0;
        if (qrCode.isDark(row, col)) count++;
        if (qrCode.isDark(row + 1, col)) count++;
        if (qrCode.isDark(row, col + 1)) count++;
        if (qrCode.isDark(row + 1, col + 1)) count++;

        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    } // LEVEL3


    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }

    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    } // LEVEL4


    var darkCount = 0;

    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }

    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
}; //---------------------------------------------------------------------
// QRMath
//---------------------------------------------------------------------

var QRMath = {
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return QRMath.LOG_TABLE[n];
  },
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};

for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}

for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}

for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
} //---------------------------------------------------------------------
// QRPolynomial
//---------------------------------------------------------------------


function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }

  var offset = 0;

  while (offset < num.length && num[offset] == 0) {
    offset++;
  }

  this.num = new Array(num.length - offset + shift);

  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {
  get: function get(index) {
    return this.num[index];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  multiply: function multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);

    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }

    return new QRPolynomial(num, 0);
  },
  mod: function mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }

    var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    var num = new Array(this.getLength());

    for (var i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }

    for (var i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    } // recursive call


    return new QRPolynomial(num, 0).mod(e);
  }
}; //---------------------------------------------------------------------
// QRRSBlock
//---------------------------------------------------------------------

function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [// L
// M
// Q
// H
// 1
[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], // 2
[1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], // 3
[1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], // 4		
[1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], // 5
[1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], // 6
[2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], // 7		
[2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], // 8
[2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], // 9
[2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], // 10		
[2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], // 11
[4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], // 12
[2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], // 13
[4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], // 14
[3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], // 15
[5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], // 16
[5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], // 17
[1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], // 18
[5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], // 19
[3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], // 20
[3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], // 21
[4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], // 22
[2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], // 23
[4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], // 24
[6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], // 25
[8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], // 26
[10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], // 27
[8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], // 28
[3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], // 29
[7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], // 30
[5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], // 31
[13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], // 32
[17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], // 33
[17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], // 34
[13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], // 35
[12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], // 36
[6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], // 37
[17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], // 38
[4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], // 39
[20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], // 40
[19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];

QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
  var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

  if (rsBlock == undefined) {
    throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  }

  var length = rsBlock.length / 3;
  var list = new Array();

  for (var i = 0; i < length; i++) {
    var count = rsBlock[i * 3 + 0];
    var totalCount = rsBlock[i * 3 + 1];
    var dataCount = rsBlock[i * 3 + 2];

    for (var j = 0; j < count; j++) {
      list.push(new QRRSBlock(totalCount, dataCount));
    }
  }

  return list;
};

QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case QRErrorCorrectLevel.L:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];

    case QRErrorCorrectLevel.M:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];

    case QRErrorCorrectLevel.Q:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];

    case QRErrorCorrectLevel.H:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];

    default:
      return undefined;
  }
}; //---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------


function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}

QRBitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) == 1);
    }
  },
  getLengthInBits: function getLengthInBits() {
    return this.length;
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);

    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }

    this.length++;
  }
}; // @krisirk
// window.QRCode              = QRCode ;
// window.QRErrorCorrectLevel = QRErrorCorrectLevel ;

module.exports = {};
module.exports.QRCode = QRCode;
module.exports.QRErrorCorrectLevel = QRErrorCorrectLevel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxxcmNvZGUuanMiXSwibmFtZXMiOlsiUVI4Yml0Qnl0ZSIsImRhdGEiLCJtb2RlIiwiUVJNb2RlIiwiTU9ERV84QklUX0JZVEUiLCJwYXJzZWREYXRhIiwiaSIsImwiLCJsZW5ndGgiLCJieXRlQXJyYXkiLCJjb2RlIiwiY2hhckNvZGVBdCIsInB1c2giLCJBcnJheSIsInByb3RvdHlwZSIsImNvbmNhdCIsImFwcGx5IiwidW5zaGlmdCIsImdldExlbmd0aCIsImJ1ZmZlciIsIndyaXRlIiwicHV0IiwiUVJDb2RlIiwidHlwZU51bWJlciIsImVycm9yQ29ycmVjdExldmVsIiwibW9kdWxlcyIsIm1vZHVsZUNvdW50IiwiZGF0YUNhY2hlIiwiZGF0YUxpc3QiLCJhZGREYXRhIiwibmV3RGF0YSIsImlzRGFyayIsInJvdyIsImNvbCIsIkVycm9yIiwiZ2V0TW9kdWxlQ291bnQiLCJtYWtlIiwicnNCbG9ja3MiLCJRUlJTQmxvY2siLCJnZXRSU0Jsb2NrcyIsIlFSQml0QnVmZmVyIiwidG90YWxEYXRhQ291bnQiLCJkYXRhQ291bnQiLCJRUlV0aWwiLCJnZXRMZW5ndGhJbkJpdHMiLCJtYWtlSW1wbCIsImdldEJlc3RNYXNrUGF0dGVybiIsInRlc3QiLCJtYXNrUGF0dGVybiIsInNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4iLCJzZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybiIsInNldHVwVGltaW5nUGF0dGVybiIsInNldHVwVHlwZUluZm8iLCJzZXR1cFR5cGVOdW1iZXIiLCJjcmVhdGVEYXRhIiwibWFwRGF0YSIsInIiLCJjIiwibWluTG9zdFBvaW50IiwicGF0dGVybiIsImxvc3RQb2ludCIsImdldExvc3RQb2ludCIsImNyZWF0ZU1vdmllQ2xpcCIsInRhcmdldF9tYyIsImluc3RhbmNlX25hbWUiLCJkZXB0aCIsInFyX21jIiwiY3JlYXRlRW1wdHlNb3ZpZUNsaXAiLCJjcyIsInkiLCJ4IiwiZGFyayIsImJlZ2luRmlsbCIsIm1vdmVUbyIsImxpbmVUbyIsImVuZEZpbGwiLCJwb3MiLCJnZXRQYXR0ZXJuUG9zaXRpb24iLCJqIiwiYml0cyIsImdldEJDSFR5cGVOdW1iZXIiLCJtb2QiLCJNYXRoIiwiZmxvb3IiLCJnZXRCQ0hUeXBlSW5mbyIsImluYyIsImJpdEluZGV4IiwiYnl0ZUluZGV4IiwibWFzayIsImdldE1hc2siLCJQQUQwIiwiUEFEMSIsInB1dEJpdCIsImNyZWF0ZUJ5dGVzIiwib2Zmc2V0IiwibWF4RGNDb3VudCIsIm1heEVjQ291bnQiLCJkY2RhdGEiLCJlY2RhdGEiLCJkY0NvdW50IiwiZWNDb3VudCIsInRvdGFsQ291bnQiLCJtYXgiLCJyc1BvbHkiLCJnZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsIiwicmF3UG9seSIsIlFSUG9seW5vbWlhbCIsIm1vZFBvbHkiLCJtb2RJbmRleCIsImdldCIsInRvdGFsQ29kZUNvdW50IiwiaW5kZXgiLCJNT0RFX05VTUJFUiIsIk1PREVfQUxQSEFfTlVNIiwiTU9ERV9LQU5KSSIsIlFSRXJyb3JDb3JyZWN0TGV2ZWwiLCJMIiwiTSIsIlEiLCJIIiwiUVJNYXNrUGF0dGVybiIsIlBBVFRFUk4wMDAiLCJQQVRURVJOMDAxIiwiUEFUVEVSTjAxMCIsIlBBVFRFUk4wMTEiLCJQQVRURVJOMTAwIiwiUEFUVEVSTjEwMSIsIlBBVFRFUk4xMTAiLCJQQVRURVJOMTExIiwiUEFUVEVSTl9QT1NJVElPTl9UQUJMRSIsIkcxNSIsIkcxOCIsIkcxNV9NQVNLIiwiZCIsImdldEJDSERpZ2l0IiwiZGlnaXQiLCJlcnJvckNvcnJlY3RMZW5ndGgiLCJhIiwibXVsdGlwbHkiLCJRUk1hdGgiLCJnZXhwIiwidHlwZSIsInFyQ29kZSIsInNhbWVDb3VudCIsImNvdW50IiwiZGFya0NvdW50IiwicmF0aW8iLCJhYnMiLCJnbG9nIiwibiIsIkxPR19UQUJMRSIsIkVYUF9UQUJMRSIsIm51bSIsInNoaWZ0IiwidW5kZWZpbmVkIiwiZSIsIlJTX0JMT0NLX1RBQkxFIiwicnNCbG9jayIsImdldFJzQmxvY2tUYWJsZSIsImxpc3QiLCJidWZJbmRleCIsImJpdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsVUFBVCxDQUFvQkMsSUFBcEIsRUFBMEI7QUFDekIsT0FBS0MsSUFBTCxHQUFZQyxNQUFNLENBQUNDLGNBQW5CO0FBQ0EsT0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsT0FBS0ksVUFBTCxHQUFrQixFQUFsQixDQUh5QixDQUt6Qjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBRyxLQUFLTixJQUFMLENBQVVPLE1BQTlCLEVBQXNDRixDQUFDLEdBQUdDLENBQTFDLEVBQTZDRCxDQUFDLEVBQTlDLEVBQWtEO0FBQ2pELFFBQUlHLFNBQVMsR0FBRyxFQUFoQjtBQUNBLFFBQUlDLElBQUksR0FBRyxLQUFLVCxJQUFMLENBQVVVLFVBQVYsQ0FBcUJMLENBQXJCLENBQVg7O0FBRUEsUUFBSUksSUFBSSxHQUFHLE9BQVgsRUFBb0I7QUFDbkJELE1BQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsR0FBZSxPQUFRLENBQUNDLElBQUksR0FBRyxRQUFSLE1BQXNCLEVBQTdDO0FBQ0FELE1BQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsR0FBZSxPQUFRLENBQUNDLElBQUksR0FBRyxPQUFSLE1BQXFCLEVBQTVDO0FBQ0FELE1BQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsR0FBZSxPQUFRLENBQUNDLElBQUksR0FBRyxLQUFSLE1BQW1CLENBQTFDO0FBQ0FELE1BQUFBLFNBQVMs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QyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLENBeEJ3QixFQXlCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLENBekJ3QixFQTBCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLENBMUJ3QixFQTJCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLENBM0J3QixFQTRCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBNUJ3QixFQTZCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBN0J3QixFQThCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBOUJ3QixFQStCeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBL0J3QixFQWdDeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBaEN3QixFQWlDeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBakN3QixFQWtDeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBbEN3QixFQW1DeEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLENBbkN3QixFQW9DeEIsQ0FB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QUFDQSxHQWZzQjtBQWlCdkJvRixFQUFBQSxNQUFNLEVBQUcsZ0JBQVNxRSxHQUFULEVBQWM7QUFFdEIsUUFBSUQsUUFBUSxHQUFHOUUsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBSzNFLE1BQUwsR0FBYyxDQUF6QixDQUFmOztBQUNBLFFBQUksS0FBS1csTUFBTCxDQUFZWCxNQUFaLElBQXNCd0osUUFBMUIsRUFBb0M7QUFDbkMsV0FBSzdJLE1BQUwsQ0FBWVAsSUFBWixDQUFpQixDQUFqQjtBQUNBOztBQUVELFFBQUlxSixHQUFKLEVBQVM7QUFDUixXQUFLOUksTUFBTCxDQUFZNkksUUFBWixLQUEwQixTQUFVLEtBQUt4SixNQUFMLEdBQWMsQ0FBbEQ7QUFDQTs7QUFFRCxTQUFLQSxNQUFMO0FBQ0E7QUE3QnNCLENBQXhCLEVBaUNBO0FBQ0E7QUFDQTs7QUFDQTBKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixFQUFqQjtBQUNBRCxNQUFNLENBQUNDLE9BQVAsQ0FBZTdJLE1BQWYsR0FBd0JBLE1BQXhCO0FBQ0E0SSxNQUFNLENBQUNDLE9BQVAsQ0FBZWhELG1CQUFmLEdBQXFDQSxtQkFBckMiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFFSQ29kZSBmb3IgSmF2YVNjcmlwdFxyXG4vL1xyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgS2F6dWhpa28gQXJhc2VcclxuLy9cclxuLy8gVVJMOiBodHRwOi8vd3d3LmQtcHJvamVjdC5jb20vXHJcbi8vXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcclxuLy8gICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG4vL1xyXG4vLyBUaGUgd29yZCBcIlFSIENvZGVcIiBpcyByZWdpc3RlcmVkIHRyYWRlbWFyayBvZiBcclxuLy8gREVOU08gV0FWRSBJTkNPUlBPUkFURURcclxuLy8gICBodHRwOi8vd3d3LmRlbnNvLXdhdmUuY29tL3FyY29kZS9mYXFwYXRlbnQtZS5odG1sXHJcbi8vXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBRUjhiaXRCeXRlXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBmdW5jdGlvbiBRUjhiaXRCeXRlKGRhdGEpIHtcclxuLy8gXHR0aGlzLm1vZGUgPSBRUk1vZGUuTU9ERV84QklUX0JZVEU7XHJcbi8vIFx0dGhpcy5kYXRhID0gZGF0YTtcclxuLy8gfVxyXG5cclxuLy8gUVI4Yml0Qnl0ZS5wcm90b3R5cGUgPSB7XHJcblxyXG4vLyBcdGdldExlbmd0aCA6IGZ1bmN0aW9uKGJ1ZmZlcikge1xyXG4vLyBcdFx0cmV0dXJuIHRoaXMuZGF0YS5sZW5ndGg7XHJcbi8vIFx0fSxcclxuXHRcclxuLy8gXHR3cml0ZSA6IGZ1bmN0aW9uKGJ1ZmZlcikge1xyXG4vLyBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuLy8gXHRcdFx0Ly8gbm90IEpJUyAuLi5cclxuLy8gXHRcdFx0YnVmZmVyLnB1dCh0aGlzLmRhdGEuY2hhckNvZGVBdChpKSwgOCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyB9O1xyXG5mdW5jdGlvbiBRUjhiaXRCeXRlKGRhdGEpIHtcclxuXHR0aGlzLm1vZGUgPSBRUk1vZGUuTU9ERV84QklUX0JZVEU7XHJcblx0dGhpcy5kYXRhID0gZGF0YTtcclxuXHR0aGlzLnBhcnNlZERhdGEgPSBbXTtcclxuXHJcblx0Ly8gQWRkZWQgdG8gc3VwcG9ydCBVVEYtOCBDaGFyYWN0ZXJzXHJcblx0Zm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHR2YXIgYnl0ZUFycmF5ID0gW107XHJcblx0XHR2YXIgY29kZSA9IHRoaXMuZGF0YS5jaGFyQ29kZUF0KGkpO1xyXG5cclxuXHRcdGlmIChjb2RlID4gMHgxMDAwMCkge1xyXG5cdFx0XHRieXRlQXJyYXlbMF0gPSAweEYwIHwgKChjb2RlICYgMHgxQzAwMDApID4+PiAxOCk7XHJcblx0XHRcdGJ5dGVBcnJheVsxXSA9IDB4ODAgfCAoKGNvZGUgJiAweDNGMDAwKSA+Pj4gMTIpO1xyXG5cdFx0XHRieXRlQXJyYXlbMl0gPSAweDgwIHwgKChjb2RlICYgMHhGQzApID4+PiA2KTtcclxuXHRcdFx0Ynl0ZUFycmF5WzNdID0gMHg4MCB8IChjb2RlICYgMHgzRik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPiAweDgwMCkge1xyXG5cdFx0XHRieXRlQXJyYXlbMF0gPSAweEUwIHwgKChjb2RlICYgMHhGMDAwKSA+Pj4gMTIpO1xyXG5cdFx0XHRieXRlQXJyYXlbMV0gPSAweDgwIHwgKChjb2RlICYgMHhGQzApID4+PiA2KTtcclxuXHRcdFx0Ynl0ZUFycmF5WzJdID0gMHg4MCB8IChjb2RlICYgMHgzRik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPiAweDgwKSB7XHJcblx0XHRcdGJ5dGVBcnJheVswXSA9IDB4QzAgfCAoKGNvZGUgJiAweDdDMCkgPj4+IDYpO1xyXG5cdFx0XHRieXRlQXJyYXlbMV0gPSAweDgwIHwgKGNvZGUgJiAweDNGKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJ5dGVBcnJheVswXSA9IGNvZGU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wYXJzZWREYXRhLnB1c2goYnl0ZUFycmF5KTtcclxuXHR9XHJcblxyXG5cdHRoaXMucGFyc2VkRGF0YSA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRoaXMucGFyc2VkRGF0YSk7XHJcblxyXG5cdGlmICh0aGlzLnBhcnNlZERhdGEubGVuZ3RoICE9IHRoaXMuZGF0YS5sZW5ndGgpIHtcclxuXHRcdHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDE5MSk7XHJcblx0XHR0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgxODcpO1xyXG5cdFx0dGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMjM5KTtcclxuXHR9XHJcbn1cclxuXHJcblFSOGJpdEJ5dGUucHJvdG90eXBlID0ge1xyXG5cdGdldExlbmd0aDogZnVuY3Rpb24gKGJ1ZmZlcikge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VkRGF0YS5sZW5ndGg7XHJcblx0fSxcclxuXHR3cml0ZTogZnVuY3Rpb24gKGJ1ZmZlcikge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnBhcnNlZERhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdGJ1ZmZlci5wdXQodGhpcy5wYXJzZWREYXRhW2ldLCA4KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFFSQ29kZVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gUVJDb2RlKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XHJcblx0dGhpcy50eXBlTnVtYmVyID0gdHlwZU51bWJlcjtcclxuXHR0aGlzLmVycm9yQ29ycmVjdExldmVsID0gZXJyb3JDb3JyZWN0TGV2ZWw7XHJcblx0dGhpcy5tb2R1bGVzID0gbnVsbDtcclxuXHR0aGlzLm1vZHVsZUNvdW50ID0gMDtcclxuXHR0aGlzLmRhdGFDYWNoZSA9IG51bGw7XHJcblx0dGhpcy5kYXRhTGlzdCA9IG5ldyBBcnJheSgpO1xyXG59XHJcblxyXG5cclxuUVJDb2RlLnByb3RvdHlwZSA9IHtcclxuXHRcclxuXHRhZGREYXRhIDogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0dmFyIG5ld0RhdGEgPSBuZXcgUVI4Yml0Qnl0ZShkYXRhKTtcclxuXHRcdHRoaXMuZGF0YUxpc3QucHVzaChuZXdEYXRhKTtcclxuXHRcdHRoaXMuZGF0YUNhY2hlID0gbnVsbDtcclxuXHR9LFxyXG5cdFxyXG5cdGlzRGFyayA6IGZ1bmN0aW9uKHJvdywgY29sKSB7XHJcblx0XHRpZiAocm93IDwgMCB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdyB8fCBjb2wgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihyb3cgKyBcIixcIiArIGNvbCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5tb2R1bGVzW3Jvd11bY29sXTtcclxuXHR9LFxyXG5cclxuXHRnZXRNb2R1bGVDb3VudCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9kdWxlQ291bnQ7XHJcblx0fSxcclxuXHRcclxuXHRtYWtlIDogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBDYWxjdWxhdGUgYXV0b21hdGljYWxseSB0eXBlTnVtYmVyIGlmIHByb3ZpZGVkIGlzIDwgMVxyXG5cdFx0aWYgKHRoaXMudHlwZU51bWJlciA8IDEgKXtcclxuXHRcdFx0dmFyIHR5cGVOdW1iZXIgPSAxO1xyXG5cdFx0XHRmb3IgKHR5cGVOdW1iZXIgPSAxOyB0eXBlTnVtYmVyIDwgNDA7IHR5cGVOdW1iZXIrKykge1xyXG5cdFx0XHRcdHZhciByc0Jsb2NrcyA9IFFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLCB0aGlzLmVycm9yQ29ycmVjdExldmVsKTtcclxuXHJcblx0XHRcdFx0dmFyIGJ1ZmZlciA9IG5ldyBRUkJpdEJ1ZmZlcigpO1xyXG5cdFx0XHRcdHZhciB0b3RhbERhdGFDb3VudCA9IDA7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByc0Jsb2Nrcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0dG90YWxEYXRhQ291bnQgKz0gcnNCbG9ja3NbaV0uZGF0YUNvdW50O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGFMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgZGF0YSA9IHRoaXMuZGF0YUxpc3RbaV07XHJcblx0XHRcdFx0XHRidWZmZXIucHV0KGRhdGEubW9kZSwgNCk7XHJcblx0XHRcdFx0XHRidWZmZXIucHV0KGRhdGEuZ2V0TGVuZ3RoKCksIFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMoZGF0YS5tb2RlLCB0eXBlTnVtYmVyKSApO1xyXG5cdFx0XHRcdFx0ZGF0YS53cml0ZShidWZmZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpIDw9IHRvdGFsRGF0YUNvdW50ICogOClcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudHlwZU51bWJlciA9IHR5cGVOdW1iZXI7XHJcblx0XHR9XHJcblx0XHR0aGlzLm1ha2VJbXBsKGZhbHNlLCB0aGlzLmdldEJlc3RNYXNrUGF0dGVybigpICk7XHJcblx0fSxcclxuXHRcclxuXHRtYWtlSW1wbCA6IGZ1bmN0aW9uKHRlc3QsIG1hc2tQYXR0ZXJuKSB7XHJcblx0XHRcclxuXHRcdHRoaXMubW9kdWxlQ291bnQgPSB0aGlzLnR5cGVOdW1iZXIgKiA0ICsgMTc7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgQXJyYXkodGhpcy5tb2R1bGVDb3VudCk7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubW9kdWxlQ291bnQ7IHJvdysrKSB7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLm1vZHVsZXNbcm93XSA9IG5ldyBBcnJheSh0aGlzLm1vZHVsZUNvdW50KTtcclxuXHRcdFx0XHJcblx0XHRcdGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHRoaXMubW9kdWxlQ291bnQ7IGNvbCsrKSB7XHJcblx0XHRcdFx0dGhpcy5tb2R1bGVzW3Jvd11bY29sXSA9IG51bGw7Ly8oY29sICsgcm93KSAlIDM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHRoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybigwLCAwKTtcclxuXHRcdHRoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybih0aGlzLm1vZHVsZUNvdW50IC0gNywgMCk7XHJcblx0XHR0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgdGhpcy5tb2R1bGVDb3VudCAtIDcpO1xyXG5cdFx0dGhpcy5zZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybigpO1xyXG5cdFx0dGhpcy5zZXR1cFRpbWluZ1BhdHRlcm4oKTtcclxuXHRcdHRoaXMuc2V0dXBUeXBlSW5mbyh0ZXN0LCBtYXNrUGF0dGVybik7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLnR5cGVOdW1iZXIgPj0gNykge1xyXG5cdFx0XHR0aGlzLnNldHVwVHlwZU51bWJlcih0ZXN0KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdGlmICh0aGlzLmRhdGFDYWNoZSA9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuZGF0YUNhY2hlID0gUVJDb2RlLmNyZWF0ZURhdGEodGhpcy50eXBlTnVtYmVyLCB0aGlzLmVycm9yQ29ycmVjdExldmVsLCB0aGlzLmRhdGFMaXN0KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdHRoaXMubWFwRGF0YSh0aGlzLmRhdGFDYWNoZSwgbWFza1BhdHRlcm4pO1xyXG5cdH0sXHJcblxyXG5cdHNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4gOiBmdW5jdGlvbihyb3csIGNvbCkgIHtcclxuXHRcdFxyXG5cdFx0Zm9yICh2YXIgciA9IC0xOyByIDw9IDc7IHIrKykge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHJvdyArIHIgPD0gLTEgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSByb3cgKyByKSBjb250aW51ZTtcclxuXHRcdFx0XHJcblx0XHRcdGZvciAodmFyIGMgPSAtMTsgYyA8PSA3OyBjKyspIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoY29sICsgYyA8PSAtMSB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IGNvbCArIGMpIGNvbnRpbnVlO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICggKDAgPD0gciAmJiByIDw9IDYgJiYgKGMgPT0gMCB8fCBjID09IDYpIClcclxuXHRcdFx0XHRcdFx0fHwgKDAgPD0gYyAmJiBjIDw9IDYgJiYgKHIgPT0gMCB8fCByID09IDYpIClcclxuXHRcdFx0XHRcdFx0fHwgKDIgPD0gciAmJiByIDw9IDQgJiYgMiA8PSBjICYmIGMgPD0gNCkgKSB7XHJcblx0XHRcdFx0XHR0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHRcdFxyXG5cdH0sXHJcblx0XHJcblx0Z2V0QmVzdE1hc2tQYXR0ZXJuIDogZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0XHR2YXIgbWluTG9zdFBvaW50ID0gMDtcclxuXHRcdHZhciBwYXR0ZXJuID0gMDtcclxuXHRcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLm1ha2VJbXBsKHRydWUsIGkpO1xyXG5cdFxyXG5cdFx0XHR2YXIgbG9zdFBvaW50ID0gUVJVdGlsLmdldExvc3RQb2ludCh0aGlzKTtcclxuXHRcclxuXHRcdFx0aWYgKGkgPT0gMCB8fCBtaW5Mb3N0UG9pbnQgPiAgbG9zdFBvaW50KSB7XHJcblx0XHRcdFx0bWluTG9zdFBvaW50ID0gbG9zdFBvaW50O1xyXG5cdFx0XHRcdHBhdHRlcm4gPSBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gcGF0dGVybjtcclxuXHR9LFxyXG5cdFxyXG5cdGNyZWF0ZU1vdmllQ2xpcCA6IGZ1bmN0aW9uKHRhcmdldF9tYywgaW5zdGFuY2VfbmFtZSwgZGVwdGgpIHtcclxuXHRcclxuXHRcdHZhciBxcl9tYyA9IHRhcmdldF9tYy5jcmVhdGVFbXB0eU1vdmllQ2xpcChpbnN0YW5jZV9uYW1lLCBkZXB0aCk7XHJcblx0XHR2YXIgY3MgPSAxO1xyXG5cdFxyXG5cdFx0dGhpcy5tYWtlKCk7XHJcblxyXG5cdFx0Zm9yICh2YXIgcm93ID0gMDsgcm93IDwgdGhpcy5tb2R1bGVzLmxlbmd0aDsgcm93KyspIHtcclxuXHRcdFx0XHJcblx0XHRcdHZhciB5ID0gcm93ICogY3M7XHJcblx0XHRcdFxyXG5cdFx0XHRmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCB0aGlzLm1vZHVsZXNbcm93XS5sZW5ndGg7IGNvbCsrKSB7XHJcblx0XHJcblx0XHRcdFx0dmFyIHggPSBjb2wgKiBjcztcclxuXHRcdFx0XHR2YXIgZGFyayA9IHRoaXMubW9kdWxlc1tyb3ddW2NvbF07XHJcblx0XHRcdFxyXG5cdFx0XHRcdGlmIChkYXJrKSB7XHJcblx0XHRcdFx0XHRxcl9tYy5iZWdpbkZpbGwoMCwgMTAwKTtcclxuXHRcdFx0XHRcdHFyX21jLm1vdmVUbyh4LCB5KTtcclxuXHRcdFx0XHRcdHFyX21jLmxpbmVUbyh4ICsgY3MsIHkpO1xyXG5cdFx0XHRcdFx0cXJfbWMubGluZVRvKHggKyBjcywgeSArIGNzKTtcclxuXHRcdFx0XHRcdHFyX21jLmxpbmVUbyh4LCB5ICsgY3MpO1xyXG5cdFx0XHRcdFx0cXJfbWMuZW5kRmlsbCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gcXJfbWM7XHJcblx0fSxcclxuXHJcblx0c2V0dXBUaW1pbmdQYXR0ZXJuIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIHIgPSA4OyByIDwgdGhpcy5tb2R1bGVDb3VudCAtIDg7IHIrKykge1xyXG5cdFx0XHRpZiAodGhpcy5tb2R1bGVzW3JdWzZdICE9IG51bGwpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm1vZHVsZXNbcl1bNl0gPSAociAlIDIgPT0gMCk7XHJcblx0XHR9XHJcblx0XHJcblx0XHRmb3IgKHZhciBjID0gODsgYyA8IHRoaXMubW9kdWxlQ291bnQgLSA4OyBjKyspIHtcclxuXHRcdFx0aWYgKHRoaXMubW9kdWxlc1s2XVtjXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5tb2R1bGVzWzZdW2NdID0gKGMgJSAyID09IDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0c2V0dXBQb3NpdGlvbkFkanVzdFBhdHRlcm4gOiBmdW5jdGlvbigpIHtcclxuXHRcclxuXHRcdHZhciBwb3MgPSBRUlV0aWwuZ2V0UGF0dGVyblBvc2l0aW9uKHRoaXMudHlwZU51bWJlcik7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwb3MubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHJcblx0XHRcdFx0dmFyIHJvdyA9IHBvc1tpXTtcclxuXHRcdFx0XHR2YXIgY29sID0gcG9zW2pdO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2xdICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRmb3IgKHZhciByID0gLTI7IHIgPD0gMjsgcisrKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHRmb3IgKHZhciBjID0gLTI7IGMgPD0gMjsgYysrKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKHIgPT0gLTIgfHwgciA9PSAyIHx8IGMgPT0gLTIgfHwgYyA9PSAyIFxyXG5cdFx0XHRcdFx0XHRcdFx0fHwgKHIgPT0gMCAmJiBjID09IDApICkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IHRydWU7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdHNldHVwVHlwZU51bWJlciA6IGZ1bmN0aW9uKHRlc3QpIHtcclxuXHRcclxuXHRcdHZhciBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVOdW1iZXIodGhpcy50eXBlTnVtYmVyKTtcclxuXHRcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xyXG5cdFx0XHR2YXIgbW9kID0gKCF0ZXN0ICYmICggKGJpdHMgPj4gaSkgJiAxKSA9PSAxKTtcclxuXHRcdFx0dGhpcy5tb2R1bGVzW01hdGguZmxvb3IoaSAvIDMpXVtpICUgMyArIHRoaXMubW9kdWxlQ291bnQgLSA4IC0gM10gPSBtb2Q7XHJcblx0XHR9XHJcblx0XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDE4OyBpKyspIHtcclxuXHRcdFx0dmFyIG1vZCA9ICghdGVzdCAmJiAoIChiaXRzID4+IGkpICYgMSkgPT0gMSk7XHJcblx0XHRcdHRoaXMubW9kdWxlc1tpICUgMyArIHRoaXMubW9kdWxlQ291bnQgLSA4IC0gM11bTWF0aC5mbG9vcihpIC8gMyldID0gbW9kO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0c2V0dXBUeXBlSW5mbyA6IGZ1bmN0aW9uKHRlc3QsIG1hc2tQYXR0ZXJuKSB7XHJcblx0XHJcblx0XHR2YXIgZGF0YSA9ICh0aGlzLmVycm9yQ29ycmVjdExldmVsIDw8IDMpIHwgbWFza1BhdHRlcm47XHJcblx0XHR2YXIgYml0cyA9IFFSVXRpbC5nZXRCQ0hUeXBlSW5mbyhkYXRhKTtcclxuXHRcclxuXHRcdC8vIHZlcnRpY2FsXHRcdFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcblx0XHJcblx0XHRcdHZhciBtb2QgPSAoIXRlc3QgJiYgKCAoYml0cyA+PiBpKSAmIDEpID09IDEpO1xyXG5cdFxyXG5cdFx0XHRpZiAoaSA8IDYpIHtcclxuXHRcdFx0XHR0aGlzLm1vZHVsZXNbaV1bOF0gPSBtb2Q7XHJcblx0XHRcdH0gZWxzZSBpZiAoaSA8IDgpIHtcclxuXHRcdFx0XHR0aGlzLm1vZHVsZXNbaSArIDFdWzhdID0gbW9kO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kdWxlc1t0aGlzLm1vZHVsZUNvdW50IC0gMTUgKyBpXVs4XSA9IG1vZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0Ly8gaG9yaXpvbnRhbFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcblx0XHJcblx0XHRcdHZhciBtb2QgPSAoIXRlc3QgJiYgKCAoYml0cyA+PiBpKSAmIDEpID09IDEpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGkgPCA4KSB7XHJcblx0XHRcdFx0dGhpcy5tb2R1bGVzWzhdW3RoaXMubW9kdWxlQ291bnQgLSBpIC0gMV0gPSBtb2Q7XHJcblx0XHRcdH0gZWxzZSBpZiAoaSA8IDkpIHtcclxuXHRcdFx0XHR0aGlzLm1vZHVsZXNbOF1bMTUgLSBpIC0gMSArIDFdID0gbW9kO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kdWxlc1s4XVsxNSAtIGkgLSAxXSA9IG1vZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0Ly8gZml4ZWQgbW9kdWxlXHJcblx0XHR0aGlzLm1vZHVsZXNbdGhpcy5tb2R1bGVDb3VudCAtIDhdWzhdID0gKCF0ZXN0KTtcclxuXHRcclxuXHR9LFxyXG5cdFxyXG5cdG1hcERhdGEgOiBmdW5jdGlvbihkYXRhLCBtYXNrUGF0dGVybikge1xyXG5cdFx0XHJcblx0XHR2YXIgaW5jID0gLTE7XHJcblx0XHR2YXIgcm93ID0gdGhpcy5tb2R1bGVDb3VudCAtIDE7XHJcblx0XHR2YXIgYml0SW5kZXggPSA3O1xyXG5cdFx0dmFyIGJ5dGVJbmRleCA9IDA7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIGNvbCA9IHRoaXMubW9kdWxlQ291bnQgLSAxOyBjb2wgPiAwOyBjb2wgLT0gMikge1xyXG5cdFxyXG5cdFx0XHRpZiAoY29sID09IDYpIGNvbC0tO1xyXG5cdFxyXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFxyXG5cdFx0XHRcdGZvciAodmFyIGMgPSAwOyBjIDwgMjsgYysrKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR2YXIgZGFyayA9IGZhbHNlO1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRpZiAoYnl0ZUluZGV4IDwgZGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRkYXJrID0gKCAoIChkYXRhW2J5dGVJbmRleF0gPj4+IGJpdEluZGV4KSAmIDEpID09IDEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHJcblx0XHRcdFx0XHRcdHZhciBtYXNrID0gUVJVdGlsLmdldE1hc2sobWFza1BhdHRlcm4sIHJvdywgY29sIC0gYyk7XHJcblx0XHJcblx0XHRcdFx0XHRcdGlmIChtYXNrKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGFyayA9ICFkYXJrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXSA9IGRhcms7XHJcblx0XHRcdFx0XHRcdGJpdEluZGV4LS07XHJcblx0XHJcblx0XHRcdFx0XHRcdGlmIChiaXRJbmRleCA9PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdGJ5dGVJbmRleCsrO1xyXG5cdFx0XHRcdFx0XHRcdGJpdEluZGV4ID0gNztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdHJvdyArPSBpbmM7XHJcblx0XHJcblx0XHRcdFx0aWYgKHJvdyA8IDAgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSByb3cpIHtcclxuXHRcdFx0XHRcdHJvdyAtPSBpbmM7XHJcblx0XHRcdFx0XHRpbmMgPSAtaW5jO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG59O1xyXG5cclxuUVJDb2RlLlBBRDAgPSAweEVDO1xyXG5RUkNvZGUuUEFEMSA9IDB4MTE7XHJcblxyXG5RUkNvZGUuY3JlYXRlRGF0YSA9IGZ1bmN0aW9uKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsLCBkYXRhTGlzdCkge1xyXG5cdFxyXG5cdHZhciByc0Jsb2NrcyA9IFFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCk7XHJcblx0XHJcblx0dmFyIGJ1ZmZlciA9IG5ldyBRUkJpdEJ1ZmZlcigpO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBkYXRhID0gZGF0YUxpc3RbaV07XHJcblx0XHRidWZmZXIucHV0KGRhdGEubW9kZSwgNCk7XHJcblx0XHRidWZmZXIucHV0KGRhdGEuZ2V0TGVuZ3RoKCksIFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMoZGF0YS5tb2RlLCB0eXBlTnVtYmVyKSApO1xyXG5cdFx0ZGF0YS53cml0ZShidWZmZXIpO1xyXG5cdH1cclxuXHJcblx0Ly8gY2FsYyBudW0gbWF4IGRhdGEuXHJcblx0dmFyIHRvdGFsRGF0YUNvdW50ID0gMDtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR0b3RhbERhdGFDb3VudCArPSByc0Jsb2Nrc1tpXS5kYXRhQ291bnQ7XHJcblx0fVxyXG5cclxuXHRpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID4gdG90YWxEYXRhQ291bnQgKiA4KSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIGxlbmd0aCBvdmVyZmxvdy4gKFwiXHJcblx0XHRcdCsgYnVmZmVyLmdldExlbmd0aEluQml0cygpXHJcblx0XHRcdCsgXCI+XCJcclxuXHRcdFx0KyAgdG90YWxEYXRhQ291bnQgKiA4XHJcblx0XHRcdCsgXCIpXCIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZW5kIGNvZGVcclxuXHRpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpICsgNCA8PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcclxuXHRcdGJ1ZmZlci5wdXQoMCwgNCk7XHJcblx0fVxyXG5cclxuXHQvLyBwYWRkaW5nXHJcblx0d2hpbGUgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSAlIDggIT0gMCkge1xyXG5cdFx0YnVmZmVyLnB1dEJpdChmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvLyBwYWRkaW5nXHJcblx0d2hpbGUgKHRydWUpIHtcclxuXHRcdFxyXG5cdFx0aWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRidWZmZXIucHV0KFFSQ29kZS5QQUQwLCA4KTtcclxuXHRcdFxyXG5cdFx0aWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRidWZmZXIucHV0KFFSQ29kZS5QQUQxLCA4KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBRUkNvZGUuY3JlYXRlQnl0ZXMoYnVmZmVyLCByc0Jsb2Nrcyk7XHJcbn1cclxuXHJcblFSQ29kZS5jcmVhdGVCeXRlcyA9IGZ1bmN0aW9uKGJ1ZmZlciwgcnNCbG9ja3MpIHtcclxuXHJcblx0dmFyIG9mZnNldCA9IDA7XHJcblx0XHJcblx0dmFyIG1heERjQ291bnQgPSAwO1xyXG5cdHZhciBtYXhFY0NvdW50ID0gMDtcclxuXHRcclxuXHR2YXIgZGNkYXRhID0gbmV3IEFycmF5KHJzQmxvY2tzLmxlbmd0aCk7XHJcblx0dmFyIGVjZGF0YSA9IG5ldyBBcnJheShyc0Jsb2Nrcy5sZW5ndGgpO1xyXG5cdFxyXG5cdGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByKyspIHtcclxuXHJcblx0XHR2YXIgZGNDb3VudCA9IHJzQmxvY2tzW3JdLmRhdGFDb3VudDtcclxuXHRcdHZhciBlY0NvdW50ID0gcnNCbG9ja3Nbcl0udG90YWxDb3VudCAtIGRjQ291bnQ7XHJcblxyXG5cdFx0bWF4RGNDb3VudCA9IE1hdGgubWF4KG1heERjQ291bnQsIGRjQ291bnQpO1xyXG5cdFx0bWF4RWNDb3VudCA9IE1hdGgubWF4KG1heEVjQ291bnQsIGVjQ291bnQpO1xyXG5cdFx0XHJcblx0XHRkY2RhdGFbcl0gPSBuZXcgQXJyYXkoZGNDb3VudCk7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGNkYXRhW3JdLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGRjZGF0YVtyXVtpXSA9IDB4ZmYgJiBidWZmZXIuYnVmZmVyW2kgKyBvZmZzZXRdO1xyXG5cdFx0fVxyXG5cdFx0b2Zmc2V0ICs9IGRjQ291bnQ7XHJcblx0XHRcclxuXHRcdHZhciByc1BvbHkgPSBRUlV0aWwuZ2V0RXJyb3JDb3JyZWN0UG9seW5vbWlhbChlY0NvdW50KTtcclxuXHRcdHZhciByYXdQb2x5ID0gbmV3IFFSUG9seW5vbWlhbChkY2RhdGFbcl0sIHJzUG9seS5nZXRMZW5ndGgoKSAtIDEpO1xyXG5cclxuXHRcdHZhciBtb2RQb2x5ID0gcmF3UG9seS5tb2QocnNQb2x5KTtcclxuXHRcdGVjZGF0YVtyXSA9IG5ldyBBcnJheShyc1BvbHkuZ2V0TGVuZ3RoKCkgLSAxKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWNkYXRhW3JdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RJbmRleCA9IGkgKyBtb2RQb2x5LmdldExlbmd0aCgpIC0gZWNkYXRhW3JdLmxlbmd0aDtcclxuXHRcdFx0ZWNkYXRhW3JdW2ldID0gKG1vZEluZGV4ID49IDApPyBtb2RQb2x5LmdldChtb2RJbmRleCkgOiAwO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0XHJcblx0dmFyIHRvdGFsQ29kZUNvdW50ID0gMDtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR0b3RhbENvZGVDb3VudCArPSByc0Jsb2Nrc1tpXS50b3RhbENvdW50O1xyXG5cdH1cclxuXHJcblx0dmFyIGRhdGEgPSBuZXcgQXJyYXkodG90YWxDb2RlQ291bnQpO1xyXG5cdHZhciBpbmRleCA9IDA7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RGNDb3VudDsgaSsrKSB7XHJcblx0XHRmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XHJcblx0XHRcdGlmIChpIDwgZGNkYXRhW3JdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGRhdGFbaW5kZXgrK10gPSBkY2RhdGFbcl1baV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RWNDb3VudDsgaSsrKSB7XHJcblx0XHRmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XHJcblx0XHRcdGlmIChpIDwgZWNkYXRhW3JdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGRhdGFbaW5kZXgrK10gPSBlY2RhdGFbcl1baV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG5cclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gUVJNb2RlXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG52YXIgUVJNb2RlID0ge1xyXG5cdE1PREVfTlVNQkVSIDpcdFx0MSA8PCAwLFxyXG5cdE1PREVfQUxQSEFfTlVNIDogXHQxIDw8IDEsXHJcblx0TU9ERV84QklUX0JZVEUgOiBcdDEgPDwgMixcclxuXHRNT0RFX0tBTkpJIDpcdFx0MSA8PCAzXHJcbn07XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBRUkVycm9yQ29ycmVjdExldmVsXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiBcclxudmFyIFFSRXJyb3JDb3JyZWN0TGV2ZWwgPSB7XHJcblx0TCA6IDEsXHJcblx0TSA6IDAsXHJcblx0USA6IDMsXHJcblx0SCA6IDJcclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFFSTWFza1BhdHRlcm5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbnZhciBRUk1hc2tQYXR0ZXJuID0ge1xyXG5cdFBBVFRFUk4wMDAgOiAwLFxyXG5cdFBBVFRFUk4wMDEgOiAxLFxyXG5cdFBBVFRFUk4wMTAgOiAyLFxyXG5cdFBBVFRFUk4wMTEgOiAzLFxyXG5cdFBBVFRFUk4xMDAgOiA0LFxyXG5cdFBBVFRFUk4xMDEgOiA1LFxyXG5cdFBBVFRFUk4xMTAgOiA2LFxyXG5cdFBBVFRFUk4xMTEgOiA3XHJcbn07XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBRUlV0aWxcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuIFxyXG52YXIgUVJVdGlsID0ge1xyXG5cclxuICAgIFBBVFRFUk5fUE9TSVRJT05fVEFCTEUgOiBbXHJcblx0ICAgIFtdLFxyXG5cdCAgICBbNiwgMThdLFxyXG5cdCAgICBbNiwgMjJdLFxyXG5cdCAgICBbNiwgMjZdLFxyXG5cdCAgICBbNiwgMzBdLFxyXG5cdCAgICBbNiwgMzRdLFxyXG5cdCAgICBbNiwgMjIsIDM4XSxcclxuXHQgICAgWzYsIDI0LCA0Ml0sXHJcblx0ICAgIFs2LCAyNiwgNDZdLFxyXG5cdCAgICBbNiwgMjgsIDUwXSxcclxuXHQgICAgWzYsIDMwLCA1NF0sXHRcdFxyXG5cdCAgICBbNiwgMzIsIDU4XSxcclxuXHQgICAgWzYsIDM0LCA2Ml0sXHJcblx0ICAgIFs2LCAyNiwgNDYsIDY2XSxcclxuXHQgICAgWzYsIDI2LCA0OCwgNzBdLFxyXG5cdCAgICBbNiwgMjYsIDUwLCA3NF0sXHJcblx0ICAgIFs2LCAzMCwgNTQsIDc4XSxcclxuXHQgICAgWzYsIDMwLCA1NiwgODJdLFxyXG5cdCAgICBbNiwgMzAsIDU4LCA4Nl0sXHJcblx0ICAgIFs2LCAzNCwgNjIsIDkwXSxcclxuXHQgICAgWzYsIDI4LCA1MCwgNzIsIDk0XSxcclxuXHQgICAgWzYsIDI2LCA1MCwgNzQsIDk4XSxcclxuXHQgICAgWzYsIDMwLCA1NCwgNzgsIDEwMl0sXHJcblx0ICAgIFs2LCAyOCwgNTQsIDgwLCAxMDZdLFxyXG5cdCAgICBbNiwgMzIsIDU4LCA4NCwgMTEwXSxcclxuXHQgICAgWzYsIDMwLCA1OCwgODYsIDExNF0sXHJcblx0ICAgIFs2LCAzNCwgNjIsIDkwLCAxMThdLFxyXG5cdCAgICBbNiwgMjYsIDUwLCA3NCwgOTgsIDEyMl0sXHJcblx0ICAgIFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNl0sXHJcblx0ICAgIFs2LCAyNiwgNTIsIDc4LCAxMDQsIDEzMF0sXHJcblx0ICAgIFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXHJcblx0ICAgIFs2LCAzNCwgNjAsIDg2LCAxMTIsIDEzOF0sXHJcblx0ICAgIFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0Ml0sXHJcblx0ICAgIFs2LCAzNCwgNjIsIDkwLCAxMTgsIDE0Nl0sXHJcblx0ICAgIFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNiwgMTUwXSxcclxuXHQgICAgWzYsIDI0LCA1MCwgNzYsIDEwMiwgMTI4LCAxNTRdLFxyXG5cdCAgICBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXHJcblx0ICAgIFs2LCAzMiwgNTgsIDg0LCAxMTAsIDEzNiwgMTYyXSxcclxuXHQgICAgWzYsIDI2LCA1NCwgODIsIDExMCwgMTM4LCAxNjZdLFxyXG5cdCAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDIsIDE3MF1cclxuICAgIF0sXHJcblxyXG4gICAgRzE1IDogKDEgPDwgMTApIHwgKDEgPDwgOCkgfCAoMSA8PCA1KSB8ICgxIDw8IDQpIHwgKDEgPDwgMikgfCAoMSA8PCAxKSB8ICgxIDw8IDApLFxyXG4gICAgRzE4IDogKDEgPDwgMTIpIHwgKDEgPDwgMTEpIHwgKDEgPDwgMTApIHwgKDEgPDwgOSkgfCAoMSA8PCA4KSB8ICgxIDw8IDUpIHwgKDEgPDwgMikgfCAoMSA8PCAwKSxcclxuICAgIEcxNV9NQVNLIDogKDEgPDwgMTQpIHwgKDEgPDwgMTIpIHwgKDEgPDwgMTApXHR8ICgxIDw8IDQpIHwgKDEgPDwgMSksXHJcblxyXG4gICAgZ2V0QkNIVHlwZUluZm8gOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0ICAgIHZhciBkID0gZGF0YSA8PCAxMDtcclxuXHQgICAgd2hpbGUgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE1KSA+PSAwKSB7XHJcblx0XHQgICAgZCBePSAoUVJVdGlsLkcxNSA8PCAoUVJVdGlsLmdldEJDSERpZ2l0KGQpIC0gUVJVdGlsLmdldEJDSERpZ2l0KFFSVXRpbC5HMTUpICkgKTsgXHRcclxuXHQgICAgfVxyXG5cdCAgICByZXR1cm4gKCAoZGF0YSA8PCAxMCkgfCBkKSBeIFFSVXRpbC5HMTVfTUFTSztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QkNIVHlwZU51bWJlciA6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHQgICAgdmFyIGQgPSBkYXRhIDw8IDEyO1xyXG5cdCAgICB3aGlsZSAoUVJVdGlsLmdldEJDSERpZ2l0KGQpIC0gUVJVdGlsLmdldEJDSERpZ2l0KFFSVXRpbC5HMTgpID49IDApIHtcclxuXHRcdCAgICBkIF49IChRUlV0aWwuRzE4IDw8IChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxOCkgKSApOyBcdFxyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiAoZGF0YSA8PCAxMikgfCBkO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRCQ0hEaWdpdCA6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0ICAgIHZhciBkaWdpdCA9IDA7XHJcblxyXG5cdCAgICB3aGlsZSAoZGF0YSAhPSAwKSB7XHJcblx0XHQgICAgZGlnaXQrKztcclxuXHRcdCAgICBkYXRhID4+Pj0gMTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGRpZ2l0O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQYXR0ZXJuUG9zaXRpb24gOiBmdW5jdGlvbih0eXBlTnVtYmVyKSB7XHJcblx0ICAgIHJldHVybiBRUlV0aWwuUEFUVEVSTl9QT1NJVElPTl9UQUJMRVt0eXBlTnVtYmVyIC0gMV07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldE1hc2sgOiBmdW5jdGlvbihtYXNrUGF0dGVybiwgaSwgaikge1xyXG5cdCAgICBcclxuXHQgICAgc3dpdGNoIChtYXNrUGF0dGVybikge1xyXG5cdFx0ICAgIFxyXG5cdCAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMCA6IHJldHVybiAoaSArIGopICUgMiA9PSAwO1xyXG5cdCAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMSA6IHJldHVybiBpICUgMiA9PSAwO1xyXG5cdCAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAxMCA6IHJldHVybiBqICUgMyA9PSAwO1xyXG5cdCAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAxMSA6IHJldHVybiAoaSArIGopICUgMyA9PSAwO1xyXG5cdCAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMCA6IHJldHVybiAoTWF0aC5mbG9vcihpIC8gMikgKyBNYXRoLmZsb29yKGogLyAzKSApICUgMiA9PSAwO1xyXG5cdCAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMSA6IHJldHVybiAoaSAqIGopICUgMiArIChpICogaikgJSAzID09IDA7XHJcblx0ICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMTEwIDogcmV0dXJuICggKGkgKiBqKSAlIDIgKyAoaSAqIGopICUgMykgJSAyID09IDA7XHJcblx0ICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMTExIDogcmV0dXJuICggKGkgKiBqKSAlIDMgKyAoaSArIGopICUgMikgJSAyID09IDA7XHJcblxyXG5cdCAgICBkZWZhdWx0IDpcclxuXHRcdCAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYWQgbWFza1BhdHRlcm46XCIgKyBtYXNrUGF0dGVybik7XHJcblx0ICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RXJyb3JDb3JyZWN0UG9seW5vbWlhbCA6IGZ1bmN0aW9uKGVycm9yQ29ycmVjdExlbmd0aCkge1xyXG5cclxuXHQgICAgdmFyIGEgPSBuZXcgUVJQb2x5bm9taWFsKFsxXSwgMCk7XHJcblxyXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yQ29ycmVjdExlbmd0aDsgaSsrKSB7XHJcblx0XHQgICAgYSA9IGEubXVsdGlwbHkobmV3IFFSUG9seW5vbWlhbChbMSwgUVJNYXRoLmdleHAoaSldLCAwKSApO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gYTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TGVuZ3RoSW5CaXRzIDogZnVuY3Rpb24obW9kZSwgdHlwZSkge1xyXG5cclxuXHQgICAgaWYgKDEgPD0gdHlwZSAmJiB0eXBlIDwgMTApIHtcclxuXHJcblx0XHQgICAgLy8gMSAtIDlcclxuXHJcblx0XHQgICAgc3dpdGNoKG1vZGUpIHtcclxuXHRcdCAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUiBcdDogcmV0dXJuIDEwO1xyXG5cdFx0ICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNIFx0OiByZXR1cm4gOTtcclxuXHRcdCAgICBjYXNlIFFSTW9kZS5NT0RFXzhCSVRfQllURVx0OiByZXR1cm4gODtcclxuXHRcdCAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJICBcdDogcmV0dXJuIDg7XHJcblx0XHQgICAgZGVmYXVsdCA6XHJcblx0XHRcdCAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiICsgbW9kZSk7XHJcblx0XHQgICAgfVxyXG5cclxuXHQgICAgfSBlbHNlIGlmICh0eXBlIDwgMjcpIHtcclxuXHJcblx0XHQgICAgLy8gMTAgLSAyNlxyXG5cclxuXHRcdCAgICBzd2l0Y2gobW9kZSkge1xyXG5cdFx0ICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSIFx0OiByZXR1cm4gMTI7XHJcblx0XHQgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU0gXHQ6IHJldHVybiAxMTtcclxuXHRcdCAgICBjYXNlIFFSTW9kZS5NT0RFXzhCSVRfQllURVx0OiByZXR1cm4gMTY7XHJcblx0XHQgICAgY2FzZSBRUk1vZGUuTU9ERV9LQU5KSSAgXHQ6IHJldHVybiAxMDtcclxuXHRcdCAgICBkZWZhdWx0IDpcclxuXHRcdFx0ICAgIHRocm93IG5ldyBFcnJvcihcIm1vZGU6XCIgKyBtb2RlKTtcclxuXHRcdCAgICB9XHJcblxyXG5cdCAgICB9IGVsc2UgaWYgKHR5cGUgPCA0MSkge1xyXG5cclxuXHRcdCAgICAvLyAyNyAtIDQwXHJcblxyXG5cdFx0ICAgIHN3aXRjaChtb2RlKSB7XHJcblx0XHQgICAgY2FzZSBRUk1vZGUuTU9ERV9OVU1CRVIgXHQ6IHJldHVybiAxNDtcclxuXHRcdCAgICBjYXNlIFFSTW9kZS5NT0RFX0FMUEhBX05VTVx0OiByZXR1cm4gMTM7XHJcblx0XHQgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEVcdDogcmV0dXJuIDE2O1xyXG5cdFx0ICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkkgIFx0OiByZXR1cm4gMTI7XHJcblx0XHQgICAgZGVmYXVsdCA6XHJcblx0XHRcdCAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiICsgbW9kZSk7XHJcblx0XHQgICAgfVxyXG5cclxuXHQgICAgfSBlbHNlIHtcclxuXHRcdCAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlOlwiICsgdHlwZSk7XHJcblx0ICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TG9zdFBvaW50IDogZnVuY3Rpb24ocXJDb2RlKSB7XHJcblx0ICAgIFxyXG5cdCAgICB2YXIgbW9kdWxlQ291bnQgPSBxckNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcclxuXHQgICAgXHJcblx0ICAgIHZhciBsb3N0UG9pbnQgPSAwO1xyXG5cdCAgICBcclxuXHQgICAgLy8gTEVWRUwxXHJcblx0ICAgIFxyXG5cdCAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcclxuXHJcblx0XHQgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XHJcblxyXG5cdFx0XHQgICAgdmFyIHNhbWVDb3VudCA9IDA7XHJcblx0XHRcdCAgICB2YXIgZGFyayA9IHFyQ29kZS5pc0Rhcmsocm93LCBjb2wpO1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciByID0gLTE7IHIgPD0gMTsgcisrKSB7XHJcblxyXG5cdFx0XHRcdCAgICBpZiAocm93ICsgciA8IDAgfHwgbW9kdWxlQ291bnQgPD0gcm93ICsgcikge1xyXG5cdFx0XHRcdFx0ICAgIGNvbnRpbnVlO1xyXG5cdFx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHRcdCAgICBmb3IgKHZhciBjID0gLTE7IGMgPD0gMTsgYysrKSB7XHJcblxyXG5cdFx0XHRcdFx0ICAgIGlmIChjb2wgKyBjIDwgMCB8fCBtb2R1bGVDb3VudCA8PSBjb2wgKyBjKSB7XHJcblx0XHRcdFx0XHRcdCAgICBjb250aW51ZTtcclxuXHRcdFx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHRcdFx0ICAgIGlmIChyID09IDAgJiYgYyA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdCAgICBjb250aW51ZTtcclxuXHRcdFx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHRcdFx0ICAgIGlmIChkYXJrID09IHFyQ29kZS5pc0Rhcmsocm93ICsgciwgY29sICsgYykgKSB7XHJcblx0XHRcdFx0XHRcdCAgICBzYW1lQ291bnQrKztcclxuXHRcdFx0XHRcdCAgICB9XHJcblx0XHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIH1cclxuXHJcblx0XHRcdCAgICBpZiAoc2FtZUNvdW50ID4gNSkge1xyXG5cdFx0XHRcdCAgICBsb3N0UG9pbnQgKz0gKDMgKyBzYW1lQ291bnQgLSA1KTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdCAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIC8vIExFVkVMMlxyXG5cclxuXHQgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSAxOyByb3crKykge1xyXG5cdFx0ICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50IC0gMTsgY29sKyspIHtcclxuXHRcdFx0ICAgIHZhciBjb3VudCA9IDA7XHJcblx0XHRcdCAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csICAgICBjb2wgICAgKSApIGNvdW50Kys7XHJcblx0XHRcdCAgICBpZiAocXJDb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wgICAgKSApIGNvdW50Kys7XHJcblx0XHRcdCAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csICAgICBjb2wgKyAxKSApIGNvdW50Kys7XHJcblx0XHRcdCAgICBpZiAocXJDb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wgKyAxKSApIGNvdW50Kys7XHJcblx0XHRcdCAgICBpZiAoY291bnQgPT0gMCB8fCBjb3VudCA9PSA0KSB7XHJcblx0XHRcdFx0ICAgIGxvc3RQb2ludCArPSAzO1xyXG5cdFx0XHQgICAgfVxyXG5cdFx0ICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgLy8gTEVWRUwzXHJcblxyXG5cdCAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcclxuXHRcdCAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDY7IGNvbCsrKSB7XHJcblx0XHRcdCAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbClcclxuXHRcdFx0XHRcdCAgICAmJiAhcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDEpXHJcblx0XHRcdFx0XHQgICAgJiYgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyAyKVxyXG5cdFx0XHRcdFx0ICAgICYmICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgMylcclxuXHRcdFx0XHRcdCAgICAmJiAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDQpXHJcblx0XHRcdFx0XHQgICAgJiYgIXFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyA1KVxyXG5cdFx0XHRcdFx0ICAgICYmICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgNikgKSB7XHJcblx0XHRcdFx0ICAgIGxvc3RQb2ludCArPSA0MDtcclxuXHRcdFx0ICAgIH1cclxuXHRcdCAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wrKykge1xyXG5cdFx0ICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50IC0gNjsgcm93KyspIHtcclxuXHRcdFx0ICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sKVxyXG5cdFx0XHRcdFx0ICAgICYmICFxckNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbClcclxuXHRcdFx0XHRcdCAgICAmJiAgcXJDb2RlLmlzRGFyayhyb3cgKyAyLCBjb2wpXHJcblx0XHRcdFx0XHQgICAgJiYgIHFyQ29kZS5pc0Rhcmsocm93ICsgMywgY29sKVxyXG5cdFx0XHRcdFx0ICAgICYmICBxckNvZGUuaXNEYXJrKHJvdyArIDQsIGNvbClcclxuXHRcdFx0XHRcdCAgICAmJiAhcXJDb2RlLmlzRGFyayhyb3cgKyA1LCBjb2wpXHJcblx0XHRcdFx0XHQgICAgJiYgIHFyQ29kZS5pc0Rhcmsocm93ICsgNiwgY29sKSApIHtcclxuXHRcdFx0XHQgICAgbG9zdFBvaW50ICs9IDQwO1xyXG5cdFx0XHQgICAgfVxyXG5cdFx0ICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgLy8gTEVWRUw0XHJcblx0ICAgIFxyXG5cdCAgICB2YXIgZGFya0NvdW50ID0gMDtcclxuXHJcblx0ICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wrKykge1xyXG5cdFx0ICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xyXG5cdFx0XHQgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93LCBjb2wpICkge1xyXG5cdFx0XHRcdCAgICBkYXJrQ291bnQrKztcclxuXHRcdFx0ICAgIH1cclxuXHRcdCAgICB9XHJcblx0ICAgIH1cclxuXHQgICAgXHJcblx0ICAgIHZhciByYXRpbyA9IE1hdGguYWJzKDEwMCAqIGRhcmtDb3VudCAvIG1vZHVsZUNvdW50IC8gbW9kdWxlQ291bnQgLSA1MCkgLyA1O1xyXG5cdCAgICBsb3N0UG9pbnQgKz0gcmF0aW8gKiAxMDtcclxuXHJcblx0ICAgIHJldHVybiBsb3N0UG9pbnQ7XHRcdFxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBRUk1hdGhcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbnZhciBRUk1hdGggPSB7XHJcblxyXG5cdGdsb2cgOiBmdW5jdGlvbihuKSB7XHJcblx0XHJcblx0XHRpZiAobiA8IDEpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZ2xvZyhcIiArIG4gKyBcIilcIik7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBRUk1hdGguTE9HX1RBQkxFW25dO1xyXG5cdH0sXHJcblx0XHJcblx0Z2V4cCA6IGZ1bmN0aW9uKG4pIHtcclxuXHRcclxuXHRcdHdoaWxlIChuIDwgMCkge1xyXG5cdFx0XHRuICs9IDI1NTtcclxuXHRcdH1cclxuXHRcclxuXHRcdHdoaWxlIChuID49IDI1Nikge1xyXG5cdFx0XHRuIC09IDI1NTtcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBRUk1hdGguRVhQX1RBQkxFW25dO1xyXG5cdH0sXHJcblx0XHJcblx0RVhQX1RBQkxFIDogbmV3IEFycmF5KDI1NiksXHJcblx0XHJcblx0TE9HX1RBQkxFIDogbmV3IEFycmF5KDI1NilcclxuXHJcbn07XHJcblx0XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcblx0UVJNYXRoLkVYUF9UQUJMRVtpXSA9IDEgPDwgaTtcclxufVxyXG5mb3IgKHZhciBpID0gODsgaSA8IDI1NjsgaSsrKSB7XHJcblx0UVJNYXRoLkVYUF9UQUJMRVtpXSA9IFFSTWF0aC5FWFBfVEFCTEVbaSAtIDRdXHJcblx0XHReIFFSTWF0aC5FWFBfVEFCTEVbaSAtIDVdXHJcblx0XHReIFFSTWF0aC5FWFBfVEFCTEVbaSAtIDZdXHJcblx0XHReIFFSTWF0aC5FWFBfVEFCTEVbaSAtIDhdO1xyXG59XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU1OyBpKyspIHtcclxuXHRRUk1hdGguTE9HX1RBQkxFW1FSTWF0aC5FWFBfVEFCTEVbaV0gXSA9IGk7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFFSUG9seW5vbWlhbFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gUVJQb2x5bm9taWFsKG51bSwgc2hpZnQpIHtcclxuXHJcblx0aWYgKG51bS5sZW5ndGggPT0gdW5kZWZpbmVkKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IobnVtLmxlbmd0aCArIFwiL1wiICsgc2hpZnQpO1xyXG5cdH1cclxuXHJcblx0dmFyIG9mZnNldCA9IDA7XHJcblxyXG5cdHdoaWxlIChvZmZzZXQgPCBudW0ubGVuZ3RoICYmIG51bVtvZmZzZXRdID09IDApIHtcclxuXHRcdG9mZnNldCsrO1xyXG5cdH1cclxuXHJcblx0dGhpcy5udW0gPSBuZXcgQXJyYXkobnVtLmxlbmd0aCAtIG9mZnNldCArIHNoaWZ0KTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IG51bS5sZW5ndGggLSBvZmZzZXQ7IGkrKykge1xyXG5cdFx0dGhpcy5udW1baV0gPSBudW1baSArIG9mZnNldF07XHJcblx0fVxyXG59XHJcblxyXG5RUlBvbHlub21pYWwucHJvdG90eXBlID0ge1xyXG5cclxuXHRnZXQgOiBmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtW2luZGV4XTtcclxuXHR9LFxyXG5cdFxyXG5cdGdldExlbmd0aCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtLmxlbmd0aDtcclxuXHR9LFxyXG5cdFxyXG5cdG11bHRpcGx5IDogZnVuY3Rpb24oZSkge1xyXG5cdFxyXG5cdFx0dmFyIG51bSA9IG5ldyBBcnJheSh0aGlzLmdldExlbmd0aCgpICsgZS5nZXRMZW5ndGgoKSAtIDEpO1xyXG5cdFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldExlbmd0aCgpOyBpKyspIHtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBlLmdldExlbmd0aCgpOyBqKyspIHtcclxuXHRcdFx0XHRudW1baSArIGpdIF49IFFSTWF0aC5nZXhwKFFSTWF0aC5nbG9nKHRoaXMuZ2V0KGkpICkgKyBRUk1hdGguZ2xvZyhlLmdldChqKSApICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBuZXcgUVJQb2x5bm9taWFsKG51bSwgMCk7XHJcblx0fSxcclxuXHRcclxuXHRtb2QgOiBmdW5jdGlvbihlKSB7XHJcblx0XHJcblx0XHRpZiAodGhpcy5nZXRMZW5ndGgoKSAtIGUuZ2V0TGVuZ3RoKCkgPCAwKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0dmFyIHJhdGlvID0gUVJNYXRoLmdsb2codGhpcy5nZXQoMCkgKSAtIFFSTWF0aC5nbG9nKGUuZ2V0KDApICk7XHJcblx0XHJcblx0XHR2YXIgbnVtID0gbmV3IEFycmF5KHRoaXMuZ2V0TGVuZ3RoKCkgKTtcclxuXHRcdFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldExlbmd0aCgpOyBpKyspIHtcclxuXHRcdFx0bnVtW2ldID0gdGhpcy5nZXQoaSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZS5nZXRMZW5ndGgoKTsgaSsrKSB7XHJcblx0XHRcdG51bVtpXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyhlLmdldChpKSApICsgcmF0aW8pO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0Ly8gcmVjdXJzaXZlIGNhbGxcclxuXHRcdHJldHVybiBuZXcgUVJQb2x5bm9taWFsKG51bSwgMCkubW9kKGUpO1xyXG5cdH1cclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFFSUlNCbG9ja1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gUVJSU0Jsb2NrKHRvdGFsQ291bnQsIGRhdGFDb3VudCkge1xyXG5cdHRoaXMudG90YWxDb3VudCA9IHRvdGFsQ291bnQ7XHJcblx0dGhpcy5kYXRhQ291bnQgID0gZGF0YUNvdW50O1xyXG59XHJcblxyXG5RUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEUgPSBbXHJcblxyXG5cdC8vIExcclxuXHQvLyBNXHJcblx0Ly8gUVxyXG5cdC8vIEhcclxuXHJcblx0Ly8gMVxyXG5cdFsxLCAyNiwgMTldLFxyXG5cdFsxLCAyNiwgMTZdLFxyXG5cdFsxLCAyNiwgMTNdLFxyXG5cdFsxLCAyNiwgOV0sXHJcblx0XHJcblx0Ly8gMlxyXG5cdFsxLCA0NCwgMzRdLFxyXG5cdFsxLCA0NCwgMjhdLFxyXG5cdFsxLCA0NCwgMjJdLFxyXG5cdFsxLCA0NCwgMTZdLFxyXG5cclxuXHQvLyAzXHJcblx0WzEsIDcwLCA1NV0sXHJcblx0WzEsIDcwLCA0NF0sXHJcblx0WzIsIDM1LCAxN10sXHJcblx0WzIsIDM1LCAxM10sXHJcblxyXG5cdC8vIDRcdFx0XHJcblx0WzEsIDEwMCwgODBdLFxyXG5cdFsyLCA1MCwgMzJdLFxyXG5cdFsyLCA1MCwgMjRdLFxyXG5cdFs0LCAyNSwgOV0sXHJcblx0XHJcblx0Ly8gNVxyXG5cdFsxLCAxMzQsIDEwOF0sXHJcblx0WzIsIDY3LCA0M10sXHJcblx0WzIsIDMzLCAxNSwgMiwgMzQsIDE2XSxcclxuXHRbMiwgMzMsIDExLCAyLCAzNCwgMTJdLFxyXG5cdFxyXG5cdC8vIDZcclxuXHRbMiwgODYsIDY4XSxcclxuXHRbNCwgNDMsIDI3XSxcclxuXHRbNCwgNDMsIDE5XSxcclxuXHRbNCwgNDMsIDE1XSxcclxuXHRcclxuXHQvLyA3XHRcdFxyXG5cdFsyLCA5OCwgNzhdLFxyXG5cdFs0LCA0OSwgMzFdLFxyXG5cdFsyLCAzMiwgMTQsIDQsIDMzLCAxNV0sXHJcblx0WzQsIDM5LCAxMywgMSwgNDAsIDE0XSxcclxuXHRcclxuXHQvLyA4XHJcblx0WzIsIDEyMSwgOTddLFxyXG5cdFsyLCA2MCwgMzgsIDIsIDYxLCAzOV0sXHJcblx0WzQsIDQwLCAxOCwgMiwgNDEsIDE5XSxcclxuXHRbNCwgNDAsIDE0LCAyLCA0MSwgMTVdLFxyXG5cdFxyXG5cdC8vIDlcclxuXHRbMiwgMTQ2LCAxMTZdLFxyXG5cdFszLCA1OCwgMzYsIDIsIDU5LCAzN10sXHJcblx0WzQsIDM2LCAxNiwgNCwgMzcsIDE3XSxcclxuXHRbNCwgMzYsIDEyLCA0LCAzNywgMTNdLFxyXG5cdFxyXG5cdC8vIDEwXHRcdFxyXG5cdFsyLCA4NiwgNjgsIDIsIDg3LCA2OV0sXHJcblx0WzQsIDY5LCA0MywgMSwgNzAsIDQ0XSxcclxuXHRbNiwgNDMsIDE5LCAyLCA0NCwgMjBdLFxyXG5cdFs2LCA0MywgMTUsIDIsIDQ0LCAxNl0sXHJcblxyXG5cdC8vIDExXHJcblx0WzQsIDEwMSwgODFdLFxyXG5cdFsxLCA4MCwgNTAsIDQsIDgxLCA1MV0sXHJcblx0WzQsIDUwLCAyMiwgNCwgNTEsIDIzXSxcclxuXHRbMywgMzYsIDEyLCA4LCAzNywgMTNdLFxyXG5cclxuXHQvLyAxMlxyXG5cdFsyLCAxMTYsIDkyLCAyLCAxMTcsIDkzXSxcclxuXHRbNiwgNTgsIDM2LCAyLCA1OSwgMzddLFxyXG5cdFs0LCA0NiwgMjAsIDYsIDQ3LCAyMV0sXHJcblx0WzcsIDQyLCAxNCwgNCwgNDMsIDE1XSxcclxuXHJcblx0Ly8gMTNcclxuXHRbNCwgMTMzLCAxMDddLFxyXG5cdFs4LCA1OSwgMzcsIDEsIDYwLCAzOF0sXHJcblx0WzgsIDQ0LCAyMCwgNCwgNDUsIDIxXSxcclxuXHRbMTIsIDMzLCAxMSwgNCwgMzQsIDEyXSxcclxuXHJcblx0Ly8gMTRcclxuXHRbMywgMTQ1LCAxMTUsIDEsIDE0NiwgMTE2XSxcclxuXHRbNCwgNjQsIDQwLCA1LCA2NSwgNDFdLFxyXG5cdFsxMSwgMzYsIDE2LCA1LCAzNywgMTddLFxyXG5cdFsxMSwgMzYsIDEyLCA1LCAzNywgMTNdLFxyXG5cclxuXHQvLyAxNVxyXG5cdFs1LCAxMDksIDg3LCAxLCAxMTAsIDg4XSxcclxuXHRbNSwgNjUsIDQxLCA1LCA2NiwgNDJdLFxyXG5cdFs1LCA1NCwgMjQsIDcsIDU1LCAyNV0sXHJcblx0WzExLCAzNiwgMTJdLFxyXG5cclxuXHQvLyAxNlxyXG5cdFs1LCAxMjIsIDk4LCAxLCAxMjMsIDk5XSxcclxuXHRbNywgNzMsIDQ1LCAzLCA3NCwgNDZdLFxyXG5cdFsxNSwgNDMsIDE5LCAyLCA0NCwgMjBdLFxyXG5cdFszLCA0NSwgMTUsIDEzLCA0NiwgMTZdLFxyXG5cclxuXHQvLyAxN1xyXG5cdFsxLCAxMzUsIDEwNywgNSwgMTM2LCAxMDhdLFxyXG5cdFsxMCwgNzQsIDQ2LCAxLCA3NSwgNDddLFxyXG5cdFsxLCA1MCwgMjIsIDE1LCA1MSwgMjNdLFxyXG5cdFsyLCA0MiwgMTQsIDE3LCA0MywgMTVdLFxyXG5cclxuXHQvLyAxOFxyXG5cdFs1LCAxNTAsIDEyMCwgMSwgMTUxLCAxMjFdLFxyXG5cdFs5LCA2OSwgNDMsIDQsIDcwLCA0NF0sXHJcblx0WzE3LCA1MCwgMjIsIDEsIDUxLCAyM10sXHJcblx0WzIsIDQyLCAxNCwgMTksIDQzLCAxNV0sXHJcblxyXG5cdC8vIDE5XHJcblx0WzMsIDE0MSwgMTEzLCA0LCAxNDIsIDExNF0sXHJcblx0WzMsIDcwLCA0NCwgMTEsIDcxLCA0NV0sXHJcblx0WzE3LCA0NywgMjEsIDQsIDQ4LCAyMl0sXHJcblx0WzksIDM5LCAxMywgMTYsIDQwLCAxNF0sXHJcblxyXG5cdC8vIDIwXHJcblx0WzMsIDEzNSwgMTA3LCA1LCAxMzYsIDEwOF0sXHJcblx0WzMsIDY3LCA0MSwgMTMsIDY4LCA0Ml0sXHJcblx0WzE1LCA1NCwgMjQsIDUsIDU1LCAyNV0sXHJcblx0WzE1LCA0MywgMTUsIDEwLCA0NCwgMTZdLFxyXG5cclxuXHQvLyAyMVxyXG5cdFs0LCAxNDQsIDExNiwgNCwgMTQ1LCAxMTddLFxyXG5cdFsxNywgNjgsIDQyXSxcclxuXHRbMTcsIDUwLCAyMiwgNiwgNTEsIDIzXSxcclxuXHRbMTksIDQ2LCAxNiwgNiwgNDcsIDE3XSxcclxuXHJcblx0Ly8gMjJcclxuXHRbMiwgMTM5LCAxMTEsIDcsIDE0MCwgMTEyXSxcclxuXHRbMTcsIDc0LCA0Nl0sXHJcblx0WzcsIDU0LCAyNCwgMTYsIDU1LCAyNV0sXHJcblx0WzM0LCAzNywgMTNdLFxyXG5cclxuXHQvLyAyM1xyXG5cdFs0LCAxNTEsIDEyMSwgNSwgMTUyLCAxMjJdLFxyXG5cdFs0LCA3NSwgNDcsIDE0LCA3NiwgNDhdLFxyXG5cdFsxMSwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcclxuXHRbMTYsIDQ1LCAxNSwgMTQsIDQ2LCAxNl0sXHJcblxyXG5cdC8vIDI0XHJcblx0WzYsIDE0NywgMTE3LCA0LCAxNDgsIDExOF0sXHJcblx0WzYsIDczLCA0NSwgMTQsIDc0LCA0Nl0sXHJcblx0WzExLCA1NCwgMjQsIDE2LCA1NSwgMjVdLFxyXG5cdFszMCwgNDYsIDE2LCAyLCA0NywgMTddLFxyXG5cclxuXHQvLyAyNVxyXG5cdFs4LCAxMzIsIDEwNiwgNCwgMTMzLCAxMDddLFxyXG5cdFs4LCA3NSwgNDcsIDEzLCA3NiwgNDhdLFxyXG5cdFs3LCA1NCwgMjQsIDIyLCA1NSwgMjVdLFxyXG5cdFsyMiwgNDUsIDE1LCAxMywgNDYsIDE2XSxcclxuXHJcblx0Ly8gMjZcclxuXHRbMTAsIDE0MiwgMTE0LCAyLCAxNDMsIDExNV0sXHJcblx0WzE5LCA3NCwgNDYsIDQsIDc1LCA0N10sXHJcblx0WzI4LCA1MCwgMjIsIDYsIDUxLCAyM10sXHJcblx0WzMzLCA0NiwgMTYsIDQsIDQ3LCAxN10sXHJcblxyXG5cdC8vIDI3XHJcblx0WzgsIDE1MiwgMTIyLCA0LCAxNTMsIDEyM10sXHJcblx0WzIyLCA3MywgNDUsIDMsIDc0LCA0Nl0sXHJcblx0WzgsIDUzLCAyMywgMjYsIDU0LCAyNF0sXHJcblx0WzEyLCA0NSwgMTUsIDI4LCA0NiwgMTZdLFxyXG5cclxuXHQvLyAyOFxyXG5cdFszLCAxNDcsIDExNywgMTAsIDE0OCwgMTE4XSxcclxuXHRbMywgNzMsIDQ1LCAyMywgNzQsIDQ2XSxcclxuXHRbNCwgNTQsIDI0LCAzMSwgNTUsIDI1XSxcclxuXHRbMTEsIDQ1LCAxNSwgMzEsIDQ2LCAxNl0sXHJcblxyXG5cdC8vIDI5XHJcblx0WzcsIDE0NiwgMTE2LCA3LCAxNDcsIDExN10sXHJcblx0WzIxLCA3MywgNDUsIDcsIDc0LCA0Nl0sXHJcblx0WzEsIDUzLCAyMywgMzcsIDU0LCAyNF0sXHJcblx0WzE5LCA0NSwgMTUsIDI2LCA0NiwgMTZdLFxyXG5cclxuXHQvLyAzMFxyXG5cdFs1LCAxNDUsIDExNSwgMTAsIDE0NiwgMTE2XSxcclxuXHRbMTksIDc1LCA0NywgMTAsIDc2LCA0OF0sXHJcblx0WzE1LCA1NCwgMjQsIDI1LCA1NSwgMjVdLFxyXG5cdFsyMywgNDUsIDE1LCAyNSwgNDYsIDE2XSxcclxuXHJcblx0Ly8gMzFcclxuXHRbMTMsIDE0NSwgMTE1LCAzLCAxNDYsIDExNl0sXHJcblx0WzIsIDc0LCA0NiwgMjksIDc1LCA0N10sXHJcblx0WzQyLCA1NCwgMjQsIDEsIDU1LCAyNV0sXHJcblx0WzIzLCA0NSwgMTUsIDI4LCA0NiwgMTZdLFxyXG5cclxuXHQvLyAzMlxyXG5cdFsxNywgMTQ1LCAxMTVdLFxyXG5cdFsxMCwgNzQsIDQ2LCAyMywgNzUsIDQ3XSxcclxuXHRbMTAsIDU0LCAyNCwgMzUsIDU1LCAyNV0sXHJcblx0WzE5LCA0NSwgMTUsIDM1LCA0NiwgMTZdLFxyXG5cclxuXHQvLyAzM1xyXG5cdFsxNywgMTQ1LCAxMTUsIDEsIDE0NiwgMTE2XSxcclxuXHRbMTQsIDc0LCA0NiwgMjEsIDc1LCA0N10sXHJcblx0WzI5LCA1NCwgMjQsIDE5LCA1NSwgMjVdLFxyXG5cdFsxMSwgNDUsIDE1LCA0NiwgNDYsIDE2XSxcclxuXHJcblx0Ly8gMzRcclxuXHRbMTMsIDE0NSwgMTE1LCA2LCAxNDYsIDExNl0sXHJcblx0WzE0LCA3NCwgNDYsIDIzLCA3NSwgNDddLFxyXG5cdFs0NCwgNTQsIDI0LCA3LCA1NSwgMjVdLFxyXG5cdFs1OSwgNDYsIDE2LCAxLCA0NywgMTddLFxyXG5cclxuXHQvLyAzNVxyXG5cdFsxMiwgMTUxLCAxMjEsIDcsIDE1MiwgMTIyXSxcclxuXHRbMTIsIDc1LCA0NywgMjYsIDc2LCA0OF0sXHJcblx0WzM5LCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxyXG5cdFsyMiwgNDUsIDE1LCA0MSwgNDYsIDE2XSxcclxuXHJcblx0Ly8gMzZcclxuXHRbNiwgMTUxLCAxMjEsIDE0LCAxNTIsIDEyMl0sXHJcblx0WzYsIDc1LCA0NywgMzQsIDc2LCA0OF0sXHJcblx0WzQ2LCA1NCwgMjQsIDEwLCA1NSwgMjVdLFxyXG5cdFsyLCA0NSwgMTUsIDY0LCA0NiwgMTZdLFxyXG5cclxuXHQvLyAzN1xyXG5cdFsxNywgMTUyLCAxMjIsIDQsIDE1MywgMTIzXSxcclxuXHRbMjksIDc0LCA0NiwgMTQsIDc1LCA0N10sXHJcblx0WzQ5LCA1NCwgMjQsIDEwLCA1NSwgMjVdLFxyXG5cdFsyNCwgNDUsIDE1LCA0NiwgNDYsIDE2XSxcclxuXHJcblx0Ly8gMzhcclxuXHRbNCwgMTUyLCAxMjIsIDE4LCAxNTMsIDEyM10sXHJcblx0WzEzLCA3NCwgNDYsIDMyLCA3NSwgNDddLFxyXG5cdFs0OCwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcclxuXHRbNDIsIDQ1LCAxNSwgMzIsIDQ2LCAxNl0sXHJcblxyXG5cdC8vIDM5XHJcblx0WzIwLCAxNDcsIDExNywgNCwgMTQ4LCAxMThdLFxyXG5cdFs0MCwgNzUsIDQ3LCA3LCA3NiwgNDhdLFxyXG5cdFs0MywgNTQsIDI0LCAyMiwgNTUsIDI1XSxcclxuXHRbMTAsIDQ1LCAxNSwgNjcsIDQ2LCAxNl0sXHJcblxyXG5cdC8vIDQwXHJcblx0WzE5LCAxNDgsIDExOCwgNiwgMTQ5LCAxMTldLFxyXG5cdFsxOCwgNzUsIDQ3LCAzMSwgNzYsIDQ4XSxcclxuXHRbMzQsIDU0LCAyNCwgMzQsIDU1LCAyNV0sXHJcblx0WzIwLCA0NSwgMTUsIDYxLCA0NiwgMTZdXHJcbl07XHJcblxyXG5RUlJTQmxvY2suZ2V0UlNCbG9ja3MgPSBmdW5jdGlvbih0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCkge1xyXG5cdFxyXG5cdHZhciByc0Jsb2NrID0gUVJSU0Jsb2NrLmdldFJzQmxvY2tUYWJsZSh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCk7XHJcblx0XHJcblx0aWYgKHJzQmxvY2sgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJiYWQgcnMgYmxvY2sgQCB0eXBlTnVtYmVyOlwiICsgdHlwZU51bWJlciArIFwiL2Vycm9yQ29ycmVjdExldmVsOlwiICsgZXJyb3JDb3JyZWN0TGV2ZWwpO1xyXG5cdH1cclxuXHJcblx0dmFyIGxlbmd0aCA9IHJzQmxvY2subGVuZ3RoIC8gMztcclxuXHRcclxuXHR2YXIgbGlzdCA9IG5ldyBBcnJheSgpO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHR2YXIgY291bnQgPSByc0Jsb2NrW2kgKiAzICsgMF07XHJcblx0XHR2YXIgdG90YWxDb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAxXTtcclxuXHRcdHZhciBkYXRhQ291bnQgID0gcnNCbG9ja1tpICogMyArIDJdO1xyXG5cclxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG5cdFx0XHRsaXN0LnB1c2gobmV3IFFSUlNCbG9jayh0b3RhbENvdW50LCBkYXRhQ291bnQpICk7XHRcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcblFSUlNCbG9jay5nZXRSc0Jsb2NrVGFibGUgPSBmdW5jdGlvbih0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCkge1xyXG5cclxuXHRzd2l0Y2goZXJyb3JDb3JyZWN0TGV2ZWwpIHtcclxuXHRjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuTCA6XHJcblx0XHRyZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMF07XHJcblx0Y2FzZSBRUkVycm9yQ29ycmVjdExldmVsLk0gOlxyXG5cdFx0cmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDFdO1xyXG5cdGNhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5RIDpcclxuXHRcdHJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAyXTtcclxuXHRjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCA6XHJcblx0XHRyZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgM107XHJcblx0ZGVmYXVsdCA6XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gUVJCaXRCdWZmZXJcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIFFSQml0QnVmZmVyKCkge1xyXG5cdHRoaXMuYnVmZmVyID0gbmV3IEFycmF5KCk7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG59XHJcblxyXG5RUkJpdEJ1ZmZlci5wcm90b3R5cGUgPSB7XHJcblxyXG5cdGdldCA6IGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHR2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gOCk7XHJcblx0XHRyZXR1cm4gKCAodGhpcy5idWZmZXJbYnVmSW5kZXhdID4+PiAoNyAtIGluZGV4ICUgOCkgKSAmIDEpID09IDE7XHJcblx0fSxcclxuXHRcclxuXHRwdXQgOiBmdW5jdGlvbihudW0sIGxlbmd0aCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnB1dEJpdCggKCAobnVtID4+PiAobGVuZ3RoIC0gaSAtIDEpICkgJiAxKSA9PSAxKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdGdldExlbmd0aEluQml0cyA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubGVuZ3RoO1xyXG5cdH0sXHJcblx0XHJcblx0cHV0Qml0IDogZnVuY3Rpb24oYml0KSB7XHJcblx0XHJcblx0XHR2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKHRoaXMubGVuZ3RoIC8gOCk7XHJcblx0XHRpZiAodGhpcy5idWZmZXIubGVuZ3RoIDw9IGJ1ZkluZGV4KSB7XHJcblx0XHRcdHRoaXMuYnVmZmVyLnB1c2goMCk7XHJcblx0XHR9XHJcblx0XHJcblx0XHRpZiAoYml0KSB7XHJcblx0XHRcdHRoaXMuYnVmZmVyW2J1ZkluZGV4XSB8PSAoMHg4MCA+Pj4gKHRoaXMubGVuZ3RoICUgOCkgKTtcclxuXHRcdH1cclxuXHRcclxuXHRcdHRoaXMubGVuZ3RoKys7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbi8vIEBrcmlzaXJrXHJcbi8vIHdpbmRvdy5RUkNvZGUgICAgICAgICAgICAgID0gUVJDb2RlIDtcclxuLy8gd2luZG93LlFSRXJyb3JDb3JyZWN0TGV2ZWwgPSBRUkVycm9yQ29ycmVjdExldmVsIDtcclxubW9kdWxlLmV4cG9ydHMgPSB7fSA7XHJcbm1vZHVsZS5leHBvcnRzLlFSQ29kZSA9IFFSQ29kZSA7XHJcbm1vZHVsZS5leHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwgPSBRUkVycm9yQ29ycmVjdExldmVsIDsiXX0=