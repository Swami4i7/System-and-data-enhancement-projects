import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';

interface ViewPatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

interface Patient {
  first_name: string;
  last_name: string;
  medicalRecords?: MedicalRecord[];
}

interface MedicalRecord {
  record_id: number;
  description: string;
  created_at: string;
}

const ViewPatientDetailsModal: React.FC<ViewPatientDetailsModalProps> = ({ isOpen, onClose, patient }) => {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {patient.first_name} {patient.last_name}'s Medical Records
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Detailed records for the patient
          </p>
        </DialogHeader>
        <div className="mt-4 overflow-x-auto">
          <Table className="w-full bg-white shadow-md rounded-lg table-fixed">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell className="font-semibold text-gray-600 px-4 py-2 text-left w-1/6">Record ID</TableCell>
                <TableCell className="font-semibold text-gray-600 px-4 py-2 text-left w-2/3">Description</TableCell>
                <TableCell className="font-semibold text-gray-600 px-4 py-2 text-left w-1/6">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patient.medicalRecords && patient.medicalRecords.length > 0 ? (
                patient.medicalRecords.map((record) => (
                  <TableRow key={record.record_id} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-2 text-gray-700 truncate text-left">{record.record_id}</TableCell>
                    <TableCell className="px-4 py-2 text-gray-700 break-words max-w-xs text-left">
                      {record.description}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-gray-700 whitespace-nowrap text-left">
                      {new Date(record.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="px-4 py-2 text-center text-gray-500">
                    No medical records available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPatientDetailsModal;
