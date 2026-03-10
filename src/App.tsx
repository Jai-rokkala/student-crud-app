import { useState } from "react"
import StudentTable from "./components/StudentTable"
import StudentForm from "./components/StudentForm"
import type { Student } from "./types/Student"

function App() {

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@email.com",
      age: 20
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@email.com",
      age: 22
    }
  ])

  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const addStudent = (student: Student) => {
    setStudents([...students, student])
  }

  const deleteStudent = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?")

    if (confirmDelete) {
      setStudents(students.filter((student) => student.id !== id))
    }
  }

  const updateStudent = (updatedStudent: Student) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    )

    setEditingStudent(null)
  }

  return (
    <div>
      <h1>Students CRUD Application</h1>

      <StudentForm
        onAddStudent={addStudent}
        onUpdateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      <StudentTable
        students={students}
        onDeleteStudent={deleteStudent}
        onEditStudent={setEditingStudent}
      />

    </div>
  )
}

export default App