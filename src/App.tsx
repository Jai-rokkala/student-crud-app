import { useState } from "react"
import StudentTable from "./components/StudentTable"
import StudentForm from "./components/StudentForm"
import type { Student } from "./types/Student"
import { exportStudentsToExcel } from "./utils/exportExcel"

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
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Students Management System
        </h1>

        <StudentForm
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          editingStudent={editingStudent}
        />

        <div className="flex justify-end mb-4">
          <button
            onClick={() => exportStudentsToExcel(students)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Export to Excel
          </button>
        </div>

        <StudentTable
          students={students}
          onDeleteStudent={deleteStudent}
          onEditStudent={setEditingStudent}
        />

      </div>

    </div>
  )
}

export default App