"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = require("../dependency-injection");
const servants_1 = require("./servants");
class InitializationService {
    static initializeExtension(context) {
        dependency_injection_1.DependencyInjectionInitializationService.initialize();
        servants_1.CommandRegistrationServant.registerCommands(context);
    }
}
exports.InitializationService = InitializationService;
//# sourceMappingURL=initialization.service.js.map