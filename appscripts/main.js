//this is the main code


define(
[],
function () {
    
    //var iosocket = io.connect();

   // var typingBox = document.getElementById("outgoingChatMessage");
   // var chatBox = document.getElementById("chatBox");
   
       
    var svgDiv = document.getElementById("svgcanvas");
    var paper = new Raphael(svgcanvas); 
    var rect = paper.rect(0, 0, 450, 550);
        rect.attr({"fill":"url('http://images.neopets.com/faerieland/colour/17.jpg')", "stroke": "black"});
    var raphaelPath; // Holds raphael path
    var pathString; // Holds path string 
    var mousePushed = false // mousedown state


    // This portion is for the creation of a new button, so that the user may draw/ colour a different design
    var buttonOne = paper.circle(50, 50, 30);
        var oneText = paper.text(50, 50, 'ONE');
        buttonOne.attr({
            'stroke': "black",
            'stroke-width': 3,
            'fill': "#BCC1F2",

        });
        oneText.attr({
            'font-size': '15px', 'font-weight':'800', 'font-family': 'Rockwell',
        });

        buttonOne.node.addEventListener('mouseover', function(ev){
            buttonOne.attr({
                'fill': "#DB5844"

            })

            rect.attr({"fill":"url('http://www.activityvillage.co.uk/sites/default/files/images/elephant_colouring_page.gif')"});
        });

        buttonOne.node.addEventListener('mouseout', function(ev){
            buttonOne.attr({
                'fill': "#BCC1F2"
            })
        });

        oneText.node.addEventListener('mouseover', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonOne.attr({
                'fill': "#DB5844"
            })
        });

        oneText.node.addEventListener('mouseout', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonOne.attr({
                'fill': "#BCC1F2"
            })
        });

        // This portion is for the creation of a new button, so that the user may draw/ colour a different design

        var buttonTwo = paper.circle(400, 50, 30);
        var twoText = paper.text(400, 50, 'TWO');
        buttonTwo.attr({
            'stroke': "black",
            'stroke-width': 3,
            'fill': "#BCC1F2",

        });
        twoText.attr({
            'font-size': '15px', 'font-weight':'800', 'font-family': 'Rockwell',
        });

        buttonTwo.node.addEventListener('mouseover', function(ev){
            buttonTwo.attr({
                'fill': "#DB5844"

            })

            rect.attr({"fill":"url('http://www.picgifs.com/coloring-pages/tv-series-coloring-pages/neopets/neopets-coloring-pages-85.gif')"});
        });

        buttonTwo.node.addEventListener('mouseout', function(ev){
            buttonTwo.attr({
                'fill': "#BCC1F2"
            })
        });

        twoText.node.addEventListener('mouseover', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonTwo.attr({
                'fill': "#DB5844"
            })
        });

        twoText.node.addEventListener('mouseout', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonTwo.attr({
                'fill': "#BCC1F2"
            })
        });

    var mx; // Holds x coord for M 
    var my; // Holds y coord for M
    var lx; // Holds x coord for L 
    var ly; // Holds y coord for L 

    var otherline; // Holds raphael path that someone else drew 

     //----------- Color String ---------------
    // Contructs color string for line  
    var makeColorString = function(ih, is, il) {
        var colorString = "hsl(" + ih + "," + is + "%," + il + "%)";
        return colorString
        };

    var map = function(x,a,b,m,n) { //mapping the function which takes variable x in the range [a,b] 
            return Math.floor(m+(n-m)*(x-a)/(b-a)); //function returns a value mapped into the range [m,n]
        }; 

    var sliderHue = document.getElementById("sliderHue");
    var sliderSaturation = document.getElementById("sliderSaturation");
    var sliderLightness = document.getElementById("sliderLightness");
    var sliderOpacity = document.getElementById("sliderOpacity");
    
    var hValue = map(sliderHue.value,0,1,1,360);// to map Hue value 
    var sValue = map(sliderSaturation.value,0,1,1,100);// to map Saturation value 
    var lValue = map(sliderLightness.value,0,1,1,100);// to map Lightness value 
    var oValue = sliderOpacity.value;
    var otherColor; // Holds color string received from others

    clearButton.addEventListener('click', function(){
        paper.clear(); // Button click -> all lines cleared
        console.log('Paper is now empty');
        reset(); // to ensure that the colouring sheets comes back again, more clearly explained in the write up
    });

    svgDiv.addEventListener("mousedown",function(ev){
        mx = ev.offsetX; // Initializing of path string w offsetX for X coordinates for moveto
        my = ev.offsetY; // Initializing of path string w offsetY for Y coordinates for moveto 
        pathString = "M" + mx + "," + my
        raphaelPath = paper.path(pathString); //path drawn with new pathstring argument that has M coordinates

        hValue = map(sliderHue.value,0,1,1,360); //New value for hue
        sValue = map(sliderSaturation.value,0,1,1,100); //New value for saturation
        lValue = map(sliderLightness.value,0,1,1,100); //New value for lightness
                raphaelPath.attr({
            "stroke" : makeColorString(hValue,sValue,lValue), //vary stroke colour with HSL new colour
            "stroke-width": 5,
            "opacity" : 1
        });
        mousePushed = true;//change mousestate so mousemove can work 
    });

    svgDiv.addEventListener("mousemove",function(ev){
        if (mousePushed === true){ 
            lx = ev.offsetX; // Initializing of path string w offsetX for X coordinates for lineto
            ly = ev.offsetY; // Initializing of path string w offsetX for Y coordinates for lineto
            pathString = "M" + mx + "," + my + "L" + lx + "," + ly // pathString now includes new M and L coordinates 
            raphaelPath = paper.path(pathString); // updated path attribute
            hValue = map(sliderHue.value,0,1,1,360); // New value for hue
            sValue = map(sliderSaturation.value,0,1,1,100); // New value for saturation
            lValue = map(sliderLightness.value,0,1,1,100); // New value for lightness
            oValue = sliderOpacity.value; // New value for opacity 
            raphaelPath.attr({
                "stroke" : makeColorString(hValue,sValue,lValue), //vary stroke colour with HSL new colour
                "stroke-width": 5,
                "opacity" : oValue //New value for opacity
            });
            mx = ev.offsetX; // New M coordinates will be the start point of the new pathstring drawn 
            my = ev.offsetY; // New M coordinates will be the start point of the new pathstring drawn 
            otherColor = makeColorString(hValue, sValue, lValue); //holds the color string to be sent through socket
            // iosocket.send({
            //     "mtype" : "pathString", // Notifies a incoming text which is not chat text, hence it should be drawn 
            //     "data" : pathString, // Notifies the line to be drawn
            //     "color": otherColor, // Notifies the colour of the line to be drawn
            //     "opac" : oValue // Notifies the opacity of the line to be drawn
            // });
        }
    })

    svgDiv.addEventListener("mouseup",function(ev){
        mousePushed = false; //change mousestate, to ensure that no new lines will be drawn
        lx = ev.offsetX; //Initializing of path string w offsetX for X coordinates for lineto
        ly = ev.offsetY; //Initializing of path string w offsetX for Y coordinates for lineto 
        pathString = "M" + mx + "," + my + "L" + lx + "," + ly; 
        raphaelPath = paper.path(pathString); //raphael path is updated once again 
        hValue = map(sliderHue.value,0,1,1,360); // New value for hue
        sValue = map(sliderSaturation.value,0,1,1,100); // New value for saturation
        lValue = map(sliderLightness.value,0,1,1,100); // New value for lightness
        raphaelPath.attr({
            "stroke" : makeColorString(hValue,sValue,lValue),
            "stroke-width": 5,
            "opacity" : oValue
            });
        otherColor = makeColorString(hValue, sValue, lValue);
        // iosocket.send({
        //         "mtype" : "pathString", 
        //         "data" : pathString,
        //         "color" : otherColor,
        //         "opac" : oValue
        //     });
    });

    var numDots=100;
    // initialize array to empty
    var dot = [];
    var i=0;
    while(i<numDots){
        dot[i]=paper.circle(1, 1, 5);

        dot[i].colorString = "hsl(" + Math.random()+ ",1, .75)";
        dot[i].attr({"fill": dot[i].colorString, "fill-opacity" : .5});

        //Add some properties to dot just to keep track of it's "state"
        dot[i].xpos=1;
        dot[i].ypos=1;
        // Add properties to keep track of the rate the dot is moving
        //MAPPING of ranges (here, [0,1] -> [-5,5])
        dot[i].xrate= -5+10*Math.random();
        dot[i].yrate= -7+14*Math.random();
        i++;
    }



    // For counting calls to the 'draw' routine
    var count=0;
          var dist; // temp variable used inside loop
    // our drawing routine, will use as a callback for the interval timer

    gravity=.2;

    var draw = function(){

        // Count and keep track of the number of times this function is called
        count++;
        //console.log("count = " + count);
        //console.log("dot pos is ["+dot.xpos + "," + dot.ypos + "]");

        i=0;
        while(i<numDots){

            dot[i].yrate += gravity;

            dot[i].xpos += dot[i].xrate;
            dot[i].ypos += dot[i].yrate;

            // Now actually move the dot using our 'state' variables
            dot[i].attr({'cx': dot[i].xpos, 'cy': dot[i].ypos});


            i++;
        }
    }

    // call draw() periodically
   
    setInterval(draw, 40);

    var nextToEmit=0;

    setInterval(function(){
        dot[nextToEmit].xpos=1;
        dot[nextToEmit].ypos=1;
        //Add properties to keep track of the rate the dot is moving
        //MAPPING of ranges (here, [0,1] -> [-5,5])
        dot[nextToEmit].xrate= -5+10*Math.random();
        dot[nextToEmit].yrate= -7+14*Math.random();

        nextToEmit=(nextToEmit+1) % numDots;

    },100);



    if (window.DeviceOrientationEvent) {
        console.log("window.DeviceOrientationEvent is " + window.DeviceOrientationEvent);
      // Listen for the event and handle DeviceOrientationEvent object
      window.addEventListener('deviceorientation', function(ev){
        if (ev.beta != null){
            gravity= ev.beta/400;
        }

      }, false);
    } else{
        console.log("Device orientation not supported");
    }
});

 var reset = function(){
    var svgDiv = document.getElementById("svgcanvas");
    var paper = new Raphael(svgcanvas); 
    var rect = paper.rect(0, 0, 450, 550);
        rect.attr({"fill":"url('http://images.neopets.com/faerieland/colour/17.jpg')", "stroke": "black"});
    var raphaelPath; // Holds raphael path
    var pathString; // Holds path string 
    var mousePushed = false // mousedown state


    // This portion is for the creation of a new button, so that the user may draw/ colour a different design
    var buttonOne = paper.circle(50, 50, 30);
        var oneText = paper.text(50, 50, 'ONE');
        buttonOne.attr({
            'stroke': "black",
            'stroke-width': 3,
            'fill': "#BCC1F2",

        });
        oneText.attr({
            'font-size': '15px', 'font-weight':'800', 'font-family': 'Rockwell',
        });

        buttonOne.node.addEventListener('mouseover', function(ev){
            buttonOne.attr({
                'fill': "#DB5844"

            })

            rect.attr({"fill":"url('http://www.activityvillage.co.uk/sites/default/files/images/elephant_colouring_page.gif')"});
        });

        buttonOne.node.addEventListener('mouseout', function(ev){
            buttonOne.attr({
                'fill': "#BCC1F2"
            })
        });

        oneText.node.addEventListener('mouseover', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonOne.attr({
                'fill': "#DB5844"
            })
        });

        oneText.node.addEventListener('mouseout', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonOne.attr({
                'fill': "#BCC1F2"
            })
        });

        // This portion is for the creation of a new button, so that the user may draw/ colour a different design

        var buttonTwo = paper.circle(400, 50, 30);
        var twoText = paper.text(400, 50, 'TWO');
        buttonTwo.attr({
            'stroke': "black",
            'stroke-width': 3,
            'fill': "#BCC1F2",

        });
        twoText.attr({
            'font-size': '15px', 'font-weight':'800', 'font-family': 'Rockwell',
        });

        buttonTwo.node.addEventListener('mouseover', function(ev){
            buttonTwo.attr({
                'fill': "#DB5844"

            })

            rect.attr({"fill":"url('http://www.picgifs.com/coloring-pages/tv-series-coloring-pages/neopets/neopets-coloring-pages-85.gif')"});
        });

        buttonTwo.node.addEventListener('mouseout', function(ev){
            buttonTwo.attr({
                'fill': "#BCC1F2"
            })
        });

        twoText.node.addEventListener('mouseover', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonTwo.attr({
                'fill': "#DB5844"
            })
        });

        twoText.node.addEventListener('mouseout', function(ev){      // To solve inconsistency when hovering over text causing the button to be not in hover state
            buttonTwo.attr({
                'fill': "#BCC1F2"
            })
        });

        var mx; // Holds x coord for M 
        var my; // Holds y coord for M
        var lx; // Holds x coord for L 
        var ly; // Holds y coord for L 

        var otherline; // Holds raphael path that someone else drew 

         //----------- Color String ---------------
        // Contructs color string for line  
        var makeColorString = function(ih, is, il) {
            var colorString = "hsl(" + ih + "," + is + "%," + il + "%)";
            return colorString
            };

        var map = function(x,a,b,m,n) { //mapping the function which takes variable x in the range [a,b] 
                return Math.floor(m+(n-m)*(x-a)/(b-a)); //function returns a value mapped into the range [m,n]
            }; 

        var sliderHue = document.getElementById("sliderHue");
        var sliderSaturation = document.getElementById("sliderSaturation");
        var sliderLightness = document.getElementById("sliderLightness");
        var sliderOpacity = document.getElementById("sliderOpacity");
        
        var hValue = map(sliderHue.value,0,1,1,360);// to map Hue value 
        var sValue = map(sliderSaturation.value,0,1,1,100);// to map Saturation value 
        var lValue = map(sliderLightness.value,0,1,1,100);// to map Lightness value 
        var oValue = sliderOpacity.value;
        var otherColor; // Holds color string received from others

        clearButton.addEventListener('click', function(){
            paper.clear(); // Button click -> all lines cleared
            console.log('Paper is now empty');
            reset(); // to ensure that colouring sheet comes back again (explained clearly in the write up)
        });

        svgDiv.addEventListener("mousedown",function(ev){
            mx = ev.offsetX; // Initializing of path string w offsetX for X coordinates for moveto
            my = ev.offsetY; // Initializing of path string w offsetY for Y coordinates for moveto 
            pathString = "M" + mx + "," + my
            raphaelPath = paper.path(pathString); //path drawn with new pathstring argument that has M coordinates

            hValue = map(sliderHue.value,0,1,1,360); //New value for hue
            sValue = map(sliderSaturation.value,0,1,1,100); //New value for saturation
            lValue = map(sliderLightness.value,0,1,1,100); //New value for lightness
                    raphaelPath.attr({
                "stroke" : makeColorString(hValue,sValue,lValue), //vary stroke colour with HSL new colour
                "stroke-width": 5,
                "opacity" : 1
            });
            mousePushed = true;//change mousestate so mousemove can work 
        });

        svgDiv.addEventListener("mousemove",function(ev){
            if (mousePushed === true){ 
                lx = ev.offsetX; // Initializing of path string w offsetX for X coordinates for lineto
                ly = ev.offsetY; // Initializing of path string w offsetX for Y coordinates for lineto
                pathString = "M" + mx + "," + my + "L" + lx + "," + ly // pathString now includes new M and L coordinates 
                raphaelPath = paper.path(pathString); // updated path attribute
                hValue = map(sliderHue.value,0,1,1,360); // New value for hue
                sValue = map(sliderSaturation.value,0,1,1,100); // New value for saturation
                lValue = map(sliderLightness.value,0,1,1,100); // New value for lightness
                oValue = sliderOpacity.value; // New value for opacity 
                raphaelPath.attr({
                    "stroke" : makeColorString(hValue,sValue,lValue), //vary stroke colour with HSL new colour
                    "stroke-width": 5,
                    "opacity" : oValue //New value for opacity
                });
                mx = ev.offsetX; // New M coordinates will be the start point of the new pathstring drawn 
                my = ev.offsetY; // New M coordinates will be the start point of the new pathstring drawn 
                otherColor = makeColorString(hValue, sValue, lValue); //holds the color string to be sent through socket
                iosocket.send({
                    "mtype" : "pathString", // Notifies a incoming text which is not chat text, hence it should be drawn 
                    "data" : pathString, // Notifies the line to be drawn
                    "color": otherColor, // Notifies the colour of the line to be drawn
                    "opac" : oValue // Notifies the opacity of the line to be drawn
                });
            }
        })

        svgDiv.addEventListener("mouseup",function(ev){
            mousePushed = false; //change mousestate, to ensure that no new lines will be drawn
            lx = ev.offsetX; //Initializing of path string w offsetX for X coordinates for lineto
            ly = ev.offsetY; //Initializing of path string w offsetX for Y coordinates for lineto 
            pathString = "M" + mx + "," + my + "L" + lx + "," + ly; 
            raphaelPath = paper.path(pathString); //raphael path is updated once again 
            hValue = map(sliderHue.value,0,1,1,360); // New value for hue
            sValue = map(sliderSaturation.value,0,1,1,100); // New value for saturation
            lValue = map(sliderLightness.value,0,1,1,100); // New value for lightness
            raphaelPath.attr({
                "stroke" : makeColorString(hValue,sValue,lValue),
                "stroke-width": 5,
                "opacity" : oValue
                });
            otherColor = makeColorString(hValue, sValue, lValue);
            iosocket.send({
                    "mtype" : "pathString", 
                    "data" : pathString,
                    "color" : otherColor,
                    "opac" : oValue
                });
        });

    };

