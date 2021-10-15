import training from './skill'
import curriculum from './curriculum'
import trainingProgram from './training-program'
import trainingCenter from './training-center'
import instructor from './instructor'
import kelas from './kampus/kelas'
import dashboardKampusKomerce from './kampus/dashboard'
import modul from './kampus/modul'
import lesson from './kampus/lesson'
import student from './kampus/student'

export default [
  ...training, ...curriculum, ...trainingProgram, ...trainingCenter, ...instructor,
  ...kelas, ...dashboardKampusKomerce, ...modul, ...lesson, ...student,
]
