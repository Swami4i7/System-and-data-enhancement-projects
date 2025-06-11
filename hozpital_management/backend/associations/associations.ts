import Doctor from '../models/doctor';
import Patient from '../models/patient';
import Department from '../models/department';
import Appointment from '../models/appointment';
import MedicalRecord from '../models/medical-record';

// Doctor <-> Department (One-to-One)
Doctor.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(Doctor, { foreignKey: 'department_id' });

// Doctor <-> Patient (One-to-Many)
Doctor.hasMany(Patient, { foreignKey: 'doctor_id' });
Patient.belongsTo(Doctor, { foreignKey: 'doctor_id' });

// Patient <-> Medical Record (One-to-Many)
Patient.hasMany(MedicalRecord, { foreignKey: 'patient_id' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patient_id' });


Patient.belongsToMany(Doctor, {
    through: Appointment,
    foreignKey: 'patient_id',
    otherKey: 'doctor_id', 
  });
  
  Doctor.belongsToMany(Patient, {
    through: Appointment,
    foreignKey: 'doctor_id',
    otherKey: 'patient_id', 
  });

Patient.hasMany(Appointment,{foreignKey:'patient_id'});
Appointment.belongsTo(Patient,{foreignKey:'patient_id'});

Doctor.hasMany(Appointment,{foreignKey:'doctor_id'});
Appointment.belongsTo(Doctor,{foreignKey:'doctor_id'});
  