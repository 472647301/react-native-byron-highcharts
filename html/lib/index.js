"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendMessageHtml(name, params, debug) {
    return "\n  window.sendMessageHtml(" + name + ", " + JSON.stringify(params) + ", " + debug + ")\n  ";
}
exports.sendMessageHtml = sendMessageHtml;
