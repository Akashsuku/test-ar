document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.getElementById('videoContainer');
  const scene = document.querySelector('a-scene');
  const camera = document.querySelector('[camera]');
  
  // Function to detect if the marker is pointing at the windmill
  const checkMarkerDirection = () => {
    const raycaster = new THREE.Raycaster();
    const cameraDirection = new THREE.Vector3();
    const windmillMarker = document.querySelector('a-marker');

    camera.object3D.getWorldDirection(cameraDirection);
    raycaster.set(camera.object3D.position, cameraDirection);

    const intersects = raycaster.intersectObject(windmillMarker.object3D, true);

    if (intersects.length > 0) {
      videoContainer.setAttribute('visible', true);
    } else {
      videoContainer.setAttribute('visible', false);
    }
  };

  scene.addEventListener('markerFound', () => {
    checkMarkerDirection();
  });

  scene.addEventListener('markerLost', () => {
    videoContainer.setAttribute('visible', false);
  });

  // Continuously check the direction of the marker
  setInterval(checkMarkerDirection, 100);
});
