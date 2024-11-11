#include "/Applications/Adobe Photoshop 2025/Presets/Scripts/SMWscripts/SMW Script Core.jsx"

origFiles = (new Folder("/Volumes/willr drive/SMW Local/SMW240369 S25/Apparel and Accessories/Finals/7-11-2024 Finals")).getFiles()
cloneFiles = (new Folder("/Volumes/willr drive/SMW Local/SMW240369 S25/Apparel and Accessories/Video/Missing MOVs/PSD/rendered/for meta")).getFiles()
origList = []
cloneList = []

for (var i = 0; i < origFiles.length;i++){
    if(/*origFiles[i].name.indexOf(".mov")>-1||origFiles[i].name.indexOf(".mp4")>-1||origFiles[i].name.indexOf(".png")>-1||origFiles[i].name.indexOf(".jpg")>-1||origFiles[i].name.indexOf(".tif")>-1||*/origFiles[i].name.indexOf(".psd")>-1){
        origList.push(origFiles[i])
    }
}

for (var i = 0; i < cloneFiles.length;i++){
    if(cloneFiles[i].name.indexOf(".mov")>-1||cloneFiles[i].name.indexOf(".mp4")>-1||cloneFiles[i].name.indexOf(".png")>-1||cloneFiles[i].name.indexOf(".jpg")>-1||cloneFiles[i].name.indexOf(".tif")>-1||cloneFiles[i].name.indexOf(".psd")>-1){
        cloneList.push(cloneFiles[i])
    }
}

for(var i = 0; i < origList.length;i++){
    for(var q = 0; q < cloneList.length;q++){
        if(getSmwItem(origList[i].name) == getSmwItem(cloneList[q].name)){
            origMeta = getMetadata(origList[i])
            alert(origMeta)
            setMetadata(cloneList[q], true, String(origMeta[0]), String(origMeta[1]), String(origMeta[2]), String(origMeta[3]), String(origMeta[4]), String(origMeta[5]), String(origMeta[6]), String(origMeta[7]), String(origMeta[8]), /*String(origMeta[9])*/"global, internet (includes web) and social media, no paid social media, no OOH or broadcast", String(origMeta[10]))
        }
    }
}