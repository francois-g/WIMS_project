CREATE PROCEDURE [dbo].[UpdateAuction]
	@TwitcherId int,
	@UserId int,
	@MinAuction int,
	@MaxAuction int,
	@CurrentAuction int,
	@AuctionDate datetime,
	@AuctionValidation bit,
	@PriceId int,
	@Active bit,
	@Id int
AS
	UPDATE Auction SET TwitcherId = @TwitcherId, UserId = @UserId, MinAuction = @MinAuction, MaxAuction = @MaxAuction, CurrentAuction = @CurrentAuction,
	AuctionDate = @AuctionDate, PriceId = @PriceId, Active = @Active WHERE Id = @Id;
RETURN 0
