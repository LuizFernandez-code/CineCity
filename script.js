/* MOBILE MENU */
const ham = document.getElementById("hamburger");
const nav = document.getElementById("nav");

ham.addEventListener("click", () => {
    nav.classList.toggle("open");
});

/* FADE IN */
const faders = document.querySelectorAll('.fade-in');
const appear = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('appear');
        }
    });
},{ threshold:0.2 });

faders.forEach(f => appear.observe(f));

/* --------------------------
   LEAFLET MAP
--------------------------- */

const locations = [
    { name: "Cinema Zuid", coords: [51.21475, 4.39218] },
    { name: "De Studio", coords: [51.22063, 4.41732] },
    { name: "FOMU", coords: [51.20870, 4.39241] },
    { name: "Permeke", coords: [51.22058, 4.42101] },
    { name: "AP Campus Keizerstraat", coords: [51.22139, 4.40981] },
    { name: "AP Campus Spoor Noord", coords: [51.22936, 4.42172] }
];

const map = L.map('map', {
    scrollWheelZoom: false,
    zoomControl: false
}).setView([51.2194, 4.4025], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

const neonIcon = L.divIcon({
    className: "neon-marker",
    iconSize: [18,18],
    iconAnchor: [9,9]
});

let markers = [];

locations.forEach(loc => {
    const m = L.marker(loc.coords, { icon: neonIcon })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b>`);
    markers.push(m);
});

/* Highlights bij hover */
document.querySelectorAll("#locList li").forEach((li, i)=>{
    li.addEventListener("mouseenter", ()=> markers[i]._icon.classList.add("marker-active"));
    li.addEventListener("mouseleave", ()=> markers[i]._icon.classList.remove("marker-active"));
    li.addEventListener("click", ()=>{
        map.flyTo(locations[i].coords,16,{duration:0.6});
        markers[i].openPopup();
    });
});
