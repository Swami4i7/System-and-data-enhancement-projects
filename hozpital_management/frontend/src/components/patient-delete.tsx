'use client';

import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeletePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePatientModal: React.FC<DeletePatientModalProps> = ({ isOpen, onClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <p>Are you sure you want to delete this patient? This action cannot be undone.</p>
        <DialogFooter>
        <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePatientModal;
