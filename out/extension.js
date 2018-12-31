"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialization_1 = require("./infrastructure/initialization");
function activate(context) {
    initialization_1.InitializationService.initializeExtension(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map