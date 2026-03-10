import { useState, useEffect } from "react"
import type { Student } from "../types/Student"

type Props = {
  onAddStudent: (student: Student) => void
  onUpdateStudent: (student: Student) => void
  editingStudent: Student | null
}

function StudentForm({ onAddStudent, onUpdateStudent, editingStudent }: Props) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name)
      setEmail(editingStudent.email)
      setAge(String(editingStudent.age))
    }
  }, [editingStudent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !age) {
      setError("All fields are required")
      return
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name should contain only letters")
      return
    }

    if (!email.includes("@")) {
      setError("Invalid email address")
      return
    }

    if (Number(age) <= 0) {
      setError("Age must be greater than 0")
      return
    }

    setError("")

    const studentData: Student = {
      id: editingStudent ? editingStudent.id : Date.now(),
      name,
      email,
      age: Number(age)
    }

    if (editingStudent) {
      onUpdateStudent(studentData)
    } else {
      onAddStudent(studentData)
    }

    setName("")
    setEmail("")
    setAge("")
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button type="submit">Add Student</button>
    </form>
  )
}

export default StudentForm