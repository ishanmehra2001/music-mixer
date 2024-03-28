document.addEventListener('DOMContentLoaded', function () {
    // Get the draggable elements
    const puzzlePieces = document.querySelectorAll('.puzzle-pieces img');
  
    // Get the drop zones
    const dropZones = document.querySelectorAll('.drag_back .drop-zone');
  
    // Define the array of audio track references
    const audioTracks = ['veena', 'tabla', 'flute', 'sitar', 'harmonium'];
  
    // Define an object to store the audio elements
    const audioElements = {};
  
    // Add event listeners to the draggable elements
    puzzlePieces.forEach((piece, index) => {
      piece.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', index); // Store the index of the puzzle piece being dragged
      });
    });
  
    // Create audio elements for each audio track
    audioTracks.forEach(track => {
      const audio = new Audio(`audios/${track}.mp3`);
      audioElements[track] = audio;
    });
  
    // Add event listeners to the drop zones
    dropZones.forEach((dropZone, index) => {
      dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
  
      dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        const pieceIndex = parseInt(event.dataTransfer.getData('text/plain'));
        const droppedPiece = puzzlePieces[pieceIndex].cloneNode(true); // Clone the dropped puzzle piece
  
        // Remove the puzzle piece from its original place
        puzzlePieces[pieceIndex].remove();
  
        // Remove any existing children of the drop zone
        while (dropZone.firstChild) {
          dropZone.removeChild(dropZone.firstChild);
        }
  
        // Append the dropped puzzle piece to the drop zone
        dropZone.appendChild(droppedPiece);
  
        const audioTrack = audioTracks[pieceIndex];
  
        // If the audio is not already playing, start playing it
        if (audioElements[audioTrack].paused) {
          audioElements[audioTrack].play();
        }
      });
    });
  
    // Trigger animations for the corresponding SVG when an audio track starts playing
    Object.values(audioElements).forEach(audio => {
      audio.addEventListener('play', function () {
        const audioTrack = this.src.split('/').pop().split('.')[0]; // Extract the audio track name
        const svgID = `${audioTrack}-play`;
        triggerAnimations(svgID);
      });
    });
  
    // Function to trigger animations for the corresponding SVG
    function triggerAnimations(svgID) {
      // Remove any existing active class from all SVGs
      document.querySelectorAll('.music-player svg').forEach(svg => {
        svg.classList.remove('play-animations');
      });
  
      // Add class to trigger animations for the specified SVG
      document.getElementById(svgID).classList.add('play-animations');
    }
  });
  