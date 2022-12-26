export type WeightUnit = 'KILOGRAMS' | 'OUNCES' | 'POUNDS';

class WeightConverter {
  static ratio = { 
    KILOGRAMS: {
      to: {
        KILOGRAMS: 1,
        OUNCES: 35.27392,
        POUNDS: 2.20462
      }
    },
    OUNCES: {
      to: {
        OUNCES: 1,
        KILOGRAMS: 0.02835,
        POUNDS: 0.06249,
      }
    },
    POUNDS: {
      to: {
        POUNDS: 1,
        KILOGRAMS: 0.45359,
        OUNCES: 15.99998,
      }
    }
  }

  public static convertWeight(targetUnit: WeightUnit, sourceUnit: WeightUnit, weight: number): number {
    if(!this.isValid(targetUnit) || !this.isValid(sourceUnit)) {
      throw new Error('Invalid weight unit');
    }

    if(sourceUnit != null && targetUnit != null && weight >= 0) {
      if(targetUnit === sourceUnit) {
        return +weight;
      }
      return +(this.ratio[sourceUnit].to[targetUnit] * weight).toFixed(4);
    }

    return 0;
  }

  public static isValid(unit: string): unit is WeightUnit {
      return['KILOGRAMS', 'OUNCES', 'POUNDS'].includes(unit);
  }
}

export default WeightConverter