import React from 'react';
import buttonStyles from '../buttonStyles.module.css';
import styles from './Modal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles.modal}>
        <h3>{message}</h3>
        <div className={styles['modal-actions']}>
          <button className={buttonStyles.button} onClick={onClose}>Cancel</button>
          <button className={`${buttonStyles.button} ${buttonStyles.red}`} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
