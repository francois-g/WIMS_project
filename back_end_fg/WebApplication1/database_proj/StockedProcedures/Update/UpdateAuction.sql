CREATE PROCEDURE [dbo].[UpdateAuction]
	@UserId int,
	@MinAuction int = null,
	@MaxAuction int = null,
	@CurrentAuction int,
	@AuctionDate datetime = null,
	@AuctionValidation bit,
	@Id int
AS
	UPDATE Auction SET UserId = @UserId, MinAuction = @MinAuction, MaxAuction = @MaxAuction, CurrentAuction = @CurrentAuction,
	AuctionDate = @AuctionDate WHERE Id = @Id;
RETURN 0
