import * as $protobuf from protobuf
/** Namespace italk. */
export namespace italk {

    /** Namespace pb. */
    namespace pb {

        /** ItalkTypeEnum enum. */
        enum ItalkTypeEnum {
            ITKCECHO = 0,
            ITKSECHO = 1,
            ITKHEART = 2,
            ITKRegister = 3,
            ITKSubscribe = 4,
            ITKPublish = 5,
            ITKPull = 6,
            ITKAbnormalFeedback = 7,
            ITKBusinessStatistics = 8,
            ITKFeedbackServer = 9,
            ITKServerSet = 10,
            ITKServerSetPack = 11,
            ITKLoginNEW = 20,
            ITKLogin = 21,
            ITKChat = 22,
            ITKCommon = 23,
            ITKServerChat = 40,
            ITKServerChatEcho = 41,
            ITKServerCommon = 42,
            ITKServerCommonEcho = 43,
            ITKHeartECHO = 62,
            ITKRegisterECHO = 63,
            ITKSubscribeECHO = 64,
            ITKPublishECHO = 65,
            ITKPullECHO = 66,
            ITKAbnormalFeedbackECHO = 67,
            ITKBusinessStatisticsECHO = 68,
            ITKFeedbackServerECHO = 69,
            ITKServerSetECHO = 70,
            ITKServerSetPackECHO = 71,
            ITKLoginECHO = 81,
            ITKChatECHO = 82,
            ITKCommonECHO = 83
        }

        /** ItalkErrorEnum enum. */
        enum ItalkErrorEnum {
            ITKOK = 0,
            ITKERROR = 1,
            ITKXXX = 2
        }

        /** Properties of an ItalkEchoInfo. */
        interface IItalkEchoInfo {

            /** ItalkEchoInfo type */
            type?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkEchoInfo error */
            error?: (italk.pb.ItalkErrorEnum|null);

            /** ItalkEchoInfo Info */
            Info?: (string|null);
        }

        /** Represents an ItalkEchoInfo. */
        class ItalkEchoInfo implements IItalkEchoInfo {

            /**
             * Constructs a new ItalkEchoInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkEchoInfo);

            /** ItalkEchoInfo type. */
            public type: italk.pb.ItalkTypeEnum;

            /** ItalkEchoInfo error. */
            public error: italk.pb.ItalkErrorEnum;

            /** ItalkEchoInfo Info. */
            public Info: string;

            /**
             * Creates a new ItalkEchoInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkEchoInfo instance
             */
            public static create(properties?: italk.pb.IItalkEchoInfo): italk.pb.ItalkEchoInfo;

            /**
             * Encodes the specified ItalkEchoInfo message. Does not implicitly {@link italk.pb.ItalkEchoInfo.verify|verify} messages.
             * @param message ItalkEchoInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkEchoInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkEchoInfo message, length delimited. Does not implicitly {@link italk.pb.ItalkEchoInfo.verify|verify} messages.
             * @param message ItalkEchoInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkEchoInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkEchoInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkEchoInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkEchoInfo;

            /**
             * Decodes an ItalkEchoInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkEchoInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkEchoInfo;

            /**
             * Verifies an ItalkEchoInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkEchoInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkEchoInfo
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkEchoInfo;

            /**
             * Creates a plain object from an ItalkEchoInfo message. Also converts values to other types if specified.
             * @param message ItalkEchoInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkEchoInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkEchoInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkHeartMsg. */
        interface IItalkHeartMsg {

            /** ItalkHeartMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkHeartMsg heartCount */
            heartCount?: (number|Long|null);

            /** ItalkHeartMsg number */
            number?: (number|Long|null);

            /** ItalkHeartMsg token */
            token?: (string|null);

            /** ItalkHeartMsg serverInfo */
            serverInfo?: (string|null);

            /** ItalkHeartMsg userid */
            userid?: (string|null);
        }

        /** Represents an ItalkHeartMsg. */
        class ItalkHeartMsg implements IItalkHeartMsg {

            /**
             * Constructs a new ItalkHeartMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkHeartMsg);

            /** ItalkHeartMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkHeartMsg heartCount. */
            public heartCount: (number|Long);

            /** ItalkHeartMsg number. */
            public number: (number|Long);

            /** ItalkHeartMsg token. */
            public token: string;

            /** ItalkHeartMsg serverInfo. */
            public serverInfo: string;

            /** ItalkHeartMsg userid. */
            public userid: string;

            /**
             * Creates a new ItalkHeartMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkHeartMsg instance
             */
            public static create(properties?: italk.pb.IItalkHeartMsg): italk.pb.ItalkHeartMsg;

            /**
             * Encodes the specified ItalkHeartMsg message. Does not implicitly {@link italk.pb.ItalkHeartMsg.verify|verify} messages.
             * @param message ItalkHeartMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkHeartMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkHeartMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkHeartMsg.verify|verify} messages.
             * @param message ItalkHeartMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkHeartMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkHeartMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkHeartMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkHeartMsg;

            /**
             * Decodes an ItalkHeartMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkHeartMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkHeartMsg;

            /**
             * Verifies an ItalkHeartMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkHeartMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkHeartMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkHeartMsg;

            /**
             * Creates a plain object from an ItalkHeartMsg message. Also converts values to other types if specified.
             * @param message ItalkHeartMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkHeartMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkHeartMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkHeartEchoMsg. */
        interface IItalkHeartEchoMsg {

            /** ItalkHeartEchoMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkHeartEchoMsg echoInfo */
            echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkHeartEchoMsg heartCount */
            heartCount?: (number|Long|null);

            /** ItalkHeartEchoMsg number */
            number?: (number|Long|null);
        }

        /** Represents an ItalkHeartEchoMsg. */
        class ItalkHeartEchoMsg implements IItalkHeartEchoMsg {

            /**
             * Constructs a new ItalkHeartEchoMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkHeartEchoMsg);

            /** ItalkHeartEchoMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkHeartEchoMsg echoInfo. */
            public echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkHeartEchoMsg heartCount. */
            public heartCount: (number|Long);

            /** ItalkHeartEchoMsg number. */
            public number: (number|Long);

            /**
             * Creates a new ItalkHeartEchoMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkHeartEchoMsg instance
             */
            public static create(properties?: italk.pb.IItalkHeartEchoMsg): italk.pb.ItalkHeartEchoMsg;

            /**
             * Encodes the specified ItalkHeartEchoMsg message. Does not implicitly {@link italk.pb.ItalkHeartEchoMsg.verify|verify} messages.
             * @param message ItalkHeartEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkHeartEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkHeartEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkHeartEchoMsg.verify|verify} messages.
             * @param message ItalkHeartEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkHeartEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkHeartEchoMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkHeartEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkHeartEchoMsg;

            /**
             * Decodes an ItalkHeartEchoMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkHeartEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkHeartEchoMsg;

            /**
             * Verifies an ItalkHeartEchoMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkHeartEchoMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkHeartEchoMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkHeartEchoMsg;

            /**
             * Creates a plain object from an ItalkHeartEchoMsg message. Also converts values to other types if specified.
             * @param message ItalkHeartEchoMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkHeartEchoMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkHeartEchoMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** ItalkMsgStatusEnum enum. */
        enum ItalkMsgStatusEnum {
            ITKUnsend = 0,
            ITKSending = 1,
            ITKSended = 2,
            ITKSendFailed = 3,
            ITKReceiverReceived = 4,
            ITKSenderReceived = 5,
            ITKReceiverReaded = 6,
            ITKSenderReaded = 7,
            ITKReceiverDestroyed = 8,
            ITKSenderDestroyed = 9,
            ITKReceiverTimeout = 10,
            ITKSenderTimeout = 11,
            ITKSenderRevoke = 12,
            ITKReceiverRevoke = 13,
            ITKMsgStatus1 = 21,
            ITKMsgStatus2 = 22,
            ITKMsgStatus3 = 23,
            ITKMsgStatus4 = 24,
            ITKMsgStatus5 = 25,
            ITKMsgStatus6 = 26
        }

        /** ItalkChatTypeEnum enum. */
        enum ItalkChatTypeEnum {
            ITKSingleChat = 0,
            ITKGroupChat = 1
        }

        /** ItalkBusinessTypeEnum enum. */
        enum ItalkBusinessTypeEnum {
            ITKSMS = 0,
            ITKPic = 1,
            ITKSound = 2,
            ITKShortVideo = 3,
            ITKFile = 4,
            ITKLocation = 5,
            ITKRedPacket = 6,
            ITKVoiceCall = 7,
            ITKVideoCall = 8,
            ITKServerPush = 9,
            ITKAddFriendRequest = 10,
            ITKNeedFriendVerify = 11,
            ITKAddFriendSucccess = 12,
            ITKVerifyFriendAnswer = 13,
            ITKVerifyFriendSuccess = 14,
            ITKGroupCreate = 15,
            ITKGroupMemberQuit = 16,
            ITKGroupMemberAdd = 17,
            ITKGroupOwnerTransfer = 18,
            ITKInviteGroupMember = 19,
            ITKVerifyInivitation = 20,
            ITKDeleteGroupMember = 21,
            ITKChatStatusChange = 22,
            ITKSystemNotification = 23,
            ITKRevokeMsg = 24,
            ITkDestroyed = 25,
            ITKReturnRedPacket = 26,
            ITKRemoveMsgID = 27,
            ITKOtherMachineLogin = 28,
            ITKRequestLogin = 29,
            ITKAuthLogin = 30,
            ITKUserChange = 31,
            ITKAppState = 32,
            ITKBussniesstype1 = 41,
            ITKBussniesstype2 = 42,
            ITKBussniesstype3 = 43,
            ITKBussniesstype4 = 44,
            ITKBussniesstype5 = 45,
            ITKBussniesstype6 = 46,
            ITKBussniesstype7 = 47,
            ITKBussniesstype8 = 48,
            ITKBussniesstype9 = 49,
            ITKBussniesstype10 = 50,
            ITKBussniesstype11 = 51,
            ITKBussniesstype12 = 52,
            ITKBussniesstype13 = 53,
            ITKBussniesstype14 = 54,
            ITKBussniesstype15 = 55,
            ITKBussniesstype16 = 56,
            ITKBussniesstype17 = 57,
            ITKBussniesstype18 = 58,
            ITKBussniesstype19 = 59,
            ITKBussniesstype20 = 60,
            ITKBussniesstype21 = 61,
            ITKBussniesstype22 = 62,
            ITKBussniesstype23 = 63,
            ITKBussniesstype24 = 64,
            ITKBussniesstype25 = 65,
            ITKBussniesstype26 = 66,
            ITKBussniesstype27 = 67,
            ITKBussniesstype28 = 68,
            ITKBussniesstype29 = 69,
            ITKBussniesstype30 = 70,
            ITKBussniesstype31 = 71,
            ITKBussniesstype32 = 72,
            ITKBussniesstype33 = 73,
            ITKBussniesstype34 = 74,
            ITKBussniesstype35 = 75,
            ITKBussniesstype36 = 76,
            ITKBussniesstype37 = 77,
            ITKBussniesstype38 = 78,
            ITKBussniesstype39 = 79,
            ITKBussniesstype40 = 80,
            ITKBussniesstype41 = 81,
            ITKBussniesstype42 = 82,
            ITKRecodeMsg = 83
        }

        /** ItalkFormatTypeEnum enum. */
        enum ItalkFormatTypeEnum {
            ITKBmp = 0,
            ITKJpg = 1,
            ITKPng = 2,
            ITKGif = 3,
            ITKOtherFormat = 4
        }

        /** ItalkMsgErrorEnum enum. */
        enum ItalkMsgErrorEnum {
            ITKToAccountNotExist = 0,
            ITKWrongMsgContent = 1,
            ITKOtherError = 2
        }

        /** ItalkAddFriendStatusEnum enum. */
        enum ItalkAddFriendStatusEnum {
            ITKAdded = 0,
            ITKWaitVerification = 1
        }

        /** Properties of an ItalkMsgContent. */
        interface IItalkMsgContent {

            /** ItalkMsgContent text */
            text?: (string|null);

            /** ItalkMsgContent size */
            size?: (number|null);

            /** ItalkMsgContent imageformat */
            imageformat?: (italk.pb.ItalkFormatTypeEnum|null);

            /** ItalkMsgContent width */
            width?: (number|null);

            /** ItalkMsgContent height */
            height?: (number|null);

            /** ItalkMsgContent thumburl */
            thumburl?: (string|null);

            /** ItalkMsgContent url */
            url?: (string|null);

            /** ItalkMsgContent second */
            second?: (number|null);

            /** ItalkMsgContent filename */
            filename?: (string|null);

            /** ItalkMsgContent desc */
            desc?: (string|null);

            /** ItalkMsgContent latitude */
            latitude?: (string|null);

            /** ItalkMsgContent longitude */
            longitude?: (string|null);
        }

        /** Represents an ItalkMsgContent. */
        class ItalkMsgContent implements IItalkMsgContent {

            /**
             * Constructs a new ItalkMsgContent.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkMsgContent);

            /** ItalkMsgContent text. */
            public text: string;

            /** ItalkMsgContent size. */
            public size: number;

            /** ItalkMsgContent imageformat. */
            public imageformat: italk.pb.ItalkFormatTypeEnum;

            /** ItalkMsgContent width. */
            public width: number;

            /** ItalkMsgContent height. */
            public height: number;

            /** ItalkMsgContent thumburl. */
            public thumburl: string;

            /** ItalkMsgContent url. */
            public url: string;

            /** ItalkMsgContent second. */
            public second: number;

            /** ItalkMsgContent filename. */
            public filename: string;

            /** ItalkMsgContent desc. */
            public desc: string;

            /** ItalkMsgContent latitude. */
            public latitude: string;

            /** ItalkMsgContent longitude. */
            public longitude: string;

            /**
             * Creates a new ItalkMsgContent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkMsgContent instance
             */
            public static create(properties?: italk.pb.IItalkMsgContent): italk.pb.ItalkMsgContent;

            /**
             * Encodes the specified ItalkMsgContent message. Does not implicitly {@link italk.pb.ItalkMsgContent.verify|verify} messages.
             * @param message ItalkMsgContent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkMsgContent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkMsgContent message, length delimited. Does not implicitly {@link italk.pb.ItalkMsgContent.verify|verify} messages.
             * @param message ItalkMsgContent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkMsgContent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkMsgContent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkMsgContent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkMsgContent;

            /**
             * Decodes an ItalkMsgContent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkMsgContent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkMsgContent;

            /**
             * Verifies an ItalkMsgContent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkMsgContent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkMsgContent
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkMsgContent;

            /**
             * Creates a plain object from an ItalkMsgContent message. Also converts values to other types if specified.
             * @param message ItalkMsgContent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkMsgContent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkMsgContent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkRecordMsg. */
        interface IItalkRecordMsg {

            /** ItalkRecordMsg recordMsg */
            recordMsg?: (italk.pb.IItalkRecordMsg|null);

            /** ItalkRecordMsg level */
            level?: (number|null);

            /** ItalkRecordMsg CurCount */
            CurCount?: (number|null);

            /** ItalkRecordMsg chatMsgList */
            chatMsgList?: (italk.pb.IItalkChatMsg[]|null);

            /** ItalkRecordMsg briefInfo */
            briefInfo?: (string[]|null);
        }

        /** Represents an ItalkRecordMsg. */
        class ItalkRecordMsg implements IItalkRecordMsg {

            /**
             * Constructs a new ItalkRecordMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkRecordMsg);

            /** ItalkRecordMsg recordMsg. */
            public recordMsg?: (italk.pb.IItalkRecordMsg|null);

            /** ItalkRecordMsg level. */
            public level: number;

            /** ItalkRecordMsg CurCount. */
            public CurCount: number;

            /** ItalkRecordMsg chatMsgList. */
            public chatMsgList: italk.pb.IItalkChatMsg[];

            /** ItalkRecordMsg briefInfo. */
            public briefInfo: string[];

            /**
             * Creates a new ItalkRecordMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkRecordMsg instance
             */
            public static create(properties?: italk.pb.IItalkRecordMsg): italk.pb.ItalkRecordMsg;

            /**
             * Encodes the specified ItalkRecordMsg message. Does not implicitly {@link italk.pb.ItalkRecordMsg.verify|verify} messages.
             * @param message ItalkRecordMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkRecordMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkRecordMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkRecordMsg.verify|verify} messages.
             * @param message ItalkRecordMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkRecordMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkRecordMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkRecordMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkRecordMsg;

            /**
             * Decodes an ItalkRecordMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkRecordMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkRecordMsg;

            /**
             * Verifies an ItalkRecordMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkRecordMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkRecordMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkRecordMsg;

            /**
             * Creates a plain object from an ItalkRecordMsg message. Also converts values to other types if specified.
             * @param message ItalkRecordMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkRecordMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkRecordMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkChatMsg. */
        interface IItalkChatMsg {

            /** ItalkChatMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkChatMsg userid */
            userid?: (string|null);

            /** ItalkChatMsg localid */
            localid?: (number|Long|null);

            /** ItalkChatMsg fid */
            fid?: (string|null);

            /** ItalkChatMsg memberids */
            memberids?: (string[]|null);

            /** ItalkChatMsg msgid */
            msgid?: (number|Long|null);

            /** ItalkChatMsg timestamp */
            timestamp?: (number|Long|null);

            /** ItalkChatMsg burnsecond */
            burnsecond?: (number|null);

            /** ItalkChatMsg burn */
            burn?: (boolean|null);

            /** ItalkChatMsg chattype */
            chattype?: (italk.pb.ItalkChatTypeEnum|null);

            /** ItalkChatMsg bussinesstype */
            bussinesstype?: (italk.pb.ItalkBusinessTypeEnum|null);

            /** ItalkChatMsg status */
            status?: (italk.pb.ItalkMsgStatusEnum|null);

            /** ItalkChatMsg content */
            content?: (italk.pb.IItalkMsgContent|null);

            /** ItalkChatMsg userupdatetime */
            userupdatetime?: (number|Long|null);

            /** ItalkChatMsg msgindex */
            msgindex?: (number|Long|null);

            /** ItalkChatMsg msglastindex */
            msglastindex?: (number|Long|null);

            /** ItalkChatMsg online */
            online?: (boolean|null);

            /** ItalkChatMsg offlinenum */
            offlinenum?: (number|Long|null);

            /** ItalkChatMsg msgorder */
            msgorder?: (number|Long|null);

            /** ItalkChatMsg msguserorder */
            msguserorder?: (number|Long|null);

            /** ItalkChatMsg text1 */
            text1?: (string|null);

            /** ItalkChatMsg text2 */
            text2?: (string|null);

            /** ItalkChatMsg text3 */
            text3?: (string|null);

            /** ItalkChatMsg groupupdatetime */
            groupupdatetime?: (number|Long|null);

            /** ItalkChatMsg msgflag */
            msgflag?: (number|Long|null);

            /** ItalkChatMsg msginfo1 */
            msginfo1?: (string|null);

            /** ItalkChatMsg msgint1 */
            msgint1?: (number|Long|null);

            /** ItalkChatMsg msginfo2 */
            msginfo2?: (string|null);

            /** ItalkChatMsg msgint2 */
            msgint2?: (number|Long|null);

            /** ItalkChatMsg msginfo3 */
            msginfo3?: (string|null);

            /** ItalkChatMsg uuid */
            uuid?: (string|null);

            /** ItalkChatMsg crc */
            crc?: (number|Long|null);

            /** ItalkChatMsg errorinfo */
            errorinfo?: (string|null);

            /** ItalkChatMsg number */
            number?: (number|Long|null);

            /** ItalkChatMsg msgidList */
            msgidList?: ((number|Long)[]|null);

            /** ItalkChatMsg records */
            records?: (italk.pb.IItalkRecordMsg|null);
        }

        /** Represents an ItalkChatMsg. */
        class ItalkChatMsg implements IItalkChatMsg {

            /**
             * Constructs a new ItalkChatMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkChatMsg);

            /** ItalkChatMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkChatMsg userid. */
            public userid: string;

            /** ItalkChatMsg localid. */
            public localid: (number|Long);

            /** ItalkChatMsg fid. */
            public fid: string;

            /** ItalkChatMsg memberids. */
            public memberids: string[];

            /** ItalkChatMsg msgid. */
            public msgid: (number|Long);

            /** ItalkChatMsg timestamp. */
            public timestamp: (number|Long);

            /** ItalkChatMsg burnsecond. */
            public burnsecond: number;

            /** ItalkChatMsg burn. */
            public burn: boolean;

            /** ItalkChatMsg chattype. */
            public chattype: italk.pb.ItalkChatTypeEnum;

            /** ItalkChatMsg bussinesstype. */
            public bussinesstype: italk.pb.ItalkBusinessTypeEnum;

            /** ItalkChatMsg status. */
            public status: italk.pb.ItalkMsgStatusEnum;

            /** ItalkChatMsg content. */
            public content?: (italk.pb.IItalkMsgContent|null);

            /** ItalkChatMsg userupdatetime. */
            public userupdatetime: (number|Long);

            /** ItalkChatMsg msgindex. */
            public msgindex: (number|Long);

            /** ItalkChatMsg msglastindex. */
            public msglastindex: (number|Long);

            /** ItalkChatMsg online. */
            public online: boolean;

            /** ItalkChatMsg offlinenum. */
            public offlinenum: (number|Long);

            /** ItalkChatMsg msgorder. */
            public msgorder: (number|Long);

            /** ItalkChatMsg msguserorder. */
            public msguserorder: (number|Long);

            /** ItalkChatMsg text1. */
            public text1: string;

            /** ItalkChatMsg text2. */
            public text2: string;

            /** ItalkChatMsg text3. */
            public text3: string;

            /** ItalkChatMsg groupupdatetime. */
            public groupupdatetime: (number|Long);

            /** ItalkChatMsg msgflag. */
            public msgflag: (number|Long);

            /** ItalkChatMsg msginfo1. */
            public msginfo1: string;

            /** ItalkChatMsg msgint1. */
            public msgint1: (number|Long);

            /** ItalkChatMsg msginfo2. */
            public msginfo2: string;

            /** ItalkChatMsg msgint2. */
            public msgint2: (number|Long);

            /** ItalkChatMsg msginfo3. */
            public msginfo3: string;

            /** ItalkChatMsg uuid. */
            public uuid: string;

            /** ItalkChatMsg crc. */
            public crc: (number|Long);

            /** ItalkChatMsg errorinfo. */
            public errorinfo: string;

            /** ItalkChatMsg number. */
            public number: (number|Long);

            /** ItalkChatMsg msgidList. */
            public msgidList: (number|Long)[];

            /** ItalkChatMsg records. */
            public records?: (italk.pb.IItalkRecordMsg|null);

            /**
             * Creates a new ItalkChatMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkChatMsg instance
             */
            public static create(properties?: italk.pb.IItalkChatMsg): italk.pb.ItalkChatMsg;

            /**
             * Encodes the specified ItalkChatMsg message. Does not implicitly {@link italk.pb.ItalkChatMsg.verify|verify} messages.
             * @param message ItalkChatMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkChatMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkChatMsg.verify|verify} messages.
             * @param message ItalkChatMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkChatMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkChatMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkChatMsg;

            /**
             * Decodes an ItalkChatMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkChatMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkChatMsg;

            /**
             * Verifies an ItalkChatMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkChatMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkChatMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkChatMsg;

            /**
             * Creates a plain object from an ItalkChatMsg message. Also converts values to other types if specified.
             * @param message ItalkChatMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkChatMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkChatEchoMsg. */
        interface IItalkChatEchoMsg {

            /** ItalkChatEchoMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkChatEchoMsg echoInfo */
            echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkChatEchoMsg userid */
            userid?: (string|null);

            /** ItalkChatEchoMsg localid */
            localid?: (number|Long|null);

            /** ItalkChatEchoMsg fid */
            fid?: (string|null);

            /** ItalkChatEchoMsg msgid */
            msgid?: (number|Long|null);

            /** ItalkChatEchoMsg timestamp */
            timestamp?: (number|Long|null);

            /** ItalkChatEchoMsg burnsecond */
            burnsecond?: (number|null);

            /** ItalkChatEchoMsg burn */
            burn?: (boolean|null);

            /** ItalkChatEchoMsg chattype */
            chattype?: (italk.pb.ItalkChatTypeEnum|null);

            /** ItalkChatEchoMsg bussinesstype */
            bussinesstype?: (italk.pb.ItalkBusinessTypeEnum|null);

            /** ItalkChatEchoMsg status */
            status?: (italk.pb.ItalkMsgStatusEnum|null);

            /** ItalkChatEchoMsg msgindex */
            msgindex?: (number|Long|null);

            /** ItalkChatEchoMsg msgorder */
            msgorder?: (number|Long|null);

            /** ItalkChatEchoMsg msguserorder */
            msguserorder?: (number|Long|null);

            /** ItalkChatEchoMsg text1 */
            text1?: (string|null);

            /** ItalkChatEchoMsg text2 */
            text2?: (string|null);

            /** ItalkChatEchoMsg text3 */
            text3?: (string|null);

            /** ItalkChatEchoMsg uuid */
            uuid?: (string|null);

            /** ItalkChatEchoMsg crc */
            crc?: (number|Long|null);

            /** ItalkChatEchoMsg number */
            number?: (number|Long|null);
        }

        /** Represents an ItalkChatEchoMsg. */
        class ItalkChatEchoMsg implements IItalkChatEchoMsg {

            /**
             * Constructs a new ItalkChatEchoMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkChatEchoMsg);

            /** ItalkChatEchoMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkChatEchoMsg echoInfo. */
            public echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkChatEchoMsg userid. */
            public userid: string;

            /** ItalkChatEchoMsg localid. */
            public localid: (number|Long);

            /** ItalkChatEchoMsg fid. */
            public fid: string;

            /** ItalkChatEchoMsg msgid. */
            public msgid: (number|Long);

            /** ItalkChatEchoMsg timestamp. */
            public timestamp: (number|Long);

            /** ItalkChatEchoMsg burnsecond. */
            public burnsecond: number;

            /** ItalkChatEchoMsg burn. */
            public burn: boolean;

            /** ItalkChatEchoMsg chattype. */
            public chattype: italk.pb.ItalkChatTypeEnum;

            /** ItalkChatEchoMsg bussinesstype. */
            public bussinesstype: italk.pb.ItalkBusinessTypeEnum;

            /** ItalkChatEchoMsg status. */
            public status: italk.pb.ItalkMsgStatusEnum;

            /** ItalkChatEchoMsg msgindex. */
            public msgindex: (number|Long);

            /** ItalkChatEchoMsg msgorder. */
            public msgorder: (number|Long);

            /** ItalkChatEchoMsg msguserorder. */
            public msguserorder: (number|Long);

            /** ItalkChatEchoMsg text1. */
            public text1: string;

            /** ItalkChatEchoMsg text2. */
            public text2: string;

            /** ItalkChatEchoMsg text3. */
            public text3: string;

            /** ItalkChatEchoMsg uuid. */
            public uuid: string;

            /** ItalkChatEchoMsg crc. */
            public crc: (number|Long);

            /** ItalkChatEchoMsg number. */
            public number: (number|Long);

            /**
             * Creates a new ItalkChatEchoMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkChatEchoMsg instance
             */
            public static create(properties?: italk.pb.IItalkChatEchoMsg): italk.pb.ItalkChatEchoMsg;

            /**
             * Encodes the specified ItalkChatEchoMsg message. Does not implicitly {@link italk.pb.ItalkChatEchoMsg.verify|verify} messages.
             * @param message ItalkChatEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkChatEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkChatEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkChatEchoMsg.verify|verify} messages.
             * @param message ItalkChatEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkChatEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkChatEchoMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkChatEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkChatEchoMsg;

            /**
             * Decodes an ItalkChatEchoMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkChatEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkChatEchoMsg;

            /**
             * Verifies an ItalkChatEchoMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkChatEchoMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkChatEchoMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkChatEchoMsg;

            /**
             * Creates a plain object from an ItalkChatEchoMsg message. Also converts values to other types if specified.
             * @param message ItalkChatEchoMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkChatEchoMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkChatEchoMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkLoginMsg. */
        interface IItalkLoginMsg {

            /** ItalkLoginMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkLoginMsg userid */
            userid?: (string|null);

            /** ItalkLoginMsg localid */
            localid?: (number|Long|null);

            /** ItalkLoginMsg token */
            token?: (string|null);

            /** ItalkLoginMsg clientid */
            clientid?: (string|null);

            /** ItalkLoginMsg number */
            number?: (number|Long|null);
        }

        /** Represents an ItalkLoginMsg. */
        class ItalkLoginMsg implements IItalkLoginMsg {

            /**
             * Constructs a new ItalkLoginMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkLoginMsg);

            /** ItalkLoginMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkLoginMsg userid. */
            public userid: string;

            /** ItalkLoginMsg localid. */
            public localid: (number|Long);

            /** ItalkLoginMsg token. */
            public token: string;

            /** ItalkLoginMsg clientid. */
            public clientid: string;

            /** ItalkLoginMsg number. */
            public number: (number|Long);

            /**
             * Creates a new ItalkLoginMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkLoginMsg instance
             */
            public static create(properties?: italk.pb.IItalkLoginMsg): italk.pb.ItalkLoginMsg;

            /**
             * Encodes the specified ItalkLoginMsg message. Does not implicitly {@link italk.pb.ItalkLoginMsg.verify|verify} messages.
             * @param message ItalkLoginMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkLoginMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkLoginMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkLoginMsg.verify|verify} messages.
             * @param message ItalkLoginMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkLoginMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkLoginMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkLoginMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkLoginMsg;

            /**
             * Decodes an ItalkLoginMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkLoginMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkLoginMsg;

            /**
             * Verifies an ItalkLoginMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkLoginMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkLoginMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkLoginMsg;

            /**
             * Creates a plain object from an ItalkLoginMsg message. Also converts values to other types if specified.
             * @param message ItalkLoginMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkLoginMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkLoginMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkLoginEchoMsg. */
        interface IItalkLoginEchoMsg {

            /** ItalkLoginEchoMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkLoginEchoMsg echoInfo */
            echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkLoginEchoMsg localid */
            localid?: (number|Long|null);

            /** ItalkLoginEchoMsg userid */
            userid?: (string|null);

            /** ItalkLoginEchoMsg token */
            token?: (string|null);

            /** ItalkLoginEchoMsg userno */
            userno?: (number|Long|null);

            /** ItalkLoginEchoMsg number */
            number?: (number|Long|null);
        }

        /** Represents an ItalkLoginEchoMsg. */
        class ItalkLoginEchoMsg implements IItalkLoginEchoMsg {

            /**
             * Constructs a new ItalkLoginEchoMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkLoginEchoMsg);

            /** ItalkLoginEchoMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkLoginEchoMsg echoInfo. */
            public echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkLoginEchoMsg localid. */
            public localid: (number|Long);

            /** ItalkLoginEchoMsg userid. */
            public userid: string;

            /** ItalkLoginEchoMsg token. */
            public token: string;

            /** ItalkLoginEchoMsg userno. */
            public userno: (number|Long);

            /** ItalkLoginEchoMsg number. */
            public number: (number|Long);

            /**
             * Creates a new ItalkLoginEchoMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkLoginEchoMsg instance
             */
            public static create(properties?: italk.pb.IItalkLoginEchoMsg): italk.pb.ItalkLoginEchoMsg;

            /**
             * Encodes the specified ItalkLoginEchoMsg message. Does not implicitly {@link italk.pb.ItalkLoginEchoMsg.verify|verify} messages.
             * @param message ItalkLoginEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkLoginEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkLoginEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkLoginEchoMsg.verify|verify} messages.
             * @param message ItalkLoginEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkLoginEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkLoginEchoMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkLoginEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkLoginEchoMsg;

            /**
             * Decodes an ItalkLoginEchoMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkLoginEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkLoginEchoMsg;

            /**
             * Verifies an ItalkLoginEchoMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkLoginEchoMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkLoginEchoMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkLoginEchoMsg;

            /**
             * Creates a plain object from an ItalkLoginEchoMsg message. Also converts values to other types if specified.
             * @param message ItalkLoginEchoMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkLoginEchoMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkLoginEchoMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkCommonMsg. */
        interface IItalkCommonMsg {

            /** ItalkCommonMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkCommonMsg userid */
            userid?: (string|null);

            /** ItalkCommonMsg localid */
            localid?: (number|Long|null);

            /** ItalkCommonMsg text */
            text?: (string|null);

            /** ItalkCommonMsg number */
            number?: (number|Long|null);
        }

        /** Represents an ItalkCommonMsg. */
        class ItalkCommonMsg implements IItalkCommonMsg {

            /**
             * Constructs a new ItalkCommonMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkCommonMsg);

            /** ItalkCommonMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkCommonMsg userid. */
            public userid: string;

            /** ItalkCommonMsg localid. */
            public localid: (number|Long);

            /** ItalkCommonMsg text. */
            public text: string;

            /** ItalkCommonMsg number. */
            public number: (number|Long);

            /**
             * Creates a new ItalkCommonMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkCommonMsg instance
             */
            public static create(properties?: italk.pb.IItalkCommonMsg): italk.pb.ItalkCommonMsg;

            /**
             * Encodes the specified ItalkCommonMsg message. Does not implicitly {@link italk.pb.ItalkCommonMsg.verify|verify} messages.
             * @param message ItalkCommonMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkCommonMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkCommonMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkCommonMsg.verify|verify} messages.
             * @param message ItalkCommonMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkCommonMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkCommonMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkCommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkCommonMsg;

            /**
             * Decodes an ItalkCommonMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkCommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkCommonMsg;

            /**
             * Verifies an ItalkCommonMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkCommonMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkCommonMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkCommonMsg;

            /**
             * Creates a plain object from an ItalkCommonMsg message. Also converts values to other types if specified.
             * @param message ItalkCommonMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkCommonMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkCommonMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ItalkCommonEchoMsg. */
        interface IItalkCommonEchoMsg {

            /** ItalkCommonEchoMsg msgType */
            msgType?: (italk.pb.ItalkTypeEnum|null);

            /** ItalkCommonEchoMsg echoInfo */
            echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkCommonEchoMsg localid */
            localid?: (number|Long|null);

            /** ItalkCommonEchoMsg text */
            text?: (string|null);

            /** ItalkCommonEchoMsg number */
            number?: (number|Long|null);
        }

        /** Represents an ItalkCommonEchoMsg. */
        class ItalkCommonEchoMsg implements IItalkCommonEchoMsg {

            /**
             * Constructs a new ItalkCommonEchoMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: italk.pb.IItalkCommonEchoMsg);

            /** ItalkCommonEchoMsg msgType. */
            public msgType: italk.pb.ItalkTypeEnum;

            /** ItalkCommonEchoMsg echoInfo. */
            public echoInfo?: (italk.pb.IItalkEchoInfo|null);

            /** ItalkCommonEchoMsg localid. */
            public localid: (number|Long);

            /** ItalkCommonEchoMsg text. */
            public text: string;

            /** ItalkCommonEchoMsg number. */
            public number: (number|Long);

            /**
             * Creates a new ItalkCommonEchoMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItalkCommonEchoMsg instance
             */
            public static create(properties?: italk.pb.IItalkCommonEchoMsg): italk.pb.ItalkCommonEchoMsg;

            /**
             * Encodes the specified ItalkCommonEchoMsg message. Does not implicitly {@link italk.pb.ItalkCommonEchoMsg.verify|verify} messages.
             * @param message ItalkCommonEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: italk.pb.IItalkCommonEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItalkCommonEchoMsg message, length delimited. Does not implicitly {@link italk.pb.ItalkCommonEchoMsg.verify|verify} messages.
             * @param message ItalkCommonEchoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: italk.pb.IItalkCommonEchoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItalkCommonEchoMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItalkCommonEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): italk.pb.ItalkCommonEchoMsg;

            /**
             * Decodes an ItalkCommonEchoMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItalkCommonEchoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): italk.pb.ItalkCommonEchoMsg;

            /**
             * Verifies an ItalkCommonEchoMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItalkCommonEchoMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItalkCommonEchoMsg
             */
            public static fromObject(object: { [k: string]: any }): italk.pb.ItalkCommonEchoMsg;

            /**
             * Creates a plain object from an ItalkCommonEchoMsg message. Also converts values to other types if specified.
             * @param message ItalkCommonEchoMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: italk.pb.ItalkCommonEchoMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItalkCommonEchoMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
