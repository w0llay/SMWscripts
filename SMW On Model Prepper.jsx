var f;
var m;
var l;
var guideArray1 = new Array(0, 155, 5464, 5309, 2732);
var horVert = "horizontal";
var mono = false;

//fit to guides variables
var marquee = new Array(0, 1200, 4600, 5464)
var b1 = [];
var b2 = [];
var b3 = [];
var c1 = [];
var c2 = [];
var doc;
var guidesX = [];
var guidesY = [];
var i;
var isBackgroundLayer;
var isBackgroundVisible;
var layer;
var layerBottom;
var layerOffset = [0, 0];
var scale;
var scaleX;
var scaleY;
var translateX;
var translateY;
var selSubjectWorking;

    // =======================================================
    try {
    var idselect = stringIDToTypeID( "select" );
        var desc25966 = new ActionDescriptor();
        var idnull = stringIDToTypeID( "null" );
            var ref891 = new ActionReference();
            var idlayer = stringIDToTypeID( "layer" );
            var idordinal = stringIDToTypeID( "ordinal" );
            var idbackwardEnum = stringIDToTypeID( "backwardEnum" );
            ref891.putEnumerated( idlayer, idordinal, idbackwardEnum );
        desc25966.putReference( idnull, ref891 );
        var idmakeVisible = stringIDToTypeID( "makeVisible" );
        desc25966.putBoolean( idmakeVisible, false );
        var idlayerID = stringIDToTypeID( "layerID" );
            var list268 = new ActionList();
            list268.putInteger( 1 );
        desc25966.putList( idlayerID, list268 );
    executeAction( idselect, desc25966, DialogModes.NO );
    }
    catch(e){}
    
    // =======================================================
    try{
    var idset = stringIDToTypeID( "set" );
        var desc24476 = new ActionDescriptor();
        var idnull = stringIDToTypeID( "null" );
            var ref701 = new ActionReference();
            var idlayer = stringIDToTypeID( "layer" );
            var idbackground = stringIDToTypeID( "background" );
            ref701.putProperty( idlayer, idbackground );
        desc24476.putReference( idnull, ref701 );
        var idto = stringIDToTypeID( "to" );
            var desc24477 = new ActionDescriptor();
            var idopacity = stringIDToTypeID( "opacity" );
            var idpercentUnit = stringIDToTypeID( "percentUnit" );
            desc24477.putUnitDouble( idopacity, idpercentUnit, 100.000000 );
            var idmode = stringIDToTypeID( "mode" );
            var idblendMode = stringIDToTypeID( "blendMode" );
            var idnormal = stringIDToTypeID( "normal" );
            desc24477.putEnumerated( idmode, idblendMode, idnormal );
        var idlayer = stringIDToTypeID( "layer" );
        desc24476.putObject( idto, idlayer, desc24477 );
        var idlayerID = stringIDToTypeID( "layerID" );
        desc24476.putInteger( idlayerID, 11 );
    executeAction( idset, desc24476, DialogModes.NO );
    }
    catch(e){}
    
    
    if(app.activeDocument.height > 5464){
        // =======================================================
        var idimageSize = stringIDToTypeID( "imageSize" );
        var desc39526 = new ActionDescriptor();
        var idheight = stringIDToTypeID( "height" );
        var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
        desc39526.putUnitDouble( idheight, idpixelsUnit, 5464.000000 );
        var idscaleStyles = stringIDToTypeID( "scaleStyles" );
        desc39526.putBoolean( idscaleStyles, true );
        var idconstrainProportions = stringIDToTypeID( "constrainProportions" );
        desc39526.putBoolean( idconstrainProportions, true );
        var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
        var idinterpolationType = stringIDToTypeID( "interpolationType" );
        var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
        desc39526.putEnumerated( idinterfaceIconFrameDimmed, idinterpolationType, idautomaticInterpolation );
        executeAction( idimageSize, desc39526, DialogModes.NO );
    }
    
    // =======================================================
    var idimageSize = stringIDToTypeID( "imageSize" );
        var desc23809 = new ActionDescriptor();
        var idresolution = stringIDToTypeID( "resolution" );
        var iddensityUnit = stringIDToTypeID( "densityUnit" );
        desc23809.putUnitDouble( idresolution, iddensityUnit, 300.000000 );
        var idscaleStyles = stringIDToTypeID( "scaleStyles" );
        desc23809.putBoolean( idscaleStyles, true );
        var idconstrainProportions = stringIDToTypeID( "constrainProportions" );
        desc23809.putBoolean( idconstrainProportions, true );
        var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
        var idinterpolationType = stringIDToTypeID( "interpolationType" );
        var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
        desc23809.putEnumerated( idinterfaceIconFrameDimmed, idinterpolationType, idautomaticInterpolation );
    executeAction( idimageSize, desc23809, DialogModes.NO );
    
    // =======================================================
    var idcanvasSize = stringIDToTypeID( "canvasSize" );
        var desc4729 = new ActionDescriptor();
        var idwidth = stringIDToTypeID( "width" );
        var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
        desc4729.putUnitDouble( idwidth, idpixelsUnit, 5464.000000 );
        var idheight = stringIDToTypeID( "height" );
        var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
        desc4729.putUnitDouble( idheight, idpixelsUnit, 5464.000000 );
        var idhorizontal = stringIDToTypeID( "horizontal" );
        var idhorizontalLocation = stringIDToTypeID( "horizontalLocation" );
        var idcenter = stringIDToTypeID( "center" );
        desc4729.putEnumerated( idhorizontal, idhorizontalLocation, idcenter );
        var idvertical = stringIDToTypeID( "vertical" );
        var idverticalLocation = stringIDToTypeID( "verticalLocation" );
        var idcenter = stringIDToTypeID( "center" );
        desc4729.putEnumerated( idvertical, idverticalLocation, idcenter );
        var idcanvasExtensionColorType = stringIDToTypeID( "canvasExtensionColorType" );
        var idcanvasExtensionColorType = stringIDToTypeID( "canvasExtensionColorType" );
        var idbackgroundColor = stringIDToTypeID( "backgroundColor" );
        desc4729.putEnumerated( idcanvasExtensionColorType, idcanvasExtensionColorType, idbackgroundColor );
    executeAction( idcanvasSize, desc4729, DialogModes.NO );


    function newGuide(Array, Number) {
        if (Number % 2 == 0) {
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
                desc23819.putUnitDouble( idposition, idpixelsUnit, Array[Number]);
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
                    if(Array[8] == "red") {
                        desc23819.putInteger( idGdCA, 0 );
                        desc23819.putInteger( idGdCR, 255 );
                        desc23819.putInteger( idGdCG, 110 );
                        desc23819.putInteger( idGdCB, 180 );
                    }
                    else {
                        desc23819.putInteger( idGdCA, 0 );
                        desc23819.putInteger( idGdCR, 74 );
                        desc23819.putInteger( idGdCG, 255 );
                        desc23819.putInteger( idGdCB, 255 );
                    }
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

// Fit to guides Mode

    // // =======================================================
    // var idhistoryStateChanged = stringIDToTypeID( "historyStateChanged" );
    // var desc25529 = new ActionDescriptor();
    // var iddocumentID = stringIDToTypeID( "documentID" );
    // desc25529.putInteger( iddocumentID, 4175 );
    // var idID = stringIDToTypeID( "ID" );
    // desc25529.putInteger( idID, 4578 );
    // var idname = stringIDToTypeID( "name" );
    // desc25529.putString( idname, """Object Selection""" );
    // var idhasEnglish = stringIDToTypeID( "hasEnglish" );
    // desc25529.putBoolean( idhasEnglish, true );
    // var iditemIndex = stringIDToTypeID( "itemIndex" );
    // desc25529.putInteger( iditemIndex, 5 );
    // var idcommandID = stringIDToTypeID( "commandID" );
    // desc25529.putInteger( idcommandID, 5083 );


   
try{
    // =======================================================
    var idautoCutout = stringIDToTypeID( "autoCutout" );
        var desc311 = new ActionDescriptor();
        var idsampleAllLayers = stringIDToTypeID( "sampleAllLayers" );
        desc311.putBoolean( idsampleAllLayers, false );
    executeAction( idautoCutout, desc311, DialogModes.NO );
    selSubjectWorking = true;
}
catch(e){
    selSubjectWorking = false;
}
if (selSubjectWorking == false){
    try{
            // =======================================================
        var idset = stringIDToTypeID( "set" );
        var desc25530 = new ActionDescriptor();
        var idnull = stringIDToTypeID( "null" );
            var ref796 = new ActionReference();
            var idchannel = stringIDToTypeID( "channel" );
            var idselection = stringIDToTypeID( "selection" );
            ref796.putProperty( idchannel, idselection );
        desc25530.putReference( idnull, ref796 );
        var idto = stringIDToTypeID( "to" );
            var desc25531 = new ActionDescriptor();
            var idtop = stringIDToTypeID( "top" );
            var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
            desc25531.putUnitDouble( idtop, idpixelsUnit, marquee[0] );
            var idleft = stringIDToTypeID( "left" );
            var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
            desc25531.putUnitDouble( idleft, idpixelsUnit, marquee[1] );
            var idbottom = stringIDToTypeID( "bottom" );
            var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
            desc25531.putUnitDouble( idbottom, idpixelsUnit, marquee[2] );
            var idright = stringIDToTypeID( "right" );
            var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
            desc25531.putUnitDouble( idright, idpixelsUnit, marquee[3] );
        var idrectangle = stringIDToTypeID( "rectangle" );
        desc25530.putObject( idto, idrectangle, desc25531 );
        var idobjectSelectionMode = stringIDToTypeID( "objectSelectionMode" );
        desc25530.putInteger( idobjectSelectionMode, 0 );
        var iddeepSelect = stringIDToTypeID( "deepSelect" );
        desc25530.putBoolean( iddeepSelect, true );
        var idhardEdge = stringIDToTypeID( "hardEdge" );
        desc25530.putBoolean( idhardEdge, true );
        var idsmartSubtract = stringIDToTypeID( "smartSubtract" );
        desc25530.putBoolean( idsmartSubtract, true );
        executeAction( idset, desc25530, DialogModes.NO );
    }
    catch(e){}
}
    (function () {

        if (!app.documents.length) {
            alert("Open a document", " ", false);
            return;
        }
        app.preferences.rulerUnits = Units.PIXELS;
        doc = app.activeDocument;
        // Get bound of selection (or document if none).
        try {
            b1 = doc.selection.bounds;
        } catch (_) {
            // Probably nothing selected.
            // Use doc bounds.
            b1 = [0, 0, doc.width, doc.height];
        }
        // Get bounds of guides.
        if(mono == true){
            guideArray1[6] = guideArray1[2]
        }
        else{}
        b2 = [
            guideArray1[0],
            guideArray1[1],
            guideArray1[2],
            guideArray1[3],
        ];
        if(b1[2]-b1[0]>doc.width/2)
        {
            b2[0] = -5000
            b2[2] = doc.width + 5000
            b2[3] = doc.height + 5;
        }
        // Calculate scaling to fit selection into guides.
        scaleY = Number(b2[3] - b2[1]) / Number(b1[3] - b1[1]);
        scaleX = Number(b2[2] - b2[0]) / Number(b1[2] - b1[0]);
        // Deselect selection
        doc.selection.deselect();
        // Handle bottom layer.
        layerBottom = doc.layers[doc.layers.length - 1];
        // Preserve bottom layer properties.
        isBackgroundVisible = layerBottom.visible;
        isBackgroundLayer = layerBottom.isBackgroundLayer;
        // Make bottom layer not background and visible.
        if (!layerBottom.isBackgroundLayer) {
            layerBottom.visible = true;
        }
        layerBottom.isBackgroundLayer = false;
        // Use lowest of X and Y scale.
        scale = Math.min(scaleX, scaleY);
        // Scale bounds.
        b1[0] *= scale;
        b1[1] *= scale;
        b1[2] *= scale;
        b1[3] *= scale;
        // Get center of bounds.
        c1[0] = Number(b1[0]) + (Number(b1[2] - b1[0]) / 2);
        c1[1] = Number(b1[1]) + (Number(b1[3] - b1[1]) / 2);
        // Get center of guides.
        c2[0] = Number(b2[0]) + (Number(b2[2] - b2[0]) / 2);
        c2[1] = Number(b2[1]) + (Number(b2[3] - b2[1]) / 2);
        // Get active layer.
        layer = doc.activeLayer;
        // Script fails if no layer is selected.
        // But when none are selected, 'doc.activeLayer' returns the highest layer.
        // Select the active layer to ensure script succeeds.
        // If not the intended layer, result should be obvious.
        // User needs to select the correct layer.
        (function () {
            // Select active layer.
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putName(charIDToTypeID('Lyr '), layer.name);
            desc1.putReference(charIDToTypeID('null'), ref1);
            desc1.putBoolean(charIDToTypeID('MkVs'), false);
            var list1 = new ActionList();
            list1.putInteger(4);
            desc1.putList(charIDToTypeID('LyrI'), list1);
            executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
        })();
        // Get layer bounds.
        b3 = layer.bounds;
        if (b3[0] > 0 || b3[1] > 0) {
            // Layer does not reach doc bounds.
            // Store offset and translate to doc origin.
            layerOffset = [b3[0], b3[1]];
            try {
                layer.translate(-layerOffset[0], -layerOffset[1]);
            } catch (_) {
                alert("Cannot translate selected layer", " ", false);
                return;
            }
        }
        // Resize the layer.
        try {
            layer.resize(scale * 100, scale * 100, AnchorPosition.TOPLEFT);
        } catch (_) {
            alert("Cannot resize selected layer.", " ", false);
            return;
        }
        if (layerOffset[0] || layerOffset[1]) {
            // Add back offset scaled.
            layer.translate(layerOffset[0] * scale, layerOffset[1] * scale);
        }
        // Translate layer to put content inside guides.
        // X always center.
        translateX = c2[0] - c1[0];
        translateY = c2[1] - c1[1];
        // Y based on vAlign value.
        // switch (vAlign) {
        //     case 1: // Align top
        //         translateY = Number(b2[1]) - Number(b1[1]);
        //         break;
        //     case 3: // Align bottom
        //         translateY = Number(b2[3]) - Number(b1[3]);
        //         break;
        //     default: // Align center
        //         translateY = c2[1] - c1[1];
        //         break;
        //}
        layer.translate(translateX, translateY);
    })();

            
newGuide(guideArray1, 1);
newGuide(guideArray1, 3);
newGuide(guideArray1, 4);