//Setup
var scriptPath = '\"' + File.decode(app.path) + "/Presets/Scripts" +'\"'
var repoPath = '\"' + File.decode(app.path) + "/Presets/Scripts/SMWscripts" +'\"'
app.system('cd ' + scriptPath + '\ngit clone https://github.com/w0llay/SMWscripts.git')
app.system('cd ' + repoPath + '\ngit init\ngit fetch origin\ngit reset --hard origin/main')
var SMWsettings = new File(File.decode(app.path) + "/Presets/Scripts/SMWsettings.csv")
if(!SMWsettings.exists){
    app.system('cd ' + scriptPath + '\ntouch SMWsettings.csv')
}

stagingPath = "/Volumes/willr drive/SMW Local/Smartwool Staging"

//FUNCTIONS
function getShotNum(name){
    var shotNum = "NULL FILE";
    for(var i = 0; i < name.length; i++){
        if(name.charAt(i) == '-'){
            shotNum = name.substring(i+1,i+2)
            i = name.length
        }
    }
    return(Number(shotNum))
}

function getSmwItem(name){
    var smwItem = "NULL FILE";
    for(var i = 0; i < name.length; i++){
        if(name.charAt(i) == '-'){
            smwItem = name.substring(0,i)
            i = name.length
        }
    }
    return(String(smwItem))
}
function fleuronReplace(str){
    if(typeof str === 'string'){
        var  dirtyFleuron = true
        while(dirtyFleuron == true){
            for (var i = 0; i < str.length; i++){
                if (str.charCodeAt(i)==10086){
                    str = str.substring(0,i) + ',' + str.substring(i+1, str.length)
                }
            }
            dirtyFleuron = false;
        }
        while(str.indexOf('❦') >= 0){
            str = str.replace('❦',',');
        }
    }
    return(str)
}

function commaReplace(str){
    if(typeof str === 'string'){
        while(str.indexOf(',') >= 0){
            str = str.replace(',','❦');
        }
    }
    return(str)
}

function isTrue(str){
    if(str == 'true'){
        return(true)
    }
    else{
        return(false)
    }
}

function CSVtoArray(CSVFile){
    CSVFile.open("r");
    var CSVStr = CSVFile.read();
    //alert(CSVStr)
    // CSVFile.close();
    var DELIMETER = ',';
    var NEWLINE = '\n';
    var QUOTE = '\"';
    var QUOTESTART = ',\"';
    var QUOTEEND = '\",'
    var QUOTELINE = "\"\n"
    var inQuotes = false;
    var cellStart = 0;
    var cellEnd = 0;
    var arr = []
    var row  = []
    for(var l = 0; l<CSVStr.length; l++){
        if(!inQuotes){
            if(l < CSVStr.length-QUOTESTART.length && CSVStr.substring(l,l+QUOTESTART.length) == QUOTESTART){
                inQuotes = true
                cellEnd = l;
                row.push(CSVStr.substring(cellStart,cellEnd))
                cellStart = l+QUOTESTART.length
            }
            else if(l < CSVStr.length-QUOTE.length && CSVStr.substring(l,l+QUOTE.length) == QUOTE){
                inQuotes = true
                cellStart = l+QUOTE.length
            }
            else if(l < CSVStr.length-DELIMETER.length && CSVStr.substring(l,l+DELIMETER.length) == DELIMETER){
                cellEnd = l;
                row.push(CSVStr.substring(cellStart,cellEnd))
                cellStart = cellEnd+DELIMETER.length;
            }
            else if(l < CSVStr.length-NEWLINE.length && CSVStr.substring(l,l+NEWLINE.length) == NEWLINE){
                cellEnd = l;
                row.push(CSVStr.substring(cellStart,cellEnd))
                cellStart = cellEnd+NEWLINE.length;
                arr.push(row)
                row=[];
            }
        }
        if(l < CSVStr.length-QUOTEEND.length && CSVStr.substring(l,l+QUOTEEND.length) == QUOTEEND){
            cellEnd = l;
            row.push(CSVStr.substring(cellStart,cellEnd))
            cellStart = cellEnd+QUOTEEND.length
            l++
            inQuotes = false
        }
        if(l < CSVStr.length-QUOTELINE.length && CSVStr.substring(l,l+QUOTELINE.length) == QUOTELINE){
            cellEnd = l;
            row.push(CSVStr.substring(cellStart,cellEnd))
            cellStart = cellEnd+QUOTELINE.length
            l++
            inQuotes = false
            arr.push(row)
            row=[];
        }
        if(l == CSVStr.length-1){
            cellEnd = CSVStr.length;
            row.push(CSVStr.substring(cellStart,cellEnd));
            cellStart = cellEnd;
            arr.push(row)
            row=[];
            inQuotes = false
        }
    }
    return(arr)
}
//     CSVFile.open("r");
//     var CSVStr = CSVFile.read();
//     CSVFile.close();
//     var DELIMETER = ',';
//     var NEWLINE = '\n';
//     var QUOTE = '\"';
//     var rows = CSVStr.split(NEWLINE);
//     var retArray = []
//     for (var i = 0; i < rows.length; i++){
//         var row = rows[i].split(DELIMETER)
//         var isInQuotes = false;
//         var quoteStart = 0;
//         for (var q = 0; q < row.length; q++){
//             if(row[q].charAt(0) == QUOTE){
//                 isInQuotes = true;
//                 quoteStart = q;
//             }
//             else if(isInQuotes == true){
//                 row[quoteStart]+= row[q]
//                 if(row[q].charAt(row[q].length-1) == QUOTE + DELIMETER){
//                     isInQuotes = false;
//                     row[quoteStart] = row[quoteStart].substring(1,row[quoteStart].length-1)
//                 }
//                 row.splice(q,1);
//                 q--
//             }
//         } 
//         retArray.push(row)
//     }
//     return(retArray)
// }

function exportPNG(savePath, fileName){
    // =======================================================
    var idexport = stringIDToTypeID( "export" );
    var desc260 = new ActionDescriptor();
    var idusing = stringIDToTypeID( "using" );
        var desc261 = new ActionDescriptor();
        var idOpspsp = charIDToTypeID( "Op  " );
        var idSWOp = charIDToTypeID( "SWOp" );
        var idOpSa = charIDToTypeID( "OpSa" );
        desc261.putEnumerated( idOpspsp, idSWOp, idOpSa );
        var idDIDr = charIDToTypeID( "DIDr" );
        desc261.putBoolean( idDIDr, true );
        var idin = stringIDToTypeID( "in" );
        desc261.putPath( idin, new File( savePath ) );
        var idpathName = stringIDToTypeID( "pathName" );
        desc261.putString( idpathName,  savePath + '/' + fileName);
        var idformat = stringIDToTypeID( "format" );
        var idIRFm = charIDToTypeID( "IRFm" );
        var idPNtwofour = charIDToTypeID( "PN24" );
        desc261.putEnumerated( idformat, idIRFm, idPNtwofour );
        var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
        desc261.putBoolean( idinterfaceIconFrameDimmed, false );
        var idtransparency = stringIDToTypeID( "transparency" );
        desc261.putBoolean( idtransparency, true );
        var idMttsp = charIDToTypeID( "Mtt " );
        desc261.putBoolean( idMttsp, true );
        var idEICC = charIDToTypeID( "EICC" );
        desc261.putBoolean( idEICC, false );
        var idMttR = charIDToTypeID( "MttR" );
        desc261.putInteger( idMttR, 255 );
        var idMttG = charIDToTypeID( "MttG" );
        desc261.putInteger( idMttG, 255 );
        var idMttB = charIDToTypeID( "MttB" );
        desc261.putInteger( idMttB, 255 );
        var idSHTM = charIDToTypeID( "SHTM" );
        desc261.putBoolean( idSHTM, false );
        var idSImg = charIDToTypeID( "SImg" );
        desc261.putBoolean( idSImg, true );
        var idSWsl = charIDToTypeID( "SWsl" );
        var idSTsl = charIDToTypeID( "STsl" );
        var idSLAl = charIDToTypeID( "SLAl" );
        desc261.putEnumerated( idSWsl, idSTsl, idSLAl );
        var idSWch = charIDToTypeID( "SWch" );
        var idSTch = charIDToTypeID( "STch" );
        var idCHsR = charIDToTypeID( "CHsR" );
        desc261.putEnumerated( idSWch, idSTch, idCHsR );
        var idSWmd = charIDToTypeID( "SWmd" );
        var idSTmd = charIDToTypeID( "STmd" );
        var idMDAl = charIDToTypeID( "MDAl" );
        desc261.putEnumerated( idSWmd, idSTmd, idMDAl );
        var idohXH = charIDToTypeID( "ohXH" );
        desc261.putBoolean( idohXH, false );
        var idohIC = charIDToTypeID( "ohIC" );
        desc261.putBoolean( idohIC, true );
        var idohAA = charIDToTypeID( "ohAA" );
        desc261.putBoolean( idohAA, true );
        var idohQA = charIDToTypeID( "ohQA" );
        desc261.putBoolean( idohQA, true );
        var idohCA = charIDToTypeID( "ohCA" );
        desc261.putBoolean( idohCA, false );
        var idohIZ = charIDToTypeID( "ohIZ" );
        desc261.putBoolean( idohIZ, true );
        var idohTC = charIDToTypeID( "ohTC" );
        var idSToc = charIDToTypeID( "SToc" );
        var idOCzerothree = charIDToTypeID( "OC03" );
        desc261.putEnumerated( idohTC, idSToc, idOCzerothree );
        var idohAC = charIDToTypeID( "ohAC" );
        var idSToc = charIDToTypeID( "SToc" );
        var idOCzerothree = charIDToTypeID( "OC03" );
        desc261.putEnumerated( idohAC, idSToc, idOCzerothree );
        var idohIn = charIDToTypeID( "ohIn" );
        desc261.putInteger( idohIn, -1 );
        var idohLE = charIDToTypeID( "ohLE" );
        var idSTle = charIDToTypeID( "STle" );
        var idLEzerothree = charIDToTypeID( "LE03" );
        desc261.putEnumerated( idohLE, idSTle, idLEzerothree );
        var idohEn = charIDToTypeID( "ohEn" );
        var idSTen = charIDToTypeID( "STen" );
        var idENzerozero = charIDToTypeID( "EN00" );
        desc261.putEnumerated( idohEn, idSTen, idENzerozero );
        var idolCS = charIDToTypeID( "olCS" );
        desc261.putBoolean( idolCS, false );
        var idolEC = charIDToTypeID( "olEC" );
        var idSTst = charIDToTypeID( "STst" );
        var idSTzerozero = charIDToTypeID( "ST00" );
        desc261.putEnumerated( idolEC, idSTst, idSTzerozero );
        var idolWH = charIDToTypeID( "olWH" );
        var idSTwh = charIDToTypeID( "STwh" );
        var idWHzeroone = charIDToTypeID( "WH01" );
        desc261.putEnumerated( idolWH, idSTwh, idWHzeroone );
        var idolSV = charIDToTypeID( "olSV" );
        var idSTsp = charIDToTypeID( "STsp" );
        var idSPzerofour = charIDToTypeID( "SP04" );
        desc261.putEnumerated( idolSV, idSTsp, idSPzerofour );
        var idolSH = charIDToTypeID( "olSH" );
        var idSTsp = charIDToTypeID( "STsp" );
        var idSPzerofour = charIDToTypeID( "SP04" );
        desc261.putEnumerated( idolSH, idSTsp, idSPzerofour );
        var idolNC = charIDToTypeID( "olNC" );
            var list6 = new ActionList();
                var desc262 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzerozero = charIDToTypeID( "NC00" );
                desc262.putEnumerated( idncTp, idSTnc, idNCzerozero );
            var idSCnc = charIDToTypeID( "SCnc" );
            list6.putObject( idSCnc, desc262 );
                var desc263 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNConenine = charIDToTypeID( "NC19" );
                desc263.putEnumerated( idncTp, idSTnc, idNConenine );
            var idSCnc = charIDToTypeID( "SCnc" );
            list6.putObject( idSCnc, desc263 );
                var desc264 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwoeight = charIDToTypeID( "NC28" );
                desc264.putEnumerated( idncTp, idSTnc, idNCtwoeight );
            var idSCnc = charIDToTypeID( "SCnc" );
            list6.putObject( idSCnc, desc264 );
                var desc265 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc265.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list6.putObject( idSCnc, desc265 );
                var desc266 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc266.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list6.putObject( idSCnc, desc266 );
                var desc267 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc267.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list6.putObject( idSCnc, desc267 );
        desc261.putList( idolNC, list6 );
        var idobIA = charIDToTypeID( "obIA" );
        desc261.putBoolean( idobIA, false );
        var idobIP = charIDToTypeID( "obIP" );
        desc261.putString( idobIP, """""" );
        var idobCS = charIDToTypeID( "obCS" );
        var idSTcs = charIDToTypeID( "STcs" );
        var idCSzeroone = charIDToTypeID( "CS01" );
        desc261.putEnumerated( idobCS, idSTcs, idCSzeroone );
        var idovNC = charIDToTypeID( "ovNC" );
            var list7 = new ActionList();
                var desc268 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzeroone = charIDToTypeID( "NC01" );
                desc268.putEnumerated( idncTp, idSTnc, idNCzeroone );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc268 );
                var desc269 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwozero = charIDToTypeID( "NC20" );
                desc269.putEnumerated( idncTp, idSTnc, idNCtwozero );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc269 );
                var desc270 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzerotwo = charIDToTypeID( "NC02" );
                desc270.putEnumerated( idncTp, idSTnc, idNCzerotwo );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc270 );
                var desc271 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNConenine = charIDToTypeID( "NC19" );
                desc271.putEnumerated( idncTp, idSTnc, idNConenine );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc271 );
                var desc272 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzerosix = charIDToTypeID( "NC06" );
                desc272.putEnumerated( idncTp, idSTnc, idNCzerosix );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc272 );
                var desc273 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc273.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc273 );
                var desc274 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc274.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc274 );
                var desc275 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc275.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc275 );
                var desc276 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwotwo = charIDToTypeID( "NC22" );
                desc276.putEnumerated( idncTp, idSTnc, idNCtwotwo );
            var idSCnc = charIDToTypeID( "SCnc" );
            list7.putObject( idSCnc, desc276 );
        desc261.putList( idovNC, list7 );
        var idovCM = charIDToTypeID( "ovCM" );
        desc261.putBoolean( idovCM, false );
        var idovCW = charIDToTypeID( "ovCW" );
        desc261.putBoolean( idovCW, false );
        var idovCU = charIDToTypeID( "ovCU" );
        desc261.putBoolean( idovCU, true );
        var idovSF = charIDToTypeID( "ovSF" );
        desc261.putBoolean( idovSF, true );
        var idovCB = charIDToTypeID( "ovCB" );
        desc261.putBoolean( idovCB, true );
        var idovSN = charIDToTypeID( "ovSN" );
        desc261.putString( idovSN, """images""" );
    var idSaveForWeb = stringIDToTypeID( "SaveForWeb" );
    desc260.putObject( idusing, idSaveForWeb, desc261 );
    executeAction( idexport, desc260, DialogModes.NO );
}

function exportJPG(savePath, fileName){
    // =======================================================
    var idexport = stringIDToTypeID( "export" );
    var desc242 = new ActionDescriptor();
    var idusing = stringIDToTypeID( "using" );
        var desc243 = new ActionDescriptor();
        var idOpspsp = charIDToTypeID( "Op  " );
        var idSWOp = charIDToTypeID( "SWOp" );
        var idOpSa = charIDToTypeID( "OpSa" );
        desc243.putEnumerated( idOpspsp, idSWOp, idOpSa );
        var idDIDr = charIDToTypeID( "DIDr" );
        desc243.putBoolean( idDIDr, true );
        var idin = stringIDToTypeID( "in" );
        desc243.putPath( idin, new File( savePath ) );
        var idpathName = stringIDToTypeID( "pathName" );
        desc243.putString( idpathName, savePath + '/' + fileName );
        var idformat = stringIDToTypeID( "format" );
        var idIRFm = charIDToTypeID( "IRFm" );
        var idJPEG = stringIDToTypeID( "JPEG" );
        desc243.putEnumerated( idformat, idIRFm, idJPEG );
        var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
        desc243.putBoolean( idinterfaceIconFrameDimmed, false );
        var idquality = stringIDToTypeID( "quality" );
        desc243.putInteger( idquality, 60 );
        var idQChS = charIDToTypeID( "QChS" );
        desc243.putInteger( idQChS, 0 );
        var idQCUI = charIDToTypeID( "QCUI" );
        desc243.putInteger( idQCUI, 0 );
        var idQChT = charIDToTypeID( "QChT" );
        desc243.putBoolean( idQChT, false );
        var idQChV = charIDToTypeID( "QChV" );
        desc243.putBoolean( idQChV, false );
        var idoptimized = stringIDToTypeID( "optimized" );
        desc243.putBoolean( idoptimized, true );
        var idPass = charIDToTypeID( "Pass" );
        desc243.putInteger( idPass, 1 );
        var idblur = stringIDToTypeID( "blur" );
        desc243.putDouble( idblur, 0.000000 );
        var idMttsp = charIDToTypeID( "Mtt " );
        desc243.putBoolean( idMttsp, true );
        var idEICC = charIDToTypeID( "EICC" );
        desc243.putBoolean( idEICC, false );
        var idMttR = charIDToTypeID( "MttR" );
        desc243.putInteger( idMttR, 255 );
        var idMttG = charIDToTypeID( "MttG" );
        desc243.putInteger( idMttG, 255 );
        var idMttB = charIDToTypeID( "MttB" );
        desc243.putInteger( idMttB, 255 );
        var idSHTM = charIDToTypeID( "SHTM" );
        desc243.putBoolean( idSHTM, false );
        var idSImg = charIDToTypeID( "SImg" );
        desc243.putBoolean( idSImg, true );
        var idSWsl = charIDToTypeID( "SWsl" );
        var idSTsl = charIDToTypeID( "STsl" );
        var idSLAl = charIDToTypeID( "SLAl" );
        desc243.putEnumerated( idSWsl, idSTsl, idSLAl );
        var idSWch = charIDToTypeID( "SWch" );
        var idSTch = charIDToTypeID( "STch" );
        var idCHsR = charIDToTypeID( "CHsR" );
        desc243.putEnumerated( idSWch, idSTch, idCHsR );
        var idSWmd = charIDToTypeID( "SWmd" );
        var idSTmd = charIDToTypeID( "STmd" );
        var idMDAl = charIDToTypeID( "MDAl" );
        desc243.putEnumerated( idSWmd, idSTmd, idMDAl );
        var idohXH = charIDToTypeID( "ohXH" );
        desc243.putBoolean( idohXH, false );
        var idohIC = charIDToTypeID( "ohIC" );
        desc243.putBoolean( idohIC, true );
        var idohAA = charIDToTypeID( "ohAA" );
        desc243.putBoolean( idohAA, true );
        var idohQA = charIDToTypeID( "ohQA" );
        desc243.putBoolean( idohQA, true );
        var idohCA = charIDToTypeID( "ohCA" );
        desc243.putBoolean( idohCA, false );
        var idohIZ = charIDToTypeID( "ohIZ" );
        desc243.putBoolean( idohIZ, true );
        var idohTC = charIDToTypeID( "ohTC" );
        var idSToc = charIDToTypeID( "SToc" );
        var idOCzerothree = charIDToTypeID( "OC03" );
        desc243.putEnumerated( idohTC, idSToc, idOCzerothree );
        var idohAC = charIDToTypeID( "ohAC" );
        var idSToc = charIDToTypeID( "SToc" );
        var idOCzerothree = charIDToTypeID( "OC03" );
        desc243.putEnumerated( idohAC, idSToc, idOCzerothree );
        var idohIn = charIDToTypeID( "ohIn" );
        desc243.putInteger( idohIn, -1 );
        var idohLE = charIDToTypeID( "ohLE" );
        var idSTle = charIDToTypeID( "STle" );
        var idLEzerothree = charIDToTypeID( "LE03" );
        desc243.putEnumerated( idohLE, idSTle, idLEzerothree );
        var idohEn = charIDToTypeID( "ohEn" );
        var idSTen = charIDToTypeID( "STen" );
        var idENzerozero = charIDToTypeID( "EN00" );
        desc243.putEnumerated( idohEn, idSTen, idENzerozero );
        var idolCS = charIDToTypeID( "olCS" );
        desc243.putBoolean( idolCS, false );
        var idolEC = charIDToTypeID( "olEC" );
        var idSTst = charIDToTypeID( "STst" );
        var idSTzerozero = charIDToTypeID( "ST00" );
        desc243.putEnumerated( idolEC, idSTst, idSTzerozero );
        var idolWH = charIDToTypeID( "olWH" );
        var idSTwh = charIDToTypeID( "STwh" );
        var idWHzeroone = charIDToTypeID( "WH01" );
        desc243.putEnumerated( idolWH, idSTwh, idWHzeroone );
        var idolSV = charIDToTypeID( "olSV" );
        var idSTsp = charIDToTypeID( "STsp" );
        var idSPzerofour = charIDToTypeID( "SP04" );
        desc243.putEnumerated( idolSV, idSTsp, idSPzerofour );
        var idolSH = charIDToTypeID( "olSH" );
        var idSTsp = charIDToTypeID( "STsp" );
        var idSPzerofour = charIDToTypeID( "SP04" );
        desc243.putEnumerated( idolSH, idSTsp, idSPzerofour );
        var idolNC = charIDToTypeID( "olNC" );
            var list4 = new ActionList();
                var desc244 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzerozero = charIDToTypeID( "NC00" );
                desc244.putEnumerated( idncTp, idSTnc, idNCzerozero );
            var idSCnc = charIDToTypeID( "SCnc" );
            list4.putObject( idSCnc, desc244 );
                var desc245 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNConenine = charIDToTypeID( "NC19" );
                desc245.putEnumerated( idncTp, idSTnc, idNConenine );
            var idSCnc = charIDToTypeID( "SCnc" );
            list4.putObject( idSCnc, desc245 );
                var desc246 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwoeight = charIDToTypeID( "NC28" );
                desc246.putEnumerated( idncTp, idSTnc, idNCtwoeight );
            var idSCnc = charIDToTypeID( "SCnc" );
            list4.putObject( idSCnc, desc246 );
                var desc247 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc247.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list4.putObject( idSCnc, desc247 );
                var desc248 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc248.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list4.putObject( idSCnc, desc248 );
                var desc249 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc249.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list4.putObject( idSCnc, desc249 );
        desc243.putList( idolNC, list4 );
        var idobIA = charIDToTypeID( "obIA" );
        desc243.putBoolean( idobIA, false );
        var idobIP = charIDToTypeID( "obIP" );
        desc243.putString( idobIP, """""" );
        var idobCS = charIDToTypeID( "obCS" );
        var idSTcs = charIDToTypeID( "STcs" );
        var idCSzeroone = charIDToTypeID( "CS01" );
        desc243.putEnumerated( idobCS, idSTcs, idCSzeroone );
        var idovNC = charIDToTypeID( "ovNC" );
            var list5 = new ActionList();
                var desc250 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzeroone = charIDToTypeID( "NC01" );
                desc250.putEnumerated( idncTp, idSTnc, idNCzeroone );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc250 );
                var desc251 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwozero = charIDToTypeID( "NC20" );
                desc251.putEnumerated( idncTp, idSTnc, idNCtwozero );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc251 );
                var desc252 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzerotwo = charIDToTypeID( "NC02" );
                desc252.putEnumerated( idncTp, idSTnc, idNCzerotwo );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc252 );
                var desc253 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNConenine = charIDToTypeID( "NC19" );
                desc253.putEnumerated( idncTp, idSTnc, idNConenine );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc253 );
                var desc254 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCzerosix = charIDToTypeID( "NC06" );
                desc254.putEnumerated( idncTp, idSTnc, idNCzerosix );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc254 );
                var desc255 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc255.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc255 );
                var desc256 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc256.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc256 );
                var desc257 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwofour = charIDToTypeID( "NC24" );
                desc257.putEnumerated( idncTp, idSTnc, idNCtwofour );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc257 );
                var desc258 = new ActionDescriptor();
                var idncTp = charIDToTypeID( "ncTp" );
                var idSTnc = charIDToTypeID( "STnc" );
                var idNCtwotwo = charIDToTypeID( "NC22" );
                desc258.putEnumerated( idncTp, idSTnc, idNCtwotwo );
            var idSCnc = charIDToTypeID( "SCnc" );
            list5.putObject( idSCnc, desc258 );
        desc243.putList( idovNC, list5 );
        var idovCM = charIDToTypeID( "ovCM" );
        desc243.putBoolean( idovCM, false );
        var idovCW = charIDToTypeID( "ovCW" );
        desc243.putBoolean( idovCW, false );
        var idovCU = charIDToTypeID( "ovCU" );
        desc243.putBoolean( idovCU, true );
        var idovSF = charIDToTypeID( "ovSF" );
        desc243.putBoolean( idovSF, true );
        var idovCB = charIDToTypeID( "ovCB" );
        desc243.putBoolean( idovCB, true );
        var idovSN = charIDToTypeID( "ovSN" );
        desc243.putString( idovSN, """images""" );
    var idSaveForWeb = stringIDToTypeID( "SaveForWeb" );
    desc242.putObject( idusing, idSaveForWeb, desc243 );
    executeAction( idexport, desc242, DialogModes.NO );
}

function setMetadata(activeFile, replace, creator, headline, description, altText, extendedDescription, keywords, title, rightsUsageTerms, personShown, additionalModelInfo, modelReleaseIdentifier){
    try{
        if ( !ExternalObject.AdobeXMPScript ) ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
        var xmpf = new XMPFile( File(activeFile).fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE );
        var xmp = xmpf.getXMP();
        if(replace){
            XMPUtils.removeProperties(xmp, "", "", XMPConst.REMOVE_ALL_PROPERTIES);
        }
        XMPMeta.registerNamespace("http://iptc.org/std/Iptc4xmpExt/2008-02-29/", "Iptc4xmpExt")
        XMPMeta.registerNamespace("http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/", "Iptc4xmpCore")
        XMPMeta.registerNamespace("http://ns.useplus.org/ldf/xmp/1.0/", "plus")
        XMPMeta.registerNamespace("http://ns.adobe.com/xap/1.0/rights/", "xmpRights")
        if(creator.length > 0){
            xmp.deleteProperty(XMPConst.NS_DC, "creator");
            xmp.appendArrayItem( XMPConst.NS_DC, "creator", 0,  creator , XMPConst.ARRAY_IS_ORDERED);
            xmp.setArrayItem( XMPConst.NS_DC, "creator", XMPConst.ARRAY_LAST_ITEM,  creator );
        }
        if(headline.length > 0){
            xmp.setProperty( XMPConst.NS_PHOTOSHOP, "Headline", headline , 0);
        }
        if(description.length > 0){
            xmp.setLocalizedText( XMPConst.NS_DC, "description", null, "x-default", description );
        }
        if(altText.length > 0){
            xmp.setLocalizedText( XMPConst.NS_IPTC_CORE, "AltTextAccessibility", null, "x-default", altText );
        }
        if(extendedDescription.length > 0){
            xmp.setLocalizedText( XMPConst.NS_IPTC_CORE, "ExtDescrAccessibility", null, "x-default", extendedDescription );
        }
        if(keywords.length > 0){
            xmp.deleteProperty( XMPConst.NS_DC, "subject");
            xmp.appendArrayItem( XMPConst.NS_DC, "subject", 0, keywords , XMPConst.ARRAY_IS_ORDERED );
            xmp.setArrayItem( XMPConst.NS_DC, "subject", XMPConst.ARRAY_LAST_ITEM, keywords );
        }
        if(title.length > 0){
            xmp.setLocalizedText( XMPConst.NS_DC, "title", null, "x-default", title );
        }
        if(rightsUsageTerms.length > 0){
            xmp.setLocalizedText( XMPConst.NS_XMP_RIGHTS, "UsageTerms", null, "x-default", rightsUsageTerms );
        }
        if(personShown.length > 0){
            xmp.deleteProperty("http://iptc.org/std/Iptc4xmpExt/2008-02-29/", "PersonInImage");
            xmp.appendArrayItem("http://iptc.org/std/Iptc4xmpExt/2008-02-29/", "PersonInImage", 0, personShown, XMPConst.ARRAY_IS_ORDERED);
            xmp.setArrayItem("http://iptc.org/std/Iptc4xmpExt/2008-02-29/", "PersonInImage", XMPConst.ARRAY_LAST_ITEM, personShown);
        }
        if(additionalModelInfo.length > 0){
            xmp.setProperty("http://iptc.org/std/Iptc4xmpExt/2008-02-29/","AddlModelInfo", additionalModelInfo, 0);
        }
        if(modelReleaseIdentifier.length > 0){
            xmp.deleteProperty("http://ns.useplus.org/ldf/xmp/1.0/", "ModelReleaseID");
            xmp.appendArrayItem("http://ns.useplus.org/ldf/xmp/1.0/", "ModelReleaseID", 0, modelReleaseIdentifier, XMPConst.ARRAY_IS_ORDERED);
            xmp.setArrayItem("http://ns.useplus.org/ldf/xmp/1.0/", "ModelReleaseID", XMPConst.ARRAY_LAST_ITEM, modelReleaseIdentifier);
        }

        if (xmpf.canPutXMP( xmp )) {
            xmpf.putXMP( xmp );
        }
        xmpf.closeFile( XMPConst.CLOSE_UPDATE_SAFELY );
    }
    catch(e){alert(e)}
}

function getMetadata(activeFile){
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
    try{
        if ( !ExternalObject.AdobeXMPScript ) ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
        var xmpf = new XMPFile( File(activeFile).fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ );
        var xmp = xmpf.getXMP();
        try{XMPMeta.registerNamespace("http://iptc.org/std/Iptc4xmpExt/2008-02-29/", "Iptc4xmpExt");}catch(e){}
        try{XMPMeta.registerNamespace("http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/", "Iptc4xmpCore");}catch(e){}
        try{XMPMeta.registerNamespace("http://ns.useplus.org/ldf/xmp/1.0/", "plus");}catch(e){}
        try{XMPMeta.registerNamespace("http://ns.adobe.com/xap/1.0/rights/", "xmpRights");}catch(e){}
        try{creator = xmp.getArrayItem( XMPConst.NS_DC, "creator", XMPConst.ARRAY_LAST_ITEM );}catch(e){}
        try{headline = xmp.getProperty( XMPConst.NS_PHOTOSHOP, "Headline");}catch(e){}
        try{description = xmp.getLocalizedText( XMPConst.NS_DC, "description", null, "x-default" );}catch(e){}
        try{altText = xmp.getLocalizedText( XMPConst.NS_IPTC_CORE, "AltTextAccessibility", null, "x-default");}catch(e){}
        try{extendedDescription = xmp.getLocalizedText( XMPConst.NS_IPTC_CORE, "ExtDescrAccessibility", null, "x-default" );}catch(e){}
        try{keywords = xmp.getArrayItem( XMPConst.NS_DC, "subject", XMPConst.ARRAY_LAST_ITEM );}catch(e){}
        try{title = xmp.getLocalizedText( XMPConst.NS_DC, "title", null, "x-default");}catch(e){}
        try{rightsUsageTerms = xmp.getLocalizedText( XMPConst.NS_XMP_RIGHTS, "UsageTerms", null, "x-default" );}catch(e){}
        try{personShown = xmp.getArrayItem("http://iptc.org/std/Iptc4xmpExt/2008-02-29/", "PersonInImage", XMPConst.ARRAY_LAST_ITEM);}catch(e){}
        try{additionalModelInfo = xmp.getProperty("http://iptc.org/std/Iptc4xmpExt/2008-02-29/","AddlModelInfo");}catch(e){}
        try{modelReleaseIdentifier = xmp.getArrayItem("http://ns.useplus.org/ldf/xmp/1.0/", "ModelReleaseID", XMPConst.ARRAY_LAST_ITEM);}catch(e){}
        xmpf.closeFile( 0 );
    }
    catch(e){alert(e)}
    return([creator,headline,description,altText,extendedDescription,keywords,title,rightsUsageTerms,personShown,additionalModelInfo,modelReleaseIdentifier])
}

function copyNoReplace(file, location){
    var copyName = location +"/"+file.name
    var dupeNumber = 1
    while(File(copyName).exists){
        copyName = location +"/"+file.name;
        copyName = copyName.substring(0, copyName.length-4) + "_" + dupeNumber + copyName.substring(copyName.length-4,copyName.length);
        dupeNumber++;
    }
    file.copy(copyName)
}

function getSetting(key){
    var ret
    settingsArray = CSVtoArray(SMWsettings)
    for(var i = 0; i < settingsArray.length; i++){
        if(SMWsettings[i][0]==key){
            ret = SMWsettings[i][1]
        }
    }
    return(ret)
}

function putSetting(key, value){
    var newKey = true
    settingsArray = CSVtoArray(SMWsettings)
    for(var i = 0; i < settingsArray.length; i++){
        if(SMWsettings[i][0]==key){
            SMWsettings[i][1] = value
            newKey = false
        }
    }
    if(newKey){
        settingsArray.push([key, value])
    }

    arrayToCSV(SMWsettings, settingsArray)
}

function arrayToCSV(CSVfile, arr){
    var DELIMETER = ',';
    var NEWLINE = '\n';
    var QUOTE = '\"';
    var str = ""
    if(typeof CSVfile == String){
        CSVfile = new File(CSVfile)
    }
    CSVfile.open("w");
    for(var i = 0; i < arr.length; i++){
        for(var q = 0; q < arr[i].length; q++){
            if(arr[i][q].indexOf(DELIMETER)>=0||arr[i][q].indexOf(NEWLINE)>=0||arr[i][q].indexOf(QUOTE)>=0){
                str+= QUOTE + arr[i][q] + QUOTE
            }
            else{
                str+= arr[i][q]
            }
            if(q < arr[i].length-1){
                str+= DELIMETER
            }
            else if(i < arr.length-1){
                str+= NEWLINE
            }
        }
    }
    CSVfile.write(str)
    CSVfile.close()
}