var doc = app.activeDocument;
var layer = doc.activeLayer;
var renderName = doc.name;
var renderSavePath = activeDocument.path.fsName
for(l = renderSavePath.length-1; l > 0; l--){
    if(renderSavePath.charAt(l) == "/"){
        renderSavePath = renderSavePath.substring(0,l);
    }
}

render()

function render(){
	doc = app.activeDocument;
	var renderSavePath = activeDocument.path.fsName + "/rendered"
	var renderSaveFolder = Folder(renderSavePath)
	var renderName = doc.name;
	if(!renderSaveFolder.exists) renderSaveFolder.create();
	
	// =======================================================
	var idexport = stringIDToTypeID( "export" );
	var desc221 = new ActionDescriptor();
	var idusing = stringIDToTypeID( "using" );
		var desc222 = new ActionDescriptor();
		var iddirectory = stringIDToTypeID( "directory" );
		desc222.putPath( iddirectory, new File( renderSavePath ) );
		var idname = stringIDToTypeID( "name" );
		desc222.putString( idname, renderName );
		var idameFormatName = stringIDToTypeID( "ameFormatName" );
		desc222.putString( idameFormatName, """H.264""" );
		var idamePresetName = stringIDToTypeID( "amePresetName" );
		desc222.putString( idamePresetName, """1_High Quality.epr""" );
		var iduseDocumentSize = stringIDToTypeID( "useDocumentSize" );
		desc222.putBoolean( iduseDocumentSize, true );
		var iduseDocumentFrameRate = stringIDToTypeID( "useDocumentFrameRate" );
		desc222.putBoolean( iduseDocumentFrameRate, true );
		var idpixelAspectRatio = stringIDToTypeID( "pixelAspectRatio" );
		var idpixelAspectRatio = stringIDToTypeID( "pixelAspectRatio" );
		var iddocument = stringIDToTypeID( "document" );
		desc222.putEnumerated( idpixelAspectRatio, idpixelAspectRatio, iddocument );
		var idfieldOrder = stringIDToTypeID( "fieldOrder" );
		var idvideoField = stringIDToTypeID( "videoField" );
		var idpreset = stringIDToTypeID( "preset" );
		desc222.putEnumerated( idfieldOrder, idvideoField, idpreset );
		var idmanage = stringIDToTypeID( "manage" );
		desc222.putBoolean( idmanage, true );
		var idallFrames = stringIDToTypeID( "allFrames" );
		desc222.putBoolean( idallFrames, true );
		var idrenderAlpha = stringIDToTypeID( "renderAlpha" );
		var idalphaRendering = stringIDToTypeID( "alphaRendering" );
		var idnone = stringIDToTypeID( "none" );
		desc222.putEnumerated( idrenderAlpha, idalphaRendering, idnone );
		var idquality = stringIDToTypeID( "quality" );
		desc222.putInteger( idquality, 1 );
		var idZthreeDPrefHighQualityErrorThreshold = stringIDToTypeID( "Z3DPrefHighQualityErrorThreshold" );
		desc222.putInteger( idZthreeDPrefHighQualityErrorThreshold, 5 );
	var idvideoExport = stringIDToTypeID( "videoExport" );
	desc221.putObject( idusing, idvideoExport, desc222 );
	executeAction( idexport, desc221, DialogModes.NO );
	}
