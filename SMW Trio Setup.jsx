app.preferences.rulerUnits = Units.PIXELS;
// =======================================================
var idcanvasSize = stringIDToTypeID( "canvasSize" );
var desc4729 = new ActionDescriptor();
var idwidth = stringIDToTypeID( "width" );
var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
desc4729.putUnitDouble( idwidth, idpixelsUnit, 3600.000000 );
var idheight = stringIDToTypeID( "height" );
var idpixelsUnit = stringIDToTypeID( "pixelsUnit" );
desc4729.putUnitDouble( idheight, idpixelsUnit, 3600.000000 );
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

// =======================================================
var idclearAllGuides = stringIDToTypeID( "clearAllGuides" );
executeAction( idclearAllGuides, undefined, DialogModes.NO );

newGuide(150, true)
newGuide(3600-150, true)
newGuide(150, false)
newGuide(3600-150, false)

function newGuide(coord, orientBool) {
    if (orientBool) {
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
            desc23819.putUnitDouble( idposition, idpixelsUnit, coord);
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




