"use strict";
/**
 * Gas Station Module - Type Definitions
 * Handles gas station data, geospatial queries, and status tracking
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueLength = exports.StationStatus = exports.FuelType = exports.StationType = void 0;
var StationType;
(function (StationType) {
    StationType["PDVSA"] = "PDVSA";
    StationType["PRIVATE"] = "PRIVATE";
    StationType["MIXED"] = "MIXED";
})(StationType || (exports.StationType = StationType = {}));
var FuelType;
(function (FuelType) {
    FuelType["GASOLINA_95"] = "GASOLINA_95";
    FuelType["GASOLINA_91"] = "GASOLINA_91";
    FuelType["DIESEL"] = "DIESEL";
    FuelType["GAS"] = "GAS";
})(FuelType || (exports.FuelType = FuelType = {}));
var StationStatus;
(function (StationStatus) {
    StationStatus["OPEN"] = "OPEN";
    StationStatus["CLOSED"] = "CLOSED";
    StationStatus["QUEUE"] = "QUEUE";
    StationStatus["NO_FUEL"] = "NO_FUEL";
    StationStatus["UNKNOWN"] = "UNKNOWN";
})(StationStatus || (exports.StationStatus = StationStatus = {}));
var QueueLength;
(function (QueueLength) {
    QueueLength["NONE"] = "NONE";
    QueueLength["SHORT"] = "SHORT";
    QueueLength["MEDIUM"] = "MEDIUM";
    QueueLength["LONG"] = "LONG";
    QueueLength["VERY_LONG"] = "VERY_LONG";
})(QueueLength || (exports.QueueLength = QueueLength = {}));
