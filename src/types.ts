/*
*
*   MESSAGE TYPES
* 
*/

export enum MessageTypes {
    NONE = 0,
    CHANNEL_CREATE = 1,
    CHANNEL_EDIT_MEMBERS = 2,
    CHANNEL_EDIT_URI = 3,
    CHANNEL_TRANSFER_OWNER = 4,
    ITEM_CREATE = 5,
    ITEM_EDIT = 6,
    ITEM_DELETE = 7,
    ITEM_SUBMIT = 8,
    ITEM_ACC_REJ = 9,
    ITEM_REMOVE = 10,
    COMMENT_CREATE = 11,
    COMMENT_EDIT = 12,
    COMMENT_DELETE = 13,
    USER_SET_NAME = 14,
    USER_SET_URI = 15,
  }
  
  export enum HashTypes {
    NONE = 0,
    BLAKE_3 = 1,
  }
  
  export enum SignatureTypes {
    NONE = 0,
    ED25519 = 1
  }
  
  export type Message = {
    signer: Uint8Array;
    messageData: MessageData;
    hashType: HashTypes;
    hash: Uint8Array;
    sigType: SignatureTypes;
    sig: Uint8Array;
  };
  
  export type MessageData = {
    rid: bigint;
    timestamp: bigint;
    type: MessageTypes;
    body: MessageDataBodyTypes;
  };
  
  
  /*
  *
  *   MESSAGE BODY TYPES
  * 
  */
  
  /*
   * 1
   */
  export type ChannelCreateBody = {
    uri: string;
  };
  
  /*
   * 2
   */
  export type ChannelEditMember = {
    channelId: string;
    member: {
      rid: bigint;
      role: 0 | 1 | 2; // 0 = none, 1 = member, 2 = admin
    };
  };
  
  /*
   * 3
   */
  export type ChannelEditUri = {
    channelId: string;
    uri: string;
  };
  
  /*
   * 4
   */
  export type ChannelTransferOwner = {
    channelId: string;
    transferToRid: bigint;
  };
  
  /*
   * 5
   */
  export type ItemCreateBody = {
    uri: string;
  };
  
  /*
   * 6
   */
  export type ItemEditBody = {
    itemId: string;
    uri: string;
  };
  
  /*
   * 7
   */
  export type ItemDeleteBody = {
    itemId: string;
  };
  
  /*
   * 8
   */
  export type ItemSubmitBody = {
    itemId: string;
    channelId: string;
    caption?: string; // MAX 300 CHAR LIMIT
  };
  
  /*
   * 9
   */
  export type ItemAccRejBody = {
    submissionId: string;
    response: boolean; // FALSE = rejected, TRUE = accepted
    caption?: string; // MAX_CHAR_LIMIT = 300
  };
  
  /*
   * 10
   */
  export type ItemRemoveBody = {
    submissionId: string;
  };
  
  /*
   * 11
   */
  export type CommentCreateBody = {
    targetId: string; // Must be SUBMISSION_ID or COMMENT_ID
    text: string; // MAX_CHAR_LIMIT = 300
  };
  
  /*
   * 12
   */
  export type CommentEditBody = {
    commentId: string;
    text: string; // MAX_CHAR_LIMIT = 300
  };
  
  /*
   * 13
   */
  export type CommentDeleteBody = {
    commentId: string;
  };
  
  /*
   * 14
   */
  export type UserSetNameBody = {
    fromId: bigint;
    toId: bigint;
    username: string; // MAX_CHAR_LIMIT = 15 + regex
  };
  
  /*
   * 15
   */
  export type UserSetUriBody = {
    rid: bigint;
    uri: string;
  };
  
  /*
   * Message Data Body Union type
   */
  export type MessageDataBodyTypes =
    | ChannelCreateBody
    | ChannelEditMember
    | ChannelEditUri
    | ChannelTransferOwner
    | ItemCreateBody
    | ItemEditBody
    | ItemDeleteBody
    | ItemSubmitBody
    | ItemAccRejBody
    | ItemRemoveBody
    | CommentCreateBody
    | CommentEditBody
    | CommentDeleteBody
    | UserSetNameBody
    | UserSetUriBody;