CREATE PROCEDURE [dbo].[UpdatePriceToWin]
	@OfferEnd Datetime = null,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET OfferEnd = @OfferEnd, Active = @Active WHERE Id = @Id;
RETURN 0
