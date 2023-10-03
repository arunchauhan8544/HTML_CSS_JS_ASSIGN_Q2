const students = [
    { "Name": "ARUN CHAUHAN", "Email": "arunchauhan4400@gmail.com", "Phone_number": "9811726244", "percentage": "90", "hobbies": ["gym"] },
    { "Name": "John Smith", "Email": "john.smith@example.com", "Phone_number": "1234567890", "percentage": "30", "hobbies": ["reading"] },
    { "Name": "Emily Johnson", "Email": "emily.johnson@example.com", "Phone_number": "9876543210", "percentage": "92", "hobbies": ["dancing"] },
    { "Name": "Michael Brown", "Email": "michael.brown@example.com", "Phone_number": "4567891230", "percentage": "87", "hobbies": ["sports"] },
    { "Name": "Sophia Williams", "Email": "sophia.williams@example.com", "Phone_number": "7890123456", "percentage": "20", "hobbies": ["painting"] },
    { "Name": "William Davis", "Email": "william.davis@example.com", "Phone_number": "5678901234", "percentage": "89", "hobbies": ["photography"] },
    { "Name": "Olivia Jones", "Email": "olivia.jones@example.com", "Phone_number": "9012345678", "percentage": "94", "hobbies": ["cooking", "singing"] },
  
  ]
  
  const table = document.getElementById("student-list");
  
  function displayTable(students) {
    table.innerHTML = "";
    for (let index = 0; index < students.length; index++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td index=${index} prop="Name">${students[index].Name}</td>
      <td index=${index} prop="Email">${students[index].Email}</td> 
      <td index=${index} prop="Phone_number">${students[index].Phone_number}</td>
      <td index=${index} prop="percentage">${students[index].percentage}</td>
      <td index=${index} prop="hobbies">${students[index].hobbies.join(",")}</td>`
        row.addEventListener("click", editTableData);
        if (parseInt(students[index].percentage) > 40) {
            row.style.backgroundColor = "green";
        }
        else {
            row.style.backgroundColor = "red";
        }
        table.appendChild(row);
    }
  
  }
  
  
  displayTable(students);
  function editTableData(event) {
   
    const value = event.target.textContent;
    const prop = event.target.getAttribute("prop");
    const index = event.target.getAttribute("index");
    event.target.textContent = "";
    const input = document.createElement('input');
    input.type = "text";
    input.value = value;
    event.target.appendChild(input);
    input.select();
    console.log(event);
    input.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            let finalvalue = input.value;
            if (prop == "hobbies") {
                finalvalue = input.value.split(",");
            }
            const temp = students[index][prop]
            students[index][prop] = finalvalue;
            if (!validation(students[index]["Name"], students[index]["Email"], students[index]["Phone_number"], students[index]["percentage"], students[index]["hobbies"])) {
                
                students[index][prop] = temp;
                return;
            }
            displayTable(students);
        }
    })
    // input.addEventListener("blur", function (event) {
    //     let finalvalue = input.value;
    //     if (prop == "hobbies") {
    //         finalvalue = input.value.split(",");
    //     }
    //     const temp = students[index][prop]
    //     students[index][prop] = finalvalue;
    //     if (!validation(students[index]["Name"], students[index]["Email"], students[index]["Phone_number"], students[index]["percentage"], students[index]["hobbies"])) {
    //         students[index][prop] = temp;
    //     }
    //     displayTable(students);
    // })
  
  }
  const button = document.getElementById("button1");
  const form = document.getElementById("student-form");
  button.addEventListener("click", () => {
    form.style.display = "block";
  })
  
  function validation(Name, Gmail, Phoneno, percentage, hobbies) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    const numericPercentage = parseFloat(percentage);
  
    if (!Name || !Gmail || !Phoneno || !percentage || !hobbies) {
        alert("please enter all details");
        return false;
    }
    if (!emailRegex.test(Gmail)) {
        alert("please enter valid email address");
        return false;
    }
    if (!phoneRegex.test(Phoneno)) {
        alert("please enter valid phone number");
        return false;
    }
    if (isNaN(numericPercentage) || numericPercentage < 0 || numericPercentage > 100) {
        alert('Please enter a valid percentage (0-100).');
        return false;
  
    }
    if (hobbies.length == 0) {
        alert('please enter hobbies by seprated line');
        return false;
    }
    return true;
  }
  const save = document.getElementById("save");
  save.addEventListener("click", (event) => {
    event.preventDefault();
    const Name = document.getElementById("Name").value;
    const Gmail = document.getElementById("gmail").value;
    const Phoneno = document.getElementById("ph").value;
    const percentage = document.getElementById("percentage").value;
    const hobbies = document.getElementById("hobbies").value
        .split("\n")
        .map(hobby => hobby.trim())
        .filter(hobby => hobby !== "");
  
    if (!validation(Name, Gmail, Phoneno, percentage, hobbies)) {
        return;
    }
    let obj = {
        "Name": Name,
        "Email": Gmail,
        "Phone_number": Phoneno,
        "percentage": percentage,
        "hobbies": hobbies
  
    }
    form.style.display = "none";
    students.push(obj);
    form.reset();
    displayTable(students);
  })
  
  function filterstudent(status) {
    if (status == 'pass') {
        return students.filter(student => (student.percentage > 40));
    }
    else if (status == 'fail') {
        return students.filter(student => (student.percentage <= 40));
    }
    return students;
  }
  
  const passStd = document.getElementById("passStudent");
  passStd.addEventListener("click", function () {
    const passStudent = filterstudent("pass");
    displayTable(passStudent);
  })
  const failStd = document.getElementById("failStudent");
  failStd.addEventListener("click", function () {
    const failStudent = filterstudent("fail");
    displayTable(failStudent);
  })