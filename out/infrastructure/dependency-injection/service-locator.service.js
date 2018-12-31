"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceLocatorService {
    static resolveService(serviceIdentifier) {
        const result = this._container.get(serviceIdentifier);
        return result;
    }
    static initialize(container) {
        this._container = container;
    }
}
exports.ServiceLocatorService = ServiceLocatorService;
//# sourceMappingURL=service-locator.service.js.map