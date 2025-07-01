const { medicines } = require('./data');

function validateMedicineFields(data) {
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    const err = new Error('Invalid name');
    err.status = 400;
    throw err;
  }

  if (!data.expiryDate || isNaN(Date.parse(data.expiryDate))) {
    const err = new Error('Invalid expiry date');
    err.status = 400;
    throw err;
  }
}

function findMedicineById(id) {
  return medicines.find(med => med.id === id);
}

// ✅ Add this: Create a new medicine
function addMedicine(medicine) {
  validateMedicineFields(medicine);

  const newMedicine = {
    ...medicine,
    id: medicines.length + 1,
    user_id: medicine.user_id || 1,
  };

  medicines.push(newMedicine);
  return newMedicine;
}

// ✅ Add this: Get all medicines for a user
function getAllMedicines(user_id) {
  return medicines.filter(med => med.user_id === user_id);
}

// ✅ Add this: Update a medicine
function updateMedicine(id, updatedFields, user_id) {
  const med = medicines.find(m => m.id === id && m.user_id === user_id);
  if (!med) return false;
  Object.assign(med, updatedFields);
  return true;
}

// ✅ Add this: Delete a medicine
function deleteMedicine(id, user_id) {
  const index = medicines.findIndex(m => m.id === id && m.user_id === user_id);
  if (index === -1) return false;
  medicines.splice(index, 1);
  return true;
}

module.exports = {
  validateMedicineFields,
  findMedicineById,
  addMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine
};
