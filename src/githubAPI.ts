// async function fetchGitHubData(username: string, token: string): Promise<void> {
//     const headers = {
//       Authorization: `token ${token}`,
//     };
  
//     // Obter a lista de repositórios do usuário
//     const reposUrl = `https://api.github.com/users/${username}/repos`;
  
//     try {
//       const reposResponse = await fetch(reposUrl, { headers });
//       if (!reposResponse.ok) {
//         throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
//       }
  
//       const repos = await reposResponse.json();
  
//       for (const repo of repos) {
//         const languagesUrl = repo.languages_url;
  
//         // Obter as linguagens do repositório
//         const languagesResponse = await fetch(languagesUrl, { headers });
//         if (!languagesResponse.ok) {
//           throw new Error(
//             `Erro ao buscar linguagens do repositório ${repo.name}: ${languagesResponse.status}`
//           );
//         }
  
//         const languages = await languagesResponse.json();
//         console.log(`Repositório: ${repo.name}`);
//         console.log("Linguagens usadas:", languages);
//       }
//     } catch (error) {
//       console.error("Erro:", error);
//     }
//   }