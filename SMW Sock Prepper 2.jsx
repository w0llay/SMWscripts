app.preferences.rulerUnits = Units.PIXELS;
var f;
var m;
var l;
var buttAnkle;
var buttCap;
var buttCrew;
var buttFlat;
var buttForFace;
var buttLowAnkle;
var buttMidCrew;
var buttNoShow;
var buttOverCalf;
var buttTallAnkle;
var buttTallCrew;
var buttCancel;
var buttOk;
var sockType;
var L1 = new Array(140, 188,188, 0, 0, 128, 204, 290, 360, 136, 358);
var T1 = new Array(640, 274, 610, 310, 280, 1284, 446, 1230, 372, 640, 530);
var R1 = new Array(2180, 2074, 2120, 5464, 5464, 2044, 1842, 2074, 1618, 2208, 2120);
var B1 = new Array(4190, 4910, 4906, 5172, 5280, 4170, 4636, 3790, 4800, 4490, 4794);
var L2 = new Array(1580, 1760, 2120, 0, 0, 1328, 1842, 1460, 1618, 2060, 0);
var T2 = new Array(1030, 274, 396, 0, 0, 1464, 156, 1400, 236, 848, 366);
var R2 = new Array(5324, 5276, 5276, 5464, 5464, 5336, 5260, 5174, 5104, 5328, 5106);
var B2 = new Array(5024, 5280, 5066, 5464, 5464, 5024, 5186, 4444, 5188, 5024, 5118);
var guideArray1 = new Array(0, 0, 5464, 5464);
var guideArray2 = new Array(0, 0, 5464, 5464);
var horVert = "horizontal";
var mono = false;

//fit to guides variables
var sockMarquee = new Array(3140, 2400, 4585, 3738)
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
var vAlign = 2; // Default to center

var b1ag = [];
var b2ag = [];
var b3ag = [];
var c1ag = [];
var c2ag = [];
var docag;
var guidesXag = [];
var guidesYag = [];
var iag;
var isBackgroundLayerag;
var isBackgroundVisibleag;
var layerag;
var layerBottomag;
var layerOffsetag = [0, 0];
var scaleag;
var scaleXag;
var scaleYag;
var translateXag;
var translateYag;
var vAlignag = 2; // Default to center

// =======================================================
f = new Window("dialog", "Will's Sock Prep Pro");
f.alignChildren = "fill";
f.location = [$.screens[0].right/2+200, $.screens[0].bottom/2-200]
m = f.add("panel");
m.add("statictext", undefined, "Sock Type:");
l = m.add("group");
l.orientation = "column";
l.alignChildren = "left";
buttAnkle = l.add("radiobutton", undefined, "Ankle");
buttCap = l.add("radiobutton", undefined, "Cap");
buttCrew = l.add("radiobutton", undefined, "Crew");
buttFlat = l.add("radiobutton", undefined, "Flat");
buttForFace = l.add("radiobutton", undefined, "Forward Facing");
buttLowAnkle = l.add("radiobutton", undefined, "Low Ankle"); 
buttMidCrew = l.add("radiobutton", undefined, "Mid/Kid Crew");
buttNoShow = l.add("radiobutton", undefined, "No Show");
buttOverCalf = l.add("radiobutton", undefined, "Over Calf");
buttTallAnkle = l.add("radiobutton", undefined, "Tall Ankle");
buttTallCrew = l.add("radiobutton", undefined, "Tall Crew");
l = f.add("group");
l.alignment = "center";
buttOk = l.add("button", undefined, "OK");
buttCancel = l.add("button", undefined, "Cancel");
buttAnkle.value = true;
buttOk.onClick = function () {
    if (buttCap.value) {
        f.close(1);
    } else if (buttCrew.value) {
        f.close(2);
    } else if (buttFlat.value) {
        f.close(3);
    } else if (buttForFace.value) {
        mono = true;
        f.close(4);
    } else if (buttLowAnkle.value) {
        f.close(5);
    } else if (buttMidCrew.value) {
        f.close(6);
    } else if (buttNoShow.value) {
        f.close(7);
    } else if (buttOverCalf.value) {
        f.close(8);
    } else if (buttTallAnkle.value) {
        f.close(9);
    } else if (buttTallCrew.value) {
        f.close(10);
    } else {
        // Default Ankle.
        f.close(0);
    }
};
buttCancel.onClick = function () {
    f.close(11);
};

sockType = f.show();

if (sockType < 11) {
    guideArray1 = [L1[sockType], T1[sockType], R1[sockType], B1[sockType], 0, 0, 5464, 5464, "blue"];
    guideArray2 = [L2[sockType], T2[sockType], R2[sockType], B2[sockType], 0, 0, 5464, 5464, "red"] ;
    activeDocument.guides.removeAll()
    newGuide(guideArray1, 0);
    newGuide(guideArray1, 1);
    newGuide(guideArray1, 2);
    newGuide(guideArray1, 3);
    newGuide(guideArray2, 0);
    newGuide(guideArray2, 1);
    newGuide(guideArray2, 2);
    newGuide(guideArray2, 3);
}


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