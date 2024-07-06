document.addEventListener('DOMContentLoaded', () => {
    let students = [];
    let filteredStudents = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            students = data;
            filteredStudents = students;
            displayStudents(filteredStudents);
        });

    function displayStudents(data) {
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = '';
        data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.gender}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function handleSearch() {
        const query = document.getElementById('search').value.toLowerCase();
        filteredStudents = students.filter(student =>
            student.firstName.toLowerCase().includes(query) ||
            student.lastName.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
        displayStudents(filteredStudents);
    }

    function sortByName(order = 'asc') {
        filteredStudents.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            if (nameA < nameB) return order === 'asc' ? -1 : 1;
            if (nameA > nameB) return order === 'asc' ? 1 : -1;
            return 0;
        });
        displayStudents(filteredStudents);
    }

    function sortByMarks() {
        filteredStudents.sort((a, b) => a.marks - b.marks);
        displayStudents(filteredStudents);
    }

    function filterPassing() {
        filteredStudents = students.filter(student => student.passing);
        displayStudents(filteredStudents);
    }

    function sortByClass() {
        filteredStudents.sort((a, b) => a.class - b.class);
        displayStudents(filteredStudents);
    }

    function sortByGender() {
        const males = filteredStudents.filter(student => student.gender === 'Male');
        const females = filteredStudents.filter(student => student.gender === 'Female');
        displayStudents([...males, ...females]);
    }

    document.getElementById('search').addEventListener('input', handleSearch);
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    document.getElementById('sortAZ').addEventListener('click', () => sortByName('asc'));
    document.getElementById('sortZA').addEventListener('click', () => sortByName('desc'));
    document.getElementById('sortMarks').addEventListener('click', sortByMarks);
    document.getElementById('filterPassing').addEventListener('click', filterPassing);
    document.getElementById('sortClass').addEventListener('click', sortByClass);
    document.getElementById('sortGender').addEventListener('click', sortByGender);
});
