import axios from "axios";

export class RepositoryHandler
{
    public async GetRepositoriesNames(userName : string, token : string) : Promise<string[]>
    {
        const headers = {Authorization: `token ${token}`};

        const reposUrl = `https://api.github.com/users/${userName}/repos`;

        try
        {
            const response = await axios.get(reposUrl, { headers });

            const repos = response.data;
            const repoNames = repos.map((repo: { name: string }) => repo.name);
            return repoNames;
        }
        catch (error)
        {
            console.error("Error:", error);
            return [];
        }
    }
}