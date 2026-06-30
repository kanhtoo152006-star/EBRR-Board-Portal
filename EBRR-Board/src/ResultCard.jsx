import './ResultCard.css'

export default function ResultCard({ data }) {
  return (
    <div className="result-card">

      {/* Name */}
      <h2 className="student-name">{data.student_name}</h2>

      {/* Pass/Fail badge */}
      <span className={`badge ${data.status === 'Pass' ? 'badge-pass' : 'badge-fail'}`}>
        {data.status}
      </span>

      {/* GPA */}
      <p className="gpa">GPA: {data.gpa}</p>

      {/* Subjects table */}
      <table className="subjects-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.subjects.map((item, i) => (
            <tr key={item.subject || i}>
              <td>{item.subject}</td>
              <td>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Certificate number — only if exists */}
      {data.certificate_no && (
        <p className="certificate">
          Certificate No: {data.certificate_no}
        </p>
      )}

    </div>
  )
}