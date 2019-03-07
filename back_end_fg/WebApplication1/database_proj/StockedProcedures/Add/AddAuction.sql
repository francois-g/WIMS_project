CREATE PROCEDURE [dbo].[AddAuction]
	@UserId int,
	@MinAuction int = null,
	@MaxAuction int = null,
	@CurrentAuction int,
	@AuctionDate datetime,
	@AuctionValidation bit,
	@OfferId int = 0
AS
	INSERT INTO Auction(UserId, MinAuction, MaxAuction, CurrentAuction, AuctionDate, AuctionValidation, OfferId)
	VALUES (@UserId, @MinAuction, @MaxAuction, @CurrentAuction, @AuctionDate, @AuctionValidation, @OfferId);
RETURN 0
