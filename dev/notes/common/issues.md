
# NPM issue  
### Error: The specified module could not be found.  

It's a common issue in Windows OS, please install the runtime which can be found in dev/source/VC_redist.x64.exe  

### cannot download deps   
Before downloading deps, make sure all previous node_modules has been removed from your devices.     

**If you're currently located in China, then please use cnpm instead of npm for a better network env.** 


# For Developers in China Mainland  
In China mainland, it's probably having some connectivity issue while downloading deps, this section includes common cases in China.  

Let's take proxy server is 127.0.0.1:54100 as example link.

### git cannot push/pull   
setup your proxy for Git, like below:  
```bash
git config --global http.proxy http://127.0.0.1:54100
```  

### cannot download dlv and other Go deps  

```bash
export HTTP_PROXY=http://127.0.0.1:54100
export HTTPS_PROXY=http://127.0.0.1:54100
go env -w  GOPROXY=https://goproxy.cn,direct
```
