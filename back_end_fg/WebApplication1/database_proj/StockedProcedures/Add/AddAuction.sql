CREATE PROCEDURE [dbo].[AddAuction]
	@TwitcherId int,
	@UserId int,
	@MinAuction int = null,
	@MaxAuction int = null,
	@CurrentAuction int,
	@AuctionDate datetime,
	@AuctionValidation bit,
	@PriceId int = 0,
	@Active bit
AS
	INSERT INTO Auction(TwitcherId, UserId, MinAuction, MaxAuction, CurrentAuction, AuctionDate, AuctionValidation, PriceId, Active)
	VALUES (@TwitcherId, @UserId, @MinAuction, @MaxAuction, @CurrentAuction, @AuctionDate, @AuctionValidation, @PriceId, @Active);
RETURN 0
