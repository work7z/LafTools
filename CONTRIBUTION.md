## Pre-requisites

To start developing this project, please ensure that you have installed below SDK and software below first, and kindly pay attention to their version for fear of any incompatiblity.

- Node v14.17.3 and later
- Go 1.21.1 and later
- Git Bash
- Visual Studio Code

Before modifying the source code, you should read the below sections to learn the architecture and technical details.

## Technologies

To start developing, please check if you are familiar with the technologies we used.  No need to learn all of them if not, it’s ok if you are only familiar with F/E or B/E technologies, we have unit tests and pull request workflow to ensure your changes is done properly. 

We’re looking forward to your contribution.

For Front-end development:
- React
- BluePrint.js
- Tailwind.css

For Back-end development:
- Go
- Node.js

For desktop/client development:
- Wails.io
- Electron
- Browser Extension

To write our docs concisely, we will not elaborate every detail about those 3rd library here, kindly read the source code for further detail.


## Architecture 

TODO: 

Client (Web, Desktop, IDE Plugin)
<interact with>
Server SIde Go 
<interact with>
Server Side Node


## Specifications 

### Tools Implementation

To make sure all tools are supported on all UI clients (Web, Desktop, IDE, mobile, etc…), it is recommended that we implement the logic of tools on the server side, not the client side.

For instance, if you want to convert a base64 text into plain text, we should always do the conversion on the server side although there’s a quicker way to do it in the browser directly, which takes user experiences and tool compatibility into consideration.

### Node Module Design

You probably noticed there’s a Node.js server module in the architecture. Why should we use Node.js in this software, isn’t it eating our memory? Aren’t we are we pursuing low memory usage?

The reason why we bring Node worker is to :
- Utilize the ecosystem for extra tools logic in Node.js
- Define system menus, extensions, and config dynamically.
- Develop extensions without restarting the Go service.

To avoid the Node worker keeps eating u machine’s memory, we adopt the below strategy:
- Run Node as a sub-process in Go.
- Only run it when there’s a necessity.
- Using WebSocket as the protocol between Go and Node.
- Terminate Node if there’s no new request for it.

For instance, when you click a button to beautify a piece of code, the client will send a request to the server side. Note that the server side is the Go service. 

Then, the Go service receives and detects this request depending on the Node service, accordingly, it will:  
- Check if Node is still alive.
- If not then just launch it and keep waiting until Node is active. 
- Publish a job to the node worker.
- Waiting for the response from the Node worker.

Once the Node worker completes the process, it will return the data to Go(service) via WebSocket protocol.

## Code Style

To have a good software quality and strong international support, please follow the code styles as below:
- Any label, text or message in front-end or back-end project that will be visible to users should be wrriten in English, and be wrapped by Dot function. (Learn more in i18n setup).
- Any comment for your changes should also be written in English.  
- Consider performance and extensibility in your code.



## Next Chapter

Great! You’ve learned the architecture and basic technical detail about this project. 

Now, you can click below sections to learn more if you’re still interested. 

- How to translate texts by using i18n config?
- How to develop and build for front-end project?
- How to develop and build for back-end project?
- How to write my extension?
- How to run unit tests?
- How to build the binary from source code?

For sure, there's also a FAQ link for your reference.

Lastly, we appreciate that you want to contribute to this project. Should you had any issues or bewilderments, feel free to contact us via Github issue at any time.


Thanks and Regards,
Laftools Team
