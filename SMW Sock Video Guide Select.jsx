var doc = app.activeDocument;
var layer = doc.activeLayer;
var renderName = doc.name;
var docHeight //= app.activeDocument.height
var docWidth //= app.activeDocument.width
var marginOptionsY1 = [100, 62, 226, 66, 66, 226]; //Men's Tall, Men's Mid, Men's Low, Women's Tall, Women's Mid, Women's Low
var marginOptionsY2 = [52, 86, 90, 52, 86, 90];
var marginOptionsX1 = [244, 280, 350, 250, 320, 332];
var marginOptionsX2 = [280, 280, 194, 296, 270, 194];
var margins = []
var sockBounds = []
var docBounds = []
var selBounds = []
var framerate = 130.5
var whiteEdge = 24
var whiteFeather = whiteEdge-6
var cancel = false
var dlgMain = new Window("dialog", "Will's Sock Video Prepper");

var sockListBox = dlgMain.add("ListBox", undefined, ["Men's Tall", "Men's Medium", "Men's Short", "Women's Tall", "Women's Medium", "Women's Short"]);
var sockType = 0
var buttFileGroup = dlgMain.add("group");
var buttFileCancel = buttFileGroup.add("button", undefined, "Cancel");
var buttFileOk = buttFileGroup.add("button", undefined, "  OK  ");
buttFileGroup.width = 25;
buttFileOk.onClick = function () {
	if(sockListBox.selection.index > -1 && sockListBox.selection.index < 6){
		sockType = sockListBox.selection.index;
		//alert(sockType);
		margins =  [marginOptionsX1[sockType], marginOptionsY1[sockType], marginOptionsX2[sockType], marginOptionsY2[sockType]];
		
	}
	else {
		alert("no sock selected")
		cancel = true
	}
	dlgMain.close();
}
buttFileCancel.onClick = function () {
	cancel = true;
	dlgMain.close();
}
dlgMain.show();


if(cancel == false){
	removeVideoGroup()
	fps24()
	autoSelect()
	cropToPlace()
	newGuide()
	addAdjustment()
}



function newGuide() {
	sockBounds = [margins[0], margins[1], doc.width-margins[2], doc.height-margins[3]]
	for (i = 0; i < sockBounds.length; i++){
		if (i % 2 == 0) {
			horVert = "vertical";
		}
		else {
			horVert = "horizontal";
		}
		
		var idmake = stringIDToTypeID( "make" );
			var desc23818 = new ActionDescriptor();
			var idnew = stringIDToTypeID( "new" );
				var desc23819 = new ActionDescriptor();
				var idposition = stringIDToTypeID( "position" );
				var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
				desc23819.putUnitDouble( idposition, idpixelsUnit, sockBounds[i]);
				var idorientation = stringIDToTypeID( "orientation" );
				var idorientation = stringIDToTypeID( "orientation" );
				var idvertical = stringIDToTypeID( horVert );
				desc23819.putEnumerated( idorientation, idorientation, idvertical );
				var idkind = stringIDToTypeID( "kind" );
				var idkind = stringIDToTypeID( "kind" );
				var iddocument = stringIDToTypeID( "document" );
				desc23819.putEnumerated( idkind, idkind, iddocument );
				var idnull = stringIDToTypeID( "null" );
					var ref618 = new ActionReference();
					var iddocument = stringIDToTypeID( "document" );
					ref618.putIdentifier( iddocument, 3401 );
					var idgood = stringIDToTypeID( "good" );
					ref618.putIndex( idgood, 2 );
				desc23819.putReference( idnull, ref618 );
				var idGdCA = charIDToTypeID( "GdCA" );
				var idGdCR = charIDToTypeID( "GdCR" );
				var idGdCG = charIDToTypeID( "GdCG" );
				var idGdCB = charIDToTypeID( "GdCB" );
					desc23819.putInteger( idGdCA, 0 );
					desc23819.putInteger( idGdCR, 74 );
					desc23819.putInteger( idGdCG, 255 );
					desc23819.putInteger( idGdCB, 255 );
			var idgood = stringIDToTypeID( "good" );
			desc23818.putObject( idnew, idgood, desc23819 );
			var idnull = stringIDToTypeID( "null" );
				var ref619 = new ActionReference();
				var idgood = stringIDToTypeID( "good" );
				ref619.putClass( idgood );
			desc23818.putReference( idnull, ref619 );
			var idguideTarget = stringIDToTypeID( "guideTarget" );
			var idguideTarget = stringIDToTypeID( "guideTarget" );
			var idguideTargetCanvas = stringIDToTypeID( "guideTargetCanvas" );
			desc23818.putEnumerated( idguideTarget, idguideTarget, idguideTargetCanvas );
		executeAction( idmake, desc23818, DialogModes.NO );
	}
}

function autoSelect(){
    var idautoCutout = stringIDToTypeID( "autoCutout" );
    var desc907 = new ActionDescriptor();
    var idsampleAllLayers = stringIDToTypeID( "sampleAllLayers" );
    desc907.putBoolean( idsampleAllLayers, false );
    executeAction( idautoCutout, desc907, DialogModes.NO );
}

function cropToPlace() {
	selBounds = doc.selection.bounds
	var scaleY = Number(selBounds[3]-selBounds[1]) / Number(1080 - (margins[3] + margins[1]))
	selBounds[0] = Number(selBounds[0]-margins[0]*scaleY)
	selBounds[1] = Number(selBounds[1]-margins[1]*scaleY)
	selBounds[2] = Number(selBounds[2]+margins[2]*scaleY)
	selBounds[3] = Number(selBounds[3]+margins[3]*scaleY)
	var selCenterXY = [];
	selCenterXY[0] = selBounds[0] + (selBounds[2]-selBounds[0])/2
	selCenterXY[1] = selBounds[1] + (selBounds[3]-selBounds[1])/2

	var cropBounds = [];
	cropBounds[0] = selCenterXY[0] - 1080/2*scaleY
	cropBounds[1] = selCenterXY[1] - 1080/2*scaleY
	cropBounds[2] = selCenterXY[0] + 1080/2*scaleY
	cropBounds[3] = selCenterXY[1] + 1080/2*scaleY
	doc.selection.deselect()
	doc.crop(cropBounds, 0, 1080, 1080);
	//alert(cropBounds);
}



function addAdjustment(){
	// =======================================================
	var idmake = stringIDToTypeID( "make" );
	var desc245 = new ActionDescriptor();
	var idnull = stringIDToTypeID( "null" );
		var ref5 = new ActionReference();
		var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
		ref5.putClass( idadjustmentLayer );
	desc245.putReference( idnull, ref5 );
	var idusing = stringIDToTypeID( "using" );
		var desc246 = new ActionDescriptor();
		var idtype = stringIDToTypeID( "type" );
			var desc247 = new ActionDescriptor();
			var idpresetKind = stringIDToTypeID( "presetKind" );
			var idpresetKindType = stringIDToTypeID( "presetKindType" );
			var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
			desc247.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
		var idselectiveColor = stringIDToTypeID( "selectiveColor" );
		desc246.putObject( idtype, idselectiveColor, desc247 );
	var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
	desc245.putObject( idusing, idadjustmentLayer, desc246 );
	executeAction( idmake, desc245, DialogModes.NO );

    // // =======================================================
    // var idset = stringIDToTypeID( "set" );
    // var desc2727 = new ActionDescriptor();
    // var idnull = stringIDToTypeID( "null" );
    //     var ref254 = new ActionReference();
    //     var idadjustmentLayer = stringIDToTypeID( "adjustmentLayer" );
    //     var idordinal = stringIDToTypeID( "ordinal" );
    //     var idtargetEnum = stringIDToTypeID( "targetEnum" );
    //     ref254.putEnumerated( idadjustmentLayer, idordinal, idtargetEnum );
    // desc2727.putReference( idnull, ref254 );
    // var idto = stringIDToTypeID( "to" );
    //     var desc2728 = new ActionDescriptor();
    //     var idpresetKind = stringIDToTypeID( "presetKind" );
    //     var idpresetKindType = stringIDToTypeID( "presetKindType" );
    //     var idpresetKindUserDefined = stringIDToTypeID( "presetKindUserDefined" );
    //     desc2728.putEnumerated( idpresetKind, idpresetKindType, idpresetKindUserDefined );
    //     var idusing = stringIDToTypeID( "using" );
    //     desc2728.putPath( idusing, new File( "/Volumes/Titan/SMWBase Alpha Drive Dupe/Smartwool Actions and Scripts Library/SMW Video Presets/SMW Color Adjust.asv" ) );
    // var idselectiveColor = stringIDToTypeID( "selectiveColor" );
    // desc2727.putObject( idto, idselectiveColor, desc2728 );
    // executeAction( idset, desc2727, DialogModes.NO );


	doc.selection.selectAll()
	doc.selection.select([[whiteEdge,whiteEdge],[1080-whiteEdge,whiteEdge],[1080-whiteEdge,1080-whiteEdge],[whiteEdge, 1080-whiteEdge]], SelectionType.DIMINISH, whiteFeather, true)

	// =======================================================
	var idmake = stringIDToTypeID( "make" );
	var desc1341 = new ActionDescriptor();
	var idnull = stringIDToTypeID( "null" );
		var ref11 = new ActionReference();
		var idcontentLayer = stringIDToTypeID( "contentLayer" );
		ref11.putClass( idcontentLayer );
	desc1341.putReference( idnull, ref11 );
	var idusing = stringIDToTypeID( "using" );
		var desc1342 = new ActionDescriptor();
		var idtype = stringIDToTypeID( "type" );
			var desc1343 = new ActionDescriptor();
			var idcolor = stringIDToTypeID( "color" );
				var desc1344 = new ActionDescriptor();
				var idred = stringIDToTypeID( "red" );
				desc1344.putDouble( idred, 255.000000 );
				var idgrain = stringIDToTypeID( "grain" );
				desc1344.putDouble( idgrain, 255.000000 );
				var idblue = stringIDToTypeID( "blue" );
				desc1344.putDouble( idblue, 255.000000 );
			var idRGBColor = stringIDToTypeID( "RGBColor" );
			desc1343.putObject( idcolor, idRGBColor, desc1344 );
		var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
		desc1342.putObject( idtype, idsolidColorLayer, desc1343 );
	var idcontentLayer = stringIDToTypeID( "contentLayer" );
	desc1341.putObject( idusing, idcontentLayer, desc1342 );
	executeAction( idmake, desc1341, DialogModes.NO );

	// =======================================================
	var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
	var desc1346 = new ActionDescriptor();
	var idtimeOffset = stringIDToTypeID( "timeOffset" );
		var desc1347 = new ActionDescriptor();
		var idseconds = stringIDToTypeID( "seconds" );
		desc1347.putInteger( idseconds, 4 );
		var idframe = stringIDToTypeID( "frame" );
		desc1347.putInteger( idframe, 0 );
		var idframeRate = stringIDToTypeID( "frameRate" );
		desc1347.putDouble( idframeRate, 24.000000 );
	var idtimecode = stringIDToTypeID( "timecode" );
	desc1346.putObject( idtimeOffset, idtimecode, desc1347 );
	executeAction( idmoveOutTime, desc1346, DialogModes.NO );

	// =======================================================
var idmake = stringIDToTypeID( "make" );
var desc229 = new ActionDescriptor();
var idnull = stringIDToTypeID( "null" );
	var ref2 = new ActionReference();
	var idcontentLayer = stringIDToTypeID( "contentLayer" );
	ref2.putClass( idcontentLayer );
desc229.putReference( idnull, ref2 );
var idusing = stringIDToTypeID( "using" );
	var desc230 = new ActionDescriptor();
	var idtype = stringIDToTypeID( "type" );
		var desc231 = new ActionDescriptor();
		var idcolor = stringIDToTypeID( "color" );
			var desc232 = new ActionDescriptor();
			var idred = stringIDToTypeID( "red" );
			desc232.putDouble( idred, 255.000000 );
			var idgrain = stringIDToTypeID( "grain" );
			desc232.putDouble( idgrain, 255.000000 );
			var idblue = stringIDToTypeID( "blue" );
			desc232.putDouble( idblue, 255.000000 );
		var idRGBColor = stringIDToTypeID( "RGBColor" );
		desc231.putObject( idcolor, idRGBColor, desc232 );
	var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
	desc230.putObject( idtype, idsolidColorLayer, desc231 );
var idcontentLayer = stringIDToTypeID( "contentLayer" );
desc229.putObject( idusing, idcontentLayer, desc230 );
executeAction( idmake, desc229, DialogModes.NO );

// =======================================================
var idmove = stringIDToTypeID( "move" );
var desc239 = new ActionDescriptor();
var idnull = stringIDToTypeID( "null" );
	var ref3 = new ActionReference();
	var idlayer = stringIDToTypeID( "layer" );
	var idordinal = stringIDToTypeID( "ordinal" );
	var idtargetEnum = stringIDToTypeID( "targetEnum" );
	ref3.putEnumerated( idlayer, idordinal, idtargetEnum );
desc239.putReference( idnull, ref3 );
var idto = stringIDToTypeID( "to" );
	var ref4 = new ActionReference();
	var idlayer = stringIDToTypeID( "layer" );
	var idordinal = stringIDToTypeID( "ordinal" );
	var idback = stringIDToTypeID( "back" );
	ref4.putEnumerated( idlayer, idordinal, idback );
desc239.putReference( idto, ref4 );
executeAction( idmove, desc239, DialogModes.NO );

// =======================================================
var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
    var desc243 = new ActionDescriptor();
    var idtimeOffset = stringIDToTypeID( "timeOffset" );
        var desc244 = new ActionDescriptor();
        var idseconds = stringIDToTypeID( "seconds" );
        desc244.putInteger( idseconds, 4 );
        var idframe = stringIDToTypeID( "frame" );
        desc244.putInteger( idframe, 0 );
        var idframeRate = stringIDToTypeID( "frameRate" );
        desc244.putDouble( idframeRate, 24.000000 );
    var idtimecode = stringIDToTypeID( "timecode" );
    desc243.putObject( idtimeOffset, idtimecode, desc244 );
executeAction( idmoveOutTime, desc243, DialogModes.NO );
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

function fps24(){
    framerate = 24;
    // =======================================================
    var idset = stringIDToTypeID( "set" );
        var desc351 = new ActionDescriptor();
        var idnull = stringIDToTypeID( "null" );
            var ref19 = new ActionReference();
            var idproperty = stringIDToTypeID( "property" );
            var iddocumentTimelineSettings = stringIDToTypeID( "documentTimelineSettings" );
            ref19.putProperty( idproperty, iddocumentTimelineSettings );
            var idtimeline = stringIDToTypeID( "timeline" );
            ref19.putClass( idtimeline );
        desc351.putReference( idnull, ref19 );
        var idframeRate = stringIDToTypeID( "frameRate" );
        desc351.putDouble( idframeRate, framerate );
    executeAction( idset, desc351, DialogModes.NO );
}
