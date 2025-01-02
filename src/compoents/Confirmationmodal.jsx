import React from 'react';

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-14">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">Reset Cart?</h3>
        <p className="mb-4">
          Your cart contains items from another restaurant. Would you like to reset your cart to add items from this restaurant?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reset Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
