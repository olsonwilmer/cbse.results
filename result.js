// result.js
const subjects = [
  { code: '184', name: 'ENGLISH LNG & LIT.', isAdditional: false },
  { code: '085', name: 'HINDI COURSE-B', isAdditional: false },
  { code: '241', name: 'MATHEMATICS STANDARD', isAdditional: false },
  { code: '086', name: 'SCIENCE', isAdditional: false },
  { code: '087', name: 'SOCIAL SCIENCE', isAdditional: false },
  { code: '004', name: 'INFORMATION TECHNOLOGY', isAdditional: true }
];

function gradeFromTotal(t) {
  if (t >= 91) return 'A1';
  if (t >= 81) return 'A2';
  if (t >= 71) return 'B1';
  if (t >= 61) return 'B2';
  if (t >= 51) return 'C1';
  if (t >= 41) return 'C2';
  if (t >= 33) return 'D';
  return 'E';
}

function generateResults() {
  const p = new URLSearchParams(location.search);
  document.getElementById('out-roll').textContent = p.get('roll');
  document.getElementById('out-dob').textContent = p.get('dob');
  document.getElementById('out-school').textContent = p.get('school');

  const tbody = document.getElementById('marks-body');
  let pass = true;

  subjects.filter(s => !s.isAdditional).forEach(s => {
    const theory = Math.floor(Math.random() * 41) + 60;
    const practical = 20;
    const total = theory + practical;
    const grade = gradeFromTotal(total);
    if (total < 33) pass = false;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.code}</td><td>${s.name}</td>
      <td>${String(theory).padStart(3,'0')}</td>
      <td>${String(practical).padStart(3,'0')}</td>
      <td>${String(total).padStart(3,'0')}</td>
      <td>${grade}</td>`;
    tbody.appendChild(tr);
  });

  const hdr = document.createElement('tr');
  hdr.innerHTML = `<td colspan="6" class="additional-heading">ADDITIONAL SUBJECT</td>`;
  tbody.appendChild(hdr);

  subjects.filter(s => s.isAdditional).forEach(s => {
    const theory = Math.floor(Math.random() * 41) + 60;
    const practical = 20;
    const total = theory + practical;
    const grade = gradeFromTotal(total);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.code}</td><td>${s.name}</td>
      <td>${String(theory).padStart(3,'0')}</td>
      <td>${String(practical).padStart(3,'0')}</td>
      <td>${String(total).padStart(3,'0')}</td>
      <td>${grade}</td>`;
    tbody.appendChild(tr);
  });

  document.getElementById('final-result').textContent = pass ? 'PASS' : 'FAIL';
}