document.addEventListener("DOMContentLoaded", () => {
    // Universal Elements and Functions
    const body = document.body;
    const themeSwitcher = document.querySelector(".theme-switcher");
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const currentDateEl = document.getElementById('current-date');

    // --- 1. Theme Management ---
    const applyTheme = (theme) => {
        if (theme === "light") {
            body.classList.add("light-mode");
            // document.documentElement.style.setProperty('--bg-color', '#0d0d0eff');
           
        } else {
            body.classList.remove("light-mode");
             document.documentElement.style.setProperty('--text-color', '#ffffff');
        }
        localStorage.setItem("schoolTheme", theme);
    };

    if (themeSwitcher) {
        themeSwitcher.addEventListener("click", () => {
            const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
            const newTheme = currentTheme === "light" ? "dark" : "light";
            applyTheme(newTheme);
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem("schoolTheme") || "dark";
    applyTheme(savedTheme);


    // --- 2. Mobile Sidebar Toggle ---
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("show");
        });
        // Optional: Close sidebar when clicking outside of it
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    }
    
    // --- 3. Update Current Date ---
    if (currentDateEl) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateEl.innerHTML = `<i class="fa-solid fa-calendar"></i> ${today.toLocaleDateString('so-SO', options)}`;
    }


    // --- 4. Page-Specific Logic ---

    // A. Dashboard Page Logic
    if (document.getElementById("feeStatusChart")) {
        initializeDashboard();
    }

    // B. Students Page Logic
    if (document.getElementById("studentTable")) {
        initializeStudentsPage();
    }
    
    // C. Student Card Page Logic
    if (document.getElementById("id-cards-container")) {
        initializeStudentCardPage();
    }
});


// =================================================================
//  DASHBOARD PAGE FUNCTIONS
// =================================================================
function initializeDashboard() {
    // Update total students card
    const totalStudentsEl = document.getElementById('total-students');
    const students = JSON.parse(localStorage.getItem('students')) || [];
    if (totalStudentsEl) {
        totalStudentsEl.textContent = students.length;
    }

    // Initialize Charts
    const feeStatusCtx = document.getElementById("feeStatusChart").getContext("2d");
    new Chart(feeStatusCtx, {
        type: "bar",
        data: {
            labels: ["Wadarta", "La Helay", "Sugaya"],
            datasets: [{
                label: "Xaaladda Fiiga",
                data: [33600, 3800, 29800],
                backgroundColor: ["#4a55a2", "#28a745", "#dc3545"],
            }],
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }, x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } } },
        },
    });

    const genderCtx = document.getElementById("genderChart").getContext("2d");
    new Chart(genderCtx, {
        type: "doughnut",
        data: {
            labels: ["Wiilal", "GabDho"],
            datasets: [{ data: [7, 4], backgroundColor: ["#17a2b8", "#e83e8c"] }],
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "bottom", labels: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } } },
        },
    });
}


// =================================================================
//  STUDENTS PAGE FUNCTIONS
// =================================================================
function initializeStudentsPage() {
    const modal = document.getElementById("studentModal");
    const addStudentBtn = document.getElementById("addStudentBtn");
    const closeBtn = document.querySelector(".close-btn");
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.querySelector("#studentTable tbody");
    const searchInput = document.getElementById("searchInput");
    const profilePicInput = document.getElementById("profilePic");
    const profilePreview = document.getElementById("profilePreview");

    // --- Data Management ---
    const getStudents = () => JSON.parse(localStorage.getItem('students')) || [];
    const saveStudents = (students) => localStorage.setItem('students', JSON.stringify(students));

    let students = getStudents();

    // --- Render Function ---
    const renderStudents = (filteredStudents) => {
        studentTableBody.innerHTML = "";
        const studentsToRender = filteredStudents || students;

        if (studentsToRender.length === 0) {
            studentTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">Lama helin arday.</td></tr>`;
            return;
        }

        studentsToRender.forEach(student => {
            const row = `
                <tr data-id="${student.id}">
                    <td>${student.id}</td>
                    <td><img src="${student.photo}" alt="sawirka ardayga" class="student-photo"></td>
                    <td>${student.name}</td>
                    <td>${student.fatherName}</td>
                    <td>${student.phone}</td>
                    <td>${student.class}</td>
                    <td>$${parseFloat(student.baseFee).toFixed(2)}</td>
                    <td>
                        <button class="btn-action btn-edit"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn-action btn-delete"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
            studentTableBody.insertAdjacentHTML('beforeend', row);
        });
    };

    // --- Modal Handling ---
    const openModal = (title = "Kudar Arday Cusub", student = {}) => {
        document.getElementById('modalTitle').textContent = title;
        studentForm.reset();
        document.getElementById('studentId').value = student.id || '';
        document.getElementById('studentName').value = student.name || '';
        document.getElementById('fatherName').value = student.fatherName || '';
        document.getElementById('phone').value = student.phone || '';
        document.getElementById('class').value = student.class || '';
        document.getElementById('baseFee').value = student.baseFee || '';
        profilePreview.src = student.photo || "https://placehold.co/100x100/606470/FFF?text=Sawir";
        modal.style.display = "block";
    };

    const closeModal = () => {
        modal.style.display = "none";
    };

    addStudentBtn.addEventListener("click", () => openModal());
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Form Submission (Add/Edit) ---
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const studentData = {
            name: document.getElementById('studentName').value,
            fatherName: document.getElementById('fatherName').value,
            phone: document.getElementById('phone').value,
            class: document.getElementById('class').value,
            baseFee: document.getElementById('baseFee').value,
            photo: profilePreview.src
        };

        if (studentId) { // Editing existing student
            const index = students.findIndex(s => s.id == studentId);
            if (index > -1) {
                students[index] = { ...students[index], ...studentData };
            }
        } else { // Adding new student
            studentData.id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
            students.push(studentData);
        }

        saveStudents(students);
        renderStudents();
        closeModal();
    });

    // --- Edit and Delete ---
    studentTableBody.addEventListener("click", (e) => {
        const editBtn = e.target.closest(".btn-edit");
        const deleteBtn = e.target.closest(".btn-delete");
        
        if (editBtn) {
            const row = editBtn.closest("tr");
            const studentId = row.dataset.id;
            const student = students.find(s => s.id == studentId);
            if (student) {
                openModal("Wax ka beddel Ardayga", student);
            }
        }

        if (deleteBtn) {
            const row = deleteBtn.closest("tr");
            const studentId = row.dataset.id;
            if (confirm("Ma hubtaa inaad rabto inaad tirtirto ardaygan?")) {
                students = students.filter(s => s.id != studentId);
                saveStudents(students);
                renderStudents();
            }
        }
    });

    // --- Search Functionality ---
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm));
        renderStudents(filtered);
    });
    
    // --- Profile Picture Preview ---
    // qeybta profileka ardeyga uusoogalinayao 
    profilePreview.addEventListener('click', () => profilePicInput.click());
    profilePicInput.addEventListener("change", () => {
        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Initial render
    renderStudents();
}


// =================================================================
//  STUDENT CARD PAGE FUNCTIONS
// =================================================================
function initializeStudentCardPage() {
    const container = document.getElementById('id-cards-container');
    const students = JSON.parse(localStorage.getItem('students')) || [];

    container.innerHTML = ''; // Clear existing content
    
    if (students.length === 0) {
        container.innerHTML = `<p>Lama helin arday si loo soo saaro kaarar.</p>`;
        return;
    }

    students.forEach(student => {
        const cardHTML = `
            <div class="id-card">
                <div class="id-card-header">
                    <h4>Nidaamka Dugsiga Wiser</h4>
                </div>
                <div class="id-card-body">
                    <img src="${student.photo}" alt="Sawirka Ardayga">
                    <ul>
                        <li><strong>ID:</strong> ${student.id}</li>
                        <li><strong>Magaca:</strong> ${student.name}</li>
                        <li><strong>Aabaha:</strong> ${student.fatherName}</li>
                        <li><strong>Fasalka:</strong> ${student.class}</li>
                        <li><strong>Waqtiga uu dhacayo:</strong> 08/2026</li>
                    </ul>
                </div>
                <div class="id-card-footer">
                    <p>123 Jidka Dugsiga, Muqdisho | Telefoon: (061) 1234567</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}
