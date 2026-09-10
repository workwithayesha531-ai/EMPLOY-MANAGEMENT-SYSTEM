/* =========================================================
   EMPLOYEE MANAGEMENT SYSTEM
========================================================= */


/* ================= EMPLOYEE DATA ================= */

let employees = [
    {
        id: 1,
        firstName: "Ayesha",
        lastName: "Ali",
        email: "ayesha@ems.com",
        phone: "03001234567",
        department: "Engineering",
        position: "Frontend Developer",
        salary: 85000,
        status: "Active",
        joiningDate: "2025-01-15",
        performance: 92
    },
    {
        id: 2,
        firstName: "Sara",
        lastName: "Khan",
        email: "sara@ems.com",
        phone: "03011234567",
        department: "Design",
        position: "UI/UX Designer",
        salary: 75000,
        status: "Active",
        joiningDate: "2025-03-10",
        performance: 86
    },
    {
        id: 3,
        firstName: "Ali",
        lastName: "Ahmed",
        email: "ali@ems.com",
        phone: "03021234567",
        department: "Marketing",
        position: "Marketing Executive",
        salary: 65000,
        status: "Active",
        joiningDate: "2024-11-20",
        performance: 78
    },
    {
        id: 4,
        firstName: "Hamza",
        lastName: "Raza",
        email: "hamza@ems.com",
        phone: "03031234567",
        department: "Finance",
        position: "Accountant",
        salary: 70000,
        status: "Inactive",
        joiningDate: "2024-08-12",
        performance: 69
    }
];


/* ================= DOM ELEMENTS ================= */

const landingPage = document.getElementById("landingPage");
const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const togglePassword = document.getElementById("togglePassword");

const logoutBtn = document.getElementById("logoutBtn");

const pageTitle = document.getElementById("pageTitle");
const currentDate = document.getElementById("currentDate");

const navItems = document.querySelectorAll(".nav-item[data-page]");

const dashboardPage = document.getElementById("dashboardPage");
const employeesPage = document.getElementById("employeesPage");
const departmentsPage = document.getElementById("departmentsPage");

const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const employeeQuickAddBtn = document.getElementById("employeeQuickAddBtn");

const employeeSearch = document.getElementById("employeeSearch");
const departmentFilter = document.getElementById("departmentFilter");
const statusFilter = document.getElementById("statusFilter");

const employeeTableBody = document.getElementById("employeeTableBody");
const emptyEmployees = document.getElementById("emptyEmployees");

const employeeModal = document.getElementById("employeeModal");
const closeEmployeeModal = document.getElementById("closeEmployeeModal");
const cancelEmployeeModal = document.getElementById("cancelEmployeeModal");

const employeeForm = document.getElementById("employeeForm");
const modalTitle = document.getElementById("modalTitle");

const employeeId = document.getElementById("employeeId");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const employeeEmail = document.getElementById("employeeEmail");
const employeePhone = document.getElementById("employeePhone");
const employeeDepartment = document.getElementById("employeeDepartment");
const employeePosition = document.getElementById("employeePosition");
const employeeSalary = document.getElementById("employeeSalary");
const employeeStatus = document.getElementById("employeeStatus");
const employeeJoiningDate = document.getElementById("employeeJoiningDate");

const viewEmployeeModal = document.getElementById("viewEmployeeModal");
const closeViewModal = document.getElementById("closeViewModal");
const employeeDetails = document.getElementById("employeeDetails");

const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

const toast = document.getElementById("toast");

const dashboardThemeToggle =
    document.getElementById("dashboardThemeToggle");

const employeeThemeToggle =
    document.getElementById("employeeThemeToggle");

const employeeTotalSummary =
    document.getElementById("employeeTotalSummary");

const employeeActiveSummary =
    document.getElementById("employeeActiveSummary");

const employeeInactiveSummary =
    document.getElementById("employeeInactiveSummary");

const employeeDepartmentSummary =
    document.getElementById("employeeDepartmentSummary");

let employeeToDelete = null;

let workforceChart = null;
let departmentChart = null;
let payrollChart = null;
let performanceChart = null;


/* ================= LANDING / LOGIN ================= */

function showLoginScreen() {

    landingPage.classList.add("hidden");
    app.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    loginError.textContent = "";

}


function showLandingPage() {

    landingPage.classList.remove("hidden");
    loginScreen.classList.add("hidden");
    app.classList.add("hidden");

}


function showApp() {

    landingPage.classList.add("hidden");
    loginScreen.classList.add("hidden");
    app.classList.remove("hidden");

}


/* ================= LOGIN ================= */

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (
        email === "admin@ems.com" &&
        password === "1234"
    ) {

        loginError.textContent = "";

        showApp();

        showPage("dashboard");

        showToast("Login successful!");

    } else {

        loginError.textContent =
            "Invalid email or password.";

    }

});


/* ================= PASSWORD ================= */

togglePassword.addEventListener("click", function () {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        loginPassword.type = "password";
        togglePassword.textContent = "👁";

    }

});


/* ================= LOGOUT ================= */

logoutBtn.addEventListener("click", function () {

    showLandingPage();

    loginForm.reset();

    showToast("Logged out successfully.");

});


/* ================= NAVIGATION ================= */

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const page = item.dataset.page;

        showPage(page);

    });

});


function showPage(page) {

    dashboardPage.classList.add("hidden");
    employeesPage.classList.add("hidden");
    departmentsPage.classList.add("hidden");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });


    if (page === "dashboard") {

        dashboardPage.classList.remove("hidden");

        document
            .querySelector('[data-page="dashboard"]')
            .classList.add("active");

        pageTitle.textContent = "Dashboard";

        updateCharts();

    }


    if (page === "employees") {

        employeesPage.classList.remove("hidden");

        document
            .querySelector('[data-page="employees"]')
            .classList.add("active");

        pageTitle.textContent = "Employees";

        updateEmployeeSummary();
        populateDepartmentFilter();
        renderEmployees();

    }


    if (page === "departments") {

        departmentsPage.classList.remove("hidden");

        document
            .querySelector('[data-page="departments"]')
            .classList.add("active");

        pageTitle.textContent = "Departments";

        renderDepartments();

    }

}


/* ================= DATE ================= */

function updateDate() {

    const now = new Date();

    currentDate.textContent =
        now.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        });

}

updateDate();


/* ================= EMPLOYEE SUMMARY ================= */

function updateEmployeeSummary() {

    const total = employees.length;

    const active =
        employees.filter(e => e.status === "Active").length;

    const inactive =
        employees.filter(e => e.status === "Inactive").length;

    const departments =
        new Set(employees.map(e => e.department)).size;


    employeeTotalSummary.textContent = total;
    employeeActiveSummary.textContent = active;
    employeeInactiveSummary.textContent = inactive;
    employeeDepartmentSummary.textContent = departments;

}


/* ================= DEPARTMENT FILTER ================= */

function populateDepartmentFilter() {

    const departments = [
        ...new Set(
            employees.map(employee => employee.department)
        )
    ];

    departmentFilter.innerHTML =
        `<option value="">All Departments</option>`;

    departments.forEach(function (department) {

        const option = document.createElement("option");

        option.value = department;
        option.textContent = department;

        departmentFilter.appendChild(option);

    });

}


/* ================= EMPLOYEE TABLE ================= */

function renderEmployees() {

    const search =
        employeeSearch.value.toLowerCase().trim();

    const selectedDepartment =
        departmentFilter.value;

    const selectedStatus =
        statusFilter.value;


    const filteredEmployees =
        employees.filter(function (employee) {

            const fullName =
                `${employee.firstName} ${employee.lastName}`
                    .toLowerCase();

            const matchesSearch =
                fullName.includes(search) ||
                employee.email.toLowerCase().includes(search) ||
                employee.position.toLowerCase().includes(search);

            const matchesDepartment =
                !selectedDepartment ||
                employee.department === selectedDepartment;

            const matchesStatus =
                !selectedStatus ||
                employee.status === selectedStatus;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            );

        });


    employeeTableBody.innerHTML = "";


    if (filteredEmployees.length === 0) {

        emptyEmployees.classList.remove("hidden");

        return;

    }

    emptyEmployees.classList.add("hidden");


    filteredEmployees.forEach(function (employee) {

        const row = document.createElement("tr");

        const initials =
            `${employee.firstName[0]}${employee.lastName[0]}`
                .toUpperCase();


        row.innerHTML = `

            <td>
                <div class="employee-name">

                    <div class="employee-avatar">
                        ${initials}
                    </div>

                    <div>
                        <strong>
                            ${employee.firstName}
                            ${employee.lastName}
                        </strong>

                        <span>
                            ${employee.email}
                        </span>
                    </div>

                </div>
            </td>


            <td>
                ${employee.department}
            </td>


            <td>
                ${employee.position}
            </td>


            <td>
                ${formatCurrency(employee.salary)}
            </td>


            <td>
                <span class="status ${employee.status.toLowerCase()}">
                    ${employee.status}
                </span>
            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn"
                        onclick="viewEmployee(${employee.id})"
                    >
                        View
                    </button>

                    <button
                        class="action-btn"
                        onclick="editEmployee(${employee.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="openDeleteModal(${employee.id})"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;

        employeeTableBody.appendChild(row);

    });

}


/* ================= SEARCH / FILTER ================= */

employeeSearch.addEventListener(
    "input",
    renderEmployees
);

departmentFilter.addEventListener(
    "change",
    renderEmployees
);

statusFilter.addEventListener(
    "change",
    renderEmployees
);


/* ================= FORMAT CURRENCY ================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        maximumFractionDigits: 0
    }).format(amount);

}


/* ================= ADD EMPLOYEE ================= */

addEmployeeBtn.addEventListener(
    "click",
    openAddEmployeeModal
);

employeeQuickAddBtn.addEventListener(
    "click",
    openAddEmployeeModal
);


function openAddEmployeeModal() {

    employeeForm.reset();

    employeeId.value = "";

    modalTitle.textContent = "Add Employee";

    employeeStatus.value = "Active";

    employeeModal.classList.remove("hidden");

}


/* ================= CLOSE EMPLOYEE MODAL ================= */

closeEmployeeModal.addEventListener(
    "click",
    closeEmployeeForm
);

cancelEmployeeModal.addEventListener(
    "click",
    closeEmployeeForm
);


function closeEmployeeForm() {

    employeeModal.classList.add("hidden");

}


/* ================= SAVE EMPLOYEE ================= */

employeeForm.addEventListener("submit", function (e) {

    e.preventDefault();


    const id = employeeId.value;


    const employeeData = {

        firstName: firstName.value.trim(),

        lastName: lastName.value.trim(),

        email: employeeEmail.value.trim(),

        phone: employeePhone.value.trim(),

        department: employeeDepartment.value,

        position: employeePosition.value.trim(),

        salary: Number(employeeSalary.value),

        status: employeeStatus.value,

        joiningDate: employeeJoiningDate.value,

        performance: Math.floor(
            Math.random() * 30 + 70
        )

    };


    if (id) {

        const index =
            employees.findIndex(
                employee => employee.id == id
            );

        if (index !== -1) {

            employees[index] = {
                ...employees[index],
                ...employeeData
            };

        }

        showToast("Employee updated successfully.");

    } else {

        employeeData.id =
            Date.now();

        employees.push(employeeData);

        showToast("Employee added successfully.");

    }


    closeEmployeeForm();

    updateEmployeeSummary();

    populateDepartmentFilter();

    renderEmployees();

    updateCharts();

});


/* ================= EDIT EMPLOYEE ================= */

function editEmployee(id) {

    const employee =
        employees.find(
            employee => employee.id === id
        );

    if (!employee) return;


    employeeId.value = employee.id;

    firstName.value = employee.firstName;
    lastName.value = employee.lastName;
    employeeEmail.value = employee.email;
    employeePhone.value = employee.phone;

    employeeDepartment.value =
        employee.department;

    employeePosition.value =
        employee.position;

    employeeSalary.value =
        employee.salary;

    employeeStatus.value =
        employee.status;

    employeeJoiningDate.value =
        employee.joiningDate;


    modalTitle.textContent =
        "Edit Employee";

    employeeModal.classList.remove("hidden");

}


/* ================= VIEW EMPLOYEE ================= */

function viewEmployee(id) {

    const employee =
        employees.find(
            employee => employee.id === id
        );

    if (!employee) return;


    employeeDetails.innerHTML = `

        <div class="employee-details">

            <div class="detail-row">
                <span>Name</span>
                <strong>
                    ${employee.firstName}
                    ${employee.lastName}
                </strong>
            </div>

            <div class="detail-row">
                <span>Email</span>
                <strong>${employee.email}</strong>
            </div>

            <div class="detail-row">
                <span>Phone</span>
                <strong>${employee.phone || "N/A"}</strong>
            </div>

            <div class="detail-row">
                <span>Department</span>
                <strong>${employee.department}</strong>
            </div>

            <div class="detail-row">
                <span>Position</span>
                <strong>${employee.position}</strong>
            </div>

            <div class="detail-row">
                <span>Salary</span>
                <strong>
                    ${formatCurrency(employee.salary)}
                </strong>
            </div>

            <div class="detail-row">
                <span>Status</span>
                <strong>${employee.status}</strong>
            </div>

            <div class="detail-row">
                <span>Joining Date</span>
                <strong>${employee.joiningDate}</strong>
            </div>

            <div class="detail-row">
                <span>Performance</span>
                <strong>${employee.performance}%</strong>
            </div>

        </div>

    `;


    viewEmployeeModal.classList.remove("hidden");

}


/* ================= CLOSE VIEW MODAL ================= */

closeViewModal.addEventListener(
    "click",
    function () {

        viewEmployeeModal.classList.add("hidden");

    }
);


/* ================= DELETE ================= */

function openDeleteModal(id) {

    employeeToDelete = id;

    deleteModal.classList.remove("hidden");

}


cancelDelete.addEventListener(
    "click",
    function () {

        employeeToDelete = null;

        deleteModal.classList.add("hidden");

    }
);


confirmDelete.addEventListener(
    "click",
    function () {

        if (employeeToDelete === null) return;


        employees =
            employees.filter(
                employee =>
                    employee.id !== employeeToDelete
            );


        employeeToDelete = null;

        deleteModal.classList.add("hidden");

        updateEmployeeSummary();

        populateDepartmentFilter();

        renderEmployees();

        updateCharts();

        showToast("Employee deleted successfully.");

    }
);


/* ================= DEPARTMENTS ================= */

function renderDepartments() {

    const departmentsContainer =
        document.getElementById(
            "departmentsContainer"
        );


    const departmentList = [

        {
            name: "Engineering",
            icon: "⌘",
            description: "Software and technology team."
        },

        {
            name: "Design",
            icon: "✦",
            description: "Creative and user experience team."
        },

        {
            name: "Marketing",
            icon: "◈",
            description: "Marketing and brand growth team."
        },

        {
            name: "Human Resources",
            icon: "♙",
            description: "People and employee relations team."
        },

        {
            name: "Finance",
            icon: "$",
            description: "Finance and accounting team."
        },

        {
            name: "Sales",
            icon: "↗",
            description: "Sales and business development team."
        }

    ];


    departmentsContainer.innerHTML = "";


    departmentList.forEach(function (department) {

        const count =
            employees.filter(
                employee =>
                    employee.department === department.name
            ).length;


        const card =
            document.createElement("div");

        card.className =
            "department-card";


        card.innerHTML = `

            <div class="department-icon">
                ${department.icon}
            </div>

            <h3>${department.name}</h3>

            <p>
                ${department.description}
            </p>

            <div class="department-count">
                <strong>${count}</strong>
                employee${count !== 1 ? "s" : ""}
            </div>

        `;


        departmentsContainer.appendChild(card);

    });

}


/* ================= CHARTS ================= */

function updateCharts() {

    if (typeof Chart === "undefined") {
        return;
    }


    /* ---------- WORKFORCE ---------- */

    const workforceCanvas =
        document.getElementById(
            "workforceChart"
        );


    if (workforceChart) {
        workforceChart.destroy();
    }


    workforceChart =
        new Chart(
            workforceCanvas,
            {

                type: "line",

                data: {

                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug"
                    ],

                    datasets: [
                        {
                            label: "Employees",

                            data: [
                                12,
                                14,
                                15,
                                17,
                                18,
                                20,
                                employees.length,
                                employees.length
                            ],

                            borderWidth: 3,

                            tension: .4,

                            fill: false,

                            borderColor: "#8b6df5",

                            pointBackgroundColor:
                                "#8b6df5",

                            pointRadius: 4

                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {
                            grid: {
                                color:
                                    "rgba(255,255,255,.05)"
                            },

                            ticks: {
                                color: "#858092"
                            }
                        },

                        y: {
                            beginAtZero: true,

                            grid: {
                                color:
                                    "rgba(255,255,255,.05)"
                            },

                            ticks: {
                                color: "#858092"
                            }
                        }

                    }

                }

            }
        );


    /* ---------- DEPARTMENT ---------- */

    const departmentCanvas =
        document.getElementById(
            "departmentChart"
        );


    if (departmentChart) {
        departmentChart.destroy();
    }


    const departments = [
        "Engineering",
        "Design",
        "Marketing",
        "Human Resources",
        "Finance",
        "Sales"
    ];


    const departmentCounts =
        departments.map(
            department =>
                employees.filter(
                    employee =>
                        employee.department === department
                ).length
        );


    departmentChart =
        new Chart(
            departmentCanvas,
            {

                type: "doughnut",

                data: {

                    labels: departments,

                    datasets: [
                        {
                            data: departmentCounts,

                            backgroundColor: [
                                "#8b6df5",
                                "#6f8df7",
                                "#56c5a8",
                                "#e9b45d",
                                "#e36d92",
                                "#62a8d8"
                            ],

                            borderWidth: 0

                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "68%",

                    plugins: {

                        legend: {
                            position: "bottom",

                            labels: {
                                color: "#aaa4b4",
                                boxWidth: 10,
                                padding: 14,
                                font: {
                                    size: 10
                                }
                            }
                        }

                    }

                }

            }
        );


    /* ---------- PAYROLL ---------- */

    const payrollCanvas =
        document.getElementById(
            "payrollChart"
        );


    if (payrollChart) {
        payrollChart.destroy();
    }


    const totalPayroll =
        employees.reduce(
            (total, employee) =>
                total + Number(employee.salary),
            0
        );


    payrollChart =
        new Chart(
            payrollCanvas,
            {

                type: "bar",

                data: {

                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun"
                    ],

                    datasets: [

                        {
                            label: "Payroll",

                            data: [
                                totalPayroll * .72,
                                totalPayroll * .78,
                                totalPayroll * .83,
                                totalPayroll * .88,
                                totalPayroll * .94,
                                totalPayroll
                            ],

                            backgroundColor:
                                "#8064e9",

                            borderRadius: 6,

                            borderSkipped: false

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {
                            grid: {
                                display: false
                            },

                            ticks: {
                                color: "#858092"
                            }

                        },

                        y: {

                            beginAtZero: true,

                            grid: {
                                color:
                                    "rgba(255,255,255,.05)"
                            },

                            ticks: {
                                color: "#858092",

                                callback: function (value) {
                                    return "₨" +
                                        (value / 1000)
                                            .toFixed(0) +
                                        "k";
                                }

                            }

                        }

                    }

                }

            }
        );


    /* ---------- PERFORMANCE ---------- */

    const performanceCanvas =
        document.getElementById(
            "performanceChart"
        );


    if (performanceChart) {
        performanceChart.destroy();
    }


    const performanceData = [
        employees.filter(e => e.performance >= 90).length,
        employees.filter(e =>
            e.performance >= 80 &&
            e.performance < 90
        ).length,
        employees.filter(e =>
            e.performance >= 70 &&
            e.performance < 80
        ).length,
        employees.filter(e =>
            e.performance < 70
        ).length
    ];


    performanceChart =
        new Chart(
            performanceCanvas,
            {

                type: "bar",

                data: {

                    labels: [
                        "Excellent",
                        "Good",
                        "Average",
                        "Needs Improvement"
                    ],

                    datasets: [

                        {
                            label: "Employees",

                            data: performanceData,

                            backgroundColor: [
                                "#6bc59d",
                                "#8b6df5",
                                "#e6b65b",
                                "#df6c75"
                            ],

                            borderRadius: 6

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {
                            grid: {
                                display: false
                            },

                            ticks: {
                                color: "#858092"
                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {
                                color: "#858092",
                                stepSize: 1
                            },

                            grid: {
                                color:
                                    "rgba(255,255,255,.05)"
                            }

                        }

                    }

                }

            }
        );

}


/* ================= THEME ================= */

dashboardThemeToggle.addEventListener(
    "click",
    function () {

        dashboardPage.classList.toggle(
            "dashboard-light"
        );


        const isLight =
            dashboardPage.classList.contains(
                "dashboard-light"
            );


        dashboardThemeToggle.textContent =
            isLight
                ? "☾ Dark"
                : "☀ Light";

    }
);


employeeThemeToggle.addEventListener(
    "click",
    function () {

        employeesPage.classList.toggle(
            "employees-dark"
        );


        const isDark =
            employeesPage.classList.contains(
                "employees-dark"
            );


        employeeThemeToggle.textContent =
            isDark
                ? "☀ Light"
                : "☾ Dark";

    }
);


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= INITIALIZE ================= */

showLandingPage();

updateEmployeeSummary();

populateDepartmentFilter();

renderEmployees();

renderDepartments();