export let  pushClient = (url: string) => {
    let e = document.getElementById('grouter')
    if (!e) {
        alert("no push grouter element")
        return
    };
    e['href'] = url;
    // e.click()
}