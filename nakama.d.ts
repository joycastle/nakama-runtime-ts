export interface IDict<T> {
  [key: string]: T;
}

export interface IAccount {
  id: string;
  username: string;
  display_name: string;
  avartar_url: string;
  lang: string;
  location: string;
  timezone: string;
  metadata: IDict<any>;
  edge_count: number;
  facebook_id: string;
  google_id: string;
  gamecenter_id: string;
  steam_id: string;
  create_time: number;
  update_time: number;
  online: boolean;
  email: string;
  devices: string[];
  custom_id: string;
  wallet: IDict<number>;
  verify_time: number;
}

export interface IMatch {
  match_id: string;
}

export interface IMatchContext {
  env: IDict<string>;
  execution_mode: string;
  match_id: string;
  match_node: string;
  match_label: string;
  match_tick_rate: number;
}

export interface IPresence {
  user_id: string;
  session_id: string;
  username: string;
  node: string;
}

export interface IDispatcher {
  broadcast_message: (
    op_code: number,
    data: string | null,
    presences: IPresence[] | null,
    dispatcher: IPresence | null
  ) => void;
  match_kick: (presences: [IPresence]) => void;
}

export interface IMessage {
  sender: IPresence;
  op_code: number;
  data: string | null;
}

export interface IRuntimeContext {
  env: IDict<string>;
  execution_mode: string;
  query_params: IDict<string>;
  user_id: string;
  user_session_exp: number;
  username: string;
  session_id?: string;
}

// Get all account information for a given user ID.
export declare function account_get_id(user_id: string): IAccount;

// Update account information for a given user ID.
/** !TupleReturn */
export declare function account_update_id(
  user_id: string,
  metadata: IDict<any>,
  username: string,
  display_name: string | null,
  timezone: string | null,
  location: string | null,
  language: string | null,
  avatar_url: string | null
): [string, string];

// AES decrypt input with the key. Key must be 16 bytes long.
export declare function aes128_decrypt(input: string, key: string): string;

// AES encrypt input with the key. Key must be 16 bytes long.
export declare function aes128_encrypt(input: string, key: string): string;

// Authenticate user with custom ID and create a session token.
/** !TupleReturn */
export declare function authenticate_custom(
  id: string,
  username: string,
  create?: boolean
): [string, string, boolean];

// Authenticate user with device ID and create a session token.
/** !TupleReturn */
export declare function authenticate_device(
  id: string,
  username: string,
  create?: boolean
): [string, string, boolean];

// Authenticate user with email and create a session token.
/** !TupleReturn */
export declare function authenticate_email(
  email: string,
  password: string,
  username?: string,
  create?: boolean
): [string, string, boolean];

// Authenticate user with facebook token and create a session token.
/** !TupleReturn */
export declare function authenticate_facebook(
  token: string,
  import_?: boolean,
  username?: string,
  create?: boolean
): [string, string, boolean];

// Authenticate user with GameCenter and create a session token.
/** !TupleReturn */
export declare function authenticate_gamecenter(
  player_id: string,
  bundle_id: string,
  timestamp: number,
  salt: string,
  signature: string,
  public_key_url: string,
  username?: string,
  create?: boolean
): [string, string, boolean];

// Authenticate user with Google token and create a session token.
/** !TupleReturn */
export declare function authenticate_google(
  token: string,
  username?: string,
  create?: boolean
): [string, string, boolean];

// Authenticate user with Steam token and create a session token.
/** !TupleReturn */
export declare function authenticate_steam(
  token: string,
  username?: string,
  create?: boolean
): [string, string, boolean];

// Generate a Nakama session token from a username. This is not the same as an
// authentication mechanism because a user does not get created and input is not
// checked against the database.
// This is useful if you have an external source of truth where users are
// registered.
export declare function authenticate_token_generate(
  user_id: string,
  username: string,
  expires_at?: number
): string;

// Base 16 decode the input.
export declare function base16_decode(input: string): string;

// Base 16 encode the input.
export declare function base16_encode(input: string): string;

// Base 64 decode the input.
export declare function base64_decode(input: string): string;

// Base 64 encode the input.
export declare function base64_encode(input: string): string;

// Base 64 URL decode the input.
export declare function base64url_decode(input: string): string;

// Base 64 URL encode the input.
export declare function base64url_encode(input: string): string;

// Generate one-way hashed string using bcrypt.
export declare function bcrypt_hash(input: string): string;

// Compare hashed input against a plaintext input.
export declare function bcrypt_compare(
  hash: string,
  plaintext: string
): boolean;

// Parses a CRON expression and a timestamp in UTC seconds, and returns the next
// matching timestamp in UTC seconds.
export declare function cron_next(
  expression: string,
  timestamp: number
): number;

// Send a HTTP request and receive the result as a Lua table.
/** !TupleReturn */
export declare function http_request(
  url: string,
  method: string,
  headers: object,
  content: string
): [number, IDict<string>, string];


// Setup a new dynamic leaderboard with the specified ID and various
// configuration settings. The leaderboard will be created if it doesn't already
// exist, otherwise its configuration will not be updated.
export declare function leaderboard_create(
    id: string, authoritative: boolean, sort?: string, operator?: string,
    reset?: string, metadata?: IDict<any>): void;

// Delete a leaderboard and all scores that belong to it.
export declare function leaderboard_delete(id: string): void;

// Use the preconfigured operator for the given leaderboard to submit a score
// for a particular user.
export declare function leaderboard_record_write(
    id: string, owner: string, username?: string, score?: number,
    subscore?: number, metadata?: IDict<any>): void;

// Remove an owner's record from a leaderboard, if one exists.
export declare function leaderboard_record_delete(
    id: string, owner: string): void;

export interface LeaderboardRecord {
  // The ID of the leaderboard this score belongs to.
  leaderboard_id: string;
  // The ID of the score owner, usually a user or group.
  owner_id: string;
  // The username of the score owner, if the owner is a user.
  username: string;
  // The score value.
  score: number;
  // An optional subscore value.
  subscore: number;
  // The number of submissions to this score record.
  num_score: number;
  // Metadata.
  metadata: string;
  // The UNIX time when the leaderboard record was created.
  create_time: number;
  // The UNIX time when the leaderboard record was updated.
  update_time: number;
  // The UNIX time when the leaderboard record expires.
  expiry_time: number;
  // The rank of this record.
  rank: number; 
}

// List records on the specified leaderboard, optionally filtering to only a
// subset of records by their owners. Records will be listed in the
// preconfigured leaderboard sort order.
/** !TupleReturn */
export declare function leaderboard_records_list(
    id: string, owners?: string[], limit?: number,
    cursor?: string): [LeaderboardRecord[], number];

// Decode the JSON input as a Lua table.
export declare function json_decode(input: string): IDict<any>;

// Encode the JSON input as JSON
export declare function json_encode(input: IDict<any>): string;

// Write an ERROR level message to the server logs.
export declare function logger_error(message: string): void;

// Write an INFO level message to the server logs.
export declare function logger_info(message: string): void;

// Write an WARN level message to the server logs.
export declare function logger_warn(message: string): void;

// Create a new authoritative realtime multiplayer match running on the given
// runtime module name. The given params are passed to the match's init hook.
export declare function match_create(module: string, params?: any): string;

// List currently running realtime multiplayer matches and optionally filter
// them by authoritative mode, label, and current participant count.
export declare function match_list(
  limit: number,
  authoritative?: boolean | null,
  label?: string | null,
  min_size?: number,
  max_size?: number
): Array<IMatch>;

// Send one in-app notification to a user.
export declare function notification_send(
  user_id: string,
  subject: string,
  content: IDict<any>,
  code: number,
  dispatcher_id: string,
  persistent?: boolean
): void;

export interface IMatchMakerUser {
  presence: IPresence,
  properties: object
}

// Registers a function that will be called when matchmaking finds opponents.
export declare function register_matchmaker_matched(
  callback: (context: IMatchContext, matchmaker_users: IMatchMakerUser[]) => string | null
): void;

// Register a function with the server which will be executed after every
// non-realtime message with the specified message name.
export declare function register_req_after(
  callback: (context: IRuntimeContext, payload: IDict<any>) => void,
  msgname: string
): void;

// Register a function with the server which will be executed before every
// non-realtime message with the specified message name.
export declare function register_req_before(
  callback: (context: IRuntimeContext, payload: IDict<any>) => void,
  msgname: string
): void;

// Register a function with the server which will be executed after every
// realtime message with the specified message name.
export declare function register_rt_after(
  callback: (context: IRuntimeContext, payload: IDict<any>) => void,
  msgname: string
): void;

// Register a function with the server which will be executed before every
// realtime message with the specified message name.
export declare function register_rt_before(
  callback: (context: IRuntimeContext, payload: IDict<any>) => void,
  msgname: string
): void;

// The ID can be any string identifier and is sent by the client. The ID is used
// to map the client RPC message to the specific function to execute.
// This function can also be used to register a HTTP endpoint within the server.
export declare function register_rpc(
  callback: (context: IRuntimeContext, payload: string) => any,
  id: string
): void;

// Execute an arbitrary SQL query and return the number of rows affected.
// Typically an INSERT, DELETE, or UPDATE statement with no return columns.
export declare function sql_exec(query: string, parameters: Array<any>): void;

// Execute an arbitrary SQL query that is expected to return row data. Typically
// a SELECT statement.
export declare function sql_query(
  query: string,
  parameters: Array<any>
): IDict<any>[];

export interface IUserObjectId {
  collection: string;
  key: string;
  user_id?: string;
}

export interface IUserObject {
  collection: string;
  value: IDict<any>;
  key: string;
  user_id?: string;
  version?: string;
  permission_read?: number;
  permission_write?: number;
}

// Fetch one or more records by their bucket/collection/keyname and optional
// user.
export declare function storage_read(
  object_ids: IUserObjectId[]
): IUserObject[];

// You can list records in a collection and page through results. The records
// returned can be filtered to those owned by the user or "" for public records
// which aren't owned by a user.
/** !TupleReturn */
export declare function storage_list(
  user_id: string | null,
  collection: string,
  limit: number,
  cursor: string
): [IUserObject[], string];

// Remove one or more objects by their collection/keyname and optional user.
export declare function storage_delete(object_ids: IUserObjectId[]): void;

// Write one or more objects by their collection/keyname and optional user.
export declare function storage_write(objects: IUserObject[]): void;

// Get the current UTC time in milliseconds using the system wall clock.
export declare function time(): number;

// Update a user's wallet with the given changeset.
export declare function wallet_update(user_id: string, changeset: IDict<number | undefined>, metadata?: IDict<any>): void;

export interface IWalletUpdate {
  user_id: string;
  changeset: IDict<number>;
  metadata?: IDict<any>;
}

// Update one or more user wallets with individual changesets. This function
// will also insert a new wallet ledger item into each user's wallet history
// that trackes their update.
// All updates will be performed atomically.
export declare function wallets_update(updates: IWalletUpdate[]): void;

export interface IWalletAppliedUpdate {
  id: string;
  user_id: string;
  create_time: number;
  update_time: number;
  changeset: IDict<number>;
  metadata?: IDict<any>;
}

// List all wallet updates for a particular user, from oldest to newest.
export declare function wallet_ledger_list(user_id: string): IWalletAppliedUpdate[];

// Update the metadata for a particular wallet update in a users wallet ledger
// history. Useful when adding a note to a transaction for example.
export declare function wallet_ledger_update(id: string, metadata: IDict<any>): void;

// Generate a version 4 UUID in the standard 36-character string representation.
export declare function uuid_v4(): string;

// Convert the 16-byte raw representation of a UUID into the equivalent
// 36-character standard UUID string representation. Will raise an error if the
// input is not valid and cannot be converted.
export declare function uuid_bytes_to_string (uuid_bytes: string): string;

// Convert the 36-character string representation of a UUID into the equivalent
// 16-byte raw UUID representation. Will raise an error if the input is not
// valid and cannot be converted.
export declare function uuid_string_to_bytes(uuid_string: string): string;

export interface IChannelJoin {
  channel_join: {
    persistence: boolean;
    target: string;
    hidden: boolean;
  };
}

export interface IStreamId {
  mode: number;
  subject?: string;
  descriptor?: string;
  label?: string;
}

export declare function stream_user_join(
    user_id: string, session_id: string, stream_id: IStreamId, hidden: boolean,
    persistence: boolean): void;

export declare function stream_user_leave(
    user_id: string, session_id: string, stream_id: IStreamId): void;

export declare function stream_data_send(
    stream_id: IStreamId, payload: string): void;

export declare function stream_close(stream_id: IStreamId): void;

export declare function stream_count(stream_id: IStreamId): number;

export declare function stream_user_list(stream_id: IStreamId): IPresence[];

export declare function stream_user_get(
    user_id: string, session_id: string, stream_id: IStreamId): IDict<any>;
