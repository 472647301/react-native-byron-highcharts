"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendMessageHtml(name, params, debug) {
    return "\n  window.sendMessageHtml(" + JSON.stringify({
        event: name,
        option: params,
        debug: debug
    }) + ")\n  ";
}
exports.sendMessageHtml = sendMessageHtml;
