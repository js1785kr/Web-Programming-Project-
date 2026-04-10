
const cropsDatabase = [ 
{ name: "Tomatoes", desc: "Grow best in warm weather with full sunlight and regular watering. Space 24-36 inches apart.", season: "Summer", img: "img13.jpg" }, 
{ name: "Carrots", desc: "Prefer loose soil and cooler temperatures for straight roots. Space 2-3 inches apart.", season: "Spring/Fall", img: "img14.jpg" }, 
{ name: "Lettuce", desc: "Fast-growing leafy green ideal for spring and fall seasons. Space 8-12 inches apart.", season: "Spring/Fall", img: "img15.jpg" }, 
{ name: "Peppers", desc: "Hot weather crop, needs well-drained soil. Space 18-24 inches apart.", season: "Summer", img: "img16.jpg" }, 
{ name: "Cucumbers", desc: "Warm season crop, needs trellising. Space 12-24 inches apart.", season: "Summer", img: "img17.jpg" }, 
{ name: "Broccoli", desc: "Cool season crop, rich soil. Space 18-24 inches apart.", 
season: "Fall", img: "img18.jpg" } 
]; 
const pestsDatabase = [ 
{ name: "Aphids", solution: "Neem oil or insecticidal soap", type: "insect", prevention: 
"Introduce ladybugs" }, 
{ name: "Slugs & Snails", solution: "Beer traps or copper tape", type: "mollusk", 
prevention: "Remove debris" }, 
{ name: "Caterpillars", solution: "Hand pick or use BT spray", type: "insect", prevention: 
"Row covers" }, 
{ name: "Spider Mites", solution: "Strong water spray", type: "arachnid", prevention: 
"Increase humidity" } 
]; 
let currentUser = localStorage.getItem('gardenerUser') ? 
JSON.parse(localStorage.getItem('gardenerUser')) : null; 
 
function updateAuthUI() { 
    const userDisplay = document.getElementById('userDisplay'); 
    const loginBtn = document.getElementById('loginBtn'); 
    const registerBtn = document.getElementById('registerBtn'); 
     
    if (currentUser && userDisplay) { 
        userDisplay.innerHTML = `${currentUser.name}`;
        if (loginBtn) loginBtn.style.display = 'none'; 
        if (registerBtn) registerBtn.style.display = 'none'; 
    } else { 
        if (userDisplay) userDisplay.innerHTML = ''; 
        if (loginBtn) loginBtn.style.display = 'inline'; 
        if (registerBtn) registerBtn.style.display = 'inline'; 
    } 
} 
 
function validateEmail(email) { 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
} 
 
function validatePhone(phone) { 
    return /^[789]\d{9}$/.test(phone); 
} 
 
function validatePAN(pan) { 
    return /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan); 
} 
 
function loadGardenNotes() { 
    const savedNote = localStorage.getItem('gardenNote'); 
    const noteTextarea = document.getElementById('gardenNote'); 
    if (noteTextarea && savedNote) { 
        noteTextarea.value = savedNote; 
    } 
} 
 
function saveGardenNote() { 
    const noteTextarea = document.getElementById('gardenNote'); 
    if (noteTextarea) { 
        localStorage.setItem('gardenNote', noteTextarea.value); 
        alert('Garden notes saved successfully!'); 
    } 
} 
 
function calculateSpacing() { 
    const cropName = document.getElementById('cropName')?.value || 'crops'; 
    const areaSqft = parseFloat(document.getElementById('areaSqft')?.value || 10); 
    const spacingInches = parseFloat(document.getElementById('spacingInches')?.value 
|| 12); 
     
    if (isNaN(areaSqft) || isNaN(spacingInches)) { 
        document.getElementById('calcResult').innerHTML = 'Please enter valid numbers'; 
        return; 
    } 
     
    const plantsPerSqft = 144 / (spacingInches * spacingInches); 
    const totalPlants = Math.floor(areaSqft * plantsPerSqft); 
     
    document.getElementById('calcResult').innerHTML = ` 
        <strong>Calculation Result:</strong><br> 
        For ${areaSqft} sq.ft with ${spacingInches}" spacing:<br> 
        You can plant approximately <strong>${totalPlants} ${cropName}</strong>.<br> 
        <small>Formula: (Area × 144) ÷ (Spacing²) = ${totalPlants} plants</small> 
    `; 
} 
 
function filterCrops() { 
    const searchTerm = document.getElementById('cropSearch')?.value.toLowerCase() || 
''; 
    const seasonFilter = document.getElementById('seasonFilter')?.value || 'all'; 
    const cropsContainer = document.getElementById('cropsContainer'); 
     
    if (!cropsContainer) return; 
     
    const filteredCrops = cropsDatabase.filter(crop => { 
        const matchesSearch = crop.name.toLowerCase().includes(searchTerm); 
        const matchesSeason = seasonFilter === 'all' || crop.season === seasonFilter; 
        return matchesSearch && matchesSeason; 
    }); 
     
    if (filteredCrops.length === 0) { 
        cropsContainer.innerHTML = '<p style="text-align:center; grid-column:span 3;">No crops found matching your criteria.</p>'; 
        return; 
    } 
     
    cropsContainer.innerHTML = filteredCrops.map(crop => ` 
        <div class="card"> 
            <img src="${crop.img}" alt="${crop.name}" class="crop-image" 
onerror="this.src='https://placehold.co/400x200/e2e8f0/2d3748?text=${crop.name}'"> 
            <div style="padding: 1.5rem;"> 
                <h3>${crop.name}</h3> 
                <p>${crop.desc}</p> 
                <span style="display:inline-block; margin-top:1rem; background:#d1fae5; 
color:#065f46; padding:0.25rem 0.75rem; border-radius:9999px; font
size:0.75rem;">${crop.season}</span> 
            </div> 
        </div> 
    `).join(''); 
} 
 
function filterPests(type) { 
    const pestCards = document.querySelectorAll('.pest-card'); 
    const filterBtns = document.querySelectorAll('.filter-btn'); 
     
    filterBtns.forEach(btn => { 
        if (btn.getAttribute('data-type') === type) { 
            btn.classList.add('active'); 
        } else { 
            btn.classList.remove('active'); 
        } 
    }); 
     
    pestCards.forEach(card => { 
        if (type === 'all' || card.getAttribute('data-type') === type) { 
            card.style.display = 'block'; 
        } else { 
            card.style.display = 'none'; 
        } 
    }); 
} 
 
function loadResourceChecklist() { 
    const checklist = document.getElementById('resourceChecklist'); 
    if (!checklist) return; 
     
    const savedItems = JSON.parse(localStorage.getItem('resourceChecklist')) || []; 
     
    checklist.innerHTML = savedItems.map((item, index) => ` 
        <li data-index="${index}" class="${item.checked ? 'checked' : ''}" 
onclick="toggleResourceItem(${index})"> 
            <input type="checkbox" ${item.checked ? 'checked' : ''} style="margin-right: 
0.5rem;"> 
            ${item.name} 
        </li> 
    `).join(''); 
} 
 
function toggleResourceItem(index) { 
    const savedItems = JSON.parse(localStorage.getItem('resourceChecklist')) || []; 
    if (savedItems[index]) { 
        savedItems[index].checked = !savedItems[index].checked; 
        localStorage.setItem('resourceChecklist', JSON.stringify(savedItems)); 
        loadResourceChecklist(); 
    } 
} 
 
function highlightCurrentMonth() { 
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }); 
    const tableRows = document.querySelectorAll('.calendar-table tbody tr'); 
     
    tableRows.forEach(row => { 
        const monthCell = row.cells[0]; 
        if (monthCell && monthCell.textContent === currentMonth) { 
            row.style.backgroundColor = '#d1fae5'; 
            row.style.fontWeight = 'bold'; 
        } 
    }); 
} 
 
let isDrawing = false; 
 
function initCanvas() { 
    const canvas = document.getElementById('gardenCanvas'); 
    if (!canvas) return; 
     
    const ctx = canvas.getContext('2d'); 
    canvas.width = 600; 
    canvas.height = 400; 
     
    ctx.strokeStyle = '#059669'; 
    ctx.lineWidth = 4; 
    ctx.lineCap = 'round'; 
    ctx.lineJoin = 'round'; 
     
    const savedDrawing = localStorage.getItem('gardenSketch'); 
    if (savedDrawing) { 
        const img = new Image(); 
        img.onload = () => ctx.drawImage(img, 0, 0); 
        img.src = savedDrawing; 
    } 
     
    function startDrawing(e) { 
        isDrawing = true; 
        const rect = canvas.getBoundingClientRect(); 
        const scaleX = canvas.width / rect.width; 
        const scaleY = canvas.height / rect.height; 
        const x = (e.clientX - rect.left) * scaleX; 
        const y = (e.clientY - rect.top) * scaleY; 
        ctx.beginPath(); 
        ctx.moveTo(x, y); 
    } 
     
    function draw(e) { 
        if (!isDrawing) return; 
        const rect = canvas.getBoundingClientRect(); 
        const scaleX = canvas.width / rect.width; 
        const scaleY = canvas.height / rect.height; 
        const x = (e.clientX - rect.left) * scaleX; 
        const y = (e.clientY - rect.top) * scaleY; 
        ctx.lineTo(x, y); 
        ctx.stroke(); 
        ctx.beginPath(); 
        ctx.moveTo(x, y); 
    } 
     
    function stopDrawing() { 
        isDrawing = false; 
        ctx.beginPath(); 
    } 
     
    canvas.addEventListener('mousedown', startDrawing); 
    canvas.addEventListener('mousemove', draw); 
    canvas.addEventListener('mouseup', stopDrawing); 
    canvas.addEventListener('mouseleave', stopDrawing); 
     
    document.getElementById('clearCanvas')?.addEventListener('click', () => { 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        localStorage.removeItem('gardenSketch'); 
        alert('Canvas cleared!'); 
    }); 
     
    document.getElementById('saveCanvas')?.addEventListener('click', () => { 
        localStorage.setItem('gardenSketch', canvas.toDataURL()); 
        alert('Sketch saved to browser!'); 
    }); 
} 
 
document.addEventListener('DOMContentLoaded', function() { 
    if (document.getElementById('cropsContainer')) { 
        filterCrops(); 
        document.getElementById('cropSearch')?.addEventListener('input', filterCrops); 
        document.getElementById('seasonFilter')?.addEventListener('change', filterCrops); 
    } 
     
    if (document.getElementById('pestsContainer')) { 
        document.querySelectorAll('.filter-btn').forEach(btn => { 
            btn.addEventListener('click', () => filterPests(btn.getAttribute('data-type'))); 
        }); 
    } 
     
    if (document.getElementById('calcBtn')) { 
        document.getElementById('calcBtn').addEventListener('click', calculateSpacing); 
    } 
     
    if (document.getElementById('saveNoteBtn')) { 
        loadGardenNotes(); 
        document.getElementById('saveNoteBtn').addEventListener('click', 
saveGardenNote); 
    } 
     
    if (document.getElementById('resourceChecklist')) { 
        loadResourceChecklist(); 
    } 
     
    if (document.getElementById('gardenCanvas')) { 
        initCanvas(); 
    } 
     
    if (document.querySelector('.calendar-table')) { 
        highlightCurrentMonth(); 
    } 
     
    updateAuthUI(); 
});