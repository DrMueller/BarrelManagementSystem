"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const services_1 = require("../../areas/services");
const implementation_1 = require("../../areas/services/implementation");
const servants_1 = require("../../areas/services/servants");
const implementation_2 = require("../../areas/services/servants/implementation");
const service_locator_service_1 = require("./service-locator.service");
class DependencyInjectionInitializationService {
    static initialize() {
        const container = new inversify_1.Container();
        this.applyMappings(container);
        service_locator_service_1.ServiceLocatorService.initialize(container);
    }
    static applyMappings(container) {
        container.bind(servants_1.BarrelFileRepositoryServiceName).to(implementation_2.BarrelFileRepositoryService);
        container.bind(services_1.BarrelServiceName).to(implementation_1.BarrelService);
        container.bind(servants_1.TypeScriptFilesSearchingServantName).to(implementation_2.TypeScriptFilesSearchingServant);
        container.bind(servants_1.GlobFactoryServiceName).to(implementation_2.GlobFactoryServant);
        container.bind(servants_1.FolderServantName).to(implementation_2.FolderServant);
    }
}
exports.DependencyInjectionInitializationService = DependencyInjectionInitializationService;
//# sourceMappingURL=dependency-injection-initialization.service.js.map