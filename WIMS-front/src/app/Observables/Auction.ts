export class Auction {

    constructor(
        private _id,
        private _twitcherId,
        private _userId,
        private _minAuction,
        private _maxAuction,
        private _currentAuction,
        private _auctionDate,
        private _auctionValidation,
        private _idPrice,
        private _active
    ) {}

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get twitcherId() {
        return this._twitcherId;
    }

    set twitcherId(value) {
        this._twitcherId = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get minAuction() {
        return this._minAuction;
    }

    set minAuction(value) {
        this._minAuction = value;
    }

    get maxAuction() {
        return this._maxAuction;
    }

    set maxAuction(value) {
        this._maxAuction = value;
    }

    get currentAuction() {
        return this._currentAuction;
    }

    set currentAuction(value) {
        this._currentAuction = value;
    }

    get auctionDate() {
        return this._auctionDate;
    }

    set auctionDate(value) {
        this._auctionDate = value;
    }

    get auctionValidation() {
        return this._auctionValidation;
    }

    set auctionValidation(value) {
        this._auctionValidation = value;
    }

    get idPrice() {
        return this._idPrice;
    }

    set idPrice(value) {
        this._idPrice = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }
}
