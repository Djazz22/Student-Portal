const students = [
    {
        id: 1,
        firstName: 'Avi',
        lastName: 'Vashishta',
        email: 'avi@gmail.com',
        marks: 85,
        passing: true,
        class: 12,
        gender: 'Male'
    },
   
    // Add more student objects here...
];

document.addEventListener('DOMContentLoaded', () => {
    renderTable(students);
});

function renderTable(data) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Create table headers
    const headers = ['ID', 'Name', 'Gender', 'Class', 'Marks', 'Passing', 'Email'];
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    
    // Create table rows
    data.forEach(student => {
        const tr = document.createElement('tr');
        
        // ID
        const tdId = document.createElement('td');
        tdId.textContent = student.id;
        tr.appendChild(tdId);
        
        // Name
        const tdName = document.createElement('td');
        tdName.textContent = `${student.firstName} ${student.lastName}`;
        tr.appendChild(tdName);
        
        // Gender
        const tdGender = document.createElement('td');
        tdGender.textContent = student.gender;
        tr.appendChild(tdGender);
        
        // Class
        const tdClass = document.createElement('td');
        tdClass.textContent = student.class;
        tr.appendChild(tdClass);
        
        // Marks
        const tdMarks = document.createElement('td');
        tdMarks.textContent = student.marks;
        tr.appendChild(tdMarks);
        
        // Passing
        const tdPassing = document.createElement('td');
        tdPassing.textContent = student.passing ? 'Passing' : 'Failed';
        tr.appendChild(tdPassing);
        
        // Email
        const tdEmail = document.createElement('td');
        tdEmail.textContent = student.email;
        tr.appendChild(tdEmail);
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Ensure table structure is displayed even if it's empty
    if (data.length === 0) {
        const tr = document.createElement('tr');
        headers.forEach(() => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
}

function search() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    renderTable(filteredStudents);
}

function sortByNameAZ() {
    const sortedStudents = [...students].sort((a, b) => 
        (a.firstName + ' ' + a.lastName).localeCompare(b.firstName + ' ' + b.lastName)
    );
    renderTable(sortedStudents);
}

function sortByNameZA() {
    const sortedStudents = [...students].sort((a, b) => 
        (b.firstName + ' ' + b.lastName).localeCompare(a.firstName + ' ' + a.lastName)
    );
    renderTable(sortedStudents);
}

function sortByMarks() {
    const sortedStudents = [...students].sort((a, b) => a.marks - b.marks);
    renderTable(sortedStudents);
}

function sortByPassing() {
    const passingStudents = students.filter(student => student.passing);
    renderTable(passingStudents);
}

function sortByClass() {
    const sortedStudents = [...students].sort((a, b) => a.class - b.class);
    renderTable(sortedStudents);
}

function sortByGender() {
    const maleStudents = students.filter(student => student.gender === 'male');
    const femaleStudents = students.filter(student => student.gender === 'female');
    
    renderTable(maleStudents);
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML += '<br/><h2>Female Students</h2>';
    renderTable(femaleStudents);
}
