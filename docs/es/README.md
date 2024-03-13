<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - La próxima generación de una caja de herramientas versátil diseñada para programadores
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Vista previa de la versión Insider de LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Esta página se genera internamente desde LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  Español  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

To quickly use these functions, we've deployed stable online website in US and CN region for you to use. Most tools are available in our online websites except for some tools that rely on specific OS capablities.

- 🇺🇸 estado unido: [laftools.dev](https://laftools.dev)
- 🇨🇳 Solo China continental: [laf-tools.com](https://laf-tools.com)

# 💡 Introducción

Quizás se pregunte por qué estamos decididos a desarrollar esta caja de herramientas, ya que existen numerosas herramientas que se pueden utilizar en Internet. De hecho, la mayoría de las herramientas que hemos proporcionado se pueden encontrar fácilmente en Internet, como códec, formateador, traducción, código QR, etc. Sin embargo, no es el método más cómodo y eficiente para utilizar estas herramientas.

¿Alguna vez se ha encontrado con los siguientes problemas al utilizar esas herramientas en línea?

- Sin accesibilidad sin conexión.
- Sin tema oscuro global.
- Sin estilo de interfaz de usuario productivo.
- Mal rendimiento de la red.
- Anuncios perturbadores.
- Problema de fuga de datos.

Si la respuesta a cualquiera de las preguntas anteriores es sí, entonces debería considerar probar nuestra caja de herramientas. Ofrece las siguientes características:

- FOSS para siempre
- Tiempo de ejecución ligero
- Soporte completo de plataforma (incluido ARMv8)
- Soporte completo similar a GPT
- Altamente integrado con una interfaz de usuario productiva
- Imágenes Docker disponibles y edición portátil
- Ayudas adicionales como notas, manuales, etc...

# 🌠 Avance

> LafTools aún está en desarrollo, su interfaz de usuario, dependencias o requisitos previos pueden cambiar según sea necesario.

### Avance:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Empezando

## 0. Refactorización

Recientemente, estamos refactorizando la arquitectura de LafTools basada en next.js; los pasos a continuación pueden cambiar según sea necesario.

## 1. Configurar el entorno del sistema

En aras de la simplicidad, digamos que ha clonado este repositorio en `C:\Usersjerry\project\laftools-repo` en Windows o en `/Users/jerry/projects/laftools-repo` en Linux/MacOS, luego debe declarar env y establecer la configuración a continuación en su archivo **~/.bashrc* *, o simplemente ejecutarlos antes de ejecutar cualquier comando.

Si está utilizando el sistema operativo Windows, asegúrese de que todos los comandos se ejecuten en git-bash. Para obtener más información, consulte [CONTRIBUCIÓN](/docs/es/CONTRIBUTION.md). Aparte de esto, se recomienda evitar el uso de espacios en blanco o caracteres que no estén en inglés en la ruta del archivo donde se encuentra este proyecto.

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

## 2. Lanzar el servicio Go (refactorización)

Para ejecutar el servicio Go en la terminal, puede ejecutar el siguiente comando:

```shell
go run ./core/app.go server
```

Para depurar el servicio Go, lo hemos configurado en VSCode, simplemente puede seguir los pasos a continuación:

1. Introduzca Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Inicie el módulo FrontEnd (trasladado a web2)

```bash
# instalar la biblioteca global requerida
npm i -g pnpm ts-node typescript

# instalar departamentos de proyectos
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Es solo para Windows, cerrará todas las terminales y procesos anteriores.

# ejecutar servicio web en la terminal 1
npm run fe-web

# ejecutar el procesador CSS en la terminal 2
npm run fe-css

# ejecutar trabajos adicionales en la terminal 3
npm run fe-extra

```

Tenga en cuenta que puede utilizar el símbolo '&' para la ejecución en segundo plano si no desea ejecutar alternativamente estos comandos en instancias de terminal separadas.

## 4. Comience a desarrollar

Una vez que el servicio Go se esté ejecutando, debería poder ver un enlace impreso en la terminal. Ahora, copia esta URL y pégala en tu navegador para comenzar a desarrollar, ¡vamos!

Ejemplo:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Construir

```bash
cd pipeline
./build-all.sh
```

# 🌱 ¿Qué pasa con el nombre?

#### _The Tools for Laffin' At Life_

El nombre de este proyecto está inspirado en 'Laffin' At Life', una canción country clásica de 1987 de Chet Atkins que también tiene un lugar especial en el corazón del autor.

Con suerte, LafTools facilitará sus tareas diarias, reducirá la necesidad de horas extras y le ayudará a mantener un equilibrio saludable entre el trabajo y la vida personal. ¡Reirémonos de la vida!

# 📑 Otros materiales

A continuación se muestran más materiales que puede consultar si desea conocer más detalles sobre este proyecto:

- [Preguntas más frecuentes](/docs/es/FAQ.md)
- [CONTRIBUCIÓN](/docs/es/CONTRIBUTION.md)
- [Para desarrolladores chinos](/devtools/notes/common/issues.md)

# 💐 Icons

Agradeceríamos a los artistas talentosos que proporcionaron hermosos íconos a continuación:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Agradecimientos

Este proyecto no habría sido posible sin increíbles proyectos de código abierto a los que me gustaría expresar personalmente mi más profundo agradecimiento:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Seguramente hay otros proyectos de código abierto que han beneficiado y facilitado este proyecto, los cuales no podría detallar en esta parte; Sin estos proyectos y el esfuerzo de estos desarrolladores de talentos, LafTools no habría sido posible.

Thank you!

Ryan Laf  
2 de febrero de 2023

# 🪪 License

Este proyecto está protegido bajo la Licencia Pública General GNU Affero; consulte el archivo de LICENCIA para obtener más detalles.
