
<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/sub/web/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - The next generation of a versatile toolbox designed for programmers
</span>
<br><br>
</p>

# 💡 Introduction 

You may wonder why we are determined to develop this toolbox if there are numerous alternatives exist for those commonly used tools on online websites.

Indeed, most tools in our toolbox can be found on any online website and you also can collect them easily into your favorites in the browser, such as common encryption and decryption, translation tools, generating QR codes, etc…  

However, it’s not the simplest and quickest approach to access these conversion tools, in other words, not the most comfortable and efficient way. 

Have you ever met the below issues while using those online tools?
- No Offline Accessibility.
- No Global Dark Theme.
- No Productive UI style.
- Poor Network Performance.
- Upsetting Advertisements
- Data Leakage Issue.

If the answer to any of the above is yes, then you should consider trying our toolbox. It offers the following features:
- Fully open-source code with no malicious logic
- Lightweight runtime (requires only 6MB of RAM)
- Full platform support (including ARMv8)
- Native AI support (similar to ChatGPT)
- Highly integrated with a productive UI
- Continuous addition of new tools in the future
- Can be used over the web and with Docker
- Extra helpers such as notes, manuals, etc...

Example Preview:
Here are some screenshots for you to preview how this toolbox works.

(TO BE CONTINUE)


# 🍀 Getting Started   
> If you're using Windows, please ensure below commands will be executed in git-bash, further detail please [read contribution.md at first](CONTRIBUTION.md)

### Setup System Environment
Please note that you need to set several system environment variables in your bash. If you're unsure how to do this, you can simply execute the following commands each time you open a new terminal:  
```bash
#  For instance, if you've cloned this repository to `/users/xxxx/we/laftools-repo`, then you should set this path as the value for `LAFTOOLS_ROOT`:
export LAFTOOLS_ROOT=/users/xxxx/we/laftools-repo
```

### Launch Go service
We have configured the local development config for Go in the file .vscode/launch.json
1. Enter Visual Studio Code    
2. Click "Run and Debug" on your sidebar  
3. Click Run button.

### Launch Front-end project
```bash
cd sub/web 
# install deps
npm i -g ts-node tsc typescript
npm i -S -D --verbose 
# start webpack service 
npm run start 
```

### Access Local Service  
Once the Go service is running, you should see a URL in the output. Copy this URL and paste it into your browser to start developing!

For instance: 
```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh_CN users)
請復製下方鏈接並在瀏覽器端打開(for zh_HK users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}  
-----------------------------------------------
```

### Build  
this part will be updated once MVP is released.
> if you encounter any issue when you are developing LafTools or building your binary, please contact us at any time. 


## 🙋 Cool! So is it a free software?

Yes, you can follow the license but please notice that open-source software does not mean it’s a free service. 

It’s a PAID service if you’re a regular user.  

It’s a FREE service if you’re a contributor.

Nearly all commercial companies will adopt a closed source code strategy to ensure their trade secrets will not be theft from. 

But since we are developing a toolbox product, which usually stands closer to your private data. For the sake of your private documents and to solace your worries while using this toolbox,  we think it’s better to provide all source codes for you to review.

Also, we believe the source codes we provided as trade secrets in our team will not be theft as it's being safeguarded by the license we have chosen from the first day on.

## 🎗 Pricing or Contribution

Based on our years of project experience, we truly understand that a promising project and cloud service relies on the financial support of our users and contributions from the community.

Without a proper profit model, this project will not be sustainable and surely have no stability or quality unless we place numerous advertisements, and even steal private data from users, which is not what we want.

Thus, we decided to provide a reasonable plan to sustain this project, whose pricing would not be expensive but just related to the overhead of the project.   

Pricing Table can be viewed in this Link.

Of course, there’s another option instead of just paying the bill. 

As a professional programmer, you can contribute to this project and create a pull request for this project, then you could obtain a free premium membership for three months.

What you can do is to
- Add Unit Test
- Add New Tools
- Enhance Exist Tools
- Solve Any App Issue  
- Enhance Performance		
- Technical Implementation

[Read Contribution Docs](CONTRIBUTION.md)

With full test coverage and efforts from the CodeGen community, we are firmly convinced that the software can grow faster and stronger. 


## 🌠 Preview

Preview(English):
![](https://github.com/work7z/LafTools/blob/dev/dev-source/img-preview-en.png?raw=true)

Preview(简体中文):
![](https://github.com/work7z/LafTools/blob/dev/dev-source/img-preview.png?raw=true)



## A Letter to CodeGen ToolBox Users  
Greetings from the CodeGen ToolBox team. 

In the midst of this cold winter, we are thrilled to announce that CodeGen ToolBox has released its entire source code and has been renamed to LafTools for a more concise and specific product name. From this point forward, our team will also be known as the LafTools Team.  

Despite our software now being fully open source, we remain committed to serving our premium users as before. We are deeply grateful to those who have shown us their unreserved trust and generous support by upgrading to our premium account. Rest assured, your paid services will remain unaffected, and we are continually exploring ways to enhance this product.  

Our decision to completely open our source code was driven by the following reasons::   
- To conduct a security reviews 
- To demonstrate the void of malicious logic or backdoors  
- To welcome contributions from the community 
- To build a strong reputation and earn trust.  

We understand your concerns about potential hacking attempts to bypass the activation logic of the software. Indeed, we acknowledge this as a potential issue. However, we have realized that LafTools should thrive by selling services, not just software licenses.

We'd like to remind you below things: 
- Download our software from the official Github repository or our official website.
- Report any security issues you detect.
- Do not hesitate to submit your proposals for UI, tools, development, or any other aspects.

Lastly, we would like to express our gratitude for your time in reading this section.

Thank you!


Nov 18th, 2023
LafTools Team


## © CopyRights
All source codes in this project are protected by the License and copyright law in China.

You are permitted to use this software, whether built by us or by yourself, for personal or commercial use. However, please note that you may not use any of these source codes for commercial purposes unless you obtain permission from us. Failure to comply with this could be considered a breach of the license and agreement, and we may be forced to take legal action.

Additionally, you should not technically remove the activation logic in the source code and distribute it online. This is not in line with our intentions.

Thank you for your understanding!

Nov 18th, 2023
LafTools Team