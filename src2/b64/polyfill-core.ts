const base64Characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64UrlCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// eslint-disable-next-line
const tag = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array.prototype),
  Symbol.toStringTag,
)!.get!;
/**
 *
 * @param arg
 */
export function checkUint8Array(arg: Uint8Array) {
  let kind;
  try {
    kind = tag.call(arg) as string;
  } catch {
    throw new TypeError('not a Uint8Array');
  }
  if (kind !== 'Uint8Array') {
    throw new TypeError('not a Uint8Array');
  }
}

/**
 *
 * @param condition
 * @param message
 */
function assert(condition: boolean, message?: string) {
  if (!condition) {
    throw new Error(`Assert failed: ${message}`);
  }
}

interface OptionsObject {
  alphabet?: string;
  omitPadding?: boolean;
  lastChunkHandling?: string;
}

/**
 *
 * @param options
 */
function getOptions(options: unknown): OptionsObject {
  if (typeof options === 'undefined') {
    return Object.create(null) as OptionsObject;
  }
  if (options && typeof options === 'object') {
    return options as OptionsObject;
  }
  throw new TypeError('options is not object');
}

/**
 *
 * @param arr
 * @param options
 */
export function uint8ArrayToBase64(arr: Uint8Array, options?: OptionsObject) {
  checkUint8Array(arr);
  const opts = getOptions(options);
  let alphabet = opts.alphabet;
  if (typeof alphabet === 'undefined') {
    alphabet = 'base64';
  }
  if (alphabet !== 'base64' && alphabet !== 'base64url') {
    throw new TypeError(
      'expected alphabet to be either "base64" or "base64url"',
    );
  }
  const omitPadding = !!opts.omitPadding;

  if ('detached' in arr.buffer && arr.buffer.detached) {
    throw new TypeError('toBase64 called on array backed by detached buffer');
  }

  const lookup = alphabet === 'base64' ? base64Characters : base64UrlCharacters;
  let result = '';

  let i = 0;
  for (; i + 2 < arr.length; i += 3) {
    const triplet = (arr[i] << 16) + (arr[i + 1] << 8) + arr[i + 2];
    result +=
      lookup[(triplet >> 18) & 63] +
      lookup[(triplet >> 12) & 63] +
      lookup[(triplet >> 6) & 63] +
      lookup[triplet & 63];
  }
  if (i + 2 === arr.length) {
    const triplet = (arr[i] << 16) + (arr[i + 1] << 8);
    result +=
      lookup[(triplet >> 18) & 63] +
      lookup[(triplet >> 12) & 63] +
      lookup[(triplet >> 6) & 63] +
      (omitPadding ? '' : '=');
  } else if (i + 1 === arr.length) {
    const triplet = arr[i] << 16;
    result +=
      lookup[(triplet >> 18) & 63] +
      lookup[(triplet >> 12) & 63] +
      (omitPadding ? '' : '==');
  }
  return result;
}

/**
 *
 * @param chunk
 * @param throwOnExtraBits
 */
function decodeBase64Chunk(chunk: string, throwOnExtraBits: boolean) {
  const actualChunkLength = chunk.length;
  if (actualChunkLength < 4) {
    chunk += actualChunkLength === 2 ? 'AA' : 'A';
  }

  const map = new Map(base64Characters.split('').map((c, i) => [c, i]));

  const c1 = chunk[0];
  const c2 = chunk[1];
  const c3 = chunk[2];
  const c4 = chunk[3];

  const triplet =
    (map.get(c1)! << 18) +
    (map.get(c2)! << 12) +
    (map.get(c3)! << 6) +
    map.get(c4)!;

  const chunkBytes = [
    (triplet >> 16) & 255,
    (triplet >> 8) & 255,
    triplet & 255,
  ];

  if (actualChunkLength === 2) {
    if (throwOnExtraBits && chunkBytes[1] !== 0) {
      throw new SyntaxError('extra bits');
    }
    return [chunkBytes[0]];
  } else if (actualChunkLength === 3) {
    if (throwOnExtraBits && chunkBytes[2] !== 0) {
      throw new SyntaxError('extra bits');
    }
    return [chunkBytes[0], chunkBytes[1]];
  }
  return chunkBytes;
}

/**
 *
 * @param string
 * @param index
 */
function skipAsciiWhitespace(string: string, index: number) {
  for (; index < string.length; ++index) {
    // eslint-disable-next-line
    if (!/[\u0009\u000A\u000C\u000D\u0020]/.test(string[index])) {
      break;
    }
  }
  return index;
}

/**
 *
 * @param string
 * @param alphabet
 * @param lastChunkHandling
 * @param maxLength
 */
function fromBase64(
  string: string,
  alphabet: string,
  lastChunkHandling: string,
  maxLength: number,
) {
  if (maxLength === 0) {
    return { read: 0, bytes: [], error: null };
  }

  let read = 0;
  const bytes = [];
  let chunk = '';

  let index = 0;
  while (true) {
    index = skipAsciiWhitespace(string, index);
    if (index === string.length) {
      if (chunk.length > 0) {
        if (lastChunkHandling === 'stop-before-partial') {
          return { bytes, read, error: null };
        } else if (lastChunkHandling === 'loose') {
          if (chunk.length === 1) {
            const error = new SyntaxError(
              'malformed padding: exactly one additional character',
            );
            return { bytes, read, error };
          }
          bytes.push(...decodeBase64Chunk(chunk, false));
        } else {
          assert(lastChunkHandling === 'strict');
          const error = new SyntaxError('missing padding');
          return { bytes, read, error };
        }
      }
      return { bytes, read: string.length, error: null };
    }
    let char = string[index];
    ++index;
    if (char === '=') {
      if (chunk.length < 2) {
        const error = new SyntaxError('padding is too early');
        return { bytes, read, error };
      }
      index = skipAsciiWhitespace(string, index);
      if (chunk.length === 2) {
        if (index === string.length) {
          if (lastChunkHandling === 'stop-before-partial') {
            // two characters then `=` then EOS: this is, technically, a partial chunk
            return { bytes, read, error: null };
          }
          const error = new SyntaxError('malformed padding - only one =');
          return { bytes, read, error };
        }
        if (string[index] === '=') {
          ++index;
          index = skipAsciiWhitespace(string, index);
        }
      }
      if (index < string.length) {
        const error = new SyntaxError('unexpected character after padding');
        return { bytes, read, error };
      }
      bytes.push(...decodeBase64Chunk(chunk, lastChunkHandling === 'strict'));
      assert(bytes.length <= maxLength);
      return { bytes, read: string.length, error: null };
    }
    if (alphabet === 'base64url') {
      if (char === '+' || char === '/') {
        const error = new SyntaxError(
          `unexpected character ${JSON.stringify(char)}`,
        );
        return { bytes, read, error };
      } else if (char === '-') {
        char = '+';
      } else if (char === '_') {
        char = '/';
      }
    }
    if (!base64Characters.includes(char)) {
      const error = new SyntaxError(
        `unexpected character ${JSON.stringify(char)}`,
      );
      return { bytes, read, error };
    }
    const remainingBytes = maxLength - bytes.length;
    if (
      (remainingBytes === 1 && chunk.length === 2) ||
      (remainingBytes === 2 && chunk.length === 3)
    ) {
      // special case: we can fit exactly the number of bytes currently represented by chunk, so we were just checking for `=`
      return { bytes, read, error: null };
    }

    chunk += char;
    if (chunk.length === 4) {
      bytes.push(...decodeBase64Chunk(chunk, false));
      chunk = '';
      read = index;
      assert(bytes.length <= maxLength);
      if (bytes.length === maxLength) {
        return { bytes, read, error: null };
      }
    }
  }
}

/**
 *
 * @param string
 * @param options
 * @param into
 */
export function base64ToUint8Array(
  string: string,
  options?: object,
  into?: Uint8Array,
) {
  const opts = getOptions(options);
  let alphabet = opts.alphabet;
  if (typeof alphabet === 'undefined') {
    alphabet = 'base64';
  }
  if (alphabet !== 'base64' && alphabet !== 'base64url') {
    throw new TypeError(
      'expected alphabet to be either "base64" or "base64url"',
    );
  }
  let lastChunkHandling = opts.lastChunkHandling;
  if (typeof lastChunkHandling === 'undefined') {
    lastChunkHandling = 'loose';
  }
  if (!['loose', 'strict', 'stop-before-partial'].includes(lastChunkHandling)) {
    throw new TypeError(
      'expected lastChunkHandling to be either "loose", "strict", or "stop-before-partial"',
    );
  }
  if (into && 'detached' in into.buffer && into.buffer.detached) {
    throw new TypeError(
      'toBase64Into called on array backed by detached buffer',
    );
  }

  const maxLength = into ? into.length : 2 ** 53 - 1;

  // eslint-disable-next-line prefer-const
  let { bytes, read, error } = fromBase64(
    string,
    alphabet,
    lastChunkHandling,
    maxLength,
  );
  if (error && !into) {
    throw error;
  }

  const arrayBytes = new Uint8Array(bytes);
  if (into && arrayBytes.length > 0) {
    assert(arrayBytes.length <= into.length);
    into.set(arrayBytes);
  }

  if (error) {
    throw error;
  }

  return { read, arrayBytes };
}
