import { Dot } from "./cTranslationUtils";

export async function js_export_trigger({ saveValue, filename, }) {
    function convertRes2BlobAndDownload(filename, data) {
        const blob = new Blob([data], {
            type: "application/octet-stream",
        });
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob);
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", decodeURI(filename));
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        // 挂载a标签
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL);
    }
    let fileName = window.prompt(Dot("iVfYXX1C5", "Enter file name"), filename || `result-${Date.now()}.txt`);
    if (!fileName) {
        return;
    }
    try {
        convertRes2BlobAndDownload(
            filename || `result-${Date.now()}.txt`,
            saveValue
        );
    } catch (e) {
        console.log("err", e);
    }
}


export default {

}