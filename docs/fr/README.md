<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - La nouvelle génération d'une boîte à outils polyvalente conçue pour les programmeurs
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Aperçu de la version Insider de LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Cette page est générée à partir de LafTools en interne.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  Français  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

Pour utiliser rapidement ces fonctions, nous proposons des sites Web en ligne stables que les utilisateurs de différentes régions peuvent utiliser. À l'exception des outils mineurs pouvant nécessiter la prise en charge de votre système local, la plupart des outils sont disponibles sur Internet.

Noté Nous avons fourni deux sites Web en ligne LafTools pour différentes régions afin d'améliorer l'expérience utilisateur. Si vous rencontrez une instabilité lors de l'accès, veuillez vous assurer d'avoir sélectionné le bon site Web pour votre région. Si le problème persiste, n'hésitez pas à nous le faire savoir. Merci!

- 🇺🇸 Etats Unis: [laftools.dev](https://laftools.dev)
- 🇨🇳 Chine continentale uniquement: [laf-tools.com](https://laf-tools.com)

# 💡 Introduction

Vous vous demandez peut-être pourquoi nous sommes déterminés à développer cette boîte à outils alors qu'il existe de nombreux outils utilisables sur Internet. En effet, la plupart des outils que nous avons fournis peuvent être facilement trouvés sur Internet, comme le codec, le formateur, la traduction, le QR Code, etc… Cependant, ce n'est pas l'approche la plus confortable et la plus efficace pour utiliser ces outils.

Avez-vous déjà rencontré les problèmes ci-dessous lors de l'utilisation de ces outils en ligne ?

- Aucune accessibilité hors ligne.
- Pas de thème sombre global.
- Aucun style d'interface utilisateur productif.
- Mauvaises performances du réseau.
- Des publicités bouleversantes.
- Problème de fuite de données.

Si la réponse à l’une des questions ci-dessus est oui, vous devriez alors envisager d’essayer notre boîte à outils. Il offre les fonctionnalités suivantes :

- Logiciel libre pour toujours
- Durée d'exécution légère
- Prise en charge complète de la plateforme (y compris ARMv8)
- Prise en charge complète de type GPT
- Hautement intégré avec une interface utilisateur productive
- Images Docker disponibles et édition portable
- Aides supplémentaires telles que des notes, des manuels, etc...

# 🌠 Aperçu

> LafTools est encore en développement, son interface utilisateur, ses dépendances ou ses prérequis peuvent être modifiés selon les besoins.

### Aperçu:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Commencer

## 0. Refactorisation

Récemment, nous refactorisons l'architecture de LafTools basée sur next.js, les étapes ci-dessous peuvent être modifiées selon les besoins.

## 1. Configuration de l'environnement système

Par souci de simplicité, disons que vous avez cloné ce référentiel sur `C:\Usersjerry\project\laftools-repo` sous Windows ou `/Users/jerry/projects/laftools-repo` sur Linux/MacOS, vous devez alors déclarer env et définir la configuration ci-dessous dans votre fichier **~/.bashrc* *, ou exécutez-les simplement avant d'exécuter une commande.

Si vous utilisez le système d'exploitation Windows, assurez-vous que toutes les commandes sont exécutées dans git-bash. Pour en savoir plus, veuillez vous référer à [CONTRIBUTION](/docs/fr/CONTRIBUTION.md). En dehors de cela, il est recommandé d’éviter d’utiliser des espaces ou des caractères non anglais dans le chemin du fichier où se trouve ce projet.

**Env for Windows:**

```bash
git config core.ignorecase false
export LAFTOOLS_ROOT="C:\users\jerry\project\laftools-repo"
export PATH=$PATH:$LAFTOOLS_ROOT\dev\source\windows-bin
```

**Env for Linux/MacOS:**

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## 2. Lancer le service Go (refactorisation)

Pour exécuter le service Go dans le terminal, vous pouvez exécuter la commande ci-dessous :

```shell
go run ./core/app.go server
```

Pour déboguer le service Go, nous l'avons configuré dans VSCode, vous pouvez simplement suivre les étapes ci-dessous :

1. Saisissez Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Lancer le module FrontEnd (déplacé vers web2)

```bash
# installer la bibliothèque globale requise
npm i -g pnpm ts-node typescript

# installer les départements du projet
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # C'est pour Windows uniquement, cela fermera tous les terminaux et processus précédents.

# exécuter le service Web sur le terminal 1
npm run fe-web

# exécuter le processeur CSS sur le terminal 2
npm run fe-css

# exécuter des tâches supplémentaires sur le terminal 3
npm run fe-extra

```

Notez que vous pouvez utiliser le symbole « & » pour l'exécution en arrière-plan si vous ne souhaitez pas exécuter ces commandes dans des instances de terminal distinctes.

## 4. Commencer à développer

Une fois le service Go exécuté, vous devriez pouvoir voir un lien imprimé dans le terminal. Maintenant, copiez cette URL et collez-la dans votre navigateur pour commencer le développement, c'est parti !

Exemple:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Construire

```bash
cd pipeline
./build-all.sh
```

# 🌱 C'est quoi ce nom ?

#### _The Tools for Laffin' At Life_

Le nom de ce projet est inspiré de « Laffin' At Life », une chanson country classique de 1987 de Chet Atkins qui occupe également une place particulière dans le cœur de l'auteur.

Espérons que LafTools facilitera vos tâches quotidiennes, en réduisant le besoin d'heures supplémentaires et en vous aidant à maintenir un équilibre sain entre vie professionnelle et vie privée. Laissez-nous simplement profiter de la vie !

# 📑 Autres matériaux

Vous trouverez ci-dessous d'autres documents que vous pouvez consulter si vous souhaitez en savoir plus sur ce projet :

- [FAQ](/docs/fr/FAQ.md)
- [CONTRIBUTION](/docs/fr/CONTRIBUTION.md)
- [Pour les développeurs chinois](/devtools/notes/common/issues.md)

# 💐 Icons

Nous apprécierions les artistes talentueux qui fournissaient ci-dessous de belles icônes :
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Remerciements

Ce projet n'aurait pas été possible sans de superbes projets open source auxquels je voudrais personnellement exprimer ma plus profonde gratitude :

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Bien sûr, il existe d'autres projets open source qui ont bénéficié et facilité ce projet, que je n'ai pas pu détailler dans cette partie ; Sans ces projets et les efforts de ces développeurs de talents, LafTools n'aurait pas été possible.

Thank you!

Ryan Laf  
2 février 2023

# 🪪 License

Ce projet est protégé sous la licence publique générale GNU Affero, veuillez consulter le fichier LICENSE pour plus de détails.
