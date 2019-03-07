CREATE PROCEDURE [dbo].[AddPriceToWin]
	@TwitcherId int,
	@OfferEnd datetime,
	@GameId int,
	@AuctionStartValue int,
  @Description varchar(MAX),
	@Active bit
AS
	INSERT INTO PriceToWin(TwitcherId, OfferEnd, GameId, AuctionStartValue, Description, Active) 
	VALUES (@TwitcherId, @OfferEnd, @GameId, @AuctionStartValue, @Description, @Active);
RETURN 0
