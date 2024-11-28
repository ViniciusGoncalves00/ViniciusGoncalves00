import Alpine from "alpinejs";

import { RepositoryHandler
} from "./RepositoryHandler";

function init_stores() {
    Alpine.store("repository_handler", () =>
        ({
            handler: new RepositoryHandler(),
            reposNames: [] as string[],
            
            async GetRepos()
            {
                this.reposNames = await this.handler.GetRepositoriesNames
                (
                    "viniciusgoncalves00",
                    "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"
                );
            }
        })
    );
}

document.addEventListener("alpine:init", () => {
    init_stores();
});