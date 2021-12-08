var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.Planets.baseURL	= '../'

// from http://planetpixelemporium.com/

THREEx.Planets.createSun	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Sun_Map.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Sun_Map.jpg'),
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMercury	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mercury_Map.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mercury_Map.jpg'),
		bumpScale: 0.0025,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMercuryLR	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mercury_Map_LR.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mercury_Map_LR.jpg'),
		bumpScale: 0.0025,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createVenus	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 128, 128)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Venus_Map.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Venus_Bump.jpg'),
		bumpScale: 0.0025,
		
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createVenusA	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 128, 128)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Venus_A_Map.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Venus_A_Map.jpg'),
		bumpScale: 0.0005,
		
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createProximab	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Proxima_Map.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Proximab_Bump.jpg'),
		bumpScale	: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEarth	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Earth_Map.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Earth_Bump.jpg'),
		bumpScale	: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEarthCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 2048
	canvasResult.height	= 1024
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'planet/images/earthcloudmaptrans.jpg';
	}, false);
	    imageMap.src	= THREEx.Planets.baseURL+'planet/images/earthcloudmap.jpg';

	var geometry	= new THREE.SphereGeometry(0.503, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.5,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createMoon	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMars	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mars_Map.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mars_Map.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMars_Terra	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/mars_terra.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/mars_terra.jpg'),
		bumpScale: 0.0001,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createJupiter	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Jupiter_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Jupiter_Bump.jpg'),
		bumpScale: 0.0005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createJupiterCloudAnimation	= function(){
	
	//https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Texture-Animation.html;
	
	//var runnerTexture = new THREE.ImageUtils.loadTexture( 'images/run.png' );
	//annie = new TextureAnimator( runnerTexture, 10, 1, 10, 75 ); // texture, #horiz, #vert, #total, duration.
	//var runnerMaterial = new THREE.MeshBasicMaterial( { map: runnerTexture, side:THREE.DoubleSide } );
	//var runnerGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
	//var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
	//runner.position.set(-100,25,0);
	//scene.add(runner);
	
	
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/jupiter_clouds.jpg')
	var animTxtr = new TextureAnimator( texture, 1, 14, 14, 75 ); // texture, #horiz, #vert, #total, duration.
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		//bumpMap	: texture,
		//bumpScale: 0.02,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createJupiterCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 512
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'planet/images/jupiter_cloud_map_1a_1024x512.jpg';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'planet/images/jupiter_cloud_map_color_1a_1024x512.jpg';

	var geometry	= new THREE.SphereGeometry(0.503, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.3,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createSaturnCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 2048
	canvasResult.height	= 1024
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'planet/images/Saturn_Bump.png';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'planet/images/Saturn_Clouds.png';

	var geometry	= new THREE.SphereGeometry(0.503, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 1,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createVenusCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 2048
	canvasResult.height	= 1024
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'planet/images/Venus_Bump.jpg';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'planet/images/Venus_A_Map.jpg';

	var geometry	= new THREE.SphereGeometry(0.503, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 1,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createSaturn	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Saturn_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Saturn_Bump.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


THREEx.Planets.createSaturnRing	= function(){
	// create destination canvas
	// w,h is for the swatch (saturnringpattern.gif, saturnringcolor.jpg)
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1100
	canvasResult.height	= 64
	var contextResult	= canvasResult.getContext('2d')	

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'planet/images/saturnringpattern.gif';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'planet/images/saturnringcolor.jpg';
	
	var geometry	= new THREEx.Planets._RingGeometry(0.60, 1.2, 128);
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		// map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.6,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.lookAt(new THREE.Vector3(0,-4,0))
	return mesh	
}


THREEx.Planets.createUranus	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Uranus_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Uranus_Bump.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createUranusRing	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 72
	var contextResult	= canvasResult.getContext('2d')	

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'planet/images/uranusringtrans.gif';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'planet/images/uranusringcolour.jpg';
	
	var geometry	= new THREEx.Planets._RingGeometry(0.80, 1.2, 64);
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		// map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.lookAt(new THREE.Vector3(0,-4,0))
	return mesh	
}


THREEx.Planets.createNeptune	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Neptune_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Neptune_Bump.jpg'),
		bumpScale: 0.0005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createPlanet9	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Planet9_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Planet9_Map.jpg'),
		bumpScale: 0.0005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createCeres	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Ceres_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Ceres_Map.jpg'),
		bumpScale: 0.001,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEnceladus	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Enceladus_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Enceladus_Map.jpg'),
		bumpScale: 0.0025,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createIo	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Io_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Io_Map.jpg'),
		bumpScale: 0.0025,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createMimas	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mimas_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Mimas_Map.jpg'),
		bumpScale: 0.00005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEurope	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Europa_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Europa_Map.jpg'),
		bumpScale: 0.0025,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createTitan	= function(){
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Titan_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Titan_Map.jpg'),
		bumpScale: 0.0005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}



THREEx.Planets.createPluto	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Pluto_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Pluto_Map.jpg'),
		bumpScale: 0.0025,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createCharon	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Charon_Map.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'planet/images/Charon_Map.jpg'),
		bumpScale: 0.0045,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createStarfield	= function(){
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/galaxy_starfield.png')
	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		side	: THREE.BackSide
	})
	var geometry	= new THREE.SphereGeometry(100, 32, 32)
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * change the original from three.js because i needed different UV
 * 
 * @author Kaleb Murphy
 * @author jerome etienne
 */
THREEx.Planets._RingGeometry = function ( innerRadius, outerRadius, thetaSegments ) {

	THREE.Geometry.call( this )

	innerRadius	= innerRadius || 0
	outerRadius	= outerRadius || 50
	thetaSegments	= thetaSegments	|| 8

	var normal	= new THREE.Vector3( 0, 0, 1 )

	for(var i = 0; i < thetaSegments; i++ ){
		var angleLo	= (i / thetaSegments) *Math.PI*2
		var angleHi	= ((i+1) / thetaSegments) *Math.PI*2

		var vertex1	= new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
		var vertex2	= new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
		var vertex3	= new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
		var vertex4	= new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

		this.vertices.push( vertex1 );
		this.vertices.push( vertex2 );
		this.vertices.push( vertex3 );
		this.vertices.push( vertex4 );
		

		var vertexIdx	= i * 4;

		// Create the first triangle
		var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
		var uvs = []

		var uv = new THREE.Vector2(0, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(0, 1)
		uvs.push(uv)

		this.faces.push(face);
		this.faceVertexUvs[0].push(uvs);

		// Create the second triangle
		var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
		var uvs = []

		var uv = new THREE.Vector2(0, 1)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 0)
		uvs.push(uv)
		var uv = new THREE.Vector2(1, 1)
		uvs.push(uv)

		this.faces.push(face);
		this.faceVertexUvs[0].push(uvs);
	}

	this.computeCentroids();
	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), outerRadius );

};
THREEx.Planets._RingGeometry.prototype = Object.create( THREE.Geometry.prototype );


