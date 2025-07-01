const medicineService = require('../medicineService');

describe('Medicine Service', () => {
  it('should create a new medicine', async () => {
    const newMed = {
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'once a day',
      start_date: '2025-07-01',
      user_id: 1,
    };

    const med = await medicineService.addMedicine(newMed);
    expect(med).toHaveProperty('id');
    expect(med.name).toBe(newMed.name);
  });

  it('should fetch all medicines for a user', async () => {
    const meds = await medicineService.getAllMedicines(1);
    expect(Array.isArray(meds)).toBe(true);
  });

  it('should update a medicine', async () => {
    const result = await medicineService.updateMedicine(1, { name: 'UpdatedMed' }, 1);
    expect(result).toBe(true);
  });

  it('should delete a medicine', async () => {
    const result = await medicineService.deleteMedicine(1, 1);
    expect(result).toBe(true);
  });
});
