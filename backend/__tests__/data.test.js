const data = require('../data');

describe('Data file', () => {
  it('should export an object or array', () => {
    expect(typeof data === 'object' || Array.isArray(data)).toBe(true);
  });

  // Optional: check structure if it's known
  it('should have required fields if array of objects', () => {
    if (Array.isArray(data)) {
      data.forEach(item => {
        expect(item).toHaveProperty('id'); // change based on your structure
      });
    }
  });
});
