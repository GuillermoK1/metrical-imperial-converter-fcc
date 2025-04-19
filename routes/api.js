'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    let input = req.query.input;
    let initNum;
    let initUnit;
    
    let numberError = false;
    let unitError = false;

    try {
      initNum = convertHandler.getNum(input);
    } catch (error) {
      numberError = true;
    }

    try {
      initUnit = convertHandler.getUnit(input);
    } catch (error) {
      unitError = true;
    }

    if (numberError && unitError) {
      return res.json('invalid number and unit');
    }
    if (numberError) {
      return res.json('invalid number');
    }
    if (unitError) {
      return res.json('invalid unit');
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};