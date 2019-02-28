CREATE PROCEDURE [dbo].[AddPriceToWin]
	@TwitcherId int,
	@CurrentBestAuction int,
	@OfferEnd datetime,
	@GameId int,
	@AuctionStartValue int,
	@Active bit
AS
	INSERT INTO PriceToWin(TwitcherId, CurrentBestAuction, OfferEnd, GameId, AuctionStartValue, Active) 
	VALUES (@TwitcherId, @CurrentBestAuction, @OfferEnd, @GameId, @AuctionStartValue, @Active);
RETURN 0
