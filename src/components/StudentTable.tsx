import type { Student } from "../types/Student"

type Props = {
  students: Student[]
  onDeleteStudent: (id: number) => void
  onEditStudent: (student: Student) => void
}

function StudentTable({ students, onDeleteStudent, onEditStudent }: Props) {

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
              <button onClick={() => onEditStudent(student)}>Edit</button>
              <button onClick={() => onDeleteStudent(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentTable