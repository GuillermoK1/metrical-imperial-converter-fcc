function ConvertHandler() {
  
  this.getNum = function(input) {
    // If no number is provided, return 1
    if (!input.match(/[0-9]/)) return 1;
    
    // Extract the numeric part (everything before the first letter)
    let numStr = input.match(/[^a-zA-Z]*/)[0];
    
    // Check for double fractions
    if ((numStr.match(/\//g) || []).length > 1) {
      throw new Error('invalid number');
    }
    
    // Evaluate the fraction or decimal
    let result;
    try {
      result = numStr.includes('/') 
        ? numStr.split('/').reduce((n, d) => Number(n) / Number(d))
        : Number(numStr);
    } catch(e) {
      throw new Error('invalid number');
    }
    
    if (isNaN(result)) throw new Error('invalid number');
    return result;
  };
  
  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let unit = input.match(/[a-zA-Z]*$/)[0].toLowerCase();
    
    if (!validUnits.includes(unit)) {
      throw new Error('invalid unit');
    }
    
    // Special case for 'L'
    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitPairs[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spelledUnits = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return spelledUnits[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const conversions = {
      'gal': num => num * galToL,
      'L': num => num / galToL,
      'mi': num => num * miToKm,
      'km': num => num / miToKm,
      'lbs': num => num * lbsToKg,
      'kg': num => num / lbsToKg
    };
    
    const result = conversions[initUnit](initNum);
    // Round to 5 decimal places
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;