'use strict';

var v8 = require('v8');
var worker_threads = require('worker_threads');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var v8__default = /*#__PURE__*/_interopDefaultLegacy(v8);
var worker_threads__default = /*#__PURE__*/_interopDefaultLegacy(worker_threads);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/* es-module-lexer 0.10.5 */
const A=1===new Uint8Array(new Uint16Array([1]).buffer)[0];function parse(E,g="@"){if(!C)return init.then((()=>parse(E)));const I=E.length+1,o=(C.__heap_base.value||C.__heap_base)+4*I-C.memory.buffer.byteLength;o>0&&C.memory.grow(Math.ceil(o/65536));const k=C.sa(I-1);if((A?B:Q)(E,new Uint16Array(C.memory.buffer,k,I)),!C.parse())throw Object.assign(new Error(`Parse error ${g}:${E.slice(0,C.e()).split("\n").length}:${C.e()-E.lastIndexOf("\n",C.e()-1)}`),{idx:C.e()});const J=[],i=[];for(;C.ri();){const A=C.is(),Q=C.ie(),B=C.ai(),g=C.id(),I=C.ss(),o=C.se();let k;C.ip()&&(k=w(E.slice(-1===g?A-1:A,-1===g?Q+1:Q))),J.push({n:k,s:A,e:Q,ss:I,se:o,d:g,a:B});}for(;C.re();){const A=E.slice(C.es(),C.ee()),Q=A[0];i.push('"'===Q||"'"===Q?w(A):A);}function w(A){try{return (0,eval)(A)}catch(A){}}return [J,i,!!C.f()]}function Q(A,Q){const B=A.length;let C=0;for(;C<B;){const B=A.charCodeAt(C);Q[C++]=(255&B)<<8|B>>>8;}}function B(A,Q){const B=A.length;let C=0;for(;C<B;)Q[C]=A.charCodeAt(C++);}let C;const init=WebAssembly.compile((E="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ajYCiApBARAhIQMLQQAoAogKIQICQCADQf0ARg0AIAIgAUYNBSACIQEgAkEAKAKMCk0NAQwFCwtBACACQQJqNgKICgwBC0EAIANBAmo2AogKQQEQIRpBACgCiAoiAiACECYaC0EBECEhAgtBACgCiAohAwJAIAJB5gBHDQAgA0ECakGeCEEGECgNAEEAIANBCGo2AogKIABBARAhECIPC0EAIANBfmo2AogKDAMLEB0PCwJAIAMpAAJC7ICEg7COwDlSDQAgAy8BChAeRQ0AQQAgA0EKajYCiApBARAhIQJBACgCiAohAyACECQaIANBACgCiAoQAkEAQQAoAogKQX5qNgKICg8LQQAgA0EEaiIDNgKICgtBACADQQRqIgI2AogKQQBBADoA5AkDQEEAIAJBAmo2AogKQQEQISEDQQAoAogKIQICQCADECRBIHJB+wBHDQBBAEEAKAKICkF+ajYCiAoPC0EAKAKICiIDIAJGDQEgAiADEAICQEEBECEiAkEsRg0AAkAgAkE9Rw0AQQBBACgCiApBfmo2AogKDwtBAEEAKAKICkF+ajYCiAoPC0EAKAKICiECDAALCw8LQQAgA0EKajYCiApBARAhGkEAKAKICiEDC0EAIANBEGo2AogKAkBBARAhIgJBKkcNAEEAQQAoAogKQQJqNgKICkEBECEhAgtBACgCiAohAyACECQaIANBACgCiAoQAkEAQQAoAogKQX5qNgKICg8LIAMgA0EOahACC6sGAQR/QQBBACgCiAoiAEEMaiIBNgKICgJAAkACQAJAAkACQAJAAkACQAJAQQEQISICQVlqDggCCAECAQEBBwALIAJBIkYNASACQfsARg0CC0EAKAKICiABRg0HC0EALwHqCQ0BQQAoAogKIQJBACgCjAohAwNAIAIgA08NBAJAAkAgAi8BACIBQSdGDQAgAUEiRw0BCyAAIAEQIg8LQQAgAkECaiICNgKICgwACwtBACgCiAohAkEALwHqCQ0BAkADQAJAAkACQCACQQAoAowKTw0AQQEQISICQSJGDQEgAkEnRg0BIAJB/QBHDQJBAEEAKAKICkECajYCiAoLQQEQIRpBACgCiAoiAikAAELmgMiD8I3ANlINBkEAIAJBCGo2AogKQQEQISICQSJGDQMgAkEnRg0DDAYLIAIQFwtBAEEAKAKICkECaiICNgKICgwACwsgACACECIMBQtBAEEAKAKICkF+ajYCiAoPC0EAIAJBfmo2AogKDwsQHQ8LQQBBACgCiApBAmo2AogKQQEQIUHtAEcNAUEAKAKICiICQQJqQZYIQQYQKA0BQQAoAvAJLwEAQS5GDQEgACAAIAJBCGpBACgCqAkQAQ8LQQAoAvwJQQAvAeoJIgJBAnRqQQAoAogKNgIAQQAgAkEBajsB6glBACgC8AkvAQBBLkYNAEEAQQAoAogKIgFBAmo2AogKQQEQISECIABBACgCiApBACABEAFBAEEALwHoCSIBQQFqOwHoCUEAKAKACiABQQJ0akEAKALECTYCAAJAIAJBIkYNACACQSdGDQBBAEEAKAKICkF+ajYCiAoPCyACEBdBAEEAKAKICkECaiICNgKICgJAAkACQEEBECFBV2oOBAECAgACC0EAQQAoAogKQQJqNgKICkEBECEaQQAoAsQJIgEgAjYCBCABQQE6ABggAUEAKAKICiICNgIQQQAgAkF+ajYCiAoPC0EAKALECSIBIAI2AgQgAUEBOgAYQQBBAC8B6glBf2o7AeoJIAFBACgCiApBAmo2AgxBAEEALwHoCUF/ajsB6AkPC0EAQQAoAogKQX5qNgKICg8LC0cBA39BACgCiApBAmohAEEAKAKMCiEBAkADQCAAIgJBfmogAU8NASACQQJqIQAgAi8BAEF2ag4EAQAAAQALC0EAIAI2AogKC5gBAQN/QQBBACgCiAoiAUECajYCiAogAUEGaiEBQQAoAowKIQIDQAJAAkACQCABQXxqIAJPDQAgAUF+ai8BACEDAkACQCAADQAgA0EqRg0BIANBdmoOBAIEBAIECyADQSpHDQMLIAEvAQBBL0cNAkEAIAFBfmo2AogKDAELIAFBfmohAQtBACABNgKICg8LIAFBAmohAQwACwu/AQEEf0EAKAKICiEAQQAoAowKIQECQAJAA0AgACICQQJqIQAgAiABTw0BAkACQCAALwEAIgNBpH9qDgUBAgICBAALIANBJEcNASACLwEEQfsARw0BQQBBAC8B5gkiAEEBajsB5glBACgC+AkgAEEBdGpBAC8B7Ak7AQBBACACQQRqNgKICkEAQQAvAeoJQQFqIgA7AewJQQAgADsB6gkPCyACQQRqIQAMAAsLQQAgADYCiAoQHQ8LQQAgADYCiAoL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","undefined"!=typeof Buffer?Buffer.from(E,"base64"):Uint8Array.from(atob(E),(A=>A.charCodeAt(0))))).then(WebAssembly.instantiate).then((({exports:A})=>{C=A;}));var E;

// @ts-check


const { Worker, workerData } = worker_threads__default['default'];

const INT32_BYTES = 4;
var runAsWorker_1 = runAsWorker;

/**
 * @param {(inputData: any) => Promise<any>} workerAsyncFn
 * @returns void
 */
async function runAsWorker(workerAsyncFn) {
  const { inputData, sharedBuffer } = workerData;
  let data,
    didThrow = false;
  try {
    data = await workerAsyncFn(inputData);
  } catch (e) {
    data = e;
    didThrow = true;
  }
  notifyParent(sharedBuffer, data, didThrow);
}

/**
 * @param {SharedArrayBuffer} sharedBuffer
 * @param {any} data
 * @param {boolean} didThrow
 * @returns void
 */
function notifyParent(sharedBuffer, data, didThrow) {
  const buf = v8__default['default'].serialize(data);
  buf.copy(Buffer.from(sharedBuffer), INT32_BYTES);
  const semaphore = new Int32Array(sharedBuffer);
  Atomics.store(semaphore, 0, didThrow ? -buf.length : buf.length);
  Atomics.notify(semaphore, 0);
}

runAsWorker_1((content) => __awaiter(void 0, void 0, void 0, function* () {
    yield init;
    return parse(content);
}));
//# sourceMappingURL=worker.js.map
