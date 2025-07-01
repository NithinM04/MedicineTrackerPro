const medicineService = require('../medicineService');
const { medicines } = require('../data');

beforeEach(() => {
  // Clear in-memory medicine data before each test to avoid test contamination
  medicines.length = 0;
});

describe('Medicine Service', () => {
  it('should create a new medicine', async () => {
    const newMed = {
      name: 'Aspirin',
      expiryDate: '2025-12-31',  // ✅ Required by validateMedicineFields
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
    await medicineService.addMedicine({
      name: 'Paracetamol',
      expiryDate: '2025-12-31',
      user_id: 1,
    });

    const meds = await medicineService.getAllMedicines(1);
    expect(Array.isArray(meds)).toBe(true);
    expect(meds.length).toBeGreaterThan(0);
  });

  it('should update a medicine', async () => {
    const created = await medicineService.addMedicine({
      name: 'Ibuprofen',
      expiryDate: '2025-12-31',
      user_id: 1,
    });

    const result = await medicineService.updateMedicine(created.id, { name: 'UpdatedMed' }, 1);
    expect(result).toBe(true);
  });

  it('should delete a medicine', async () => {
    const created = await medicineService.addMedicine({
      name: 'Dolo',
      expiryDate: '2025-12-31',
      user_id: 1,
    });

    const result = await medicineService.deleteMedicine(created.id, 1);
    expect(result).toBe(true);
  });
});
