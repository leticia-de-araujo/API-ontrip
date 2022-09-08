# backend-ontrip

> ## Padrões de código

<br>

- Código totalmente em **inglês**
- Nomes de **variáveis** e de **funções** **descritivas**
- Nomes de **variáveis** e de **funções** em **camelCase**
- **Arrow functions**
- Declarar **variáveis** com **const**
  - _Apenas utilizar let quando necessário_
- Nomes de **arquivos** e **pastas** começando com **letra minúscula** e em **camelCase**
  - _Apenas começar com letra maiúscula quando for Class e Entity_
- Antes de fazer PR para a develop, **apagar** os **console.logs** desnecessários

<br>

> ## Padrões GIT

<br>

- Também em **inglês**

### Branches

- **Nomenclatura**
  - feat/featureName
- Sempre criar uma **branch nova** a partir da **develop atualizada**
- **Uma branch** para cada **task/feature**

### Commits

- **Seguir o padrão do Conventional Commits**

 <br>

| _Type_       | _Meaning_                  | _Description_                                                                                                 |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **feat**     | Features                   | A new feature                                                                                                 |
| **fix**      | Bug Fixes                  | A bug fix                                                                                                     |
| **docs**     | Docume­ntation             | Docume­ntation only changes                                                                                   |
| **style**    | Styles                     | Changes that do not affect the meaning of the code (white­-space, format­ting, missing semi-c­olons, etc)     |
| **refactor** | Code Refact­oring          | A code change that neither fixes a bug nor adds a feature                                                     |
| **perf**     | Perfor­mance Improv­ements | A code change that improves perfor­mance                                                                      |
| **test**     | Tests                      | Adding missing tests or correcting existing tests                                                             |
| **build**    | Builds                     | Changes that affect the build system or external depend­encies (example scopes: gulp, broccoli, npm)          |
| **ci**       | Continuous Integr­ations   | Changes to our CI config­uration files and scripts (example scopes: Travis, Circle, Browse­rStack, SauceLabs) |
| **chore**    | Chores                     | Other changes that don’t modify src or test files                                                             |
| **revert**   | Reverts                    | Reverts a previous commit                                                                                     |

<br>

### Fluxo de desenvolvimento com o git

<br>

**Quando for criar uma nova branch:**

1. Vá para a develop, faça um git pull origin develop.
2. Crie a tua branch a partir da develop
3. Trabalhe na sua feature
4. Ao **finalizar**, siga o fluxo:

```javascript
- git add .
- git commit -m "message"
- git pull origin develop
- git push origin nomeDaSuaBranch
```

  <br>

**Quando for editar algo de uma branch já criada**

1. Vá para a branch que quer editar
2. Faça um git pull origin develop
3. Faça as edições que deseja
4. Ao **finalizar**, siga o fluxo:

```javascript
- git add .
- git commit -m "message"
- git pull origin develop
- git push origin nomeDaSuaBranch
```

### **-> Importante**

- Sempre depois de _terminar de trabalhar numa branch_, **seguir o fluxo acima**.
  - E depois disso, abrir um **Pull Request para a develop**, e me adicionar para dar **review** (leticia-de-araujo)
