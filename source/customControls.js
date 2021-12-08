var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = .5;
var targetRotationOnMouseDownY = 0;

var mouseDown = false;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = 0;
var windowHalfY = 0;

var finalRotationY
var objName = "";

//////////////////////////////////////////////////////////////////////////////////
//		ALT ROTATION EVENT LISTENERS 							//
//////////////////////////////////////////////////////////////////////////////////
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mouseup', onDocumentMouseUp, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

function setWindowHalf(w,h) {
	var windowHalfX = w / 2; //window.innerWidth / 2;
	var windowHalfY = h / 2; //window.innerHeight / 2;
}

function update() {
	if (( targetRotationX - containerEarth.rotation.y ) < .005 && objName != "uranus"){
  		targetRotationX+=.005;
	}

	//horizontal rotation
	containerEarth.rotation.y += ( targetRotationX - containerEarth.rotation.y ) * 0.1;

	//vertical rotation
	finalRotationY = (targetRotationY - containerEarth.rotation.x);

	//     containerEarth.rotation.x += finalRotationY * 0.05;
	//     finalRotationY = (targetRotationY - containerEarth.rotation.x);

    if (containerEarth.rotation.x  <= 1 && containerEarth.rotation.x >= -1 ) {
    	containerEarth.rotation.x += finalRotationY * 0.1;
    }

    if (containerEarth.rotation.x  > 1 ) {
    	containerEarth.rotation.x = 1
    }

    if (containerEarth.rotation.x  < -1 ) {
    	containerEarth.rotation.x = -1
    }
}

function onDocumentMouseDown( event ) {

		// raycasting may have set color to something other than default;
		// set all back to default;
		//containerPlot.children.forEach(function( containerPlot ) {
			//containerPlot.material.color.set( 0xCCCCCC );
		//});

		mouseDown = true;

        event.preventDefault();

        //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;

        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;

	}

	function onDocumentMouseMove( event ) {
	 	if ( mouseDown ){
	        mouseX = event.clientX - windowHalfX;
	        mouseY = event.clientY - windowHalfY;

	        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;
	        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.01;
		} else {

/*			mouseVector.x = 2 * (event.clientX / width) - 1;
			mouseVector.y = 1 - 2 * ( event.clientY / height );*/

			//var raycaster = projector.pickingRay( mouseVector.clone(), camera ),
				//intersects = raycaster.intersectObjects( containerEarth.children );

			var intersectCount = 0;
/*			containerEarth.children.forEach(function( containerPlot ) {
				//containerPlot.material.color.set( 0xCCCCCC );
				var raycaster = projector.pickingRay( mouseVector.clone(), camera ),
					intersects = raycaster.intersectObjects( containerPlot.children );
					if (intersects.length > 0) {
						intersectCount++;
					};
			});*/

			//console.log("intersectCount = "+intersectCount);

			//for( var i = 0; i < intersects.length; i++ ) {
				//var intersection = intersects[ i ],
				//obj = intersection.object;
				//obj.material.color.set( 0xFF8000 );
			//}
		}
	}

	function onDocumentMouseUp( event ) {

	        //document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	        //document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			mouseDown = false;
	}

	function onDocumentMouseOut( event ) {

	        //document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	        //document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			mouseDown = false;
	}

	function onDocumentTouchStart( event ) {

	        if ( event.touches.length == 1 ) {

	                event.preventDefault();

	                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
	                targetRotationOnMouseDownX = targetRotationX;

	                mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
	                targetRotationOnMouseDownY = targetRotationY;

	        }

	}

	function onDocumentTouchMove( event ) {

	        if ( event.touches.length == 1 ) {

	                event.preventDefault();

	                mouseX = event.touches[ 0 ].pageX - windowHalfX;
	                targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.01;

	                mouseY = event.touches[ 0 ].pageY - windowHalfY;
	                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;

	        }

	}
