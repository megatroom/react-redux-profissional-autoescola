let failedLoadAttempts = 1;

export default class EnrollmentService {
  static loadStudentsAbleToEnroll(theoryClass) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          if (theoryClass == null) resolve({ students: [] });

          const studentsAbleToEnroll = [];
          const students = window.localStorage.getItem("students");

          students.forEach(student => {
            if (
              student.theoryClass == null ||
              student.theoryClass.id == theoryClass.id
            )
              studentsAbleToEnroll.push(student);
          });

          resolve(students ? JSON.parse(studentsAbleToEnroll) : []);
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }
}
