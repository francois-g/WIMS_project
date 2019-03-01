CREATE PROCEDURE [dbo].[UpdateAuction]
	@TwitcherId int,
	@UserId int,
	@MinAuction int = null,
	@MaxAuction int = null,
	@CurrentAuction int,
	@AuctionDate datetime = null,
	@AuctionValidation bit,
	@Active bit,
	@Id int
AS
	UPDATE Auction SET TwitcherId = @TwitcherId, UserId = @UserId, MinAuction = @MinAuction, MaxAuction = @MaxAuction, CurrentAuction = @CurrentAuction,
	AuctionDate = @AuctionDate, Active = @Active WHERE Id = @Id;
RETURN 0
