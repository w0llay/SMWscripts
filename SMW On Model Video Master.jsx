var doc;
var dlgWindow = new Window("dialog", "Will's Video Prep");
var foldFileSelect = dlgWindow.add("panel")
foldFileSelect.alignChildren = "left";
var folderButton = foldFileSelect.add("radiobutton", undefined, "Folder");
var fileButton = foldFileSelect.add("radiobutton", undefined, "File");
var okCancelSelect = dlgWindow.add("group")
buttOk = okCancelSelect.add("button", undefined, "OK");
buttCancel = okCancelSelect.add("button", undefined, "Cancel");

// buttOk.onClick = function () {
// 	if (folderButton.value) {
// 		dlgWindow.close()
// 		folderRun()

// 	}
// 	else if(fileButton.value) {
// 		dlgWindow.close()
// 		fileRun()
// 	}
// 	else {
// 		dlgWindow.close
// 	}
// }
// buttCancel.onClick = function () {
// 	dlgWindow.close()
// }
// dlgWindow.show()

// function fileRun(){
// 	var selectedFile = File.openDialog("Please select file");
// 	if(selectedFile == null) return;
// 	openMov(selectedFile)
// 	removeVideoGroup()
// 	addAdjustment()
// 	modVibrance()
// 	modColorBalance()
// 	modLevels()
// 	render()
// 	savePSD()
// 	doc.close(SaveOptions.DONOTSAVECHANGES)
// }

folderRun()

function folderRun(){
	var selectedFolder = new Folder("/Volumes/willr drive/SMW Local/SMW240369 S25/Apparel and Accessories/Video/Missing MOVs")//Folder.selectDialog("Please select folder");
	if(selectedFolder == null) return;
	var fileList= selectedFolder.getFiles();
	if(fileList.length>0){
		for (var i = 0; i < fileList.length; i++) {  
			if(fileList[i] instanceof Folder){
				var tempFL = fileList[i].getFiles()
				for (var q = 0; q < tempFL.length; q++) {
					fileList.push(tempFL[q])
				}
			}
			if(fileList[i].name.indexOf(".mov")>-1&&fileList[i].name.indexOf("._")==-1){
				alert(fileList[i].name)
				app.open(fileList[i])
				//openMov(fileList[i])
				removeVideoGroup()
				addAdjustment()
				modVibrance()
				modColorBalance()
				modLevels()
				render()
				savePSD()
				doc.close(SaveOptions.DONOTSAVECHANGES)
			}
		}
	}
}
function addAdjustment(){
	// =======================================================
	var idmake = stringIDToTypeID( "make" );
	var desc232 = new ActionDescriptor();
	var idnull = stringIDToTypeID( "null" );
		var ref7 = new ActionReference();
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		ref7.putClass( idadjustmentLayer );
	desc232.putReference( idnull, ref7 );
	var idusing = stringIDToTypeID( "using" );
		var desc233 = new ActionDescriptor();
		var idtype = stringIDToTypeID( "type" );
			var desc234 = new ActionDescriptor();
			var idpresetKind = stringIDToTypeID( "presetKind" );
			var idpresetKindType = stringIDToTypeID( "presetKindType" );
			var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
			desc234.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
			var idcolorize = stringIDToTypeID( "colorize" );
			desc234.putBoolean( idcolorize, false );
		var idhueSaturation = stringIDToTypeID( "hueSaturation" );
		desc233.putObject( idtype, idhueSaturation, desc234 );
	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	desc232.putObject( idusing, idadjustmentLayer, desc233 );
	executeAction( idmake, desc232, DialogModes.NO );

	// // =======================================================
	// var idset = stringIDToTypeID( "set" );
	// var desc242 = new ActionDescriptor();
	// var idnull = stringIDToTypeID( "null" );
	// 	var ref8 = new ActionReference();
	// 	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// 	var idordinal = stringIDToTypeID( "ordinal" );
	// 	var idtargetEnum = stringIDToTypeID( "targetEnum" );
	// 	ref8.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
	// desc242.putReference( idnull, ref8 );
	// var idto = stringIDToTypeID( "to" );
	// 	var desc243 = new ActionDescriptor();
	// 	var idpresetKind = stringIDToTypeID( "presetKind" );
	// 	var idpresetKindType = stringIDToTypeID( "presetKindType" );
	// 	var idpresetKindUserDefined = stringIDToTypeID( "presetKindUserDefined" );
	// 	desc243.putEnumerated( idpresetKind, idpresetKindType, idpresetKindUserDefined );
	// 	var idusing = stringIDToTypeID( "using" );
	// 	desc243.putPath( idusing, new File( "/Volumes/Titan/SMWBase Alpha Drive Dupe/Smartwool Actions and Scripts Library/SMW Video Presets/On Model HueSat.ahu" ) );
	// var idhueSaturation = stringIDToTypeID( "hueSaturation" );
	// desc242.putObject( idto, idhueSaturation, desc243 );
	// executeAction( idset, desc242, DialogModes.NO );

	// // =======================================================
	// var idmake = stringIDToTypeID( "make" );
	// var desc209 = new ActionDescriptor();
	// var idnull = stringIDToTypeID( "null" );
	// 	var ref3 = new ActionReference();
	// 	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// 	ref3.putClass( idadjustmentLayer );
	// desc209.putReference( idnull, ref3 );
	// var idusing = stringIDToTypeID( "using" );
	// 	var desc210 = new ActionDescriptor();
	// 	var idtype = stringIDToTypeID( "type" );
	// 		var desc211 = new ActionDescriptor();
	// 		var idpresetKind = stringIDToTypeID( "presetKind" );
	// 		var idpresetKindType = stringIDToTypeID( "presetKindType" );
	// 		var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
	// 		desc211.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
	// 	var idcurves = stringIDToTypeID( "curves" );
	// 	desc210.putObject( idtype, idcurves, desc211 );
	// var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// desc209.putObject( idusing, idadjustmentLayer, desc210 );
	// executeAction( idmake, desc209, DialogModes.NO );

	// // =======================================================
	// var idset = stringIDToTypeID( "set" );
	// var desc219 = new ActionDescriptor();
	// var idnull = stringIDToTypeID( "null" );
	// 	var ref4 = new ActionReference();
	// 	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// 	var idordinal = stringIDToTypeID( "ordinal" );
	// 	var idtargetEnum = stringIDToTypeID( "targetEnum" );
	// 	ref4.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
	// desc219.putReference( idnull, ref4 );
	// var idto = stringIDToTypeID( "to" );
	// 	var desc220 = new ActionDescriptor();
	// 	var idpresetKind = stringIDToTypeID( "presetKind" );
	// 	var idpresetKindType = stringIDToTypeID( "presetKindType" );
	// 	var idpresetKindUserDefined = stringIDToTypeID( "presetKindUserDefined" );
	// 	desc220.putEnumerated( idpresetKind, idpresetKindType, idpresetKindUserDefined );
	// 	var idusing = stringIDToTypeID( "using" );
	// 	desc220.putPath( idusing, new File( "/Volumes/SMWBase Alpha/SMW Video Presets/On Model Curve.acv" ) );
	// var idcurves = stringIDToTypeID( "curves" );
	// desc219.putObject( idto, idcurves, desc220 );
	// executeAction( idset, desc219, DialogModes.NO );

	// =======================================================
	var idmake = stringIDToTypeID( "make" );
	var desc236 = new ActionDescriptor();
	var idnull = stringIDToTypeID( "null" );
		var ref3 = new ActionReference();
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		ref3.putClass( idadjustmentLayer );
	desc236.putReference( idnull, ref3 );
	var idusing = stringIDToTypeID( "using" );
		var desc237 = new ActionDescriptor();
		var idtype = stringIDToTypeID( "type" );
			var desc238 = new ActionDescriptor();
			var iduseLegacy = stringIDToTypeID( "useLegacy" );
			desc238.putBoolean( iduseLegacy, false );
		var idbrightnessEvent = stringIDToTypeID( "brightnessEvent" );
		desc237.putObject( idtype, idbrightnessEvent, desc238 );
	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	desc236.putObject( idusing, idadjustmentLayer, desc237 );
	executeAction( idmake, desc236, DialogModes.NO );

	// =======================================================
	var idset = stringIDToTypeID( "set" );
	var desc247 = new ActionDescriptor();
	var idnull = stringIDToTypeID( "null" );
		var ref4 = new ActionReference();
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		var idordinal = stringIDToTypeID( "ordinal" );
		var idtargetEnum = stringIDToTypeID( "targetEnum" );
		ref4.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
	desc247.putReference( idnull, ref4 );
	var idto = stringIDToTypeID( "to" );
		var desc248 = new ActionDescriptor();
		var idbrightness = stringIDToTypeID( "brightness" );
		desc248.putInteger( idbrightness, -9 );
		var idcenter = stringIDToTypeID( "center" );
		desc248.putInteger( idcenter, -5 );
		var iduseLegacy = stringIDToTypeID( "useLegacy" );
		desc248.putBoolean( iduseLegacy, false );
	var idbrightnessEvent = stringIDToTypeID( "brightnessEvent" );
	desc247.putObject( idto, idbrightnessEvent, desc248 );
	executeAction( idset, desc247, DialogModes.NO );

	// // =======================================================
	// var idmake = stringIDToTypeID( "make" );
	// var desc256 = new ActionDescriptor();
	// var idnull = stringIDToTypeID( "null" );
	// 	var ref8 = new ActionReference();
	// 	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// 	ref8.putClass( idadjustmentLayer );
	// desc256.putReference( idnull, ref8 );
	// var idusing = stringIDToTypeID( "using" );
	// 	var desc257 = new ActionDescriptor();
	// 	var idtype = stringIDToTypeID( "type" );
	// 		var desc258 = new ActionDescriptor();
	// 	var idselectiveColor = stringIDToTypeID( "selectiveColor" );
	// 	desc257.putObject( idtype, idselectiveColor, desc258 );
	// var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// desc256.putObject( idusing, idadjustmentLayer, desc257 );
	// executeAction( idmake, desc256, DialogModes.NO );

	// // =======================================================
	// var idset = stringIDToTypeID( "set" );
	// var desc278 = new ActionDescriptor();
	// var idnull = stringIDToTypeID( "null" );
	// 	var ref12 = new ActionReference();
	// 	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	// 	var idordinal = stringIDToTypeID( "ordinal" );
	// 	var idtargetEnum = stringIDToTypeID( "targetEnum" );
	// 	ref12.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
	// desc278.putReference( idnull, ref12 );
	// var idto = stringIDToTypeID( "to" );
	// 	var desc279 = new ActionDescriptor();
	// 	var idpresetKind = stringIDToTypeID( "presetKind" );
	// 	var idpresetKindType = stringIDToTypeID( "presetKindType" );
	// 	var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
	// 	desc279.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
	// 	var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
	// 		var list11 = new ActionList();
	// 			var desc280 = new ActionDescriptor();
	// 			var idcolors = stringIDToTypeID( "colors" );
	// 			var idcolors = stringIDToTypeID( "colors" );
	// 			var idradius = stringIDToTypeID( "radius" );
	// 			desc280.putEnumerated( idcolors, idcolors, idradius );
	// 			var idmagenta = stringIDToTypeID( "magenta" );
	// 			var idpercentUnit = stringIDToTypeID( "percentUnit" );
	// 			desc280.putUnitDouble( idmagenta, idpercentUnit, -1.000000 );
	// 		var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
	// 		list11.putObject( idcolorCorrection, desc280 );
	// 			var desc281 = new ActionDescriptor();
	// 			var idcolors = stringIDToTypeID( "colors" );
	// 			var idcolors = stringIDToTypeID( "colors" );
	// 			var idneutrals = stringIDToTypeID( "neutrals" );
	// 			desc281.putEnumerated( idcolors, idcolors, idneutrals );
	// 			var idyellowColor = stringIDToTypeID( "yellowColor" );
	// 			var idpercentUnit = stringIDToTypeID( "percentUnit" );
	// 			desc281.putUnitDouble( idyellowColor, idpercentUnit, -3.000000 );
	// 		var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
	// 		list11.putObject( idcolorCorrection, desc281 );
	// 	desc279.putList( idcolorCorrection, list11 );
	// var idselectiveColor = stringIDToTypeID( "selectiveColor" );
	// desc278.putObject( idto, idselectiveColor, desc279 );
	// executeAction( idset, desc278, DialogModes.NO );


	}

function removeVideoGroup(){
    // =======================================================
    var idselect = stringIDToTypeID( "select" );
    var desc224 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref1 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        ref1.putName( idlayer, "Video Group 1" );
    desc224.putReference( idnull, ref1 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc224.putBoolean( idmakeVisible, false );
    var idlayerID = stringIDToTypeID( "layerID" );
        var list4 = new ActionList();
        list4.putInteger( 3 );
    desc224.putList( idlayerID, list4 );
    executeAction( idselect, desc224, DialogModes.NO );

    // =======================================================
    var idungroupLayersEvent = stringIDToTypeID( "ungroupLayersEvent" );
    var desc226 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref2.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc226.putReference( idnull, ref2 );
    executeAction( idungroupLayersEvent, desc226, DialogModes.NO );
}
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

	function openMov(mov){
		// =======================================================
		var idopen = stringIDToTypeID( "open" );
			var desc340 = new ActionDescriptor();
			var iddontRecord = stringIDToTypeID( "dontRecord" );
			desc340.putBoolean( iddontRecord, false );
			var idforceNotify = stringIDToTypeID( "forceNotify" );
			desc340.putBoolean( idforceNotify, true );
			var idnull = stringIDToTypeID( "null" );
			desc340.putPath( idnull, mov );
			var iddocumentID = stringIDToTypeID( "documentID" );
			desc340.putInteger( iddocumentID, 82 );
			var idtemplate = stringIDToTypeID( "template" );
			desc340.putBoolean( idtemplate, false );
		executeAction( idopen, desc340, DialogModes.NO );
	}

	function modVibrance(){
		// =======================================================
		var idmake = stringIDToTypeID( "make" );
		var desc245 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
			var ref8 = new ActionReference();
			var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
			ref8.putClass( idadjustmentLayer );
		desc245.putReference( idnull, ref8 );
		var idusing = stringIDToTypeID( "using" );
			var desc246 = new ActionDescriptor();
			var idtype = stringIDToTypeID( "type" );
			var idvibrance = stringIDToTypeID( "vibrance" );
			desc246.putClass( idtype, idvibrance );
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		desc245.putObject( idusing, idadjustmentLayer, desc246 );
		executeAction( idmake, desc245, DialogModes.NO );
		// =======================================================
		var idset = stringIDToTypeID( "set" );
		var desc257 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
			var ref9 = new ActionReference();
			var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
			var idordinal = stringIDToTypeID( "ordinal" );
			var idtargetEnum = stringIDToTypeID( "targetEnum" );
			ref9.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
		desc257.putReference( idnull, ref9 );
		var idto = stringIDToTypeID( "to" );
			var desc258 = new ActionDescriptor();
			var idvibrance = stringIDToTypeID( "vibrance" );
			desc258.putInteger( idvibrance, 12 );
			var idsaturation = stringIDToTypeID( "saturation" );
			desc258.putInteger( idsaturation, 6 );
		var idvibrance = stringIDToTypeID( "vibrance" );
		desc257.putObject( idto, idvibrance, desc258 );
		executeAction( idset, desc257, DialogModes.NO );
		}



	function modColorBalance(){
		// =======================================================
		var idmake = stringIDToTypeID( "make" );
		var desc1473 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
			var ref148 = new ActionReference();
			var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
			ref148.putClass( idadjustmentLayer );
		desc1473.putReference( idnull, ref148 );
		var idusing = stringIDToTypeID( "using" );
			var desc1474 = new ActionDescriptor();
			var idtype = stringIDToTypeID( "type" );
				var desc1475 = new ActionDescriptor();
				var idshadowLevels = stringIDToTypeID( "shadowLevels" );
					var list171 = new ActionList();
					list171.putInteger( -1 );
					list171.putInteger( 0 );
					list171.putInteger( 0 );
				desc1475.putList( idshadowLevels, list171 );
				var idmidtoneLevels = stringIDToTypeID( "midtoneLevels" );
					var list172 = new ActionList();
					list172.putInteger( -2 );
					list172.putInteger( 3 );
					list172.putInteger( 1 );
				desc1475.putList( idmidtoneLevels, list172 );
				var idhighlightLevels = stringIDToTypeID( "highlightLevels" );
					var list173 = new ActionList();
					list173.putInteger( 0 );
					list173.putInteger( 0 );
					list173.putInteger( 0 );
				desc1475.putList( idhighlightLevels, list173 );
				var idpreserveLuminosity = stringIDToTypeID( "preserveLuminosity" );
				desc1475.putBoolean( idpreserveLuminosity, true );
			var idcolorBalance = stringIDToTypeID( "colorBalance" );
			desc1474.putObject( idtype, idcolorBalance, desc1475 );
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		desc1473.putObject( idusing, idadjustmentLayer, desc1474 );
		executeAction( idmake, desc1473, DialogModes.NO );
	}

	function modLevels(){
		// =======================================================
		var idmake = stringIDToTypeID( "make" );
		var desc325 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
			var ref9 = new ActionReference();
			var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
			ref9.putClass( idadjustmentLayer );
		desc325.putReference( idnull, ref9 );
		var idusing = stringIDToTypeID( "using" );
			var desc326 = new ActionDescriptor();
			var idtype = stringIDToTypeID( "type" );
				var desc327 = new ActionDescriptor();
				var idpresetKind = stringIDToTypeID( "presetKind" );
				var idpresetKindType = stringIDToTypeID( "presetKindType" );
				var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
				desc327.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
			var idlevels = stringIDToTypeID( "levels" );
			desc326.putObject( idtype, idlevels, desc327 );
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		desc325.putObject( idusing, idadjustmentLayer, desc326 );
		executeAction( idmake, desc325, DialogModes.NO );

	// =======================================================
		var idset = stringIDToTypeID( "set" );
		var desc333 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
			var ref10 = new ActionReference();
			var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
			var idordinal = stringIDToTypeID( "ordinal" );
			var idtargetEnum = stringIDToTypeID( "targetEnum" );
			ref10.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
		desc333.putReference( idnull, ref10 );
		var idto = stringIDToTypeID( "to" );
			var desc334 = new ActionDescriptor();
			var idpresetKind = stringIDToTypeID( "presetKind" );
			var idpresetKindType = stringIDToTypeID( "presetKindType" );
			var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
			desc334.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
			var idadjustment = stringIDToTypeID( "adjustment" );
				var list9 = new ActionList();
					var desc335 = new ActionDescriptor();
					var idchannel = stringIDToTypeID( "channel" );
						var ref11 = new ActionReference();
						var idchannel = stringIDToTypeID( "channel" );
						var idchannel = stringIDToTypeID( "channel" );
						var idcomposite = stringIDToTypeID( "composite" );
						ref11.putEnumerated( idchannel, idchannel, idcomposite );
					desc335.putReference( idchannel, ref11 );
					var idgamma = stringIDToTypeID( "gamma" );
					desc335.putDouble( idgamma, 1.0000 );
				var idlevelsAdjustment = stringIDToTypeID( "levelsAdjustment" );
				list9.putObject( idlevelsAdjustment, desc335 );
			desc334.putList( idadjustment, list9 );
		var idlevels = stringIDToTypeID( "levels" );
		desc333.putObject( idto, idlevels, desc334 );
		executeAction( idset, desc333, DialogModes.NO );
	}

	function savePSD(){
		doc = app.activeDocument;
		var PSDSavePath = String(activeDocument.path.fsName) + "/PSD";
		var PSDSaveFolder = Folder(PSDSavePath);
		var PSDName = String(doc.name);
		var PSDFile = new File(PSDSavePath + "/" + PSDName);
		if(!PSDSaveFolder.exists) PSDSaveFolder.create();
		// =======================================================
		var idsave = stringIDToTypeID( "save" );
		var desc357 = new ActionDescriptor();
		var idas = stringIDToTypeID( "as" );
			var desc358 = new ActionDescriptor();
			var idmaximizeCompatibility = stringIDToTypeID( "maximizeCompatibility" );
			desc358.putBoolean( idmaximizeCompatibility, true );
		var idphotoshopthreefiveFormat = stringIDToTypeID( "photoshop35Format" );
		desc357.putObject( idas, idphotoshopthreefiveFormat, desc358 );
		var idin = stringIDToTypeID( "in" );
		desc357.putPath( idin, PSDFile );
		var iddocumentID = stringIDToTypeID( "documentID" );
		desc357.putInteger( iddocumentID, 140 );
		var idlowerCase = stringIDToTypeID( "lowerCase" );
		desc357.putBoolean( idlowerCase, true );
		var idsaveStage = stringIDToTypeID( "saveStage" );
		var idsaveStageType = stringIDToTypeID( "saveStageType" );
		var idsaveSucceeded = stringIDToTypeID( "saveSucceeded" );
		desc357.putEnumerated( idsaveStage, idsaveStageType, idsaveSucceeded );
		executeAction( idsave, desc357, DialogModes.NO );
	}