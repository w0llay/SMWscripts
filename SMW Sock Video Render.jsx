var doc = app.activeDocument;
var layer = doc.activeLayer;
var renderName = doc.name;
var renderSavePath = activeDocument.path.fsName + "/rendered"
var renderSaveFolder = Folder(renderSavePath)
if(!renderSaveFolder.exists) renderSaveFolder.create();
// var layeredSavePath = activeDocument.path.fsName + "/layered"
// var layeredSaveFolder = Folder(layeredSavePath)
// if(!layeredSaveFolder.exists) layeredSaveFolder.create();
// layeredFile = new File(layeredSavePath+'/'+doc.name)
// doc.saveAs(layeredFile)


renderSock()
function renderSock(){
// =======================================================
var idexport = stringIDToTypeID( "export" );
    var desc1942 = new ActionDescriptor();
    var idusing = stringIDToTypeID( "using" );
        var desc1943 = new ActionDescriptor();
        var iddirectory = stringIDToTypeID( "directory" );
        desc1943.putPath( iddirectory, new File( renderSavePath ) );
        var idname = stringIDToTypeID( "name" );
        desc1943.putString( idname, renderName );
        var idameFormatName = stringIDToTypeID( "ameFormatName" );
        desc1943.putString( idameFormatName, """H.264""" );
        var idamePresetName = stringIDToTypeID( "amePresetName" );
        desc1943.putString( idamePresetName, """1_High Quality.epr""" );
        var iduseDocumentSize = stringIDToTypeID( "useDocumentSize" );
        desc1943.putBoolean( iduseDocumentSize, true );
        var iduseDocumentFrameRate = stringIDToTypeID( "useDocumentFrameRate" );
        desc1943.putBoolean( iduseDocumentFrameRate, true );
        var idpixelAspectRatio = stringIDToTypeID( "pixelAspectRatio" );
        var idpixelAspectRatio = stringIDToTypeID( "pixelAspectRatio" );
        var iddocument = stringIDToTypeID( "document" );
        desc1943.putEnumerated( idpixelAspectRatio, idpixelAspectRatio, iddocument );
        var idfieldOrder = stringIDToTypeID( "fieldOrder" );
        var idvideoField = stringIDToTypeID( "videoField" );
        var idpreset = stringIDToTypeID( "preset" );
        desc1943.putEnumerated( idfieldOrder, idvideoField, idpreset );
        var idmanage = stringIDToTypeID( "manage" );
        desc1943.putBoolean( idmanage, true );
        var idinFrame = stringIDToTypeID( "inFrame" );
        desc1943.putInteger( idinFrame, 0 );
        var idoutFrame = stringIDToTypeID( "outFrame" );
        desc1943.putInteger( idoutFrame, 215 );
        var idrenderAlpha = stringIDToTypeID( "renderAlpha" );
        var idalphaRendering = stringIDToTypeID( "alphaRendering" );
        var idnone = stringIDToTypeID( "none" );
        desc1943.putEnumerated( idrenderAlpha, idalphaRendering, idnone );
        var idquality = stringIDToTypeID( "quality" );
        desc1943.putInteger( idquality, 1 );
        var idZthreeDPrefHighQualityErrorThreshold = stringIDToTypeID( "Z3DPrefHighQualityErrorThreshold" );
        desc1943.putInteger( idZthreeDPrefHighQualityErrorThreshold, 5 );
    var idvideoExport = stringIDToTypeID( "videoExport" );
    desc1942.putObject( idusing, idvideoExport, desc1943 );
executeAction( idexport, desc1942, DialogModes.NO );
}
