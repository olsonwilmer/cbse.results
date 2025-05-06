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
  const params = new URLSearchParams(location.search);
  document.getElementById('out-roll').textContent = params.get('roll');
  document.getElementById('out-dob').textContent = params.get('dob');
  document.getElementById('out-school').textContent = params.get('school');

  // 1. Strongly skew ability toward high marks
  const ability = Math.pow(Math.random(), 0.1);  // closer to 1

  const tbody = document.getElementById('marks-body');
  let passed = true;

  function makeMarks(subject) {
    // Base theory = ability * 80
    let base = ability * 80;

    // 10% chance to drop into B1 range
    if (Math.random() < 0.10) {
      base = 72 + Math.random() * 8;  // roughly 72–80
    }

    // Small jitter ±3
    const jitter = (Math.random() - 0.5) * 6;
    let theory = Math.round(base + jitter);
    theory = Math.max(0, Math.min(80, theory));  // clamp between 0 and 80

    const practical = 20;
    const total = theory + practical;
    const grade = gradeFromTotal(total);
    if (!subject.isAdditional && total < 33) passed = false;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${subject.code}</td>
      <td>${subject.name}</td>
      <td>${String(theory).padStart(3, '0')}</td>
      <td>${String(practical).padStart(3, '0')}</td>
      <td>${String(total).padStart(3, '0')}</td>
      <td>${grade}</td>`;
    tbody.appendChild(tr);
  }

  // Generate core subjects
  subjects.filter(s => !s.isAdditional).forEach(makeMarks);

  // Additional subject header
  const hdr = document.createElement('tr');
  hdr.innerHTML = `<td colspan="6" class="additional-heading">ADDITIONAL SUBJECT</td>`;
  tbody.appendChild(hdr);

  // Generate additional subject
  subjects.filter(s => s.isAdditional).forEach(makeMarks);

  // Show overall PASS/FAIL
  document.getElementById('final-result').textContent = passed ? 'PASS' : 'FAIL';
}
