import WeightConverter, { WeightUnit } from './weight.converter';

const testCases = [
  {
    sourceUnit: 'KILOGRAMS' as WeightUnit,
    targetUnit: 'POUNDS' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 2.2046
  },
  {
    sourceUnit: 'KILOGRAMS' as WeightUnit,
    targetUnit: 'OUNCES' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 35.2739
  },
  {
    sourceUnit: 'POUNDS' as WeightUnit,
    targetUnit: 'KILOGRAMS' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 0.4536
  },
  {
    sourceUnit: 'POUNDS' as WeightUnit,
    targetUnit: 'OUNCES' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 16
  },
  {
    sourceUnit: 'OUNCES' as WeightUnit,
    targetUnit: 'KILOGRAMS' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 0.0284
  },
  {
    sourceUnit: 'OUNCES' as WeightUnit,
    targetUnit: 'POUNDS' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 0.0625
  },
  {
    sourceUnit: 'OUNCES' as WeightUnit,
    targetUnit: 'POUNDS' as WeightUnit,
    givenWeight: 1,
    expectedWeight: 0.0625
  }
];
describe('WeightConverter', () => {

  test.each(testCases)(
    `should convert weight units: %p`,
    (tc) => {
      const result = WeightConverter.convertWeight(tc.targetUnit, tc.sourceUnit, tc.givenWeight);
      expect(result).toEqual(tc.expectedWeight);
    }
  );



  it('should return trus when valid WeightUnit', () => {
    const unit: WeightUnit = 'KILOGRAMS' as WeightUnit
    expect(WeightConverter.isValid(unit)).toBe(true);
  });
});