import Alpine from 'alpinejs';
import { RepositoryHandler } from '../models/RepositoryHandler';

type RepositoryComponent = {
    username: string;
    token: string;
    repos: string[];
    fetchRepos: () => Promise<void>;
  };

export function repositoryComponent(): RepositoryComponent {
    const handler = new RepositoryHandler();

    return {
      username: 'viniciusgoncalves00',
      token: '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',
      repos: [],
      async fetchRepos() {
        this.repos = await handler.GetRepositoriesNames(this.username, this.token);
      },
    };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('repositoryComponent', repositoryComponent);
});