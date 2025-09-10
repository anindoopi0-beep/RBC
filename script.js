async function checkResult() {
  const rollInput = document.getElementById("roll").value.trim();
  const resultDiv = document.getElementById("result");

  if (!rollInput) {
    resultDiv.innerText = "Please enter a roll number.";
    return;
  }

  try {
    const response = await fetch("results.csv");
    const data = await response.text();
    const rows = data.split("\n").map(r => r.split(","));

    // Assuming CSV format: Roll,Name,Marks,Grade
    const header = rows[0];
    const student = rows.find(r => r[0] === rollInput);

    if (student) {
      resultDiv.innerHTML = `
        Roll: ${student[0]}<br>
        Name: ${student[1]}<br>
        Marks: ${student[2]}<br>
        Grade: ${student[3]}
      `;
    } else {
      resultDiv.innerText = "No result found for this roll.";
    }
  } catch (error) {
    resultDiv.innerText = "Error loading results.";
  }
}
