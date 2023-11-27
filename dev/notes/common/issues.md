
# NPM issue  
## Error: The specified module could not be found.  

It's a common issue in Windows OS, please install the runtime which can be found in dev/source/VC_redist.x64.exe  


# network connectivity issues in China  
In China, it's probably facing some connectivity issue while downloading deps, this section includes common cases in China.  

## git cannot push/pull   
setup your proxy for Git, like below:  
```bash
git config --global http.proxy http://127.0.0.1:7890
```  
