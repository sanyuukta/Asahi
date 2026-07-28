import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function downloadStudentListExcel(students, options = {}) {
  const { filename } = options;

  const rows = students.map((student, index) => ({
    "#": index + 1,
    Name: student.name || "N/A",
    Email: student.email || "N/A",
    Phone: student.phone || "N/A",
    Exam: student.exam || "N/A",
    Level: student.level || "N/A",
    Message: student.message || "—",
    Date: student.createdAt
      ? new Date(student.createdAt).toLocaleDateString()
      : "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  worksheet["!cols"] = [
    { wch: 5 },
    { wch: 22 },
    { wch: 30 },
    { wch: 16 },
    { wch: 12 },
    { wch: 10 },
    { wch: 40 },
    { wch: 14 },
  ];

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const safeDate = new Date().toISOString().slice(0, 10);
  saveAs(blob, filename || `asahi-student-list-${safeDate}.xlsx`);
}
