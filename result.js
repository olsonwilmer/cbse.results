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

  // 1. Base ability distribution
  const ability = Math.pow(Math.random(), 0.3);  // tilt toward higher scores

  const tbody = document.getElementById('marks-body');
  let passed = true;
  let lastGrade = null;

  function makeMarks(subject) {
    // 2. Base theory = ability * 80
    let base = ability * 80;
    // 3. If last subject was B1/B2, boost this one slightly
    if (lastGrade && lastGrade.startsWith('B')) {
      base += 10;  // bump up by 10 points
    }
    // 4. Small jitter ±5
    const jitter = (Math.random() - 0.5) * 10;
    let theory = Math.round(base + jitter);
    theory = Math.max(0, Math.min(80, theory));  // clamp

    const practical = 20;
    const total = theory + practical;
    const grade = gradeFromTotal(total);
    lastGrade = grade;
    if (!subject.isAdditional && total < 33) passed = false;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${subject.code}</td>
      <td>${subject.name}</td>
      <td>${String(theory).padStart(3,'0')}</td>
      <td>${String(practical).padStart(3,'0')}</td>
      <td>${String(total).padStart(3,'0')}</td>
      <td>${grade}</td>
    `;
    tbody.appendChild(tr);
  }

  // 5. Core subjects
  subjects.filter(s => !s.isAdditional).forEach(makeMarks);

  // 6. Additional heading
  const addHdr = document.createElement('tr');
  addHdr.innerHTML = `<td colspan="6" class="additional-heading">ADDITIONAL SUBJECT</td>`;
  tbody.appendChild(addHdr);

  // 7. Additional subject
  subjects.filter(s => s.isAdditional).forEach(makeMarks);

  // 8. PASS/FAIL
  document.getElementById('final-result').textContent = passed ? 'PASS' : 'FAIL';
}
