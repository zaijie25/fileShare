"use strict";
cc._RF.push(module, 'f9841bDVA1Ns5H9XpT0X9zt', 'italkmsg_pb');
// hall/scripts/logic/core/net/tcp/italkmsg_pb.js

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf; // Common aliases

var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util; // Exported root namespace

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.italk = function () {
  /**
   * Namespace italk.
   * @exports italk
   * @namespace
   */
  var italk = {};

  italk.pb = function () {
    /**
     * Namespace pb.
     * @memberof italk
     * @namespace
     */
    var pb = {};
    /**
     * ItalkTypeEnum enum.
     * @name italk.pb.ItalkTypeEnum
     * @enum {string}
     * @property {number} ITKCECHO=0 ITKCECHO value
     * @property {number} ITKSECHO=1 ITKSECHO value
     * @property {number} ITKHEART=2 ITKHEART value
     * @property {number} ITKRegister=3 ITKRegister value
     * @property {number} ITKSubscribe=4 ITKSubscribe value
     * @property {number} ITKPublish=5 ITKPublish value
     * @property {number} ITKPull=6 ITKPull value
     * @property {number} ITKAbnormalFeedback=7 ITKAbnormalFeedback value
     * @property {number} ITKBusinessStatistics=8 ITKBusinessStatistics value
     * @property {number} ITKFeedbackServer=9 ITKFeedbackServer value
     * @property {number} ITKServerSet=10 ITKServerSet value
     * @property {number} ITKServerSetPack=11 ITKServerSetPack value
     * @property {number} ITKLoginNEW=20 ITKLoginNEW value
     * @property {number} ITKLogin=21 ITKLogin value
     * @property {number} ITKChat=22 ITKChat value
     * @property {number} ITKCommon=23 ITKCommon value
     * @property {number} ITKServerChat=40 ITKServerChat value
     * @property {number} ITKServerChatEcho=41 ITKServerChatEcho value
     * @property {number} ITKServerCommon=42 ITKServerCommon value
     * @property {number} ITKServerCommonEcho=43 ITKServerCommonEcho value
     * @property {number} ITKHeartECHO=62 ITKHeartECHO value
     * @property {number} ITKRegisterECHO=63 ITKRegisterECHO value
     * @property {number} ITKSubscribeECHO=64 ITKSubscribeECHO value
     * @property {number} ITKPublishECHO=65 ITKPublishECHO value
     * @property {number} ITKPullECHO=66 ITKPullECHO value
     * @property {number} ITKAbnormalFeedbackECHO=67 ITKAbnormalFeedbackECHO value
     * @property {number} ITKBusinessStatisticsECHO=68 ITKBusinessStatisticsECHO value
     * @property {number} ITKFeedbackServerECHO=69 ITKFeedbackServerECHO value
     * @property {number} ITKServerSetECHO=70 ITKServerSetECHO value
     * @property {number} ITKServerSetPackECHO=71 ITKServerSetPackECHO value
     * @property {number} ITKLoginECHO=81 ITKLoginECHO value
     * @property {number} ITKChatECHO=82 ITKChatECHO value
     * @property {number} ITKCommonECHO=83 ITKCommonECHO value
     */

    pb.ItalkTypeEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKCECHO"] = 0;
      values[valuesById[1] = "ITKSECHO"] = 1;
      values[valuesById[2] = "ITKHEART"] = 2;
      values[valuesById[3] = "ITKRegister"] = 3;
      values[valuesById[4] = "ITKSubscribe"] = 4;
      values[valuesById[5] = "ITKPublish"] = 5;
      values[valuesById[6] = "ITKPull"] = 6;
      values[valuesById[7] = "ITKAbnormalFeedback"] = 7;
      values[valuesById[8] = "ITKBusinessStatistics"] = 8;
      values[valuesById[9] = "ITKFeedbackServer"] = 9;
      values[valuesById[10] = "ITKServerSet"] = 10;
      values[valuesById[11] = "ITKServerSetPack"] = 11;
      values[valuesById[20] = "ITKLoginNEW"] = 20;
      values[valuesById[21] = "ITKLogin"] = 21;
      values[valuesById[22] = "ITKChat"] = 22;
      values[valuesById[23] = "ITKCommon"] = 23;
      values[valuesById[40] = "ITKServerChat"] = 40;
      values[valuesById[41] = "ITKServerChatEcho"] = 41;
      values[valuesById[42] = "ITKServerCommon"] = 42;
      values[valuesById[43] = "ITKServerCommonEcho"] = 43;
      values[valuesById[62] = "ITKHeartECHO"] = 62;
      values[valuesById[63] = "ITKRegisterECHO"] = 63;
      values[valuesById[64] = "ITKSubscribeECHO"] = 64;
      values[valuesById[65] = "ITKPublishECHO"] = 65;
      values[valuesById[66] = "ITKPullECHO"] = 66;
      values[valuesById[67] = "ITKAbnormalFeedbackECHO"] = 67;
      values[valuesById[68] = "ITKBusinessStatisticsECHO"] = 68;
      values[valuesById[69] = "ITKFeedbackServerECHO"] = 69;
      values[valuesById[70] = "ITKServerSetECHO"] = 70;
      values[valuesById[71] = "ITKServerSetPackECHO"] = 71;
      values[valuesById[81] = "ITKLoginECHO"] = 81;
      values[valuesById[82] = "ITKChatECHO"] = 82;
      values[valuesById[83] = "ITKCommonECHO"] = 83;
      return values;
    }();
    /**
     * ItalkErrorEnum enum.
     * @name italk.pb.ItalkErrorEnum
     * @enum {string}
     * @property {number} ITKOK=0 ITKOK value
     * @property {number} ITKERROR=1 ITKERROR value
     * @property {number} ITKXXX=2 ITKXXX value
     */


    pb.ItalkErrorEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKOK"] = 0;
      values[valuesById[1] = "ITKERROR"] = 1;
      values[valuesById[2] = "ITKXXX"] = 2;
      return values;
    }();

    pb.ItalkEchoInfo = function () {
      /**
       * Properties of an ItalkEchoInfo.
       * @memberof italk.pb
       * @interface IItalkEchoInfo
       * @property {italk.pb.ItalkTypeEnum|null} [type] ItalkEchoInfo type
       * @property {italk.pb.ItalkErrorEnum|null} [error] ItalkEchoInfo error
       * @property {string|null} [Info] ItalkEchoInfo Info
       */

      /**
       * Constructs a new ItalkEchoInfo.
       * @memberof italk.pb
       * @classdesc Represents an ItalkEchoInfo.
       * @implements IItalkEchoInfo
       * @constructor
       * @param {italk.pb.IItalkEchoInfo=} [properties] Properties to set
       */
      function ItalkEchoInfo(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkEchoInfo type.
       * @member {italk.pb.ItalkTypeEnum} type
       * @memberof italk.pb.ItalkEchoInfo
       * @instance
       */


      ItalkEchoInfo.prototype.type = 0;
      /**
       * ItalkEchoInfo error.
       * @member {italk.pb.ItalkErrorEnum} error
       * @memberof italk.pb.ItalkEchoInfo
       * @instance
       */

      ItalkEchoInfo.prototype.error = 0;
      /**
       * ItalkEchoInfo Info.
       * @member {string} Info
       * @memberof italk.pb.ItalkEchoInfo
       * @instance
       */

      ItalkEchoInfo.prototype.Info = "";
      /**
       * Creates a new ItalkEchoInfo instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {italk.pb.IItalkEchoInfo=} [properties] Properties to set
       * @returns {italk.pb.ItalkEchoInfo} ItalkEchoInfo instance
       */

      ItalkEchoInfo.create = function create(properties) {
        return new ItalkEchoInfo(properties);
      };
      /**
       * Encodes the specified ItalkEchoInfo message. Does not implicitly {@link italk.pb.ItalkEchoInfo.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {italk.pb.IItalkEchoInfo} message ItalkEchoInfo message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkEchoInfo.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.type);
        if (message.error != null && message.hasOwnProperty("error")) writer.uint32(
        /* id 2, wireType 0 =*/
        16).int32(message.error);
        if (message.Info != null && message.hasOwnProperty("Info")) writer.uint32(
        /* id 3, wireType 2 =*/
        26).string(message.Info);
        return writer;
      };
      /**
       * Encodes the specified ItalkEchoInfo message, length delimited. Does not implicitly {@link italk.pb.ItalkEchoInfo.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {italk.pb.IItalkEchoInfo} message ItalkEchoInfo message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkEchoInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkEchoInfo message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkEchoInfo} ItalkEchoInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkEchoInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkEchoInfo();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.type = reader.int32();
              break;

            case 2:
              message.error = reader.int32();
              break;

            case 3:
              message.Info = reader.string();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkEchoInfo message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkEchoInfo} ItalkEchoInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkEchoInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkEchoInfo message.
       * @function verify
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkEchoInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.type != null && message.hasOwnProperty("type")) switch (message.type) {
          default:
            return "type: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.error != null && message.hasOwnProperty("error")) switch (message.error) {
          default:
            return "error: enum value expected";

          case 0:
          case 1:
          case 2:
            break;
        }
        if (message.Info != null && message.hasOwnProperty("Info")) if (!$util.isString(message.Info)) return "Info: string expected";
        return null;
      };
      /**
       * Creates an ItalkEchoInfo message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkEchoInfo} ItalkEchoInfo
       */


      ItalkEchoInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkEchoInfo) return object;
        var message = new $root.italk.pb.ItalkEchoInfo();

        switch (object.type) {
          case "ITKCECHO":
          case 0:
            message.type = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.type = 1;
            break;

          case "ITKHEART":
          case 2:
            message.type = 2;
            break;

          case "ITKRegister":
          case 3:
            message.type = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.type = 4;
            break;

          case "ITKPublish":
          case 5:
            message.type = 5;
            break;

          case "ITKPull":
          case 6:
            message.type = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.type = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.type = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.type = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.type = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.type = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.type = 20;
            break;

          case "ITKLogin":
          case 21:
            message.type = 21;
            break;

          case "ITKChat":
          case 22:
            message.type = 22;
            break;

          case "ITKCommon":
          case 23:
            message.type = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.type = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.type = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.type = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.type = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.type = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.type = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.type = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.type = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.type = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.type = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.type = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.type = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.type = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.type = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.type = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.type = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.type = 83;
            break;
        }

        switch (object.error) {
          case "ITKOK":
          case 0:
            message.error = 0;
            break;

          case "ITKERROR":
          case 1:
            message.error = 1;
            break;

          case "ITKXXX":
          case 2:
            message.error = 2;
            break;
        }

        if (object.Info != null) message.Info = String(object.Info);
        return message;
      };
      /**
       * Creates a plain object from an ItalkEchoInfo message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkEchoInfo
       * @static
       * @param {italk.pb.ItalkEchoInfo} message ItalkEchoInfo
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkEchoInfo.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.type = options.enums === String ? "ITKCECHO" : 0;
          object.error = options.enums === String ? "ITKOK" : 0;
          object.Info = "";
        }

        if (message.type != null && message.hasOwnProperty("type")) object.type = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.type] : message.type;
        if (message.error != null && message.hasOwnProperty("error")) object.error = options.enums === String ? $root.italk.pb.ItalkErrorEnum[message.error] : message.error;
        if (message.Info != null && message.hasOwnProperty("Info")) object.Info = message.Info;
        return object;
      };
      /**
       * Converts this ItalkEchoInfo to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkEchoInfo
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkEchoInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkEchoInfo;
    }();

    pb.ItalkHeartMsg = function () {
      /**
       * Properties of an ItalkHeartMsg.
       * @memberof italk.pb
       * @interface IItalkHeartMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkHeartMsg msgType
       * @property {number|Long|null} [heartCount] ItalkHeartMsg heartCount
       * @property {number|Long|null} [number] ItalkHeartMsg number
       * @property {string|null} [token] ItalkHeartMsg token
       * @property {string|null} [serverInfo] ItalkHeartMsg serverInfo
       * @property {string|null} [userid] ItalkHeartMsg userid
       */

      /**
       * Constructs a new ItalkHeartMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkHeartMsg.
       * @implements IItalkHeartMsg
       * @constructor
       * @param {italk.pb.IItalkHeartMsg=} [properties] Properties to set
       */
      function ItalkHeartMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkHeartMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       */


      ItalkHeartMsg.prototype.msgType = 0;
      /**
       * ItalkHeartMsg heartCount.
       * @member {number|Long} heartCount
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       */

      ItalkHeartMsg.prototype.heartCount = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      /**
       * ItalkHeartMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       */

      ItalkHeartMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      /**
       * ItalkHeartMsg token.
       * @member {string} token
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       */

      ItalkHeartMsg.prototype.token = "";
      /**
       * ItalkHeartMsg serverInfo.
       * @member {string} serverInfo
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       */

      ItalkHeartMsg.prototype.serverInfo = "";
      /**
       * ItalkHeartMsg userid.
       * @member {string} userid
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       */

      ItalkHeartMsg.prototype.userid = "";
      /**
       * Creates a new ItalkHeartMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {italk.pb.IItalkHeartMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkHeartMsg} ItalkHeartMsg instance
       */

      ItalkHeartMsg.create = function create(properties) {
        return new ItalkHeartMsg(properties);
      };
      /**
       * Encodes the specified ItalkHeartMsg message. Does not implicitly {@link italk.pb.ItalkHeartMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {italk.pb.IItalkHeartMsg} message ItalkHeartMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkHeartMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.heartCount != null && message.hasOwnProperty("heartCount")) writer.uint32(
        /* id 2, wireType 0 =*/
        16).uint64(message.heartCount);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).uint64(message.number);
        if (message.token != null && message.hasOwnProperty("token")) writer.uint32(
        /* id 4, wireType 2 =*/
        34).string(message.token);
        if (message.serverInfo != null && message.hasOwnProperty("serverInfo")) writer.uint32(
        /* id 5, wireType 2 =*/
        42).string(message.serverInfo);
        if (message.userid != null && message.hasOwnProperty("userid")) writer.uint32(
        /* id 6, wireType 2 =*/
        50).string(message.userid);
        return writer;
      };
      /**
       * Encodes the specified ItalkHeartMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkHeartMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {italk.pb.IItalkHeartMsg} message ItalkHeartMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkHeartMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkHeartMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkHeartMsg} ItalkHeartMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkHeartMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkHeartMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.heartCount = reader.uint64();
              break;

            case 3:
              message.number = reader.uint64();
              break;

            case 4:
              message.token = reader.string();
              break;

            case 5:
              message.serverInfo = reader.string();
              break;

            case 6:
              message.userid = reader.string();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkHeartMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkHeartMsg} ItalkHeartMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkHeartMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkHeartMsg message.
       * @function verify
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkHeartMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.heartCount != null && message.hasOwnProperty("heartCount")) if (!$util.isInteger(message.heartCount) && !(message.heartCount && $util.isInteger(message.heartCount.low) && $util.isInteger(message.heartCount.high))) return "heartCount: integer|Long expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        if (message.token != null && message.hasOwnProperty("token")) if (!$util.isString(message.token)) return "token: string expected";
        if (message.serverInfo != null && message.hasOwnProperty("serverInfo")) if (!$util.isString(message.serverInfo)) return "serverInfo: string expected";
        if (message.userid != null && message.hasOwnProperty("userid")) if (!$util.isString(message.userid)) return "userid: string expected";
        return null;
      };
      /**
       * Creates an ItalkHeartMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkHeartMsg} ItalkHeartMsg
       */


      ItalkHeartMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkHeartMsg) return object;
        var message = new $root.italk.pb.ItalkHeartMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.heartCount != null) if ($util.Long) (message.heartCount = $util.Long.fromValue(object.heartCount)).unsigned = true;else if (typeof object.heartCount === "string") message.heartCount = parseInt(object.heartCount, 10);else if (typeof object.heartCount === "number") message.heartCount = object.heartCount;else if (typeof object.heartCount === "object") message.heartCount = new $util.LongBits(object.heartCount.low >>> 0, object.heartCount.high >>> 0).toNumber(true);
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = true;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber(true);
        if (object.token != null) message.token = String(object.token);
        if (object.serverInfo != null) message.serverInfo = String(object.serverInfo);
        if (object.userid != null) message.userid = String(object.userid);
        return message;
      };
      /**
       * Creates a plain object from an ItalkHeartMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkHeartMsg
       * @static
       * @param {italk.pb.ItalkHeartMsg} message ItalkHeartMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkHeartMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;

          if ($util.Long) {
            var _long = new $util.Long(0, 0, true);

            object.heartCount = options.longs === String ? _long.toString() : options.longs === Number ? _long.toNumber() : _long;
          } else object.heartCount = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long = new $util.Long(0, 0, true);

            object.number = options.longs === String ? _long.toString() : options.longs === Number ? _long.toNumber() : _long;
          } else object.number = options.longs === String ? "0" : 0;

          object.token = "";
          object.serverInfo = "";
          object.userid = "";
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.heartCount != null && message.hasOwnProperty("heartCount")) if (typeof message.heartCount === "number") object.heartCount = options.longs === String ? String(message.heartCount) : message.heartCount;else object.heartCount = options.longs === String ? $util.Long.prototype.toString.call(message.heartCount) : options.longs === Number ? new $util.LongBits(message.heartCount.low >>> 0, message.heartCount.high >>> 0).toNumber(true) : message.heartCount;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber(true) : message.number;
        if (message.token != null && message.hasOwnProperty("token")) object.token = message.token;
        if (message.serverInfo != null && message.hasOwnProperty("serverInfo")) object.serverInfo = message.serverInfo;
        if (message.userid != null && message.hasOwnProperty("userid")) object.userid = message.userid;
        return object;
      };
      /**
       * Converts this ItalkHeartMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkHeartMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkHeartMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkHeartMsg;
    }();

    pb.ItalkHeartEchoMsg = function () {
      /**
       * Properties of an ItalkHeartEchoMsg.
       * @memberof italk.pb
       * @interface IItalkHeartEchoMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkHeartEchoMsg msgType
       * @property {italk.pb.IItalkEchoInfo|null} [echoInfo] ItalkHeartEchoMsg echoInfo
       * @property {number|Long|null} [heartCount] ItalkHeartEchoMsg heartCount
       * @property {number|Long|null} [number] ItalkHeartEchoMsg number
       */

      /**
       * Constructs a new ItalkHeartEchoMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkHeartEchoMsg.
       * @implements IItalkHeartEchoMsg
       * @constructor
       * @param {italk.pb.IItalkHeartEchoMsg=} [properties] Properties to set
       */
      function ItalkHeartEchoMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkHeartEchoMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @instance
       */


      ItalkHeartEchoMsg.prototype.msgType = 0;
      /**
       * ItalkHeartEchoMsg echoInfo.
       * @member {italk.pb.IItalkEchoInfo|null|undefined} echoInfo
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @instance
       */

      ItalkHeartEchoMsg.prototype.echoInfo = null;
      /**
       * ItalkHeartEchoMsg heartCount.
       * @member {number|Long} heartCount
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @instance
       */

      ItalkHeartEchoMsg.prototype.heartCount = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      /**
       * ItalkHeartEchoMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @instance
       */

      ItalkHeartEchoMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      /**
       * Creates a new ItalkHeartEchoMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {italk.pb.IItalkHeartEchoMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkHeartEchoMsg} ItalkHeartEchoMsg instance
       */

      ItalkHeartEchoMsg.create = function create(properties) {
        return new ItalkHeartEchoMsg(properties);
      };
      /**
       * Encodes the specified ItalkHeartEchoMsg message. Does not implicitly {@link italk.pb.ItalkHeartEchoMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {italk.pb.IItalkHeartEchoMsg} message ItalkHeartEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkHeartEchoMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) $root.italk.pb.ItalkEchoInfo.encode(message.echoInfo, writer.uint32(
        /* id 2, wireType 2 =*/
        18).fork()).ldelim();
        if (message.heartCount != null && message.hasOwnProperty("heartCount")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).uint64(message.heartCount);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 4, wireType 0 =*/
        32).uint64(message.number);
        return writer;
      };
      /**
       * Encodes the specified ItalkHeartEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkHeartEchoMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {italk.pb.IItalkHeartEchoMsg} message ItalkHeartEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkHeartEchoMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkHeartEchoMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkHeartEchoMsg} ItalkHeartEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkHeartEchoMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkHeartEchoMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.echoInfo = $root.italk.pb.ItalkEchoInfo.decode(reader, reader.uint32());
              break;

            case 3:
              message.heartCount = reader.uint64();
              break;

            case 4:
              message.number = reader.uint64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkHeartEchoMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkHeartEchoMsg} ItalkHeartEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkHeartEchoMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkHeartEchoMsg message.
       * @function verify
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkHeartEchoMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }

        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) {
          var error = $root.italk.pb.ItalkEchoInfo.verify(message.echoInfo);
          if (error) return "echoInfo." + error;
        }

        if (message.heartCount != null && message.hasOwnProperty("heartCount")) if (!$util.isInteger(message.heartCount) && !(message.heartCount && $util.isInteger(message.heartCount.low) && $util.isInteger(message.heartCount.high))) return "heartCount: integer|Long expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        return null;
      };
      /**
       * Creates an ItalkHeartEchoMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkHeartEchoMsg} ItalkHeartEchoMsg
       */


      ItalkHeartEchoMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkHeartEchoMsg) return object;
        var message = new $root.italk.pb.ItalkHeartEchoMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.echoInfo != null) {
          if (typeof object.echoInfo !== "object") throw TypeError(".italk.pb.ItalkHeartEchoMsg.echoInfo: object expected");
          message.echoInfo = $root.italk.pb.ItalkEchoInfo.fromObject(object.echoInfo);
        }

        if (object.heartCount != null) if ($util.Long) (message.heartCount = $util.Long.fromValue(object.heartCount)).unsigned = true;else if (typeof object.heartCount === "string") message.heartCount = parseInt(object.heartCount, 10);else if (typeof object.heartCount === "number") message.heartCount = object.heartCount;else if (typeof object.heartCount === "object") message.heartCount = new $util.LongBits(object.heartCount.low >>> 0, object.heartCount.high >>> 0).toNumber(true);
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = true;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber(true);
        return message;
      };
      /**
       * Creates a plain object from an ItalkHeartEchoMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @static
       * @param {italk.pb.ItalkHeartEchoMsg} message ItalkHeartEchoMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkHeartEchoMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.echoInfo = null;

          if ($util.Long) {
            var _long2 = new $util.Long(0, 0, true);

            object.heartCount = options.longs === String ? _long2.toString() : options.longs === Number ? _long2.toNumber() : _long2;
          } else object.heartCount = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long2 = new $util.Long(0, 0, true);

            object.number = options.longs === String ? _long2.toString() : options.longs === Number ? _long2.toNumber() : _long2;
          } else object.number = options.longs === String ? "0" : 0;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) object.echoInfo = $root.italk.pb.ItalkEchoInfo.toObject(message.echoInfo, options);
        if (message.heartCount != null && message.hasOwnProperty("heartCount")) if (typeof message.heartCount === "number") object.heartCount = options.longs === String ? String(message.heartCount) : message.heartCount;else object.heartCount = options.longs === String ? $util.Long.prototype.toString.call(message.heartCount) : options.longs === Number ? new $util.LongBits(message.heartCount.low >>> 0, message.heartCount.high >>> 0).toNumber(true) : message.heartCount;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber(true) : message.number;
        return object;
      };
      /**
       * Converts this ItalkHeartEchoMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkHeartEchoMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkHeartEchoMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkHeartEchoMsg;
    }();
    /**
     * ItalkMsgStatusEnum enum.
     * @name italk.pb.ItalkMsgStatusEnum
     * @enum {string}
     * @property {number} ITKUnsend=0 ITKUnsend value
     * @property {number} ITKSending=1 ITKSending value
     * @property {number} ITKSended=2 ITKSended value
     * @property {number} ITKSendFailed=3 ITKSendFailed value
     * @property {number} ITKReceiverReceived=4 ITKReceiverReceived value
     * @property {number} ITKSenderReceived=5 ITKSenderReceived value
     * @property {number} ITKReceiverReaded=6 ITKReceiverReaded value
     * @property {number} ITKSenderReaded=7 ITKSenderReaded value
     * @property {number} ITKReceiverDestroyed=8 ITKReceiverDestroyed value
     * @property {number} ITKSenderDestroyed=9 ITKSenderDestroyed value
     * @property {number} ITKReceiverTimeout=10 ITKReceiverTimeout value
     * @property {number} ITKSenderTimeout=11 ITKSenderTimeout value
     * @property {number} ITKSenderRevoke=12 ITKSenderRevoke value
     * @property {number} ITKReceiverRevoke=13 ITKReceiverRevoke value
     * @property {number} ITKMsgStatus1=21 ITKMsgStatus1 value
     * @property {number} ITKMsgStatus2=22 ITKMsgStatus2 value
     * @property {number} ITKMsgStatus3=23 ITKMsgStatus3 value
     * @property {number} ITKMsgStatus4=24 ITKMsgStatus4 value
     * @property {number} ITKMsgStatus5=25 ITKMsgStatus5 value
     * @property {number} ITKMsgStatus6=26 ITKMsgStatus6 value
     */


    pb.ItalkMsgStatusEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKUnsend"] = 0;
      values[valuesById[1] = "ITKSending"] = 1;
      values[valuesById[2] = "ITKSended"] = 2;
      values[valuesById[3] = "ITKSendFailed"] = 3;
      values[valuesById[4] = "ITKReceiverReceived"] = 4;
      values[valuesById[5] = "ITKSenderReceived"] = 5;
      values[valuesById[6] = "ITKReceiverReaded"] = 6;
      values[valuesById[7] = "ITKSenderReaded"] = 7;
      values[valuesById[8] = "ITKReceiverDestroyed"] = 8;
      values[valuesById[9] = "ITKSenderDestroyed"] = 9;
      values[valuesById[10] = "ITKReceiverTimeout"] = 10;
      values[valuesById[11] = "ITKSenderTimeout"] = 11;
      values[valuesById[12] = "ITKSenderRevoke"] = 12;
      values[valuesById[13] = "ITKReceiverRevoke"] = 13;
      values[valuesById[21] = "ITKMsgStatus1"] = 21;
      values[valuesById[22] = "ITKMsgStatus2"] = 22;
      values[valuesById[23] = "ITKMsgStatus3"] = 23;
      values[valuesById[24] = "ITKMsgStatus4"] = 24;
      values[valuesById[25] = "ITKMsgStatus5"] = 25;
      values[valuesById[26] = "ITKMsgStatus6"] = 26;
      return values;
    }();
    /**
     * ItalkChatTypeEnum enum.
     * @name italk.pb.ItalkChatTypeEnum
     * @enum {string}
     * @property {number} ITKSingleChat=0 ITKSingleChat value
     * @property {number} ITKGroupChat=1 ITKGroupChat value
     */


    pb.ItalkChatTypeEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKSingleChat"] = 0;
      values[valuesById[1] = "ITKGroupChat"] = 1;
      return values;
    }();
    /**
     * ItalkBusinessTypeEnum enum.
     * @name italk.pb.ItalkBusinessTypeEnum
     * @enum {string}
     * @property {number} ITKSMS=0 ITKSMS value
     * @property {number} ITKPic=1 ITKPic value
     * @property {number} ITKSound=2 ITKSound value
     * @property {number} ITKShortVideo=3 ITKShortVideo value
     * @property {number} ITKFile=4 ITKFile value
     * @property {number} ITKLocation=5 ITKLocation value
     * @property {number} ITKRedPacket=6 ITKRedPacket value
     * @property {number} ITKVoiceCall=7 ITKVoiceCall value
     * @property {number} ITKVideoCall=8 ITKVideoCall value
     * @property {number} ITKServerPush=9 ITKServerPush value
     * @property {number} ITKAddFriendRequest=10 ITKAddFriendRequest value
     * @property {number} ITKNeedFriendVerify=11 ITKNeedFriendVerify value
     * @property {number} ITKAddFriendSucccess=12 ITKAddFriendSucccess value
     * @property {number} ITKVerifyFriendAnswer=13 ITKVerifyFriendAnswer value
     * @property {number} ITKVerifyFriendSuccess=14 ITKVerifyFriendSuccess value
     * @property {number} ITKGroupCreate=15 ITKGroupCreate value
     * @property {number} ITKGroupMemberQuit=16 ITKGroupMemberQuit value
     * @property {number} ITKGroupMemberAdd=17 ITKGroupMemberAdd value
     * @property {number} ITKGroupOwnerTransfer=18 ITKGroupOwnerTransfer value
     * @property {number} ITKInviteGroupMember=19 ITKInviteGroupMember value
     * @property {number} ITKVerifyInivitation=20 ITKVerifyInivitation value
     * @property {number} ITKDeleteGroupMember=21 ITKDeleteGroupMember value
     * @property {number} ITKChatStatusChange=22 ITKChatStatusChange value
     * @property {number} ITKSystemNotification=23 ITKSystemNotification value
     * @property {number} ITKRevokeMsg=24 ITKRevokeMsg value
     * @property {number} ITkDestroyed=25 ITkDestroyed value
     * @property {number} ITKReturnRedPacket=26 ITKReturnRedPacket value
     * @property {number} ITKRemoveMsgID=27 ITKRemoveMsgID value
     * @property {number} ITKOtherMachineLogin=28 ITKOtherMachineLogin value
     * @property {number} ITKRequestLogin=29 ITKRequestLogin value
     * @property {number} ITKAuthLogin=30 ITKAuthLogin value
     * @property {number} ITKUserChange=31 ITKUserChange value
     * @property {number} ITKAppState=32 ITKAppState value
     * @property {number} ITKBussniesstype1=41 ITKBussniesstype1 value
     * @property {number} ITKBussniesstype2=42 ITKBussniesstype2 value
     * @property {number} ITKBussniesstype3=43 ITKBussniesstype3 value
     * @property {number} ITKBussniesstype4=44 ITKBussniesstype4 value
     * @property {number} ITKBussniesstype5=45 ITKBussniesstype5 value
     * @property {number} ITKBussniesstype6=46 ITKBussniesstype6 value
     * @property {number} ITKBussniesstype7=47 ITKBussniesstype7 value
     * @property {number} ITKBussniesstype8=48 ITKBussniesstype8 value
     * @property {number} ITKBussniesstype9=49 ITKBussniesstype9 value
     * @property {number} ITKBussniesstype10=50 ITKBussniesstype10 value
     * @property {number} ITKBussniesstype11=51 ITKBussniesstype11 value
     * @property {number} ITKBussniesstype12=52 ITKBussniesstype12 value
     * @property {number} ITKBussniesstype13=53 ITKBussniesstype13 value
     * @property {number} ITKBussniesstype14=54 ITKBussniesstype14 value
     * @property {number} ITKBussniesstype15=55 ITKBussniesstype15 value
     * @property {number} ITKBussniesstype16=56 ITKBussniesstype16 value
     * @property {number} ITKBussniesstype17=57 ITKBussniesstype17 value
     * @property {number} ITKBussniesstype18=58 ITKBussniesstype18 value
     * @property {number} ITKBussniesstype19=59 ITKBussniesstype19 value
     * @property {number} ITKBussniesstype20=60 ITKBussniesstype20 value
     * @property {number} ITKBussniesstype21=61 ITKBussniesstype21 value
     * @property {number} ITKBussniesstype22=62 ITKBussniesstype22 value
     * @property {number} ITKBussniesstype23=63 ITKBussniesstype23 value
     * @property {number} ITKBussniesstype24=64 ITKBussniesstype24 value
     * @property {number} ITKBussniesstype25=65 ITKBussniesstype25 value
     * @property {number} ITKBussniesstype26=66 ITKBussniesstype26 value
     * @property {number} ITKBussniesstype27=67 ITKBussniesstype27 value
     * @property {number} ITKBussniesstype28=68 ITKBussniesstype28 value
     * @property {number} ITKBussniesstype29=69 ITKBussniesstype29 value
     * @property {number} ITKBussniesstype30=70 ITKBussniesstype30 value
     * @property {number} ITKBussniesstype31=71 ITKBussniesstype31 value
     * @property {number} ITKBussniesstype32=72 ITKBussniesstype32 value
     * @property {number} ITKBussniesstype33=73 ITKBussniesstype33 value
     * @property {number} ITKBussniesstype34=74 ITKBussniesstype34 value
     * @property {number} ITKBussniesstype35=75 ITKBussniesstype35 value
     * @property {number} ITKBussniesstype36=76 ITKBussniesstype36 value
     * @property {number} ITKBussniesstype37=77 ITKBussniesstype37 value
     * @property {number} ITKBussniesstype38=78 ITKBussniesstype38 value
     * @property {number} ITKBussniesstype39=79 ITKBussniesstype39 value
     * @property {number} ITKBussniesstype40=80 ITKBussniesstype40 value
     * @property {number} ITKBussniesstype41=81 ITKBussniesstype41 value
     * @property {number} ITKBussniesstype42=82 ITKBussniesstype42 value
     * @property {number} ITKRecodeMsg=83 ITKRecodeMsg value
     */


    pb.ItalkBusinessTypeEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKSMS"] = 0;
      values[valuesById[1] = "ITKPic"] = 1;
      values[valuesById[2] = "ITKSound"] = 2;
      values[valuesById[3] = "ITKShortVideo"] = 3;
      values[valuesById[4] = "ITKFile"] = 4;
      values[valuesById[5] = "ITKLocation"] = 5;
      values[valuesById[6] = "ITKRedPacket"] = 6;
      values[valuesById[7] = "ITKVoiceCall"] = 7;
      values[valuesById[8] = "ITKVideoCall"] = 8;
      values[valuesById[9] = "ITKServerPush"] = 9;
      values[valuesById[10] = "ITKAddFriendRequest"] = 10;
      values[valuesById[11] = "ITKNeedFriendVerify"] = 11;
      values[valuesById[12] = "ITKAddFriendSucccess"] = 12;
      values[valuesById[13] = "ITKVerifyFriendAnswer"] = 13;
      values[valuesById[14] = "ITKVerifyFriendSuccess"] = 14;
      values[valuesById[15] = "ITKGroupCreate"] = 15;
      values[valuesById[16] = "ITKGroupMemberQuit"] = 16;
      values[valuesById[17] = "ITKGroupMemberAdd"] = 17;
      values[valuesById[18] = "ITKGroupOwnerTransfer"] = 18;
      values[valuesById[19] = "ITKInviteGroupMember"] = 19;
      values[valuesById[20] = "ITKVerifyInivitation"] = 20;
      values[valuesById[21] = "ITKDeleteGroupMember"] = 21;
      values[valuesById[22] = "ITKChatStatusChange"] = 22;
      values[valuesById[23] = "ITKSystemNotification"] = 23;
      values[valuesById[24] = "ITKRevokeMsg"] = 24;
      values[valuesById[25] = "ITkDestroyed"] = 25;
      values[valuesById[26] = "ITKReturnRedPacket"] = 26;
      values[valuesById[27] = "ITKRemoveMsgID"] = 27;
      values[valuesById[28] = "ITKOtherMachineLogin"] = 28;
      values[valuesById[29] = "ITKRequestLogin"] = 29;
      values[valuesById[30] = "ITKAuthLogin"] = 30;
      values[valuesById[31] = "ITKUserChange"] = 31;
      values[valuesById[32] = "ITKAppState"] = 32;
      values[valuesById[41] = "ITKBussniesstype1"] = 41;
      values[valuesById[42] = "ITKBussniesstype2"] = 42;
      values[valuesById[43] = "ITKBussniesstype3"] = 43;
      values[valuesById[44] = "ITKBussniesstype4"] = 44;
      values[valuesById[45] = "ITKBussniesstype5"] = 45;
      values[valuesById[46] = "ITKBussniesstype6"] = 46;
      values[valuesById[47] = "ITKBussniesstype7"] = 47;
      values[valuesById[48] = "ITKBussniesstype8"] = 48;
      values[valuesById[49] = "ITKBussniesstype9"] = 49;
      values[valuesById[50] = "ITKBussniesstype10"] = 50;
      values[valuesById[51] = "ITKBussniesstype11"] = 51;
      values[valuesById[52] = "ITKBussniesstype12"] = 52;
      values[valuesById[53] = "ITKBussniesstype13"] = 53;
      values[valuesById[54] = "ITKBussniesstype14"] = 54;
      values[valuesById[55] = "ITKBussniesstype15"] = 55;
      values[valuesById[56] = "ITKBussniesstype16"] = 56;
      values[valuesById[57] = "ITKBussniesstype17"] = 57;
      values[valuesById[58] = "ITKBussniesstype18"] = 58;
      values[valuesById[59] = "ITKBussniesstype19"] = 59;
      values[valuesById[60] = "ITKBussniesstype20"] = 60;
      values[valuesById[61] = "ITKBussniesstype21"] = 61;
      values[valuesById[62] = "ITKBussniesstype22"] = 62;
      values[valuesById[63] = "ITKBussniesstype23"] = 63;
      values[valuesById[64] = "ITKBussniesstype24"] = 64;
      values[valuesById[65] = "ITKBussniesstype25"] = 65;
      values[valuesById[66] = "ITKBussniesstype26"] = 66;
      values[valuesById[67] = "ITKBussniesstype27"] = 67;
      values[valuesById[68] = "ITKBussniesstype28"] = 68;
      values[valuesById[69] = "ITKBussniesstype29"] = 69;
      values[valuesById[70] = "ITKBussniesstype30"] = 70;
      values[valuesById[71] = "ITKBussniesstype31"] = 71;
      values[valuesById[72] = "ITKBussniesstype32"] = 72;
      values[valuesById[73] = "ITKBussniesstype33"] = 73;
      values[valuesById[74] = "ITKBussniesstype34"] = 74;
      values[valuesById[75] = "ITKBussniesstype35"] = 75;
      values[valuesById[76] = "ITKBussniesstype36"] = 76;
      values[valuesById[77] = "ITKBussniesstype37"] = 77;
      values[valuesById[78] = "ITKBussniesstype38"] = 78;
      values[valuesById[79] = "ITKBussniesstype39"] = 79;
      values[valuesById[80] = "ITKBussniesstype40"] = 80;
      values[valuesById[81] = "ITKBussniesstype41"] = 81;
      values[valuesById[82] = "ITKBussniesstype42"] = 82;
      values[valuesById[83] = "ITKRecodeMsg"] = 83;
      return values;
    }();
    /**
     * ItalkFormatTypeEnum enum.
     * @name italk.pb.ItalkFormatTypeEnum
     * @enum {string}
     * @property {number} ITKBmp=0 ITKBmp value
     * @property {number} ITKJpg=1 ITKJpg value
     * @property {number} ITKPng=2 ITKPng value
     * @property {number} ITKGif=3 ITKGif value
     * @property {number} ITKOtherFormat=4 ITKOtherFormat value
     */


    pb.ItalkFormatTypeEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKBmp"] = 0;
      values[valuesById[1] = "ITKJpg"] = 1;
      values[valuesById[2] = "ITKPng"] = 2;
      values[valuesById[3] = "ITKGif"] = 3;
      values[valuesById[4] = "ITKOtherFormat"] = 4;
      return values;
    }();
    /**
     * ItalkMsgErrorEnum enum.
     * @name italk.pb.ItalkMsgErrorEnum
     * @enum {string}
     * @property {number} ITKToAccountNotExist=0 ITKToAccountNotExist value
     * @property {number} ITKWrongMsgContent=1 ITKWrongMsgContent value
     * @property {number} ITKOtherError=2 ITKOtherError value
     */


    pb.ItalkMsgErrorEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKToAccountNotExist"] = 0;
      values[valuesById[1] = "ITKWrongMsgContent"] = 1;
      values[valuesById[2] = "ITKOtherError"] = 2;
      return values;
    }();
    /**
     * ItalkAddFriendStatusEnum enum.
     * @name italk.pb.ItalkAddFriendStatusEnum
     * @enum {string}
     * @property {number} ITKAdded=0 ITKAdded value
     * @property {number} ITKWaitVerification=1 ITKWaitVerification value
     */


    pb.ItalkAddFriendStatusEnum = function () {
      var valuesById = {},
          values = Object.create(valuesById);
      values[valuesById[0] = "ITKAdded"] = 0;
      values[valuesById[1] = "ITKWaitVerification"] = 1;
      return values;
    }();

    pb.ItalkMsgContent = function () {
      /**
       * Properties of an ItalkMsgContent.
       * @memberof italk.pb
       * @interface IItalkMsgContent
       * @property {string|null} [text] ItalkMsgContent text
       * @property {number|null} [size] ItalkMsgContent size
       * @property {italk.pb.ItalkFormatTypeEnum|null} [imageformat] ItalkMsgContent imageformat
       * @property {number|null} [width] ItalkMsgContent width
       * @property {number|null} [height] ItalkMsgContent height
       * @property {string|null} [thumburl] ItalkMsgContent thumburl
       * @property {string|null} [url] ItalkMsgContent url
       * @property {number|null} [second] ItalkMsgContent second
       * @property {string|null} [filename] ItalkMsgContent filename
       * @property {string|null} [desc] ItalkMsgContent desc
       * @property {string|null} [latitude] ItalkMsgContent latitude
       * @property {string|null} [longitude] ItalkMsgContent longitude
       */

      /**
       * Constructs a new ItalkMsgContent.
       * @memberof italk.pb
       * @classdesc Represents an ItalkMsgContent.
       * @implements IItalkMsgContent
       * @constructor
       * @param {italk.pb.IItalkMsgContent=} [properties] Properties to set
       */
      function ItalkMsgContent(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkMsgContent text.
       * @member {string} text
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */


      ItalkMsgContent.prototype.text = "";
      /**
       * ItalkMsgContent size.
       * @member {number} size
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.size = 0;
      /**
       * ItalkMsgContent imageformat.
       * @member {italk.pb.ItalkFormatTypeEnum} imageformat
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.imageformat = 0;
      /**
       * ItalkMsgContent width.
       * @member {number} width
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.width = 0;
      /**
       * ItalkMsgContent height.
       * @member {number} height
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.height = 0;
      /**
       * ItalkMsgContent thumburl.
       * @member {string} thumburl
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.thumburl = "";
      /**
       * ItalkMsgContent url.
       * @member {string} url
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.url = "";
      /**
       * ItalkMsgContent second.
       * @member {number} second
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.second = 0;
      /**
       * ItalkMsgContent filename.
       * @member {string} filename
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.filename = "";
      /**
       * ItalkMsgContent desc.
       * @member {string} desc
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.desc = "";
      /**
       * ItalkMsgContent latitude.
       * @member {string} latitude
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.latitude = "";
      /**
       * ItalkMsgContent longitude.
       * @member {string} longitude
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       */

      ItalkMsgContent.prototype.longitude = "";
      /**
       * Creates a new ItalkMsgContent instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {italk.pb.IItalkMsgContent=} [properties] Properties to set
       * @returns {italk.pb.ItalkMsgContent} ItalkMsgContent instance
       */

      ItalkMsgContent.create = function create(properties) {
        return new ItalkMsgContent(properties);
      };
      /**
       * Encodes the specified ItalkMsgContent message. Does not implicitly {@link italk.pb.ItalkMsgContent.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {italk.pb.IItalkMsgContent} message ItalkMsgContent message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkMsgContent.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.text != null && message.hasOwnProperty("text")) writer.uint32(
        /* id 1, wireType 2 =*/
        10).string(message.text);
        if (message.size != null && message.hasOwnProperty("size")) writer.uint32(
        /* id 2, wireType 0 =*/
        16).int32(message.size);
        if (message.imageformat != null && message.hasOwnProperty("imageformat")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int32(message.imageformat);
        if (message.width != null && message.hasOwnProperty("width")) writer.uint32(
        /* id 4, wireType 0 =*/
        32).int32(message.width);
        if (message.height != null && message.hasOwnProperty("height")) writer.uint32(
        /* id 5, wireType 0 =*/
        40).int32(message.height);
        if (message.thumburl != null && message.hasOwnProperty("thumburl")) writer.uint32(
        /* id 6, wireType 2 =*/
        50).string(message.thumburl);
        if (message.url != null && message.hasOwnProperty("url")) writer.uint32(
        /* id 7, wireType 2 =*/
        58).string(message.url);
        if (message.second != null && message.hasOwnProperty("second")) writer.uint32(
        /* id 8, wireType 0 =*/
        64).int32(message.second);
        if (message.filename != null && message.hasOwnProperty("filename")) writer.uint32(
        /* id 9, wireType 2 =*/
        74).string(message.filename);
        if (message.desc != null && message.hasOwnProperty("desc")) writer.uint32(
        /* id 10, wireType 2 =*/
        82).string(message.desc);
        if (message.latitude != null && message.hasOwnProperty("latitude")) writer.uint32(
        /* id 11, wireType 2 =*/
        90).string(message.latitude);
        if (message.longitude != null && message.hasOwnProperty("longitude")) writer.uint32(
        /* id 12, wireType 2 =*/
        98).string(message.longitude);
        return writer;
      };
      /**
       * Encodes the specified ItalkMsgContent message, length delimited. Does not implicitly {@link italk.pb.ItalkMsgContent.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {italk.pb.IItalkMsgContent} message ItalkMsgContent message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkMsgContent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkMsgContent message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkMsgContent} ItalkMsgContent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkMsgContent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkMsgContent();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.text = reader.string();
              break;

            case 2:
              message.size = reader.int32();
              break;

            case 3:
              message.imageformat = reader.int32();
              break;

            case 4:
              message.width = reader.int32();
              break;

            case 5:
              message.height = reader.int32();
              break;

            case 6:
              message.thumburl = reader.string();
              break;

            case 7:
              message.url = reader.string();
              break;

            case 8:
              message.second = reader.int32();
              break;

            case 9:
              message.filename = reader.string();
              break;

            case 10:
              message.desc = reader.string();
              break;

            case 11:
              message.latitude = reader.string();
              break;

            case 12:
              message.longitude = reader.string();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkMsgContent message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkMsgContent} ItalkMsgContent
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkMsgContent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkMsgContent message.
       * @function verify
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkMsgContent.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.text != null && message.hasOwnProperty("text")) if (!$util.isString(message.text)) return "text: string expected";
        if (message.size != null && message.hasOwnProperty("size")) if (!$util.isInteger(message.size)) return "size: integer expected";
        if (message.imageformat != null && message.hasOwnProperty("imageformat")) switch (message.imageformat) {
          default:
            return "imageformat: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            break;
        }
        if (message.width != null && message.hasOwnProperty("width")) if (!$util.isInteger(message.width)) return "width: integer expected";
        if (message.height != null && message.hasOwnProperty("height")) if (!$util.isInteger(message.height)) return "height: integer expected";
        if (message.thumburl != null && message.hasOwnProperty("thumburl")) if (!$util.isString(message.thumburl)) return "thumburl: string expected";
        if (message.url != null && message.hasOwnProperty("url")) if (!$util.isString(message.url)) return "url: string expected";
        if (message.second != null && message.hasOwnProperty("second")) if (!$util.isInteger(message.second)) return "second: integer expected";
        if (message.filename != null && message.hasOwnProperty("filename")) if (!$util.isString(message.filename)) return "filename: string expected";
        if (message.desc != null && message.hasOwnProperty("desc")) if (!$util.isString(message.desc)) return "desc: string expected";
        if (message.latitude != null && message.hasOwnProperty("latitude")) if (!$util.isString(message.latitude)) return "latitude: string expected";
        if (message.longitude != null && message.hasOwnProperty("longitude")) if (!$util.isString(message.longitude)) return "longitude: string expected";
        return null;
      };
      /**
       * Creates an ItalkMsgContent message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkMsgContent} ItalkMsgContent
       */


      ItalkMsgContent.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkMsgContent) return object;
        var message = new $root.italk.pb.ItalkMsgContent();
        if (object.text != null) message.text = String(object.text);
        if (object.size != null) message.size = object.size | 0;

        switch (object.imageformat) {
          case "ITKBmp":
          case 0:
            message.imageformat = 0;
            break;

          case "ITKJpg":
          case 1:
            message.imageformat = 1;
            break;

          case "ITKPng":
          case 2:
            message.imageformat = 2;
            break;

          case "ITKGif":
          case 3:
            message.imageformat = 3;
            break;

          case "ITKOtherFormat":
          case 4:
            message.imageformat = 4;
            break;
        }

        if (object.width != null) message.width = object.width | 0;
        if (object.height != null) message.height = object.height | 0;
        if (object.thumburl != null) message.thumburl = String(object.thumburl);
        if (object.url != null) message.url = String(object.url);
        if (object.second != null) message.second = object.second | 0;
        if (object.filename != null) message.filename = String(object.filename);
        if (object.desc != null) message.desc = String(object.desc);
        if (object.latitude != null) message.latitude = String(object.latitude);
        if (object.longitude != null) message.longitude = String(object.longitude);
        return message;
      };
      /**
       * Creates a plain object from an ItalkMsgContent message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkMsgContent
       * @static
       * @param {italk.pb.ItalkMsgContent} message ItalkMsgContent
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkMsgContent.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.text = "";
          object.size = 0;
          object.imageformat = options.enums === String ? "ITKBmp" : 0;
          object.width = 0;
          object.height = 0;
          object.thumburl = "";
          object.url = "";
          object.second = 0;
          object.filename = "";
          object.desc = "";
          object.latitude = "";
          object.longitude = "";
        }

        if (message.text != null && message.hasOwnProperty("text")) object.text = message.text;
        if (message.size != null && message.hasOwnProperty("size")) object.size = message.size;
        if (message.imageformat != null && message.hasOwnProperty("imageformat")) object.imageformat = options.enums === String ? $root.italk.pb.ItalkFormatTypeEnum[message.imageformat] : message.imageformat;
        if (message.width != null && message.hasOwnProperty("width")) object.width = message.width;
        if (message.height != null && message.hasOwnProperty("height")) object.height = message.height;
        if (message.thumburl != null && message.hasOwnProperty("thumburl")) object.thumburl = message.thumburl;
        if (message.url != null && message.hasOwnProperty("url")) object.url = message.url;
        if (message.second != null && message.hasOwnProperty("second")) object.second = message.second;
        if (message.filename != null && message.hasOwnProperty("filename")) object.filename = message.filename;
        if (message.desc != null && message.hasOwnProperty("desc")) object.desc = message.desc;
        if (message.latitude != null && message.hasOwnProperty("latitude")) object.latitude = message.latitude;
        if (message.longitude != null && message.hasOwnProperty("longitude")) object.longitude = message.longitude;
        return object;
      };
      /**
       * Converts this ItalkMsgContent to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkMsgContent
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkMsgContent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkMsgContent;
    }();

    pb.ItalkRecordMsg = function () {
      /**
       * Properties of an ItalkRecordMsg.
       * @memberof italk.pb
       * @interface IItalkRecordMsg
       * @property {italk.pb.IItalkRecordMsg|null} [recordMsg] ItalkRecordMsg recordMsg
       * @property {number|null} [level] ItalkRecordMsg level
       * @property {number|null} [CurCount] ItalkRecordMsg CurCount
       * @property {Array.<italk.pb.IItalkChatMsg>|null} [chatMsgList] ItalkRecordMsg chatMsgList
       * @property {Array.<string>|null} [briefInfo] ItalkRecordMsg briefInfo
       */

      /**
       * Constructs a new ItalkRecordMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkRecordMsg.
       * @implements IItalkRecordMsg
       * @constructor
       * @param {italk.pb.IItalkRecordMsg=} [properties] Properties to set
       */
      function ItalkRecordMsg(properties) {
        this.chatMsgList = [];
        this.briefInfo = [];
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkRecordMsg recordMsg.
       * @member {italk.pb.IItalkRecordMsg|null|undefined} recordMsg
       * @memberof italk.pb.ItalkRecordMsg
       * @instance
       */


      ItalkRecordMsg.prototype.recordMsg = null;
      /**
       * ItalkRecordMsg level.
       * @member {number} level
       * @memberof italk.pb.ItalkRecordMsg
       * @instance
       */

      ItalkRecordMsg.prototype.level = 0;
      /**
       * ItalkRecordMsg CurCount.
       * @member {number} CurCount
       * @memberof italk.pb.ItalkRecordMsg
       * @instance
       */

      ItalkRecordMsg.prototype.CurCount = 0;
      /**
       * ItalkRecordMsg chatMsgList.
       * @member {Array.<italk.pb.IItalkChatMsg>} chatMsgList
       * @memberof italk.pb.ItalkRecordMsg
       * @instance
       */

      ItalkRecordMsg.prototype.chatMsgList = $util.emptyArray;
      /**
       * ItalkRecordMsg briefInfo.
       * @member {Array.<string>} briefInfo
       * @memberof italk.pb.ItalkRecordMsg
       * @instance
       */

      ItalkRecordMsg.prototype.briefInfo = $util.emptyArray;
      /**
       * Creates a new ItalkRecordMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {italk.pb.IItalkRecordMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkRecordMsg} ItalkRecordMsg instance
       */

      ItalkRecordMsg.create = function create(properties) {
        return new ItalkRecordMsg(properties);
      };
      /**
       * Encodes the specified ItalkRecordMsg message. Does not implicitly {@link italk.pb.ItalkRecordMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {italk.pb.IItalkRecordMsg} message ItalkRecordMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkRecordMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.recordMsg != null && message.hasOwnProperty("recordMsg")) $root.italk.pb.ItalkRecordMsg.encode(message.recordMsg, writer.uint32(
        /* id 1, wireType 2 =*/
        10).fork()).ldelim();
        if (message.level != null && message.hasOwnProperty("level")) writer.uint32(
        /* id 2, wireType 0 =*/
        16).int32(message.level);
        if (message.CurCount != null && message.hasOwnProperty("CurCount")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int32(message.CurCount);
        if (message.chatMsgList != null && message.chatMsgList.length) for (var i = 0; i < message.chatMsgList.length; ++i) {
          $root.italk.pb.ItalkChatMsg.encode(message.chatMsgList[i], writer.uint32(
          /* id 5, wireType 2 =*/
          42).fork()).ldelim();
        }
        if (message.briefInfo != null && message.briefInfo.length) for (var i = 0; i < message.briefInfo.length; ++i) {
          writer.uint32(
          /* id 6, wireType 2 =*/
          50).string(message.briefInfo[i]);
        }
        return writer;
      };
      /**
       * Encodes the specified ItalkRecordMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkRecordMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {italk.pb.IItalkRecordMsg} message ItalkRecordMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkRecordMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkRecordMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkRecordMsg} ItalkRecordMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkRecordMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkRecordMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.recordMsg = $root.italk.pb.ItalkRecordMsg.decode(reader, reader.uint32());
              break;

            case 2:
              message.level = reader.int32();
              break;

            case 3:
              message.CurCount = reader.int32();
              break;

            case 5:
              if (!(message.chatMsgList && message.chatMsgList.length)) message.chatMsgList = [];
              message.chatMsgList.push($root.italk.pb.ItalkChatMsg.decode(reader, reader.uint32()));
              break;

            case 6:
              if (!(message.briefInfo && message.briefInfo.length)) message.briefInfo = [];
              message.briefInfo.push(reader.string());
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkRecordMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkRecordMsg} ItalkRecordMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkRecordMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkRecordMsg message.
       * @function verify
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkRecordMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";

        if (message.recordMsg != null && message.hasOwnProperty("recordMsg")) {
          var error = $root.italk.pb.ItalkRecordMsg.verify(message.recordMsg);
          if (error) return "recordMsg." + error;
        }

        if (message.level != null && message.hasOwnProperty("level")) if (!$util.isInteger(message.level)) return "level: integer expected";
        if (message.CurCount != null && message.hasOwnProperty("CurCount")) if (!$util.isInteger(message.CurCount)) return "CurCount: integer expected";

        if (message.chatMsgList != null && message.hasOwnProperty("chatMsgList")) {
          if (!Array.isArray(message.chatMsgList)) return "chatMsgList: array expected";

          for (var i = 0; i < message.chatMsgList.length; ++i) {
            var error = $root.italk.pb.ItalkChatMsg.verify(message.chatMsgList[i]);
            if (error) return "chatMsgList." + error;
          }
        }

        if (message.briefInfo != null && message.hasOwnProperty("briefInfo")) {
          if (!Array.isArray(message.briefInfo)) return "briefInfo: array expected";

          for (var i = 0; i < message.briefInfo.length; ++i) {
            if (!$util.isString(message.briefInfo[i])) return "briefInfo: string[] expected";
          }
        }

        return null;
      };
      /**
       * Creates an ItalkRecordMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkRecordMsg} ItalkRecordMsg
       */


      ItalkRecordMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkRecordMsg) return object;
        var message = new $root.italk.pb.ItalkRecordMsg();

        if (object.recordMsg != null) {
          if (typeof object.recordMsg !== "object") throw TypeError(".italk.pb.ItalkRecordMsg.recordMsg: object expected");
          message.recordMsg = $root.italk.pb.ItalkRecordMsg.fromObject(object.recordMsg);
        }

        if (object.level != null) message.level = object.level | 0;
        if (object.CurCount != null) message.CurCount = object.CurCount | 0;

        if (object.chatMsgList) {
          if (!Array.isArray(object.chatMsgList)) throw TypeError(".italk.pb.ItalkRecordMsg.chatMsgList: array expected");
          message.chatMsgList = [];

          for (var i = 0; i < object.chatMsgList.length; ++i) {
            if (typeof object.chatMsgList[i] !== "object") throw TypeError(".italk.pb.ItalkRecordMsg.chatMsgList: object expected");
            message.chatMsgList[i] = $root.italk.pb.ItalkChatMsg.fromObject(object.chatMsgList[i]);
          }
        }

        if (object.briefInfo) {
          if (!Array.isArray(object.briefInfo)) throw TypeError(".italk.pb.ItalkRecordMsg.briefInfo: array expected");
          message.briefInfo = [];

          for (var i = 0; i < object.briefInfo.length; ++i) {
            message.briefInfo[i] = String(object.briefInfo[i]);
          }
        }

        return message;
      };
      /**
       * Creates a plain object from an ItalkRecordMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkRecordMsg
       * @static
       * @param {italk.pb.ItalkRecordMsg} message ItalkRecordMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkRecordMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.arrays || options.defaults) {
          object.chatMsgList = [];
          object.briefInfo = [];
        }

        if (options.defaults) {
          object.recordMsg = null;
          object.level = 0;
          object.CurCount = 0;
        }

        if (message.recordMsg != null && message.hasOwnProperty("recordMsg")) object.recordMsg = $root.italk.pb.ItalkRecordMsg.toObject(message.recordMsg, options);
        if (message.level != null && message.hasOwnProperty("level")) object.level = message.level;
        if (message.CurCount != null && message.hasOwnProperty("CurCount")) object.CurCount = message.CurCount;

        if (message.chatMsgList && message.chatMsgList.length) {
          object.chatMsgList = [];

          for (var j = 0; j < message.chatMsgList.length; ++j) {
            object.chatMsgList[j] = $root.italk.pb.ItalkChatMsg.toObject(message.chatMsgList[j], options);
          }
        }

        if (message.briefInfo && message.briefInfo.length) {
          object.briefInfo = [];

          for (var j = 0; j < message.briefInfo.length; ++j) {
            object.briefInfo[j] = message.briefInfo[j];
          }
        }

        return object;
      };
      /**
       * Converts this ItalkRecordMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkRecordMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkRecordMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkRecordMsg;
    }();

    pb.ItalkChatMsg = function () {
      /**
       * Properties of an ItalkChatMsg.
       * @memberof italk.pb
       * @interface IItalkChatMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkChatMsg msgType
       * @property {string|null} [userid] ItalkChatMsg userid
       * @property {number|Long|null} [localid] ItalkChatMsg localid
       * @property {string|null} [fid] ItalkChatMsg fid
       * @property {Array.<string>|null} [memberids] ItalkChatMsg memberids
       * @property {number|Long|null} [msgid] ItalkChatMsg msgid
       * @property {number|Long|null} [timestamp] ItalkChatMsg timestamp
       * @property {number|null} [burnsecond] ItalkChatMsg burnsecond
       * @property {boolean|null} [burn] ItalkChatMsg burn
       * @property {italk.pb.ItalkChatTypeEnum|null} [chattype] ItalkChatMsg chattype
       * @property {italk.pb.ItalkBusinessTypeEnum|null} [bussinesstype] ItalkChatMsg bussinesstype
       * @property {italk.pb.ItalkMsgStatusEnum|null} [status] ItalkChatMsg status
       * @property {italk.pb.IItalkMsgContent|null} [content] ItalkChatMsg content
       * @property {number|Long|null} [userupdatetime] ItalkChatMsg userupdatetime
       * @property {number|Long|null} [msgindex] ItalkChatMsg msgindex
       * @property {number|Long|null} [msglastindex] ItalkChatMsg msglastindex
       * @property {boolean|null} [online] ItalkChatMsg online
       * @property {number|Long|null} [offlinenum] ItalkChatMsg offlinenum
       * @property {number|Long|null} [msgorder] ItalkChatMsg msgorder
       * @property {number|Long|null} [msguserorder] ItalkChatMsg msguserorder
       * @property {string|null} [text1] ItalkChatMsg text1
       * @property {string|null} [text2] ItalkChatMsg text2
       * @property {string|null} [text3] ItalkChatMsg text3
       * @property {number|Long|null} [groupupdatetime] ItalkChatMsg groupupdatetime
       * @property {number|Long|null} [msgflag] ItalkChatMsg msgflag
       * @property {string|null} [msginfo1] ItalkChatMsg msginfo1
       * @property {number|Long|null} [msgint1] ItalkChatMsg msgint1
       * @property {string|null} [msginfo2] ItalkChatMsg msginfo2
       * @property {number|Long|null} [msgint2] ItalkChatMsg msgint2
       * @property {string|null} [msginfo3] ItalkChatMsg msginfo3
       * @property {string|null} [uuid] ItalkChatMsg uuid
       * @property {number|Long|null} [crc] ItalkChatMsg crc
       * @property {string|null} [errorinfo] ItalkChatMsg errorinfo
       * @property {number|Long|null} [number] ItalkChatMsg number
       * @property {Array.<number|Long>|null} [msgidList] ItalkChatMsg msgidList
       * @property {italk.pb.IItalkRecordMsg|null} [records] ItalkChatMsg records
       */

      /**
       * Constructs a new ItalkChatMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkChatMsg.
       * @implements IItalkChatMsg
       * @constructor
       * @param {italk.pb.IItalkChatMsg=} [properties] Properties to set
       */
      function ItalkChatMsg(properties) {
        this.memberids = [];
        this.msgidList = [];
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkChatMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */


      ItalkChatMsg.prototype.msgType = 0;
      /**
       * ItalkChatMsg userid.
       * @member {string} userid
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.userid = "";
      /**
       * ItalkChatMsg localid.
       * @member {number|Long} localid
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.localid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg fid.
       * @member {string} fid
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.fid = "";
      /**
       * ItalkChatMsg memberids.
       * @member {Array.<string>} memberids
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.memberids = $util.emptyArray;
      /**
       * ItalkChatMsg msgid.
       * @member {number|Long} msgid
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg timestamp.
       * @member {number|Long} timestamp
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg burnsecond.
       * @member {number} burnsecond
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.burnsecond = 0;
      /**
       * ItalkChatMsg burn.
       * @member {boolean} burn
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.burn = false;
      /**
       * ItalkChatMsg chattype.
       * @member {italk.pb.ItalkChatTypeEnum} chattype
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.chattype = 0;
      /**
       * ItalkChatMsg bussinesstype.
       * @member {italk.pb.ItalkBusinessTypeEnum} bussinesstype
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.bussinesstype = 0;
      /**
       * ItalkChatMsg status.
       * @member {italk.pb.ItalkMsgStatusEnum} status
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.status = 0;
      /**
       * ItalkChatMsg content.
       * @member {italk.pb.IItalkMsgContent|null|undefined} content
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.content = null;
      /**
       * ItalkChatMsg userupdatetime.
       * @member {number|Long} userupdatetime
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.userupdatetime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msgindex.
       * @member {number|Long} msgindex
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgindex = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msglastindex.
       * @member {number|Long} msglastindex
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msglastindex = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg online.
       * @member {boolean} online
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.online = false;
      /**
       * ItalkChatMsg offlinenum.
       * @member {number|Long} offlinenum
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.offlinenum = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msgorder.
       * @member {number|Long} msgorder
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgorder = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msguserorder.
       * @member {number|Long} msguserorder
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msguserorder = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg text1.
       * @member {string} text1
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.text1 = "";
      /**
       * ItalkChatMsg text2.
       * @member {string} text2
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.text2 = "";
      /**
       * ItalkChatMsg text3.
       * @member {string} text3
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.text3 = "";
      /**
       * ItalkChatMsg groupupdatetime.
       * @member {number|Long} groupupdatetime
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.groupupdatetime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msgflag.
       * @member {number|Long} msgflag
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgflag = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msginfo1.
       * @member {string} msginfo1
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msginfo1 = "";
      /**
       * ItalkChatMsg msgint1.
       * @member {number|Long} msgint1
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgint1 = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msginfo2.
       * @member {string} msginfo2
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msginfo2 = "";
      /**
       * ItalkChatMsg msgint2.
       * @member {number|Long} msgint2
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgint2 = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msginfo3.
       * @member {string} msginfo3
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msginfo3 = "";
      /**
       * ItalkChatMsg uuid.
       * @member {string} uuid
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.uuid = "";
      /**
       * ItalkChatMsg crc.
       * @member {number|Long} crc
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.crc = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg errorinfo.
       * @member {string} errorinfo
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.errorinfo = "";
      /**
       * ItalkChatMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatMsg msgidList.
       * @member {Array.<number|Long>} msgidList
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.msgidList = $util.emptyArray;
      /**
       * ItalkChatMsg records.
       * @member {italk.pb.IItalkRecordMsg|null|undefined} records
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       */

      ItalkChatMsg.prototype.records = null;
      /**
       * Creates a new ItalkChatMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {italk.pb.IItalkChatMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkChatMsg} ItalkChatMsg instance
       */

      ItalkChatMsg.create = function create(properties) {
        return new ItalkChatMsg(properties);
      };
      /**
       * Encodes the specified ItalkChatMsg message. Does not implicitly {@link italk.pb.ItalkChatMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {italk.pb.IItalkChatMsg} message ItalkChatMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkChatMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.userid != null && message.hasOwnProperty("userid")) writer.uint32(
        /* id 2, wireType 2 =*/
        18).string(message.userid);
        if (message.localid != null && message.hasOwnProperty("localid")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int64(message.localid);
        if (message.fid != null && message.hasOwnProperty("fid")) writer.uint32(
        /* id 4, wireType 2 =*/
        34).string(message.fid);
        if (message.memberids != null && message.memberids.length) for (var i = 0; i < message.memberids.length; ++i) {
          writer.uint32(
          /* id 5, wireType 2 =*/
          42).string(message.memberids[i]);
        }
        if (message.msgid != null && message.hasOwnProperty("msgid")) writer.uint32(
        /* id 6, wireType 0 =*/
        48).int64(message.msgid);
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) writer.uint32(
        /* id 7, wireType 0 =*/
        56).int64(message.timestamp);
        if (message.burnsecond != null && message.hasOwnProperty("burnsecond")) writer.uint32(
        /* id 8, wireType 0 =*/
        64).int32(message.burnsecond);
        if (message.burn != null && message.hasOwnProperty("burn")) writer.uint32(
        /* id 9, wireType 0 =*/
        72).bool(message.burn);
        if (message.chattype != null && message.hasOwnProperty("chattype")) writer.uint32(
        /* id 10, wireType 0 =*/
        80).int32(message.chattype);
        if (message.bussinesstype != null && message.hasOwnProperty("bussinesstype")) writer.uint32(
        /* id 11, wireType 0 =*/
        88).int32(message.bussinesstype);
        if (message.status != null && message.hasOwnProperty("status")) writer.uint32(
        /* id 12, wireType 0 =*/
        96).int32(message.status);
        if (message.content != null && message.hasOwnProperty("content")) $root.italk.pb.ItalkMsgContent.encode(message.content, writer.uint32(
        /* id 13, wireType 2 =*/
        106).fork()).ldelim();
        if (message.userupdatetime != null && message.hasOwnProperty("userupdatetime")) writer.uint32(
        /* id 14, wireType 0 =*/
        112).int64(message.userupdatetime);
        if (message.msgindex != null && message.hasOwnProperty("msgindex")) writer.uint32(
        /* id 15, wireType 0 =*/
        120).int64(message.msgindex);
        if (message.msglastindex != null && message.hasOwnProperty("msglastindex")) writer.uint32(
        /* id 16, wireType 0 =*/
        128).int64(message.msglastindex);
        if (message.online != null && message.hasOwnProperty("online")) writer.uint32(
        /* id 17, wireType 0 =*/
        136).bool(message.online);
        if (message.offlinenum != null && message.hasOwnProperty("offlinenum")) writer.uint32(
        /* id 18, wireType 0 =*/
        144).int64(message.offlinenum);
        if (message.msgorder != null && message.hasOwnProperty("msgorder")) writer.uint32(
        /* id 19, wireType 0 =*/
        152).int64(message.msgorder);
        if (message.msguserorder != null && message.hasOwnProperty("msguserorder")) writer.uint32(
        /* id 20, wireType 0 =*/
        160).int64(message.msguserorder);
        if (message.text1 != null && message.hasOwnProperty("text1")) writer.uint32(
        /* id 21, wireType 2 =*/
        170).string(message.text1);
        if (message.text2 != null && message.hasOwnProperty("text2")) writer.uint32(
        /* id 22, wireType 2 =*/
        178).string(message.text2);
        if (message.text3 != null && message.hasOwnProperty("text3")) writer.uint32(
        /* id 23, wireType 2 =*/
        186).string(message.text3);
        if (message.groupupdatetime != null && message.hasOwnProperty("groupupdatetime")) writer.uint32(
        /* id 24, wireType 0 =*/
        192).int64(message.groupupdatetime);
        if (message.msgflag != null && message.hasOwnProperty("msgflag")) writer.uint32(
        /* id 25, wireType 0 =*/
        200).int64(message.msgflag);
        if (message.msginfo1 != null && message.hasOwnProperty("msginfo1")) writer.uint32(
        /* id 26, wireType 2 =*/
        210).string(message.msginfo1);
        if (message.msgint1 != null && message.hasOwnProperty("msgint1")) writer.uint32(
        /* id 27, wireType 0 =*/
        216).int64(message.msgint1);
        if (message.msginfo2 != null && message.hasOwnProperty("msginfo2")) writer.uint32(
        /* id 28, wireType 2 =*/
        226).string(message.msginfo2);
        if (message.msgint2 != null && message.hasOwnProperty("msgint2")) writer.uint32(
        /* id 29, wireType 0 =*/
        232).int64(message.msgint2);
        if (message.msginfo3 != null && message.hasOwnProperty("msginfo3")) writer.uint32(
        /* id 30, wireType 2 =*/
        242).string(message.msginfo3);
        if (message.uuid != null && message.hasOwnProperty("uuid")) writer.uint32(
        /* id 31, wireType 2 =*/
        250).string(message.uuid);
        if (message.crc != null && message.hasOwnProperty("crc")) writer.uint32(
        /* id 32, wireType 0 =*/
        256).int64(message.crc);
        if (message.errorinfo != null && message.hasOwnProperty("errorinfo")) writer.uint32(
        /* id 33, wireType 2 =*/
        266).string(message.errorinfo);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 34, wireType 0 =*/
        272).int64(message.number);

        if (message.msgidList != null && message.msgidList.length) {
          writer.uint32(
          /* id 35, wireType 2 =*/
          282).fork();

          for (var i = 0; i < message.msgidList.length; ++i) {
            writer.int64(message.msgidList[i]);
          }

          writer.ldelim();
        }

        if (message.records != null && message.hasOwnProperty("records")) $root.italk.pb.ItalkRecordMsg.encode(message.records, writer.uint32(
        /* id 36, wireType 2 =*/
        290).fork()).ldelim();
        return writer;
      };
      /**
       * Encodes the specified ItalkChatMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkChatMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {italk.pb.IItalkChatMsg} message ItalkChatMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkChatMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkChatMsg} ItalkChatMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkChatMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkChatMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.userid = reader.string();
              break;

            case 3:
              message.localid = reader.int64();
              break;

            case 4:
              message.fid = reader.string();
              break;

            case 5:
              if (!(message.memberids && message.memberids.length)) message.memberids = [];
              message.memberids.push(reader.string());
              break;

            case 6:
              message.msgid = reader.int64();
              break;

            case 7:
              message.timestamp = reader.int64();
              break;

            case 8:
              message.burnsecond = reader.int32();
              break;

            case 9:
              message.burn = reader.bool();
              break;

            case 10:
              message.chattype = reader.int32();
              break;

            case 11:
              message.bussinesstype = reader.int32();
              break;

            case 12:
              message.status = reader.int32();
              break;

            case 13:
              message.content = $root.italk.pb.ItalkMsgContent.decode(reader, reader.uint32());
              break;

            case 14:
              message.userupdatetime = reader.int64();
              break;

            case 15:
              message.msgindex = reader.int64();
              break;

            case 16:
              message.msglastindex = reader.int64();
              break;

            case 17:
              message.online = reader.bool();
              break;

            case 18:
              message.offlinenum = reader.int64();
              break;

            case 19:
              message.msgorder = reader.int64();
              break;

            case 20:
              message.msguserorder = reader.int64();
              break;

            case 21:
              message.text1 = reader.string();
              break;

            case 22:
              message.text2 = reader.string();
              break;

            case 23:
              message.text3 = reader.string();
              break;

            case 24:
              message.groupupdatetime = reader.int64();
              break;

            case 25:
              message.msgflag = reader.int64();
              break;

            case 26:
              message.msginfo1 = reader.string();
              break;

            case 27:
              message.msgint1 = reader.int64();
              break;

            case 28:
              message.msginfo2 = reader.string();
              break;

            case 29:
              message.msgint2 = reader.int64();
              break;

            case 30:
              message.msginfo3 = reader.string();
              break;

            case 31:
              message.uuid = reader.string();
              break;

            case 32:
              message.crc = reader.int64();
              break;

            case 33:
              message.errorinfo = reader.string();
              break;

            case 34:
              message.number = reader.int64();
              break;

            case 35:
              if (!(message.msgidList && message.msgidList.length)) message.msgidList = [];

              if ((tag & 7) === 2) {
                var end2 = reader.uint32() + reader.pos;

                while (reader.pos < end2) {
                  message.msgidList.push(reader.int64());
                }
              } else message.msgidList.push(reader.int64());

              break;

            case 36:
              message.records = $root.italk.pb.ItalkRecordMsg.decode(reader, reader.uint32());
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkChatMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkChatMsg} ItalkChatMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkChatMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkChatMsg message.
       * @function verify
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkChatMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.userid != null && message.hasOwnProperty("userid")) if (!$util.isString(message.userid)) return "userid: string expected";
        if (message.localid != null && message.hasOwnProperty("localid")) if (!$util.isInteger(message.localid) && !(message.localid && $util.isInteger(message.localid.low) && $util.isInteger(message.localid.high))) return "localid: integer|Long expected";
        if (message.fid != null && message.hasOwnProperty("fid")) if (!$util.isString(message.fid)) return "fid: string expected";

        if (message.memberids != null && message.hasOwnProperty("memberids")) {
          if (!Array.isArray(message.memberids)) return "memberids: array expected";

          for (var i = 0; i < message.memberids.length; ++i) {
            if (!$util.isString(message.memberids[i])) return "memberids: string[] expected";
          }
        }

        if (message.msgid != null && message.hasOwnProperty("msgid")) if (!$util.isInteger(message.msgid) && !(message.msgid && $util.isInteger(message.msgid.low) && $util.isInteger(message.msgid.high))) return "msgid: integer|Long expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high))) return "timestamp: integer|Long expected";
        if (message.burnsecond != null && message.hasOwnProperty("burnsecond")) if (!$util.isInteger(message.burnsecond)) return "burnsecond: integer expected";
        if (message.burn != null && message.hasOwnProperty("burn")) if (typeof message.burn !== "boolean") return "burn: boolean expected";
        if (message.chattype != null && message.hasOwnProperty("chattype")) switch (message.chattype) {
          default:
            return "chattype: enum value expected";

          case 0:
          case 1:
            break;
        }
        if (message.bussinesstype != null && message.hasOwnProperty("bussinesstype")) switch (message.bussinesstype) {
          default:
            return "bussinesstype: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 58:
          case 59:
          case 60:
          case 61:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.status != null && message.hasOwnProperty("status")) switch (message.status) {
          default:
            return "status: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
            break;
        }

        if (message.content != null && message.hasOwnProperty("content")) {
          var error = $root.italk.pb.ItalkMsgContent.verify(message.content);
          if (error) return "content." + error;
        }

        if (message.userupdatetime != null && message.hasOwnProperty("userupdatetime")) if (!$util.isInteger(message.userupdatetime) && !(message.userupdatetime && $util.isInteger(message.userupdatetime.low) && $util.isInteger(message.userupdatetime.high))) return "userupdatetime: integer|Long expected";
        if (message.msgindex != null && message.hasOwnProperty("msgindex")) if (!$util.isInteger(message.msgindex) && !(message.msgindex && $util.isInteger(message.msgindex.low) && $util.isInteger(message.msgindex.high))) return "msgindex: integer|Long expected";
        if (message.msglastindex != null && message.hasOwnProperty("msglastindex")) if (!$util.isInteger(message.msglastindex) && !(message.msglastindex && $util.isInteger(message.msglastindex.low) && $util.isInteger(message.msglastindex.high))) return "msglastindex: integer|Long expected";
        if (message.online != null && message.hasOwnProperty("online")) if (typeof message.online !== "boolean") return "online: boolean expected";
        if (message.offlinenum != null && message.hasOwnProperty("offlinenum")) if (!$util.isInteger(message.offlinenum) && !(message.offlinenum && $util.isInteger(message.offlinenum.low) && $util.isInteger(message.offlinenum.high))) return "offlinenum: integer|Long expected";
        if (message.msgorder != null && message.hasOwnProperty("msgorder")) if (!$util.isInteger(message.msgorder) && !(message.msgorder && $util.isInteger(message.msgorder.low) && $util.isInteger(message.msgorder.high))) return "msgorder: integer|Long expected";
        if (message.msguserorder != null && message.hasOwnProperty("msguserorder")) if (!$util.isInteger(message.msguserorder) && !(message.msguserorder && $util.isInteger(message.msguserorder.low) && $util.isInteger(message.msguserorder.high))) return "msguserorder: integer|Long expected";
        if (message.text1 != null && message.hasOwnProperty("text1")) if (!$util.isString(message.text1)) return "text1: string expected";
        if (message.text2 != null && message.hasOwnProperty("text2")) if (!$util.isString(message.text2)) return "text2: string expected";
        if (message.text3 != null && message.hasOwnProperty("text3")) if (!$util.isString(message.text3)) return "text3: string expected";
        if (message.groupupdatetime != null && message.hasOwnProperty("groupupdatetime")) if (!$util.isInteger(message.groupupdatetime) && !(message.groupupdatetime && $util.isInteger(message.groupupdatetime.low) && $util.isInteger(message.groupupdatetime.high))) return "groupupdatetime: integer|Long expected";
        if (message.msgflag != null && message.hasOwnProperty("msgflag")) if (!$util.isInteger(message.msgflag) && !(message.msgflag && $util.isInteger(message.msgflag.low) && $util.isInteger(message.msgflag.high))) return "msgflag: integer|Long expected";
        if (message.msginfo1 != null && message.hasOwnProperty("msginfo1")) if (!$util.isString(message.msginfo1)) return "msginfo1: string expected";
        if (message.msgint1 != null && message.hasOwnProperty("msgint1")) if (!$util.isInteger(message.msgint1) && !(message.msgint1 && $util.isInteger(message.msgint1.low) && $util.isInteger(message.msgint1.high))) return "msgint1: integer|Long expected";
        if (message.msginfo2 != null && message.hasOwnProperty("msginfo2")) if (!$util.isString(message.msginfo2)) return "msginfo2: string expected";
        if (message.msgint2 != null && message.hasOwnProperty("msgint2")) if (!$util.isInteger(message.msgint2) && !(message.msgint2 && $util.isInteger(message.msgint2.low) && $util.isInteger(message.msgint2.high))) return "msgint2: integer|Long expected";
        if (message.msginfo3 != null && message.hasOwnProperty("msginfo3")) if (!$util.isString(message.msginfo3)) return "msginfo3: string expected";
        if (message.uuid != null && message.hasOwnProperty("uuid")) if (!$util.isString(message.uuid)) return "uuid: string expected";
        if (message.crc != null && message.hasOwnProperty("crc")) if (!$util.isInteger(message.crc) && !(message.crc && $util.isInteger(message.crc.low) && $util.isInteger(message.crc.high))) return "crc: integer|Long expected";
        if (message.errorinfo != null && message.hasOwnProperty("errorinfo")) if (!$util.isString(message.errorinfo)) return "errorinfo: string expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";

        if (message.msgidList != null && message.hasOwnProperty("msgidList")) {
          if (!Array.isArray(message.msgidList)) return "msgidList: array expected";

          for (var i = 0; i < message.msgidList.length; ++i) {
            if (!$util.isInteger(message.msgidList[i]) && !(message.msgidList[i] && $util.isInteger(message.msgidList[i].low) && $util.isInteger(message.msgidList[i].high))) return "msgidList: integer|Long[] expected";
          }
        }

        if (message.records != null && message.hasOwnProperty("records")) {
          var error = $root.italk.pb.ItalkRecordMsg.verify(message.records);
          if (error) return "records." + error;
        }

        return null;
      };
      /**
       * Creates an ItalkChatMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkChatMsg} ItalkChatMsg
       */


      ItalkChatMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkChatMsg) return object;
        var message = new $root.italk.pb.ItalkChatMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.userid != null) message.userid = String(object.userid);
        if (object.localid != null) if ($util.Long) (message.localid = $util.Long.fromValue(object.localid)).unsigned = false;else if (typeof object.localid === "string") message.localid = parseInt(object.localid, 10);else if (typeof object.localid === "number") message.localid = object.localid;else if (typeof object.localid === "object") message.localid = new $util.LongBits(object.localid.low >>> 0, object.localid.high >>> 0).toNumber();
        if (object.fid != null) message.fid = String(object.fid);

        if (object.memberids) {
          if (!Array.isArray(object.memberids)) throw TypeError(".italk.pb.ItalkChatMsg.memberids: array expected");
          message.memberids = [];

          for (var i = 0; i < object.memberids.length; ++i) {
            message.memberids[i] = String(object.memberids[i]);
          }
        }

        if (object.msgid != null) if ($util.Long) (message.msgid = $util.Long.fromValue(object.msgid)).unsigned = false;else if (typeof object.msgid === "string") message.msgid = parseInt(object.msgid, 10);else if (typeof object.msgid === "number") message.msgid = object.msgid;else if (typeof object.msgid === "object") message.msgid = new $util.LongBits(object.msgid.low >>> 0, object.msgid.high >>> 0).toNumber();
        if (object.timestamp != null) if ($util.Long) (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;else if (typeof object.timestamp === "string") message.timestamp = parseInt(object.timestamp, 10);else if (typeof object.timestamp === "number") message.timestamp = object.timestamp;else if (typeof object.timestamp === "object") message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.burnsecond != null) message.burnsecond = object.burnsecond | 0;
        if (object.burn != null) message.burn = Boolean(object.burn);

        switch (object.chattype) {
          case "ITKSingleChat":
          case 0:
            message.chattype = 0;
            break;

          case "ITKGroupChat":
          case 1:
            message.chattype = 1;
            break;
        }

        switch (object.bussinesstype) {
          case "ITKSMS":
          case 0:
            message.bussinesstype = 0;
            break;

          case "ITKPic":
          case 1:
            message.bussinesstype = 1;
            break;

          case "ITKSound":
          case 2:
            message.bussinesstype = 2;
            break;

          case "ITKShortVideo":
          case 3:
            message.bussinesstype = 3;
            break;

          case "ITKFile":
          case 4:
            message.bussinesstype = 4;
            break;

          case "ITKLocation":
          case 5:
            message.bussinesstype = 5;
            break;

          case "ITKRedPacket":
          case 6:
            message.bussinesstype = 6;
            break;

          case "ITKVoiceCall":
          case 7:
            message.bussinesstype = 7;
            break;

          case "ITKVideoCall":
          case 8:
            message.bussinesstype = 8;
            break;

          case "ITKServerPush":
          case 9:
            message.bussinesstype = 9;
            break;

          case "ITKAddFriendRequest":
          case 10:
            message.bussinesstype = 10;
            break;

          case "ITKNeedFriendVerify":
          case 11:
            message.bussinesstype = 11;
            break;

          case "ITKAddFriendSucccess":
          case 12:
            message.bussinesstype = 12;
            break;

          case "ITKVerifyFriendAnswer":
          case 13:
            message.bussinesstype = 13;
            break;

          case "ITKVerifyFriendSuccess":
          case 14:
            message.bussinesstype = 14;
            break;

          case "ITKGroupCreate":
          case 15:
            message.bussinesstype = 15;
            break;

          case "ITKGroupMemberQuit":
          case 16:
            message.bussinesstype = 16;
            break;

          case "ITKGroupMemberAdd":
          case 17:
            message.bussinesstype = 17;
            break;

          case "ITKGroupOwnerTransfer":
          case 18:
            message.bussinesstype = 18;
            break;

          case "ITKInviteGroupMember":
          case 19:
            message.bussinesstype = 19;
            break;

          case "ITKVerifyInivitation":
          case 20:
            message.bussinesstype = 20;
            break;

          case "ITKDeleteGroupMember":
          case 21:
            message.bussinesstype = 21;
            break;

          case "ITKChatStatusChange":
          case 22:
            message.bussinesstype = 22;
            break;

          case "ITKSystemNotification":
          case 23:
            message.bussinesstype = 23;
            break;

          case "ITKRevokeMsg":
          case 24:
            message.bussinesstype = 24;
            break;

          case "ITkDestroyed":
          case 25:
            message.bussinesstype = 25;
            break;

          case "ITKReturnRedPacket":
          case 26:
            message.bussinesstype = 26;
            break;

          case "ITKRemoveMsgID":
          case 27:
            message.bussinesstype = 27;
            break;

          case "ITKOtherMachineLogin":
          case 28:
            message.bussinesstype = 28;
            break;

          case "ITKRequestLogin":
          case 29:
            message.bussinesstype = 29;
            break;

          case "ITKAuthLogin":
          case 30:
            message.bussinesstype = 30;
            break;

          case "ITKUserChange":
          case 31:
            message.bussinesstype = 31;
            break;

          case "ITKAppState":
          case 32:
            message.bussinesstype = 32;
            break;

          case "ITKBussniesstype1":
          case 41:
            message.bussinesstype = 41;
            break;

          case "ITKBussniesstype2":
          case 42:
            message.bussinesstype = 42;
            break;

          case "ITKBussniesstype3":
          case 43:
            message.bussinesstype = 43;
            break;

          case "ITKBussniesstype4":
          case 44:
            message.bussinesstype = 44;
            break;

          case "ITKBussniesstype5":
          case 45:
            message.bussinesstype = 45;
            break;

          case "ITKBussniesstype6":
          case 46:
            message.bussinesstype = 46;
            break;

          case "ITKBussniesstype7":
          case 47:
            message.bussinesstype = 47;
            break;

          case "ITKBussniesstype8":
          case 48:
            message.bussinesstype = 48;
            break;

          case "ITKBussniesstype9":
          case 49:
            message.bussinesstype = 49;
            break;

          case "ITKBussniesstype10":
          case 50:
            message.bussinesstype = 50;
            break;

          case "ITKBussniesstype11":
          case 51:
            message.bussinesstype = 51;
            break;

          case "ITKBussniesstype12":
          case 52:
            message.bussinesstype = 52;
            break;

          case "ITKBussniesstype13":
          case 53:
            message.bussinesstype = 53;
            break;

          case "ITKBussniesstype14":
          case 54:
            message.bussinesstype = 54;
            break;

          case "ITKBussniesstype15":
          case 55:
            message.bussinesstype = 55;
            break;

          case "ITKBussniesstype16":
          case 56:
            message.bussinesstype = 56;
            break;

          case "ITKBussniesstype17":
          case 57:
            message.bussinesstype = 57;
            break;

          case "ITKBussniesstype18":
          case 58:
            message.bussinesstype = 58;
            break;

          case "ITKBussniesstype19":
          case 59:
            message.bussinesstype = 59;
            break;

          case "ITKBussniesstype20":
          case 60:
            message.bussinesstype = 60;
            break;

          case "ITKBussniesstype21":
          case 61:
            message.bussinesstype = 61;
            break;

          case "ITKBussniesstype22":
          case 62:
            message.bussinesstype = 62;
            break;

          case "ITKBussniesstype23":
          case 63:
            message.bussinesstype = 63;
            break;

          case "ITKBussniesstype24":
          case 64:
            message.bussinesstype = 64;
            break;

          case "ITKBussniesstype25":
          case 65:
            message.bussinesstype = 65;
            break;

          case "ITKBussniesstype26":
          case 66:
            message.bussinesstype = 66;
            break;

          case "ITKBussniesstype27":
          case 67:
            message.bussinesstype = 67;
            break;

          case "ITKBussniesstype28":
          case 68:
            message.bussinesstype = 68;
            break;

          case "ITKBussniesstype29":
          case 69:
            message.bussinesstype = 69;
            break;

          case "ITKBussniesstype30":
          case 70:
            message.bussinesstype = 70;
            break;

          case "ITKBussniesstype31":
          case 71:
            message.bussinesstype = 71;
            break;

          case "ITKBussniesstype32":
          case 72:
            message.bussinesstype = 72;
            break;

          case "ITKBussniesstype33":
          case 73:
            message.bussinesstype = 73;
            break;

          case "ITKBussniesstype34":
          case 74:
            message.bussinesstype = 74;
            break;

          case "ITKBussniesstype35":
          case 75:
            message.bussinesstype = 75;
            break;

          case "ITKBussniesstype36":
          case 76:
            message.bussinesstype = 76;
            break;

          case "ITKBussniesstype37":
          case 77:
            message.bussinesstype = 77;
            break;

          case "ITKBussniesstype38":
          case 78:
            message.bussinesstype = 78;
            break;

          case "ITKBussniesstype39":
          case 79:
            message.bussinesstype = 79;
            break;

          case "ITKBussniesstype40":
          case 80:
            message.bussinesstype = 80;
            break;

          case "ITKBussniesstype41":
          case 81:
            message.bussinesstype = 81;
            break;

          case "ITKBussniesstype42":
          case 82:
            message.bussinesstype = 82;
            break;

          case "ITKRecodeMsg":
          case 83:
            message.bussinesstype = 83;
            break;
        }

        switch (object.status) {
          case "ITKUnsend":
          case 0:
            message.status = 0;
            break;

          case "ITKSending":
          case 1:
            message.status = 1;
            break;

          case "ITKSended":
          case 2:
            message.status = 2;
            break;

          case "ITKSendFailed":
          case 3:
            message.status = 3;
            break;

          case "ITKReceiverReceived":
          case 4:
            message.status = 4;
            break;

          case "ITKSenderReceived":
          case 5:
            message.status = 5;
            break;

          case "ITKReceiverReaded":
          case 6:
            message.status = 6;
            break;

          case "ITKSenderReaded":
          case 7:
            message.status = 7;
            break;

          case "ITKReceiverDestroyed":
          case 8:
            message.status = 8;
            break;

          case "ITKSenderDestroyed":
          case 9:
            message.status = 9;
            break;

          case "ITKReceiverTimeout":
          case 10:
            message.status = 10;
            break;

          case "ITKSenderTimeout":
          case 11:
            message.status = 11;
            break;

          case "ITKSenderRevoke":
          case 12:
            message.status = 12;
            break;

          case "ITKReceiverRevoke":
          case 13:
            message.status = 13;
            break;

          case "ITKMsgStatus1":
          case 21:
            message.status = 21;
            break;

          case "ITKMsgStatus2":
          case 22:
            message.status = 22;
            break;

          case "ITKMsgStatus3":
          case 23:
            message.status = 23;
            break;

          case "ITKMsgStatus4":
          case 24:
            message.status = 24;
            break;

          case "ITKMsgStatus5":
          case 25:
            message.status = 25;
            break;

          case "ITKMsgStatus6":
          case 26:
            message.status = 26;
            break;
        }

        if (object.content != null) {
          if (typeof object.content !== "object") throw TypeError(".italk.pb.ItalkChatMsg.content: object expected");
          message.content = $root.italk.pb.ItalkMsgContent.fromObject(object.content);
        }

        if (object.userupdatetime != null) if ($util.Long) (message.userupdatetime = $util.Long.fromValue(object.userupdatetime)).unsigned = false;else if (typeof object.userupdatetime === "string") message.userupdatetime = parseInt(object.userupdatetime, 10);else if (typeof object.userupdatetime === "number") message.userupdatetime = object.userupdatetime;else if (typeof object.userupdatetime === "object") message.userupdatetime = new $util.LongBits(object.userupdatetime.low >>> 0, object.userupdatetime.high >>> 0).toNumber();
        if (object.msgindex != null) if ($util.Long) (message.msgindex = $util.Long.fromValue(object.msgindex)).unsigned = false;else if (typeof object.msgindex === "string") message.msgindex = parseInt(object.msgindex, 10);else if (typeof object.msgindex === "number") message.msgindex = object.msgindex;else if (typeof object.msgindex === "object") message.msgindex = new $util.LongBits(object.msgindex.low >>> 0, object.msgindex.high >>> 0).toNumber();
        if (object.msglastindex != null) if ($util.Long) (message.msglastindex = $util.Long.fromValue(object.msglastindex)).unsigned = false;else if (typeof object.msglastindex === "string") message.msglastindex = parseInt(object.msglastindex, 10);else if (typeof object.msglastindex === "number") message.msglastindex = object.msglastindex;else if (typeof object.msglastindex === "object") message.msglastindex = new $util.LongBits(object.msglastindex.low >>> 0, object.msglastindex.high >>> 0).toNumber();
        if (object.online != null) message.online = Boolean(object.online);
        if (object.offlinenum != null) if ($util.Long) (message.offlinenum = $util.Long.fromValue(object.offlinenum)).unsigned = false;else if (typeof object.offlinenum === "string") message.offlinenum = parseInt(object.offlinenum, 10);else if (typeof object.offlinenum === "number") message.offlinenum = object.offlinenum;else if (typeof object.offlinenum === "object") message.offlinenum = new $util.LongBits(object.offlinenum.low >>> 0, object.offlinenum.high >>> 0).toNumber();
        if (object.msgorder != null) if ($util.Long) (message.msgorder = $util.Long.fromValue(object.msgorder)).unsigned = false;else if (typeof object.msgorder === "string") message.msgorder = parseInt(object.msgorder, 10);else if (typeof object.msgorder === "number") message.msgorder = object.msgorder;else if (typeof object.msgorder === "object") message.msgorder = new $util.LongBits(object.msgorder.low >>> 0, object.msgorder.high >>> 0).toNumber();
        if (object.msguserorder != null) if ($util.Long) (message.msguserorder = $util.Long.fromValue(object.msguserorder)).unsigned = false;else if (typeof object.msguserorder === "string") message.msguserorder = parseInt(object.msguserorder, 10);else if (typeof object.msguserorder === "number") message.msguserorder = object.msguserorder;else if (typeof object.msguserorder === "object") message.msguserorder = new $util.LongBits(object.msguserorder.low >>> 0, object.msguserorder.high >>> 0).toNumber();
        if (object.text1 != null) message.text1 = String(object.text1);
        if (object.text2 != null) message.text2 = String(object.text2);
        if (object.text3 != null) message.text3 = String(object.text3);
        if (object.groupupdatetime != null) if ($util.Long) (message.groupupdatetime = $util.Long.fromValue(object.groupupdatetime)).unsigned = false;else if (typeof object.groupupdatetime === "string") message.groupupdatetime = parseInt(object.groupupdatetime, 10);else if (typeof object.groupupdatetime === "number") message.groupupdatetime = object.groupupdatetime;else if (typeof object.groupupdatetime === "object") message.groupupdatetime = new $util.LongBits(object.groupupdatetime.low >>> 0, object.groupupdatetime.high >>> 0).toNumber();
        if (object.msgflag != null) if ($util.Long) (message.msgflag = $util.Long.fromValue(object.msgflag)).unsigned = false;else if (typeof object.msgflag === "string") message.msgflag = parseInt(object.msgflag, 10);else if (typeof object.msgflag === "number") message.msgflag = object.msgflag;else if (typeof object.msgflag === "object") message.msgflag = new $util.LongBits(object.msgflag.low >>> 0, object.msgflag.high >>> 0).toNumber();
        if (object.msginfo1 != null) message.msginfo1 = String(object.msginfo1);
        if (object.msgint1 != null) if ($util.Long) (message.msgint1 = $util.Long.fromValue(object.msgint1)).unsigned = false;else if (typeof object.msgint1 === "string") message.msgint1 = parseInt(object.msgint1, 10);else if (typeof object.msgint1 === "number") message.msgint1 = object.msgint1;else if (typeof object.msgint1 === "object") message.msgint1 = new $util.LongBits(object.msgint1.low >>> 0, object.msgint1.high >>> 0).toNumber();
        if (object.msginfo2 != null) message.msginfo2 = String(object.msginfo2);
        if (object.msgint2 != null) if ($util.Long) (message.msgint2 = $util.Long.fromValue(object.msgint2)).unsigned = false;else if (typeof object.msgint2 === "string") message.msgint2 = parseInt(object.msgint2, 10);else if (typeof object.msgint2 === "number") message.msgint2 = object.msgint2;else if (typeof object.msgint2 === "object") message.msgint2 = new $util.LongBits(object.msgint2.low >>> 0, object.msgint2.high >>> 0).toNumber();
        if (object.msginfo3 != null) message.msginfo3 = String(object.msginfo3);
        if (object.uuid != null) message.uuid = String(object.uuid);
        if (object.crc != null) if ($util.Long) (message.crc = $util.Long.fromValue(object.crc)).unsigned = false;else if (typeof object.crc === "string") message.crc = parseInt(object.crc, 10);else if (typeof object.crc === "number") message.crc = object.crc;else if (typeof object.crc === "object") message.crc = new $util.LongBits(object.crc.low >>> 0, object.crc.high >>> 0).toNumber();
        if (object.errorinfo != null) message.errorinfo = String(object.errorinfo);
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = false;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();

        if (object.msgidList) {
          if (!Array.isArray(object.msgidList)) throw TypeError(".italk.pb.ItalkChatMsg.msgidList: array expected");
          message.msgidList = [];

          for (var i = 0; i < object.msgidList.length; ++i) {
            if ($util.Long) (message.msgidList[i] = $util.Long.fromValue(object.msgidList[i])).unsigned = false;else if (typeof object.msgidList[i] === "string") message.msgidList[i] = parseInt(object.msgidList[i], 10);else if (typeof object.msgidList[i] === "number") message.msgidList[i] = object.msgidList[i];else if (typeof object.msgidList[i] === "object") message.msgidList[i] = new $util.LongBits(object.msgidList[i].low >>> 0, object.msgidList[i].high >>> 0).toNumber();
          }
        }

        if (object.records != null) {
          if (typeof object.records !== "object") throw TypeError(".italk.pb.ItalkChatMsg.records: object expected");
          message.records = $root.italk.pb.ItalkRecordMsg.fromObject(object.records);
        }

        return message;
      };
      /**
       * Creates a plain object from an ItalkChatMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkChatMsg
       * @static
       * @param {italk.pb.ItalkChatMsg} message ItalkChatMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkChatMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.arrays || options.defaults) {
          object.memberids = [];
          object.msgidList = [];
        }

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.userid = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.localid = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.localid = options.longs === String ? "0" : 0;

          object.fid = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msgid = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msgid = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.timestamp = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.timestamp = options.longs === String ? "0" : 0;

          object.burnsecond = 0;
          object.burn = false;
          object.chattype = options.enums === String ? "ITKSingleChat" : 0;
          object.bussinesstype = options.enums === String ? "ITKSMS" : 0;
          object.status = options.enums === String ? "ITKUnsend" : 0;
          object.content = null;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.userupdatetime = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.userupdatetime = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msgindex = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msgindex = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msglastindex = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msglastindex = options.longs === String ? "0" : 0;

          object.online = false;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.offlinenum = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.offlinenum = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msgorder = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msgorder = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msguserorder = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msguserorder = options.longs === String ? "0" : 0;

          object.text1 = "";
          object.text2 = "";
          object.text3 = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.groupupdatetime = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.groupupdatetime = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msgflag = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msgflag = options.longs === String ? "0" : 0;

          object.msginfo1 = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msgint1 = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msgint1 = options.longs === String ? "0" : 0;

          object.msginfo2 = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.msgint2 = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.msgint2 = options.longs === String ? "0" : 0;

          object.msginfo3 = "";
          object.uuid = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.crc = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.crc = options.longs === String ? "0" : 0;

          object.errorinfo = "";

          if ($util.Long) {
            var _long3 = new $util.Long(0, 0, false);

            object.number = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.number = options.longs === String ? "0" : 0;

          object.records = null;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.userid != null && message.hasOwnProperty("userid")) object.userid = message.userid;
        if (message.localid != null && message.hasOwnProperty("localid")) if (typeof message.localid === "number") object.localid = options.longs === String ? String(message.localid) : message.localid;else object.localid = options.longs === String ? $util.Long.prototype.toString.call(message.localid) : options.longs === Number ? new $util.LongBits(message.localid.low >>> 0, message.localid.high >>> 0).toNumber() : message.localid;
        if (message.fid != null && message.hasOwnProperty("fid")) object.fid = message.fid;

        if (message.memberids && message.memberids.length) {
          object.memberids = [];

          for (var j = 0; j < message.memberids.length; ++j) {
            object.memberids[j] = message.memberids[j];
          }
        }

        if (message.msgid != null && message.hasOwnProperty("msgid")) if (typeof message.msgid === "number") object.msgid = options.longs === String ? String(message.msgid) : message.msgid;else object.msgid = options.longs === String ? $util.Long.prototype.toString.call(message.msgid) : options.longs === Number ? new $util.LongBits(message.msgid.low >>> 0, message.msgid.high >>> 0).toNumber() : message.msgid;
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) if (typeof message.timestamp === "number") object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;else object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.burnsecond != null && message.hasOwnProperty("burnsecond")) object.burnsecond = message.burnsecond;
        if (message.burn != null && message.hasOwnProperty("burn")) object.burn = message.burn;
        if (message.chattype != null && message.hasOwnProperty("chattype")) object.chattype = options.enums === String ? $root.italk.pb.ItalkChatTypeEnum[message.chattype] : message.chattype;
        if (message.bussinesstype != null && message.hasOwnProperty("bussinesstype")) object.bussinesstype = options.enums === String ? $root.italk.pb.ItalkBusinessTypeEnum[message.bussinesstype] : message.bussinesstype;
        if (message.status != null && message.hasOwnProperty("status")) object.status = options.enums === String ? $root.italk.pb.ItalkMsgStatusEnum[message.status] : message.status;
        if (message.content != null && message.hasOwnProperty("content")) object.content = $root.italk.pb.ItalkMsgContent.toObject(message.content, options);
        if (message.userupdatetime != null && message.hasOwnProperty("userupdatetime")) if (typeof message.userupdatetime === "number") object.userupdatetime = options.longs === String ? String(message.userupdatetime) : message.userupdatetime;else object.userupdatetime = options.longs === String ? $util.Long.prototype.toString.call(message.userupdatetime) : options.longs === Number ? new $util.LongBits(message.userupdatetime.low >>> 0, message.userupdatetime.high >>> 0).toNumber() : message.userupdatetime;
        if (message.msgindex != null && message.hasOwnProperty("msgindex")) if (typeof message.msgindex === "number") object.msgindex = options.longs === String ? String(message.msgindex) : message.msgindex;else object.msgindex = options.longs === String ? $util.Long.prototype.toString.call(message.msgindex) : options.longs === Number ? new $util.LongBits(message.msgindex.low >>> 0, message.msgindex.high >>> 0).toNumber() : message.msgindex;
        if (message.msglastindex != null && message.hasOwnProperty("msglastindex")) if (typeof message.msglastindex === "number") object.msglastindex = options.longs === String ? String(message.msglastindex) : message.msglastindex;else object.msglastindex = options.longs === String ? $util.Long.prototype.toString.call(message.msglastindex) : options.longs === Number ? new $util.LongBits(message.msglastindex.low >>> 0, message.msglastindex.high >>> 0).toNumber() : message.msglastindex;
        if (message.online != null && message.hasOwnProperty("online")) object.online = message.online;
        if (message.offlinenum != null && message.hasOwnProperty("offlinenum")) if (typeof message.offlinenum === "number") object.offlinenum = options.longs === String ? String(message.offlinenum) : message.offlinenum;else object.offlinenum = options.longs === String ? $util.Long.prototype.toString.call(message.offlinenum) : options.longs === Number ? new $util.LongBits(message.offlinenum.low >>> 0, message.offlinenum.high >>> 0).toNumber() : message.offlinenum;
        if (message.msgorder != null && message.hasOwnProperty("msgorder")) if (typeof message.msgorder === "number") object.msgorder = options.longs === String ? String(message.msgorder) : message.msgorder;else object.msgorder = options.longs === String ? $util.Long.prototype.toString.call(message.msgorder) : options.longs === Number ? new $util.LongBits(message.msgorder.low >>> 0, message.msgorder.high >>> 0).toNumber() : message.msgorder;
        if (message.msguserorder != null && message.hasOwnProperty("msguserorder")) if (typeof message.msguserorder === "number") object.msguserorder = options.longs === String ? String(message.msguserorder) : message.msguserorder;else object.msguserorder = options.longs === String ? $util.Long.prototype.toString.call(message.msguserorder) : options.longs === Number ? new $util.LongBits(message.msguserorder.low >>> 0, message.msguserorder.high >>> 0).toNumber() : message.msguserorder;
        if (message.text1 != null && message.hasOwnProperty("text1")) object.text1 = message.text1;
        if (message.text2 != null && message.hasOwnProperty("text2")) object.text2 = message.text2;
        if (message.text3 != null && message.hasOwnProperty("text3")) object.text3 = message.text3;
        if (message.groupupdatetime != null && message.hasOwnProperty("groupupdatetime")) if (typeof message.groupupdatetime === "number") object.groupupdatetime = options.longs === String ? String(message.groupupdatetime) : message.groupupdatetime;else object.groupupdatetime = options.longs === String ? $util.Long.prototype.toString.call(message.groupupdatetime) : options.longs === Number ? new $util.LongBits(message.groupupdatetime.low >>> 0, message.groupupdatetime.high >>> 0).toNumber() : message.groupupdatetime;
        if (message.msgflag != null && message.hasOwnProperty("msgflag")) if (typeof message.msgflag === "number") object.msgflag = options.longs === String ? String(message.msgflag) : message.msgflag;else object.msgflag = options.longs === String ? $util.Long.prototype.toString.call(message.msgflag) : options.longs === Number ? new $util.LongBits(message.msgflag.low >>> 0, message.msgflag.high >>> 0).toNumber() : message.msgflag;
        if (message.msginfo1 != null && message.hasOwnProperty("msginfo1")) object.msginfo1 = message.msginfo1;
        if (message.msgint1 != null && message.hasOwnProperty("msgint1")) if (typeof message.msgint1 === "number") object.msgint1 = options.longs === String ? String(message.msgint1) : message.msgint1;else object.msgint1 = options.longs === String ? $util.Long.prototype.toString.call(message.msgint1) : options.longs === Number ? new $util.LongBits(message.msgint1.low >>> 0, message.msgint1.high >>> 0).toNumber() : message.msgint1;
        if (message.msginfo2 != null && message.hasOwnProperty("msginfo2")) object.msginfo2 = message.msginfo2;
        if (message.msgint2 != null && message.hasOwnProperty("msgint2")) if (typeof message.msgint2 === "number") object.msgint2 = options.longs === String ? String(message.msgint2) : message.msgint2;else object.msgint2 = options.longs === String ? $util.Long.prototype.toString.call(message.msgint2) : options.longs === Number ? new $util.LongBits(message.msgint2.low >>> 0, message.msgint2.high >>> 0).toNumber() : message.msgint2;
        if (message.msginfo3 != null && message.hasOwnProperty("msginfo3")) object.msginfo3 = message.msginfo3;
        if (message.uuid != null && message.hasOwnProperty("uuid")) object.uuid = message.uuid;
        if (message.crc != null && message.hasOwnProperty("crc")) if (typeof message.crc === "number") object.crc = options.longs === String ? String(message.crc) : message.crc;else object.crc = options.longs === String ? $util.Long.prototype.toString.call(message.crc) : options.longs === Number ? new $util.LongBits(message.crc.low >>> 0, message.crc.high >>> 0).toNumber() : message.crc;
        if (message.errorinfo != null && message.hasOwnProperty("errorinfo")) object.errorinfo = message.errorinfo;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;

        if (message.msgidList && message.msgidList.length) {
          object.msgidList = [];

          for (var j = 0; j < message.msgidList.length; ++j) {
            if (typeof message.msgidList[j] === "number") object.msgidList[j] = options.longs === String ? String(message.msgidList[j]) : message.msgidList[j];else object.msgidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.msgidList[j]) : options.longs === Number ? new $util.LongBits(message.msgidList[j].low >>> 0, message.msgidList[j].high >>> 0).toNumber() : message.msgidList[j];
          }
        }

        if (message.records != null && message.hasOwnProperty("records")) object.records = $root.italk.pb.ItalkRecordMsg.toObject(message.records, options);
        return object;
      };
      /**
       * Converts this ItalkChatMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkChatMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkChatMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkChatMsg;
    }();

    pb.ItalkChatEchoMsg = function () {
      /**
       * Properties of an ItalkChatEchoMsg.
       * @memberof italk.pb
       * @interface IItalkChatEchoMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkChatEchoMsg msgType
       * @property {italk.pb.IItalkEchoInfo|null} [echoInfo] ItalkChatEchoMsg echoInfo
       * @property {string|null} [userid] ItalkChatEchoMsg userid
       * @property {number|Long|null} [localid] ItalkChatEchoMsg localid
       * @property {string|null} [fid] ItalkChatEchoMsg fid
       * @property {number|Long|null} [msgid] ItalkChatEchoMsg msgid
       * @property {number|Long|null} [timestamp] ItalkChatEchoMsg timestamp
       * @property {number|null} [burnsecond] ItalkChatEchoMsg burnsecond
       * @property {boolean|null} [burn] ItalkChatEchoMsg burn
       * @property {italk.pb.ItalkChatTypeEnum|null} [chattype] ItalkChatEchoMsg chattype
       * @property {italk.pb.ItalkBusinessTypeEnum|null} [bussinesstype] ItalkChatEchoMsg bussinesstype
       * @property {italk.pb.ItalkMsgStatusEnum|null} [status] ItalkChatEchoMsg status
       * @property {number|Long|null} [msgindex] ItalkChatEchoMsg msgindex
       * @property {number|Long|null} [msgorder] ItalkChatEchoMsg msgorder
       * @property {number|Long|null} [msguserorder] ItalkChatEchoMsg msguserorder
       * @property {string|null} [text1] ItalkChatEchoMsg text1
       * @property {string|null} [text2] ItalkChatEchoMsg text2
       * @property {string|null} [text3] ItalkChatEchoMsg text3
       * @property {string|null} [uuid] ItalkChatEchoMsg uuid
       * @property {number|Long|null} [crc] ItalkChatEchoMsg crc
       * @property {number|Long|null} [number] ItalkChatEchoMsg number
       */

      /**
       * Constructs a new ItalkChatEchoMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkChatEchoMsg.
       * @implements IItalkChatEchoMsg
       * @constructor
       * @param {italk.pb.IItalkChatEchoMsg=} [properties] Properties to set
       */
      function ItalkChatEchoMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkChatEchoMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */


      ItalkChatEchoMsg.prototype.msgType = 0;
      /**
       * ItalkChatEchoMsg echoInfo.
       * @member {italk.pb.IItalkEchoInfo|null|undefined} echoInfo
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.echoInfo = null;
      /**
       * ItalkChatEchoMsg userid.
       * @member {string} userid
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.userid = "";
      /**
       * ItalkChatEchoMsg localid.
       * @member {number|Long} localid
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.localid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg fid.
       * @member {string} fid
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.fid = "";
      /**
       * ItalkChatEchoMsg msgid.
       * @member {number|Long} msgid
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.msgid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg timestamp.
       * @member {number|Long} timestamp
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg burnsecond.
       * @member {number} burnsecond
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.burnsecond = 0;
      /**
       * ItalkChatEchoMsg burn.
       * @member {boolean} burn
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.burn = false;
      /**
       * ItalkChatEchoMsg chattype.
       * @member {italk.pb.ItalkChatTypeEnum} chattype
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.chattype = 0;
      /**
       * ItalkChatEchoMsg bussinesstype.
       * @member {italk.pb.ItalkBusinessTypeEnum} bussinesstype
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.bussinesstype = 0;
      /**
       * ItalkChatEchoMsg status.
       * @member {italk.pb.ItalkMsgStatusEnum} status
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.status = 0;
      /**
       * ItalkChatEchoMsg msgindex.
       * @member {number|Long} msgindex
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.msgindex = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg msgorder.
       * @member {number|Long} msgorder
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.msgorder = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg msguserorder.
       * @member {number|Long} msguserorder
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.msguserorder = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg text1.
       * @member {string} text1
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.text1 = "";
      /**
       * ItalkChatEchoMsg text2.
       * @member {string} text2
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.text2 = "";
      /**
       * ItalkChatEchoMsg text3.
       * @member {string} text3
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.text3 = "";
      /**
       * ItalkChatEchoMsg uuid.
       * @member {string} uuid
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.uuid = "";
      /**
       * ItalkChatEchoMsg crc.
       * @member {number|Long} crc
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.crc = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkChatEchoMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       */

      ItalkChatEchoMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * Creates a new ItalkChatEchoMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {italk.pb.IItalkChatEchoMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkChatEchoMsg} ItalkChatEchoMsg instance
       */

      ItalkChatEchoMsg.create = function create(properties) {
        return new ItalkChatEchoMsg(properties);
      };
      /**
       * Encodes the specified ItalkChatEchoMsg message. Does not implicitly {@link italk.pb.ItalkChatEchoMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {italk.pb.IItalkChatEchoMsg} message ItalkChatEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkChatEchoMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) $root.italk.pb.ItalkEchoInfo.encode(message.echoInfo, writer.uint32(
        /* id 2, wireType 2 =*/
        18).fork()).ldelim();
        if (message.userid != null && message.hasOwnProperty("userid")) writer.uint32(
        /* id 3, wireType 2 =*/
        26).string(message.userid);
        if (message.localid != null && message.hasOwnProperty("localid")) writer.uint32(
        /* id 4, wireType 0 =*/
        32).int64(message.localid);
        if (message.fid != null && message.hasOwnProperty("fid")) writer.uint32(
        /* id 5, wireType 2 =*/
        42).string(message.fid);
        if (message.msgid != null && message.hasOwnProperty("msgid")) writer.uint32(
        /* id 6, wireType 0 =*/
        48).int64(message.msgid);
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) writer.uint32(
        /* id 7, wireType 0 =*/
        56).int64(message.timestamp);
        if (message.burnsecond != null && message.hasOwnProperty("burnsecond")) writer.uint32(
        /* id 8, wireType 0 =*/
        64).int32(message.burnsecond);
        if (message.burn != null && message.hasOwnProperty("burn")) writer.uint32(
        /* id 9, wireType 0 =*/
        72).bool(message.burn);
        if (message.chattype != null && message.hasOwnProperty("chattype")) writer.uint32(
        /* id 10, wireType 0 =*/
        80).int32(message.chattype);
        if (message.bussinesstype != null && message.hasOwnProperty("bussinesstype")) writer.uint32(
        /* id 11, wireType 0 =*/
        88).int32(message.bussinesstype);
        if (message.status != null && message.hasOwnProperty("status")) writer.uint32(
        /* id 12, wireType 0 =*/
        96).int32(message.status);
        if (message.msgindex != null && message.hasOwnProperty("msgindex")) writer.uint32(
        /* id 13, wireType 0 =*/
        104).int64(message.msgindex);
        if (message.msgorder != null && message.hasOwnProperty("msgorder")) writer.uint32(
        /* id 14, wireType 0 =*/
        112).int64(message.msgorder);
        if (message.msguserorder != null && message.hasOwnProperty("msguserorder")) writer.uint32(
        /* id 15, wireType 0 =*/
        120).int64(message.msguserorder);
        if (message.text1 != null && message.hasOwnProperty("text1")) writer.uint32(
        /* id 16, wireType 2 =*/
        130).string(message.text1);
        if (message.text2 != null && message.hasOwnProperty("text2")) writer.uint32(
        /* id 17, wireType 2 =*/
        138).string(message.text2);
        if (message.text3 != null && message.hasOwnProperty("text3")) writer.uint32(
        /* id 18, wireType 2 =*/
        146).string(message.text3);
        if (message.uuid != null && message.hasOwnProperty("uuid")) writer.uint32(
        /* id 19, wireType 2 =*/
        154).string(message.uuid);
        if (message.crc != null && message.hasOwnProperty("crc")) writer.uint32(
        /* id 20, wireType 0 =*/
        160).int64(message.crc);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 21, wireType 0 =*/
        168).int64(message.number);
        return writer;
      };
      /**
       * Encodes the specified ItalkChatEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkChatEchoMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {italk.pb.IItalkChatEchoMsg} message ItalkChatEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkChatEchoMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkChatEchoMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkChatEchoMsg} ItalkChatEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkChatEchoMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkChatEchoMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.echoInfo = $root.italk.pb.ItalkEchoInfo.decode(reader, reader.uint32());
              break;

            case 3:
              message.userid = reader.string();
              break;

            case 4:
              message.localid = reader.int64();
              break;

            case 5:
              message.fid = reader.string();
              break;

            case 6:
              message.msgid = reader.int64();
              break;

            case 7:
              message.timestamp = reader.int64();
              break;

            case 8:
              message.burnsecond = reader.int32();
              break;

            case 9:
              message.burn = reader.bool();
              break;

            case 10:
              message.chattype = reader.int32();
              break;

            case 11:
              message.bussinesstype = reader.int32();
              break;

            case 12:
              message.status = reader.int32();
              break;

            case 13:
              message.msgindex = reader.int64();
              break;

            case 14:
              message.msgorder = reader.int64();
              break;

            case 15:
              message.msguserorder = reader.int64();
              break;

            case 16:
              message.text1 = reader.string();
              break;

            case 17:
              message.text2 = reader.string();
              break;

            case 18:
              message.text3 = reader.string();
              break;

            case 19:
              message.uuid = reader.string();
              break;

            case 20:
              message.crc = reader.int64();
              break;

            case 21:
              message.number = reader.int64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkChatEchoMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkChatEchoMsg} ItalkChatEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkChatEchoMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkChatEchoMsg message.
       * @function verify
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkChatEchoMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }

        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) {
          var error = $root.italk.pb.ItalkEchoInfo.verify(message.echoInfo);
          if (error) return "echoInfo." + error;
        }

        if (message.userid != null && message.hasOwnProperty("userid")) if (!$util.isString(message.userid)) return "userid: string expected";
        if (message.localid != null && message.hasOwnProperty("localid")) if (!$util.isInteger(message.localid) && !(message.localid && $util.isInteger(message.localid.low) && $util.isInteger(message.localid.high))) return "localid: integer|Long expected";
        if (message.fid != null && message.hasOwnProperty("fid")) if (!$util.isString(message.fid)) return "fid: string expected";
        if (message.msgid != null && message.hasOwnProperty("msgid")) if (!$util.isInteger(message.msgid) && !(message.msgid && $util.isInteger(message.msgid.low) && $util.isInteger(message.msgid.high))) return "msgid: integer|Long expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high))) return "timestamp: integer|Long expected";
        if (message.burnsecond != null && message.hasOwnProperty("burnsecond")) if (!$util.isInteger(message.burnsecond)) return "burnsecond: integer expected";
        if (message.burn != null && message.hasOwnProperty("burn")) if (typeof message.burn !== "boolean") return "burn: boolean expected";
        if (message.chattype != null && message.hasOwnProperty("chattype")) switch (message.chattype) {
          default:
            return "chattype: enum value expected";

          case 0:
          case 1:
            break;
        }
        if (message.bussinesstype != null && message.hasOwnProperty("bussinesstype")) switch (message.bussinesstype) {
          default:
            return "bussinesstype: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 58:
          case 59:
          case 60:
          case 61:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.status != null && message.hasOwnProperty("status")) switch (message.status) {
          default:
            return "status: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
            break;
        }
        if (message.msgindex != null && message.hasOwnProperty("msgindex")) if (!$util.isInteger(message.msgindex) && !(message.msgindex && $util.isInteger(message.msgindex.low) && $util.isInteger(message.msgindex.high))) return "msgindex: integer|Long expected";
        if (message.msgorder != null && message.hasOwnProperty("msgorder")) if (!$util.isInteger(message.msgorder) && !(message.msgorder && $util.isInteger(message.msgorder.low) && $util.isInteger(message.msgorder.high))) return "msgorder: integer|Long expected";
        if (message.msguserorder != null && message.hasOwnProperty("msguserorder")) if (!$util.isInteger(message.msguserorder) && !(message.msguserorder && $util.isInteger(message.msguserorder.low) && $util.isInteger(message.msguserorder.high))) return "msguserorder: integer|Long expected";
        if (message.text1 != null && message.hasOwnProperty("text1")) if (!$util.isString(message.text1)) return "text1: string expected";
        if (message.text2 != null && message.hasOwnProperty("text2")) if (!$util.isString(message.text2)) return "text2: string expected";
        if (message.text3 != null && message.hasOwnProperty("text3")) if (!$util.isString(message.text3)) return "text3: string expected";
        if (message.uuid != null && message.hasOwnProperty("uuid")) if (!$util.isString(message.uuid)) return "uuid: string expected";
        if (message.crc != null && message.hasOwnProperty("crc")) if (!$util.isInteger(message.crc) && !(message.crc && $util.isInteger(message.crc.low) && $util.isInteger(message.crc.high))) return "crc: integer|Long expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        return null;
      };
      /**
       * Creates an ItalkChatEchoMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkChatEchoMsg} ItalkChatEchoMsg
       */


      ItalkChatEchoMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkChatEchoMsg) return object;
        var message = new $root.italk.pb.ItalkChatEchoMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.echoInfo != null) {
          if (typeof object.echoInfo !== "object") throw TypeError(".italk.pb.ItalkChatEchoMsg.echoInfo: object expected");
          message.echoInfo = $root.italk.pb.ItalkEchoInfo.fromObject(object.echoInfo);
        }

        if (object.userid != null) message.userid = String(object.userid);
        if (object.localid != null) if ($util.Long) (message.localid = $util.Long.fromValue(object.localid)).unsigned = false;else if (typeof object.localid === "string") message.localid = parseInt(object.localid, 10);else if (typeof object.localid === "number") message.localid = object.localid;else if (typeof object.localid === "object") message.localid = new $util.LongBits(object.localid.low >>> 0, object.localid.high >>> 0).toNumber();
        if (object.fid != null) message.fid = String(object.fid);
        if (object.msgid != null) if ($util.Long) (message.msgid = $util.Long.fromValue(object.msgid)).unsigned = false;else if (typeof object.msgid === "string") message.msgid = parseInt(object.msgid, 10);else if (typeof object.msgid === "number") message.msgid = object.msgid;else if (typeof object.msgid === "object") message.msgid = new $util.LongBits(object.msgid.low >>> 0, object.msgid.high >>> 0).toNumber();
        if (object.timestamp != null) if ($util.Long) (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;else if (typeof object.timestamp === "string") message.timestamp = parseInt(object.timestamp, 10);else if (typeof object.timestamp === "number") message.timestamp = object.timestamp;else if (typeof object.timestamp === "object") message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.burnsecond != null) message.burnsecond = object.burnsecond | 0;
        if (object.burn != null) message.burn = Boolean(object.burn);

        switch (object.chattype) {
          case "ITKSingleChat":
          case 0:
            message.chattype = 0;
            break;

          case "ITKGroupChat":
          case 1:
            message.chattype = 1;
            break;
        }

        switch (object.bussinesstype) {
          case "ITKSMS":
          case 0:
            message.bussinesstype = 0;
            break;

          case "ITKPic":
          case 1:
            message.bussinesstype = 1;
            break;

          case "ITKSound":
          case 2:
            message.bussinesstype = 2;
            break;

          case "ITKShortVideo":
          case 3:
            message.bussinesstype = 3;
            break;

          case "ITKFile":
          case 4:
            message.bussinesstype = 4;
            break;

          case "ITKLocation":
          case 5:
            message.bussinesstype = 5;
            break;

          case "ITKRedPacket":
          case 6:
            message.bussinesstype = 6;
            break;

          case "ITKVoiceCall":
          case 7:
            message.bussinesstype = 7;
            break;

          case "ITKVideoCall":
          case 8:
            message.bussinesstype = 8;
            break;

          case "ITKServerPush":
          case 9:
            message.bussinesstype = 9;
            break;

          case "ITKAddFriendRequest":
          case 10:
            message.bussinesstype = 10;
            break;

          case "ITKNeedFriendVerify":
          case 11:
            message.bussinesstype = 11;
            break;

          case "ITKAddFriendSucccess":
          case 12:
            message.bussinesstype = 12;
            break;

          case "ITKVerifyFriendAnswer":
          case 13:
            message.bussinesstype = 13;
            break;

          case "ITKVerifyFriendSuccess":
          case 14:
            message.bussinesstype = 14;
            break;

          case "ITKGroupCreate":
          case 15:
            message.bussinesstype = 15;
            break;

          case "ITKGroupMemberQuit":
          case 16:
            message.bussinesstype = 16;
            break;

          case "ITKGroupMemberAdd":
          case 17:
            message.bussinesstype = 17;
            break;

          case "ITKGroupOwnerTransfer":
          case 18:
            message.bussinesstype = 18;
            break;

          case "ITKInviteGroupMember":
          case 19:
            message.bussinesstype = 19;
            break;

          case "ITKVerifyInivitation":
          case 20:
            message.bussinesstype = 20;
            break;

          case "ITKDeleteGroupMember":
          case 21:
            message.bussinesstype = 21;
            break;

          case "ITKChatStatusChange":
          case 22:
            message.bussinesstype = 22;
            break;

          case "ITKSystemNotification":
          case 23:
            message.bussinesstype = 23;
            break;

          case "ITKRevokeMsg":
          case 24:
            message.bussinesstype = 24;
            break;

          case "ITkDestroyed":
          case 25:
            message.bussinesstype = 25;
            break;

          case "ITKReturnRedPacket":
          case 26:
            message.bussinesstype = 26;
            break;

          case "ITKRemoveMsgID":
          case 27:
            message.bussinesstype = 27;
            break;

          case "ITKOtherMachineLogin":
          case 28:
            message.bussinesstype = 28;
            break;

          case "ITKRequestLogin":
          case 29:
            message.bussinesstype = 29;
            break;

          case "ITKAuthLogin":
          case 30:
            message.bussinesstype = 30;
            break;

          case "ITKUserChange":
          case 31:
            message.bussinesstype = 31;
            break;

          case "ITKAppState":
          case 32:
            message.bussinesstype = 32;
            break;

          case "ITKBussniesstype1":
          case 41:
            message.bussinesstype = 41;
            break;

          case "ITKBussniesstype2":
          case 42:
            message.bussinesstype = 42;
            break;

          case "ITKBussniesstype3":
          case 43:
            message.bussinesstype = 43;
            break;

          case "ITKBussniesstype4":
          case 44:
            message.bussinesstype = 44;
            break;

          case "ITKBussniesstype5":
          case 45:
            message.bussinesstype = 45;
            break;

          case "ITKBussniesstype6":
          case 46:
            message.bussinesstype = 46;
            break;

          case "ITKBussniesstype7":
          case 47:
            message.bussinesstype = 47;
            break;

          case "ITKBussniesstype8":
          case 48:
            message.bussinesstype = 48;
            break;

          case "ITKBussniesstype9":
          case 49:
            message.bussinesstype = 49;
            break;

          case "ITKBussniesstype10":
          case 50:
            message.bussinesstype = 50;
            break;

          case "ITKBussniesstype11":
          case 51:
            message.bussinesstype = 51;
            break;

          case "ITKBussniesstype12":
          case 52:
            message.bussinesstype = 52;
            break;

          case "ITKBussniesstype13":
          case 53:
            message.bussinesstype = 53;
            break;

          case "ITKBussniesstype14":
          case 54:
            message.bussinesstype = 54;
            break;

          case "ITKBussniesstype15":
          case 55:
            message.bussinesstype = 55;
            break;

          case "ITKBussniesstype16":
          case 56:
            message.bussinesstype = 56;
            break;

          case "ITKBussniesstype17":
          case 57:
            message.bussinesstype = 57;
            break;

          case "ITKBussniesstype18":
          case 58:
            message.bussinesstype = 58;
            break;

          case "ITKBussniesstype19":
          case 59:
            message.bussinesstype = 59;
            break;

          case "ITKBussniesstype20":
          case 60:
            message.bussinesstype = 60;
            break;

          case "ITKBussniesstype21":
          case 61:
            message.bussinesstype = 61;
            break;

          case "ITKBussniesstype22":
          case 62:
            message.bussinesstype = 62;
            break;

          case "ITKBussniesstype23":
          case 63:
            message.bussinesstype = 63;
            break;

          case "ITKBussniesstype24":
          case 64:
            message.bussinesstype = 64;
            break;

          case "ITKBussniesstype25":
          case 65:
            message.bussinesstype = 65;
            break;

          case "ITKBussniesstype26":
          case 66:
            message.bussinesstype = 66;
            break;

          case "ITKBussniesstype27":
          case 67:
            message.bussinesstype = 67;
            break;

          case "ITKBussniesstype28":
          case 68:
            message.bussinesstype = 68;
            break;

          case "ITKBussniesstype29":
          case 69:
            message.bussinesstype = 69;
            break;

          case "ITKBussniesstype30":
          case 70:
            message.bussinesstype = 70;
            break;

          case "ITKBussniesstype31":
          case 71:
            message.bussinesstype = 71;
            break;

          case "ITKBussniesstype32":
          case 72:
            message.bussinesstype = 72;
            break;

          case "ITKBussniesstype33":
          case 73:
            message.bussinesstype = 73;
            break;

          case "ITKBussniesstype34":
          case 74:
            message.bussinesstype = 74;
            break;

          case "ITKBussniesstype35":
          case 75:
            message.bussinesstype = 75;
            break;

          case "ITKBussniesstype36":
          case 76:
            message.bussinesstype = 76;
            break;

          case "ITKBussniesstype37":
          case 77:
            message.bussinesstype = 77;
            break;

          case "ITKBussniesstype38":
          case 78:
            message.bussinesstype = 78;
            break;

          case "ITKBussniesstype39":
          case 79:
            message.bussinesstype = 79;
            break;

          case "ITKBussniesstype40":
          case 80:
            message.bussinesstype = 80;
            break;

          case "ITKBussniesstype41":
          case 81:
            message.bussinesstype = 81;
            break;

          case "ITKBussniesstype42":
          case 82:
            message.bussinesstype = 82;
            break;

          case "ITKRecodeMsg":
          case 83:
            message.bussinesstype = 83;
            break;
        }

        switch (object.status) {
          case "ITKUnsend":
          case 0:
            message.status = 0;
            break;

          case "ITKSending":
          case 1:
            message.status = 1;
            break;

          case "ITKSended":
          case 2:
            message.status = 2;
            break;

          case "ITKSendFailed":
          case 3:
            message.status = 3;
            break;

          case "ITKReceiverReceived":
          case 4:
            message.status = 4;
            break;

          case "ITKSenderReceived":
          case 5:
            message.status = 5;
            break;

          case "ITKReceiverReaded":
          case 6:
            message.status = 6;
            break;

          case "ITKSenderReaded":
          case 7:
            message.status = 7;
            break;

          case "ITKReceiverDestroyed":
          case 8:
            message.status = 8;
            break;

          case "ITKSenderDestroyed":
          case 9:
            message.status = 9;
            break;

          case "ITKReceiverTimeout":
          case 10:
            message.status = 10;
            break;

          case "ITKSenderTimeout":
          case 11:
            message.status = 11;
            break;

          case "ITKSenderRevoke":
          case 12:
            message.status = 12;
            break;

          case "ITKReceiverRevoke":
          case 13:
            message.status = 13;
            break;

          case "ITKMsgStatus1":
          case 21:
            message.status = 21;
            break;

          case "ITKMsgStatus2":
          case 22:
            message.status = 22;
            break;

          case "ITKMsgStatus3":
          case 23:
            message.status = 23;
            break;

          case "ITKMsgStatus4":
          case 24:
            message.status = 24;
            break;

          case "ITKMsgStatus5":
          case 25:
            message.status = 25;
            break;

          case "ITKMsgStatus6":
          case 26:
            message.status = 26;
            break;
        }

        if (object.msgindex != null) if ($util.Long) (message.msgindex = $util.Long.fromValue(object.msgindex)).unsigned = false;else if (typeof object.msgindex === "string") message.msgindex = parseInt(object.msgindex, 10);else if (typeof object.msgindex === "number") message.msgindex = object.msgindex;else if (typeof object.msgindex === "object") message.msgindex = new $util.LongBits(object.msgindex.low >>> 0, object.msgindex.high >>> 0).toNumber();
        if (object.msgorder != null) if ($util.Long) (message.msgorder = $util.Long.fromValue(object.msgorder)).unsigned = false;else if (typeof object.msgorder === "string") message.msgorder = parseInt(object.msgorder, 10);else if (typeof object.msgorder === "number") message.msgorder = object.msgorder;else if (typeof object.msgorder === "object") message.msgorder = new $util.LongBits(object.msgorder.low >>> 0, object.msgorder.high >>> 0).toNumber();
        if (object.msguserorder != null) if ($util.Long) (message.msguserorder = $util.Long.fromValue(object.msguserorder)).unsigned = false;else if (typeof object.msguserorder === "string") message.msguserorder = parseInt(object.msguserorder, 10);else if (typeof object.msguserorder === "number") message.msguserorder = object.msguserorder;else if (typeof object.msguserorder === "object") message.msguserorder = new $util.LongBits(object.msguserorder.low >>> 0, object.msguserorder.high >>> 0).toNumber();
        if (object.text1 != null) message.text1 = String(object.text1);
        if (object.text2 != null) message.text2 = String(object.text2);
        if (object.text3 != null) message.text3 = String(object.text3);
        if (object.uuid != null) message.uuid = String(object.uuid);
        if (object.crc != null) if ($util.Long) (message.crc = $util.Long.fromValue(object.crc)).unsigned = false;else if (typeof object.crc === "string") message.crc = parseInt(object.crc, 10);else if (typeof object.crc === "number") message.crc = object.crc;else if (typeof object.crc === "object") message.crc = new $util.LongBits(object.crc.low >>> 0, object.crc.high >>> 0).toNumber();
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = false;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();
        return message;
      };
      /**
       * Creates a plain object from an ItalkChatEchoMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkChatEchoMsg
       * @static
       * @param {italk.pb.ItalkChatEchoMsg} message ItalkChatEchoMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkChatEchoMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.echoInfo = null;
          object.userid = "";

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.localid = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.localid = options.longs === String ? "0" : 0;

          object.fid = "";

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.msgid = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.msgid = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.timestamp = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.timestamp = options.longs === String ? "0" : 0;

          object.burnsecond = 0;
          object.burn = false;
          object.chattype = options.enums === String ? "ITKSingleChat" : 0;
          object.bussinesstype = options.enums === String ? "ITKSMS" : 0;
          object.status = options.enums === String ? "ITKUnsend" : 0;

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.msgindex = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.msgindex = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.msgorder = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.msgorder = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.msguserorder = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.msguserorder = options.longs === String ? "0" : 0;

          object.text1 = "";
          object.text2 = "";
          object.text3 = "";
          object.uuid = "";

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.crc = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.crc = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long4 = new $util.Long(0, 0, false);

            object.number = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.number = options.longs === String ? "0" : 0;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) object.echoInfo = $root.italk.pb.ItalkEchoInfo.toObject(message.echoInfo, options);
        if (message.userid != null && message.hasOwnProperty("userid")) object.userid = message.userid;
        if (message.localid != null && message.hasOwnProperty("localid")) if (typeof message.localid === "number") object.localid = options.longs === String ? String(message.localid) : message.localid;else object.localid = options.longs === String ? $util.Long.prototype.toString.call(message.localid) : options.longs === Number ? new $util.LongBits(message.localid.low >>> 0, message.localid.high >>> 0).toNumber() : message.localid;
        if (message.fid != null && message.hasOwnProperty("fid")) object.fid = message.fid;
        if (message.msgid != null && message.hasOwnProperty("msgid")) if (typeof message.msgid === "number") object.msgid = options.longs === String ? String(message.msgid) : message.msgid;else object.msgid = options.longs === String ? $util.Long.prototype.toString.call(message.msgid) : options.longs === Number ? new $util.LongBits(message.msgid.low >>> 0, message.msgid.high >>> 0).toNumber() : message.msgid;
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) if (typeof message.timestamp === "number") object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;else object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.burnsecond != null && message.hasOwnProperty("burnsecond")) object.burnsecond = message.burnsecond;
        if (message.burn != null && message.hasOwnProperty("burn")) object.burn = message.burn;
        if (message.chattype != null && message.hasOwnProperty("chattype")) object.chattype = options.enums === String ? $root.italk.pb.ItalkChatTypeEnum[message.chattype] : message.chattype;
        if (message.bussinesstype != null && message.hasOwnProperty("bussinesstype")) object.bussinesstype = options.enums === String ? $root.italk.pb.ItalkBusinessTypeEnum[message.bussinesstype] : message.bussinesstype;
        if (message.status != null && message.hasOwnProperty("status")) object.status = options.enums === String ? $root.italk.pb.ItalkMsgStatusEnum[message.status] : message.status;
        if (message.msgindex != null && message.hasOwnProperty("msgindex")) if (typeof message.msgindex === "number") object.msgindex = options.longs === String ? String(message.msgindex) : message.msgindex;else object.msgindex = options.longs === String ? $util.Long.prototype.toString.call(message.msgindex) : options.longs === Number ? new $util.LongBits(message.msgindex.low >>> 0, message.msgindex.high >>> 0).toNumber() : message.msgindex;
        if (message.msgorder != null && message.hasOwnProperty("msgorder")) if (typeof message.msgorder === "number") object.msgorder = options.longs === String ? String(message.msgorder) : message.msgorder;else object.msgorder = options.longs === String ? $util.Long.prototype.toString.call(message.msgorder) : options.longs === Number ? new $util.LongBits(message.msgorder.low >>> 0, message.msgorder.high >>> 0).toNumber() : message.msgorder;
        if (message.msguserorder != null && message.hasOwnProperty("msguserorder")) if (typeof message.msguserorder === "number") object.msguserorder = options.longs === String ? String(message.msguserorder) : message.msguserorder;else object.msguserorder = options.longs === String ? $util.Long.prototype.toString.call(message.msguserorder) : options.longs === Number ? new $util.LongBits(message.msguserorder.low >>> 0, message.msguserorder.high >>> 0).toNumber() : message.msguserorder;
        if (message.text1 != null && message.hasOwnProperty("text1")) object.text1 = message.text1;
        if (message.text2 != null && message.hasOwnProperty("text2")) object.text2 = message.text2;
        if (message.text3 != null && message.hasOwnProperty("text3")) object.text3 = message.text3;
        if (message.uuid != null && message.hasOwnProperty("uuid")) object.uuid = message.uuid;
        if (message.crc != null && message.hasOwnProperty("crc")) if (typeof message.crc === "number") object.crc = options.longs === String ? String(message.crc) : message.crc;else object.crc = options.longs === String ? $util.Long.prototype.toString.call(message.crc) : options.longs === Number ? new $util.LongBits(message.crc.low >>> 0, message.crc.high >>> 0).toNumber() : message.crc;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
        return object;
      };
      /**
       * Converts this ItalkChatEchoMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkChatEchoMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkChatEchoMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkChatEchoMsg;
    }();

    pb.ItalkLoginMsg = function () {
      /**
       * Properties of an ItalkLoginMsg.
       * @memberof italk.pb
       * @interface IItalkLoginMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkLoginMsg msgType
       * @property {string|null} [userid] ItalkLoginMsg userid
       * @property {number|Long|null} [localid] ItalkLoginMsg localid
       * @property {string|null} [token] ItalkLoginMsg token
       * @property {string|null} [clientid] ItalkLoginMsg clientid
       * @property {number|Long|null} [number] ItalkLoginMsg number
       */

      /**
       * Constructs a new ItalkLoginMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkLoginMsg.
       * @implements IItalkLoginMsg
       * @constructor
       * @param {italk.pb.IItalkLoginMsg=} [properties] Properties to set
       */
      function ItalkLoginMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkLoginMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       */


      ItalkLoginMsg.prototype.msgType = 0;
      /**
       * ItalkLoginMsg userid.
       * @member {string} userid
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       */

      ItalkLoginMsg.prototype.userid = "";
      /**
       * ItalkLoginMsg localid.
       * @member {number|Long} localid
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       */

      ItalkLoginMsg.prototype.localid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkLoginMsg token.
       * @member {string} token
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       */

      ItalkLoginMsg.prototype.token = "";
      /**
       * ItalkLoginMsg clientid.
       * @member {string} clientid
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       */

      ItalkLoginMsg.prototype.clientid = "";
      /**
       * ItalkLoginMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       */

      ItalkLoginMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * Creates a new ItalkLoginMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {italk.pb.IItalkLoginMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkLoginMsg} ItalkLoginMsg instance
       */

      ItalkLoginMsg.create = function create(properties) {
        return new ItalkLoginMsg(properties);
      };
      /**
       * Encodes the specified ItalkLoginMsg message. Does not implicitly {@link italk.pb.ItalkLoginMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {italk.pb.IItalkLoginMsg} message ItalkLoginMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkLoginMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.userid != null && message.hasOwnProperty("userid")) writer.uint32(
        /* id 2, wireType 2 =*/
        18).string(message.userid);
        if (message.localid != null && message.hasOwnProperty("localid")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int64(message.localid);
        if (message.token != null && message.hasOwnProperty("token")) writer.uint32(
        /* id 4, wireType 2 =*/
        34).string(message.token);
        if (message.clientid != null && message.hasOwnProperty("clientid")) writer.uint32(
        /* id 5, wireType 2 =*/
        42).string(message.clientid);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 6, wireType 0 =*/
        48).int64(message.number);
        return writer;
      };
      /**
       * Encodes the specified ItalkLoginMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkLoginMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {italk.pb.IItalkLoginMsg} message ItalkLoginMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkLoginMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkLoginMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkLoginMsg} ItalkLoginMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkLoginMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkLoginMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.userid = reader.string();
              break;

            case 3:
              message.localid = reader.int64();
              break;

            case 4:
              message.token = reader.string();
              break;

            case 5:
              message.clientid = reader.string();
              break;

            case 6:
              message.number = reader.int64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkLoginMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkLoginMsg} ItalkLoginMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkLoginMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkLoginMsg message.
       * @function verify
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkLoginMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.userid != null && message.hasOwnProperty("userid")) if (!$util.isString(message.userid)) return "userid: string expected";
        if (message.localid != null && message.hasOwnProperty("localid")) if (!$util.isInteger(message.localid) && !(message.localid && $util.isInteger(message.localid.low) && $util.isInteger(message.localid.high))) return "localid: integer|Long expected";
        if (message.token != null && message.hasOwnProperty("token")) if (!$util.isString(message.token)) return "token: string expected";
        if (message.clientid != null && message.hasOwnProperty("clientid")) if (!$util.isString(message.clientid)) return "clientid: string expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        return null;
      };
      /**
       * Creates an ItalkLoginMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkLoginMsg} ItalkLoginMsg
       */


      ItalkLoginMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkLoginMsg) return object;
        var message = new $root.italk.pb.ItalkLoginMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.userid != null) message.userid = String(object.userid);
        if (object.localid != null) if ($util.Long) (message.localid = $util.Long.fromValue(object.localid)).unsigned = false;else if (typeof object.localid === "string") message.localid = parseInt(object.localid, 10);else if (typeof object.localid === "number") message.localid = object.localid;else if (typeof object.localid === "object") message.localid = new $util.LongBits(object.localid.low >>> 0, object.localid.high >>> 0).toNumber();
        if (object.token != null) message.token = String(object.token);
        if (object.clientid != null) message.clientid = String(object.clientid);
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = false;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();
        return message;
      };
      /**
       * Creates a plain object from an ItalkLoginMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkLoginMsg
       * @static
       * @param {italk.pb.ItalkLoginMsg} message ItalkLoginMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkLoginMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.userid = "";

          if ($util.Long) {
            var _long5 = new $util.Long(0, 0, false);

            object.localid = options.longs === String ? _long5.toString() : options.longs === Number ? _long5.toNumber() : _long5;
          } else object.localid = options.longs === String ? "0" : 0;

          object.token = "";
          object.clientid = "";

          if ($util.Long) {
            var _long5 = new $util.Long(0, 0, false);

            object.number = options.longs === String ? _long5.toString() : options.longs === Number ? _long5.toNumber() : _long5;
          } else object.number = options.longs === String ? "0" : 0;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.userid != null && message.hasOwnProperty("userid")) object.userid = message.userid;
        if (message.localid != null && message.hasOwnProperty("localid")) if (typeof message.localid === "number") object.localid = options.longs === String ? String(message.localid) : message.localid;else object.localid = options.longs === String ? $util.Long.prototype.toString.call(message.localid) : options.longs === Number ? new $util.LongBits(message.localid.low >>> 0, message.localid.high >>> 0).toNumber() : message.localid;
        if (message.token != null && message.hasOwnProperty("token")) object.token = message.token;
        if (message.clientid != null && message.hasOwnProperty("clientid")) object.clientid = message.clientid;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
        return object;
      };
      /**
       * Converts this ItalkLoginMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkLoginMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkLoginMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkLoginMsg;
    }();

    pb.ItalkLoginEchoMsg = function () {
      /**
       * Properties of an ItalkLoginEchoMsg.
       * @memberof italk.pb
       * @interface IItalkLoginEchoMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkLoginEchoMsg msgType
       * @property {italk.pb.IItalkEchoInfo|null} [echoInfo] ItalkLoginEchoMsg echoInfo
       * @property {number|Long|null} [localid] ItalkLoginEchoMsg localid
       * @property {string|null} [userid] ItalkLoginEchoMsg userid
       * @property {string|null} [token] ItalkLoginEchoMsg token
       * @property {number|Long|null} [userno] ItalkLoginEchoMsg userno
       * @property {number|Long|null} [number] ItalkLoginEchoMsg number
       */

      /**
       * Constructs a new ItalkLoginEchoMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkLoginEchoMsg.
       * @implements IItalkLoginEchoMsg
       * @constructor
       * @param {italk.pb.IItalkLoginEchoMsg=} [properties] Properties to set
       */
      function ItalkLoginEchoMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkLoginEchoMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */


      ItalkLoginEchoMsg.prototype.msgType = 0;
      /**
       * ItalkLoginEchoMsg echoInfo.
       * @member {italk.pb.IItalkEchoInfo|null|undefined} echoInfo
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */

      ItalkLoginEchoMsg.prototype.echoInfo = null;
      /**
       * ItalkLoginEchoMsg localid.
       * @member {number|Long} localid
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */

      ItalkLoginEchoMsg.prototype.localid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkLoginEchoMsg userid.
       * @member {string} userid
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */

      ItalkLoginEchoMsg.prototype.userid = "";
      /**
       * ItalkLoginEchoMsg token.
       * @member {string} token
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */

      ItalkLoginEchoMsg.prototype.token = "";
      /**
       * ItalkLoginEchoMsg userno.
       * @member {number|Long} userno
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */

      ItalkLoginEchoMsg.prototype.userno = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkLoginEchoMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       */

      ItalkLoginEchoMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * Creates a new ItalkLoginEchoMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {italk.pb.IItalkLoginEchoMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkLoginEchoMsg} ItalkLoginEchoMsg instance
       */

      ItalkLoginEchoMsg.create = function create(properties) {
        return new ItalkLoginEchoMsg(properties);
      };
      /**
       * Encodes the specified ItalkLoginEchoMsg message. Does not implicitly {@link italk.pb.ItalkLoginEchoMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {italk.pb.IItalkLoginEchoMsg} message ItalkLoginEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkLoginEchoMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) $root.italk.pb.ItalkEchoInfo.encode(message.echoInfo, writer.uint32(
        /* id 2, wireType 2 =*/
        18).fork()).ldelim();
        if (message.localid != null && message.hasOwnProperty("localid")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int64(message.localid);
        if (message.userid != null && message.hasOwnProperty("userid")) writer.uint32(
        /* id 4, wireType 2 =*/
        34).string(message.userid);
        if (message.token != null && message.hasOwnProperty("token")) writer.uint32(
        /* id 5, wireType 2 =*/
        42).string(message.token);
        if (message.userno != null && message.hasOwnProperty("userno")) writer.uint32(
        /* id 6, wireType 0 =*/
        48).int64(message.userno);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 7, wireType 0 =*/
        56).int64(message.number);
        return writer;
      };
      /**
       * Encodes the specified ItalkLoginEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkLoginEchoMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {italk.pb.IItalkLoginEchoMsg} message ItalkLoginEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkLoginEchoMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkLoginEchoMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkLoginEchoMsg} ItalkLoginEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkLoginEchoMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkLoginEchoMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.echoInfo = $root.italk.pb.ItalkEchoInfo.decode(reader, reader.uint32());
              break;

            case 3:
              message.localid = reader.int64();
              break;

            case 4:
              message.userid = reader.string();
              break;

            case 5:
              message.token = reader.string();
              break;

            case 6:
              message.userno = reader.int64();
              break;

            case 7:
              message.number = reader.int64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkLoginEchoMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkLoginEchoMsg} ItalkLoginEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkLoginEchoMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkLoginEchoMsg message.
       * @function verify
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkLoginEchoMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }

        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) {
          var error = $root.italk.pb.ItalkEchoInfo.verify(message.echoInfo);
          if (error) return "echoInfo." + error;
        }

        if (message.localid != null && message.hasOwnProperty("localid")) if (!$util.isInteger(message.localid) && !(message.localid && $util.isInteger(message.localid.low) && $util.isInteger(message.localid.high))) return "localid: integer|Long expected";
        if (message.userid != null && message.hasOwnProperty("userid")) if (!$util.isString(message.userid)) return "userid: string expected";
        if (message.token != null && message.hasOwnProperty("token")) if (!$util.isString(message.token)) return "token: string expected";
        if (message.userno != null && message.hasOwnProperty("userno")) if (!$util.isInteger(message.userno) && !(message.userno && $util.isInteger(message.userno.low) && $util.isInteger(message.userno.high))) return "userno: integer|Long expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        return null;
      };
      /**
       * Creates an ItalkLoginEchoMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkLoginEchoMsg} ItalkLoginEchoMsg
       */


      ItalkLoginEchoMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkLoginEchoMsg) return object;
        var message = new $root.italk.pb.ItalkLoginEchoMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.echoInfo != null) {
          if (typeof object.echoInfo !== "object") throw TypeError(".italk.pb.ItalkLoginEchoMsg.echoInfo: object expected");
          message.echoInfo = $root.italk.pb.ItalkEchoInfo.fromObject(object.echoInfo);
        }

        if (object.localid != null) if ($util.Long) (message.localid = $util.Long.fromValue(object.localid)).unsigned = false;else if (typeof object.localid === "string") message.localid = parseInt(object.localid, 10);else if (typeof object.localid === "number") message.localid = object.localid;else if (typeof object.localid === "object") message.localid = new $util.LongBits(object.localid.low >>> 0, object.localid.high >>> 0).toNumber();
        if (object.userid != null) message.userid = String(object.userid);
        if (object.token != null) message.token = String(object.token);
        if (object.userno != null) if ($util.Long) (message.userno = $util.Long.fromValue(object.userno)).unsigned = false;else if (typeof object.userno === "string") message.userno = parseInt(object.userno, 10);else if (typeof object.userno === "number") message.userno = object.userno;else if (typeof object.userno === "object") message.userno = new $util.LongBits(object.userno.low >>> 0, object.userno.high >>> 0).toNumber();
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = false;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();
        return message;
      };
      /**
       * Creates a plain object from an ItalkLoginEchoMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @static
       * @param {italk.pb.ItalkLoginEchoMsg} message ItalkLoginEchoMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkLoginEchoMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.echoInfo = null;

          if ($util.Long) {
            var _long6 = new $util.Long(0, 0, false);

            object.localid = options.longs === String ? _long6.toString() : options.longs === Number ? _long6.toNumber() : _long6;
          } else object.localid = options.longs === String ? "0" : 0;

          object.userid = "";
          object.token = "";

          if ($util.Long) {
            var _long6 = new $util.Long(0, 0, false);

            object.userno = options.longs === String ? _long6.toString() : options.longs === Number ? _long6.toNumber() : _long6;
          } else object.userno = options.longs === String ? "0" : 0;

          if ($util.Long) {
            var _long6 = new $util.Long(0, 0, false);

            object.number = options.longs === String ? _long6.toString() : options.longs === Number ? _long6.toNumber() : _long6;
          } else object.number = options.longs === String ? "0" : 0;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) object.echoInfo = $root.italk.pb.ItalkEchoInfo.toObject(message.echoInfo, options);
        if (message.localid != null && message.hasOwnProperty("localid")) if (typeof message.localid === "number") object.localid = options.longs === String ? String(message.localid) : message.localid;else object.localid = options.longs === String ? $util.Long.prototype.toString.call(message.localid) : options.longs === Number ? new $util.LongBits(message.localid.low >>> 0, message.localid.high >>> 0).toNumber() : message.localid;
        if (message.userid != null && message.hasOwnProperty("userid")) object.userid = message.userid;
        if (message.token != null && message.hasOwnProperty("token")) object.token = message.token;
        if (message.userno != null && message.hasOwnProperty("userno")) if (typeof message.userno === "number") object.userno = options.longs === String ? String(message.userno) : message.userno;else object.userno = options.longs === String ? $util.Long.prototype.toString.call(message.userno) : options.longs === Number ? new $util.LongBits(message.userno.low >>> 0, message.userno.high >>> 0).toNumber() : message.userno;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
        return object;
      };
      /**
       * Converts this ItalkLoginEchoMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkLoginEchoMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkLoginEchoMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkLoginEchoMsg;
    }();

    pb.ItalkCommonMsg = function () {
      /**
       * Properties of an ItalkCommonMsg.
       * @memberof italk.pb
       * @interface IItalkCommonMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkCommonMsg msgType
       * @property {string|null} [userid] ItalkCommonMsg userid
       * @property {number|Long|null} [localid] ItalkCommonMsg localid
       * @property {string|null} [text] ItalkCommonMsg text
       * @property {number|Long|null} [number] ItalkCommonMsg number
       */

      /**
       * Constructs a new ItalkCommonMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkCommonMsg.
       * @implements IItalkCommonMsg
       * @constructor
       * @param {italk.pb.IItalkCommonMsg=} [properties] Properties to set
       */
      function ItalkCommonMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkCommonMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkCommonMsg
       * @instance
       */


      ItalkCommonMsg.prototype.msgType = 0;
      /**
       * ItalkCommonMsg userid.
       * @member {string} userid
       * @memberof italk.pb.ItalkCommonMsg
       * @instance
       */

      ItalkCommonMsg.prototype.userid = "";
      /**
       * ItalkCommonMsg localid.
       * @member {number|Long} localid
       * @memberof italk.pb.ItalkCommonMsg
       * @instance
       */

      ItalkCommonMsg.prototype.localid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkCommonMsg text.
       * @member {string} text
       * @memberof italk.pb.ItalkCommonMsg
       * @instance
       */

      ItalkCommonMsg.prototype.text = "";
      /**
       * ItalkCommonMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkCommonMsg
       * @instance
       */

      ItalkCommonMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * Creates a new ItalkCommonMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {italk.pb.IItalkCommonMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkCommonMsg} ItalkCommonMsg instance
       */

      ItalkCommonMsg.create = function create(properties) {
        return new ItalkCommonMsg(properties);
      };
      /**
       * Encodes the specified ItalkCommonMsg message. Does not implicitly {@link italk.pb.ItalkCommonMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {italk.pb.IItalkCommonMsg} message ItalkCommonMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkCommonMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.userid != null && message.hasOwnProperty("userid")) writer.uint32(
        /* id 2, wireType 2 =*/
        18).string(message.userid);
        if (message.localid != null && message.hasOwnProperty("localid")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int64(message.localid);
        if (message.text != null && message.hasOwnProperty("text")) writer.uint32(
        /* id 4, wireType 2 =*/
        34).string(message.text);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 5, wireType 0 =*/
        40).int64(message.number);
        return writer;
      };
      /**
       * Encodes the specified ItalkCommonMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkCommonMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {italk.pb.IItalkCommonMsg} message ItalkCommonMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkCommonMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkCommonMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkCommonMsg} ItalkCommonMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkCommonMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkCommonMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.userid = reader.string();
              break;

            case 3:
              message.localid = reader.int64();
              break;

            case 4:
              message.text = reader.string();
              break;

            case 5:
              message.number = reader.int64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkCommonMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkCommonMsg} ItalkCommonMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkCommonMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkCommonMsg message.
       * @function verify
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkCommonMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }
        if (message.userid != null && message.hasOwnProperty("userid")) if (!$util.isString(message.userid)) return "userid: string expected";
        if (message.localid != null && message.hasOwnProperty("localid")) if (!$util.isInteger(message.localid) && !(message.localid && $util.isInteger(message.localid.low) && $util.isInteger(message.localid.high))) return "localid: integer|Long expected";
        if (message.text != null && message.hasOwnProperty("text")) if (!$util.isString(message.text)) return "text: string expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        return null;
      };
      /**
       * Creates an ItalkCommonMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkCommonMsg} ItalkCommonMsg
       */


      ItalkCommonMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkCommonMsg) return object;
        var message = new $root.italk.pb.ItalkCommonMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.userid != null) message.userid = String(object.userid);
        if (object.localid != null) if ($util.Long) (message.localid = $util.Long.fromValue(object.localid)).unsigned = false;else if (typeof object.localid === "string") message.localid = parseInt(object.localid, 10);else if (typeof object.localid === "number") message.localid = object.localid;else if (typeof object.localid === "object") message.localid = new $util.LongBits(object.localid.low >>> 0, object.localid.high >>> 0).toNumber();
        if (object.text != null) message.text = String(object.text);
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = false;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();
        return message;
      };
      /**
       * Creates a plain object from an ItalkCommonMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkCommonMsg
       * @static
       * @param {italk.pb.ItalkCommonMsg} message ItalkCommonMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkCommonMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.userid = "";

          if ($util.Long) {
            var _long7 = new $util.Long(0, 0, false);

            object.localid = options.longs === String ? _long7.toString() : options.longs === Number ? _long7.toNumber() : _long7;
          } else object.localid = options.longs === String ? "0" : 0;

          object.text = "";

          if ($util.Long) {
            var _long7 = new $util.Long(0, 0, false);

            object.number = options.longs === String ? _long7.toString() : options.longs === Number ? _long7.toNumber() : _long7;
          } else object.number = options.longs === String ? "0" : 0;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.userid != null && message.hasOwnProperty("userid")) object.userid = message.userid;
        if (message.localid != null && message.hasOwnProperty("localid")) if (typeof message.localid === "number") object.localid = options.longs === String ? String(message.localid) : message.localid;else object.localid = options.longs === String ? $util.Long.prototype.toString.call(message.localid) : options.longs === Number ? new $util.LongBits(message.localid.low >>> 0, message.localid.high >>> 0).toNumber() : message.localid;
        if (message.text != null && message.hasOwnProperty("text")) object.text = message.text;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
        return object;
      };
      /**
       * Converts this ItalkCommonMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkCommonMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkCommonMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkCommonMsg;
    }();

    pb.ItalkCommonEchoMsg = function () {
      /**
       * Properties of an ItalkCommonEchoMsg.
       * @memberof italk.pb
       * @interface IItalkCommonEchoMsg
       * @property {italk.pb.ItalkTypeEnum|null} [msgType] ItalkCommonEchoMsg msgType
       * @property {italk.pb.IItalkEchoInfo|null} [echoInfo] ItalkCommonEchoMsg echoInfo
       * @property {number|Long|null} [localid] ItalkCommonEchoMsg localid
       * @property {string|null} [text] ItalkCommonEchoMsg text
       * @property {number|Long|null} [number] ItalkCommonEchoMsg number
       */

      /**
       * Constructs a new ItalkCommonEchoMsg.
       * @memberof italk.pb
       * @classdesc Represents an ItalkCommonEchoMsg.
       * @implements IItalkCommonEchoMsg
       * @constructor
       * @param {italk.pb.IItalkCommonEchoMsg=} [properties] Properties to set
       */
      function ItalkCommonEchoMsg(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * ItalkCommonEchoMsg msgType.
       * @member {italk.pb.ItalkTypeEnum} msgType
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @instance
       */


      ItalkCommonEchoMsg.prototype.msgType = 0;
      /**
       * ItalkCommonEchoMsg echoInfo.
       * @member {italk.pb.IItalkEchoInfo|null|undefined} echoInfo
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @instance
       */

      ItalkCommonEchoMsg.prototype.echoInfo = null;
      /**
       * ItalkCommonEchoMsg localid.
       * @member {number|Long} localid
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @instance
       */

      ItalkCommonEchoMsg.prototype.localid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * ItalkCommonEchoMsg text.
       * @member {string} text
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @instance
       */

      ItalkCommonEchoMsg.prototype.text = "";
      /**
       * ItalkCommonEchoMsg number.
       * @member {number|Long} number
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @instance
       */

      ItalkCommonEchoMsg.prototype.number = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      /**
       * Creates a new ItalkCommonEchoMsg instance using the specified properties.
       * @function create
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {italk.pb.IItalkCommonEchoMsg=} [properties] Properties to set
       * @returns {italk.pb.ItalkCommonEchoMsg} ItalkCommonEchoMsg instance
       */

      ItalkCommonEchoMsg.create = function create(properties) {
        return new ItalkCommonEchoMsg(properties);
      };
      /**
       * Encodes the specified ItalkCommonEchoMsg message. Does not implicitly {@link italk.pb.ItalkCommonEchoMsg.verify|verify} messages.
       * @function encode
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {italk.pb.IItalkCommonEchoMsg} message ItalkCommonEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkCommonEchoMsg.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.msgType != null && message.hasOwnProperty("msgType")) writer.uint32(
        /* id 1, wireType 0 =*/
        8).int32(message.msgType);
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) $root.italk.pb.ItalkEchoInfo.encode(message.echoInfo, writer.uint32(
        /* id 2, wireType 2 =*/
        18).fork()).ldelim();
        if (message.localid != null && message.hasOwnProperty("localid")) writer.uint32(
        /* id 3, wireType 0 =*/
        24).int64(message.localid);
        if (message.text != null && message.hasOwnProperty("text")) writer.uint32(
        /* id 4, wireType 2 =*/
        34).string(message.text);
        if (message.number != null && message.hasOwnProperty("number")) writer.uint32(
        /* id 5, wireType 0 =*/
        40).int64(message.number);
        return writer;
      };
      /**
       * Encodes the specified ItalkCommonEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkCommonEchoMsg.verify|verify} messages.
       * @function encodeDelimited
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {italk.pb.IItalkCommonEchoMsg} message ItalkCommonEchoMsg message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */


      ItalkCommonEchoMsg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      /**
       * Decodes an ItalkCommonEchoMsg message from the specified reader or buffer.
       * @function decode
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {italk.pb.ItalkCommonEchoMsg} ItalkCommonEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkCommonEchoMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.italk.pb.ItalkCommonEchoMsg();

        while (reader.pos < end) {
          var tag = reader.uint32();

          switch (tag >>> 3) {
            case 1:
              message.msgType = reader.int32();
              break;

            case 2:
              message.echoInfo = $root.italk.pb.ItalkEchoInfo.decode(reader, reader.uint32());
              break;

            case 3:
              message.localid = reader.int64();
              break;

            case 4:
              message.text = reader.string();
              break;

            case 5:
              message.number = reader.int64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      };
      /**
       * Decodes an ItalkCommonEchoMsg message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {italk.pb.ItalkCommonEchoMsg} ItalkCommonEchoMsg
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */


      ItalkCommonEchoMsg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies an ItalkCommonEchoMsg message.
       * @function verify
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      ItalkCommonEchoMsg.verify = function verify(message) {
        if (typeof message !== "object" || message === null) return "object expected";
        if (message.msgType != null && message.hasOwnProperty("msgType")) switch (message.msgType) {
          default:
            return "msgType: enum value expected";

          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 20:
          case 21:
          case 22:
          case 23:
          case 40:
          case 41:
          case 42:
          case 43:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 81:
          case 82:
          case 83:
            break;
        }

        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) {
          var error = $root.italk.pb.ItalkEchoInfo.verify(message.echoInfo);
          if (error) return "echoInfo." + error;
        }

        if (message.localid != null && message.hasOwnProperty("localid")) if (!$util.isInteger(message.localid) && !(message.localid && $util.isInteger(message.localid.low) && $util.isInteger(message.localid.high))) return "localid: integer|Long expected";
        if (message.text != null && message.hasOwnProperty("text")) if (!$util.isString(message.text)) return "text: string expected";
        if (message.number != null && message.hasOwnProperty("number")) if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high))) return "number: integer|Long expected";
        return null;
      };
      /**
       * Creates an ItalkCommonEchoMsg message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {italk.pb.ItalkCommonEchoMsg} ItalkCommonEchoMsg
       */


      ItalkCommonEchoMsg.fromObject = function fromObject(object) {
        if (object instanceof $root.italk.pb.ItalkCommonEchoMsg) return object;
        var message = new $root.italk.pb.ItalkCommonEchoMsg();

        switch (object.msgType) {
          case "ITKCECHO":
          case 0:
            message.msgType = 0;
            break;

          case "ITKSECHO":
          case 1:
            message.msgType = 1;
            break;

          case "ITKHEART":
          case 2:
            message.msgType = 2;
            break;

          case "ITKRegister":
          case 3:
            message.msgType = 3;
            break;

          case "ITKSubscribe":
          case 4:
            message.msgType = 4;
            break;

          case "ITKPublish":
          case 5:
            message.msgType = 5;
            break;

          case "ITKPull":
          case 6:
            message.msgType = 6;
            break;

          case "ITKAbnormalFeedback":
          case 7:
            message.msgType = 7;
            break;

          case "ITKBusinessStatistics":
          case 8:
            message.msgType = 8;
            break;

          case "ITKFeedbackServer":
          case 9:
            message.msgType = 9;
            break;

          case "ITKServerSet":
          case 10:
            message.msgType = 10;
            break;

          case "ITKServerSetPack":
          case 11:
            message.msgType = 11;
            break;

          case "ITKLoginNEW":
          case 20:
            message.msgType = 20;
            break;

          case "ITKLogin":
          case 21:
            message.msgType = 21;
            break;

          case "ITKChat":
          case 22:
            message.msgType = 22;
            break;

          case "ITKCommon":
          case 23:
            message.msgType = 23;
            break;

          case "ITKServerChat":
          case 40:
            message.msgType = 40;
            break;

          case "ITKServerChatEcho":
          case 41:
            message.msgType = 41;
            break;

          case "ITKServerCommon":
          case 42:
            message.msgType = 42;
            break;

          case "ITKServerCommonEcho":
          case 43:
            message.msgType = 43;
            break;

          case "ITKHeartECHO":
          case 62:
            message.msgType = 62;
            break;

          case "ITKRegisterECHO":
          case 63:
            message.msgType = 63;
            break;

          case "ITKSubscribeECHO":
          case 64:
            message.msgType = 64;
            break;

          case "ITKPublishECHO":
          case 65:
            message.msgType = 65;
            break;

          case "ITKPullECHO":
          case 66:
            message.msgType = 66;
            break;

          case "ITKAbnormalFeedbackECHO":
          case 67:
            message.msgType = 67;
            break;

          case "ITKBusinessStatisticsECHO":
          case 68:
            message.msgType = 68;
            break;

          case "ITKFeedbackServerECHO":
          case 69:
            message.msgType = 69;
            break;

          case "ITKServerSetECHO":
          case 70:
            message.msgType = 70;
            break;

          case "ITKServerSetPackECHO":
          case 71:
            message.msgType = 71;
            break;

          case "ITKLoginECHO":
          case 81:
            message.msgType = 81;
            break;

          case "ITKChatECHO":
          case 82:
            message.msgType = 82;
            break;

          case "ITKCommonECHO":
          case 83:
            message.msgType = 83;
            break;
        }

        if (object.echoInfo != null) {
          if (typeof object.echoInfo !== "object") throw TypeError(".italk.pb.ItalkCommonEchoMsg.echoInfo: object expected");
          message.echoInfo = $root.italk.pb.ItalkEchoInfo.fromObject(object.echoInfo);
        }

        if (object.localid != null) if ($util.Long) (message.localid = $util.Long.fromValue(object.localid)).unsigned = false;else if (typeof object.localid === "string") message.localid = parseInt(object.localid, 10);else if (typeof object.localid === "number") message.localid = object.localid;else if (typeof object.localid === "object") message.localid = new $util.LongBits(object.localid.low >>> 0, object.localid.high >>> 0).toNumber();
        if (object.text != null) message.text = String(object.text);
        if (object.number != null) if ($util.Long) (message.number = $util.Long.fromValue(object.number)).unsigned = false;else if (typeof object.number === "string") message.number = parseInt(object.number, 10);else if (typeof object.number === "number") message.number = object.number;else if (typeof object.number === "object") message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();
        return message;
      };
      /**
       * Creates a plain object from an ItalkCommonEchoMsg message. Also converts values to other types if specified.
       * @function toObject
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @static
       * @param {italk.pb.ItalkCommonEchoMsg} message ItalkCommonEchoMsg
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      ItalkCommonEchoMsg.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};

        if (options.defaults) {
          object.msgType = options.enums === String ? "ITKCECHO" : 0;
          object.echoInfo = null;

          if ($util.Long) {
            var _long8 = new $util.Long(0, 0, false);

            object.localid = options.longs === String ? _long8.toString() : options.longs === Number ? _long8.toNumber() : _long8;
          } else object.localid = options.longs === String ? "0" : 0;

          object.text = "";

          if ($util.Long) {
            var _long8 = new $util.Long(0, 0, false);

            object.number = options.longs === String ? _long8.toString() : options.longs === Number ? _long8.toNumber() : _long8;
          } else object.number = options.longs === String ? "0" : 0;
        }

        if (message.msgType != null && message.hasOwnProperty("msgType")) object.msgType = options.enums === String ? $root.italk.pb.ItalkTypeEnum[message.msgType] : message.msgType;
        if (message.echoInfo != null && message.hasOwnProperty("echoInfo")) object.echoInfo = $root.italk.pb.ItalkEchoInfo.toObject(message.echoInfo, options);
        if (message.localid != null && message.hasOwnProperty("localid")) if (typeof message.localid === "number") object.localid = options.longs === String ? String(message.localid) : message.localid;else object.localid = options.longs === String ? $util.Long.prototype.toString.call(message.localid) : options.longs === Number ? new $util.LongBits(message.localid.low >>> 0, message.localid.high >>> 0).toNumber() : message.localid;
        if (message.text != null && message.hasOwnProperty("text")) object.text = message.text;
        if (message.number != null && message.hasOwnProperty("number")) if (typeof message.number === "number") object.number = options.longs === String ? String(message.number) : message.number;else object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
        return object;
      };
      /**
       * Converts this ItalkCommonEchoMsg to JSON.
       * @function toJSON
       * @memberof italk.pb.ItalkCommonEchoMsg
       * @instance
       * @returns {Object.<string,*>} JSON object
       */


      ItalkCommonEchoMsg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      return ItalkCommonEchoMsg;
    }();

    return pb;
  }();

  return italk;
}();

module.exports = $root;

cc._RF.pop();