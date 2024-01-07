export let getFormattedLang = function(crtLang:string){
  // let crtLang = TranslationUtils.CurrentLanguage
  if(crtLang == 'zh_CN'){
    return 'zh-hans'
  }
  if(crtLang == 'zh_HK'){
    return 'zh-hant'
  }
  if(crtLang=='en_US'){
    return 'en'
  }
  return crtLang;
}

export let GetUserActualClientLang = function (): string {
    // if url is specified, then forcebly use this once
    let matchResult = location.href.match(/\/app\/([^\/]+)/)
    if(matchResult){
      let prevValue = matchResult[1]
      if(prevValue == 'zh-hans'){
        prevValue = 'zh_CN'
      }
      if(prevValue == 'zh-hant'){
        prevValue = 'zh_HK'
      }
      if (prevValue == 'en') {
        prevValue = 'en_US'
      }
      return prevValue;
    }
  
    
  
    let finalLang = "en_US";
    if(!navigator || !navigator.languages){
      return finalLang
    }
    let found=false;
    navigator.languages.forEach(locale_str=>{
      if(found)return;
      if (locale_str == "zh-CN") {
        found=true;
        finalLang = "zh_CN";
      } else if (locale_str == "zh-TW" || locale_str == "zh-HK") {
        found=true;
        finalLang = "zh_HK";
      }
    })
    return finalLang
  }
  