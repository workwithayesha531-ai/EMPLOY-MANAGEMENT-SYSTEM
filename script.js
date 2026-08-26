// ================= EMPLOYEE MANAGEMENT SYSTEM =================

// ---------- DEFAULT EMPLOYEES ----------

let employees = [
    {
        id: "EMP001",
        name: "John Cooper",
        email: "john@example.com",
        phone: "+92 300 1234567",
        department: "Finance",
        position: "Accountant",
        salary: 65000,
        joiningDate: "2024-01-15",
        status: "Active"
    },

    {
        id: "EMP002",
        name: "Sarah Khan",
        email: "sarah@example.com",
        phone: "+92 301 7654321",
        department: "Human Resources",
        position: "HR Manager",
        salary: 85000,
        joiningDate: "2023-08-20",
        status: "Active"
    },

    {
        id: "EMP003",
        name: "Ali Ahmed",
        email: "ali@example.com",
        phone: "+92 302 4567890",
        department: "IT",
        position: "Frontend Developer",
        salary: 90000,
        joiningDate: "2024-03-10",
        status: "Active"
    },

    {
        id: "EMP004",
        name: "Maria Smith",
        email: "maria@example.com",
        phone: "+92 303 9876543",
        department: "Marketing",
        position: "Marketing Executive",
        salary: 70000,
        joiningDate: "2022-11-05",
        status: "Inactive"
    }
];


// ---------- ELEMENTS ----------

const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

const togglePassword = document.getElementById("togglePassword");
const logoutBtn = document.getElementById("logoutBtn");

const employeeTableBody =
    document.getElementById("employeeTableBody");

const searchInput =
    document.getElementById("searchInput");

const employeeModal =
    document.getElementById("employeeModal");

const viewModal =
    document.getElementById("viewModal");

const employeeForm =
    document.getElementById("employeeForm");

const employeeModalTitle =
    document.getElementById("employeeModalTitle");

const editIndex =
    document.getElementById("editIndex");

const toast =
    document.getElementById("toast");


// ---------- FORM INPUTS ----------

const employeeId =
    document.getElementById("employeeId");

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const department =
    document.getElementById("department");

const position =
    document.getElementById("position");

const salary =
    document.getElementById("salary");

const joiningDate =
    document.getElementById("joiningDate");

const status =
    document.getElementById("status");


// ---------- LOGIN ----------

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    if (
        emailValue === "admin@ems.com" &&
        passwordValue === "1234"
    ) {

        loginScreen.classList.add("hidden");
        app.classList.remove("hidden");

        loginError.textContent = "";

        showToast("Login successful!");

        renderEmployees();
        updateDashboard();
        renderDepartments();

    } else {

        loginError.textContent =
            "Invalid email or password.";

    }

});


// ---------- SHOW / HIDE PASSWORD ----------

togglePassword.addEventListener("click", function () {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        loginPassword.type = "password";
        togglePassword.textContent = "Show";

    }

});


// ---------- LOGOUT ----------

logoutBtn.addEventListener("click", function () {

    app.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    loginForm.reset();

    showToast("Logged out successfully.");

});


// ---------- NAVIGATION ----------

const navItems =
    document.querySelectorAll(".nav-item[data-page]");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const page = item.dataset.page;

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        showPage(page);

    });

});


// ---------- SHOW PAGE ----------

function showPage(page) {

    const dashboardPage =
        document.getElementById("dashboardPage");

    const employeesPage =
        document.getElementById("employeesPage");

    const departmentsPage =
        document.getElementById("departmentsPage");

    dashboardPage.classList.add("hidden");
    employeesPage.classList.add("hidden");
    departmentsPage.classList.add("hidden");

    if (page === "dashboard") {

        dashboardPage.classList.remove("hidden");

        document.getElementById("pageTitle").textContent =
            "Dashboard";

        document.getElementById("pageSubtitle").textContent =
            "Overview of your employee management system";

        updateDashboard();

    }


    if (page === "employees") {

        employeesPage.classList.remove("hidden");

        document.getElementById("pageTitle").textContent =
            "Employees";

        document.getElementById("pageSubtitle").textContent =
            "View and manage all employees";

        renderEmployees();

    }


    if (page === "departments") {

        departmentsPage.classList.remove("hidden");

        document.getElementById("pageTitle").textContent =
            "Departments";

        document.getElementById("pageSubtitle").textContent =
            "Manage employee departments";

        renderDepartments();

    }

}


// ---------- ADD EMPLOYEE BUTTON ----------

document
    .getElementById("addEmployeeBtn")
    .addEventListener("click", function () {

        openAddEmployeeModal();

    });


document
    .getElementById("dashboardAddBtn")
    .addEventListener("click", function () {

        openAddEmployeeModal();

    });


// ---------- OPEN ADD MODAL ----------

function openAddEmployeeModal() {

    employeeForm.reset();

    editIndex.value = "";

    employeeModalTitle.textContent =
        "Add Employee";

    clearErrors();

    employeeModal.classList.remove("hidden");

}


// ---------- CLOSE MODALS ----------

document
    .querySelectorAll("[data-close]")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const modalId =
                button.dataset.close;

            document
                .getElementById(modalId)
                .classList.add("hidden");

        });

    });


// ---------- CLOSE WHEN CLICKING OUTSIDE ----------

employeeModal.addEventListener(
    "click",
    function (event) {

        if (event.target === employeeModal) {
            employeeModal.classList.add("hidden");
        }

    }
);


viewModal.addEventListener(
    "click",
    function (event) {

        if (event.target === viewModal) {
            viewModal.classList.add("hidden");
        }

    }
);


// ---------- EMPLOYEE FORM SUBMIT ----------

employeeForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!validateEmployeeForm()) {
            return;
        }

        const employeeData = {

            id: employeeId.value.trim(),

            name: fullName.value.trim(),

            email: email.value.trim(),

            phone: phone.value.trim(),

            department: department.value.trim(),

            position: position.value.trim(),

            salary: Number(salary.value),

            joiningDate: joiningDate.value,

            status: status.value

        };


        const index = editIndex.value;


        // EDIT

        if (index !== "") {

            employees[Number(index)] =
                employeeData;

            showToast(
                "Employee updated successfully!"
            );

        }

        // ADD

        else {

            employees.push(employeeData);

            showToast(
                "Employee added successfully!"
            );

        }


        employeeModal.classList.add("hidden");

        employeeForm.reset();

        renderEmployees();

        updateDashboard();

        renderDepartments();

    }
);


// ---------- VALIDATION ----------

function validateEmployeeForm() {

    clearErrors();

    let valid = true;


    if (employeeId.value.trim() === "") {

        setError(
            "employeeIdError",
            "Employee ID is required."
        );

        valid = false;

    }


    if (fullName.value.trim() === "") {

        setError(
            "fullNameError",
            "Full name is required."
        );

        valid = false;

    }


    if (email.value.trim() === "") {

        setError(
            "emailError",
            "Email is required."
        );

        valid = false;

    } else if (!isValidEmail(email.value.trim())) {

        setError(
            "emailError",
            "Enter a valid email."
        );

        valid = false;

    }


    if (phone.value.trim() === "") {

        setError(
            "phoneError",
            "Phone is required."
        );

        valid = false;

    }


    if (department.value.trim() === "") {

        setError(
            "departmentError",
            "Department is required."
        );

        valid = false;

    }


    if (position.value.trim() === "") {

        setError(
            "positionError",
            "Position is required."
        );

        valid = false;

    }


    if (
        salary.value === "" ||
        Number(salary.value) <= 0
    ) {

        setError(
            "salaryError",
            "Enter a valid salary."
        );

        valid = false;

    }


    if (joiningDate.value === "") {

        setError(
            "joiningDateError",
            "Joining date is required."
        );

        valid = false;

    }


    // UNIQUE EMPLOYEE ID

    const currentIndex =
        editIndex.value === ""
            ? -1
            : Number(editIndex.value);


    const duplicate =
        employees.some(function (employee, index) {

            return (
                employee.id.toLowerCase() ===
                employeeId.value
                    .trim()
                    .toLowerCase() &&
                index !== currentIndex
            );

        });


    if (duplicate) {

        setError(
            "employeeIdError",
            "Employee ID already exists."
        );

        valid = false;

    }


    return valid;

}


// ---------- EMAIL VALIDATION ----------

function isValidEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        value
    );

}


// ---------- SET ERROR ----------

function setError(id, message) {

    document.getElementById(id).textContent =
        message;

}


// ---------- CLEAR ERRORS ----------

function clearErrors() {

    document
        .querySelectorAll(".field-error")
        .forEach(function (element) {

            element.textContent = "";

        });

}


// ---------- RENDER EMPLOYEES ----------

function renderEmployees(list = employees) {

    employeeTableBody.innerHTML = "";

    document.getElementById(
        "employeeCountText"
    ).textContent = list.length;


    document.getElementById(
        "employeeBadge"
    ).textContent = employees.length;


    if (list.length === 0) {

        document
            .getElementById("emptyEmployees")
            .classList.remove("hidden");

        return;

    }


    document
        .getElementById("emptyEmployees")
        .classList.add("hidden");


    list.forEach(function (employee) {

        const originalIndex =
            employees.indexOf(employee);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${employee.id}</strong>
            </td>


            <td>
                <div class="employee-name">

                    <strong>
                        ${employee.name}
                    </strong>

                    <small>
                        ${employee.email}
                    </small>

                </div>
            </td>


            <td>
                ${employee.phone}
            </td>


            <td>
                ${employee.department}
            </td>


            <td>
                ${employee.position}
            </td>


            <td>
                Rs. ${formatNumber(employee.salary)}
            </td>


            <td>
                ${formatDate(employee.joiningDate)}
            </td>


            <td>

                <span class="
                    status
                    ${employee.status.toLowerCase()}
                ">

                    ${employee.status}

                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="icon-btn"
                        title="View"
                        onclick="viewEmployee(${originalIndex})"
                    >
                        👁
                    </button>


                    <button
                        class="icon-btn"
                        title="Edit"
                        onclick="editEmployee(${originalIndex})"
                    >
                        ✎
                    </button>


                    <button
                        class="icon-btn"
                        title="Delete"
                        onclick="deleteEmployee(${originalIndex})"
                    >
                        🗑
                    </button>

                </div>

            </td>

        `;


        employeeTableBody.appendChild(row);

    });

}


// ---------- SEARCH ----------

searchInput.addEventListener(
    "input",
    function () {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const filtered =
            employees.filter(function (employee) {

                return (

                    employee.id
                        .toLowerCase()
                        .includes(search)

                    ||

                    employee.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    employee.email
                        .toLowerCase()
                        .includes(search)

                    ||

                    employee.department
                        .toLowerCase()
                        .includes(search)

                    ||

                    employee.position
                        .toLowerCase()
                        .includes(search)

                );

            });


        renderEmployees(filtered);

    }
);


// ---------- VIEW EMPLOYEE ----------

function viewEmployee(index) {

    const employee =
        employees[index];


    const viewDetails =
        document.getElementById("viewDetails");


    viewDetails.innerHTML = `

        <div class="detail-box">

            <span>Employee ID</span>

            <strong>
                ${employee.id}
            </strong>

        </div>


        <div class="detail-box">

            <span>Full Name</span>

            <strong>
                ${employee.name}
            </strong>

        </div>


        <div class="detail-box">

            <span>Email</span>

            <strong>
                ${employee.email}
            </strong>

        </div>


        <div class="detail-box">

            <span>Phone</span>

            <strong>
                ${employee.phone}
            </strong>

        </div>


        <div class="detail-box">

            <span>Department</span>

            <strong>
                ${employee.department}
            </strong>

        </div>


        <div class="detail-box">

            <span>Position</span>

            <strong>
                ${employee.position}
            </strong>

        </div>


        <div class="detail-box">

            <span>Salary</span>

            <strong>
                Rs. ${formatNumber(employee.salary)}
            </strong>

        </div>


        <div class="detail-box">

            <span>Joining Date</span>

            <strong>
                ${formatDate(employee.joiningDate)}
            </strong>

        </div>


        <div class="detail-box">

            <span>Status</span>

            <strong>
                ${employee.status}
            </strong>

        </div>

    `;


    viewModal.classList.remove("hidden");

}


// ---------- EDIT EMPLOYEE ----------

function editEmployee(index) {

    const employee =
        employees[index];


    employeeModalTitle.textContent =
        "Edit Employee";


    editIndex.value = index;


    employeeId.value =
        employee.id;

    fullName.value =
        employee.name;

    email.value =
        employee.email;

    phone.value =
        employee.phone;

    department.value =
        employee.department;

    position.value =
        employee.position;

    salary.value =
        employee.salary;

    joiningDate.value =
        employee.joiningDate;

    status.value =
        employee.status;


    clearErrors();


    employeeModal.classList.remove(
        "hidden"
    );

}


// ---------- DELETE EMPLOYEE ----------

function deleteEmployee(index) {

    const employee =
        employees[index];


    const confirmDelete =
        confirm(
            `Are you sure you want to delete ${employee.name}?`
        );


    if (!confirmDelete) {
        return;
    }


    employees.splice(index, 1);


    renderEmployees();

    updateDashboard();

    renderDepartments();


    showToast(
        "Employee deleted successfully!"
    );

}


// ---------- DASHBOARD ----------

function updateDashboard() {

    const total =
        employees.length;


    const active =
        employees.filter(function (employee) {

            return employee.status === "Active";

        }).length;


    const inactive =
        employees.filter(function (employee) {

            return employee.status === "Inactive";

        }).length;


    const departments =
        new Set(
            employees.map(function (employee) {

                return employee.department;

            })
        ).size;


    document.getElementById(
        "totalEmployees"
    ).textContent = total;


    document.getElementById(
        "activeEmployees"
    ).textContent = active;


    document.getElementById(
        "inactiveEmployees"
    ).textContent = inactive;


    document.getElementById(
        "totalDepartments"
    ).textContent = departments;


    document.getElementById(
        "departmentBadge"
    ).textContent = departments;

}


// ---------- DEPARTMENTS ----------

function renderDepartments() {

    const departmentGrid =
        document.getElementById(
            "departmentGrid"
        );


    const departmentOptions =
        document.getElementById(
            "departmentOptions"
        );


    departmentGrid.innerHTML = "";

    departmentOptions.innerHTML = "";


    const departmentMap = {};


    employees.forEach(function (employee) {

        if (!departmentMap[employee.department]) {

            departmentMap[
                employee.department
            ] = 0;

        }

        departmentMap[
            employee.department
        ]++;

    });


    Object.keys(departmentMap)
        .forEach(function (dept) {

            const card =
                document.createElement("div");


            card.className =
                "department-card";


            card.innerHTML = `

                <div class="dept-icon">
                    ▤
                </div>

                <h3>
                    ${dept}
                </h3>

                <p>
                    Employees working in this department
                </p>

                <span class="dept-count">

                    ${departmentMap[dept]}
                    Employee(s)

                </span>

            `;


            departmentGrid.appendChild(card);


            const option =
                document.createElement("option");

            option.value = dept;

            departmentOptions.appendChild(
                option
            );

        });


    if (
        Object.keys(departmentMap).length === 0
    ) {

        departmentGrid.innerHTML = `
            <div class="empty-state">
                No departments found.
            </div>
        `;

    }

}


// ---------- FORMAT NUMBER ----------

function formatNumber(number) {

    return Number(number).toLocaleString(
        "en-PK"
    );

}


// ---------- FORMAT DATE ----------

function formatDate(date) {

    if (!date) {
        return "-";
    }


    const parts =
        date.split("-");


    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


// ---------- TOAST MESSAGE ----------

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


// ---------- INITIAL DATA ----------

updateDashboard();

renderEmployees();

renderDepartments();