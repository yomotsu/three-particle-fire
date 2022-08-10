# three-particle-fire

Fire mesh object for three.js

[![Latest NPM release](https://img.shields.io/npm/v/three-particle-fire.svg)](https://www.npmjs.com/package/three-particle-fire)
![MIT License](https://img.shields.io/npm/l/three-particle-fire.svg)
[![dependencies Status](https://david-dm.org/yomotsu/three-particle-fire/status.svg)](https://david-dm.org/yomotsu/three-particle-fire)

![](https://yomotsu.github.io/three-particle-fire/examples/capture.jpg)

[Demos can be seen here](https://yomotsu.github.io/three-particle-fire/examples/basic.html).

## Usage

1. Import your three.js and then prepare three-particle-fire to use.
```javascript
import * as THREE from 'three';
import particleFire from 'three-particle-fire';

particleFire.install( { THREE: THREE } );
```

2. Now ready to use. particleFire will provide geometry and material for `THREE.Points` class.
```javascript
var fireRadius = 0.5;
var fireHeight = 3;
var particleCount = 800;
var height = window.innerHeight;

var geometry0 = new particleFire.Geometry( fireRadius, fireHeight, particleCount );
var material0 = new particleFire.Material( { color: 0xff2200 } );
material0.setPerspective( camera.fov, height );
var particleFireMesh0 = new THREE.Points( geometry0, material0 );
scene.add( particleFireMesh0 );
```

3. Update on tick in your render loop.
```javascript
function update () {

  var delta = clock.getDelta();

  requestAnimationFrame( update );

  particleFireMesh0.material.update( delta );
  renderer.render( scene, camera );

}
```

4. Sync on onresize event

```javascript
window.addEventListener( 'resize', function () {

  var width  = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize( width, height );

  particleFireMesh0.material.setPerspective( camera.fov, height );

} );
```
