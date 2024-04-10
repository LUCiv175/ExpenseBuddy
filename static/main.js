/*
fetch("/api/notes")
    .then(response => response.json())
    .then(data => {
        data.map(note => {
            const marker = L.marker([note.lat, note.lng]).addTo(map);
            marker.bindPopup(note.content);
        })
    });*/