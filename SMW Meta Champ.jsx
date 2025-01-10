#include "/Applications/Adobe Photoshop 2025/Presets/Scripts/SMWscripts/SMW Script Core.jsx"

var mainFile = File.openDialog("Please select Main Medatada CSV")
var modelFile = File.openDialog("Please select Model Metadata CSV")
if(mainFile != null && mainFile.name.indexOf(".csv">=0)){
    var mainList = CSVtoArray(mainFile)
    var selFolder = Folder.selectDialog("Please select folder with SMW files")
    var folderFiles = selFolder.getFiles()
    fileList = []

    for (var i = 0; i < folderFiles.length;i++){
        var fileName = folderFiles[i].name
        if(folderFiles[i] instanceof Folder){
            var subFolderFiles = folderFiles[i].getFiles()
            for(var q = 0; q < subFolderFiles.length; q++){
                folderFiles.push(subFolderFiles[q])
            }
        }
        if(folderFiles[i].name.indexOf(".mov")>-1||folderFiles[i].name.indexOf(".mp4")>-1||folderFiles[i].name.indexOf(".png")>-1||folderFiles[i].name.indexOf(".jpg")>-1||folderFiles[i].name.indexOf(".tif")>-1||folderFiles[i].name.indexOf(".psd")>-1){
            fileList.push(folderFiles[i])
        }
    }

    for (var i = 0; i < fileList.length;i++){
        var creator = ""
        var headline = ""
        var description = ""
        var altText = ""
        var extendedDescription = ""
        var keywords = ""
        var title = ""
        var rightsUsageTerms = ""
        var personShown = ""
        var additionalModelInfo = ""
        var modelReleaseIdentifier = ""
        var fileName = fileList[i].name
        var changed = false;
        for(var q = 0; q < mainList.length; q++){
            try{
                if(getSmwItem(fileName)==mainList[q][7]){
                    creator = mainList[q][1]
                    headline = mainList[q][2]
                    description = mainList[q][3]
                    altText = mainList[q][4]
                    extendedDescription = mainList[q][5]
                    keywords = mainList[q][6]
                    title = mainList[q][7]
                    rightsUsageTerms = mainList[q][8]
                    additionalModelInfo = mainList[q][10]//"global, internet (includes web) and social media, no paid social media, no OOH or broadcast"
                    if(fileList[i].name.indexOf(".mov")>-1||fileList[i].name.indexOf(".mp4")){
                        additionalModelInfo = "global, internet (includes web) and social media, no paid social media, no OOH or broadcast"
                    }
                    modelReleaseIdentifier = mainList[q][11]
                    changed = true;
                }
            }
            catch(e){alert(e)}
    
        }
        if(modelFile != null && modelFile.name.indexOf(".csv">=0)){
            var modelList = CSVtoArray(modelFile)
            for(var q = 0; q < modelList.length; q++){
                if(modelList[q][1].indexOf(getSmwItem(fileName))>=0){
                    var modelB = String(modelList[q][4])
                    var modelC = String(modelList[q][5])
                    if(modelB==modelC&&modelB.length>0){
                        personShown = modelB;
                    }
                    else if(modelB!=modelC&&modelB.length==0&&modelC.length>0){
                        personShown = modelB + ", " + modelC;
                    }
                    else if(modelB!=modelC&&modelC.length==0){
                        personShown = modelB;
                    }
                    else if(modelB!=modelC&&modelB.length==0){
                        personShown = modelC;
                    }
                    else if(personShown == "undefined"){
                        personShown = "";
                    }
                    changed = true;
                }
            }
        }
        if(changed){
            setMetadata(fileList[i], true, creator, headline, description, altText, extendedDescription, keywords, title, rightsUsageTerms, personShown, additionalModelInfo, modelReleaseIdentifier)
        }
    }
   

}
//var modelList = CSVtoArray(new File("/Volumes/willr drive/SMW Local/SMW240369 S25/Apparel and Accessories/Metadata/S25 Model List.csv"))

//var mainList = CSVtoArray(new File("/Volumes/willr drive/SMW Local/SMW240369 S25/Socks/Metadata/S25_Socks_metadata.csv"))
// var selFolder = Folder.selectDialog("Please select folder")
// var folderFiles = selFolder.getFiles()
// fileList = []




// for (var i = 0; i < folderFiles.length;i++){
//     var fileName = folderFiles[i].name
//     if(folderFiles[i] instanceof Folder){
//         var subFolderFiles = folderFiles[i].getFiles()
//         for(var q = 0; q < subFolderFiles.length; q++){
//             folderFiles.push(subFolderFiles[q])
//         }
//     }
//     if(folderFiles[i].name.indexOf(".mov")>-1||folderFiles[i].name.indexOf(".mp4")>-1||folderFiles[i].name.indexOf(".png")>-1||folderFiles[i].name.indexOf(".jpg")>-1||folderFiles[i].name.indexOf(".tif")>-1||folderFiles[i].name.indexOf(".psd")>-1){
//         fileList.push(folderFiles[i])
//     }
// }


// for (var i = 0; i < fileList.length;i++){
//     var creator = ""
//     var headline = ""
//     var description = ""
//     var altText = ""
//     var extendedDescription = ""
//     var keywords = ""
//     var title = ""
//     var rightsUsageTerms = ""
//     var personShown = ""
//     var additionalModelInfo = ""
//     var modelReleaseIdentifier = ""
//     var fileName = fileList[i].name
//     var changed = false;
//     // for(var q = 0; q < sockList.length; q++){
//     //     if(getSmwItem(fileName)==sockList[q][7]){
//     //         creator = sockList[q][1]
//     //         headline = sockList[q][2]
//     //         description = sockList[q][3]
//     //         altText = sockList[q][4]
//     //         extendedDescription = sockList[q][5]
//     //         keywords = sockList[q][6]
//     //         title = sockList[q][7]
//     //         rightsUsageTerms = sockList[q][8]
//     //         changed = true;
//     //     }
//     // }
//     for(var q = 0; q < mainList.length; q++){
//         try{
//             // if((getSmwItem(fileName)).substring(0,8)==(mainList[q][7]).substring(0,8)){
//             if(getSmwItem(fileName)==mainList[q][7]){
//                 creator = mainList[q][1]
//                 headline = mainList[q][2]
//                 description = mainList[q][3]
//                 altText = mainList[q][4]
//                 extendedDescription = mainList[q][5]
//                 keywords = mainList[q][6]
//                 title = mainList[q][7]
//                 rightsUsageTerms = mainList[q][8]
//                 additionalModelInfo = mainList[q][10]//"global, internet (includes web) and social media, no paid social media, no OOH or broadcast"
//                 modelReleaseIdentifier = mainList[q][11]
//                 changed = true;
//             }
//         }
//         catch(e){alert(e)}

//     }
//     // for(var q = 0; q < modelList.length; q++){
//     //     if(modelList[q][0].indexOf(getSmwItem(fileName))>=0){
//     //         var modelB = String(modelList[q][1])
//     //         var modelC = String(modelList[q][2])
//     //         if(modelB==modelC&&modelB.length>0){
//     //             personShown = modelB;
//     //         }
//     //         else if(modelB!=modelC&&modelB.length==0&&modelC.length>0){
//     //             personShown = modelB + ", " + modelC;
//     //         }
//     //         else if(modelB!=modelC&&modelC.length==0){
//     //             personShown = modelB;
//     //         }
//     //         else if(modelB!=modelC&&modelB.length==0){
//     //             personShown = modelC;
//     //         }
//     //         else if(personShown == "undefined"){
//     //             personShown = "";
//     //         }
//     //         changed = true;
//     //     }
//     // }
//     if(changed){
//         setMetadata(fileList[i], false, creator, headline, description, altText, extendedDescription, keywords, title, rightsUsageTerms, personShown, additionalModelInfo, modelReleaseIdentifier)
//     }
// }
